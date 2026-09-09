import { Row } from 'react-bootstrap';
import PageTitle from '@/components/PageTItle';
import { KpiCards, RevenueChart } from './components/Stats';
import ActivityChart from './components/ActivityChart';
import { CustomerLoyaltyChart, RegionalDistributionChart } from './components/Conversions';
import FunnelChart from './components/FunnelChart';
import Orders from './components/Orders';

const DashboardPage = () => {
  return (
    <>
      <PageTitle title="Ringkasan Eksekutif" />
      <Row className="g-3">
        {/* BARIS 1: 4 Kartu KPI Utama Menyebar Penuh di Atas (4 x col-xl-3 = 12 kolom, Zero Gap) */}
        <KpiCards />

        {/* BARIS 2: Chart 1 (WHAT: Revenue & GMV 7 kolom) + Chart 4 (WHO: Loyalitas Pelanggan 5 kolom) */}
        <RevenueChart />
        <CustomerLoyaltyChart />

        {/* BARIS 3: Chart 2 (WHEN: Jam Puncak 6 kolom) + Chart 5 (HOW/WHY: Corong Konversi 6 kolom) */}
        <ActivityChart />
        <FunnelChart />

        {/* BARIS 4: Chart 3 (WHERE: Demografi Regional & Kanal Penjualan 12 kolom) */}
        <RegionalDistributionChart />

        {/* BARIS 5: Tabel Pesanan Masuk Terkini */}
        <Orders />
      </Row>
    </>
  );
};

export default DashboardPage;