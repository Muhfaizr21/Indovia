import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useDisbursements = () => {
  const [overview, setOverview] = useState(null);
  const [queue, setQueue] = useState([]);
  const [config, setConfig] = useState({
    default_schedule: 'DAILY_T1',
    min_withdrawal: 50000,
    formatted_min_withdrawal: 'Rp 50.000',
    bank_transfer_fee: 2500,
    formatted_bank_fee: 'Rp 2.500',
    auto_disbursement_limit: 10000000,
    formatted_auto_limit: 'Rp 10.000.000',
    manual_approval_role: 'ROLE_FINANCE_LEAD',
    cut_off_time: '13:00 WIB',
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  // Modal states
  const [selectedPayoutForApproval, setSelectedPayoutForApproval] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [tempConfig, setTempConfig] = useState({ ...config });
  const [selectedPayoutForReceipt, setSelectedPayoutForReceipt] = useState(null);

  // Operation loading states
  const [isSubmitting2FA, setIsSubmitting2FA] = useState(false);
  const [isExecutingBatch, setIsExecutingBatch] = useState(false);
  const [isSavingConfig, setIsSavingConfig] = useState(false);

  // Toast / Action notification state
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

  // Fetch Disbursements Queue & Config
  const fetchDisbursements = useCallback(async (search = '', filter = 'ALL') => {
    try {
      const params = {};
      if (search) params.search = search;
      if (filter && filter !== 'ALL') params.filter = filter;

      const res = await axios.get('/api/v1/admin/superadmin/escrow/disbursements', { params });
      if (res.data && res.data.data) {
        setOverview(res.data.data);
        setQueue(res.data.data.queue || []);
        if (res.data.data.config) {
          setConfig(res.data.data.config);
          setTempConfig(res.data.data.config);
        }
      }
    } catch (err) {
      console.error('Error fetching disbursements data:', err);
      showNotification('Gagal Memuat Data', 'Tidak dapat mengambil antrean pencairan dana dari server.', 'danger');
    }
  }, []);

  // Initial Load
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchDisbursements();
      setLoading(false);
    };
    init();
  }, [fetchDisbursements]);

  // Handle Search & Filter with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDisbursements(searchTerm, filterType);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchTerm, filterType, fetchDisbursements]);

  // Handle 2FA Approval
  const handleApprove = async ({ payoutId, totpPin, notes }) => {
    setIsSubmitting2FA(true);
    try {
      const payload = {
        action: 'APPROVE',
        totp_pin: totpPin,
        notes: notes || 'Disetujui setelah verifikasi saldo escrow & mutasi bank.',
      };

      const res = await axios.post(`/api/v1/admin/superadmin/escrow/disbursements/${payoutId}/action`, payload);
      if (res.data && res.data.status === 'success') {
        showNotification(
          'Otorisasi 2FA Berhasil',
          `Pencairan ${payoutId} telah disetujui oleh ROLE_FINANCE_LEAD dan dipicu ke Gateway Payout API.`,
          'success'
        );
        setSelectedPayoutForApproval(null);
        await fetchDisbursements(searchTerm, filterType);
        return true;
      }
    } catch (err) {
      console.error('Error approving payout:', err);
      const errMsg = err.response?.data?.message || 'Gagal memproses otorisasi 2FA pencairan.';
      showNotification('Otorisasi Gagal', errMsg, 'danger');
      return false;
    } finally {
      setIsSubmitting2FA(false);
    }
  };

  // Handle Reject / Audit Hold
  const handleReject = async ({ payoutId, rejectReason, notes }) => {
    setIsSubmitting2FA(true);
    try {
      const payload = {
        action: 'REJECT',
        reject_reason: rejectReason || 'Penahanan audit finansial manual oleh ROLE_FINANCE_LEAD.',
        notes: notes || '',
      };

      const res = await axios.post(`/api/v1/admin/superadmin/escrow/disbursements/${payoutId}/action`, payload);
      if (res.data && res.data.status === 'success') {
        showNotification(
          'Pencairan Ditahan',
          `Pencairan ${payoutId} telah ditahan untuk audit forensik finansial.`,
          'warning'
        );
        setSelectedPayoutForApproval(null);
        await fetchDisbursements(searchTerm, filterType);
        return true;
      }
    } catch (err) {
      console.error('Error rejecting payout:', err);
      const errMsg = err.response?.data?.message || 'Gagal menahan pencairan dana.';
      showNotification('Kesalahan Sistem', errMsg, 'danger');
      return false;
    } finally {
      setIsSubmitting2FA(false);
    }
  };

  // Run Scheduled Batch Payout (T+1)
  const handleBatchPayout = async () => {
    setIsExecutingBatch(true);
    try {
      const res = await axios.post('/api/v1/admin/superadmin/escrow/disbursements/batch');
      if (res.data && res.data.status === 'success') {
        showNotification(
          'Batch Payout Berhasil',
          res.data.message || 'Batch payout terjadwal berhasil dieksekusi via API BI-FAST Xendit & Midtrans Iris.',
          'success'
        );
        await fetchDisbursements(searchTerm, filterType);
      }
    } catch (err) {
      console.error('Error running batch payout:', err);
      showNotification('Batch Payout Gagal', 'Gagal mengeksekusi batch payout ke payment gateway.', 'danger');
    } finally {
      setIsExecutingBatch(false);
    }
  };

  // Save Global Payout Configuration
  const handleSaveConfig = async (newConfig) => {
    setIsSavingConfig(true);
    try {
      const payload = {
        default_schedule: newConfig.default_schedule || newConfig.defaultSchedule || 'DAILY_T1',
        min_withdrawal: Number(newConfig.min_withdrawal ?? newConfig.minWithdrawal ?? 50000),
        bank_transfer_fee: Number(newConfig.bank_transfer_fee ?? newConfig.bankTransferFee ?? 2500),
        auto_disbursement_limit: Number(newConfig.auto_disbursement_limit ?? newConfig.autoDisbursementLimit ?? 10000000),
        manual_approval_role: newConfig.manual_approval_role || newConfig.manualApprovalRole || 'ROLE_FINANCE_LEAD',
        cut_off_time: newConfig.cut_off_time || newConfig.cutOffTime || '13:00 WIB',
      };

      const res = await axios.post('/api/v1/admin/superadmin/escrow/disbursements/config', payload);
      if (res.data && res.data.status === 'success') {
        setConfig(res.data.data);
        setTempConfig(res.data.data);
        setShowConfigModal(false);
        showNotification('Konfigurasi Disimpan', 'Parameter global payout berhasil diperbarui.', 'success');
        return true;
      }
    } catch (err) {
      console.error('Error saving payout config:', err);
      const errMsg = err.response?.data?.message || 'Gagal menyimpan konfigurasi parameter payout.';
      showNotification('Gagal Menyimpan', errMsg, 'danger');
      return false;
    } finally {
      setIsSavingConfig(false);
    }
  };

  return {
    overview,
    queue,
    config,
    loading,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    selectedPayoutForApproval,
    setSelectedPayoutForApproval,
    showConfigModal,
    setShowConfigModal,
    tempConfig,
    setTempConfig,
    selectedPayoutForReceipt,
    setSelectedPayoutForReceipt,
    isSubmitting2FA,
    isExecutingBatch,
    isSavingConfig,
    toastNotification,
    setToastNotification,
    fetchDisbursements,
    handleApprove,
    handleReject,
    handleBatchPayout,
    handleSaveConfig,
  };
};

export default useDisbursements;
