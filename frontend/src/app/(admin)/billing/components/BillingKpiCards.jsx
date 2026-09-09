import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { formatRupiah, billingKpiSummary } from '../data';

const BillingKpiCards = ({ onSelectTab }) => {
  const navigate = useNavigate();

  const handleCardClick = (route, tabKey) => {
    if (onSelectTab) {
      onSelectTab(tabKey);
    }
    navigate(route);
  };

  return (
    <Row className="g-3 mb-4">
      {/* KPI 1: Net Revenue -> /billing */}
      <Col sm={6} xl={3}>
        <Card
          className="border-0 shadow-sm h-100 cursor-pointer"
          style={{ borderLeft: '4px solid #ff6c2f' }}
          onClick={() => handleCardClick('/billing/cashflow', 'overview')}
          title="Klik untuk membuka Dashboard Arus Kas & Likuiditas"
        >
          <CardBody className="p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-1 fs-12 fw-medium">Total Laba Bersih Platform</p>
                <h4 className="mt-0 mb-1 fw-bold text-body fs-18">
                  {formatRupiah(billingKpiSummary.totalNetRevenue)}
                </h4>
                <small className="text-success fw-semibold fs-11 d-flex align-items-center">
                  <IconifyIcon icon="solar:arrow-up-bold" className="me-1 fs-12" />
                  +18.4% vs bulan lalu
                </small>
              </div>
              <div
                className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                style={{ backgroundColor: 'rgba(255, 108, 47, 0.1)', color: '#ff6c2f' }}
              >
                <IconifyIcon icon="solar:wallet-money-bold-duotone" className="fs-24" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* KPI 2: MRR & ARR -> /billing/plans */}
      <Col sm={6} xl={3}>
        <Card
          className="border-0 shadow-sm h-100 cursor-pointer"
          style={{ borderLeft: '4px solid #3b82f6' }}
          onClick={() => handleCardClick('/billing/plans', 'plans')}
          title="Klik untuk membuka Halaman Tier Paket & Kuota"
        >
          <CardBody className="p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-1 fs-12 fw-medium">Monthly Recurring Revenue (MRR)</p>
                <h4 className="mt-0 mb-1 fw-bold text-primary fs-18">
                  {formatRupiah(billingKpiSummary.mrr)}
                </h4>
                <small className="text-muted fs-11">
                  ARR Run-Rate: <strong>{formatRupiah(billingKpiSummary.arrRunRate)}</strong>
                </small>
              </div>
              <div
                className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}
              >
                <IconifyIcon icon="solar:chart-2-bold-duotone" className="fs-24" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* KPI 3: GMV & Take Rate -> /billing/take-rate */}
      <Col sm={6} xl={3}>
        <Card
          className="border-0 shadow-sm h-100 cursor-pointer"
          style={{ borderLeft: '4px solid #16a34a' }}
          onClick={() => handleCardClick('/billing/take-rate', 'takerate')}
          title="Klik untuk membuka Halaman Platform Take-Rate"
        >
          <CardBody className="p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-1 fs-12 fw-medium">Total GMV Toko Merchant</p>
                <h4 className="mt-0 mb-1 fw-bold text-success fs-18">
                  {formatRupiah(billingKpiSummary.totalPlatformGmv)}
                </h4>
                <small className="text-muted fs-11">
                  Komisi Indovia: <strong>{formatRupiah(billingKpiSummary.platformTakeRateNet)}</strong>
                </small>
              </div>
              <div
                className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                style={{ backgroundColor: 'rgba(22, 163, 74, 0.1)', color: '#16a34a' }}
              >
                <IconifyIcon icon="solar:bag-check-bold-duotone" className="fs-24" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* KPI 4: Dunning & Past Due -> /billing/dunning */}
      <Col sm={6} xl={3}>
        <Card
          className="border-0 shadow-sm h-100 cursor-pointer"
          style={{ borderLeft: '4px solid #ef4444' }}
          onClick={() => handleCardClick('/billing/dunning', 'dunning')}
          title="Klik untuk membuka Halaman Dunning Management"
        >
          <CardBody className="p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-1 fs-12 fw-medium">Tagihan Dunning Berisiko</p>
                <h4 className="mt-0 mb-1 fw-bold text-danger fs-18">
                  {formatRupiah(billingKpiSummary.dunningAtRisk)}
                </h4>
                <small className="text-muted fs-11">
                  <strong>{billingKpiSummary.dunningAtRiskCount} Toko</strong> dalam proses retry
                </small>
              </div>
              <div
                className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
              >
                <IconifyIcon icon="solar:danger-circle-bold-duotone" className="fs-24" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default BillingKpiCards;
