import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useMerchantLedger = () => {
  const [overview, setOverview] = useState(null);
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Interactive modal states
  const [selectedMerchantForAudit, setSelectedMerchantForAudit] = useState(null);
  const [selectedMerchantForDispute, setSelectedMerchantForDispute] = useState(null);
  const [isProcessingDispute, setIsProcessingDispute] = useState(false);

  // Journals state for audit trail modal
  const [journals, setJournals] = useState([]);
  const [journalsLoading, setJournalsLoading] = useState(false);

  // Toast / notification state
  const [toastNotification, setToastNotification] = useState(null);

  const showNotification = (title, message, variant = 'success') => {
    setToastNotification({
      title,
      message,
      variant,
      timestamp: new Date().toLocaleTimeString('id-ID'),
    });
    setTimeout(() => {
      setToastNotification((prev) => (prev?.message === message ? null : prev));
    }, 6000);
  };

  // Fetch Ledger Overview
  const fetchLedger = useCallback(async (search = '', status = 'ALL') => {
    try {
      const params = {};
      if (search) params.search = search;
      if (status && status !== 'ALL') params.status = status;

      const res = await axios.get('/api/v1/admin/superadmin/escrow/ledger', { params });
      if (res.data && res.data.data) {
        setOverview(res.data.data);
        setMerchants(res.data.data.merchants || []);
      }
    } catch (err) {
      console.error('Error fetching merchant ledger:', err);
      showNotification('Gagal Memuat Data', 'Tidak dapat mengambil data buku besar merchant dari server.', 'danger');
    }
  }, []);

  // Fetch Double-Entry Journals for Audit Trail
  const fetchJournals = useCallback(async (merchantName = '') => {
    setJournalsLoading(true);
    try {
      const params = merchantName ? { merchant_name: merchantName } : {};
      const res = await axios.get('/api/v1/admin/superadmin/escrow/ledger/journals', { params });
      if (res.data && res.data.data) {
        setJournals(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching double-entry journals:', err);
      showNotification('Gagal Memuat Jurnal', 'Gagal memuat riwayat jurnal audit trail.', 'danger');
    } finally {
      setJournalsLoading(false);
    }
  }, []);

  // Handle Dispute Lock / Release
  const handleDisputeAction = async ({ merchantId, actionType, amount, ticketId, reasonCategory, notes }) => {
    setIsProcessingDispute(true);
    try {
      const payload = {
        action_type: actionType,
        amount: Number(amount),
        ticket_id: ticketId,
        reason_category: reasonCategory,
        notes: notes || '',
      };

      const res = await axios.post(`/api/v1/admin/superadmin/escrow/ledger/${merchantId}/dispute`, payload);
      if (res.data && res.data.status === 'success') {
        const actionLabel = actionType === 'LOCK' ? 'Pembekuan' : 'Pelepasan';
        showNotification(
          'Aksi Sengketa Berhasil',
          `${actionLabel} dana sengketa sebesar Rp ${Number(amount).toLocaleString('id-ID')} berhasil dicatat dalam buku besar.`,
          'success'
        );
        // Refresh ledger data
        await fetchLedger(searchTerm, statusFilter);
        // If audit modal is also open for this merchant, refresh journals
        if (selectedMerchantForAudit) {
          await fetchJournals(selectedMerchantForAudit.storeName || selectedMerchantForAudit.name);
        }
        return true;
      }
    } catch (err) {
      console.error('Error applying dispute adjustment:', err);
      const errMsg = err.response?.data?.message || 'Gagal memproses aksi sengketa pada server.';
      showNotification('Kesalahan Sengketa', errMsg, 'danger');
      return false;
    } finally {
      setIsProcessingDispute(false);
    }
  };

  // Export Ledger to CSV
  const handleExportCSV = async () => {
    try {
      showNotification('Ekspor Dimulai', 'Sedang mengunduh rekapitulasi buku besar saldo merchant...', 'info');
      const response = await axios.get('/api/v1/admin/superadmin/escrow/ledger/export', {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `indovia_escrow_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      showNotification('Ekspor Selesai', 'File rekapitulasi CSV berhasil diunduh ke komputer Anda.', 'success');
    } catch (err) {
      console.error('Error exporting ledger to CSV:', err);
      showNotification('Ekspor Gagal', 'Gagal membuat file CSV buku besar dari server.', 'danger');
    }
  };

  // Initial load
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchLedger();
      setLoading(false);
    };
    init();
  }, [fetchLedger]);

  // Handle Search & Filter with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLedger(searchTerm, statusFilter);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter, fetchLedger]);

  // When selectedMerchantForAudit changes, load their journals
  useEffect(() => {
    if (selectedMerchantForAudit) {
      fetchJournals(selectedMerchantForAudit.storeName || selectedMerchantForAudit.name || '');
    }
  }, [selectedMerchantForAudit, fetchJournals]);

  return {
    overview,
    merchants,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedMerchantForAudit,
    setSelectedMerchantForAudit,
    selectedMerchantForDispute,
    setSelectedMerchantForDispute,
    isProcessingDispute,
    journals,
    journalsLoading,
    toastNotification,
    setToastNotification,
    fetchLedger,
    fetchJournals,
    handleDisputeAction,
    handleExportCSV,
  };
};

export default useMerchantLedger;
