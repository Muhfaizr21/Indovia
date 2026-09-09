import { useState } from 'react';
import { Modal, Button, Form, Alert, Badge } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const MaintenanceModeModal = ({ show, onHide, isCurrentlyActive, onConfirmToggle }) => {
  const [enabled, setEnabled] = useState(isCurrentlyActive);
  const [message, setMessage] = useState(
    'Indovia sedang melakukan peningkatan sistem berskala besar untuk meningkatkan stabilitas dan performa katalog toko.'
  );
  const [whitelist, setWhitelist] = useState('103.144.20.12, 182.253.12.88, 127.0.0.1');

  const handleSave = () => {
    onConfirmToggle(enabled, message, whitelist.split(',').map((ip) => ip.trim()));
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="d-flex align-items-center fs-16 fw-bold">
          <div className="avatar-xs bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center me-2">
            <IconifyIcon icon="solar:danger-triangle-bold" className="fs-18" />
          </div>
          Kontrol Darurat: Global Maintenance Mode
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        <Alert variant="danger" className="d-flex align-items-start mb-3 border-0 bg-danger-subtle text-danger-emphasis py-2 fs-12">
          <IconifyIcon icon="solar:shield-warning-bold" className="fs-22 me-2 flex-shrink-0 mt-1" />
          <div>
            <strong>Perhatian Kritis:</strong> Mengaktifkan mode pemeliharaan global akan mengunci seluruh storefront publik toko merchant dan menampilkan halaman kustom pemeliharaan. Hanya IP admin terdaftar yang dapat mengakses sistem.
          </div>
        </Alert>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fs-12 fw-semibold text-uppercase text-muted">Status Mode Pemeliharaan</Form.Label>
            <div className="d-flex align-items-center justify-content-between p-3 border rounded bg-light-subtle">
              <div>
                <strong className="d-block text-body fs-13">Kunci Seluruh Platform Toko</strong>
                <small className="text-muted fs-11">Akses publik ditutup sementara selama migrasi database</small>
              </div>
              <Form.Check
                type="switch"
                id="global-maintenance-switch"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                className="fs-18"
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-12 fw-semibold text-uppercase text-muted">Pesan Tampilan ke Pengunjung Publik</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="fs-12"
              placeholder="Tulis pesan pengumuman..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-12 fw-semibold text-uppercase text-muted">
              Daftar Putih IP Admin (Bypass Whitelist)
            </Form.Label>
            <Form.Control
              type="text"
              value={whitelist}
              onChange={(e) => setWhitelist(e.target.value)}
              className="fs-12 font-monospace"
              placeholder="Pisahkan dengan koma (contoh: 103.144.20.12, 127.0.0.1)"
            />
            <Form.Text className="text-muted fs-11">
              Alamat IP ini tetap dapat mengakses dashboard admin dan preview toko publik.
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="outline-secondary" size="sm" onClick={onHide}>
          Batal
        </Button>
        <Button
          variant={enabled ? 'danger' : 'success'}
          size="sm"
          className="d-flex align-items-center text-white"
          onClick={handleSave}
        >
          <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
          {enabled ? 'Aktifkan Mode Pemeliharaan' : 'Simpan & Buka Akses Publik'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MaintenanceModeModal;
