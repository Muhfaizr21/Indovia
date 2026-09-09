import { useState } from 'react';
import PageTItle from '@/components/PageTItle';
import { Row } from 'react-bootstrap';
import SellerAddData from './components/SellerAddData';
import SellerAddDetails from './components/SellerAddDetails';

const SellerAddPage = () => {
  const [formData, setFormData] = useState({
    name: 'Boutique Nusantara Baru',
    subdomain: 'boutique-nusantara',
    category: 'Fashion & Pakaian',
    city: 'Jakarta Selatan',
    address: 'Jl. Kemang Raya No. 42',
    owner_name: 'Dewi Lestari',
    owner_email: 'dewi@boutique-nusantara.id',
    owner_phone: '0812-8899-7766',
    plan: 'Pro',
    item_count: 35
  });

  return (
    <>
      <PageTItle title="Pendaftaran &amp; Provisioning Toko Baru" />
      <div className="mb-3">
        <h4 className="fw-bold mb-1 text-dark">Provisioning Toko &amp; Tenant Multi-Store</h4>
        <p className="text-muted fs-12 mb-0">
          Daftarkan merchant baru secara instan dengan isolasi tenant database, alokasi subdomain, dan paket uji coba 14 hari.
        </p>
      </div>
      <Row className="g-3">
        <SellerAddDetails formData={formData} />
        <SellerAddData formData={formData} setFormData={setFormData} />
      </Row>
    </>
  );
};

export default SellerAddPage;