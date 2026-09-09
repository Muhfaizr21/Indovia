import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Badge } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const SectionSchemaModal = ({ show, onHide, section, onSave }) => {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (section) {
      setJsonText(JSON.stringify(section.defaultSchema, null, 2));
      setError(null);
      setSuccess(false);
    }
  }, [section]);

  if (!section) return null;

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err) {
      setError(`Format JSON tidak valid: ${err.message}`);
    }
  };

  const handleReset = () => {
    setJsonText(JSON.stringify(section.defaultSchema, null, 2));
    setError(null);
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(jsonText);
      onSave({
        ...section,
        defaultSchema: parsed
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onHide();
      }, 700);
    } catch (err) {
      setError(`Gagal menyimpan: Format JSON tidak valid (${err.message})`);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-secondary-subtle">
        <Modal.Title className="d-flex align-items-center gap-2 fs-16 fw-bold text-body">
          <IconifyIcon icon="solar:code-file-bold-duotone" className="text-primary fs-22" />
          Default JSON Schema Builder: {section.name}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSave}>
        <Modal.Body className="p-4">
          {/* Section Info Header */}
          <div className="p-3 rounded-2 bg-body-secondary border border-secondary-subtle mb-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="badge bg-secondary font-monospace fs-11">{section.key}</span>
                <Badge bg="info-subtle" className="text-info border border-info-subtle fs-11">
                  {section.category}
                </Badge>
              </div>
              <p className="text-muted fs-12 mb-0">{section.description}</p>
            </div>
            <div className="text-end">
              <span className="fs-11 text-muted d-block">Dependensi Sistem:</span>
              <strong className="text-body fs-12 font-monospace">{section.systemDependency}</strong>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-2">
            <Form.Label className="fs-12 fw-semibold text-body mb-0">
              Konfigurasi JSON Schema Default (Batasan Builder Toko)
            </Form.Label>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                className="py-1 px-2.5 fs-11 d-flex align-items-center"
                onClick={handleFormat}
              >
                <IconifyIcon icon="solar:magic-stick-bold" className="me-1" />
                Format JSON
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                className="py-1 px-2.5 fs-11 d-flex align-items-center"
                onClick={handleReset}
              >
                <IconifyIcon icon="solar:restart-bold" className="me-1" />
                Reset ke Default
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="danger" className="py-2 px-3 fs-12 d-flex align-items-center gap-2 mb-2">
              <IconifyIcon icon="solar:danger-triangle-bold" className="fs-16 flex-shrink-0" />
              <span>{error}</span>
            </Alert>
          )}

          {success && (
            <Alert variant="success" className="py-2 px-3 fs-12 d-flex align-items-center gap-2 mb-2">
              <IconifyIcon icon="solar:check-circle-bold" className="fs-16 flex-shrink-0" />
              <span>JSON Schema berhasil diperbarui dan diterapkan ke seluruh builder merchant!</span>
            </Alert>
          )}

          <Form.Control
            as="textarea"
            rows={12}
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value);
              setError(null);
            }}
            className="font-monospace fs-12 bg-dark text-light border-secondary border-opacity-50 p-3 rounded-2"
            style={{ tabSize: 2, lineHeight: 1.5 }}
            spellCheck="false"
            required
          />

          <small className="text-muted fs-11 d-block mt-2">
            Tip: Skema ini menentukan nilai *fallback* dan batasan parameter ketika toko merchant menyalakan seksi ini di editor visual toko mereka.
          </small>
        </Modal.Body>

        <Modal.Footer className="border-secondary-subtle">
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
            Simpan &amp; Terapkan Schema
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SectionSchemaModal;
