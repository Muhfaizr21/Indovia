import PageTItle from '@/components/PageTItle';
import BillingKpiCards from '../components/BillingKpiCards';
import PricingPlansTab from '../components/PricingPlansTab';

const BillingPlansPage = () => {
  return (
    <>
      <PageTItle title="Manajemen Tier Paket & Kuota Berlangganan" />

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1 text-body">2.1 Manajemen Tier Paket & Kuota Berlangganan</h4>
          <p className="text-muted fs-12 mb-0">
            Konfigurasi Granular Paket SaaS Indovia: Kuota Produk, Staf Toko, Penyimpanan CDN, Custom Domain, dan Siklus Penagihan Multi-Diskon
          </p>
        </div>
      </div>

      <BillingKpiCards />

      <PricingPlansTab />
    </>
  );
};

export default BillingPlansPage;
