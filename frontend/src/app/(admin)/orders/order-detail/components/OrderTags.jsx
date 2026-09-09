import React from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, Col, Row } from 'react-bootstrap';

const OrderTags = ({ order }) => {
  if (!order) return null;

  const tagItems = [
    {
      title: 'Toko Merchant',
      description: order.merchant_name || 'Toko Resmi Indovia',
      subtext: `ID Merchant: #${order.merchant_id || 1}`,
      icon: 'solar:shop-2-bold-duotone',
      color: 'text-primary'
    },
    {
      title: 'Waktu Transaksi',
      description: order.date || '-',
      subtext: 'Zona Waktu Indonesia Barat (WIB)',
      icon: 'solar:calendar-date-bold-duotone',
      color: 'text-info'
    },
    {
      title: 'Nama Pembeli',
      description: order.customer_name || 'Pelanggan Indovia',
      subtext: `Tujuan: ${order.customer_city || 'Indonesia'}`,
      icon: 'solar:user-circle-bold-duotone',
      color: 'text-success'
    },
    {
      title: 'No. Referensi Pesanan',
      description: `#${order.order_number}`,
      subtext: `Kanal: ${order.sales_channel || 'Web Storefront'}`,
      icon: 'solar:clipboard-text-bold-duotone',
      color: 'text-warning'
    }
  ];

  return (
    <Card className="bg-light-subtle border shadow-none mb-3">
      <CardBody className="p-3">
        <Row className="g-3 g-lg-0">
          {tagItems.map((item, idx) => (
            <Col lg={3} className={`${tagItems.length - 1 !== idx ? 'border-end' : ''}`} key={idx}>
              <div className="d-flex align-items-center gap-3 justify-content-between px-3">
                <div className="overflow-hidden">
                  <p className="text-muted fw-medium fs-12 mb-1 text-uppercase tracking-wide">{item.title}</p>
                  <h6 className="text-dark fw-bold fs-14 mb-0 text-truncate">{item.description}</h6>
                  <span className="text-muted fs-11">{item.subtext}</span>
                </div>
                <div className="avatar bg-white border d-flex align-items-center justify-content-center rounded flex-shrink-0 shadow-sm">
                  <IconifyIcon icon={item.icon} className={`fs-26 ${item.color}`} />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
};

export default OrderTags;