import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, Col, Row } from 'react-bootstrap';

const OrdersDataCard = ({ stats = {} }) => {
  const cards = [
    {
      title: 'Total Semua Pesanan',
      value: `${stats.total_orders_count || 0} Transaksi`,
      subtitle: `Total Nilai: ${stats.formatted_total_gmv || 'Rp 0'}`,
      icon: 'solar:cart-large-4-bold-duotone',
      accentColor: '#ff6c2f',
      bgColor: 'rgba(255, 108, 47, 0.1)',
      badge: 'Semua Status'
    },
    {
      title: 'Pesanan Selesai (Lunas)',
      value: `${stats.completed_count || 0} Berhasil`,
      subtitle: `Nilai Lunas: ${stats.formatted_completed || 'Rp 0'}`,
      icon: 'solar:check-circle-bold-duotone',
      accentColor: '#16a34a',
      bgColor: 'rgba(22, 163, 74, 0.1)',
      badge: 'Dana Masuk'
    },
    {
      title: 'Diproses & Dalam Pengiriman',
      value: `${stats.processing_count || 0} Berjalan`,
      subtitle: `Nilai Berjalan: ${stats.formatted_processing || 'Rp 0'}`,
      icon: 'solar:box-minimalistic-bold-duotone',
      accentColor: '#0284c7',
      bgColor: 'rgba(2, 132, 199, 0.1)',
      badge: 'Fulfillment'
    },
    {
      title: 'Perlu Konfirmasi / Batal',
      value: `${stats.pending_count || 0} Menunggu`,
      subtitle: `${stats.cancelled_count || 0} Transaksi Dibatalkan`,
      icon: 'solar:clock-circle-bold-duotone',
      accentColor: '#ea580c',
      bgColor: 'rgba(234, 88, 12, 0.1)',
      badge: 'Perhatian'
    }
  ];

  return (
    <Row className="g-3 mb-3">
      {cards.map((c, idx) => (
        <Col sm={6} xl={3} key={idx}>
          <Card className="border-0 shadow-sm h-100">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div
                  className="avatar-md rounded-3 d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: c.bgColor }}
                >
                  <IconifyIcon icon={c.icon} className="fs-24" style={{ color: c.accentColor }} />
                </div>
                <span
                  className="px-2 py-0.5 rounded-pill fs-11 fw-semibold"
                  style={{ backgroundColor: c.bgColor, color: c.accentColor }}
                >
                  {c.badge}
                </span>
              </div>

              <div>
                <p className="text-muted mb-1 fs-12 fw-medium">{c.title}</p>
                <h4 className="fw-bold mb-1 fs-18 text-body">{c.value}</h4>
                <p className="text-muted mb-0 fs-11 text-truncate">
                  {c.subtitle}
                </p>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default OrdersDataCard;