import { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert, Badge } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const RateLimitConfigModal = ({ show, onHide, currentRate, onSaveRate }) => {
  const [rateLimit, setRateLimit] = useState(currentRate || 60);
  const [burstAllowance, setBurstAllowance] = useState(100);
  const [jailDurationMinutes, setJailDurationMinutes] = useState(15);
  const [enableWafInspection, setEnableWafInspection] = useState(true);

  const handleSave = () => {
    onSaveRate(rateLimit, burstAllowance, jailDurationMinutes);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="d-flex align-items-center fs-16 fw-bold">
          <div className="avatar-xs bg-info-subtle text-info rounded-circle d-flex align-items-center justify-content-center me-2">
            <IconifyIcon icon="solar:shield-keyhole-bold" className="fs-18" />
          </div>
          Konfigurasi API Rate-Limiting &amp; Anti-DDoS
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        <Alert variant="info" className="d-flex align-items-center mb-3 border-0 bg-info-subtle text-info-emphasis py-2 fs-12">
          <IconifyIcon icon="solar:info-circle-bold" className="fs-20 me-2 flex-shrink-0" />
          <div>
            Engine Rate Limiter berbasis <strong>Golang x/time/rate (Token Bucket Algorithm)</strong> untuk menangkal serangan scraping bot liar dan flood request tanpa membebani database.
          </div>
        </Alert>

        <Form>
          {/* SLIDER RATE LIMIT */}
          <Form.Group className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <Form.Label className="fs-12 fw-semibold text-uppercase text-muted mb-0">
                Batas Permintaan (Requests per Menit per IP)
              </Form.Label>
              <Badge bg="primary" className="fs-13 font-monospace px-2 py-1">
                {rateLimit} req / menit
              </Badge>
            </div>
            <Form.Range
              min={10}
              max={300}
              step={10}
              value={rateLimit}
              onChange={(e) => setRateLimit(Number(e.target.value))}
            />
            <div className="d-flex justify-content-between text-muted fs-11">
              <span>Ketat (10 req/m)</span>
              <span>Rekomendasi Normal (60 req/m)</span>
              <span>Longgar (300 req/m)</span>
            </div>
          </Form.Group>

          {/* BURST ALLOWANCE */}
          <Row className="g-2 mb-3">
            <Col sm={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-uppercase text-muted">Toleransi Lonjakan (Burst)</Form.Label>
                <Form.Select
                  value={burstAllowance}
                  onChange={(e) => setBurstAllowance(Number(e.target.value))}
                  className="fs-12"
                >
                  <option value={50}>50 Requests</option>
                  <option value={100}>100 Requests (Standar)</option>
                  <option value={200}>200 Requests (Flash Sale)</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-uppercase text-muted">Durasi Blokir IP (Jail)</Form.Label>
                <Form.Select
                  value={jailDurationMinutes}
                  onChange={(e) => setJailDurationMinutes(Number(e.target.value))}
                  className="fs-12"
                >
                  <option value={5}>5 Menit</option>
                  <option value={15}>15 Menit (Rekomendasi)</option>
                  <option value={60}>1 Jam</option>
                  <option value={1440}>24 Jam (DDoS Berat)</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* CHECKBOX WAF */}
          <div className="border rounded p-3 bg-light-subtle">
            <Form.Check
              type="checkbox"
              id="check-waf"
              label="Aktifkan Deep WAF Inspection (Mendeteksi SQLi, XSS payload, & User-Agent headless browser)"
              checked={enableWafInspection}
              onChange={(e) => setEnableWafInspection(e.target.checked)}
              className="fs-12"
            />
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="outline-secondary" size="sm" onClick={onHide}>
          Batal
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="d-flex align-items-center text-white"
          style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
          onClick={handleSave}
        >
          <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
          Terapkan Kebijakan API
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RateLimitConfigModal;
