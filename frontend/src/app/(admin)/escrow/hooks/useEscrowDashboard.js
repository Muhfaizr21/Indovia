import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useEscrowDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [splitPayments, setSplitPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reconciling, setReconciling] = useState(false);
  const [reconcileResult, setReconcileResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [error, setError] = useState(null);

  // Fetch Overview (KPI & Gateway Health)
  const fetchOverview = useCallback(async () => {
    try {
      const res = await axios.get('/api/v1/admin/superadmin/escrow/overview');
      if (res.data && res.data.data) {
        setOverview(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching escrow overview:', err);
      setError('Gagal memuat ringkasan escrow');
    }
  }, []);

  // Fetch 7-Day Flow Chart
  const fetchFlowChart = useCallback(async () => {
    try {
      const res = await axios.get('/api/v1/admin/superadmin/escrow/flow-chart');
      if (res.data && res.data.data) {
        setChartData(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching escrow flow chart:', err);
    }
  }, []);

  // Fetch Split Payments Log
  const fetchSplitPayments = useCallback(async (search = '', status = 'ALL') => {
    try {
      const params = {};
      if (search) params.search = search;
      if (status && status !== 'ALL') params.status = status;

      const res = await axios.get('/api/v1/admin/superadmin/escrow/split-payments', { params });
      if (res.data && res.data.data) {
        setSplitPayments(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching split payments:', err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    const initData = async () => {
      setLoading(true);
      await Promise.all([fetchOverview(), fetchFlowChart(), fetchSplitPayments(searchTerm, statusFilter)]);
      setLoading(false);
    };
    initData();
  }, [fetchOverview, fetchFlowChart, fetchSplitPayments]);

  // Debounced search and status filter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSplitPayments(searchTerm, statusFilter);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter, fetchSplitPayments]);

  // Trigger Reconcile
  const triggerReconciliation = async () => {
    setReconciling(true);
    setReconcileResult(null);
    try {
      const res = await axios.post('/api/v1/admin/superadmin/escrow/reconcile');
      if (res.data && res.data.data) {
        setReconcileResult(res.data.data);
        // Refresh overview metrics after reconciliation
        fetchOverview();
        fetchSplitPayments(searchTerm, statusFilter);
      }
      return { success: true, data: res.data?.data };
    } catch (err) {
      console.error('Error reconciling bank statements:', err);
      const msg = err.response?.data?.message || 'Gagal menjalankan rekonsiliasi';
      setReconcileResult({ status: 'ERROR', message: msg });
      return { success: false, message: msg };
    } finally {
      setReconciling(false);
    }
  };

  const refreshAll = async () => {
    setLoading(true);
    await Promise.all([fetchOverview(), fetchFlowChart(), fetchSplitPayments(searchTerm, statusFilter)]);
    setLoading(false);
  };

  return {
    overview,
    kpi: overview?.kpi,
    health: overview?.health,
    chartData,
    splitPayments,
    loading,
    reconciling,
    reconcileResult,
    setReconcileResult,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    error,
    refreshAll,
    triggerReconciliation,
  };
};
