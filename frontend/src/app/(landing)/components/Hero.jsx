import { Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Card } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const Hero = () => {
  return (
    <section className="position-relative py-5 py-lg-6 overflow-hidden">
      {/* Background radial glow */}
      <div
        className="position-absolute top-0 start-50 translate-middle-x pointer-events-none"
        style={{
          width: '750px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(var(--bs-primary-rgb), 0.15) 0%, rgba(var(--bs-primary-rgb), 0) 70%)',
          filter: 'blur(50px)',
          zIndex: 0
        }}
      />

      <Container className="position-relative" style={{ zIndex: 1 }}>
        <Row className="justify-content-center text-center mb-5">
          <Col lg={9} xl={8}>
            {/* Version / Notification Pill */}
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-primary-subtle text-primary mb-3 border border-primary-subtle shadow-sm">
              <Badge bg="primary" pill>Indovia v2.0</Badge>
              <span className="small fw-semibold">Next-Gen React & Vite E-Commerce Admin</span>
              <IconifyIcon icon="solar:sparkler-bold-duotone" className="fs-16" />
            </div>

            {/* Main Headline */}
            <h1 className="display-4 fw-bold text-body mb-3 lh-sm">
              Kelola Bisnis & E-Commerce dalam <span className="text-primary">Satu Kontrol Pusat</span>
            </h1>

            {/* Subheading */}
            <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '680px' }}>
              Dashboard analitik mutakhir untuk memantau performa penjualan, pesanan, inventaris produk,
              dan relasi pelanggan dengan arsitektur modular yang cepat dan andal.
            </p>

            {/* CTA Action Buttons */}
            <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-4">
              <Link
                to="/dashboard"
                className="btn btn-primary btn-lg px-4 py-3 fw-semibold d-inline-flex align-items-center gap-2 shadow"
              >
                <IconifyIcon icon="solar:widget-5-bold-duotone" className="fs-20" />
                <span>Buka Live Demo Dashboard</span>
              </Link>
              <Link
                to="/auth/sign-up"
                className="btn btn-outline-secondary btn-lg px-4 py-3 fw-semibold d-inline-flex align-items-center gap-2"
              >
                <IconifyIcon icon="solar:user-plus-bold-duotone" className="fs-20" />
                <span>Daftar Akun Gratis</span>
              </Link>
            </div>

            {/* Trust Checklist */}
            <div className="d-flex flex-wrap align-items-center justify-content-center gap-4 text-muted small">
              <span className="d-inline-flex align-items-center gap-1">
                <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-16" />
                Tanpa Kartu Kredit
              </span>
              <span className="d-inline-flex align-items-center gap-1">
                <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-16" />
                Dukungan Light & Dark Mode
              </span>
              <span className="d-inline-flex align-items-center gap-1">
                <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-16" />
                Fake Backend Siap Pakai
              </span>
            </div>
          </Col>
        </Row>

        {/* Hero Interactive Dashboard Mockup Card */}
        <Row className="justify-content-center">
          <Col lg={11} xl={10}>
            <div className="position-relative">
              {/* Outer Card Shell */}
              <Card className="border-0 shadow-lg overflow-hidden rounded-4">
                {/* Mock Browser Header Bar */}
                <div className="d-flex align-items-center justify-content-between px-3 py-2 bg-body-tertiary border-bottom">
                  <div className="d-flex align-items-center gap-1">
                    <span className="rounded-circle bg-danger d-inline-block" style={{ width: 10, height: 10 }} />
                    <span className="rounded-circle bg-warning d-inline-block" style={{ width: 10, height: 10 }} />
                    <span className="rounded-circle bg-success d-inline-block" style={{ width: 10, height: 10 }} />
                  </div>
                  <div
                    className="small text-muted px-3 py-1 rounded bg-body border text-truncate"
                    style={{ maxWidth: '320px', fontSize: '12px' }}
                  >
                    https://indovia.dashboard/app/overview
                  </div>
                  <Link to="/dashboard" className="btn btn-sm btn-link text-decoration-none p-0">
                    <IconifyIcon icon="solar:maximize-square-minimalistic-bold" className="fs-16" />
                  </Link>
                </div>

                {/* Simulated Dashboard Preview Content */}
                <Card.Body className="p-4 bg-body">
                  <Row className="g-3 mb-3">
                    <Col sm={6} lg={3}>
                      <div className="p-3 rounded-3 bg-primary-subtle border border-primary-subtle">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="text-muted small fw-medium">Total Orders</span>
                          <IconifyIcon icon="solar:bag-check-bold-duotone" className="text-primary fs-22" />
                        </div>
                        <h4 className="fw-bold mb-1">13,647</h4>
                        <span className="small text-success fw-medium">
                          <IconifyIcon icon="solar:arrow-up-linear" /> +2.3% minggu ini
                        </span>
                      </div>
                    </Col>

                    <Col sm={6} lg={3}>
                      <div className="p-3 rounded-3 bg-success-subtle border border-success-subtle">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="text-muted small fw-medium">New Leads</span>
                          <IconifyIcon icon="solar:users-group-two-rounded-bold-duotone" className="text-success fs-22" />
                        </div>
                        <h4 className="fw-bold mb-1">9,526</h4>
                        <span className="small text-success fw-medium">
                          <IconifyIcon icon="solar:arrow-up-linear" /> +8.1% kenaikan
                        </span>
                      </div>
                    </Col>

                    <Col sm={6} lg={3}>
                      <div className="p-3 rounded-3 bg-warning-subtle border border-warning-subtle">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="text-muted small fw-medium">Deals Closed</span>
                          <IconifyIcon icon="solar:cup-star-bold-duotone" className="text-warning fs-22" />
                        </div>
                        <h4 className="fw-bold mb-1">976</h4>
                        <span className="small text-danger fw-medium">
                          <IconifyIcon icon="solar:arrow-down-linear" /> -0.3% stabil
                        </span>
                      </div>
                    </Col>

                    <Col sm={6} lg={3}>
                      <div className="p-3 rounded-3 bg-info-subtle border border-info-subtle">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="text-muted small fw-medium">Booked Revenue</span>
                          <IconifyIcon icon="solar:wallet-money-bold-duotone" className="text-info fs-22" />
                        </div>
                        <h4 className="fw-bold mb-1">$123.6k</h4>
                        <span className="small text-success fw-medium">
                          <IconifyIcon icon="solar:arrow-up-linear" /> +10.6% target
                        </span>
                      </div>
                    </Col>
                  </Row>

                  {/* Banner CTA within preview */}
                  <div className="p-3 rounded-3 bg-body-tertiary border d-flex flex-wrap align-items-center justify-content-between gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <div className="avatar-sm rounded-circle bg-primary text-white d-flex align-items-center justify-content-center p-2">
                        <IconifyIcon icon="solar:graph-bold" className="fs-20" />
                      </div>
                      <div>
                        <h6 className="mb-0 fw-semibold">Indovia E-Commerce Admin Suite Siap Digunakan</h6>
                        <small className="text-muted">Jelajahi fitur lengkap manajemen toko, order, inventaris, dan pelanggan.</small>
                      </div>
                    </div>
                    <Link to="/dashboard" className="btn btn-sm btn-primary px-3 py-2 fw-medium">
                      Buka Tampilan Dashboard Lengkap →
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
