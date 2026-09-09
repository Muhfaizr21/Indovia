import { Fragment } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardTitle, Col, ProgressBar, Row, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCategory = ({ categories }) => {
  const defaultCategories = [
    { title: 'Koleksi Utama Terlaris', amount: 'Rp 45.0 Jt', progress: 70, variant: 'primary' },
    { title: 'Koleksi Musiman & Spesial', amount: 'Rp 32.5 Jt', progress: 55, variant: 'success' },
    { title: 'Aksesoris & Paket Tambahan', amount: 'Rp 18.0 Jt', progress: 40, variant: 'warning' },
    { title: 'Item Cuci Gudang (Clearance)', amount: 'Rp 8.5 Jt', progress: 25, variant: 'info' }
  ];

  const items = categories && categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="ps-lg-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <CardTitle as={'h4'} className="mb-0 fs-16 fw-bold text-body">
          Omset per Kategori Produk
        </CardTitle>
        <span className="badge bg-light bg-opacity-25 text-muted fs-11">Bulan Berjalan</span>
      </div>
      {items.map((item, idx) => (
        <Fragment key={idx}>
          <div className="d-flex align-items-center justify-content-between mt-3 mb-1">
            <p className="mb-0 fs-13 fw-medium text-body">{item.title}</p>
            <div>
              <p className="mb-0 fs-13 fw-semibold text-body">
                {item.amount}{' '}
                <span className="ms-1">
                  <IconifyIcon icon="solar:course-up-outline" className="text-success fs-14" />
                </span>
              </p>
            </div>
          </div>
          <ProgressBar
            variant={item.variant}
            animated
            striped
            className="progress-md progress-bar-striped progress-bar-animated"
            role="progressbar"
            now={item.progress}
          />
        </Fragment>
      ))}
    </div>
  );
};

