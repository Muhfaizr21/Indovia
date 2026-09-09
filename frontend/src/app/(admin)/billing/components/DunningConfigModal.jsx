import { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const DunningConfigModal = ({ show, onHide, onSave }) => {
  const [config, setConfig] = useState({
    autoRetryEnabled: true,
    retry1DelayHours: 0,
    retry2DelayDays: 1,
    retry3PastDueDays: 3,
    freezeDays: 7,
    enableWhatsAppNotify: true,
    enableEmailNotify: true,
    notifyMessageTemplate: 'Halo {merchant_name}, perpanjangan sewa paket {plan_name} sebesar {amount} gagal diproses otomatis via {payment_method}. Mohon lakukan pembayaran sebelum {due_date} untuk menghindari pembekuan toko.',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(config);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-16 text-body d-flex align-items-center">
          <IconifyIcon icon="solar:settings-bold-duotone" className="me-2 text-warning fs-22" />
          Konfigurasi Dunning Engine & Kebijakan Gagal Tagih
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body className="p-3 pt-2">
          <Alert variant="warning" className="p-2.5 fs-12 mb-3">
            <IconifyIcon icon="solar:danger-triangle-bold" className="me-1 fs-15 text-warning" />
            Mesin cron-job backend akan mengeksekusi penagihan ulang otomatis secara presisi sesuai interval hari yang ditentukan di sini.
          </Alert>

          <h6 className="fw-bold text-body fs-13 mb-2 border-bottom pb-1">1. Parameter Siklus Retry & Eskalasi Status</h6>
          <Row className="g-2 mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Jatuh Tempo (Hari H):</Form.Label>
                <Form.Control type="text" size="sm" disabled readOnly value="Eksekusi Percobaan #1 Langsung" />
                <Form.Text className="fs-10 text-muted">Kirim notifikasi Email & WhatsApp saat transaksi ditolak.</Form.Text>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Percobaan #2 (Hari):</Form.Label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text">H +</span>
                  <Form.Control
                    type="number"
                    min="1"
                    max="2"
                    value={config.retry2DelayDays}
                    onChange={(e) => setConfig({ ...config, retry2DelayDays: Number(e.target.value) })}
                  />
                  <span className="input-group-text">Hari</span>
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Percobaan #3 & Eskalasi PAST_DUE:</Form.Label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text">H +</span>
                  <Form.Control
                    type="number"
                    min="2"
                    max="5"
                    value={config.retry3PastDueDays}
                    onChange={(e) => setConfig({ ...config, retry3PastDueDays: Number(e.target.value) })}
                  />
                  <span className="input-group-text">Hari</span>
                </div>
                <Form.Text className="fs-10 text-danger">Toko menerima banner merah peringatan di dashboard admin.</Form.Text>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Batas Kunci Checkout (FROZEN):</Form.Label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text">H +</span>
                  <Form.Control
                    type="number"
                    min="5"
                    max="14"
                    value={config.freezeDays}
                    onChange={(e) => setConfig({ ...config, freezeDays: Number(e.target.value) })}
                  />
                  <span className="input-group-text">Hari</span>
                </div>
                <Form.Text className="fs-10 text-danger">Akses checkout toko publik diblokir otomatis.</Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <h6 className="fw-bold text-body fs-13 mb-2 border-bottom pb-1">2. Saluran & Otomasi Notifikasi</h6>
          <Row className="g-2 mb-3">
            <Col md={6}>
              <Form.Check
                type="switch"
                id="dunning-wa-switch"
                label="Kirim Notifikasi WhatsApp Transaksional"
                className="fs-12 fw-medium mb-2"
                checked={config.enableWhatsAppNotify}
                onChange={(e) => setConfig({ ...config, enableWhatsAppNotify: e.target.checked })}
              />
            </Col>
            <Col md={6}>
              <Form.Check
                type="switch"
                id="dunning-email-switch"
                label="Kirim Invoice & Email Billing Resmi"
                className="fs-12 fw-medium mb-2"
                checked={config.enableEmailNotify}
                onChange={(e) => setConfig({ ...config, enableEmailNotify: e.target.checked })}
              />
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Template Pesan WhatsApp:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="fs-11 font-monospace"
                  value={config.notifyMessageTemplate}
                  onChange={(e) => setConfig({ ...config, notifyMessageTemplate: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" size="sm" onClick={onHide}>
            Batal
          </Button>
          <Button
            type="submit"
            variant="warning"
            size="sm"
            className="fw-semibold px-3"
          >
            <IconifyIcon icon="solar:disk-bold" className="me-1" />
            Terapkan Konfigurasi Engine
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default DunningConfigModal;
