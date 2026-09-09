import { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const TakeRateModal = ({ show, onHide, onSave, currentRules }) => {
  const [rules, setRules] = useState(
    currentRules || {
      starterPercent: 1.5,
      starterFixed: 1000,
      proPercent: 0.8,
      proFixed: 500,
      enterprisePercent: 0.0,
      enterpriseFixed: 0,
      absorbGatewayFee: false,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(rules);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-16 text-body d-flex align-items-center">
          <IconifyIcon icon="solar:calculator-bold-duotone" className="me-2 text-primary fs-22" />
          Konfigurasi Skema Platform Take-Rate & Bagi Hasil
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body className="p-3 pt-2">
          <Alert variant="info" className="p-2.5 fs-12 mb-3">
            <IconifyIcon icon="solar:info-circle-bold" className="me-1 fs-15 text-primary" />
            Setiap pesanan yang diselesaikan di toko merchant akan secara otomatis dipotong komisi ini saat *settlement payout* dilakukan.
          </Alert>

          {/* Tier Starter */}
          <div className="p-2.5 rounded border mb-3 bg-light bg-opacity-25">
            <h6 className="fw-bold text-body fs-13 mb-2 d-flex align-items-center">
              <span className="badge bg-secondary me-2">Starter</span>
              Skema Komisi Paket Starter
            </h6>
            <Row className="g-2">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold">Persentase (% GMV):</Form.Label>
                  <div className="input-group input-group-sm">
                    <Form.Control
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={rules.starterPercent}
                      onChange={(e) => setRules({ ...rules, starterPercent: Number(e.target.value) })}
                    />
                    <span className="input-group-text">% GMV</span>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold">Biaya Tetap per Transaksi (Rp):</Form.Label>
                  <div className="input-group input-group-sm">
                    <span className="input-group-text">Rp</span>
                    <Form.Control
                      type="number"
                      step="100"
                      min="0"
                      value={rules.starterFixed}
                      onChange={(e) => setRules({ ...rules, starterFixed: Number(e.target.value) })}
                    />
                    <span className="input-group-text">/ order</span>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Tier Pro */}
          <div className="p-2.5 rounded border mb-3 bg-light bg-opacity-25">
            <h6 className="fw-bold text-body fs-13 mb-2 d-flex align-items-center">
              <span className="badge bg-primary me-2">Pro</span>
              Skema Komisi Paket Pro
            </h6>
            <Row className="g-2">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold">Persentase (% GMV):</Form.Label>
                  <div className="input-group input-group-sm">
                    <Form.Control
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={rules.proPercent}
                      onChange={(e) => setRules({ ...rules, proPercent: Number(e.target.value) })}
                    />
                    <span className="input-group-text">% GMV</span>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold">Biaya Tetap per Transaksi (Rp):</Form.Label>
                  <div className="input-group input-group-sm">
                    <span className="input-group-text">Rp</span>
                    <Form.Control
                      type="number"
                      step="100"
                      min="0"
                      value={rules.proFixed}
                      onChange={(e) => setRules({ ...rules, proFixed: Number(e.target.value) })}
                    />
                    <span className="input-group-text">/ order</span>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Tier Enterprise */}
          <div className="p-2.5 rounded border mb-3 bg-light bg-opacity-25">
            <h6 className="fw-bold text-body fs-13 mb-2 d-flex align-items-center">
              <span className="badge bg-warning me-2 text-dark">Enterprise</span>
              Skema Komisi Paket Enterprise (0% Take-Rate)
            </h6>
            <Row className="g-2">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold">Persentase (% GMV):</Form.Label>
                  <div className="input-group input-group-sm">
                    <Form.Control
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={rules.enterprisePercent}
                      onChange={(e) => setRules({ ...rules, enterprisePercent: Number(e.target.value) })}
                    />
                    <span className="input-group-text">% GMV</span>
                  </div>
                  <Form.Text className="fs-10 text-success">Paket Enterprise 0% komisi transaksi.</Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold">Biaya Tetap per Transaksi (Rp):</Form.Label>
                  <div className="input-group input-group-sm">
                    <span className="input-group-text">Rp</span>
                    <Form.Control
                      type="number"
                      step="100"
                      min="0"
                      value={rules.enterpriseFixed}
                      onChange={(e) => setRules({ ...rules, enterpriseFixed: Number(e.target.value) })}
                    />
                    <span className="input-group-text">/ order</span>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" size="sm" onClick={onHide}>
            Batal
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="fw-semibold text-white px-3"
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
          >
            <IconifyIcon icon="solar:disk-bold" className="me-1" />
            Simpan Aturan Komisi
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default TakeRateModal;
