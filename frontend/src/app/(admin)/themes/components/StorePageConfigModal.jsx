import { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge, Row, Col } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const StorePageConfigModal = ({ show, onHide, page, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    seoTitle: '',
    routePath: '',
    isGlobalEnabled: true,
    showInNavigation: true,
    allowMerchantToggle: true,
    description: ''
  });

  useEffect(() => {
    if (page) {
      setFormData({
        name: page.name || '',
        seoTitle: page.seoTitle || '',
        routePath: page.routePath || '',
        isGlobalEnabled: page.isGlobalEnabled ?? true,
        showInNavigation: page.showInNavigation ?? true,
        allowMerchantToggle: page.allowMerchantToggle ?? true,
        description: page.description || ''
      });
    }
  }, [page]);

  if (!page) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...page,
      ...formData
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fs-16 fw-bold d-flex align-items-center gap-2">
          <IconifyIcon icon="solar:settings-bold" className="text-primary fs-20" />
          Konfigurasi Halaman {page.name}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          <Row className="g-3">
            {/* Nama & SEO Title */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-muted text-uppercase">Nama Halaman di Menu</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-muted text-uppercase">SEO Meta Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>

            {/* Rute URL Info */}
            <Col md={12}>
              <div className="bg-light p-3 rounded-3 border">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div>
                    <div className="fs-12 text-muted fw-semibold text-uppercase">Rute URL Storefront</div>
                    <code className="fs-14 fw-bold text-primary">{page.routePath}</code>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Badge bg="secondary" className="fs-11 text-uppercase">
                      {page.groupLabel}
                    </Badge>
                    <Badge bg="info" className="fs-11">
                      React Router Active
                    </Badge>
                  </div>
                </div>
              </div>
            </Col>

            {/* Deskripsi */}
            <Col md={12}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-muted text-uppercase">Fungsi &amp; Deskripsi Halaman</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Form.Group>
            </Col>

            {/* Toggle Kontrol Akses & Visibilitas */}
            <Col md={12}>
              <h6 className="fs-13 fw-bold text-dark mb-2 mt-2">Visibilitas &amp; Kontrol Akses Platform</h6>
              <div className="row g-3 bg-light p-3 rounded-3 border">
                <Col sm={6}>
                  <Form.Check
                    type="switch"
                    id="switch-nav-visible"
                    label="Tampilkan di Dropdown Menu 'Pages' Storefront"
                    checked={formData.showInNavigation}
                    onChange={(e) => setFormData({ ...formData, showInNavigation: e.target.checked })}
                  />
                  <small className="text-muted fs-11 d-block mt-0.5">
                    Jika nonaktif, halaman tetap bisa dibuka via direct link tapi disembunyikan dari navbar.
                  </small>
                </Col>
                <Col sm={6}>
                  <Form.Check
                    type="switch"
                    id="switch-merchant-toggle-page"
                    label="Izinkan Toko Merchant Mengaktifkan / Mematikan"
                    checked={formData.allowMerchantToggle}
                    onChange={(e) => setFormData({ ...formData, allowMerchantToggle: e.target.checked })}
                  />
                  <small className="text-muted fs-11 d-block mt-0.5">
                    Izinkan merchant menyembunyikan halaman ini jika bisnis mereka belum memerlukannya.
                  </small>
                </Col>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button variant="outline-secondary" onClick={onHide}>
            Batal
          </Button>
          <Button variant="primary" type="submit">
            <IconifyIcon icon="solar:diskette-bold" className="me-1" />
            Simpan Konfigurasi
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default StorePageConfigModal;
