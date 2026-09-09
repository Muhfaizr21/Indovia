import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Badge } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { formatRupiah } from '../data';

const ThemeConfigModal = ({ show, onHide, theme, onSave }) => {
  const [form, setForm] = useState({
    name: '',
    version: '',
    status: 'PUBLIC_FREE',
    price: 0,
    isGlobalEnabled: true,
    changelog: '',
    author: ''
  });

  useEffect(() => {
    if (theme) {
      setForm({
        name: theme.name || '',
        version: theme.version || 'v1.0.0',
        status: theme.status || 'PUBLIC_FREE',
        price: theme.price || 0,
        isGlobalEnabled: theme.isGlobalEnabled ?? true,
        changelog: 'Pembaruan kompatibilitas layout, optimasi render hero banner, dan integrasi katalog produk.',
        author: theme.author || 'Indovia Design Lab'
      });
    }
  }, [theme]);

  if (!theme) return null;

  const handleBumpVersion = (type) => {
    const raw = form.version.replace('v', '').split('.').map(Number);
    let [major = 1, minor = 0, patch = 0] = raw;

    if (type === 'patch') patch += 1;
    if (type === 'minor') {
      minor += 1;
      patch = 0;
    }
    if (type === 'major') {
      major += 1;
      minor = 0;
      patch = 0;
    }

    setForm({ ...form, version: `v${major}.${minor}.${patch}` });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...theme,
      ...form,
      updatedAt: new Date().toISOString().split('T')[0]
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-secondary-subtle">
        <Modal.Title className="d-flex align-items-center gap-2 fs-16 fw-bold text-body">
          <IconifyIcon icon="solar:settings-bold-duotone" className="text-primary fs-22" />
          Konfigurasi Tema &amp; Kontrol Lisensi Pasar ({theme.demoNumber})
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          {/* Header Summary Banner */}
          <div className="p-3 rounded-2 bg-body-secondary border border-secondary-subtle mb-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <img
                src={theme.thumbnail}
                alt={theme.name}
                className="rounded-2 border flex-shrink-0"
                style={{ width: '60px', height: '40px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div>
                <h6 className="mb-0 fs-13 fw-bold text-body">{theme.name}</h6>
                <small className="text-muted fs-11 font-monospace">
                  Bundle: {theme.bundleKey} • Path: {theme.demoPath}
                </small>
              </div>
            </div>
            <div className="text-end">
              <span className="fs-12 text-muted d-block">Toko Aktif:</span>
              <strong className="text-body fs-13">{theme.activeMerchantsCount} Merchant</strong>
            </div>
          </div>

          <Row className="g-3">
            {/* Theme Name */}
            <Col md={7}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-body">
                  Nama Resmi Tema
                </Form.Label>
                <Form.Control
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border-secondary-subtle fs-13"
                  required
                />
              </Form.Group>
            </Col>

            {/* Author / Vendor */}
            <Col md={5}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-body">
                  Pengembang / Creator Studio
                </Form.Label>
                <Form.Control
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="border-secondary-subtle fs-13"
                />
              </Form.Group>
            </Col>

            {/* Semantic Version & Bump Buttons */}
            <Col md={6}>
              <Form.Group>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <Form.Label className="fs-12 fw-semibold text-body mb-0">
                    Versi Rilis Semantik
                  </Form.Label>
                  <div className="d-flex gap-1">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      className="py-0 px-1.5 fs-10"
                      onClick={() => handleBumpVersion('patch')}
                      title="Naikkan Patch Version (+0.0.1)"
                    >
                      +Patch
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      className="py-0 px-1.5 fs-10"
                      onClick={() => handleBumpVersion('minor')}
                      title="Naikkan Minor Version (+0.1.0)"
                    >
                      +Minor
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      className="py-0 px-1.5 fs-10"
                      onClick={() => handleBumpVersion('major')}
                      title="Naikkan Major Version (+1.0.0)"
                    >
                      +Major
                    </Button>
                  </div>
                </div>
                <Form.Control
                  type="text"
                  value={form.version}
                  onChange={(e) => setForm({ ...form, version: e.target.value })}
                  className="border-secondary-subtle fs-13 font-monospace"
                  required
                />
              </Form.Group>
            </Col>

            {/* Status Tema */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-body">
                  Status Distribusi Pasar
                </Form.Label>
                <Form.Select
                  value={form.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    let price = form.price;
                    if (newStatus === 'PUBLIC_FREE') price = 0;
                    if (newStatus === 'PREMIUM' && price === 0) price = 199000;
                    setForm({ ...form, status: newStatus, price });
                  }}
                  className="border-secondary-subtle fs-13"
                >
                  <option value="PUBLIC_FREE">PUBLIC_FREE (Tersedia Gratis untuk Semua)</option>
                  <option value="PREMIUM">PREMIUM (Berbayar / Upgrade Pro)</option>
                  <option value="BETA">BETA / STAGING (Uji Coba Terbatas Early-Access)</option>
                  <option value="DEPRECATED">DEPRECATED (Usang - Toko Baru Tidak Bisa Memilih)</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Price / Activation Fee */}
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-body">
                  Biaya Aktivasi Sekali Bayar (One-Time Fee)
                </Form.Label>
                <Form.Control
                  type="number"
                  disabled={form.status === 'PUBLIC_FREE'}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  className="border-secondary-subtle fs-13 font-monospace"
                  min={0}
                  step={10000}
                />
                <small className="text-muted fs-11 mt-1 d-block">
                  {form.status === 'PUBLIC_FREE' ? 'Tema gratis tidak dikenakan biaya aktivasi.' : `Ditagihkan: ${formatRupiah(form.price)} per toko.`}
                </small>
              </Form.Group>
            </Col>

            {/* Global Kill-Switch Toggle */}
            <Col md={6}>
              <div className="p-3 bg-body-tertiary rounded border border-secondary-subtle h-100 d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fw-bold text-body fs-12 d-block">Saklar Operasional Global</span>
                    <small className="text-muted fs-11">
                      {form.isGlobalEnabled ? 'Tema AKTIF di katalog' : 'Tema DINONAKTIFKAN (Kill-Switch)'}
                    </small>
                  </div>
                  <Form.Check
                    type="switch"
                    id="switch-theme-global"
                    checked={form.isGlobalEnabled}
                    onChange={(e) => setForm({ ...form, isGlobalEnabled: e.target.checked })}
                  />
                </div>
                <div className="mt-2 pt-2 border-top border-secondary-subtle">
                  <Badge bg={form.isGlobalEnabled ? 'success-subtle' : 'danger-subtle'} className={form.isGlobalEnabled ? 'text-success' : 'text-danger'}>
                    {form.isGlobalEnabled ? '✓ LIVE OPERATIONAL' : '✕ DISABLED / KILL-SWITCH'}
                  </Badge>
                </div>
              </div>
            </Col>

            {/* Changelog & Release Notes */}
            <Col md={12}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-body">
                  Catatan Rilis / Changelog Versi ({form.version})
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={form.changelog}
                  onChange={(e) => setForm({ ...form, changelog: e.target.value })}
                  className="border-secondary-subtle fs-12"
                  placeholder="Deskripsikan fitur baru atau perbaikan bug di versi ini..."
                />
              </Form.Group>
            </Col>
          </Row>
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
            Simpan Konfigurasi Tema
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ThemeConfigModal;
