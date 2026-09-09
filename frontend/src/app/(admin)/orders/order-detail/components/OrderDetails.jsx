import React from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderSummary = ({ order }) => {
  return (
    <>
      <CardHeader className="py-2.5">
        <CardTitle as="h5" className="mb-0 fs-15 fw-semibold text-dark d-flex align-items-center gap-2">
          <IconifyIcon icon="solar:bill-list-bold" className="text-primary fs-18" />
          Rincian Pembayaran
        </CardTitle>
      </CardHeader>
      <CardBody className="py-2">
        <div className="table-responsive">
          <table className="table mb-0 align-middle">
            <tbody className="fs-13">
              <tr>
                <td className="px-0 py-2 text-muted">
                  <span className="d-flex align-items-center gap-1.5">
                    <IconifyIcon icon="solar:cart-bold" className="fs-16" /> Subtotal Produk:
                  </span>
                </td>
                <td className="text-end text-dark fw-medium px-0 py-2">
                  {order.formatted_subtotal || order.formatted_amount}
                </td>
              </tr>
              <tr>
                <td className="px-0 py-2 text-muted">
                  <span className="d-flex align-items-center gap-1.5">
                    <IconifyIcon icon="solar:delivery-bold" className="fs-16" /> Ongkos Kirim ({order.courier ? order.courier.split(' ')[0] : 'JNE'}):
                  </span>
                </td>
                <td className="text-end text-dark fw-medium px-0 py-2">
                  {order.formatted_shipping || 'Rp 18.000'}
                </td>
              </tr>
              <tr>
                <td className="px-0 py-2 text-muted">
                  <span className="d-flex align-items-center gap-1.5">
                    <IconifyIcon icon="solar:shield-check-bold" className="fs-16" /> Biaya Layanan:
                  </span>
                </td>
                <td className="text-end text-dark fw-medium px-0 py-2">
                  {order.formatted_service || 'Rp 2.000'}
                </td>
              </tr>
              <tr>
                <td className="px-0 py-2 text-muted">
                  <span className="d-flex align-items-center gap-1.5">
                    <IconifyIcon icon="solar:ticket-bold" className="fs-16 text-success" /> Diskon Promo:
                  </span>
                </td>
                <td className="text-end text-success fw-medium px-0 py-2">
                  {order.formatted_discount || 'Rp 0'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBody>
      <CardFooter className="d-flex align-items-center justify-content-between bg-light-subtle py-2.5">
        <div>
          <p className="fw-semibold text-dark mb-0 fs-14">Total Pembayaran</p>
          <span className="text-muted fs-11">Termasuk PPN & Jasa Kurir</span>
        </div>
        <div className="text-end">
          <p className="fw-bold text-primary mb-0 fs-16">{order.formatted_amount}</p>
        </div>
      </CardFooter>
    </>
  );
};

const PaymentInformation = ({ order }) => {
  // Resolve icon by payment method
  const getPaymentIcon = (method) => {
    switch (method) {
      case 'QRIS':
        return 'solar:qr-code-bold';
      case 'Virtual Account':
        return 'solar:bank-bold';
      case 'E-Wallet':
        return 'solar:wallet-money-bold';
      case 'COD':
        return 'solar:hand-money-bold';
      default:
        return 'solar:card-2-bold';
    }
  };

  return (
    <>
      <CardHeader className="py-2.5">
        <CardTitle as="h5" className="mb-0 fs-15 fw-semibold text-dark d-flex align-items-center gap-2">
          <IconifyIcon icon="solar:card-2-bold" className="text-primary fs-18" />
          Informasi Pembayaran
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="d-flex align-items-center gap-2.5 mb-3 p-2.5 bg-light rounded border">
          <div className="avatar-sm bg-primary text-white d-flex align-items-center justify-content-center rounded">
            <IconifyIcon icon={getPaymentIcon(order.payment_method)} className="fs-22" />
          </div>
          <div>
            <h6 className="mb-0 text-dark fw-bold fs-14">{order.payment_method || 'QRIS'}</h6>
            <span className="text-muted fs-12">Gateway: Indovia Escrow Pay</span>
          </div>
          <div className="ms-auto">
            <span className={`badge bg-${order.payment_badge || 'success'}-subtle text-${order.payment_badge || 'success'} fs-12 rounded-pill px-2 py-1`}>
              {order.payment_status || 'Lunas'}
            </span>
          </div>
        </div>

        <div className="fs-13">
          <div className="d-flex justify-content-between py-1 border-bottom">
            <span className="text-muted">No. Transaksi Indovia:</span>
            <span className="text-dark fw-medium font-monospace">#TRX-{String(order.id).padStart(5, '0')}</span>
          </div>
          <div className="d-flex justify-content-between py-1 border-bottom">
            <span className="text-muted">Pengirim Dana:</span>
            <span className="text-dark fw-medium">{order.customer_name}</span>
          </div>
          <div className="d-flex justify-content-between py-1 border-bottom">
            <span className="text-muted">Kanal Pembelian:</span>
            <span className="badge bg-light text-dark border fs-11">{order.sales_channel}</span>
          </div>
          <div className="d-flex justify-content-between py-1">
            <span className="text-muted">Status Transaksi:</span>
            <span className="text-success fw-semibold d-flex align-items-center gap-1">
              <IconifyIcon icon="bx:check-circle" /> {order.payment_status === 'Lunas' ? 'Terverifikasi Otomatis' : order.payment_status}
            </span>
          </div>
        </div>
      </CardBody>
    </>
  );
};

const CustomerDetails = ({ order }) => {
  const rawPhone = order.customer_phone ? order.customer_phone.replace(/[^0-9]/g, '') : '';
  const waPhone = rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : rawPhone;
  const waUrl = `https://wa.me/${waPhone}?text=Halo%20${encodeURIComponent(order.customer_name)},%20pesanan%20Anda%20%23${order.order_number}%20sedang%20kami%20pantau%20di%20Indovia.`;

  return (
    <>
      <CardHeader className="py-2.5">
        <CardTitle as="h5" className="mb-0 fs-15 fw-semibold text-dark d-flex align-items-center gap-2">
          <IconifyIcon icon="solar:user-circle-bold" className="text-primary fs-18" />
          Rincian Pembeli & Penerima
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div className="d-flex align-items-center gap-2.5 mb-3">
          <div className="avatar-md bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold fs-16 flex-shrink-0">
            {order.customer_name ? order.customer_name.charAt(0) : 'P'}
          </div>
          <div className="overflow-hidden">
            <h6 className="mb-0 text-dark fw-semibold fs-14 text-truncate">{order.customer_name}</h6>
            <span className="text-muted fs-12 text-truncate d-block">{order.customer_email || 'pembeli@indovia.id'}</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="text-muted fs-12 text-uppercase fw-semibold">Kontak WhatsApp</span>
            {rawPhone && (
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="badge bg-success-subtle text-success fs-11 text-decoration-none">
                Kirim Chat &rarr;
              </a>
            )}
          </div>
          <p className="mb-0 fw-medium text-dark fs-13 font-monospace">{order.customer_phone || '-'}</p>
        </div>

        <div className="mb-3">
          <span className="text-muted fs-12 text-uppercase fw-semibold d-block mb-1">Alamat Pengiriman</span>
          <div className="p-2 bg-light rounded border fs-12 text-dark">
            <p className="fw-semibold mb-1">{order.customer_name}</p>
            <p className="mb-1">{order.shipping_address || `Jl. Melati Raya No. 42, RT 04 / RW 02, Kec. Kebayoran Baru, ${order.customer_city}, Indonesia 12150`}</p>
            <p className="mb-0 text-muted">Kota: <strong className="text-dark">{order.customer_city}</strong></p>
          </div>
        </div>

        <div>
          <span className="text-muted fs-12 text-uppercase fw-semibold d-block mb-1">Alamat Penagihan (Billing)</span>
          <p className="text-muted fs-12 mb-0">
            <IconifyIcon icon="solar:check-circle-bold" className="text-success me-1 align-middle" />
            {order.billing_address || 'Sama dengan alamat pengiriman paket'}
          </p>
        </div>
      </CardBody>
    </>
  );
};

const Map = ({ order }) => {
  const city = order?.customer_city || 'Jakarta';
  const mapQuery = encodeURIComponent(`${city}, Indonesia`);

  return (
    <>
      <CardHeader className="py-2.5">
        <CardTitle as="h5" className="mb-0 fs-15 fw-semibold text-dark d-flex align-items-center gap-2">
          <IconifyIcon icon="solar:map-point-wave-bold" className="text-primary fs-18" />
          Wilayah Pengiriman ({city})
        </CardTitle>
      </CardHeader>
      <CardBody className="p-2">
        <div className="mapouter rounded overflow-hidden border">
          <div className="gmap_canvas">
            <iframe
              className="gmap_iframe"
              width="100%"
              style={{ height: 280, border: 0 }}
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              title={`Peta Pengiriman ${city}`}
              src={`https://maps.google.com/maps?width=100%25&height=280&hl=id&q=${mapQuery}&t=&z=12&ie=UTF8&iwloc=B&output=embed`}
            />
          </div>
        </div>
      </CardBody>
    </>
  );
};

const OrderDetails = ({ order }) => {
  if (!order) return null;

  return (
    <div className="d-flex flex-column gap-3">
      <Card className="border shadow-none">
        <OrderSummary order={order} />
      </Card>
      <Card className="border shadow-none">
        <PaymentInformation order={order} />
      </Card>
      <Card className="border shadow-none">
        <CustomerDetails order={order} />
      </Card>
      <Card className="border shadow-none">
        <Map order={order} />
      </Card>
    </div>
  );
};

export default OrderDetails;