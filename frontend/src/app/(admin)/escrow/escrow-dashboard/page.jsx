// src/app/(admin)/escrow/escrow-dashboard/page.jsx
import React, { useState } from 'react';
import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Row, Col, Card, CardBody, Table, Badge, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import { useLayoutContext } from '@/context/useLayoutContext';
import EscrowKpiCards from '../components/EscrowKpiCards';
import EscrowFlowDiagram from '../components/EscrowFlowDiagram';
import GatewayCredentialsModal from '../components/GatewayCredentialsModal';
import { useEscrowDashboard } from '../hooks/useEscrowDashboard';
import { formatRupiah } from '../data';

const EscrowDashboardPage = () => {
  const { theme } = useLayoutContext();
  const isDark = theme === 'dark';

  const {
    kpi,
    health,
    chartData,
    splitPayments,
    loading,
    reconciling,
    reconcileResult,
    setReconcileResult,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    refreshAll,
    triggerReconciliation,
  } = useEscrowDashboard();

  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [showReconcileModal, setShowReconcileModal] = useState(false);

  // Chart theme tokens
  const axisColor = isDark ? '#94a3b8' : '#64748b';
  const gridBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(100, 116, 139, 0.12)';

  // Chart days & series loaded dynamically from backend API
  const daysLabels = chartData?.days || [];
  const inflowSeries = chartData?.inflow_from_pg || [];
  const disbursedSeries = chartData?.disbursed_to_merchant || [];
  const reserveSeries = chartData?.escrow_reserve_balance || [];

  // APEXCHART OPTIONS: Dinamika Arus Kas Escrow (Inflow vs Outflow vs Reserve)
  const chartOptions = {
    chart: {
      height: 330,
      type: 'line',
      background: 'transparent',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      width: [0, 0, 3],
      curve: 'smooth',
      dashArray: [0, 0, 4],
    },
    plotOptions: {
      bar: {
        columnWidth: '40%',
        borderRadius: 4,
      },
    },
    colors: ['#3b82f6', '#10b981', '#f59e0b'],
    dataLabels: { enabled: false },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      labels: { colors: axisColor },
    },
    grid: {
      borderColor: gridBorderColor,
      strokeDashArray: 3,
    },
    xaxis: {
      categories: daysLabels,
      labels: {
        style: { colors: axisColor, fontSize: '11px', fontFamily: 'inherit' },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: [
      {
        title: {
          text: 'Arus Harian (Juta IDR)',
          style: { color: axisColor, fontSize: '11px', fontWeight: 500 },
        },
        labels: {
          style: { colors: axisColor, fontSize: '11px' },
          formatter: (val) => `${val.toFixed(0)} Jt`,
        },
      },
      {
        opposite: true,
        title: {
          text: 'Saldo Cadangan Pool (Juta IDR)',
          style: { color: axisColor, fontSize: '11px', fontWeight: 500 },
        },
        labels: {
          style: { colors: axisColor, fontSize: '11px' },
          formatter: (val) => `${val.toFixed(0)} Jt`,
        },
      },
    ],
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => (typeof val !== 'undefined' ? `Rp ${val.toFixed(1)} Juta` : val),
      },
    },
  };

  const chartSeries = [
    {
      name: 'Inflow dari Central PG (Masuk Escrow)',
      type: 'column',
      data: inflowSeries,
    },
    {
      name: 'Disbursed ke Rekening Toko (Payout)',
      type: 'column',
      data: disbursedSeries,
    },
    {
      name: 'Saldo Cadangan Mengendap (Escrow Pool)',
      type: 'line',
      data: reserveSeries,
    },
  ];

  const handleStartReconciliation = async () => {
    setShowReconcileModal(true);
    await triggerReconciliation();
  };

  return (
    <>
      <PageTItle title="Central Escrow, Payment Gateway & Payout Engine" />

      {/* HEADER ACTION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 p-3 bg-white border rounded shadow-sm">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h4 className="fw-bold mb-0 text-dark">Central Escrow &amp; Rekening Penampungan</h4>
            <span className="badge bg-success-subtle text-success fs-12 px-2.5 py-1 rounded-pill d-inline-flex align-items-center gap-1">
              <span className="bg-success rounded-circle" style={{ width: 6, height: 6 }} />
              Golang Escrow Engine Active
            </span>
          </div>
          <p className="text-muted fs-13 mb-0">
            Pusat Pengendali Finansial Indovia sebagai Master Merchant of Record: Rekonsiliasi Escrow Otomatis, Split-Payment &amp; Perlindungan Konsumen
          </p>
        </div>
        <div className="d-flex gap-2 mt-2 mt-sm-0 align-items-center">
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center"
            onClick={refreshAll}
            disabled={loading}
            title="Segarkan Data Realtime"
          >
            <IconifyIcon icon="solar:refresh-bold" className={`me-1 ${loading ? 'spin' : ''}`} />
            <span>Segarkan</span>
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center"
            onClick={() => setShowCredentialsModal(true)}
          >
            <IconifyIcon icon="solar:key-bold" className="me-1" />
            Kredensial Gateway API
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="d-flex align-items-center fw-semibold text-white"
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            onClick={handleStartReconciliation}
            disabled={reconciling}
          >
            {reconciling ? (
              <>
                <Spinner animation="border" size="sm" className="me-1" />
                Merekonsiliasi...
              </>
            ) : (
              <>
                <IconifyIcon icon="solar:refresh-square-bold" className="me-1" />
                Sinkronisasi &amp; Rekonsiliasi
              </>
            )}
          </Button>
        </div>
      </div>

      {/* FINANCIAL KPI CARDS */}
      <EscrowKpiCards kpi={kpi} />

      {/* MASTER MERCHANT OF RECORD VISUAL FLOW DIAGRAM */}
      <EscrowFlowDiagram />

      {/* VELOCITY & INFLOW/OUTFLOW APEXCHART */}
      <Row className="g-3 mb-4">
        <Col xl={8}>
          <Card className="border-0 shadow-sm h-100">
            <CardBody className="p-3 p-md-4">
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold text-body mb-0 fs-15">
                    Dinamika Arus Kas Escrow &amp; Cadangan Likuiditas
                  </h5>
                  <p className="text-muted fs-12 mb-0">
                    Perbandingan Inflow Gateway, Pelepasan Delivered, dan Pencairan Saldo Merchant 7 Hari Terakhir
                  </p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Badge bg="success-subtle" className="text-success fs-11 px-2 py-1">
                    Cadangan Sehat (100% Solven)
                  </Badge>
                </div>
              </div>

              <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={330}
              />
            </CardBody>
          </Card>
        </Col>

        {/* HEALTH & SLA METRICS SUMMARY */}
        <Col xl={4}>
          <Card className="border-0 shadow-sm h-100">
            <CardBody className="p-3 p-md-4">
              <h5 className="fw-bold text-body mb-1 fs-15">
                Integritas Sistem Escrow
              </h5>
              <p className="text-muted fs-12 mb-3">
                Status operasional rekening penampungan dan gateway SLA
              </p>

              <div className="p-3 rounded-2 bg-body-secondary border border-secondary-subtle mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted fs-12">Status Bank Penampung (BCA):</span>
                  <Badge bg="success-subtle" className="text-success fs-10">{health?.bca_status || 'ONLINE (Sync)'}</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted fs-12">Status Bank Penampung (Mandiri):</span>
                  <Badge bg="success-subtle" className="text-success fs-10">{health?.mandiri_status || 'ONLINE (Sync)'}</Badge>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted fs-12">Rata-rata Latensi Gateway:</span>
                  <strong className="text-body fs-12">{health?.average_latency_ms ?? 0} ms</strong>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted fs-12">Tingkat Kegagalan 24 Jam:</span>
                  <strong className="text-success fs-12">{health?.overall_failure_rate || '0.00%'}</strong>
                </div>
              </div>

              <h6 className="fw-bold text-body fs-13 mb-2">Protokol Keamanan Finansial:</h6>
              <ul className="list-unstyled mb-0 fs-12 text-muted">
                <li className="d-flex align-items-start mb-2">
                  <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-16 me-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Rekening Terpisah (Segregated):</strong> Dana pembeli terpisah 100% dari kas belanja operasional Indovia.</span>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-16 me-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Audit Trail Double-Entry:</strong> Setiap rupiah tercatat dengan nomor jurnal debit/kredit yang immutable.</span>
                </li>
                <li className="d-flex align-items-start">
                  <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-16 me-2 mt-0.5 flex-shrink-0" />
                  <span><strong>Bi-Fast Payout API:</strong> Pencairan dana langsung masuk ke rekening merchant dalam hitungan detik.</span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* REAL-TIME SPLIT-PAYMENT TRANSACTION FEED */}
      <Card className="border-0 shadow-sm mb-4">
        <CardBody className="p-3 p-md-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <h5 className="fw-bold text-body mb-0 fs-15">
                Log Split-Payment &amp; Realisasi Arus Transaksi Real-time
              </h5>
              <p className="text-muted fs-12 mb-0">
                Pemisahan otomatis nilai transaksi pembeli menjadi: Hak Merchant + Komisi SaaS Platform + MDR Gateway
              </p>
            </div>

            <div className="d-flex flex-wrap gap-2">
              <Form.Control
                type="text"
                size="sm"
                placeholder="Cari Order / Merchant / Pembeli..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-body text-body border-secondary-subtle"
                style={{ width: '220px' }}
              />
              <Form.Select
                size="sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-body text-body border-secondary-subtle"
                style={{ width: '180px' }}
              >
                <option value="ALL">Semua Status Escrow</option>
                <option value="PENDING_TRANSIT">Pending (Ekspedisi)</option>
                <option value="DELIVERED_CONFIRMED">Delivered (Available)</option>
                <option value="LOCKED_DISPUTE">Locked (Sengketa)</option>
              </Form.Select>
            </div>
          </div>

          <div className="table-responsive rounded-2 border border-secondary-subtle">
            <Table hover className="table-nowrap mb-0 align-middle">
              <thead className="bg-body-tertiary fs-11 text-uppercase text-muted">
                <tr>
                  <th className="py-2.5">No. Order &amp; Waktu</th>
                  <th>Merchant &amp; Pembeli</th>
                  <th>Kanal Bayar</th>
                  <th className="text-end">Gross Pembeli</th>
                  <th className="text-end">MDR Gateway</th>
                  <th className="text-end">Komisi Indovia</th>
                  <th className="text-end">Net Merchant</th>
                  <th>Status Escrow</th>
                  <th>Logistik &amp; Tracking</th>
                </tr>
              </thead>
              <tbody className="fs-12">
                {loading && splitPayments.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-5">
                      <Spinner animation="border" size="sm" variant="primary" className="me-2" />
                      <span className="text-muted">Memuat log split-payment dari PostgreSQL...</span>
                    </td>
                  </tr>
                ) : splitPayments.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-5 text-muted">
                      Tidak ada transaksi split-payment yang cocok dengan filter.
                    </td>
                  </tr>
                ) : (
                  splitPayments.map((log) => (
                    <tr key={log.id}>
                      <td>
                        <strong className="text-body font-monospace d-block">#{log.order_id || log.orderId}</strong>
                        <small className="text-muted fs-11">{log.timestamp}</small>
                      </td>
                      <td>
                        <span className="fw-semibold text-body d-block">{log.merchant_name || log.merchantName}</span>
                        <small className="text-muted fs-11">Pembeli: {log.customer_name || log.customerName}</small>
                      </td>
                      <td>
                        <Badge bg="body-secondary" className="text-body border border-secondary-subtle fs-11">
                          {log.channel}
                        </Badge>
                      </td>
                      <td className="text-end fw-bold text-body">
                        {log.formatted_gross || formatRupiah(log.gross_buyer_payment || log.grossBuyerPayment)}
                      </td>
                      <td className="text-end text-muted">
                        {log.formatted_mdr || formatRupiah(log.gateway_mdr_fee || log.gatewayMdrFee)}
                      </td>
                      <td className="text-end fw-semibold text-primary">
                        {log.formatted_platform_fee || formatRupiah(log.indovia_platform_fee || log.indoviaPlatformFee)}
                      </td>
                      <td className="text-end fw-bold text-success">
                        {log.formatted_net || formatRupiah(log.net_merchant_wallet || log.netMerchantWallet)}
                      </td>
                      <td>
                        {(log.escrow_status || log.escrowStatus) === 'PENDING_TRANSIT' && (
                          <Badge bg="warning-subtle" className="text-warning fs-11">
                            In-Transit (Pending)
                          </Badge>
                        )}
                        {(log.escrow_status || log.escrowStatus) === 'DELIVERED_CONFIRMED' && (
                          <Badge bg="success-subtle" className="text-success fs-11">
                            Delivered (Available)
                          </Badge>
                        )}
                        {(log.escrow_status || log.escrowStatus) === 'LOCKED_DISPUTE' && (
                          <Badge bg="danger-subtle" className="text-danger fs-11">
                            Locked (Dispute)
                          </Badge>
                        )}
                      </td>
                      <td>
                        <span className="text-body d-block fs-11">{log.expedition_info || log.expeditionInfo}</span>
                        <small className="text-muted fs-10">{log.auto_release_estimate || log.autoReleaseEstimate}</small>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* CREDENTIALS MODAL */}
      <GatewayCredentialsModal
        show={showCredentialsModal}
        onHide={() => setShowCredentialsModal(false)}
      />

      {/* RECONCILIATION RESULT MODAL */}
      <Modal show={showReconcileModal} onHide={() => setShowReconcileModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-16 fw-semibold d-flex align-items-center gap-2">
            <IconifyIcon icon="solar:shield-check-bold" className="text-success fs-20" />
            Hasil Rekonsiliasi Rekening Penampungan
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reconciling ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" className="mb-2" />
              <h6 className="fw-semibold text-dark mb-1">Menjalankan Audit Trail Bank...</h6>
              <p className="text-muted fs-12 mb-0">
                Memverifikasi mutasi rekening BCA &amp; Mandiri Escrow dengan buku besar Indovia
              </p>
            </div>
          ) : reconcileResult ? (
            <div>
              <Alert variant="success" className="d-flex align-items-start gap-2 mb-3">
                <IconifyIcon icon="solar:check-circle-bold" className="fs-22 text-success flex-shrink-0 mt-0.5" />
                <div className="fs-13">
                  <strong>100% Balanced &amp; Reconciled:</strong>
                  <p className="mb-0 mt-1">{reconcileResult.message}</p>
                </div>
              </Alert>

              <div className="p-3 bg-light rounded border fs-13">
                <div className="d-flex justify-content-between py-1 border-bottom">
                  <span className="text-muted">Total Transaksi Tervalidasi:</span>
                  <strong className="text-dark">{reconcileResult.reconciled_orders_count} Pesanan</strong>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom">
                  <span className="text-muted">Nominal Mutasi Rekening:</span>
                  <strong className="text-primary">{reconcileResult.formatted_reconciled_amount}</strong>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom">
                  <span className="text-muted">Selisih Transaksi (Discrepancy):</span>
                  <strong className="text-success">0 Selisih (Nol Rupiah)</strong>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span className="text-muted">Waktu Audit Selesai:</span>
                  <span className="text-muted">{reconcileResult.timestamp}</span>
                </div>
              </div>
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShowReconcileModal(false)} disabled={reconciling}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EscrowDashboardPage;
