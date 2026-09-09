import { useState } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Badge, Button, Table, ButtonGroup } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useLayoutContext } from '@/context/useLayoutContext';
import { formatRupiah, initialPricingPlans } from '../data';
import PlanModal from './PlanModal';

const PricingPlansTab = () => {
  const { theme } = useLayoutContext();
  const isDark = theme === 'dark';

  const [plans, setPlans] = useState(initialPricingPlans);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly', 'six_month', 'yearly'
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingPlan(null);
    setShowModal(true);
  };

  const handleSavePlan = (updatedPlan) => {
    if (editingPlan) {
      setPlans(plans.map((p) => (p.id === updatedPlan.id ? updatedPlan : p)));
    } else {
      setPlans([...plans, updatedPlan]);
    }
  };

  const handleToggleActive = (planId) => {
    setPlans(
      plans.map((p) => {
        if (p.id === planId) {
          return { ...p, isActive: !p.isActive };
        }
        return p;
      })
    );
  };

  const getPlanPrice = (plan) => {
    if (billingCycle === 'yearly') return { amount: plan.priceYearly, period: '/ tahun' };
    if (billingCycle === 'six_month') return { amount: plan.price6Month, period: '/ 6 bulan' };
    return { amount: plan.priceMonthly, period: '/ bulan' };
  };

  return (
    <>
      {/* TOOLBAR: CYCLE SWITCHER & ADD BUTTON */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4 p-3 bg-body rounded-2 shadow-sm border">
        <div>
          <h5 className="fw-bold text-body mb-0">Tier Paket & Kuota Berlangganan</h5>
          <p className="text-muted fs-12 mb-0">
            Kelola batasan fitur, kuota produk, penyimpanan, dan skema harga multi-siklus untuk seluruh tenant.
          </p>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          {/* Cycle selector */}
          <div className="bg-light p-1 rounded-2 border d-inline-flex">
            <ButtonGroup size="sm">
              <Button
                variant={billingCycle === 'monthly' ? 'primary' : (isDark ? 'dark' : 'light')}
                className="fs-12 fw-medium py-1 px-2.5"
                style={billingCycle === 'monthly' ? { backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' } : {}}
                onClick={() => setBillingCycle('monthly')}
              >
                Bulanan
              </Button>
              <Button
                variant={billingCycle === 'six_month' ? 'primary' : (isDark ? 'dark' : 'light')}
                className="fs-12 fw-medium py-1 px-2.5"
                style={billingCycle === 'six_month' ? { backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' } : {}}
                onClick={() => setBillingCycle('six_month')}
              >
                6 Bulan <span className="badge bg-success ms-1">Diskon 10%</span>
              </Button>
              <Button
                variant={billingCycle === 'yearly' ? 'primary' : (isDark ? 'dark' : 'light')}
                className="fs-12 fw-medium py-1 px-2.5"
                style={billingCycle === 'yearly' ? { backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' } : {}}
                onClick={() => setBillingCycle('yearly')}
              >
                Tahunan <span className="badge bg-danger ms-1">Diskon 20%</span>
              </Button>
            </ButtonGroup>
          </div>

          <Button
            variant="primary"
            size="sm"
            className="fw-semibold text-white d-flex align-items-center"
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            onClick={handleCreate}
          >
            <IconifyIcon icon="solar:add-circle-bold" className="me-1" />
            + Buat Tier Paket Baru
          </Button>
        </div>
      </div>

      {/* PRICING PLAN CARDS GRID */}
      <Row className="g-3 mb-4">
        {plans.map((plan) => {
          const priceInfo = getPlanPrice(plan);

          return (
            <Col key={plan.id} sm={6} lg={3}>
              <Card
                className={`h-100 border shadow-sm position-relative overflow-hidden ${
                  plan.isPopular ? 'border-primary' : ''
                } ${!plan.isActive ? 'opacity-75' : ''}`}
                style={{
                  borderTop: plan.isPopular
                    ? '4px solid #ff6c2f'
                    : plan.id === 'enterprise'
                    ? '4px solid #3b82f6'
                    : undefined,
                }}
              >
                {plan.isPopular && (
                  <div
                    className="position-absolute top-0 end-0 px-2 py-0.5 text-white fs-10 fw-bold"
                    style={{
                      backgroundColor: '#ff6c2f',
                      borderBottomLeftRadius: '6px',
                    }}
                  >
                    ★ PALING LARIS
                  </div>
                )}

                <CardBody className="p-3 d-flex flex-column">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className="fw-bold text-body mb-0">{plan.name}</h5>
                    <Badge bg={plan.isActive ? 'success-subtle' : 'secondary-subtle'} className={plan.isActive ? 'text-success' : 'text-muted'}>
                      {plan.isActive ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                  </div>

                  <p className="text-muted fs-11 mb-3" style={{ minHeight: '34px' }}>
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-3 p-2.5 rounded bg-light bg-opacity-50 text-center border">
                    <div className="fs-18 fw-bolder text-body">
                      {formatRupiah(priceInfo.amount)}
                    </div>
                    <small className="text-muted fs-11">{priceInfo.period}</small>
                  </div>

                  {/* Subscriber Count */}
                  <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom fs-11">
                    <span className="text-muted">Tenant Aktif:</span>
                    <strong className="text-body">{plan.subscriberCount} Toko</strong>
                  </div>

                  {/* Quotas & Features Checklist */}
                  <div className="mb-3 flex-grow-1">
                    <ul className="list-unstyled fs-12 mb-0 d-flex flex-column gap-2">
                      <li className="d-flex align-items-center">
                        <IconifyIcon icon="solar:check-circle-bold" className="text-success me-2 fs-15 flex-shrink-0" />
                        <span>Maks. <strong>{plan.quotas.maxProducts}</strong> Produk</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <IconifyIcon icon="solar:check-circle-bold" className="text-success me-2 fs-15 flex-shrink-0" />
                        <span><strong>{plan.quotas.maxStaff}</strong> Akun Staf Toko</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <IconifyIcon icon="solar:check-circle-bold" className="text-success me-2 fs-15 flex-shrink-0" />
                        <span><strong>{plan.quotas.storageGb} GB</strong> Storage Media & CDN</span>
                      </li>
                      <li className="d-flex align-items-center">
                        {plan.quotas.customDomain ? (
                          <>
                            <IconifyIcon icon="solar:check-circle-bold" className="text-success me-2 fs-15 flex-shrink-0" />
                            <span>Domain Sendiri (.id/.com) + SSL</span>
                          </>
                        ) : (
                          <>
                            <IconifyIcon icon="solar:close-circle-bold" className="text-muted opacity-50 me-2 fs-15 flex-shrink-0" />
                            <span className="text-muted">Hanya Subdomain Indovia</span>
                          </>
                        )}
                      </li>
                      <li className="d-flex align-items-center">
                        {plan.quotas.customTheme ? (
                          <>
                            <IconifyIcon icon="solar:check-circle-bold" className="text-success me-2 fs-15 flex-shrink-0" />
                            <span>Editor Kode Tema Kustom</span>
                          </>
                        ) : (
                          <>
                            <IconifyIcon icon="solar:close-circle-bold" className="text-muted opacity-50 me-2 fs-15 flex-shrink-0" />
                            <span className="text-muted">Tema Standar Platform</span>
                          </>
                        )}
                      </li>
                      <li className="d-flex align-items-center">
                        {plan.quotas.apiWebhook ? (
                          <>
                            <IconifyIcon icon="solar:check-circle-bold" className="text-success me-2 fs-15 flex-shrink-0" />
                            <span>API Webhook & Developer</span>
                          </>
                        ) : (
                          <>
                            <IconifyIcon icon="solar:close-circle-bold" className="text-muted opacity-50 me-2 fs-15 flex-shrink-0" />
                            <span className="text-muted">Tanpa Integrasi API</span>
                          </>
                        )}
                      </li>
                      <li className="d-flex align-items-center pt-1 border-top">
                        <IconifyIcon icon="solar:tag-bold" className="text-primary me-2 fs-15 flex-shrink-0" />
                        <span className="fs-11">
                          Take-Rate:{' '}
                          <strong className={plan.takeRate.percent === 0 ? 'text-success' : 'text-body'}>
                            {plan.takeRate.percent}% GMV
                          </strong>
                          {plan.takeRate.fixedFee > 0 && ` + ${formatRupiah(plan.takeRate.fixedFee)}`}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="d-flex gap-2 mt-auto pt-2 border-top">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="w-100 fs-11 d-flex align-items-center justify-content-center"
                      onClick={() => handleEdit(plan)}
                    >
                      <IconifyIcon icon="solar:pen-bold" className="me-1" />
                      Konfigurasi
                    </Button>
                    <Button
                      variant={plan.isActive ? 'outline-warning' : 'outline-success'}
                      size="sm"
                      className="fs-11 px-2"
                      title={plan.isActive ? 'Nonaktifkan Paket' : 'Aktifkan Paket'}
                      onClick={() => handleToggleActive(plan.id)}
                    >
                      <IconifyIcon icon={plan.isActive ? 'solar:power-bold' : 'solar:check-circle-bold'} />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* COMPREHENSIVE QUOTA COMPARISON TABLE */}
      <Card className="border-0 shadow-sm overflow-hidden mb-4">
        <CardHeader className="p-3 border-bottom bg-body d-flex justify-content-between align-items-center">
          <div>
            <h6 className="fw-bold text-body mb-0">Tabel Komparasi Kuota & Fitur Granular</h6>
            <span className="text-muted fs-11">Perbandingan limit operasional antar tier langganan tenant</span>
          </div>
          <span className="badge bg-light text-muted border font-monospace">
            {plans.length} Tier Terdaftar
          </span>
        </CardHeader>

        <div className="table-responsive">
          <Table hover className="align-middle mb-0 fs-12">
            <thead className="bg-light bg-opacity-50">
              <tr className="text-muted text-uppercase fs-11 border-bottom">
                <th className="ps-3" style={{ minWidth: 200 }}>Parameter Fitur & Kuota</th>
                {plans.map((p) => (
                  <th key={p.id} className="text-center" style={{ minWidth: 140 }}>
                    <div className="fw-bold text-body">{p.name}</div>
                    <small className="text-muted font-monospace">{formatRupiah(p.priceMonthly)}/bln</small>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="ps-3 fw-semibold text-body">Maksimal Produk Terdaftar</td>
                {plans.map((p) => (
                  <td key={p.id} className="text-center">
                    <span className="badge bg-light text-body border">{p.quotas.maxProducts} SKU</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="ps-3 fw-semibold text-body">Akun Staf Admin Toko</td>
                {plans.map((p) => (
                  <td key={p.id} className="text-center">
                    <span className="badge bg-light text-body border">{p.quotas.maxStaff} Pengguna</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="ps-3 fw-semibold text-body">Storage Aset CDN</td>
                {plans.map((p) => (
                  <td key={p.id} className="text-center text-body fw-medium">{p.quotas.storageGb} GB SSD</td>
                ))}
              </tr>
              <tr>
                <td className="ps-3 fw-semibold text-body">Domain Kustom Pribadi & SSL</td>
                {plans.map((p) => (
                  <td key={p.id} className="text-center">
                    {p.quotas.customDomain ? (
                      <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-18" />
                    ) : (
                      <IconifyIcon icon="solar:close-circle-bold" className="text-muted opacity-50 fs-18" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="ps-3 fw-semibold text-body">Kustomisasi Editor Tema Storefront</td>
                {plans.map((p) => (
                  <td key={p.id} className="text-center">
                    {p.quotas.customTheme ? (
                      <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-18" />
                    ) : (
                      <IconifyIcon icon="solar:close-circle-bold" className="text-muted opacity-50 fs-18" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="ps-3 fw-semibold text-body">API Webhook & Developer Access</td>
                {plans.map((p) => (
                  <td key={p.id} className="text-center">
                    {p.quotas.apiWebhook ? (
                      <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-18" />
                    ) : (
                      <IconifyIcon icon="solar:close-circle-bold" className="text-muted opacity-50 fs-18" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="ps-3 fw-semibold text-body">Skema Platform Take-Rate</td>
                {plans.map((p) => (
                  <td key={p.id} className="text-center">
                    <strong className={p.takeRate.percent === 0 ? 'text-success' : 'text-body'}>
                      {p.takeRate.percent}% GMV
                    </strong>
                    {p.takeRate.fixedFee > 0 && <span className="text-muted d-block fs-10">+ {formatRupiah(p.takeRate.fixedFee)}</span>}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="ps-3 fw-semibold text-body">Tingkat Layanan Dukungan (SLA)</td>
                {plans.map((p) => (
                  <td key={p.id} className="text-center text-muted fs-11">
                    {p.quotas.supportSla}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
      </Card>

      {/* Plan Edit / Create Modal */}
      <PlanModal
        show={showModal}
        onHide={() => setShowModal(false)}
        plan={editingPlan}
        onSave={handleSavePlan}
      />
    </>
  );
};

export default PricingPlansTab;
