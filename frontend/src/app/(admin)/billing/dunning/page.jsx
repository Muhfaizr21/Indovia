import PageTItle from '@/components/PageTItle';
import BillingKpiCards from '../components/BillingKpiCards';
import DunningEngineTab from '../components/DunningEngineTab';

const BillingDunningPage = () => {
  return (
    <>
      <PageTItle title="Dunning Management & Recurring Billing" />

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1 text-body">2.2 Dunning Engine & Recurring Billing</h4>
          <p className="text-muted fs-12 mb-0">
            Sistem Penagihan Otomatis Indovia: Logika Retry E-Wallet & Kartu (Hari H s/d H+7), Eskalasi Past Due, dan Penguncian Storefront
          </p>
        </div>
      </div>

      <BillingKpiCards />

      <DunningEngineTab />
    </>
  );
};

export default BillingDunningPage;
