import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useGatewayHub = () => {
  const [overview, setOverview] = useState(null);
  const [channels, setChannels] = useState([]);
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Interactive operation states
  const [toggleLoading, setToggleLoading] = useState({});
  const [pingLoading, setPingLoading] = useState({});
  const [isPingingAll, setIsPingingAll] = useState(false);
  const [pingResults, setPingResults] = useState({});
  const [savingCredentials, setSavingCredentials] = useState(false);

  // Toast / Action notification state
  const [toastNotification, setToastNotification] = useState(null);

  const showNotification = (title, message, variant = 'success') => {
    setToastNotification({ title, message, variant, timestamp: new Date().toLocaleTimeString('id-ID') });
    setTimeout(() => {
      setToastNotification((prev) => (prev?.message === message ? null : prev));
    }, 5000);
  };

  // Fetch Gateway Hub Overview & Channels
  const fetchGateways = useCallback(async () => {
    try {
      const res = await axios.get('/api/v1/admin/superadmin/escrow/gateways');
      if (res.data && res.data.data) {
        setOverview(res.data.data);
        setChannels(res.data.data.channels || []);
      }
    } catch (err) {
      console.error('Error fetching gateway hub data:', err);
      showNotification('Kesalahan Sistem', 'Gagal memuat data Master Gateway Hub dari server.', 'danger');
    }
  }, []);

  // Fetch API Credentials
  const fetchCredentials = useCallback(async () => {
    try {
      const res = await axios.get('/api/v1/admin/superadmin/escrow/gateways/credentials');
      if (res.data && res.data.data) {
        setCredentials(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching credentials:', err);
    }
  }, []);

  // Initial Load
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchGateways(), fetchCredentials()]);
      setLoading(false);
    };
    init();
  }, [fetchGateways, fetchCredentials]);

  // Toggle Kill Switch for a single channel
  const toggleKillSwitch = async (channelId) => {
    setToggleLoading((prev) => ({ ...prev, [channelId]: true }));
    try {
      const res = await axios.post(`/api/v1/admin/superadmin/escrow/gateways/${channelId}/toggle`);
      if (res.data && res.data.data) {
        const { new_status } = res.data.data;
        // Optimistically update local channels
        setChannels((prev) =>
          prev.map((ch) => (ch.id === channelId ? { ...ch, status: new_status } : ch))
        );
        // Refresh overview metrics (active channels count)
        fetchGateways();

        const channelObj = channels.find((c) => c.id === channelId);
        const name = channelObj?.name || channelId;
        if (new_status === 'ACTIVE') {
          showNotification(
            'Kanal Diaktifkan',
            `Kanal pembayaran ${name} berhasil diaktifkan kembali dan siap memproses transaksi checkout.`,
            'success'
          );
        } else {
          showNotification(
            'Kill Switch Diaktifkan',
            `Kanal pembayaran ${name} berhasil dihentikan (Kill Switch Aktif). Transaksi checkout untuk kanal ini dialihkan secara aman.`,
            'warning'
          );
        }
      }
    } catch (err) {
      console.error('Error toggling channel kill switch:', err);
      showNotification('Gagal Mengubah Status', 'Terjadi kendala saat mengubah status kill switch kanal.', 'danger');
    } finally {
      setToggleLoading((prev) => ({ ...prev, [channelId]: false }));
    }
  };

  // Ping a single channel
  const pingChannel = async (channelId) => {
    setPingLoading((prev) => ({ ...prev, [channelId]: true }));
    try {
      const res = await axios.post(`/api/v1/admin/superadmin/escrow/gateways/${channelId}/ping`);
      if (res.data && res.data.data) {
        const pingData = res.data.data;
        setPingResults((prev) => ({ ...prev, [channelId]: pingData }));
        // Update latency on channel item
        setChannels((prev) =>
          prev.map((ch) => (ch.id === channelId ? { ...ch, latency_ms: pingData.latency_ms } : ch))
        );

        const channelObj = channels.find((c) => c.id === channelId);
        const name = channelObj?.name || channelId;
        showNotification(
          'Uji Latensi Berhasil',
          `Kanal ${name}: Respons ${pingData.status} dengan latensi ${pingData.latency_ms} ms.`,
          'info'
        );
      }
    } catch (err) {
      console.error('Error pinging channel:', err);
      showNotification('Uji Latensi Gagal', `Kanal ${channelId} tidak merespons pengujian.`, 'danger');
    } finally {
      setPingLoading((prev) => ({ ...prev, [channelId]: false }));
    }
  };

  // Ping all 14 channels
  const pingAllChannels = async () => {
    setIsPingingAll(true);
    try {
      const res = await axios.post('/api/v1/admin/superadmin/escrow/gateways/ping-all');
      if (res.data && res.data.data) {
        const results = res.data.data;
        const newResultsMap = {};
        const latencyMap = {};
        results.forEach((r) => {
          newResultsMap[r.channel_id] = r;
          latencyMap[r.channel_id] = r.latency_ms;
        });
        setPingResults(newResultsMap);

        // Update all channels with new latencies
        setChannels((prev) =>
          prev.map((ch) =>
            latencyMap[ch.id] ? { ...ch, latency_ms: latencyMap[ch.id] } : ch
          )
        );

        // Calculate average
        const totalMs = results.reduce((acc, curr) => acc + curr.latency_ms, 0);
        const avg = Math.round(totalMs / results.length);

        setOverview((prev) => (prev ? { ...prev, average_latency_ms: avg } : prev));

        showNotification(
          'Pemeriksaan Sistem Selesai',
          `Semua ${results.length} kanal pembayaran nasional aktif merespons 200 OK. Rata-rata latensi keseluruhan: ${avg} ms.`,
          'success'
        );
      }
    } catch (err) {
      console.error('Error pinging all channels:', err);
      showNotification('Pemeriksaan Gagal', 'Gagal menghubungi server pengujian latensi gateway.', 'danger');
    } finally {
      setIsPingingAll(false);
    }
  };

  // Save Gateway Credentials
  const saveCredentials = async (formData) => {
    setSavingCredentials(true);
    try {
      const res = await axios.post('/api/v1/admin/superadmin/escrow/gateways/credentials', formData);
      if (res.data && res.data.data) {
        setCredentials(res.data.data);
        showNotification(
          'Kredensial Tersimpan',
          'Konfigurasi API Payment Gateway berhasil diamankan di Vault Enkripsi Indovia.',
          'success'
        );
        return { success: true };
      }
      return { success: false, message: 'Respons tidak valid dari server' };
    } catch (err) {
      console.error('Error saving credentials:', err);
      const msg = err.response?.data?.message || 'Gagal menyimpan kredensial ke vault';
      showNotification('Penyimpanan Gagal', msg, 'danger');
      return { success: false, message: msg };
    } finally {
      setSavingCredentials(false);
    }
  };

  // Filtered Channels
  const filteredChannels = channels.filter((ch) => {
    if (categoryFilter === 'ALL') return true;
    return ch.category === categoryFilter;
  });

  return {
    overview,
    channels,
    filteredChannels,
    credentials,
    loading,
    categoryFilter,
    setCategoryFilter,
    toggleLoading,
    pingLoading,
    isPingingAll,
    pingResults,
    savingCredentials,
    toastNotification,
    setToastNotification,
    toggleKillSwitch,
    pingChannel,
    pingAllChannels,
    saveCredentials,
    refreshGateways: fetchGateways,
  };
};
