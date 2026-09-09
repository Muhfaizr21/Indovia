import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export const useOrderDetail = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderParam = searchParams.get('order') || searchParams.get('id') || 'latest';

  const [order, setOrder] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // Fetch Order Details
  const fetchOrderDetail = useCallback(async (identifier) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/v1/admin/superadmin/orders/${identifier || 'latest'}`);
      if (response.data && response.data.data) {
        setOrder(response.data.data);
      } else {
        setError('Data pesanan tidak ditemukan');
      }
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError(err.response?.data?.message || 'Gagal memuat rincian pesanan');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch Recent Orders for Order Switcher dropdown
  const fetchRecentOrders = useCallback(async () => {
    try {
      const response = await axios.get('/api/v1/admin/superadmin/orders?limit=25');
      if (response.data?.data?.orders) {
        setRecentOrders(response.data.data.orders);
      }
    } catch (err) {
      console.error('Error fetching recent orders list:', err);
    }
  }, []);

  // Initial fetch on param change
  useEffect(() => {
    fetchOrderDetail(orderParam);
  }, [orderParam, fetchOrderDetail]);

  // Initial fetch for recent orders
  useEffect(() => {
    fetchRecentOrders();
  }, [fetchRecentOrders]);

  // Switch Order function
  const selectOrder = (orderNumberOrId) => {
    setSearchParams({ order: orderNumberOrId });
  };

  // Update Status and Tracking Number
  const updateStatus = async (newStatus, trackingNumber = '') => {
    if (!order?.id) return { success: false, message: 'Pesanan tidak valid' };

    setUpdating(true);
    try {
      const response = await axios.put(`/api/v1/admin/superadmin/orders/${order.id}/status`, {
        status: newStatus,
        tracking_number: trackingNumber || order.tracking_number || '-'
      });

      setFeedbackMessage({
        type: 'success',
        text: response.data?.message || 'Status pesanan berhasil diperbarui'
      });

      // Refetch latest detail and list
      await fetchOrderDetail(order.id);
      fetchRecentOrders();

      setTimeout(() => setFeedbackMessage(null), 4000);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Gagal memperbarui status pesanan';
      setFeedbackMessage({ type: 'danger', text: msg });
      setTimeout(() => setFeedbackMessage(null), 4000);
      return { success: false, message: msg };
    } finally {
      setUpdating(false);
    }
  };

  return {
    order,
    recentOrders,
    loading,
    updating,
    error,
    feedbackMessage,
    refetch: () => fetchOrderDetail(orderParam),
    selectOrder,
    updateStatus
  };
};
