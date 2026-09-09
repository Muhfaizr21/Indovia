// src/app/(admin)/logistics/components/CourierKillSwitchModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Badge } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const CourierKillSwitchModal = ({ show, onHide, courier, onToggleStatus }) => {
  const [reason, setReason] = useState('');
  const [broadcastToMerchants, setBroadcastToMerchants] = useState(true);
  const [autoFallback, setAutoFallback] = useState(true);

  if (!courier) return null;

  const isCurrentlyActive = courier.status === 'ACTIVE';

  const handleSubmit = (e) => {
    e.preventDefault();
    onToggleStatus({
      courierId: courier.id,
      newStatus: isCurrentlyActive ? 'MAINTENANCE_OVERLOAD' : 'ACTIVE',
      reason: reason || (isCurrentlyActive ? 'Penonaktifan darurat via Kill Switch' : 'Layanan telah normal kembali'),
      broadcastToMerchants,
      autoFallback,
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="border-secondary-subtle">
        <Modal.Title className="d-flex align-items-center fs-16 fw-bold text-body">
          <IconifyIcon
            icon="solar:shield-warning-bold-duotone"
            className={`${isCurrentlyActive ? 'text-danger' : 'text-success'} me-2 fs-22`}
          />
          {isCurrentlyActive ? 'Global Kill-Switch: Nonaktifkan Kurir' : 'Pulihkan Layanan Kurir Nasional'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        <div className={`p-3 rounded-2 border mb-3 ${isCurrentlyActive ? 'bg-danger-subtle border-danger-subtle' : 'bg-success-subtle border-success-subtle'}`}>
          <div className="d-flex align-items-center justify-content-between mb-1">
            <h6 className="mb-0 fw-bold text-body fs-14">{courier.name} ({courier.code})</h6>
            <Badge bg={isCurrentlyActive ? 'danger' : 'success'} className="fs-10">
              {isCurrentlyActive ? 'Akan Dimatikan Global' : 'Akan Diaktifkan Kembali'}
            </Badge>
          </div>
          <p className="text-muted fs-12 mb-0">
            {isCurrentlyActive
              ? 'Langkah ini akan menyembunyikan opsi kurir ini dari seluruh halaman checkout merchant Indovia secara instan.'
              : 'Langkah ini akan memulihkan opsi kurir ini di seluruh toko dan memungkinkan pembeli memilih layanan kembali.'}
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
          {isCurrentlyActive && (
            <>
              <Form.Group className="mb-3">
                <Form.Label className="fs-12 fw-semibold text-body">
                  Alasan Gangguan Logistik / Keterangan Insiden
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Contoh: Overload hub transit Jakarta Barat akibat event 12.12 Harbolnas, kapasitas sortir 130%. Dinonaktifkan sementara 24 jam."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="bg-body text-body border-secondary-subtle fs-12"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Check
                  type="checkbox"
                  id="cb-broadcast"
                  label="Tampilkan banner peringatan keterlambatan di checkout pembeli"
                  checked={broadcastToMerchants}
                  onChange={(e) => setBroadcastToMerchants(e.target.checked)}
                  className="text-body fs-12 fw-medium"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="cb-fallback"
                  label="Alihkan rekomendasi kurir otomatis ke SiCepat / JNE"
                  checked={autoFallback}
                  onChange={(e) => setAutoFallback(e.target.checked)}
                  className="text-body fs-12 fw-medium"
                />
              </Form.Group>
            </>
          )}

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top border-secondary-subtle">
            <Button variant="outline-secondary" size="sm" onClick={onHide} className="px-3 py-1.5">
              Batal
            </Button>
            <Button
              variant={isCurrentlyActive ? 'danger' : 'success'}
              size="sm"
              type="submit"
              className="fw-semibold text-white d-flex align-items-center px-3 py-1.5"
            >
              <IconifyIcon icon={isCurrentlyActive ? 'solar:close-circle-bold' : 'solar:check-circle-bold'} className="me-2 fs-16" />
              {isCurrentlyActive ? 'Eksekusi Kill-Switch Global' : 'Aktifkan Kembali Kurir'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CourierKillSwitchModal;
