import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button } from 'react-bootstrap';
import BillingKpiCards from '../components/BillingKpiCards';
import CashflowOverviewTab from '../components/CashflowOverviewTab';

const BillingEnginePage = () => {
  return (
    <>
      <PageTItle title="Dashboard Billing & Arus Kas SaaS" />

      {/* HEADER ACTION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1 text-body">Dashboard Billing & Arus Kas Platform</h4>
          <p className="text-muted fs-12 mb-0">
            Pusat Rekonsiliasi Finansial & Monetisasi SaaS Indovia: Analisis Arus Kas Operasional, Manajemen Likuiditas, dan Rekonsiliasi Bank
          </p>
        </div>
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center"
            onClick={() => window.location.reload()}
          >
            <IconifyIcon icon="solar:refresh-bold" className="me-1" />
            Muat Ulang Data
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="d-flex align-items-center fw-semibold text-white"
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            onClick={() => alert('Mengunduh Laporan Rekonsiliasi Finansial & SaaS Cashflow Berstandar Akuntansi (PDF)...')}
          >
            <IconifyIcon icon="solar:download-square-bold" className="me-1" />
            Unduh Laporan Finansial
          </Button>
        </div>
      </div>

      {/* FINANCIAL KPI CARDS */}
      <BillingKpiCards />

      {/* COMPREHENSIVE CASHFLOW & ACCOUNTING DASHBOARD */}
      <CashflowOverviewTab />
    </>
  );
};

export default BillingEnginePage;
