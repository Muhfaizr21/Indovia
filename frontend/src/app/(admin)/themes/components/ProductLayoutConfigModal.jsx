import { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge, Row, Col } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const ProductLayoutConfigModal = ({ show, onHide, layout, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    styleType: '',
    status: 'PUBLIC_FREE',
    price: 0,
    isGlobalEnabled: true,
    allowMerchantOverride: true,
    enableStickyAddToCart: true,
    enableGlassZoom: true,
    enableSocialShare: true,
    enableReviewsTab: true
  });

  useEffect(() => {
    if (layout) {
      setFormData({
        name: layout.name || '',
        styleType: layout.styleType || '',
        status: layout.status || 'PUBLIC_FREE',
        price: layout.price || 0,
        isGlobalEnabled: layout.isGlobalEnabled ?? true,
        allowMerchantOverride: layout.allowMerchantOverride ?? true,
        enableStickyAddToCart: true,
        enableGlassZoom: true,
        enableSocialShare: true,
        enableReviewsTab: true
      });
    }
  }, [layout]);

  if (!layout) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...layout,
      ...formData,
      price: formData.status === 'PREMIUM' ? Number(formData.price) : 0
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="fs-16 fw-bold d-flex align-items-center gap-2">
          <IconifyIcon icon="solar:settings-bold" className="text-primary fs-20" />
          Konfigurasi {layout.name} ({layout.layoutNumber})
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          <Row className="g-3">
            {/* Nama & Style */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-muted text-uppercase">Nama Layout</Form.Label>
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
                <Form.Label className="fs-12 fw-semibold text-muted text-uppercase">Karakter Visual / Gaya</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.styleType}
                  onChange={(e) => setFormData({ ...formData, styleType: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>

            {/* Status Lisensi & Harga */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-muted text-uppercase">Status Lisensi Toko</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="PUBLIC_FREE">PUBLIC_FREE (Tersedia Gratis untuk Semua Toko)</option>
                  <option value="PREMIUM">PREMIUM (Biaya Tambahan / Paket Pro)</option>
                  <option value="ADMIN_ONLY">ADMIN_ONLY (Hanya Toko Flagship Pilihan)</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {formData.status === 'PREMIUM' && (
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-muted text-uppercase">Biaya Beli / Aktivasi (Rp)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="10000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            )}

            {/* Rute URL Info */}
            <Col md={12}>
              <div className="bg-light p-3 rounded-3 border">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div className="fs-12 text-muted fw-semibold text-uppercase">Rute URL Storefront</div>
                    <code className="fs-13 fw-bold text-primary">{layout.demoPath}</code>
                  </div>
                  <Badge bg="info" className="fs-11">
                    Terhubung ke React Router
                  </Badge>
                </div>
              </div>
            </Col>

            {/* Toggle Fitur Frontend */}
            <Col md={12}>
              <h6 className="fs-13 fw-bold text-dark mb-2 mt-2">Opsi Fitur Storefront</h6>
              <div className="row g-2">
                <Col sm={6}>
                  <Form.Check
                    type="switch"
                    id="switch-sticky-cart"
                    label="Aktifkan Sticky Add to Cart Bar"
                    checked={formData.enableStickyAddToCart}
                    onChange={(e) => setFormData({ ...formData, enableStickyAddToCart: e.target.checked })}
                  />
                </Col>
                <Col sm={6}>
                  <Form.Check
                    type="switch"
                    id="switch-glass-zoom"
                    label="Aktifkan Zoom Kaca Pembesar (Magnifier)"
                    checked={formData.enableGlassZoom}
                    onChange={(e) => setFormData({ ...formData, enableGlassZoom: e.target.checked })}
                  />
                </Col>
                <Col sm={6}>
                  <Form.Check
                    type="switch"
                    id="switch-social-share"
                    label="Tampilkan Tombol Berbagi Medsos"
                    checked={formData.enableSocialShare}
                    onChange={(e) => setFormData({ ...formData, enableSocialShare: e.target.checked })}
                  />
                </Col>
                <Col sm={6}>
                  <Form.Check
                    type="switch"
                    id="switch-merchant-override"
                    label="Izinkan Merchant Kustomisasi Skema"
                    checked={formData.allowMerchantOverride}
                    onChange={(e) => setFormData({ ...formData, allowMerchantOverride: e.target.checked })}
                  />
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
            Simpan Perubahan
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductLayoutConfigModal;
