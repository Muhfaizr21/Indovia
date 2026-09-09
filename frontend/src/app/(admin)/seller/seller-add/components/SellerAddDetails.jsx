import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, Col, ProgressBar, Row, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatRupiah } from '../../data';

const SellerAddDetails = ({ formData }) => {
  const data = formData || {
    name: 'Batik & Fashion Store',
    subdomain: 'batik-fashion',
    category: 'Fashion & Pakaian',
    city: 'Jakarta',
    address: 'Jl. Sudirman No. 10',
    owner_name: 'Pemilik Toko',
    owner_email: 'owner@toko.com',
    owner_phone: '0812-3456-7890',
    plan: 'Pro',
    item_count: 24
  };

  return (
    <Col xl={3} md={6}>
      <div className="position-sticky" style={{ top: 85 }}>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h5 className="mb-0 fs-13 fw-bold text-body text-uppercase">
            <IconifyIcon icon="solar:eye-bold" className="me-1 text-primary" />
            Live Preview Kartu Toko
          </h5>
          <span className="badge bg-primary-subtle text-primary fs-10">Otomatis Update</span>
        </div>

        <Card className="border-0 shadow-sm overflow-hidden">
          <CardBody className="p-3">
            <div
              className="position-relative p-3 rounded-2 text-center border bg-light bg-opacity-25"
              style={{ minHeight: 140 }}
            >
              <img
                src={
                  data.avatar ||
                  `https://api.dicebear.com/7.x/identicon/svg?seed=${data.subdomain || 'newstore'}`
                }
                alt="Logo Toko"
                className="avatar-xl rounded-2 shadow-sm"
                style={{ width: 90, height: 90, objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${data.subdomain || 'newstore'}`;
                }}
              />
              <span
                className="position-absolute top-0 end-0 m-2 badge text-uppercase fs-10 fw-semibold"
                style={{
                  backgroundColor:
                    data.plan === 'Enterprise' ? '#ff6c2f' : data.plan === 'Pro' ? '#3b82f6' : '#64748b',
                  color: '#ffffff'
                }}
              >
                Paket {data.plan}
              </span>
            </div>

            <div className="my-3">
              <h5 className="mb-1 text-body fw-bold fs-15 text-truncate">{data.name || 'Nama Toko Baru'}</h5>
              <p className="text-muted fs-11 mb-1">
                <span className="text-body fw-medium">{data.category || 'Kategori Toko'}</span> &bull;{' '}
                {data.city || 'Indonesia'}
              </p>
              <div>
                <span className="text-primary fs-12 fw-medium font-monospace d-inline-flex align-items-center">
                  <IconifyIcon icon="solar:link-bold" className="me-1 fs-11" />
                  https://{data.subdomain || 'nama-toko'}.indovia.com
                </span>
              </div>
            </div>

            <div className="fs-12 text-secondary border-top pt-2.5 mt-2">
              <p className="d-flex align-items-center gap-1.5 mb-1.5">
                <IconifyIcon icon="solar:point-on-map-bold-duotone" className="fs-15 text-primary flex-shrink-0" />
                <span className="text-truncate">{data.address || data.city || 'Alamat Toko Belum Diisi'}</span>
              </p>
              <p className="d-flex align-items-center gap-1.5 mb-1.5">
                <IconifyIcon icon="solar:letter-bold-duotone" className="fs-15 text-primary flex-shrink-0" />
                <span className="text-truncate">{data.owner_email || 'email@pemilik.com'}</span>
              </p>
              <p className="d-flex align-items-center gap-1.5 mb-0">
                <IconifyIcon icon="solar:chat-round-dots-bold" className="fs-15 text-success flex-shrink-0" />
                <span className="text-success fw-medium">{data.owner_phone || 'Nomor WhatsApp'}</span>
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-top">
              <div className="d-flex align-items-center justify-content-between mb-1 fs-11">
                <span className="text-muted">Target SKU Pertama:</span>
                <strong className="text-body">{data.item_count || 10} Produk</strong>
              </div>
              <ProgressBar
                variant="warning"
                now={Math.min(100, Math.max(20, (data.item_count || 10) * 2))}
                className="progress-sm rounded-pill"
                style={{ height: 5 }}
              />
            </div>

            <div className="p-2.5 rounded-2 mt-3 bg-light bg-opacity-25 border text-center">
              <span className="text-muted fs-11 d-block mb-0.5">Status Langganan Awal:</span>
              <span className="badge bg-warning-subtle text-warning fs-11 fw-semibold">
                Masa Uji Coba (14 Hari Trial Gratis)
              </span>
            </div>
          </CardBody>
        </Card>
      </div>
    </Col>
  );
};

export default SellerAddDetails;