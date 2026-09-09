import PageTItle from '@/components/PageTItle';
import BillingKpiCards from '../components/BillingKpiCards';
import TakeRateTab from '../components/TakeRateTab';

const BillingTakeRatePage = () => {
  return (
    <>
      <PageTItle title="Platform Take-Rate & Komisi GMV" />

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1 text-body">2.3 Platform Take-Rate & Komisi GMV</h4>
          <p className="text-muted fs-12 mb-0">
            Arus Kas Bagi Hasil Transaksi Indovia: Skema Komisi per Checkout Toko (% GMV + Fixed Fee), Pembagian Omset, dan Live Transaction Feed
          </p>
        </div>
      </div>

      <BillingKpiCards />

      <TakeRateTab />
    </>
  );
};

export default BillingTakeRatePage;
