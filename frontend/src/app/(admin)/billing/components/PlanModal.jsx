import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const PlanModal = ({ show, onHide, plan, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    badge: '',
    tagline: '',
    priceMonthly: 0,
    price6Month: 0,
    priceYearly: 0,
    maxProducts: 100,
    maxStaff: 2,
    storageGb: 10,
    customDomain: false,
    customTheme: false,
    apiWebhook: false,
    takeRatePercent: 1.0,
    fixedFee: 1000,
    supportSla: 'Email Standar',
    isActive: true,
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name || '',
        badge: plan.badge || '',
        tagline: plan.tagline || '',
        priceMonthly: plan.priceMonthly || 0,
        price6Month: plan.price6Month || 0,
        priceYearly: plan.priceYearly || 0,
        maxProducts: plan.quotas?.maxProducts || 100,
        maxStaff: plan.quotas?.maxStaff || 2,
        storageGb: plan.quotas?.storageGb || 10,
        customDomain: Boolean(plan.quotas?.customDomain),
        customTheme: Boolean(plan.quotas?.customTheme),
        apiWebhook: Boolean(plan.quotas?.apiWebhook),
        takeRatePercent: plan.takeRate?.percent || 0,
        fixedFee: plan.takeRate?.fixedFee || 0,
        supportSla: plan.quotas?.supportSla || 'Email Standar',
        isActive: plan.isActive ?? true,
      });
    } else {
      setFormData({
        name: '',
        badge: 'Tier Baru',
        tagline: '',
        priceMonthly: 299000,
        price6Month: 1614600,
        priceYearly: 2870400,
        maxProducts: 150,
        maxStaff: 3,
        storageGb: 5,
        customDomain: true,
        customTheme: false,
        apiWebhook: false,
        takeRatePercent: 1.0,
        fixedFee: 500,
        supportSla: 'Prioritas Email (12 Jam)',
        isActive: true,
      });
    }
  }, [plan, show]);

  // Auto-calculate 6 month (10% off) and yearly (20% off) when monthly price changes
  const handleMonthlyPriceChange = (val) => {
    const num = Number(val) || 0;
    const p6 = Math.round(num * 6 * 0.9);
    const p12 = Math.round(num * 12 * 0.8);
    setFormData((prev) => ({
      ...prev,
      priceMonthly: num,
      price6Month: p6,
      priceYearly: p12,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...(plan || { id: `plan-${Date.now()}` }),
      name: formData.name,
      badge: formData.badge,
      tagline: formData.tagline,
      priceMonthly: Number(formData.priceMonthly),
      price6Month: Number(formData.price6Month),
      priceYearly: Number(formData.priceYearly),
      isActive: formData.isActive,
      quotas: {
        ...(plan?.quotas || {}),
        maxProducts: formData.maxProducts === 'Unlimited' ? 'Unlimited' : Number(formData.maxProducts),
        maxStaff: formData.maxStaff === 'Unlimited' ? 'Unlimited' : Number(formData.maxStaff),
        storageGb: Number(formData.storageGb),
        customDomain: formData.customDomain,
        customTheme: formData.customTheme,
        apiWebhook: formData.apiWebhook,
        supportSla: formData.supportSla,
      },
      takeRate: {
        percent: Number(formData.takeRatePercent),
        fixedFee: Number(formData.fixedFee),
      },
    };
    onSave(updated);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-16 text-body d-flex align-items-center">
          <IconifyIcon icon="solar:tag-price-bold-duotone" className="me-2 text-primary fs-22" />
          {plan ? `Konfigurasi Tier Paket: ${plan.name}` : 'Buat Tier Paket Berlangganan Baru'}
        </Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body className="p-3 pt-2">
          <Alert variant="info" className="p-2.5 fs-12 mb-3">
            <IconifyIcon icon="solar:info-circle-bold" className="me-1 fs-15 text-primary" />
            Pengaturan ini secara otomatis membatasi kuota tenant dan menghitung penagihan berkala (recurring auto-debit).
          </Alert>

          <h6 className="fw-bold text-body fs-13 mb-2 border-bottom pb-1">1. Informasi Umum & Branding Tier</h6>
          <Row className="g-2 mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Nama Tier Paket:</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  required
                  placeholder="e.g. Pro Growth"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Label Badge:</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="e.g. Paling Populer, Bisnis Berkembang"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Deskripsi / Tagline Singkat:</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Deskripsi target merchant untuk tier ini..."
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>

          <h6 className="fw-bold text-body fs-13 mb-2 border-bottom pb-1">2. Struktur Harga & Siklus Penagihan</h6>
          <Row className="g-2 mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Biaya Bulanan (Rp):</Form.Label>
                <Form.Control
                  type="number"
                  size="sm"
                  required
                  value={formData.priceMonthly}
                  onChange={(e) => handleMonthlyPriceChange(e.target.value)}
                />
                <Form.Text className="fs-10 text-muted">Basis kalkulasi diskon siklus.</Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Biaya 6 Bulan (-10%):</Form.Label>
                <Form.Control
                  type="number"
                  size="sm"
                  value={formData.price6Month}
                  onChange={(e) => setFormData({ ...formData, price6Month: e.target.value })}
                />
                <Form.Text className="fs-10 text-success">Otomatis diskon 10%</Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Biaya Tahunan (-20%):</Form.Label>
                <Form.Control
                  type="number"
                  size="sm"
                  value={formData.priceYearly}
                  onChange={(e) => setFormData({ ...formData, priceYearly: e.target.value })}
                />
                <Form.Text className="fs-10 text-success">Otomatis diskon 20%</Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <h6 className="fw-bold text-body fs-13 mb-2 border-bottom pb-1">3. Konfigurasi Kuota Granular & Akses Fitur</h6>
          <Row className="g-2 mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Maks. Produk:</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="e.g. 500 atau Unlimited"
                  value={formData.maxProducts}
                  onChange={(e) => setFormData({ ...formData, maxProducts: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Maks. Akun Staf Toko:</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="e.g. 5 atau Unlimited"
                  value={formData.maxStaff}
                  onChange={(e) => setFormData({ ...formData, maxStaff: e.target.value })}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Penyimpanan Media CDN (GB):</Form.Label>
                <Form.Control
                  type="number"
                  size="sm"
                  value={formData.storageGb}
                  onChange={(e) => setFormData({ ...formData, storageGb: e.target.value })}
                />
              </Form.Group>
            </Col>

            <Col md={12} className="mt-2">
              <div className="p-2.5 rounded border bg-light bg-opacity-50">
                <div className="d-flex flex-wrap gap-4">
                  <Form.Check
                    type="switch"
                    id="switch-custom-domain"
                    label="Akses Domain Kustom & SSL Otomatis"
                    className="fs-12 fw-medium"
                    checked={formData.customDomain}
                    onChange={(e) => setFormData({ ...formData, customDomain: e.target.checked })}
                  />
                  <Form.Check
                    type="switch"
                    id="switch-custom-theme"
                    label="Akses Editor Kode Tema Kustom"
                    className="fs-12 fw-medium"
                    checked={formData.customTheme}
                    onChange={(e) => setFormData({ ...formData, customTheme: e.target.checked })}
                  />
                  <Form.Check
                    type="switch"
                    id="switch-api-webhook"
                    label="Akses API Webhook & Developer"
                    className="fs-12 fw-medium"
                    checked={formData.apiWebhook}
                    onChange={(e) => setFormData({ ...formData, apiWebhook: e.target.checked })}
                  />
                </div>
              </div>
            </Col>
          </Row>

          <h6 className="fw-bold text-body fs-13 mb-2 border-bottom pb-1">4. Skema Komisi Take-Rate Per Pesanan</h6>
          <Row className="g-2">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold">Persentase Transaksi (% GMV):</Form.Label>
                <div className="input-group input-group-sm">
                  <Form.Control
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.takeRatePercent}
                    onChange={(e) => setFormData({ ...formData, takeRatePercent: e.target.value })}
                  />
                  <span className="input-group-text">% dari GMV</span>
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
                    min="0"
                    step="100"
                    value={formData.fixedFee}
                    onChange={(e) => setFormData({ ...formData, fixedFee: e.target.value })}
                  />
                  <span className="input-group-text">/ order</span>
                </div>
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
            variant="primary"
            size="sm"
            className="fw-semibold text-white px-3"
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
          >
            <IconifyIcon icon="solar:disk-bold" className="me-1" />
            Simpan Konfigurasi Paket
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default PlanModal;
