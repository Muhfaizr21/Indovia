import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Card, CardBody, CardFooter, CardTitle, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { recentIndoviaOrders } from '../data';

const Orders = ({ orders = null }) => {
  const orderItems = orders && orders.length > 0 ? orders : recentIndoviaOrders;

  return (
    <Col xs={12}>
      <Card className="border-0 shadow-sm">
        <CardBody className="pb-0">
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
            <div>
              <CardTitle as="h5" className="fw-bold mb-1 text-body">
                Pesanan Masuk Terbaru
              </CardTitle>
              <p className="text-muted fs-12 mb-0">
                Aktivitas Transaksi Realtime Seluruh Toko & Merchant Indovia
              </p>
            </div>
            <div className="d-flex gap-2 mt-2 mt-sm-0">
              <Button variant="outline-secondary" size="sm" className="d-flex align-items-center">
                <IconifyIcon icon="solar:export-bold" className="me-1" />
                Ekspor Data
              </Button>
              <Button variant="primary" size="sm" className="d-flex align-items-center text-white" style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}>
                <IconifyIcon icon="solar:add-circle-bold" className="me-1" />
                Buat Pesanan Manual
              </Button>
            </div>
          </div>
        </CardBody>

        <div className="table-responsive table-centered">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light bg-opacity-50">
              <tr>
                <th className="ps-3 fs-12 text-uppercase text-muted">ID Pesanan</th>
                <th className="fs-12 text-uppercase text-muted">Waktu Transaksi</th>
                <th className="fs-12 text-uppercase text-muted">Produk</th>
                <th className="fs-12 text-uppercase text-muted">Pelanggan</th>
                <th className="fs-12 text-uppercase text-muted">Kota Tujuan</th>
                <th className="fs-12 text-uppercase text-muted">Kanal Penjualan</th>
                <th className="fs-12 text-uppercase text-muted">Total Pembayaran</th>
                <th className="fs-12 text-uppercase text-muted">Metode</th>
                <th className="fs-12 text-uppercase text-muted">Status Pesanan</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, idx) => (
                <tr key={idx}>
                  <td className="ps-3 fw-bold">
                    <Link to="/orders/order-detail" className="text-primary text-decoration-none">
                      {item.id}
                    </Link>
                  </td>
                  <td className="fs-12 text-muted">{item.date}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.product}
                          className="avatar-xs rounded-2 me-2 border"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      <span className="fw-medium text-body fs-13 text-truncate" style={{ maxWidth: '180px' }}>
                        {item.product}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="lh-sm">
                      <span className="fw-semibold text-body fs-13 d-block">{item.customer}</span>
                      <small className="text-muted fs-11">{item.phone}</small>
                    </div>
                  </td>
                  <td className="fs-13 text-body">{item.city}</td>
                  <td>
                    <span className={`badge bg-soft-${item.channelColor} text-${item.channelColor} px-2 py-1 fs-11`}>
                      {item.channel}
                    </span>
                  </td>
                  <td className="fw-bold text-body fs-13">{item.amount}</td>
                  <td className="fs-12 text-muted">{item.payment}</td>
                  <td>
                    <span className={`badge bg-soft-${item.statusColor} text-${item.statusColor} px-2 py-1 fs-11 d-inline-flex align-items-center`}>
                      <span
                        className={`bg-${item.statusColor} rounded-circle me-1`}
                        style={{ width: '6px', height: '6px' }}
                      />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CardFooter className="border-top py-3">
          <Row className="align-items-center g-2">
            <Col sm>
              <div className="text-muted fs-12">
                Menampilkan <span className="fw-bold text-body">5</span> dari{' '}
                <span className="fw-bold text-body">18.420</span> pesanan masuk bulan ini
              </div>
            </Col>
            <Col sm="auto">
              <Link to="/orders/orders-list" className="btn btn-sm btn-outline-primary">
                Lihat Semua Pesanan &rarr;
              </Link>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default Orders;