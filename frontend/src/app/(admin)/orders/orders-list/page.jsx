import PageTItle from '@/components/PageTItle';
import OrdersDataCard from './components/OrdersDataCard';
import OrdersList from './components/OrdersList';
import { useOrdersList } from './hooks/useOrdersList';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button } from 'react-bootstrap';

const OrdersListPage = () => {
  const {
    orders,
    stats,
    pagination,
    loading,
    updatingStatus,
    error,
    isLiveSync,
    statusFilter,
    setStatusFilter,
    channelFilter,
    setChannelFilter,
    paymentFilter,
    setPaymentFilter,
    search,
    setSearch,
    page,
    setPage,
    refetch,
    updateOrderStatus,
    exportToCSV
  } = useOrdersList();

  return (
    <>
      {/* HEADER EKSEKUTIF MANAJEMEN PESANAN INDOVIA */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2">
        <div>
          <PageTItle title="Daftar Pesanan Eksekutif" />
          <p className="text-muted fs-12 mb-0">
            Monitoring Transaksi Multi-Tenant, Pemrosesan Pesanan, dan Distribusi Logistik Seluruh Toko
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          {/* Status Golang PostgreSQL Engine */}
          <div
            className="d-flex align-items-center px-2.5 py-1 rounded-pill bg-light border shadow-xs"
            style={{ fontSize: '11px' }}
          >
            <span
              className={`rounded-circle me-1.5 ${isLiveSync ? 'bg-success' : 'bg-warning'}`}
              style={{
                width: 8,
                height: 8,
                display: 'inline-block',
                boxShadow: isLiveSync ? '0 0 8px #22c55e' : 'none'
              }}
            />
            <span className="fw-medium text-body">
              {isLiveSync ? 'Golang Engine Live' : 'Menghubungkan...'}
            </span>
          </div>

          {/* Tombol Muat Ulang Realtime */}
          <Button
            variant="light"
            size="sm"
            onClick={refetch}
            disabled={loading}
            className="d-flex align-items-center shadow-xs border bg-white"
            title="Refresh data dari database PostgreSQL"
          >
            <IconifyIcon
              icon="solar:refresh-bold"
              className={`fs-14 me-1 ${loading ? 'animate-spin' : ''}`}
            />
            <span>{loading ? 'Memuat...' : 'Refresh'}</span>
          </Button>
        </div>
      </div>

      {/* 4 KARTU RINGKASAN METRIK PESANAN DINAMIS */}
      <OrdersDataCard stats={stats} />

      {/* TABEL PESANAN KAYA FITUR */}
      <OrdersList
        orders={orders}
        pagination={pagination}
        loading={loading}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        channelFilter={channelFilter}
        setChannelFilter={setChannelFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        search={search}
        setSearch={setSearch}
        page={page}
        setPage={setPage}
        refetch={refetch}
        updateOrderStatus={updateOrderStatus}
        exportToCSV={exportToCSV}
      />
    </>
  );
};

export default OrdersListPage;