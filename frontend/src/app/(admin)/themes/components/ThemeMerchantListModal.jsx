import { useState, useEffect } from 'react';
import { Modal, Button, Table, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { initialMerchantsData, getMerchantThemeInfo, formatRupiah } from '@/app/(admin)/seller/data';

const ThemeMerchantListModal = ({ show, onHide, theme }) => {
  const navigate = useNavigate();
  const [merchants, setMerchants] = useState(initialMerchantsData);

  useEffect(() => {
    if (show) {
      fetch('/api/v1/admin/merchants')
        .then((res) => res.json())
        .then((json) => {
          if (json?.data?.merchants?.length > 0) {
            setMerchants(json.data.merchants);
          }
        })
        .catch((err) => console.log('Using local merchant state in modal', err));
    }
  }, [show]);

  if (!theme) return null;

  // Filter merchants using this theme
  const adoptingMerchants = merchants.filter((m) => {
    const info = getMerchantThemeInfo(m);
    return info.theme_id === theme.id || (theme.id === 'fashion-01' && !info.theme_id);
  });

  const handleOpenInDirectory = () => {
    onHide();
    navigate(`/seller/seller-list?theme=${theme.id}`);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-bottom py-3">
        <div className="d-flex align-items-center gap-2">
          <div className="avatar-sm bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center">
            <IconifyIcon icon="solar:shop-2-bold" className="fs-18" />
          </div>
          <div>
            <Modal.Title as="h5" className="mb-0 fs-15 fw-bold">
              Merchant Pengguna: {theme.name} ({theme.demoNumber})
            </Modal.Title>
            <small className="text-muted fs-12">
              Daftar toko dan tenant yang aktif menggunakan tema beranda ini di platform Indovia
            </small>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-0">
        {/* THEME SUMMARY BANNER */}
        <div className="p-3 bg-light-subtle border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div className="d-flex align-items-center gap-2">
            <Badge bg="primary" className="font-monospace fs-11 px-2 py-1">
              {theme.demoNumber}
            </Badge>
            <span className="text-muted fs-12">&bull;</span>
            <span className="fs-12 text-body fw-medium">{theme.category}</span>
            <span className="text-muted fs-12">&bull;</span>
            <span className="fs-12 text-muted">
              {theme.version || 'v2.4.0'}
            </span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Badge bg="success-subtle" className="text-success border border-success-subtle fs-12 px-2.5 py-1">
              <strong>{adoptingMerchants.length} Toko</strong> Aktif Menggunakan
            </Badge>
          </div>
        </div>

        {/* TABLE OF MERCHANTS */}
        <div className="table-responsive" style={{ maxHeight: '420px' }}>
          <Table hover className="align-middle mb-0">
            <thead className="bg-light sticky-top">
              <tr className="fs-11 text-uppercase text-muted border-bottom">
                <th className="ps-3 py-2">Nama Toko &amp; Tenant</th>
                <th className="py-2">Pemilik Toko</th>
                <th className="py-2">Layout Produk Terpasang</th>
                <th className="py-2">Paket &amp; Status</th>
                <th className="text-end pe-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody className="fs-12">
              {adoptingMerchants.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    <IconifyIcon icon="solar:ghost-bold" className="fs-32 text-muted mb-2 d-block mx-auto" />
                    Belum ada toko yang aktif menggunakan tema ini saat ini.
                  </td>
                </tr>
              ) : (
                adoptingMerchants.map((m) => {
                  const themeInfo = getMerchantThemeInfo(m);
                  return (
                    <tr key={m.id}>
                      {/* Toko */}
                      <td className="ps-3">
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={m.avatar}
                            alt={m.name}
                            className="rounded border"
                            style={{ width: 34, height: 34, objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${m.subdomain}`;
                            }}
                          />
                          <div>
                            <strong className="text-body d-block fs-13">{m.name}</strong>
                            <small className="text-muted font-monospace fs-11">
                              {m.subdomain}.indovia.com
                            </small>
                          </div>
                        </div>
                      </td>

                      {/* Pemilik */}
                      <td>
                        <div className="fw-medium text-body fs-12">{m.owner_name}</div>
                        <small className="text-muted fs-11">{m.city}</small>
                      </td>

                      {/* Layout Produk Terpasang */}
                      <td>
                        <Badge bg="light" className="text-body border fs-11 font-monospace py-1 px-2">
                          <IconifyIcon icon="solar:widget-bold" className="me-1 text-primary" />
                          {themeInfo.product_layout}
                        </Badge>
                      </td>

                      {/* Paket */}
                      <td>
                        <Badge
                          bg={m.plan === 'Enterprise' ? 'danger-subtle' : 'primary-subtle'}
                          className={`fs-11 px-2 py-0.5 border ${
                            m.plan === 'Enterprise' ? 'text-danger border-danger-subtle' : 'text-primary border-primary-subtle'
                          }`}
                        >
                          {m.plan}
                        </Badge>
                        <small className="d-block text-success fs-10 mt-0.5 fw-semibold">
                          {m.status === 'active' ? 'Aktif Berbayar' : 'Masa Trial'}
                        </small>
                      </td>

                      {/* Aksi */}
                      <td className="text-end pe-3">
                        <div className="d-inline-flex align-items-center gap-1">
                          <Button
                            as={Link}
                            to={`/seller/seller-details?id=${m.id}&tab=themes`}
                            size="sm"
                            variant="outline-primary"
                            className="fs-11 py-1 px-2 d-inline-flex align-items-center"
                            onClick={onHide}
                            title="Buka Pengaturan Tata Letak Toko Ini"
                          >
                            <IconifyIcon icon="solar:pallete-2-bold" className="me-1" />
                            Atur Layout
                          </Button>
                          <Button
                            as={Link}
                            to={`/seller/seller-details?id=${m.id}`}
                            size="sm"
                            variant="outline-secondary"
                            className="fs-11 py-1 px-2 d-inline-flex align-items-center"
                            onClick={onHide}
                            title="Audit Toko Lengkap"
                          >
                            <IconifyIcon icon="solar:eye-bold" className="me-1" />
                            Audit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-top py-2.5 px-3 d-flex justify-content-between">
        <Button variant="outline-secondary" size="sm" onClick={onHide}>
          Tutup
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="d-flex align-items-center fw-semibold shadow-sm"
          onClick={handleOpenInDirectory}
        >
          <IconifyIcon icon="solar:shop-2-bold" className="me-1.5" />
          Buka di Direktori Toko (Filter Tema Ini)
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ThemeMerchantListModal;
