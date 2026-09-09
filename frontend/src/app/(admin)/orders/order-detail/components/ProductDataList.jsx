import React from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardHeader, CardTitle, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductDataList = ({ order }) => {
  if (!order) return null;

  const items = (order.items && order.items.length > 0) ? order.items : [
    {
      id: order.id,
      product_name: order.product_name,
      product_image: order.product_image,
      sku: `IND-SKU-${String(order.id).padStart(4, '0')}`,
      size: 'Standar / All Size',
      quantity: 1,
      formatted_price: order.formatted_subtotal || order.formatted_amount,
      formatted_total: order.formatted_subtotal || order.formatted_amount
    }
  ];

  return (
    <Card className="border shadow-none mb-3">
      <CardHeader className="d-flex align-items-center justify-content-between py-2.5">
        <CardTitle as="h5" className="mb-0 fs-15 fw-semibold text-dark d-flex align-items-center gap-2">
          <IconifyIcon icon="solar:bag-check-bold" className="text-primary fs-18" />
          Rincian Produk Pesanan
        </CardTitle>
        <span className="badge bg-light text-muted border fs-12 fw-normal">
          {items.length} Macam Barang
        </span>
      </CardHeader>
      <CardBody className="p-0">
        <div className="table-responsive">
          <table className="table align-middle mb-0 table-hover table-centered">
            <thead className="bg-light-subtle border-bottom text-uppercase fs-11 text-muted">
              <tr>
                <th className="ps-3" style={{ minWidth: 260 }}>Informasi Produk</th>
                <th>Toko Merchant</th>
                <th>Status Item</th>
                <th className="text-center">Kuantitas</th>
                <th className="text-end">Harga Satuan</th>
                <th className="text-end pe-3">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="ps-3">
                    <div className="d-flex align-items-center gap-2.5 py-1">
                      <div className="rounded bg-light border avatar-md d-flex align-items-center justify-content-center overflow-hidden flex-shrink-0">
                        {item.product_image ? (
                          <img
                            src={item.product_image}
                            alt={item.product_name}
                            className="img-fluid"
                            style={{ maxHeight: '100%', objectFit: 'contain' }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/assets/images/products/product-1(1).png';
                            }}
                          />
                        ) : (
                          <IconifyIcon icon="solar:box-broken" className="fs-24 text-muted" />
                        )}
                      </div>
                      <div>
                        <h6 className="text-dark fw-semibold fs-14 mb-1 text-truncate" style={{ maxWidth: 260 }}>
                          {item.product_name}
                        </h6>
                        <div className="d-flex align-items-center gap-2 text-muted fs-12">
                          <span>SKU: <span className="text-dark font-monospace">{item.sku}</span></span>
                          &bull;
                          <span>Varian: <span className="text-dark">{item.size}</span></span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-1.5">
                      <IconifyIcon icon="solar:shop-2-bold" className="text-primary fs-15 flex-shrink-0" />
                      <span className="fw-medium text-dark fs-13">{order.merchant_name}</span>
                    </div>
                    <span className="text-muted fs-11">Kanal: {order.sales_channel}</span>
                  </td>
                  <td>
                    <span className={`badge bg-${order.status_badge || 'primary'}-subtle text-${order.status_badge || 'primary'} px-2 py-1 fs-12 rounded-pill`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="text-center fw-medium text-dark fs-13">
                    {item.quantity} pcs
                  </td>
                  <td className="text-end text-muted fs-13">
                    {item.formatted_price}
                  </td>
                  <td className="text-end pe-3 fw-bold text-dark fs-14">
                    {item.formatted_total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductDataList;