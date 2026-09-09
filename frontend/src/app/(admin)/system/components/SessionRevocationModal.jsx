import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const SessionRevocationModal = ({ show, onHide, onConfirmRevocation }) => {
  const [targetScope, setTargetScope] = useState('ALL'); // 'ALL' | 'MERCHANTS_ONLY' | 'ADMINS_ONLY'
  const [reason, setReason] = useState('Indikasi kebocoran kredensial atau rotasi berkala kunci enkripsi JWT');
  const [confirmKeyword, setConfirmKeyword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const isConfirmed = confirmKeyword === 'REVOKE';

  const handleRevoke = () => {
    if (!isConfirmed) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirmRevocation(targetScope, reason);
      onHide();
    }, 1200);
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="d-flex align-items-center fs-16 fw-bold text-danger">
          <div className="avatar-xs bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center me-2">
            <IconifyIcon icon="solar:lock-password-bold" className="fs-18" />
          </div>
          Pencabutan Sesi Token JWT Darurat
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        <Alert variant="danger" className="d-flex align-items-start mb-3 border-0 bg-danger-subtle text-danger-emphasis py-2 fs-12">
          <IconifyIcon icon="solar:danger-triangle-bold" className="fs-22 me-2 flex-shrink-0 mt-1" />
          <div>
            <strong>Peringatan Keamanan Kritis:</strong> Tindakan ini akan menginvalidasi seluruh token autentikasi JWT aktif secara seketika melalui rotasi <code>JWT_SALT_SECRET</code>. Seluruh pengguna pada cakupan terpilih akan otomatis ter-*logout* dari sistem.
          </div>
        </Alert>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fs-12 fw-semibold text-uppercase text-muted">Cakupan Pengguna yang Dicabut</Form.Label>
            <Form.Select
              value={targetScope}
              onChange={(e) => setTargetScope(e.target.value)}
              className="fs-12"
            >
              <option value="ALL">Seluruh Pengguna Platform (Merchant &amp; Tim Admin)</option>
              <option value="MERCHANTS_ONLY">Hanya Sesi Seluruh Merchant Toko</option>
              <option value="ADMINS_ONLY">Hanya Sesi Tim Superadmin / Internal</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-12 fw-semibold text-uppercase text-muted">Alasan Pencabutan Resmi (Dicatat di Audit Trail)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="fs-12"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fs-12 fw-semibold text-danger text-uppercase">
              Konfirmasi Tindakan
            </Form.Label>
            <p className="text-muted fs-11 mb-1">
              Ketik kata <strong>REVOKE</strong> di bawah untuk mengonfirmasi tindakan darurat ini:
            </p>
            <Form.Control
              type="text"
              value={confirmKeyword}
              onChange={(e) => setConfirmKeyword(e.target.value)}
              placeholder="Ketik REVOKE"
              className="font-monospace fs-13"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="outline-secondary" size="sm" onClick={onHide} disabled={isProcessing}>
          Batal
        </Button>
        <Button
          variant="danger"
          size="sm"
          className="d-flex align-items-center text-white"
          disabled={!isConfirmed || isProcessing}
          onClick={handleRevoke}
        >
          {isProcessing ? (
            <>
              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              Memproses Rotasi Kunci JWT...
            </>
          ) : (
            <>
              <IconifyIcon icon="solar:trash-bin-trash-bold" className="me-1" />
              Cabut Sesi Sekarang
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SessionRevocationModal;
