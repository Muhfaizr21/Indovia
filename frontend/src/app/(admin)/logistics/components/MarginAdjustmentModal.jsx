// src/app/(admin)/logistics/components/MarginAdjustmentModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { formatRupiah, logisticsGlobalConfig } from '../data';

const MarginAdjustmentModal = ({ show, onHide, onSaveMargin }) => {
  const [marginType, setMarginType] = useState(logisticsGlobalConfig.platformMarginType);
  const [marginAmount, setMarginAmount] = useState(logisticsGlobalConfig.platformMarginAmount);
  const [allocationPurpose, setAllocationPurpose] = useState(logisticsGlobalConfig.insuranceFundAllocation);

  // Simulation preview
  const sampleOriginalRate = 19000; // Contoh tarif JNE REG
  const calculatedMargin = marginType === 'FLAT' ? marginAmount : Math.round((sampleOriginalRate * marginAmount) / 100);
  const finalCustomerRate = sampleOriginalRate + calculatedMargin;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveMargin({
      marginType,
      marginAmount: Number(marginAmount),
      allocationPurpose,
    });
    alert(`Margin markup ongkir berhasil diperbarui menjadi ${marginType === 'FLAT' ? formatRupiah(marginAmount) : marginAmount + '%'} per paket.`);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="border-secondary-subtle">
        <Modal.Title className="d-flex align-items-center fs-16 fw-bold text-body">
          <IconifyIcon icon="solar:tag-price-bold-duotone" className="text-primary me-2 fs-22" />
          Penyesuaian Margin Markup Ongkir Platform
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        <p className="text-muted fs-12 mb-3">
          Atur margin penambahan biaya ongkir di atas tarif resmi ekspedisi. Dana ini dialokasikan untuk kas proteksi asuransi kehilangan barang dan margin pendapatan logistik platform Indovia.
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fs-12 fw-semibold text-body">Model Penyesuaian Margin</Form.Label>
            <div className="d-flex gap-3">
              <Form.Check
                type="radio"
                id="type-flat"
                name="marginType"
                label="Nominal Flat per Paket (Rp)"
                checked={marginType === 'FLAT'}
                onChange={() => setMarginType('FLAT')}
                className="text-body fs-12 fw-semibold"
              />
              <Form.Check
                type="radio"
                id="type-percent"
                name="marginType"
                label="Persentase Tarif (%)"
                checked={marginType === 'PERCENTAGE'}
                onChange={() => setMarginType('PERCENTAGE')}
                className="text-body fs-12 fw-semibold"
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-12 fw-semibold text-body">
              {marginType === 'FLAT' ? 'Besaran Margin Flat (Rupiah)' : 'Besaran Persentase Margin (%)'}
            </Form.Label>
            <Form.Control
              type="number"
              value={marginAmount}
              onChange={(e) => setMarginAmount(Number(e.target.value))}
              className="bg-body text-body border-secondary-subtle fs-13 font-monospace"
              min={0}
              required
            />
            <Form.Text className="text-muted fs-11">
              {marginType === 'FLAT'
                ? 'Standar industri e-commerce Indonesia: Rp 500 - Rp 1.000 per resi pengiriman.'
                : 'Contoh: 1.0% s/d 2.5% dari total ongkos kirim resmi.'}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-12 fw-semibold text-body">Alokasi & Peruntukan Dana</Form.Label>
            <Form.Control
              type="text"
              value={allocationPurpose}
              onChange={(e) => setAllocationPurpose(e.target.value)}
              className="bg-body text-body border-secondary-subtle fs-12"
              required
            />
          </Form.Group>

          {/* SIMULATION PREVIEW */}
          <div className="p-3 rounded-2 bg-body-secondary border border-secondary-subtle mb-3">
            <h6 className="fs-12 fw-bold text-body mb-2">Simulasi Tampilan di Checkout Pembeli:</h6>
            <div className="d-flex justify-content-between fs-12 mb-1">
              <span className="text-muted">Tarif Resmi Ekspedisi (JNE REG Jakarta-SBY):</span>
              <strong className="text-body">{formatRupiah(sampleOriginalRate)}</strong>
            </div>
            <div className="d-flex justify-content-between fs-12 mb-1">
              <span className="text-muted">Margin Platform / Asuransi Indovia:</span>
              <strong className="text-success">+{formatRupiah(calculatedMargin)}</strong>
            </div>
            <hr className="my-2 border-secondary-subtle" />
            <div className="d-flex justify-content-between fs-13">
              <span className="fw-bold text-body">Total Ditagihkan ke Pembeli:</span>
              <strong className="fw-bold text-primary">{formatRupiah(finalCustomerRate)}</strong>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top border-secondary-subtle">
            <Button variant="outline-secondary" size="sm" onClick={onHide} className="px-3 py-1.5">
              Batal
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              className="fw-semibold text-white d-flex align-items-center px-3 py-1.5"
              style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            >
              <IconifyIcon icon="solar:check-square-bold" className="me-2 fs-16" />
              Terapkan Margin Global
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MarginAdjustmentModal;
