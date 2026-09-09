import { useState } from 'react';
import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BillingKpiCards from '../components/BillingKpiCards';
import CashflowOverviewTab from '../components/CashflowOverviewTab';
import AccountingExportModal from '../components/AccountingExportModal';

const CashflowPage = () => {
  const navigate = useNavigate();
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <>
      <PageTItle title="Arus Kas Operasional &amp; Jurnal SAK" subName="Monetisasi &amp; Billing SaaS" />

      {/* HEADER ACTION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1 text-body d-flex align-items-center">
            <IconifyIcon icon="solar:wallet-money-bold-duotone" className="me-2 text-primary fs-24" />
            Arus Kas Operasional, Likuiditas &amp; Jurnal SAK
          </h4>
          <p className="text-muted fs-12 mb-0">
            Pusat Rekonsiliasi Finansial &amp; Jurnal Akuntansi PSAK 72: Arus Kas Operasional, Likuiditas Runway, Rekonsiliasi Bank BCA/Mandiri, dan Aging Piutang
          </p>
        </div>
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button
            variant="outline-primary"
            size="sm"
            className="d-flex align-items-center fw-semibold"
            onClick={() => navigate('/billing')}
          >
            <IconifyIcon icon="solar:chart-2-bold-duotone" className="me-1" />
            Buka Executive BI
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
          <Button
            variant="primary"
            size="sm"
            className="d-flex align-items-center fw-semibold text-white"
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            onClick={() => setShowExportModal(true)}
          >
            <IconifyIcon icon="solar:download-square-bold" className="me-1" />
            Ekspor SAK (PDF/Excel)
          </Button>
        </div>
      </div>

      {/* QUICK KPI METRICS */}
      <BillingKpiCards />

      {/* COMPREHENSIVE CASHFLOW & ACCOUNTING OVERVIEW */}
      <CashflowOverviewTab />

      {/* EXPORT MODAL */}
      <AccountingExportModal show={showExportModal} onHide={() => setShowExportModal(false)} />
    </>
  );
};

export default CashflowPage;
