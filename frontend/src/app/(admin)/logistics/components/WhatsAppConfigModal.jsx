// src/app/(admin)/logistics/components/WhatsAppConfigModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert, Badge } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { whatsappGatewayConfig } from '../data';

const WhatsAppConfigModal = ({ show, onHide }) => {
  const [activeEngine, setActiveEngine] = useState(whatsappGatewayConfig.activeEngine);
  const [testPhoneNumber, setTestPhoneNumber] = useState('+62 812-3456-7890');
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);

  const [form, setForm] = useState({
    fonnteApiKey: whatsappGatewayConfig.fonnteApiKey,
    fonnteDeviceStatus: whatsappGatewayConfig.fonnteDeviceStatus,
    wabaPhoneNumberId: whatsappGatewayConfig.wabaPhoneNumberId,
    wabaAccessToken: whatsappGatewayConfig.wabaAccessToken,
    twilioAccountSid: whatsappGatewayConfig.twilioAccountSid,
  });

  const handleSendTestMessage = () => {
    setIsSendingTest(true);
    setTestSuccess(false);
    setTimeout(() => {
      setIsSendingTest(false);
      setTestSuccess(true);
    }, 1000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Konfigurasi WhatsApp Business Gateway berhasil disimpan.');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-secondary-subtle">
        <Modal.Title className="d-flex align-items-center fs-16 fw-bold text-body">
          <IconifyIcon icon="solar:chat-round-bold-duotone" className="text-success me-2 fs-22" />
          Konfigurasi Centralized WhatsApp Business Gateway
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* ENGINE SELECTION */}
        <div className="d-flex gap-2 mb-3">
          <Button
            variant={activeEngine === 'FONNTE' ? 'success' : 'outline-secondary'}
            size="sm"
            onClick={() => setActiveEngine('FONNTE')}
            className="fw-semibold px-3 py-1.5"
          >
            <IconifyIcon icon="solar:bolt-bold" className="me-2 fs-16" />
            Fonnte Gateway Engine (Primary)
          </Button>
          <Button
            variant={activeEngine === 'WABA_META' ? 'success' : 'outline-secondary'}
            size="sm"
            onClick={() => setActiveEngine('WABA_META')}
            className="fw-semibold px-3 py-1.5"
          >
            <IconifyIcon icon="solar:verified-check-bold" className="me-2 fs-16" />
            Meta Official WABA Cloud API
          </Button>
          <Button
            variant={activeEngine === 'TWILIO' ? 'success' : 'outline-secondary'}
            size="sm"
            onClick={() => setActiveEngine('TWILIO')}
            className="fw-semibold px-3 py-1.5"
          >
            <IconifyIcon icon="solar:phone-bold" className="me-2 fs-16" />
            Twilio WhatsApp API
          </Button>
        </div>

        {/* DEVICE CONNECTED STATUS */}
        <div className="p-3 rounded-2 bg-success-subtle border border-success-subtle mb-3 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-22 flex-shrink-0" />
            <div>
              <h6 className="mb-0 fs-13 fw-bold text-body">Status Bot Notifikasi WhatsApp</h6>
              <small className="text-muted fs-11">{form.fonnteDeviceStatus}</small>
            </div>
          </div>
          <Badge bg="success" className="fs-10 px-2.5 py-1.5">CONNECTED</Badge>
        </div>

        <Form onSubmit={handleSave}>
          {activeEngine === 'FONNTE' ? (
            <Row className="g-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body d-flex justify-content-between">
                    <span>Fonnte Live API Token</span>
                    <Badge bg="danger-subtle" className="text-danger fs-10">Sensitif</Badge>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={form.fonnteApiKey}
                    onChange={(e) => setForm({ ...form, fonnteApiKey: e.target.value })}
                    className="bg-body text-body border-secondary-subtle fs-13 font-monospace"
                    required
                  />
                  <Form.Text className="text-muted fs-11">
                    Digunakan untuk pengiriman pesan massal throughput tinggi (resi ekspedisi, OTP, peringatan merchant).
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          ) : activeEngine === 'WABA_META' ? (
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body">Meta WABA Phone Number ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.wabaPhoneNumberId}
                    onChange={(e) => setForm({ ...form, wabaPhoneNumberId: e.target.value })}
                    className="bg-body text-body border-secondary-subtle fs-13 font-monospace"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body">Permanent Access Token</Form.Label>
                  <Form.Control
                    type="password"
                    value={form.wabaAccessToken}
                    onChange={(e) => setForm({ ...form, wabaAccessToken: e.target.value })}
                    className="bg-body text-body border-secondary-subtle fs-13 font-monospace"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          ) : (
            <Row className="g-3">
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body">Twilio Account SID</Form.Label>
                  <Form.Control
                    type="text"
                    value={form.twilioAccountSid}
                    onChange={(e) => setForm({ ...form, twilioAccountSid: e.target.value })}
                    className="bg-body text-body border-secondary-subtle fs-13 font-monospace"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          {/* TEST DISPATCH SECTION */}
          <div className="p-3 rounded-2 bg-body-secondary border border-secondary-subtle mt-3">
            <h6 className="fs-12 fw-bold text-body mb-2 d-flex align-items-center">
              <IconifyIcon icon="solar:plain-bold" className="text-primary me-1.5 fs-16" />
              Uji Coba Kirim Pesan WhatsApp Langsung (Live Dispatch Ping)
            </h6>
            <Row className="g-2 align-items-center">
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Nomor WhatsApp (+62 812-xxxx-xxxx)"
                  value={testPhoneNumber}
                  onChange={(e) => setTestPhoneNumber(e.target.value)}
                  className="bg-body text-body border-secondary-subtle fs-13 font-monospace"
                />
              </Col>
              <Col sm={4}>
                <Button
                  variant="outline-success"
                  size="sm"
                  className="w-100 fw-semibold"
                  onClick={handleSendTestMessage}
                  disabled={isSendingTest}
                >
                  {isSendingTest ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-1" />
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Test WA'
                  )}
                </Button>
              </Col>
            </Row>
            {testSuccess && (
              <div className="mt-2 text-success fs-11 fw-semibold d-flex align-items-center">
                <IconifyIcon icon="solar:check-circle-bold" className="me-1 fs-14" />
                Pesan uji coba terkirim dan diterima (SLA: 1.2 detik)!
              </div>
            )}
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top border-secondary-subtle">
            <Button variant="outline-secondary" size="sm" onClick={onHide}>
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
              Simpan Konfigurasi WA
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default WhatsAppConfigModal;
