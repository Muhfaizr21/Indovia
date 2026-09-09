import React from 'react';
import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Col, Row, Spinner, Alert, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useOrderDetail } from './hooks/useOrderDetail';
import OrderDetails from './components/OrderDetails';
import OrderTags from './components/OrderTags';
import OrderTimeline from './components/OrderTimeline';
import ProductDataList from './components/ProductDataList';
import ProgressCard from './components/ProgressCard';

const OrderDetailPage = () => {
  const {
    order,
    recentOrders,
    loading,
    updating,
    error,
    feedbackMessage,
    refetch,
    selectOrder,
    updateStatus
  } = useOrderDetail();

  return (
    <>
      <PageTItle title={order ? `Rincian Pesanan #${order.order_number}` : 'Rincian Pesanan'} />

      {/* Executive Header Bar */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3 p-3 bg-white border rounded shadow-sm">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h4 className="fw-bold text-dark mb-0">
              Rincian Pesanan Eksekutif
            </h4>
            <span className="badge bg-success-subtle text-success fs-12 px-2.5 py-1 rounded-pill d-inline-flex align-items-center gap-1">
              <span className="bg-success rounded-circle" style={{ width: 6, height: 6 }} />
              Golang Engine Live
            </span>
          </div>
          <p className="text-muted mb-0 fs-13">
            Pemantauan siklus transaksi multi-tenant, verifikasi escrow, dan pelacakan logistik ekspedisi.
          </p>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          {/* Quick Order Switcher Dropdown */}
          <div className="d-flex align-items-center gap-1.5">
            <span className="text-muted fs-12 fw-medium d-none d-sm-inline">Pilih Pesanan:</span>
            <Form.Select
              size="sm"
              className="fw-medium"
              style={{ minWidth: 220 }}
              value={order?.order_number || ''}
              onChange={(e) => selectOrder(e.target.value)}
              disabled={loading}
            >
              {recentOrders && recentOrders.length > 0 ? (
                recentOrders.map((o) => (
                  <option key={o.id} value={o.order_number}>
                    #{o.order_number} &bull; {o.customer_name} ({o.status})
                  </option>
                ))
              ) : (
                <option value="">{order ? `#${order.order_number}` : 'Memuat pesanan...'}</option>
              )}
            </Form.Select>
          </div>

          <Button variant="outline-secondary" size="sm" onClick={refetch} disabled={loading} title="Segarkan Data">
            <IconifyIcon icon="solar:refresh-bold" className={`fs-16 ${loading ? 'spin' : ''}`} />
          </Button>

          <Link to="/orders/orders-list" className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
            <IconifyIcon icon="solar:list-check-bold" className="fs-16" />
            <span>Daftar Pesanan</span>
          </Link>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {feedbackMessage && (
        <Alert variant={feedbackMessage.type} className="d-flex align-items-center justify-content-between py-2 px-3 mb-3">
          <div className="d-flex align-items-center gap-2">
            <IconifyIcon
              icon={feedbackMessage.type === 'success' ? 'solar:check-circle-bold' : 'solar:danger-triangle-bold'}
              className="fs-18"
            />
            <span className="fs-13 fw-medium">{feedbackMessage.text}</span>
          </div>
        </Alert>
      )}

      {/* Loading State */}
      {loading && !order && (
        <div className="text-center py-5 bg-white border rounded shadow-sm my-3">
          <Spinner animation="border" variant="primary" role="status" className="mb-2" />
          <h6 className="text-dark fw-semibold mb-1">Memuat Rincian Pesanan...</h6>
          <p className="text-muted fs-13 mb-0">Menghubungkan ke layanan database PostgreSQL Superadmin</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <Alert variant="danger" className="my-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <IconifyIcon icon="solar:danger-triangle-bold" className="fs-22" />
              <div>
                <h6 className="mb-1 text-danger fw-bold">Gagal Mengambil Data Pesanan</h6>
                <p className="mb-0 fs-13">{error}</p>
              </div>
            </div>
            <Button variant="outline-danger" size="sm" onClick={refetch}>
              Coba Lagi
            </Button>
          </div>
        </Alert>
      )}

      {/* Main Order Content */}
      {order && (
        <Row className="g-3">
          <Col xl={8} lg={7}>
            <ProgressCard
              order={order}
              updating={updating}
              onUpdateStatus={updateStatus}
            />
            <ProductDataList order={order} />
            <OrderTimeline order={order} />
            <OrderTags order={order} />
          </Col>

          <Col xl={4} lg={5}>
            <OrderDetails order={order} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default OrderDetailPage;