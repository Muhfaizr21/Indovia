import { useState, useMemo } from 'react';
import { Row, Col, Card, CardBody, Badge, Button, Form, Table, Toast, ToastContainer } from 'react-bootstrap';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { initialStorePages } from '../data';
import ThemePreviewModal from '../components/ThemePreviewModal';
import StorePageConfigModal from '../components/StorePageConfigModal';

const StorePagesLayoutPage = () => {
  const [pages, setPages] = useState(initialStorePages);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [viewMode, setViewMode] = useState('GRID'); // 'GRID' | 'TABLE'

  // Modals state
  const [previewPage, setPreviewPage] = useState(null);
  const [configPage, setConfigPage] = useState(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, variant = 'success') => {
    setToastMessage({ msg, variant });
  };

  // Group options
  const groups = useMemo(() => {
    const list = [
      { key: 'ALL', label: 'Semua Halaman' },
      { key: 'COMMERCE', label: 'Transaksi & Checkout' },
      { key: 'BRAND', label: 'Informasi & Perusahaan (Pages)' },
      { key: 'LOOKBOOK', label: 'Visual Lookbook' },
      { key: 'SHOP', label: 'Katalog Belanja (Shop)' },
      { key: 'BLOG', label: 'Blog & Artikel' },
      { key: 'SYSTEM', label: 'Sistem & Utilitas' }
    ];
    return list;
  }, []);

  // Filtered pages
  const filteredPages = useMemo(() => {
    return pages.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.routePath.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesGroup = selectedGroup === 'ALL' || p.group === selectedGroup;
      const matchesStatus =
        selectedStatus === 'ALL' ||
        (selectedStatus === 'ACTIVE' && p.isGlobalEnabled) ||
        (selectedStatus === 'DISABLED' && !p.isGlobalEnabled) ||
        (selectedStatus === 'IN_NAV' && p.showInNavigation) ||
        (selectedStatus === 'HIDDEN_NAV' && !p.showInNavigation);
      return matchesSearch && matchesGroup && matchesStatus;
    });
  }, [pages, searchTerm, selectedGroup, selectedStatus]);

  // Statistics
  const stats = useMemo(() => {
    const total = pages.length;
    const active = pages.filter((p) => p.isGlobalEnabled).length;
    const inNav = pages.filter((p) => p.showInNavigation).length;
    const totalUsage = pages.reduce((acc, curr) => acc + curr.activeUsageCount, 0);
    return { total, active, inNav, totalUsage };
  }, [pages]);

  // Toggle Global ON/OFF for a single page
  const handleTogglePage = (id) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.isGlobalEnabled;
          showToast(
            `Halaman ${p.name} (${p.routePath}) sekarang ${nextState ? 'AKTIF' : 'DINONAKTIFKAN SECARA GLOBAL'}!`,
            nextState ? 'success' : 'danger'
          );
          return { ...p, isGlobalEnabled: nextState };
        }
        return p;
      })
    );
  };

  // Toggle navigation visibility
  const handleToggleNavVisibility = (id) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.showInNavigation;
          showToast(
            `Halaman ${p.name} ${nextState ? 'DITAMPILKAN' : 'DISEMBUNYIKAN'} dari Dropdown Navigasi Storefront!`,
            nextState ? 'info' : 'warning'
          );
          return { ...p, showInNavigation: nextState };
        }
        return p;
      })
    );
  };

  // Save config from modal
  const handleSaveConfig = (updatedPage) => {
    setPages((prev) =>
      prev.map((p) => (p.id === updatedPage.id ? updatedPage : p))
    );
    showToast(`Konfigurasi halaman ${updatedPage.name} berhasil diperbarui!`, 'success');
  };

  return (
    <>
      <PageTitle title="Tata Letak Halaman Toko (Shop, Pages &amp; Blog)" subName="Tema &amp; Tata Letak" />

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
              <strong className="me-auto">Halaman Toko Storefront</strong>
              <small>Baru saja</small>
            </Toast.Header>
            <Toast.Body className="text-white fw-medium">{toastMessage.msg}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>

      {/* KPI METRIC SUMMARY CARDS */}
      <Row className="g-3 mb-4">
        {/* Total Pages */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Total Halaman Terdaftar</span>
                  <h3 className="text-body fw-bold my-1">{stats.total} Halaman</h3>
                  <small className="text-success fw-medium">
                    <IconifyIcon icon="solar:folder-with-files-bold" className="me-1" />
                    Pages, Shop, Blog &amp; Utilitas
                  </small>
                </div>
                <div className="avatar-md bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:document-text-bold" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Global Active */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Halaman Aktif Global</span>
                  <h3 className="text-success fw-bold my-1">{stats.active} Aktif</h3>
                  <small className="text-muted">Siap diakses pembeli &amp; merchant</small>
                </div>
                <div className="avatar-md bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:check-read-bold" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Visible in Navbar */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Tampil di Navbar Toko</span>
                  <h3 className="text-primary fw-bold my-1">{stats.inNav} Halaman</h3>
                  <small className="text-info fw-medium">
                    <IconifyIcon icon="solar:list-check-bold" className="me-1" />
                    Muncul di Mega Menu / Dropdown
                  </small>
                </div>
                <div className="avatar-md bg-info-subtle text-info rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:hamburger-menu-bold" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Total Usage Adoption */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Total Adopsi Toko</span>
                  <h3 className="text-dark fw-bold my-1">{stats.totalUsage.toLocaleString()} Toko</h3>
                  <small className="text-success fw-medium">
                    <IconifyIcon icon="solar:shop-2-bold" className="me-1" />
                    Toko aktif menggunakan layout ini
                  </small>
                </div>
                <div className="avatar-md bg-warning-subtle text-warning rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:buildings-bold" className="fs-28" />
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
                  placeholder="Cari halaman (misal: Cart, About Us, Lookbook, FAQs, Blog)..."
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

            {/* Filter Group */}
            <Col sm={6} lg={3}>
              <Form.Select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="fs-13"
              >
                {groups.map((g) => (
                  <option key={g.key} value={g.key}>
                    Grup: {g.label}
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
                <option value="ACTIVE">Aktif Global (Live)</option>
                <option value="DISABLED">Nonaktif Global (Kill-Switch)</option>
                <option value="IN_NAV">Tampil di Menu Navbar</option>
                <option value="HIDDEN_NAV">Tersembunyi dari Menu</option>
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
          {filteredPages.map((page) => (
            <Col key={page.id} sm={6} lg={4} xl={3}>
              <Card
                className={`h-100 border shadow-sm transition-all position-relative ${
                  !page.isGlobalEnabled ? 'opacity-75 bg-light' : 'border-secondary-subtle'
                }`}
              >
                {/* Header & Thumbnail */}
                <div className="position-relative overflow-hidden rounded-top bg-light" style={{ height: '130px' }}>
                  <img
                    src={page.thumbnail}
                    alt={page.name}
                    className="w-100 h-100 object-fit-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/imgs/page/about1/banner.png';
                    }}
                  />
                  {/* Group Label Tag */}
                  <span className="position-absolute top-0 start-0 m-2 badge bg-dark bg-opacity-75 fs-10 text-uppercase">
                    {page.groupLabel}
                  </span>

                  {/* Nav Status Tag */}
                  <span
                    className={`position-absolute bottom-0 end-0 m-2 badge ${
                      page.showInNavigation ? 'bg-info text-white' : 'bg-secondary text-white'
                    } fs-10`}
                  >
                    {page.showInNavigation ? 'Di Navbar' : 'Hidden Link'}
                  </span>
                </div>

                <CardBody className="p-3 d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <code className="fs-12 fw-bold text-primary">{page.routePath}</code>
                    <span className="text-muted fs-11">
                      <IconifyIcon icon="solar:shop-2-linear" className="me-1" />
                      {page.activeUsageCount} Toko
                    </span>
                  </div>

                  <h5 className="fs-15 fw-bold text-dark mb-1 d-flex align-items-center justify-content-between">
                    <span>{page.name}</span>
                    {page.isGlobalEnabled ? (
                      <span className="badge bg-success-subtle text-success fs-10">LIVE</span>
                    ) : (
                      <span className="badge bg-danger-subtle text-danger fs-10">OFF</span>
                    )}
                  </h5>

                  <p className="text-muted fs-12 line-clamp-2 mb-3 flex-grow-1" style={{ minHeight: '36px' }}>
                    {page.description}
                  </p>

                  {/* Feature Pills */}
                  <div className="d-flex flex-wrap gap-1 mb-3">
                    {page.features.slice(0, 2).map((feat, idx) => (
                      <span key={idx} className="badge bg-light text-dark border fs-10 fw-normal">
                        {feat}
                      </span>
                    ))}
                    {page.features.length > 2 && (
                      <span className="badge bg-light text-muted border fs-10">
                        +{page.features.length - 2}
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
                        onClick={() => setPreviewPage(page)}
                        title="Pratinjau Live Demo Halaman"
                      >
                        <IconifyIcon icon="solar:eye-bold" className="me-1" />
                        Pratinjau
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="px-2 py-1 fs-11"
                        onClick={() => setConfigPage(page)}
                        title="Konfigurasi Halaman & SEO"
                      >
                        <IconifyIcon icon="solar:settings-linear" />
                      </Button>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="link"
                        size="sm"
                        className={`p-0 fs-11 text-decoration-none ${
                          page.showInNavigation ? 'text-primary' : 'text-muted'
                        }`}
                        onClick={() => handleToggleNavVisibility(page.id)}
                        title={page.showInNavigation ? 'Sembunyikan dari menu navbar' : 'Tampilkan di menu navbar'}
                      >
                        {page.showInNavigation ? 'Menu ON' : 'Menu OFF'}
                      </Button>
                      <Form.Check
                        type="switch"
                        id={`switch-page-${page.id}`}
                        checked={page.isGlobalEnabled}
                        onChange={() => handleTogglePage(page.id)}
                        title={page.isGlobalEnabled ? 'Matikan Halaman Global (Kill Switch)' : 'Hidupkan Halaman Global'}
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
                    <th>Nama Halaman</th>
                    <th>Kategori / Grup</th>
                    <th>Rute URL Storefront</th>
                    <th>Tampil di Menu Navbar</th>
                    <th>Penggunaan Toko</th>
                    <th>Status Global</th>
                    <th className="text-end" style={{ width: '160px' }}>
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="fs-13">
                  {filteredPages.map((page) => (
                    <tr key={page.id} className={!page.isGlobalEnabled ? 'table-secondary opacity-75' : ''}>
                      <td>
                        <div className="fw-bold text-dark">{page.name}</div>
                        <small className="text-muted line-clamp-1">{page.description}</small>
                      </td>
                      <td>
                        <Badge bg="secondary-subtle" className="text-secondary fs-11 text-uppercase">
                          {page.groupLabel}
                        </Badge>
                      </td>
                      <td>
                        <code className="text-primary fs-12 fw-bold">{page.routePath}</code>
                      </td>
                      <td>
                        <Form.Check
                          type="switch"
                          id={`table-nav-${page.id}`}
                          label={page.showInNavigation ? 'Tampil' : 'Tersembunyi'}
                          checked={page.showInNavigation}
                          onChange={() => handleToggleNavVisibility(page.id)}
                        />
                      </td>
                      <td>
                        <span className="fw-semibold text-dark">{page.activeUsageCount}</span> Toko
                      </td>
                      <td>
                        <Form.Check
                          type="switch"
                          id={`table-switch-page-${page.id}`}
                          label={page.isGlobalEnabled ? 'LIVE' : 'OFF'}
                          checked={page.isGlobalEnabled}
                          onChange={() => handleTogglePage(page.id)}
                        />
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex gap-1">
                          <Button
                            variant="primary"
                            size="sm"
                            className="px-2 py-1 fs-11"
                            onClick={() => setPreviewPage(page)}
                            title="Pratinjau Halaman"
                          >
                            <IconifyIcon icon="solar:eye-bold" className="me-1" />
                            Demo
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="px-2 py-1 fs-11"
                            onClick={() => setConfigPage(page)}
                            title="Konfigurasi Halaman"
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
      {previewPage && (
        <ThemePreviewModal
          show={!!previewPage}
          onHide={() => setPreviewPage(null)}
          theme={{
            ...previewPage,
            demoNumber: 'Halaman Toko',
            demoPath: previewPage.routePath,
            version: 'v1.0 Page',
            category: previewPage.groupLabel,
            price: 0,
            status: 'PUBLIC_FREE',
            activeMerchantsCount: previewPage.activeUsageCount
          }}
        />
      )}

      {/* MODAL: CONFIG MODAL */}
      {configPage && (
        <StorePageConfigModal
          show={!!configPage}
          onHide={() => setConfigPage(null)}
          page={configPage}
          onSave={handleSaveConfig}
        />
      )}
    </>
  );
};

export default StorePagesLayoutPage;
