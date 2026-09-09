import React, { useState } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, CardFooter, Col, Row, Modal, Button, Form, Badge, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProgressCard = ({ order, updating, onUpdateStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState(order?.status || 'Diproses');
  const [trackingNumber, setTrackingNumber] = useState(order?.tracking_number || '');
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Sync modal state when order updates
  React.useEffect(() => {
    if (order) {
      setNewStatus(order.status || 'Diproses');
      setTrackingNumber(order.tracking_number !== '-' ? order.tracking_number : '');
    }
  }, [order]);

  if (!order) return null;

  // Format phone to international WhatsApp link
  const rawPhone = order.customer_phone ? order.customer_phone.replace(/[^0-9]/g, '') : '';
  const waPhone = rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : rawPhone;
  const waUrl = `https://wa.me/${waPhone}?text=Halo%20${encodeURIComponent(order.customer_name)},%20kami%20dari%20Indovia%20Marketplace%20terkait%20pesanan%20%23${order.order_number}`;

  // Copy order ID & tracking
  const handleCopyInfo = () => {
    const textToCopy = `No. Pesanan: #${order.order_number} | Resi: ${order.tracking_number || '-'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleSubmitStatus = async (e) => {
    e.preventDefault();
    if (onUpdateStatus) {
      const res = await onUpdateStatus(newStatus, trackingNumber);
      if (res?.success) {
        setShowModal(false);
      }
    }
  };

  // Determine stage progress states (5 stages)
  // Stage 1: Checkout / Pesanan Dibuat (Always 100%)
  const isCreated = true;

  // Stage 2: Pembayaran
  const isPaid = order.payment_status === 'Lunas';
  const isPaymentPending = order.payment_status === 'Menunggu Pembayaran';

  // Stage 3: Diproses Toko
  const isProcessing = order.status === 'Diproses';
  const isProcessedOrHigher = ['Diproses', 'Dikirim', 'Selesai'].includes(order.status);
  const isShippedOrDelivered = ['Dikirim', 'Selesai'].includes(order.status);

  // Stage 4: Pengiriman
  const isShipping = order.status === 'Dikirim';
  const isDelivered = order.status === 'Selesai';
  const isCancelled = order.status === 'Dibatalkan';

  return (
    <>
      <Card className="border shadow-none mb-3">
        <CardBody>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 pb-3 border-bottom">
            <div>
              <h4 className="fw-bold text-dark d-flex align-items-center gap-2 mb-1">
                #{order.order_number}
                <span className={`badge bg-${order.payment_badge || 'success'}-subtle text-${order.payment_badge || 'success'} px-2.5 py-1 fs-12 fw-medium rounded-pill`}>
                  {order.payment_status || 'Lunas'}
                </span>
                <span className={`badge bg-${order.status_badge || 'primary'} text-white px-2.5 py-1 fs-12 fw-semibold rounded-pill`}>
                  {order.status || 'Diproses'}
                </span>
              </h4>
              <p className="text-muted mb-0 fs-13">
                Pesanan / Rincian Transaksi / <span className="text-dark fw-medium">#{order.order_number}</span> &bull; {order.date}
              </p>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2">
              <button 
                type="button" 
                onClick={handleCopyInfo} 
                className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                title="Salin Nomor Pesanan dan Resi"
              >
                <IconifyIcon icon={copyFeedback ? "bx:check" : "solar:copy-bold"} className="fs-16" />
                <span>{copyFeedback ? 'Tersalin!' : 'Salin Data'}</span>
              </button>

              {rawPhone && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                  title="Hubungi Pembeli via WhatsApp"
                >
                  <IconifyIcon icon="solar:chat-round-call-bold" className="fs-16" />
                  <span>WhatsApp Pembeli</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="btn btn-sm btn-primary d-flex align-items-center gap-1"
              >
                <IconifyIcon icon="solar:pen-new-square-bold" className="fs-16" />
                <span>Ubah Status Pesanan</span>
              </button>
            </div>
          </div>

          {/* Progress Tracker Title */}
          <div className="d-flex align-items-center justify-content-between mt-3 mb-2">
            <h5 className="fw-semibold text-dark mb-0 d-flex align-items-center gap-2">
              <IconifyIcon icon="solar:routing-2-bold-duotone" className="text-primary fs-20" />
              Progres Pemenuhan Pesanan
            </h5>
            <span className="text-muted fs-12">
              Kurir: <strong className="text-dark">{order.courier || 'JNE Express'}</strong>
            </span>
          </div>

          {/* 5-Stage Progress Visualizer */}
          {isCancelled ? (
            <Alert variant="danger" className="d-flex align-items-center gap-2 mt-3 mb-0">
              <IconifyIcon icon="solar:danger-triangle-bold" className="fs-22 flex-shrink-0" />
              <div>
                <strong>Pesanan Dibatalkan:</strong> Transaksi ini telah dibatalkan oleh pembeli atau sistem secara otomatis. Tidak ada pengiriman logistik yang dilanjutkan.
              </div>
            </Alert>
          ) : (
            <Row className="row-cols-xxl-5 row-cols-md-2 row-cols-1 g-3 mt-1">
              {/* Step 1: Pesanan Dibuat */}
              <Col>
                <div className="progress" style={{ height: 8 }}>
                  <div className="progress-bar bg-success" role="progressbar" style={{ width: '100%' }} />
                </div>
                <div className="d-flex align-items-center gap-1.5 mt-2">
                  <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-16" />
                  <p className="mb-0 fs-13 fw-medium text-dark">Pesanan Dibuat</p>
                </div>
                <span className="text-muted fs-11">Checkout berhasil</span>
              </Col>

              {/* Step 2: Verifikasi Pembayaran */}
              <Col>
                <div className="progress" style={{ height: 8 }}>
                  <div
                    className={`progress-bar ${isPaid ? 'bg-success' : isPaymentPending ? 'bg-warning progress-bar-striped progress-bar-animated' : 'bg-light'}`}
                    role="progressbar"
                    style={{ width: isPaid ? '100%' : isPaymentPending ? '65%' : '0%' }}
                  />
                </div>
                <div className="d-flex align-items-center gap-1.5 mt-2">
                  {isPaid ? (
                    <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-16" />
                  ) : (
                    <div className="spinner-border spinner-border-sm text-warning" role="status" style={{ width: '0.85rem', height: '0.85rem' }} />
                  )}
                  <p className="mb-0 fs-13 fw-medium text-dark">Pembayaran</p>
                </div>
                <span className="text-muted fs-11">{isPaid ? 'Lunas terverifikasi' : 'Menunggu pembayaran'}</span>
              </Col>

              {/* Step 3: Diproses Toko */}
              <Col>
                <div className="progress" style={{ height: 8 }}>
                  <div
                    className={`progress-bar ${isShippedOrDelivered ? 'bg-success' : isProcessing ? 'bg-warning progress-bar-striped progress-bar-animated' : 'bg-light'}`}
                    role="progressbar"
                    style={{ width: isShippedOrDelivered ? '100%' : isProcessing ? '60%' : '0%' }}
                  />
                </div>
                <div className="d-flex align-items-center gap-1.5 mt-2">
                  {isShippedOrDelivered ? (
                    <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-16" />
                  ) : isProcessing ? (
                    <div className="spinner-border spinner-border-sm text-warning" role="status" style={{ width: '0.85rem', height: '0.85rem' }} />
                  ) : (
                    <IconifyIcon icon="solar:clock-circle-broken" className="text-muted fs-16" />
                  )}
                  <p className="mb-0 fs-13 fw-medium text-dark">Diproses Toko</p>
                </div>
                <span className="text-muted fs-11">
                  {isShippedOrDelivered ? 'Siap kirim' : isProcessing ? 'Sedang dipacking' : 'Menunggu giliran'}
                </span>
              </Col>

              {/* Step 4: Dalam Pengiriman */}
              <Col>
                <div className="progress" style={{ height: 8 }}>
                  <div
                    className={`progress-bar ${isDelivered ? 'bg-success' : isShipping ? 'bg-info progress-bar-striped progress-bar-animated' : 'bg-light'}`}
                    role="progressbar"
                    style={{ width: isDelivered ? '100%' : isShipping ? '75%' : '0%' }}
                  />
                </div>
                <div className="d-flex align-items-center gap-1.5 mt-2">
                  {isDelivered ? (
                    <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-16" />
                  ) : isShipping ? (
                    <div className="spinner-border spinner-border-sm text-info" role="status" style={{ width: '0.85rem', height: '0.85rem' }} />
                  ) : (
                    <IconifyIcon icon="solar:clock-circle-broken" className="text-muted fs-16" />
                  )}
                  <p className="mb-0 fs-13 fw-medium text-dark">Pengiriman</p>
                </div>
                <span className="text-muted fs-11">
                  {isDelivered ? 'Tiba di tujuan' : isShipping ? 'Dalam perjalanan kurir' : 'Menunggu pickup'}
                </span>
              </Col>

              {/* Step 5: Pesanan Selesai */}
              <Col>
                <div className="progress" style={{ height: 8 }}>
                  <div
                    className={`progress-bar ${isDelivered ? 'bg-success' : 'bg-light'}`}
                    role="progressbar"
                    style={{ width: isDelivered ? '100%' : '0%' }}
                  />
                </div>
                <div className="d-flex align-items-center gap-1.5 mt-2">
                  {isDelivered ? (
                    <IconifyIcon icon="solar:verified-check-bold" className="text-success fs-16" />
                  ) : (
                    <IconifyIcon icon="solar:clock-circle-broken" className="text-muted fs-16" />
                  )}
                  <p className="mb-0 fs-13 fw-medium text-dark">Pesanan Selesai</p>
                </div>
                <span className="text-muted fs-11">{isDelivered ? 'Diterima pembeli' : 'Menunggu konfirmasi'}</span>
              </Col>
            </Row>
          )}
        </CardBody>

        <CardFooter className="d-flex flex-wrap align-items-center justify-content-between bg-light-subtle gap-2 py-2.5">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <span className="badge bg-white text-dark border px-2.5 py-1.5 d-flex align-items-center gap-1.5 fs-12">
              <IconifyIcon icon="solar:box-minimalistic-bold" className="text-primary fs-15" />
              Ekspedisi: <strong className="text-dark">{order.courier || 'JNE Express'}</strong>
            </span>
            <span className="badge bg-white text-dark border px-2.5 py-1.5 d-flex align-items-center gap-1.5 fs-12">
              <IconifyIcon icon="solar:document-text-bold" className="text-success fs-15" />
              Nomor Resi: <strong className="text-primary font-monospace">{order.tracking_number && order.tracking_number !== '-' ? order.tracking_number : 'Belum Ada Resi'}</strong>
            </span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link to="/orders/orders-list" className="btn btn-sm btn-link text-decoration-none text-muted p-0 me-2">
              &larr; Kembali ke Daftar
            </Link>
            <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
              <IconifyIcon icon="solar:refresh-circle-bold" className="me-1" />
              Perbarui Status & Resi
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Modal Ubah Status & Nomor Resi */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleSubmitStatus}>
          <Modal.Header closeButton>
            <Modal.Title className="fs-16 fw-semibold">
              Ubah Status Pesanan #{order.order_number}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label className="form-label text-dark fw-medium fs-13">Status Pemenuhan Pesanan</label>
              <Form.Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="form-select"
              >
                <option value="Selesai">Selesai (Pesanan Diterima Pembeli)</option>
                <option value="Dikirim">Dikirim (Dalam Pengiriman Kurir)</option>
                <option value="Diproses">Diproses (Sedang Disiapkan Toko)</option>
                <option value="Menunggu Konfirmasi">Menunggu Konfirmasi (Verifikasi Pembayaran/Stok)</option>
                <option value="Dibatalkan">Dibatalkan (Pesanan Hangus/Batal)</option>
              </Form.Select>
              <Form.Text className="text-muted fs-12">
                Pembaruan status akan mengubah progres pemenuhan dan memperbarui riwayat linimasa secara otomatis.
              </Form.Text>
            </div>

            <div className="mb-3">
              <label className="form-label text-dark fw-medium fs-13">Nomor Resi Pengiriman (Airway Bill)</label>
              <Form.Control
                type="text"
                placeholder="Contoh: JNE-881290, SICEPAT-99120, dll"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <Form.Text className="text-muted fs-12">
                Nomor resi logistik resmi untuk pelacakan ekspedisi pembeli.
              </Form.Text>
            </div>

            <div className="p-2.5 rounded bg-light border">
              <p className="mb-1 fs-12 text-muted">Ringkasan Pesanan:</p>
              <p className="mb-0 fs-13 text-dark fw-medium">
                {order.customer_name} &bull; {order.product_name} &bull; <span className="text-primary">{order.formatted_amount}</span>
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={() => setShowModal(false)}>
              Batal
            </Button>
            <Button variant="primary" size="sm" type="submit" disabled={updating}>
              {updating ? (
                <>
                  <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" />
                  Menyimpan...
                </>
              ) : (
                'Simpan Perubahan'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ProgressCard;