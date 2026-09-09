import { useState } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Badge, Button, Table, Form, ProgressBar } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { formatRupiah, initialTakeRateTransactions, billingKpiSummary } from '../data';
import TakeRateModal from './TakeRateModal';

const TakeRateTab = () => {
  const [transactions, setTransactions] = useState(initialTakeRateTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [rules, setRules] = useState({
    starterPercent: 1.5,
    starterFixed: 1000,
    proPercent: 0.8,
    proFixed: 500,
    enterprisePercent: 0.0,
    enterpriseFixed: 0,
    absorbGatewayFee: false,
  });

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.merchantCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || tx.settlementStatus === selectedStatus;
    const matchesPlan = selectedPlan === 'all' || tx.plan === selectedPlan;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const totalFilteredGmv = filteredTransactions.reduce((acc, curr) => acc + curr.gmvAmount, 0);
  const totalFilteredCommission = filteredTransactions.reduce((acc, curr) => acc + curr.platformCommission, 0);

  return (
    <>
      {/* TOOLBAR */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4 p-3 bg-body rounded-2 shadow-sm border">
        <div>
          <h5 className="fw-bold text-body mb-0">Platform Take-Rate & Komisi Transaksi Toko</h5>
          <p className="text-muted fs-12 mb-0">
            Penetapan skema bagi hasil per checkout pesanan pada toko merchant dan dashboard pemantauan omset vs laba bersih Indovia.
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <Button
            variant="outline-secondary"
            size="sm"
            className="fs-12 d-flex align-items-center"
            onClick={() => alert('Data settlement bagi hasil diekspor ke file CSV/Excel.')}
          >
            <IconifyIcon icon="solar:export-bold" className="me-1" />
            Ekspor Laporan Bagi Hasil
          </Button>

          <Button
            variant="primary"
            size="sm"
            className="fw-semibold text-white d-flex align-items-center"
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            onClick={() => setShowModal(true)}
          >
            <IconifyIcon icon="solar:pen-bold" className="me-1" />
            Konfigurasi Skema Komisi
          </Button>
        </div>
      </div>

      {/* THREE ACTIVE TIER RULES CARDS & GMV SPLIT CARD */}
      <Row className="g-3 mb-4">
        {/* Starter Rule */}
        <Col md={4} xl={3}>
          <Card className="border shadow-sm h-100">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="badge bg-secondary-subtle text-secondary border fs-10">TIER STARTER</span>
                <span className="text-muted fs-11">UMKM Pemula</span>
              </div>
              <h4 className="fw-bold text-body fs-18 mb-1">
                {rules.starterPercent}% <span className="fs-12 text-muted fw-normal">GMV</span>
              </h4>
              <p className="text-muted fs-11 mb-2">
                + {formatRupiah(rules.starterFixed)} tetap per pesanan berhasil
              </p>
              <div className="p-2 rounded bg-light bg-opacity-50 border fs-11 text-muted">
                Dikenakan pada toko UMKM gratis domain untuk subsidi biaya gateway platform.
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Pro Rule */}
        <Col md={4} xl={3}>
          <Card className="border shadow-sm h-100" style={{ borderLeft: '3px solid #ff6c2f' }}>
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="badge bg-primary-subtle text-primary border fs-10">TIER PRO</span>
                <span className="text-muted fs-11">Brand Berkembang</span>
              </div>
              <h4 className="fw-bold text-primary fs-18 mb-1">
                {rules.proPercent}% <span className="fs-12 text-muted fw-normal">GMV</span>
              </h4>
              <p className="text-muted fs-11 mb-2">
                + {formatRupiah(rules.proFixed)} tetap per pesanan berhasil
              </p>
              <div className="p-2 rounded bg-light bg-opacity-50 border fs-11 text-muted">
                Biaya take-rate kompetitif dengan fasilitas domain sendiri & API Webhook.
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Enterprise Rule */}
        <Col md={4} xl={3}>
          <Card className="border shadow-sm h-100" style={{ borderLeft: '3px solid #16a34a' }}>
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="badge bg-success-subtle text-success border fs-10">TIER ENTERPRISE</span>
                <span className="text-success fs-11 fw-bold">★ 0% TAKE-RATE</span>
              </div>
              <h4 className="fw-bold text-success fs-18 mb-1">
                {rules.enterprisePercent}% <span className="fs-12 text-muted fw-normal">Bebas Potongan</span>
              </h4>
              <p className="text-muted fs-11 mb-2">
                + Rp 0 biaya transaksi (100% omset milik toko)
              </p>
              <div className="p-2 rounded bg-light bg-opacity-50 border fs-11 text-muted">
                Merchant hanya membayar biaya sewa software tetap tahunan tanpa potongan GMV.
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Net Split Summary */}
        <Col md={12} xl={3}>
          <Card className="border shadow-sm h-100 bg-body">
            <CardBody className="p-3 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <span className="text-muted fs-11 fw-medium">Laba Komisi Indovia</span>
                  <strong className="text-primary fs-12">
                    {((billingKpiSummary.platformTakeRateNet / billingKpiSummary.totalPlatformGmv) * 100).toFixed(2)}%
                  </strong>
                </div>
                <h5 className="fw-bold text-body fs-16 mb-2">
                  {formatRupiah(billingKpiSummary.platformTakeRateNet)}
                </h5>
                <ProgressBar className="mb-2" style={{ height: 6 }}>
                  <ProgressBar now={1.1} variant="primary" key={1} />
                  <ProgressBar now={98.9} variant="success" key={2} />
                </ProgressBar>
              </div>

              <div className="d-flex align-items-center justify-content-between pt-2 border-top fs-11 text-muted">
                <span>Omset Merchant:</span>
                <strong className="text-success">{formatRupiah(billingKpiSummary.totalPlatformGmv)}</strong>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* MASTER DATA TABLE: LIVE TRANSACTION COMMISSION FEED */}
      <Card className="border-0 shadow-sm overflow-hidden mb-4">
        <CardHeader className="p-3 border-bottom bg-body">
          <Row className="g-2 align-items-center">
            <Col lg={4}>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-sm ps-4"
                  placeholder="Cari order ID, nama toko, atau kode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconifyIcon
                  icon="solar:magnifer-linear"
                  className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
                />
              </div>
            </Col>

            <Col xs={6} md={3} lg={2}>
              <Form.Select
                size="sm"
                className="fs-12"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
              >
                <option value="all">Semua Tier Paket</option>
                <option value="Starter">Paket Starter</option>
                <option value="Pro">Paket Pro</option>
                <option value="Enterprise">Paket Enterprise</option>
              </Form.Select>
            </Col>

            <Col xs={6} md={3} lg={2}>
              <Form.Select
                size="sm"
                className="fs-12"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">Semua Status Settlement</option>
                <option value="SETTLED">Disetorkan (Settled)</option>
                <option value="PENDING_PAYOUT">Menunggu Payout</option>
              </Form.Select>
            </Col>

            <Col xs={12} md={6} lg={4} className="text-lg-end mt-2 mt-lg-0">
              <span className="text-muted fs-11 me-2">
                Total Komisi Terhitung: <strong className="text-primary">{formatRupiah(totalFilteredCommission)}</strong>
              </span>
              <span className="badge bg-light text-muted border font-monospace fs-10">
                {filteredTransactions.length} Transaksi
              </span>
            </Col>
          </Row>
        </CardHeader>

        <div className="table-responsive">
          <Table hover className="align-middle mb-0 fs-12">
            <thead className="bg-light bg-opacity-50 border-bottom">
              <tr className="text-muted text-uppercase fs-11">
                <th className="ps-3" style={{ minWidth: 140 }}>Order ID & Waktu</th>
                <th style={{ minWidth: 200 }}>Toko & Tier Langganan</th>
                <th style={{ minWidth: 140 }}>Gross Nilai Order (GMV)</th>
                <th style={{ minWidth: 150 }}>Skema Komisi Toko</th>
                <th style={{ minWidth: 140 }}>Komisi Indovia (Net)</th>
                <th style={{ minWidth: 140 }}>Hak Bersih Merchant</th>
                <th className="text-end pe-3" style={{ minWidth: 140 }}>Status Settlement</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    <IconifyIcon icon="solar:bag-check-bold-duotone" className="fs-32 text-muted mb-2 d-block mx-auto" />
                    <strong>Tidak ada data transaksi yang cocok dengan filter pencarian.</strong>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.orderId}>
                    {/* Order ID & Time */}
                    <td className="ps-3">
                      <strong className="text-body font-monospace fs-12">{tx.orderId}</strong>
                      <div className="text-muted fs-11">
                        {new Date(tx.orderDate).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        &bull;{' '}
                        {new Date(tx.orderDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </div>
                    </td>

                    {/* Toko & Tier */}
                    <td>
                      <div className="fw-bold text-body fs-12">{tx.merchantName}</div>
                      <div className="d-flex align-items-center gap-1 mt-0.5">
                        <span className="badge bg-light text-secondary border font-monospace fs-10">
                          {tx.merchantCode}
                        </span>
                        <span
                          className="badge px-1.5 py-0.2 fs-10 text-uppercase"
                          style={{
                            backgroundColor:
                              tx.plan === 'Enterprise'
                                ? '#ff6c2f'
                                : tx.plan === 'Pro'
                                ? '#3b82f6'
                                : '#64748b',
                            color: '#fff',
                          }}
                        >
                          {tx.plan}
                        </span>
                      </div>
                    </td>

                    {/* GMV Order */}
                    <td>
                      <strong className="text-body fs-12">{formatRupiah(tx.gmvAmount)}</strong>
                    </td>

                    {/* Skema Komisi */}
                    <td>
                      <span className="badge bg-light text-body border font-monospace fs-11">
                        {tx.takeRateScheme}
                      </span>
                    </td>

                    {/* Komisi Indovia */}
                    <td>
                      <strong
                        className={`fs-12 ${
                          tx.platformCommission > 0 ? 'text-primary' : 'text-muted'
                        }`}
                      >
                        {formatRupiah(tx.platformCommission)}
                      </strong>
                    </td>

                    {/* Hak Bersih Merchant */}
                    <td>
                      <strong className="text-success fs-12">
                        {formatRupiah(tx.merchantNetPayout)}
                      </strong>
                    </td>

                    {/* Settlement Status */}
                    <td className="text-end pe-3">
                      <span
                        className={`badge ${
                          tx.settlementStatus === 'SETTLED'
                            ? 'bg-success-subtle text-success border border-success-subtle'
                            : 'bg-warning-subtle text-warning border border-warning-subtle'
                        } fs-11 py-1 px-2`}
                      >
                        <IconifyIcon
                          icon={
                            tx.settlementStatus === 'SETTLED'
                              ? 'solar:check-circle-bold'
                              : 'solar:clock-circle-bold'
                          }
                          className="me-1 fs-11"
                        />
                        {tx.settlementStatus === 'SETTLED' ? 'Telah Disetor' : 'Pending Payout'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* Take Rate Modal */}
      <TakeRateModal
        show={showModal}
        onHide={() => setShowModal(false)}
        currentRules={rules}
        onSave={(newRules) => {
          setRules(newRules);
          alert('Skema take-rate platform berhasil diperbarui.');
        }}
      />
    </>
  );
};

export default TakeRateTab;
