import { useState, useEffect, useCallback } from 'react';

export const useOrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    total_orders_count: 0,
    total_gmv: 0,
    formatted_total_gmv: 'Rp 0',
    completed_count: 0,
    completed_amount: 0,
    formatted_completed: 'Rp 0',
    processing_count: 0,
    processing_amount: 0,
    formatted_processing: 'Rp 0',
    pending_count: 0,
    cancelled_count: 0
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 1,
    has_next: false,
    has_prev: false
  });

  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [error, setError] = useState(null);
  const [isLiveSync, setIsLiveSync] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [channelFilter, setChannelFilter] = useState('Semua Kanal');
  const [paymentFilter, setPaymentFilter] = useState('Semua Metode');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: search.trim(),
      });

      if (statusFilter && statusFilter !== 'Semua') {
        params.append('status', statusFilter);
      }
      if (channelFilter && channelFilter !== 'Semua Kanal') {
        params.append('sales_channel', channelFilter);
      }
      if (paymentFilter && paymentFilter !== 'Semua Metode') {
        params.append('payment_method', paymentFilter);
      }

      const res = await fetch(`/api/v1/admin/superadmin/orders?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}: Gagal memuat daftar pesanan`);
      }
      const json = await res.json();
      if (json.data) {
        setOrders(json.data.orders || []);
        if (json.data.pagination) setPagination(json.data.pagination);
        if (json.data.stats) setStats(json.data.stats);
        setIsLiveSync(true);
      } else {
        throw new Error('Format data tidak valid');
      }
    } catch (err) {
      console.warn('Gagal memuat pesanan live:', err.message);
      setError(err.message);
      setIsLiveSync(false);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, statusFilter, channelFilter, paymentFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Handle status update
  const updateOrderStatus = async (orderId, newStatus, trackingNumber = '') => {
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/v1/admin/superadmin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          tracking_number: trackingNumber
        })
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || 'Gagal memperbarui status');
      }
      // Refetch orders & stats
      await fetchOrders();
      return { success: true, message: json.message };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (!orders || orders.length === 0) return;

    const headers = [
      'No. Pesanan',
      'Tanggal',
      'Toko Merchant',
      'Nama Pembeli',
      'Telepon',
      'Kota',
      'Produk',
      'Kanal Penjualan',
      'Metode Bayar',
      'Status Bayar',
      'Total Transaksi',
      'Status Pesanan',
      'No. Resi'
    ];

    const rows = orders.map((o) => [
      `"${o.order_number}"`,
      `"${o.date}"`,
      `"${o.merchant_name}"`,
      `"${o.customer_name}"`,
      `"${o.customer_phone}"`,
      `"${o.customer_city}"`,
      `"${o.product_name}"`,
      `"${o.sales_channel}"`,
      `"${o.payment_method}"`,
      `"${o.payment_status}"`,
      o.total_amount,
      `"${o.status}"`,
      `"${o.tracking_number}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Daftar_Pesanan_Indovia_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    orders,
    stats,
    pagination,
    loading,
    updatingStatus,
    error,
    isLiveSync,
    statusFilter,
    setStatusFilter: (val) => {
      setStatusFilter(val);
      setPage(1);
    },
    channelFilter,
    setChannelFilter: (val) => {
      setChannelFilter(val);
      setPage(1);
    },
    paymentFilter,
    setPaymentFilter: (val) => {
      setPaymentFilter(val);
      setPage(1);
    },
    search,
    setSearch: (val) => {
      setSearch(val);
      setPage(1);
    },
    page,
    setPage,
    refetch: fetchOrders,
    updateOrderStatus,
    exportToCSV
  };
};
