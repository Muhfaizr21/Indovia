import { useState, useMemo } from 'react';
import { Row, Col, Card, CardBody, Badge, Button, Form, Dropdown, Toast, ToastContainer } from 'react-bootstrap';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { initialThemes, formatRupiah } from '../data';
import ThemePreviewModal from '../components/ThemePreviewModal';
import ThemeConfigModal from '../components/ThemeConfigModal';
import ThemeMerchantListModal from '../components/ThemeMerchantListModal';

const ThemeRepositoryPage = () => {
  const [themes, setThemes] = useState(initialThemes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [sortBy, setSortBy] = useState('POPULARITY');

  // Modals state
  const [previewTheme, setPreviewTheme] = useState(null);
  const [configTheme, setConfigTheme] = useState(null);
  const [merchantsModalTheme, setMerchantsModalTheme] = useState(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, variant = 'success') => {
    setToastMessage({ msg, variant });
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(themes.map((t) => t.category));
    return ['ALL', ...Array.from(set)];
  }, [themes]);

  // Filter and Sort logic
  const filteredThemes = useMemo(() => {
    return themes
      .filter((t) => {
        const matchesSearch =
          t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.demoNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.bundleKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCat = selectedCategory === 'ALL' || t.category === selectedCategory;
        const matchesStatus = selectedStatus === 'ALL' || t.status === selectedStatus;
        return matchesSearch && matchesCat && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'POPULARITY') return b.activeMerchantsCount - a.activeMerchantsCount;
        if (sortBy === 'RATING') return b.rating - a.rating;
        if (sortBy === 'NAME') return a.name.localeCompare(b.name);
        if (sortBy === 'PRICE_ASC') return a.price - b.price;
        if (sortBy === 'PRICE_DESC') return b.price - a.price;
        return 0;
      });
  }, [themes, searchTerm, selectedCategory, selectedStatus, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = themes.length;
    const free = themes.filter((t) => t.status === 'PUBLIC_FREE').length;
    const premium = themes.filter((t) => t.status === 'PREMIUM').length;
    const betaOrDep = themes.filter((t) => t.status === 'BETA' || t.status === 'DEPRECATED').length;
    const totalAdoption = themes.reduce((acc, curr) => acc + curr.activeMerchantsCount, 0);
    return { total, free, premium, betaOrDep, totalAdoption };
  }, [themes]);

  // Toggle Global ON/OFF for a single theme
  const handleToggleThemeStatus = (id) => {
    setThemes((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.isGlobalEnabled;
          showToast(
            `Tema ${t.name} sekarang ${nextState ? 'AKTIF' : 'DINONAKTIFKAN (Kill-Switch)'}!`,
            nextState ? 'success' : 'danger'
          );
          return { ...t, isGlobalEnabled: nextState };
        }
        return t;
      })
    );
  };

  // Handle save from config modal
  const handleSaveThemeConfig = (updatedTheme) => {
    setThemes((prev) =>
      prev.map((t) => (t.id === updatedTheme.id ? updatedTheme : t))
    );
    showToast(`Konfigurasi tema ${updatedTheme.name} berhasil diperbarui!`, 'success');
  };

  return (
    <>
      <PageTitle title="Katalog Tema &amp; Versi Storefront" subName="Tema &amp; Tata Letak" />

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
              <strong className="me-auto">Pembaruan Tema Superadmin</strong>
              <small>Baru saja</small>
            </Toast.Header>
            <Toast.Body className="text-white fw-medium">{toastMessage.msg}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>

      {/* KPI METRIC SUMMARY CARDS */}
      <Row className="g-3 mb-4">
        {/* Total Themes */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Total Preset Tema</span>
                  <h3 className="text-body fw-bold my-1">{stats.total} Tema</h3>
                  <small className="text-success fw-medium">
                    <IconifyIcon icon="solar:shop-2-bold" className="me-1" />
                    {stats.totalAdoption.toLocaleString('id-ID')} Toko Terpasang
                  </small>
                </div>
                <div className="avatar-md bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:pallete-2-bold-duotone" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Free Themes */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Tema Publik Gratis</span>
                  <h3 className="text-success fw-bold my-1">{stats.free} Tema</h3>
                  <small className="text-muted">Tersedia gratis untuk semua tier merchant</small>
                </div>
                <div className="avatar-md bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:gift-bold-duotone" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Premium Themes */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Tema Premium Berbayar</span>
                  <h3 className="text-warning fw-bold my-1">{stats.premium} Tema</h3>
                  <small className="text-warning fw-medium">One-time Fee / Paket Pro SaaS</small>
                </div>
                <div className="avatar-md bg-warning-subtle text-warning rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:crown-bold-duotone" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Beta & Deprecated */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Beta / Deprecated</span>
                  <h3 className="text-info fw-bold my-1">{stats.betaOrDep} Tema</h3>
                  <small className="text-muted">Tahap uji coba &amp; arsip tema lama</small>
                </div>
                <div className="avatar-md bg-info-subtle text-info rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:code-scan-bold-duotone" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* FILTER & SEARCH TOOLBAR */}
      <Card className="border-secondary-subtle mb-4">
        <CardBody className="p-3">
          <Row className="g-3 align-items-center">
            {/* Search Input */}
            <Col lg={4}>
              <div className="search-bar">
                <div className="position-relative">
                  <Form.Control
                    type="search"
                    placeholder="Cari tema, industri, kode bundle, versi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ps-4 border-secondary-subtle fs-13"
                  />
                  <IconifyIcon
                    icon="solar:magnifer-linear"
                    className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted fs-16"
                  />
                </div>
              </div>
            </Col>

            {/* Category Filter */}
            <Col sm={6} lg={3}>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border-secondary-subtle fs-13"
              >
                <option value="ALL">Semua Industri ({themes.length})</option>
                {categories
                  .filter((c) => c !== 'ALL')
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </Form.Select>
            </Col>

            {/* Status Pills Filter */}
            <Col sm={6} lg={3}>
              <Form.Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border-secondary-subtle fs-13"
              >
                <option value="ALL">Semua Status Pasar</option>
                <option value="PUBLIC_FREE">Gratis (PUBLIC_FREE)</option>
                <option value="PREMIUM">Berbayar (PREMIUM)</option>
                <option value="BETA">Pengujian (BETA)</option>
                <option value="DEPRECATED">Usang (DEPRECATED)</option>
              </Form.Select>
            </Col>

            {/* Sort by */}
            <Col lg={2}>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-secondary-subtle fs-13"
              >
                <option value="POPULARITY">Terpopuler</option>
                <option value="RATING">Rating Tertinggi</option>
                <option value="NAME">Nama A-Z</option>
                <option value="PRICE_DESC">Harga Tertinggi</option>
                <option value="PRICE_ASC">Harga Terendah</option>
              </Form.Select>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* THEMES CARD GRID (34 THEMES) */}
      <Row className="g-3">
        {filteredThemes.length === 0 ? (
          <Col xs={12}>
            <Card className="border-secondary-subtle text-center py-5">
              <CardBody>
                <IconifyIcon icon="solar:ghost-bold" className="text-muted fs-48 mb-2" />
                <h5 className="text-body fw-bold">Tidak Ada Tema yang Sesuai</h5>
                <p className="text-muted fs-13 mb-3">
                  Coba ubah kata kunci pencarian atau bersihkan filter kategori Anda.
                </p>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('ALL');
                    setSelectedStatus('ALL');
                  }}
                  className="px-3 py-1.5"
                >
                  Reset Semua Filter
                </Button>
              </CardBody>
            </Card>
          </Col>
        ) : (
          filteredThemes.map((theme) => {
            const isFree = theme.status === 'PUBLIC_FREE';
            const isPremium = theme.status === 'PREMIUM';
            const isBeta = theme.status === 'BETA';
            const isDep = theme.status === 'DEPRECATED';

            return (
              <Col md={6} lg={4} xl={4} key={theme.id}>
                <Card className={`border-secondary-subtle h-100 shadow-sm transition-all ${!theme.isGlobalEnabled ? 'opacity-75 bg-body-tertiary' : ''}`}>
                  {/* Card Thumbnail Area with Badges */}
                  <div className="position-relative overflow-hidden rounded-top-2 bg-dark" style={{ height: '175px' }}>
                    <img
                      src={theme.thumbnail}
                      alt={theme.name}
                      className="w-100 h-100 object-fit-cover"
                      style={{ filter: !theme.isGlobalEnabled ? 'grayscale(80%)' : 'none' }}
                      onError={(e) => {
                        e.target.src = '/assets/imgs/page/homepage1/banner.png';
                      }}
                    />

                    {/* Top Badges */}
                    <div className="position-absolute top-0 start-0 m-2 d-flex align-items-center gap-1.5">
                      <span className="badge bg-dark bg-opacity-75 text-white font-monospace fs-11 px-2 py-1">
                        {theme.demoNumber}
                      </span>
                      <span className="badge bg-secondary text-white font-monospace fs-10 px-2 py-1">
                        {theme.version}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="position-absolute top-0 end-0 m-2">
                      {isFree && (
                        <Badge bg="success" className="fs-10 px-2.5 py-1 text-white shadow-sm">
                          FREE
                        </Badge>
                      )}
                      {isPremium && (
                        <Badge bg="warning" className="fs-10 px-2.5 py-1 text-dark fw-bold shadow-sm">
                          PREMIUM ({formatRupiah(theme.price)})
                        </Badge>
                      )}
                      {isBeta && (
                        <Badge bg="info" className="fs-10 px-2.5 py-1 text-white shadow-sm">
                          BETA ACCESS
                        </Badge>
                      )}
                      {isDep && (
                        <Badge bg="secondary" className="fs-10 px-2.5 py-1 text-white shadow-sm">
                          DEPRECATED
                        </Badge>
                      )}
                    </div>

                    {/* Quick Preview Hover Overlay CTA */}
                    <div className="position-absolute bottom-0 end-0 m-2">
                      <Button
                        size="sm"
                        variant="light"
                        className="btn-sm py-1 px-2.5 fs-11 fw-semibold shadow-sm d-flex align-items-center"
                        onClick={() => setPreviewTheme(theme)}
                      >
                        <IconifyIcon icon="solar:eye-bold" className="me-1 fs-14" />
                        Live Demo
                      </Button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <CardBody className="p-3 d-flex flex-column justify-content-between">
                    <div>
                      {/* Category & Global Switch */}
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="badge bg-primary-subtle text-primary fs-11 px-2 py-0.5">
                          {theme.category}
                        </span>

                        {/* Global Kill Switch */}
                        <div className="d-flex align-items-center gap-1.5">
                          <span className={`fs-11 fw-semibold ${theme.isGlobalEnabled ? 'text-success' : 'text-danger'}`}>
                            {theme.isGlobalEnabled ? 'LIVE' : 'OFF'}
                          </span>
                          <Form.Check
                            type="switch"
                            id={`switch-${theme.id}`}
                            checked={theme.isGlobalEnabled}
                            onChange={() => handleToggleThemeStatus(theme.id)}
                            title={theme.isGlobalEnabled ? 'Matikan tema secara global' : 'Aktifkan kembali tema'}
                          />
                        </div>
                      </div>

                      {/* Theme Name */}
                      <h5 className="fs-14 fw-bold text-body mb-1 text-truncate" title={theme.name}>
                        {theme.name}
                      </h5>

                      <p className="text-muted fs-12 mb-2 line-clamp-2" style={{ minHeight: '36px' }}>
                        {theme.description}
                      </p>

                      {/* Feature Tags */}
                      <div className="d-flex flex-wrap gap-1 mb-3">
                        {theme.features.slice(0, 3).map((feat, idx) => (
                          <span
                            key={idx}
                            className="badge bg-body-secondary text-secondary fs-10 border border-secondary-subtle px-2 py-0.5"
                          >
                            {feat}
                          </span>
                        ))}
                        {theme.features.length > 3 && (
                          <span className="badge bg-light text-muted fs-10 px-1 py-0.5">
                            +{theme.features.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer Stats & Actions */}
                    <div className="pt-2 border-top border-secondary-subtle">
                      <div className="d-flex align-items-center justify-content-between fs-11 text-muted mb-2">
                        <button
                          type="button"
                          className="btn btn-link p-0 text-decoration-none d-flex align-items-center fs-11 text-muted hover-primary"
                          onClick={() => setMerchantsModalTheme(theme)}
                          title={`Lihat daftar toko yang menggunakan tema ${theme.name}`}
                        >
                          <IconifyIcon icon="solar:shop-2-bold" className="me-1 text-primary fs-14" />
                          <strong className="text-body me-1">{theme.activeMerchantsCount}</strong>
                          <span className="text-primary text-decoration-underline fw-medium">Toko Pengguna &rsaquo;</span>
                        </button>
                        <span className="d-flex align-items-center">
                          <IconifyIcon icon="solar:star-bold" className="text-warning me-1" />
                          <strong className="text-body me-1">{theme.rating}</strong> / 5.0
                        </span>
                      </div>

                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="w-50 fs-12 fw-semibold d-flex align-items-center justify-content-center px-2 py-1.5"
                          onClick={() => setPreviewTheme(theme)}
                        >
                          <IconifyIcon icon="solar:laptop-bold" className="me-1 fs-14" />
                          Pratinjau
                        </Button>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-50 fs-12 fw-semibold d-flex align-items-center justify-content-center px-2 py-1.5"
                          onClick={() => setConfigTheme(theme)}
                        >
                          <IconifyIcon icon="solar:settings-bold" className="me-1 fs-14" />
                          Konfigurasi
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })
        )}
      </Row>

      {/* MODALS */}
      <ThemePreviewModal
        show={!!previewTheme}
        onHide={() => setPreviewTheme(null)}
        theme={previewTheme}
      />

      <ThemeConfigModal
        show={!!configTheme}
        onHide={() => setConfigTheme(null)}
        theme={configTheme}
        onSave={handleSaveThemeConfig}
      />

      <ThemeMerchantListModal
        show={!!merchantsModalTheme}
        onHide={() => setMerchantsModalTheme(null)}
        theme={merchantsModalTheme}
      />
    </>
  );
};

export default ThemeRepositoryPage;
