import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BillingKpiCards from '../components/BillingKpiCards';
import ExecutiveBiAnalyticsTab from '../components/ExecutiveBiAnalyticsTab';

const BillingEnginePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageTItle title="Executive BI &amp; Platform Analytics" subName="Monetisasi &amp; Billing SaaS" />

      {/* HEADER ACTION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1 text-body d-flex align-items-center">
            <IconifyIcon icon="solar:chart-2-bold-duotone" className="me-2 text-primary fs-24" />
            Executive BI &amp; Platform-Wide Analytics
          </h4>
          <p className="text-muted fs-12 mb-0">
            Dasar Pengambilan Keputusan Strategis Bisnis bagi Founder, C-Level, dan Investor Indovia: Metrik Finansial SaaS, Tren Perdagangan Makro, &amp; Kepatuhan Fiskal SAK
          </p>
        </div>
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button
            variant="outline-primary"
            size="sm"
            className="d-flex align-items-center fw-semibold"
            onClick={() => navigate('/billing/cashflow')}
          >
            <IconifyIcon icon="solar:wallet-money-bold-duotone" className="me-1" />
            Buka Arus Kas &amp; Jurnal SAK
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center"
            onClick={() => window.location.reload()}
          >
            <IconifyIcon icon="solar:refresh-bold" className="me-1" />
            Muat Ulang
          </Button>
        </div>
      </div>

      {/* QUICK KPI CARDS */}
      <BillingKpiCards />

      {/* MODUL 7: EXECUTIVE BI & MACRO ANALYTICS (DEDICATED FULL VIEW) */}
      <ExecutiveBiAnalyticsTab />
    </>
  );
};

export default BillingEnginePage;
