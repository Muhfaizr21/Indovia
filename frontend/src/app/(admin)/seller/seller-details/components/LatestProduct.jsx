import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardTitle, Col, Row, Badge, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatRupiah } from '../../data';

const LatestProduct = ({ merchant, metadata }) => {
  const meta = metadata || {};
  const products = meta.products || [
    {
      id: 'PRD-IND-01',
      name: 'Produk Unggulan Toko',
      category: merchant?.category || 'Koleksi Utama',
      price: 250000,
      stock: 45,
      variants: 'Default Variant',
      status: 'Published',
      image: merchant?.avatar
    }
  ];

  const accounting = meta.accounting || {
    totalGmv: formatRupiah(merchant?.monthly_gmv || 85400000),
    platformFee: formatRupiah((merchant?.monthly_gmv || 85400000) * 0.025),
    takeRate: '2.5%',
    readySettlement: formatRupiah((merchant?.monthly_gmv || 85400000) * 0.975),
    totalCustomers: '1.240'
  };

  return (
    <Row className="g-3">
      {/* KOLOM KIRI: KATALOG PRODUK TERBARU */}
      <Col lg={8}>
        <Card className="border-0 shadow-sm overflow-hidden h-100">
          <div className="d-flex card-header justify-content-between align-items-center border-bottom py-3 px-4">
            <div>
              <CardTitle as={'h4'} className="mb-0 fs-16 fw-bold text-body">
                Katalog Produk Terkini Toko
              </CardTitle>
              <p className="text-muted fs-11 mb-0 mt-0.5">
                Daftar SKU aktif yang dijual oleh merchant di etalase toko
              </p>
            </div>
            <Link
              to="/products/product-list"
              className="btn btn-sm btn-outline-secondary fs-11 py-1 d-flex align-items-center"
            >
              <IconifyIcon icon="solar:eye-bold" className="me-1" />
              Kelola Semua Produk
            </Link>
          </div>
          <CardBody className="p-0">
            <div className="table-responsive">
              <Table hover className="align-middle mb-0">
                <thead className="bg-light bg-opacity-75">
                  <tr className="fs-11 text-uppercase text-muted border-bottom">
                    <th className="ps-4" style={{ minWidth: '220px' }}>Produk &amp; Varian</th>
                    <th>Kode SKU</th>
                    <th>Kategori</th>
                    <th>Harga Satuan</th>
                    <th>Stok</th>
                    <th className="text-end pe-4">Status</th>
                  </tr>
                </thead>
                <tbody className="fs-12">
                  {products.map((item, idx) => (
                    <tr key={idx}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="rounded-2 me-2.5 border"
                            style={{ width: 40, height: 40, objectFit: 'cover', backgroundColor: '#f8fafc' }}
                            onError={(e) => {
                              e.target.src = 'https://api.dicebear.com/7.x/shapes/svg?seed=' + item.id;
                            }}
                          />
                          <div>
                            <strong className="text-dark fs-12 d-block text-truncate" style={{ maxWidth: 200 }}>
                              {item.name}
                            </strong>
                            <small className="text-muted fs-10">Varian: {item.variants}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="font-monospace fs-10 px-1.5 py-0.5 rounded bg-light border text-muted">
                          {item.id}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark fs-11 border">{item.category}</span>
                      </td>
                      <td>
                        <strong className="text-dark fs-12">{formatRupiah(item.price)}</strong>
                      </td>
                      <td>
                        <span className="fw-semibold text-secondary">{item.stock} unit</span>
                      </td>
                      <td className="text-end pe-4">
                        <span
                          className={`badge px-2 py-0.5 fs-10 fw-semibold ${
                            item.status === 'Published'
                              ? 'bg-success-subtle text-success'
                              : 'bg-warning-subtle text-warning'
                          }`}
                        >
                          {item.status === 'Published' ? '✓ Tayang' : 'Draft'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* KOLOM KANAN: ACCOUNTING & REVENUE SETTLEMENT */}
      <Col lg={4}>
        <div data-bs-theme="dark">
          <Card
            className="border-0 shadow-sm overflow-hidden h-100 position-relative"
            style={{ backgroundColor: '#0f172a' }}
          >
            <CardBody className="p-4 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="avatar-sm rounded-circle d-flex align-items-center justify-content-center"
                      style={{ backgroundColor: 'rgba(255, 108, 47, 0.2)', color: '#ff6c2f' }}
                    >
                      <IconifyIcon icon="solar:wallet-money-bold-duotone" className="fs-20" />
                    </div>
                    <div>
                      <h5 className="text-white fw-bold mb-0 fs-14">Settlement &amp; Rekonsiliasi</h5>
                      <span className="text-muted fs-11">Ringkasan Arus Kas Merchant</span>
                    </div>
                  </div>
                  <span className="badge bg-primary-subtle text-primary fs-10">Bulan Ini</span>
                </div>

                <div className="mb-3">
                  <p className="text-white-50 fs-11 mb-1">Total Omset Penjualan (Gross GMV):</p>
                  <h2 className="text-white fw-bold fs-22 mb-0" style={{ color: '#ff6c2f' }}>
                    {accounting.totalGmv}
                  </h2>
                </div>

                <div className="p-3 rounded-2 bg-dark bg-opacity-50 border border-secondary border-opacity-25 mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2 fs-12">
                    <span className="text-white-50">Platform Fee SaaS ({accounting.takeRate}):</span>
                    <span className="text-warning fw-semibold">{accounting.platformFee}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center fs-12 pt-2 border-top border-secondary border-opacity-25">
                    <span className="text-white">Saldo Bersih Siap Tarik:</span>
                    <strong className="text-success fs-13">{accounting.readySettlement}</strong>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between text-white-50 fs-11 mb-1">
                  <span>Total Pelanggan Pembeli:</span>
                  <strong className="text-white">{accounting.totalCustomers} Pembeli</strong>
                </div>

                {merchant?.bank_name && (
                  <div className="d-flex align-items-center justify-content-between text-white-50 fs-11">
                    <span>Rekening Pencairan:</span>
                    <strong className="text-white">
                      {merchant.bank_name} ({merchant.bank_account_number})
                    </strong>
                  </div>
                )}
              </div>

              <div className="pt-3 mt-3 border-top border-secondary border-opacity-25 d-flex gap-2">
                <Button
                  variant="outline-light"
                  size="sm"
                  className="w-100 fs-11 py-1.5"
                  onClick={() => alert('Log rekonsiliasi dan faktur penagihan akan diunduh')}
                >
                  <IconifyIcon icon="solar:download-minimalistic-bold" className="me-1" />
                  Unduh Rekap Keuangan
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default LatestProduct;