const SellerDetails = ({ merchant, metadata, onImpersonate, onOpenKyc, onOpenDomain }) => {
  if (!merchant) return null;

  const meta = metadata || {};

  return (
    <Row>
      <Col lg={12}>
        <Card className="border-0 shadow-sm mb-3">
          <CardBody className="p-4">
            <Row className="g-4">
              {/* KOLOM 1: AVATAR & TOMBOL AKSES */}
              <Col lg={2} className="text-lg-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3 p-3 border bg-light bg-opacity-25"
                  style={{ minHeight: 150 }}
                >
                  <img
                    src={merchant.avatar}
                    alt={merchant.name}
                    className="avatar-xxl flex-shrink-0 rounded-2 shadow-sm"
                    style={{ objectFit: 'cover', width: 110, height: 110 }}
                    onError={(e) => {
                      e.target.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${merchant.subdomain}`;
                    }}
                  />
                </div>
                <div className="mt-3 d-flex flex-column gap-2">
                  <Button
                    variant="primary"
                    className="w-100 fw-semibold text-white d-flex align-items-center justify-content-center py-2"
                    style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
                    onClick={onImpersonate}
                    title="Masuk sebagai toko ini dengan token otorisasi superadmin"
                  >
                    <IconifyIcon icon="solar:login-2-bold" className="me-1.5 fs-16" />
                    Masuk Toko (Impersonate)
                  </Button>

                  <div className="d-flex gap-1.5">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="w-50 fs-11 py-1 d-flex align-items-center justify-content-center"
                      onClick={onOpenKyc}
                    >
                      <IconifyIcon icon="solar:shield-check-bold" className="me-1 text-success" />
                      Audit KYC
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="w-50 fs-11 py-1 d-flex align-items-center justify-content-center"
                      onClick={onOpenDomain}
                    >
                      <IconifyIcon icon="solar:global-bold" className="me-1 text-info" />
                      SSL/DNS
                    </Button>
                  </div>
                </div>
              </Col>

              {/* KOLOM 2: INFORMASI TOKO & IDENTITAS TENANT */}
              <Col lg={4} className="border-end pe-lg-4">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <h4 className="mb-0 fw-bold text-body fs-18">{merchant.name}</h4>
                    <span
                      className="px-2 py-0.5 rounded fs-11 fw-semibold text-uppercase"
                      style={{
                        backgroundColor:
                          merchant.plan === 'Enterprise'
                            ? '#ff6c2f'
                            : merchant.plan === 'Pro'
                            ? '#3b82f6'
                            : '#64748b',
                        color: '#ffffff'
                      }}
                    >
                      {merchant.plan}
                    </span>
                  </div>

                  <p className="mb-2 text-muted fs-12">
                    <span className="text-body fw-medium">{merchant.category}</span> &bull; {merchant.city}
                  </p>

                  <div className="d-flex flex-column gap-1 mb-2">
                    <a
                      href={`https://${merchant.subdomain}.indovia.com`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary fs-13 fw-semibold text-decoration-none d-inline-flex align-items-center"
                    >
                      <IconifyIcon icon="solar:link-circle-bold" className="me-1 fs-15 text-primary" />
                      https://{merchant.subdomain}.indovia.com
                    </a>

                    {merchant.custom_domain && (
                      <div className="d-inline-flex align-items-center text-success fs-12 fw-medium">
                        <IconifyIcon icon="solar:lock-bold" className="me-1 fs-13 text-success" />
                        {merchant.custom_domain}
                        <span className="badge bg-success-subtle text-success ms-2 fs-10">SSL Terproteksi</span>
                      </div>
                    )}
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-2 mb-3">
                    <ul className="d-flex text-warning m-0 fs-16 list-unstyled">
                      <li className="icons-center">
                        <IconifyIcon icon="bxs:star" />
                      </li>
                      <li className="icons-center">
                        <IconifyIcon icon="bxs:star" />
                      </li>
                      <li className="icons-center">
                        <IconifyIcon icon="bxs:star" />
                      </li>
                      <li className="icons-center">
                        <IconifyIcon icon="bxs:star" />
                      </li>
                      <li className="icons-center">
                        <IconifyIcon icon="bxs:star-half" />
                      </li>
                    </ul>
                    <p className="fw-semibold mb-0 text-body fs-13">
                      {merchant.rating || 4.9}/5.0{' '}
                      <span className="text-muted fw-normal fs-12">
                        (+{merchant.review_count || 120} Ulasan Pelanggan)
                      </span>
                    </p>
                  </div>

                  {/* DETAIL KONTAK */}
                  <div className="mt-2 fs-12 text-secondary">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <div
                        className="avatar-xs d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                        style={{ backgroundColor: 'rgba(255, 108, 47, 0.1)', color: '#ff6c2f' }}
                      >
                        <IconifyIcon icon="solar:point-on-map-bold-duotone" className="fs-14" />
                      </div>
                      <span className="text-truncate">
                        {merchant.address ? `${merchant.address}, ${merchant.city}` : merchant.city}
                      </span>
                    </div>

                    <div className="d-flex align-items-center gap-2 mb-2">
                      <div
                        className="avatar-xs d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                        style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}
                      >
                        <IconifyIcon icon="solar:letter-bold-duotone" className="fs-14" />
                      </div>
                      <a
                        href={`mailto:${merchant.owner_email}`}
                        className="text-decoration-none text-secondary text-truncate"
                      >
                        {merchant.owner_email} ({merchant.owner_name})
                      </a>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="avatar-xs d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                        style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#16a34a' }}
                      >
                        <IconifyIcon icon="solar:chat-round-dots-bold" className="fs-14" />
                      </div>
                      <a
                        href={`https://wa.me/${merchant.owner_phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none text-success fw-medium"
                      >
                        {merchant.owner_phone} (WhatsApp Aktif)
                      </a>
                    </div>
                  </div>
                </div>
              </Col>

              {/* KOLOM 3: PROFIT BY PRODUCT CATEGORY */}
              <Col lg={6}>
                <ProductCategory categories={meta.categories} />
              </Col>
            </Row>

            <hr className="my-3 opacity-25" />

            {/* BARIS SOCIAL MEDIA */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
              <div className="d-flex align-items-center gap-2">
                <span className="fw-semibold text-body fs-13">Kanal Media Sosial Toko:</span>
                <ul className="list-inline d-flex gap-1.5 mb-0 align-items-center">
                  <li className="list-inline-item">
                    <button
                      className="btn btn-sm btn-outline-primary rounded-circle d-inline-flex align-items-center justify-content-center p-0"
                      style={{ width: 28, height: 28 }}
                      title="Facebook Page"
                    >
                      <IconifyIcon width={14} height={14} icon="bxl:facebook" />
                    </button>
                  </li>
                  <li className="list-inline-item">
                    <button
                      className="btn btn-sm btn-outline-danger rounded-circle d-inline-flex align-items-center justify-content-center p-0"
                      style={{ width: 28, height: 28 }}
                      title="Instagram Profile"
                    >
                      <IconifyIcon width={14} height={14} icon="bxl:instagram" />
                    </button>
                  </li>
                  <li className="list-inline-item">
                    <button
                      className="btn btn-sm btn-outline-info rounded-circle d-inline-flex align-items-center justify-content-center p-0"
                      style={{ width: 28, height: 28 }}
                      title="Twitter/X"
                    >
                      <IconifyIcon width={14} height={14} icon="bxl:twitter" />
                    </button>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href={`https://wa.me/${merchant.owner_phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline-success rounded-circle d-inline-flex align-items-center justify-content-center p-0"
                      style={{ width: 28, height: 28 }}
                      title="Chat WhatsApp"
                    >
                      <IconifyIcon width={14} height={14} icon="bxl:whatsapp" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href={`mailto:${merchant.owner_email}`}
                      className="btn btn-sm btn-outline-warning rounded-circle d-inline-flex align-items-center justify-content-center p-0"
                      style={{ width: 28, height: 28 }}
                      title="Kirim Email"
                    >
                      <IconifyIcon width={14} height={14} icon="bx:envelope" />
                    </a>
                  </li>
                </ul>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span className="text-muted fs-11">Status Legalitas:</span>
                <span
                  className={`badge px-2 py-1 fs-11 fw-semibold ${
                    merchant.kyc_status === 'approved'
                      ? 'bg-success-subtle text-success'
                      : merchant.kyc_status === 'pending'
                      ? 'bg-warning-subtle text-warning'
                      : 'bg-secondary-subtle text-secondary'
                  }`}
                >
                  {merchant.kyc_status === 'approved'
                    ? '✓ KYC Terverifikasi'
                    : merchant.kyc_status === 'pending'
                    ? '⏳ Menunggu Audit KYC'
                    : 'Belum Verifikasi'}
                </span>
                {merchant.bank_name && (
                  <span className="badge bg-light bg-opacity-25 text-body fs-11 border">
                    Rekening {merchant.bank_name}: {merchant.bank_account_number}
                  </span>
                )}
              </div>
            </div>

            {/* OUR STORY & MISSION */}
            <Row className="g-3 mt-1">
              <Col md={6}>
                <div className="p-3 rounded-2 h-100 bg-light bg-opacity-25 border">
                  <h5 className="fs-13 fw-bold text-body mb-1 d-flex align-items-center">
                    <IconifyIcon icon="solar:notes-bold" className="me-1 text-primary fs-16" />
                    Tentang &amp; Profil Toko:
                  </h5>
                  <p className="text-muted fs-12 mb-0" style={{ lineHeight: 1.6 }}>
                    {meta.story ||
                      `${merchant.name} adalah merchant resmi yang terdaftar di platform Indovia SaaS. Beroperasi dengan fokus memberikan layanan prima kepada pelanggan dengan integritas katalog original dan dukungan pembayaran terpercaya.`}
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className="p-3 rounded-2 h-100 bg-light bg-opacity-25 border">
                  <h5 className="fs-13 fw-bold text-body mb-1 d-flex align-items-center">
                    <IconifyIcon icon="solar:target-bold" className="me-1 text-success fs-16" />
                    Visi &amp; Komitmen Layanan:
                  </h5>
                  <p className="text-muted fs-12 mb-0" style={{ lineHeight: 1.6 }}>
                    {meta.mission ||
                      `Memperluas jangkauan pemasaran daring ke seluruh Indonesia, menjaga kualitas pesanan tepat waktu, dan memberikan pengalaman berbelanja digital terbaik melalui storefront Indovia.`}
                  </p>
                </div>
              </Col>
            </Row>

            {/* 4 STATS BOXES DI BAWAH */}
            <Row className="text-center g-2 mt-2">
              <Col lg={3} xs={6}>
                <div className="p-2.5 rounded border bg-light bg-opacity-25">
                  <h4 className="mb-0 fw-bold text-body fs-17">{merchant.item_count || 0} SKU</h4>
                  <p className="text-muted mb-0 fs-11">Total Item Stok</p>
                </div>
              </Col>
              <Col lg={3} xs={6}>
                <div className="p-2.5 rounded border bg-light bg-opacity-25">
                  <h4 className="mb-0 fw-bold text-success fs-17">+{merchant.total_orders || 0}</h4>
                  <p className="text-muted mb-0 fs-11">Pesanan Selesai (Sells)</p>
                </div>
              </Col>
              <Col lg={3} xs={6}>
                <div className="p-2.5 rounded border bg-light bg-opacity-25">
                  <h4 className="mb-0 fw-bold text-primary fs-17">
                    {meta.happyClients || `+${Math.floor((merchant.total_orders || 100) * 0.9)}`}
                  </h4>
                  <p className="text-muted mb-0 fs-11">Pelanggan Puas</p>
                </div>
              </Col>
              <Col lg={3} xs={6}>
                <div className="p-2.5 rounded border bg-light bg-opacity-25">
                  <h4 className="mb-0 fw-bold text-warning fs-17">{meta.followers || '18.5k'}</h4>
                  <p className="text-muted mb-0 fs-11">Pengikut Toko</p>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SellerDetails;