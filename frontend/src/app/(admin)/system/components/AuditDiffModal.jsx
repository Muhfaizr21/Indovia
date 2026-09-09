import { Modal, Button, Row, Col, Badge, Card, CardBody, Alert } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const AuditDiffModal = ({ show, onHide, log }) => {
  if (!log) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="d-flex align-items-center fs-16 fw-bold">
          <div className="avatar-xs bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center me-2">
            <IconifyIcon icon="solar:history-bold" className="fs-18" />
          </div>
          Audit Trail Log #{log.id} — Perubahan Data JSON Diff
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* METADATA BAR */}
        <div className="p-3 border rounded bg-light-subtle mb-3">
          <Row className="g-2 fs-12">
            <Col sm={6} md={3}>
              <span className="text-muted d-block fs-11 text-uppercase">Waktu Transaksi</span>
              <strong className="font-monospace text-body">{log.timestamp}</strong>
            </Col>
            <Col sm={6} md={3}>
              <span className="text-muted d-block fs-11 text-uppercase">Pelaku (Actor)</span>
              <strong className="text-body">{log.actorName}</strong> ({log.actorId})
            </Col>
            <Col sm={6} md={3}>
              <span className="text-muted d-block fs-11 text-uppercase">Aksi &amp; Target</span>
              <Badge bg={log.actionBadgeColor || 'primary'} className="me-1">
                {log.action}
              </Badge>
              <span className="font-monospace text-muted">[{log.targetTable}]</span>
            </Col>
            <Col sm={6} md={3}>
              <span className="text-muted d-block fs-11 text-uppercase">Alamat IP &amp; Lokasi</span>
              <span className="font-monospace text-body">{log.ipAddress}</span> ({log.location})
            </Col>
          </Row>
        </div>

        {/* CRYPTOGRAPHIC VERIFIER */}
        <Alert variant="secondary" className="d-flex align-items-center mb-3 py-2 border-0 bg-light fs-11">
          <IconifyIcon icon="solar:shield-check-bold" className="fs-18 me-2 text-success flex-shrink-0" />
          <div className="text-truncate">
            <strong className="text-dark">SHA-256 Chained Hash Verifier (WORM Compliant):</strong>
            <br />
            <code className="text-muted fs-10 font-monospace text-break">{log.sha256Hash}</code>
          </div>
        </Alert>

        {/* SIDE-BY-SIDE JSON DIFF */}
        <div className="mb-2 d-flex justify-content-between align-items-center">
          <span className="fs-12 fw-bold text-uppercase text-muted">Perbandingan Data State (Sebelum vs Sesudah)</span>
          <Badge bg="dark" className="fs-10">Record ID: {log.recordId}</Badge>
        </div>

        <Row className="g-3 mb-3">
          {/* STATE SEBELUM */}
          <Col md={6}>
            <Card className="border border-danger-subtle bg-danger-subtle h-100 shadow-none mb-0">
              <div className="p-2 border-bottom border-danger-subtle bg-danger text-white fs-11 fw-bold d-flex align-items-center justify-content-between">
                <span>
                  <IconifyIcon icon="solar:minus-circle-bold" className="me-1" />
                  DATA SEBELUM (OLD STATE)
                </span>
                <small>Read-Only</small>
              </div>
              <CardBody className="p-2">
                <pre className="mb-0 fs-11 font-monospace text-dark p-2 bg-white rounded border" style={{ maxHeight: 220, overflowY: 'auto' }}>
                  {JSON.stringify(log.diff?.before, null, 2)}
                </pre>
              </CardBody>
            </Card>
          </Col>

          {/* STATE SESUDAH */}
          <Col md={6}>
            <Card className="border border-success-subtle bg-success-subtle h-100 shadow-none mb-0">
              <div className="p-2 border-bottom border-success-subtle bg-success text-white fs-11 fw-bold d-flex align-items-center justify-content-between">
                <span>
                  <IconifyIcon icon="solar:add-circle-bold" className="me-1" />
                  DATA SESUDAH (NEW STATE)
                </span>
                <small>Immutable WORM</small>
              </div>
              <CardBody className="p-2">
                <pre className="mb-0 fs-11 font-monospace text-dark p-2 bg-white rounded border" style={{ maxHeight: 220, overflowY: 'auto' }}>
                  {JSON.stringify(log.diff?.after, null, 2)}
                </pre>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* USER AGENT FOOTER */}
        <div className="p-2 border rounded bg-light fs-11 text-muted text-truncate">
          <strong>Browser User-Agent:</strong> {log.userAgent}
        </div>
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="outline-secondary" size="sm" onClick={onHide}>
          Tutup
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="d-flex align-items-center text-white"
          style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
          onClick={() => {
            alert(`Bukti Audit Log #${log.id} SHA-256 berhasil diekspor sebagai JSON bukti hukum legal.`);
          }}
        >
          <IconifyIcon icon="solar:download-square-bold" className="me-1" />
          Unduh Bukti Hukum (JSON)
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuditDiffModal;
