import { useState } from 'react';
import { Modal, Button, Form, Alert, Badge } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const SectionKillSwitchModal = ({ show, onHide, section, onConfirmToggle }) => {
  const [reason, setReason] = useState('Gangguan teknis / Maintenance darurat modul');
  const [notifyMerchants, setNotifyMerchants] = useState(true);

  if (!section) return null;

  const isCurrentlyEnabled = section.isEnabled;

  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirmToggle(section.key, !isCurrentlyEnabled);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="border-secondary-subtle">
        <Modal.Title className="d-flex align-items-center gap-2 fs-16 fw-bold text-body">
          <IconifyIcon
            icon={isCurrentlyEnabled ? 'solar:danger-triangle-bold-duotone' : 'solar:shield-check-bold-duotone'}
            className={isCurrentlyEnabled ? 'text-danger fs-22' : 'text-success fs-22'}
          />
          {isCurrentlyEnabled ? 'Eksekusi Kill-Switch Global Modul' : 'Aktifkan Kembali Modul Seksi'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleConfirm}>
        <Modal.Body className="p-4">
          <div className="p-3 rounded-2 bg-body-secondary border border-secondary-subtle mb-3">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <strong className="text-body fs-13">{section.name}</strong>
              <Badge bg={isCurrentlyEnabled ? 'success' : 'secondary'} className="fs-10">
                {isCurrentlyEnabled ? 'STATUS: AKTIF' : 'STATUS: NONAKTIF'}
              </Badge>
            </div>
            <div className="text-muted fs-11 font-monospace">
              Code: {section.code} • Kategori: {section.category}
            </div>
          </div>

          {isCurrentlyEnabled ? (
            <Alert variant="danger" className="border-danger-subtle d-flex align-items-start gap-2 mb-3">
              <IconifyIcon icon="solar:danger-triangle-bold" className="text-danger fs-20 flex-shrink-0 mt-1" />
              <div className="fs-12 text-body">
                <strong>Dampak Operasional:</strong> Mematikan modul ini akan langsung menyembunyikan seksi dari{' '}
                <strong className="text-danger">{section.activeUsageCount} toko merchant aktif</strong> yang sedang menggunakannya. Pengunjung tidak akan melihat seksi ini dan builder merchant akan menonaktifkan opsi penambahan baru.
              </div>
            </Alert>
          ) : (
            <Alert variant="success" className="border-success-subtle d-flex align-items-start gap-2 mb-3">
              <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-20 flex-shrink-0 mt-1" />
              <div className="fs-12 text-body">
                <strong>Pemulihan Layanan:</strong> Mengaktifkan kembali modul ini akan memulihkan tampilan seksi di seluruh toko merchant yang sebelumnya telah mengonfigurasinya.
              </div>
            </Alert>
          )}

          {isCurrentlyEnabled && (
            <>
              <Form.Group className="mb-3">
                <Form.Label className="fs-12 fw-semibold text-body">
                  Alasan Penonaktifan Darurat (Audit Log) <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="border-secondary-subtle fs-12"
                  required
                >
                  <option value="Gangguan teknis / Maintenance darurat modul">Gangguan teknis / Maintenance darurat modul</option>
                  <option value="Server API pihak ketiga mengalami downtime (Meta / Google)">Server API pihak ketiga mengalami downtime (Meta / Google)</option>
                  <option value="Periode kampanye promosi nasional telah selesai">Periode kampanye promosi nasional telah selesai</option>
                  <option value="Optimasi performa & update dependensi sistem">Optimasi performa &amp; update dependensi sistem</option>
                  <option value="Kepatuhan regulasi & audit konten">Kepatuhan regulasi &amp; audit konten</option>
                </Form.Select>
              </Form.Group>

              <Form.Check
                type="checkbox"
                id="notify-merchants-checkbox"
                label={
                  <span className="text-muted fs-11">
                    Kirim notifikasi push broadcast sistem ke dashboard merchant mengenai status pemeliharaan seksi ini.
                  </span>
                }
                checked={notifyMerchants}
                onChange={(e) => setNotifyMerchants(e.target.checked)}
                className="mb-2"
              />
            </>
          )}
        </Modal.Body>

        <Modal.Footer className="border-secondary-subtle">
          <Button variant="outline-secondary" size="sm" onClick={onHide} className="px-3 py-1.5">
            Batal
          </Button>
          <Button
            variant={isCurrentlyEnabled ? 'danger' : 'success'}
            size="sm"
            type="submit"
            className="fw-semibold text-white d-flex align-items-center px-3 py-1.5"
          >
            <IconifyIcon
              icon={isCurrentlyEnabled ? 'solar:close-circle-bold' : 'solar:check-circle-bold'}
              className="me-2 fs-16"
            />
            {isCurrentlyEnabled ? 'Ya, Matikan Modul Sekarang' : 'Ya, Aktifkan Kembali Modul'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SectionKillSwitchModal;
