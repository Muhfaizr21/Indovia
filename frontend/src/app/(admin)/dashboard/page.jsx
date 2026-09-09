import { useState } from 'react';
import { Row, Col, Card, CardBody, Badge, Button, Spinner } from 'react-bootstrap';
import PageTitle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { KpiCards, RevenueChart } from './components/Stats';
import ActivityChart from './components/ActivityChart';
import { CustomerLoyaltyChart, RegionalDistributionChart } from './components/Conversions';
import FunnelChart from './components/FunnelChart';
import Orders from './components/Orders';
import { useSuperadminDashboard } from './hooks/useSuperadminDashboard';

const DashboardPage = () => {
  const [range, setRange] = useState('1T');
  const { data, loading, error, isLiveSync, refetch } = useSuperadminDashboard(range);

  return (
    <>
      {/* HEADER RINGKASAN EKSEKUTIF DENGAN KONTROL SINKRONISASI GOLANG */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2">
        <PageTitle title="Ringkasan Eksekutif" />

        <div className="d-flex align-items-center gap-2">
          {/* Status Sinkronisasi Golang Engine */}
          <div
            className="d-flex align-items-center px-2.5 py-1 rounded-pill bg-light border"
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
              {isLiveSync ? 'Golang Engine Live' : 'Offline Fallback'}
            </span>
            {data?.generated_at && (
              <span className="text-muted ms-1 d-none d-sm-inline">
                &bull; {new Date(data.generated_at).toLocaleTimeString('id-ID')}
              </span>
            )}
          </div>

          {/* Filter Periode */}
          <div className="btn-group btn-group-sm" role="group">
            {['1B', '6B', '1T'].map((r) => (
              <button
                key={r}
                type="button"
                className={`btn btn-sm ${range === r ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setRange(r)}
              >
                {r === '1B' ? '1 Bulan' : r === '6B' ? '6 Bulan' : '1 Tahun'}
              </button>
            ))}
          </div>

          {/* Tombol Muat Ulang Realtime */}
          <Button
            variant="light"
            size="sm"
            onClick={refetch}
            disabled={loading}
            className="d-flex align-items-center shadow-xs border"
            title="Refresh metrik dari database PostgreSQL"
          >
            <IconifyIcon
              icon="solar:refresh-bold"
              className={`fs-14 me-1 ${loading ? 'animate-spin' : ''}`}
            />
            <span>{loading ? 'Memuat...' : 'Refresh'}</span>
          </Button>
        </div>
      </div>

      <Row className="g-3">
        {/* BARIS 1: 4 Kartu KPI Utama Menyebar Penuh di Atas */}
        <KpiCards kpis={data?.kpis} />

        {/* BARIS 2: Chart 1 (WHAT: Revenue & GMV 7 kolom) + Chart 4 (WHO: Loyalitas Pelanggan 5 kolom) */}
        <RevenueChart revenueData={data?.revenue_chart} />
        <CustomerLoyaltyChart loyaltyData={data?.customer_loyalty} />

        {/* BARIS 3: Chart 2 (WHEN: Jam Puncak 6 kolom) + Chart 5 (HOW/WHY: Corong Konversi 6 kolom) */}
        <ActivityChart activityData={data?.hourly_activity} />
        <FunnelChart funnelData={data?.conversion_funnel} paymentsData={data?.payment_methods} />

        {/* BARIS 4: Chart 3 (WHERE: Demografi Regional & Kanal Penjualan 12 kolom) */}
        <RegionalDistributionChart
          regionalData={data?.regional_distribution}
          channelData={data?.sales_channels}
        />

        {/* BARIS 5: Tabel Pesanan Masuk Terkini */}
        <Orders orders={data?.recent_orders} />
      </Row>
    </>
  );
};

export default DashboardPage;