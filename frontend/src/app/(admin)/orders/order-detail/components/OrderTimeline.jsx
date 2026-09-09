import React from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Badge } from 'react-bootstrap';

const OrderTimeline = ({ order }) => {
  if (!order) return null;

  const timeline = order.timeline && order.timeline.length > 0 ? order.timeline : [
    {
      title: 'Pesanan Berhasil Dibuat',
      description: `Checkout oleh ${order.customer_name} melalui kanal ${order.sales_channel}`,
      date: order.date,
      status: 'done',
      icon: 'solar:cart-check-bold'
    },
    {
      title: 'Verifikasi Pembayaran',
      description: `Metode ${order.payment_method} - Status: ${order.payment_status}`,
      date: order.date,
      status: order.payment_status === 'Lunas' ? 'done' : 'current',
      icon: 'solar:card-2-bold'
    },
    {
      title: 'Diproses Toko',
      description: `Pesanan dipacking oleh ${order.merchant_name}`,
      date: order.date,
      status: ['Diproses', 'Dikirim', 'Selesai'].includes(order.status) ? 'done' : 'pending',
      icon: 'solar:box-bold'
    },
    {
      title: 'Pengiriman Logistik',
      description: `Kurir ${order.courier || 'JNE'} - Resi: ${order.tracking_number || '-'}`,
      date: order.date,
      status: ['Dikirim', 'Selesai'].includes(order.status) ? 'done' : 'pending',
      icon: 'solar:delivery-bold'
    },
    {
      title: 'Pesanan Selesai',
      description: `Diterima oleh ${order.customer_name} di ${order.customer_city}`,
      date: order.date,
      status: order.status === 'Selesai' ? 'done' : 'pending',
      icon: 'solar:verified-check-bold'
    }
  ];

  return (
    <Card className="border shadow-none mb-3">
      <CardHeader className="d-flex align-items-center justify-content-between py-2.5">
        <CardTitle as="h5" className="mb-0 fs-15 fw-semibold text-dark d-flex align-items-center gap-2">
          <IconifyIcon icon="solar:history-bold" className="text-primary fs-18" />
          Riwayat Linimasa Pemenuhan Pesanan
        </CardTitle>
        <span className="badge bg-light text-dark border fs-12 fw-normal">
          Status Terkini: <strong className="text-primary">{order.status}</strong>
        </span>
      </CardHeader>
      <CardBody>
        <div className="position-relative ms-2">
          {/* Dashed vertical line */}
          <span
            className="position-absolute start-0 top-0 border-start border-2 border-dashed h-100"
            style={{ borderColor: '#e2e8f0', left: '16px' }}
          />

          {timeline.map((item, idx) => {
            const isDone = item.status === 'done';
            const isCurrent = item.status === 'current';
            const isPending = item.status === 'pending';

            return (
              <div className="position-relative ps-4 mb-4" key={idx} style={{ paddingLeft: '3rem' }}>
                {/* Status Dot / Avatar on line */}
                <div
                  className={`position-absolute start-0 avatar-sm translate-middle-x d-inline-flex align-items-center justify-content-center rounded-circle border shadow-sm ${
                    isDone
                      ? 'bg-success text-white border-success'
                      : isCurrent
                      ? 'bg-warning text-white border-warning'
                      : 'bg-light text-muted border-secondary-subtle'
                  }`}
                  style={{ top: '2px', width: '32px', height: '32px' }}
                >
                  {isDone ? (
                    <IconifyIcon icon="bx:check" className="fs-18" />
                  ) : isCurrent ? (
                    <div
                      className="spinner-border spinner-border-sm text-white"
                      role="status"
                      style={{ width: '0.9rem', height: '0.9rem', borderWidth: '2px' }}
                    />
                  ) : (
                    <span className="fs-12 fw-semibold text-muted">{idx + 1}</span>
                  )}
                </div>

                {/* Content */}
                <div className="ms-2 d-flex flex-wrap gap-2 align-items-start justify-content-between">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h6 className={`mb-0 fw-semibold fs-14 ${isPending ? 'text-muted' : 'text-dark'}`}>
                        {item.title}
                      </h6>
                      {isDone && (
                        <span className="badge bg-success-subtle text-success fs-11 py-0.5 px-1.5 rounded-pill">
                          Selesai
                        </span>
                      )}
                      {isCurrent && (
                        <span className="badge bg-warning-subtle text-warning fs-11 py-0.5 px-1.5 rounded-pill">
                          Sedang Berjalan
                        </span>
                      )}
                    </div>
                    <p className="text-muted fs-13 mb-0">
                      {item.description}
                    </p>
                  </div>

                  <div className="text-end">
                    <span className="badge bg-light text-muted border fs-12 fw-normal">
                      <IconifyIcon icon="solar:calendar-date-broken" className="me-1 align-middle" />
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderTimeline;