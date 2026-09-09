import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  Col,
  Row,
  Badge,
  Button,
  Form,
  InputGroup,
  Modal,
  Spinner,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const statusTabs = [
  { key: 'Semua', label: 'Semua Pesanan' },
  { key: 'Selesai', label: 'Selesai / Lunas' },
  { key: 'Diproses', label: 'Diproses Toko' },
  { key: 'Dikirim', label: 'Dalam Pengiriman' },
  { key: 'Menunggu Konfirmasi', label: 'Menunggu Konfirmasi' },
  { key: 'Dibatalkan', label: 'Dibatalkan' }
];

const channels = ['Semua Kanal', 'Web Storefront', 'WhatsApp Direct', 'Multi-Channel'];
const payments = ['Semua Metode', 'QRIS', 'Virtual Account', 'E-Wallet', 'COD'];

const OrdersList = ({
  orders = [],
  pagination = {},
  loading = false,
  statusFilter = 'Semua',
  setStatusFilter,
  channelFilter = 'Semua Kanal',
  setChannelFilter,
  paymentFilter = 'Semua Metode',
  setPaymentFilter,
  search = '',
  setSearch,
  page = 1,
  setPage,
  refetch,
  updateOrderStatus,
  exportToCSV
}) => {
  // Modal States
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [targetStatus, setTargetStatus] = useState('Selesai');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [statusLoading, setStatusLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState({ type: '', text: '' });

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleOpenStatusModal = (order) => {
    setSelectedOrder(order);
    setTargetStatus(order.status || 'Diproses');
    setTrackingNumber(order.tracking_number === '-' ? '' : order.tracking_number);
    setFeedbackMsg({ type: '', text: '' });
    setShowStatusModal(true);
  };

  const handleSaveStatus = async () => {
    if (!selectedOrder) return;
    setStatusLoading(true);
    setFeedbackMsg({ type: '', text: '' });

    const result = await updateOrderStatus(selectedOrder.id, targetStatus, trackingNumber);
    setStatusLoading(false);

    if (result.success) {
      setFeedbackMsg({ type: 'success', text: 'Status pesanan berhasil diperbarui!' });
      setTimeout(() => {
        setShowStatusModal(false);
      }, 1000);
    } else {
      setFeedbackMsg({ type: 'danger', text: result.message || 'Gagal mengubah status.' });
    }
  };

  // Pagination calculation
  const totalItems = pagination.total_items || orders.length;
  const totalPages = pagination.total_pages || 1;
  const fromItem = totalItems > 0 ? (page - 1) * (pagination.per_page || 10) + 1 : 0;
  const toItem = Math.min(page * (pagination.per_page || 10), totalItems);

  return (
    <Row>
      <Col xl={12}>
        <Card className="border-0 shadow-sm">
          {/* 1. STATUS FILTER TABS */}
          <div className="card-header border-bottom p-0 bg-transparent">
            <div className="d-flex flex-wrap align-items-center px-3 pt-2 gap-1 overflow-x-auto">
              {statusTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setStatusFilter(tab.key)}
                  className={`btn btn-sm py-2 px-3 border-0 rounded-top rounded-0 fw-medium fs-13 transition-all ${
                    statusFilter === tab.key
                      ? 'text-primary border-bottom border-primary border-2 bg-transparent fw-bold'
                      : 'text-muted bg-transparent'
                  }`}
                  style={{
                    borderBottom: statusFilter === tab.key ? '2px solid #ff6c2f' : 'none',
                    color: statusFilter === tab.key ? '#ff6c2f' : undefined
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. ACTION BAR (Search, Filters, Export, Refresh) */}
          <div className="p-3 border-bottom bg-light bg-opacity-25">
            <Row className="g-2 align-items-center justify-content-between">
              {/* Search Box */}
              <Col md={4} lg={4}>
                <InputGroup size="sm">
                  <InputGroup.Text className="bg-white border-end-0">
                    <IconifyIcon icon="solar:magnifer-linear" className="fs-15 text-muted" />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Cari ID order, pembeli, produk, kota..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-start-0 ps-0 bg-white"
                  />
                  {search && (
                    <Button
                      variant="outline-light"
                      size="sm"
                      className="border text-muted"
                      onClick={() => setSearch('')}
                    >
                      <IconifyIcon icon="solar:close-circle-bold" className="fs-14" />
                    </Button>
                  )}
                </InputGroup>
              </Col>

              {/* Filters & Actions */}
              <Col md={8} lg={8}>
                <div className="d-flex flex-wrap align-items-center justify-content-md-end gap-2">
                  {/* Kanal Penjualan Filter */}
                  <Form.Select
                    size="sm"
                    value={channelFilter}
                    onChange={(e) => setChannelFilter(e.target.value)}
                    style={{ width: 'auto', minWidth: 150 }}
                    className="bg-white"
                  >
                    {channels.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Form.Select>

                  {/* Metode Pembayaran Filter */}
                  <Form.Select
                    size="sm"
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                    style={{ width: 'auto', minWidth: 150 }}
                    className="bg-white"
                  >
                    {payments.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </Form.Select>

                  {/* Tombol Ekspor CSV */}
                  <Button
                    variant="light"
                    size="sm"
                    onClick={exportToCSV}
                    className="d-flex align-items-center border bg-white shadow-xs"
                    title="Unduh laporan CSV"
                  >
                    <IconifyIcon icon="solar:download-minimalistic-bold" className="fs-14 me-1 text-primary" />
                    <span>Ekspor CSV</span>
                  </Button>

                  {/* Tombol Muat Ulang */}
                  <Button
                    variant="light"
                    size="sm"
                    onClick={refetch}
                    disabled={loading}
                    className="d-flex align-items-center border bg-white shadow-xs"
                    title="Perbarui data dari PostgreSQL"
                  >
                    <IconifyIcon
                      icon="solar:refresh-bold"
                      className={`fs-14 me-1 ${loading ? 'animate-spin' : ''}`}
                    />
                    <span>{loading ? 'Memuat...' : 'Muat Ulang'}</span>
                  </Button>
                </div>
              </Col>
            </Row>
          </div>

          {/* 3. TABLE DAFTAR PESANAN */}
          <CardBody className="p-0">
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover table-centered">
                <thead className="bg-light-subtle text-muted fs-11 text-uppercase fw-bold">
                  <tr>
                    <th style={{ width: '130px' }} className="ps-3">No. Pesanan</th>
                    <th style={{ width: '170px' }}>Toko Merchant</th>
                    <th>Pembeli & Wilayah</th>
                    <th>Produk Pesanan</th>
                    <th>Kanal Toko</th>
                    <th>Metode & Status Bayar</th>
                    <th className="text-end">Total Nilai</th>
                    <th className="text-center">Status Pesanan</th>
                    <th className="text-center pe-3" style={{ width: '120px' }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && orders.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-5">
                        <Spinner animation="border" size="sm" variant="primary" className="me-2" />
                        <span className="text-muted fs-13">Memuat data pesanan dari PostgreSQL...</span>
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-5">
                        <div className="avatar-lg bg-light rounded-circle mx-auto mb-3 flex-centered">
                          <IconifyIcon icon="solar:cart-cross-broken" className="fs-32 text-muted" />
                        </div>
                        <h5 className="fw-semibold text-body mb-1">Tidak Ada Pesanan yang Ditemukan</h5>
                        <p className="text-muted fs-12 mb-3">
                          Tidak ditemukan pesanan dengan kriteria filter atau pencarian saat ini.
                        </p>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => {
                            setStatusFilter('Semua');
                            setChannelFilter('Semua Kanal');
                            setPaymentFilter('Semua Metode');
                            setSearch('');
                          }}
                        >
                          Reset Semua Filter
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    orders.map((item) => (
                      <tr key={item.id} className="transition-all">
                        {/* No. Pesanan & Tanggal */}
                        <td className="ps-3">
                          <button
                            type="button"
                            onClick={() => handleOpenDetail(item)}
                            className="btn btn-link p-0 fw-bold fs-13 text-decoration-none text-body hover-primary text-start"
                          >
                            #{item.order_number}
                          </button>
                          <p className="text-muted mb-0 fs-11">{item.date}</p>
                        </td>

                        {/* Toko Merchant */}
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="avatar-xs rounded-circle d-flex align-items-center justify-content-center me-2 text-white flex-shrink-0"
                              style={{ backgroundColor: '#ff6c2f', width: 26, height: 26 }}
                            >
                              <IconifyIcon icon="solar:shop-bold" className="fs-12" />
                            </div>
                            <span className="fs-12 fw-semibold text-body text-truncate" style={{ maxWidth: 140 }} title={item.merchant_name}>
                              {item.merchant_name}
                            </span>
                          </div>
                        </td>

                        {/* Pembeli & Kota */}
                        <td>
                          <span className="fw-semibold text-body fs-13 d-block">{item.customer_name}</span>
                          <span className="text-muted fs-11">
                            {item.customer_city} &bull; {item.customer_phone}
                          </span>
                        </td>

                        {/* Produk */}
                        <td>
                          <div className="d-flex align-items-center">
                            {item.product_image ? (
                              <img
                                src={item.product_image}
                                alt={item.product_name}
                                className="rounded me-2 border flex-shrink-0"
                                style={{ width: 34, height: 34, objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            ) : (
                              <div
                                className="rounded me-2 bg-light border flex-shrink-0 flex-centered"
                                style={{ width: 34, height: 34 }}
                              >
                                <IconifyIcon icon="solar:box-broken" className="fs-16 text-muted" />
                              </div>
                            )}
                            <span className="fs-12 text-body fw-medium text-truncate" style={{ maxWidth: 170 }} title={item.product_name}>
                              {item.product_name}
                            </span>
                          </div>
                        </td>

                        {/* Kanal Toko */}
                        <td>
                          <span
                            className="badge fs-11 px-2 py-1 fw-medium"
                            style={{
                              backgroundColor:
                                item.sales_channel === 'Web Storefront'
                                  ? 'rgba(255, 108, 47, 0.1)'
                                  : item.sales_channel === 'WhatsApp Direct'
                                  ? 'rgba(34, 197, 94, 0.1)'
                                  : 'rgba(59, 130, 246, 0.1)',
                              color:
                                item.sales_channel === 'Web Storefront'
                                  ? '#ff6c2f'
                                  : item.sales_channel === 'WhatsApp Direct'
                                  ? '#16a34a'
                                  : '#2563eb'
                            }}
                          >
                            {item.sales_channel}
                          </span>
                        </td>

                        {/* Metode & Status Bayar */}
                        <td>
                          <span className="fs-12 fw-medium text-body d-block">{item.payment_method}</span>
                          <span
                            className={`badge px-1.5 py-0.5 rounded fs-10 ${
                              item.payment_status === 'Lunas'
                                ? 'bg-success bg-opacity-10 text-success'
                                : item.payment_status === 'Dibatalkan'
                                ? 'bg-danger bg-opacity-10 text-danger'
                                : 'bg-warning bg-opacity-10 text-warning'
                            }`}
                          >
                            {item.payment_status}
                          </span>
                        </td>

                        {/* Total Nilai */}
                        <td className="text-end">
                          <span className="fw-bold fs-13 text-body">{item.formatted_amount}</span>
                        </td>

                        {/* Status Pesanan */}
                        <td className="text-center">
                          <span
                            className={`badge px-2.5 py-1 rounded-pill fs-11 fw-semibold ${
                              item.status === 'Selesai'
                                ? 'bg-success bg-opacity-10 text-success border border-success border-opacity-25'
                                : item.status === 'Diproses'
                                ? 'bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25'
                                : item.status === 'Dikirim'
                                ? 'bg-info bg-opacity-10 text-info border border-info border-opacity-25'
                                : item.status === 'Dibatalkan'
                                ? 'bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25'
                                : 'bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        {/* Aksi */}
                        <td className="text-center pe-3">
                          <div className="d-flex align-items-center justify-content-center gap-1">
                            <Button
                              variant="light"
                              size="sm"
                              className="p-1 px-2 border"
                              onClick={() => handleOpenDetail(item)}
                              title="Lihat Rincian Pesanan"
                            >
                              <IconifyIcon icon="solar:eye-bold" className="fs-14 text-muted" />
                            </Button>
                            <Button
                              variant="light"
                              size="sm"
                              className="p-1 px-2 border"
                              onClick={() => handleOpenStatusModal(item)}
                              title="Perbarui Status Pesanan"
                            >
                              <IconifyIcon icon="solar:pen-2-bold" className="fs-14 text-primary" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>

          {/* 4. PAGINATION CONTROLS */}
          <CardFooter className="border-top p-3 bg-light bg-opacity-25">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
              <span className="fs-12 text-muted">
                Menampilkan <strong>{fromItem}</strong> - <strong>{toItem}</strong> dari <strong>{totalItems}</strong> pesanan
              </span>

              <div className="d-flex align-items-center gap-1">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  disabled={page <= 1 || loading}
                  onClick={() => setPage(page - 1)}
                  className="py-1 px-2 fs-12 border"
                >
                  &larr; Sebelumnya
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .map((p, idx, arr) => {
                    const prev = arr[idx - 1];
                    return (
                      <span key={p} className="d-inline-flex align-items-center">
                        {prev && p - prev > 1 && <span className="px-1 text-muted fs-12">&hellip;</span>}
                        <Button
                          variant={page === p ? 'primary' : 'outline-light'}
                          size="sm"
                          onClick={() => setPage(p)}
                          className={`py-1 px-2.5 fs-12 ${page === p ? 'fw-bold' : 'text-muted border'}`}
                          style={{
                            backgroundColor: page === p ? '#ff6c2f' : undefined,
                            borderColor: page === p ? '#ff6c2f' : '#e2e8f0'
                          }}
                        >
                          {p}
                        </Button>
                      </span>
                    );
                  })}

                <Button
                  variant="outline-secondary"
                  size="sm"
                  disabled={page >= totalPages || loading}
                  onClick={() => setPage(page + 1)}
                  className="py-1 px-2 fs-12 border"
                >
                  Selanjutnya &rarr;
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Col>

      {/* MODAL 1: DETAIL PESANAN */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered size="lg">
        <Modal.Header closeButton className="border-bottom pb-2">
          <Modal.Title as="h5" className="fw-bold text-body fs-16">
            Rincian Lengkap Pesanan #{selectedOrder?.order_number}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          {selectedOrder && (
            <div>
              <Row className="g-3 mb-3">
                <Col md={6}>
                  <div className="p-2.5 rounded-2 bg-light bg-opacity-25 border">
                    <p className="fs-11 fw-bold text-uppercase text-muted mb-1">Informasi Toko & Transaksi</p>
                    <div className="fs-12 mb-1">
                      <span className="text-muted">Toko Merchant:</span>{' '}
                      <strong>{selectedOrder.merchant_name}</strong>
                    </div>
                    <div className="fs-12 mb-1">
                      <span className="text-muted">Waktu Transaksi:</span>{' '}
                      <span>{selectedOrder.date}</span>
                    </div>
                    <div className="fs-12 mb-1">
                      <span className="text-muted">Kanal Penjualan:</span>{' '}
                      <span className="badge bg-primary bg-opacity-10 text-primary">{selectedOrder.sales_channel}</span>
                    </div>
                    <div className="fs-12">
                      <span className="text-muted">Nomor Resi:</span>{' '}
                      <code className="text-primary fw-bold">{selectedOrder.tracking_number}</code>
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="p-2.5 rounded-2 bg-light bg-opacity-25 border">
                    <p className="fs-11 fw-bold text-uppercase text-muted mb-1">Informasi Pembeli & Pengiriman</p>
                    <div className="fs-12 mb-1">
                      <span className="text-muted">Nama Pembeli:</span>{' '}
                      <strong>{selectedOrder.customer_name}</strong>
                    </div>
                    <div className="fs-12 mb-1">
                      <span className="text-muted">Kontak WhatsApp / Telp:</span>{' '}
                      <span>{selectedOrder.customer_phone}</span>
                    </div>
                    <div className="fs-12 mb-1">
                      <span className="text-muted">Kota Tujuan:</span>{' '}
                      <span>{selectedOrder.customer_city}</span>
                    </div>
                    <div className="fs-12">
                      <span className="text-muted">Status Pembayaran:</span>{' '}
                      <span className="badge bg-success bg-opacity-10 text-success">{selectedOrder.payment_status}</span>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Produk & Pembayaran */}
              <div className="p-3 rounded-2 bg-light bg-opacity-25 border mb-3">
                <p className="fs-11 fw-bold text-uppercase text-muted mb-2">Item Produk Pesanan</p>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    {selectedOrder.product_image && (
                      <img
                        src={selectedOrder.product_image}
                        alt={selectedOrder.product_name}
                        className="rounded me-3 border"
                        style={{ width: 50, height: 50, objectFit: 'cover' }}
                      />
                    )}
                    <div>
                      <h6 className="fw-semibold text-body mb-0 fs-13">{selectedOrder.product_name}</h6>
                      <span className="text-muted fs-11">Qty: 1 Unit &bull; Metode: {selectedOrder.payment_method}</span>
                    </div>
                  </div>
                  <div className="text-end">
                    <h5 className="fw-bold text-body mb-0 fs-15">{selectedOrder.formatted_amount}</h5>
                    <span className="badge bg-success bg-opacity-10 text-success fs-11">{selectedOrder.status}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-top pt-2">
          <Button variant="light" size="sm" onClick={() => setShowDetailModal(false)}>
            Tutup
          </Button>
          {selectedOrder && (
            <Link
              to={`/orders/order-detail?order=${selectedOrder.order_number}`}
              className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
            >
              <IconifyIcon icon="solar:arrow-right-up-bold" className="fs-14" />
              <span>Halaman Rincian Penuh</span>
            </Link>
          )}
          <Button
            variant="primary"
            size="sm"
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            onClick={() => {
              setShowDetailModal(false);
              handleOpenStatusModal(selectedOrder);
            }}
          >
            Ubah Status Pesanan
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL 2: UBAH STATUS PESANAN */}
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)} centered size="md">
        <Modal.Header closeButton className="border-bottom pb-2">
          <Modal.Title as="h5" className="fw-bold text-body fs-16">
            Perbarui Status Pesanan #{selectedOrder?.order_number}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          {feedbackMsg.text && (
            <div className={`alert alert-${feedbackMsg.type} fs-12 py-2 mb-3`}>
              {feedbackMsg.text}
            </div>
          )}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fs-12 fw-semibold text-body">Pilih Status Baru:</Form.Label>
              <Form.Select
                value={targetStatus}
                onChange={(e) => setTargetStatus(e.target.value)}
                className="fs-13"
              >
                <option value="Diproses">Diproses (Toko sedang menyiapkan barang)</option>
                <option value="Dikirim">Dikirim (Barang dalam perjalanan kurir)</option>
                <option value="Selesai">Selesai (Pesanan diterima & dana diteruskan)</option>
                <option value="Menunggu Konfirmasi">Menunggu Konfirmasi (Verifikasi bayar)</option>
                <option value="Dibatalkan">Dibatalkan (Batalkan pesanan)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fs-12 fw-semibold text-body">Nomor Resi Pengiriman (Opsional):</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contoh: JNE-88291024, J&T-992102"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="fs-13"
              />
              <Form.Text className="text-muted fs-11">
                Nomor resi kurir logistik untuk pelacakan pembeli.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top pt-2">
          <Button variant="light" size="sm" onClick={() => setShowStatusModal(false)} disabled={statusLoading}>
            Batal
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSaveStatus}
            disabled={statusLoading}
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
          >
            {statusLoading ? <Spinner animation="border" size="sm" className="me-1" /> : null}
            <span>{statusLoading ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default OrdersList;