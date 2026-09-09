import { useState, useMemo } from 'react';
import { Row, Col, Card, CardBody, Badge, Button, Form, Table, Toast, ToastContainer } from 'react-bootstrap';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { initialProductLayouts, formatRupiah } from '../data';
import ThemePreviewModal from '../components/ThemePreviewModal';
import ProductLayoutConfigModal from '../components/ProductLayoutConfigModal';

const ProductLayoutsPage = () => {
  const [layouts, setLayouts] = useState(initialProductLayouts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [viewMode, setViewMode] = useState('GRID'); // 'GRID' | 'TABLE'

  // Modals state
  const [previewLayout, setPreviewLayout] = useState(null);
  const [configLayout, setConfigLayout] = useState(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, variant = 'success') => {
    setToastMessage({ msg, variant });
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(layouts.map((l) => l.category));
    return ['ALL', ...Array.from(set)];
  }, [layouts]);

  // Filtered layouts
  const filteredLayouts = useMemo(() => {
    return layouts.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.layoutNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.styleType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCat = selectedCategory === 'ALL' || l.category === selectedCategory;
      const matchesStatus =
        selectedStatus === 'ALL' ||
        (selectedStatus === 'DEFAULT' && l.isDefault) ||
        (selectedStatus === 'ACTIVE' && l.isGlobalEnabled) ||
        (selectedStatus === 'DISABLED' && !l.isGlobalEnabled) ||
        l.status === selectedStatus;
      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [layouts, searchTerm, selectedCategory, selectedStatus]);

  // Statistics
  const stats = useMemo(() => {
    const total = layouts.length;
    const defaultLayout = layouts.find((l) => l.isDefault)?.name || 'Product Single 1';
    const active = layouts.filter((l) => l.isGlobalEnabled).length;
    const free = layouts.filter((l) => l.status === 'PUBLIC_FREE').length;
    const premium = layouts.filter((l) => l.status === 'PREMIUM').length;
    const totalUsage = layouts.reduce((acc, curr) => acc + curr.activeMerchantsCount, 0);
    return { total, defaultLayout, active, free, premium, totalUsage };
  }, [layouts]);

  // Toggle Global ON/OFF for a single layout
  const handleToggleLayout = (id) => {
    setLayouts((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const nextState = !l.isGlobalEnabled;
          showToast(
            `Tata letak ${l.name} sekarang ${nextState ? 'AKTIF' : 'DINONAKTIFKAN SECARA GLOBAL'}!`,
            nextState ? 'success' : 'danger'
          );
          return { ...l, isGlobalEnabled: nextState };
        }
        return l;
      })
    );
  };

  // Set as platform default layout
  const handleSetDefault = (id) => {
    setLayouts((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          showToast(`${l.name} berhasil ditetapkan sebagai Layout Default Toko Baru!`, 'primary');
          return { ...l, isDefault: true, isGlobalEnabled: true };
        }
        return { ...l, isDefault: false };
      })
    );
  };

  // Save config from modal
  const handleSaveConfig = (updatedLayout) => {
    setLayouts((prev) =>
      prev.map((l) => (l.id === updatedLayout.id ? updatedLayout : l))
    );
    showToast(`Pengaturan tata letak ${updatedLayout.name} berhasil disimpan!`, 'success');
  };

  return (
    <>
      <PageTitle title="Tata Letak Detail Produk (24 Layouts)" subName="Tema &amp; Tata Letak" />

      {/* TOAST NOTIFICATION */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        {toastMessage && (
          <Toast
            onClose={() => setToastMessage(null)}
            show={!!toastMessage}
            delay={3500}
            autohide
            bg={toastMessage.variant}
          >
            <Toast.Header className="text-dark">
              <IconifyIcon icon="solar:bell-bing-bold" className="me-2" />
              <strong className="me-auto">Layout Detail Produk</strong>
              <small>Baru saja</small>
            </Toast.Header>
            <Toast.Body className="text-white fw-medium">{toastMessage.msg}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>

      {/* KPI METRIC SUMMARY CARDS */}
      <Row className="g-3 mb-4">
        {/* Total Layouts */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Total Layout Master</span>
                  <h3 className="text-body fw-bold my-1">{stats.total} Layouts</h3>
                  <small className="text-success fw-medium">
                    <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
                    24 Variasi Product Single
                  </small>
                </div>
                <div className="avatar-md bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:gallery-wide-bold" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Default Platform Layout */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Default Toko Baru</span>
                  <h3 className="text-primary fw-bold my-1 fs-18">{stats.defaultLayout}</h3>
                  <small className="text-muted">Layout aktif saat merchant mendaftar</small>
                </div>
                <div className="avatar-md bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:star-bold" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Free vs Premium */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Lisensi Layout</span>
                  <h3 className="text-body fw-bold my-1">
                    {stats.free} <span className="fs-14 fw-normal text-muted">Free</span> / {stats.premium}{' '}
                    <span className="fs-14 fw-normal text-warning">Pro</span>
                  </h3>
                  <small className="text-info fw-medium">
                    <IconifyIcon icon="solar:shield-check-bold" className="me-1" />
                    Monetisasi paket merchant
                  </small>
                </div>
                <div className="avatar-md bg-warning-subtle text-warning rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:crown-bold" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Total Store Adoption */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Adopsi Toko Merchant</span>
                  <h3 className="text-success fw-bold my-1">{stats.totalUsage.toLocaleString()} Toko</h3>
                  <small className="text-success fw-medium">
                    <IconifyIcon icon="solar:shop-2-bold" className="me-1" />
                    {stats.active} Layout Aktif Global
                  </small>
                </div>
                <div className="avatar-md bg-info-subtle text-info rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:users-group-rounded-bold" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* FILTER & TOOLBAR CARD */}
      <Card className="border-secondary-subtle mb-4 shadow-sm">
        <CardBody className="p-3">
          <Row className="g-3 align-items-center">
            {/* Search */}
            <Col lg={4}>
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Cari layout (misal: Product Single 1, 360 Orbit, Zoom, Sticky)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="ps-4"
                />
                <IconifyIcon
                  icon="solar:magnifer-linear"
                  className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted fs-16"
                />
              </div>
            </Col>

            {/* Filter Category */}
            <Col sm={6} lg={3}>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="fs-13"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    Kategori: {c === 'ALL' ? 'Semua Kategori' : c}
                  </option>
                ))}
              </Form.Select>
            </Col>

            {/* Filter Status */}
            <Col sm={6} lg={3}>
              <Form.Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="fs-13"
              >
                <option value="ALL">Status: Semua Status</option>
                <option value="DEFAULT">⭐ Default Platform Toko</option>
                <option value="PUBLIC_FREE">Gratis (Public Free)</option>
                <option value="PREMIUM">Premium (Paket Pro)</option>
                <option value="ACTIVE">Aktif (Live)</option>
                <option value="DISABLED">Nonaktif (Kill-Switch)</option>
              </Form.Select>
            </Col>

            {/* View Switcher */}
            <Col lg={2} className="text-lg-end">
              <div className="btn-group" role="group">
                <Button
                  variant={viewMode === 'GRID' ? 'primary' : 'outline-secondary'}
                  size="sm"
                  onClick={() => setViewMode('GRID')}
                  title="Tampilan Grid Kartu"
                >
                  <IconifyIcon icon="solar:grid-bold" className="fs-16" />
                </Button>
                <Button
                  variant={viewMode === 'TABLE' ? 'primary' : 'outline-secondary'}
                  size="sm"
                  onClick={() => setViewMode('TABLE')}
                  title="Tampilan Tabel Rinci"
                >
                  <IconifyIcon icon="solar:list-bold" className="fs-16" />
                </Button>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* VIEW: GRID MODE */}
      {viewMode === 'GRID' ? (
        <Row className="g-4 mb-4">
          {filteredLayouts.map((layout) => (
            <Col key={layout.id} sm={6} lg={4} xl={3}>
              <Card
                className={`h-100 border shadow-sm transition-all position-relative ${
                  layout.isDefault ? 'border-primary border-2' : 'border-secondary-subtle'
                } ${!layout.isGlobalEnabled ? 'opacity-75 bg-light' : ''}`}
              >
                {/* Default Ribbon */}
                {layout.isDefault && (
                  <div
                    className="position-absolute top-0 end-0 bg-primary text-white fs-10 fw-bold px-2 py-0.5 rounded-bottom-start z-1 shadow-sm"
                    style={{ letterSpacing: '0.5px' }}
                  >
                    ⭐ DEFAULT TOKO
                  </div>
                )}

                {/* Card Header & Thumbnail */}
                <div className="position-relative overflow-hidden rounded-top bg-light" style={{ height: '140px' }}>
                  <img
                    src={layout.thumbnail}
                    alt={layout.name}
                    className="w-100 h-100 object-fit-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/imgs/page/product/img.png';
                    }}
                  />
                  {/* Demo Number Tag */}
                  <span className="position-absolute top-0 start-0 m-2 badge bg-dark bg-opacity-75 font-monospace fs-11">
                    {layout.layoutNumber}
                  </span>

                  {/* License Badge */}
                  <span
                    className={`position-absolute bottom-0 end-0 m-2 badge ${
                      layout.status === 'PREMIUM' ? 'bg-warning text-dark' : 'bg-success'
                    } fs-11 fw-semibold`}
                  >
                    {layout.status === 'PREMIUM' ? formatRupiah(layout.price) : 'FREE'}
                  </span>
                </div>

                <CardBody className="p-3 d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <span className="badge bg-secondary-subtle text-secondary fs-10 text-uppercase">
                      {layout.category}
                    </span>
                    <span className="text-muted fs-11">
                      <IconifyIcon icon="solar:shop-2-linear" className="me-1" />
                      {layout.activeMerchantsCount} Toko
                    </span>
                  </div>

                  <h5 className="fs-15 fw-bold text-dark mb-1 d-flex align-items-center justify-content-between">
                    <span>{layout.name}</span>
                    {layout.isGlobalEnabled ? (
                      <span className="badge bg-success-subtle text-success fs-10">LIVE</span>
                    ) : (
                      <span className="badge bg-danger-subtle text-danger fs-10">OFF</span>
                    )}
                  </h5>

                  <p className="text-primary fs-12 fw-semibold mb-2">{layout.styleType}</p>

                  <p className="text-muted fs-12 line-clamp-2 mb-3 flex-grow-1" style={{ minHeight: '36px' }}>
                    {layout.description}
                  </p>

                  {/* Feature Pills */}
                  <div className="d-flex flex-wrap gap-1 mb-3">
                    {layout.features.slice(0, 2).map((feat, idx) => (
                      <span key={idx} className="badge bg-light text-dark border fs-10 fw-normal">
                        {feat}
                      </span>
                    ))}
                    {layout.features.length > 2 && (
                      <span className="badge bg-light text-muted border fs-10">
                        +{layout.features.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Controls & Action Buttons */}
                  <div className="pt-2 border-top border-light d-flex align-items-center justify-content-between gap-2">
                    <div className="d-flex align-items-center gap-1">
                      <Button
                        variant="primary"
                        size="sm"
                        className="px-2 py-1 fs-11 d-inline-flex align-items-center"
                        onClick={() => setPreviewLayout(layout)}
                        title="Pratinjau Live Demo Layout"
                      >
                        <IconifyIcon icon="solar:eye-bold" className="me-1" />
                        Pratinjau
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="px-2 py-1 fs-11"
                        onClick={() => setConfigLayout(layout)}
                        title="Konfigurasi Layout"
                      >
                        <IconifyIcon icon="solar:settings-linear" />
                      </Button>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      {!layout.isDefault && (
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 text-muted fs-11 text-decoration-none"
                          onClick={() => handleSetDefault(layout.id)}
                          title="Tandai sebagai default platform"
                        >
                          Set Default
                        </Button>
                      )}
                      <Form.Check
                        type="switch"
                        id={`switch-${layout.id}`}
                        checked={layout.isGlobalEnabled}
                        onChange={() => handleToggleLayout(layout.id)}
                        title={layout.isGlobalEnabled ? 'Matikan Global (Kill Switch)' : 'Hidupkan Global'}
                      />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        /* VIEW: TABLE MODE */
        <Card className="border-secondary-subtle shadow-sm mb-4">
          <CardBody className="p-0">
            <div className="table-responsive">
              <Table hover className="align-middle mb-0">
                <thead className="table-light fs-12 text-uppercase text-muted">
                  <tr>
                    <th style={{ width: '80px' }}>Nomor</th>
                    <th>Nama Layout</th>
                    <th>Gaya &amp; Karakter Visual</th>
                    <th>Rute URL</th>
                    <th>Status Lisensi</th>
                    <th>Penggunaan</th>
                    <th>Default</th>
                    <th>Global Switch</th>
                    <th className="text-end" style={{ width: '160px' }}>
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="fs-13">
                  {filteredLayouts.map((layout) => (
                    <tr key={layout.id} className={!layout.isGlobalEnabled ? 'table-secondary opacity-75' : ''}>
                      <td>
                        <span className="badge bg-dark font-monospace fs-11">{layout.layoutNumber}</span>
                      </td>
                      <td>
                        <div className="fw-bold text-dark">{layout.name}</div>
                        <small className="text-muted">{layout.category}</small>
                      </td>
                      <td>
                        <div className="text-primary fw-semibold fs-12">{layout.styleType}</div>
                        <small className="text-muted line-clamp-1">{layout.features.join(' • ')}</small>
                      </td>
                      <td>
                        <code className="text-primary fs-12">{layout.demoPath}</code>
                      </td>
                      <td>
                        <Badge bg={layout.status === 'PREMIUM' ? 'warning' : 'success'} className="fs-11">
                          {layout.status === 'PREMIUM' ? formatRupiah(layout.price) : 'FREE'}
                        </Badge>
                      </td>
                      <td>
                        <span className="fw-semibold text-dark">{layout.activeMerchantsCount}</span> Toko
                      </td>
                      <td>
                        {layout.isDefault ? (
                          <Badge bg="primary" className="fs-10">
                            ⭐ DEFAULT
                          </Badge>
                        ) : (
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="fs-10 px-2 py-0.5"
                            onClick={() => handleSetDefault(layout.id)}
                          >
                            Set Default
                          </Button>
                        )}
                      </td>
                      <td>
                        <Form.Check
                          type="switch"
                          id={`table-switch-${layout.id}`}
                          checked={layout.isGlobalEnabled}
                          onChange={() => handleToggleLayout(layout.id)}
                        />
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-1">
                          <Button
                            variant="primary"
                            size="sm"
                            className="px-2 py-1 fs-11"
                            onClick={() => setPreviewLayout(layout)}
                            title="Pratinjau Live Demo"
                          >
                            <IconifyIcon icon="solar:eye-bold" className="me-1" />
                            Demo
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="px-2 py-1 fs-11"
                            onClick={() => setConfigLayout(layout)}
                            title="Konfigurasi Layout"
                          >
                            <IconifyIcon icon="solar:settings-linear" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      )}

      {/* MODAL: LIVE PREVIEW MODAL */}
      {previewLayout && (
        <ThemePreviewModal
          show={!!previewLayout}
          onHide={() => setPreviewLayout(null)}
          theme={{
            ...previewLayout,
            demoNumber: previewLayout.layoutNumber,
            version: 'Layout v1.0'
          }}
        />
      )}

      {/* MODAL: CONFIG MODAL */}
      {configLayout && (
        <ProductLayoutConfigModal
          show={!!configLayout}
          onHide={() => setConfigLayout(null)}
          layout={configLayout}
          onSave={handleSaveConfig}
        />
      )}
    </>
  );
};

export default ProductLayoutsPage;
