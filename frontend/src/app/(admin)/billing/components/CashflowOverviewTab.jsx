import { useState } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Badge, Button, Table, ProgressBar, Form } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useLayoutContext } from '@/context/useLayoutContext';
import {
  formatRupiah,
  accountingControls,
  monthlyCashflowTrend,
  paymentChannelAnalysis,
  tierCashflowDistribution,
  agingScheduleData,
  liquidityForecastData,
  topMerchantContributors,
  grossToNetWaterfall,
  failureAttributionData,
  saasFinancialRatios,
  cashflowJournalEntries,
} from '../data';

const CashflowOverviewTab = () => {
  const { theme } = useLayoutContext();
  const isDark = theme === 'dark';

  const [accountingBasis, setAccountingBasis] = useState('cash'); // 'cash' | 'accrual'
  const [fiscalPeriod, setFiscalPeriod] = useState('MTD'); // 'MTD' | 'Q3' | 'YTD'
  const [selectedJournalFilter, setSelectedJournalFilter] = useState('ALL');

  // Colors based on theme
  const axisColor = isDark ? '#94a3b8' : '#64748b';
  const gridBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(100, 116, 139, 0.12)';
  const donutStrokeColor = isDark ? '#282f36' : '#ffffff';
  const donutValueColor = isDark ? '#f1f5f9' : '#0f172a';

  // CHART 1 [WHAT]: Komposisi Arus Kas Masuk & Realisasi Pendapatan Bersih (12 Bulan)
  const cashflowComboOptions = {
    chart: {
      height: 330,
      type: 'line',
      background: 'transparent',
      stacked: false,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    stroke: {
      width: [0, 0, 3],
      curve: 'smooth',
    },
    plotOptions: {
      bar: {
        columnWidth: '38%',
        borderRadius: 4,
      },
    },
    colors: ['#ff6c2f', '#3b82f6', '#16a34a'],
    fill: {
      opacity: [0.95, 0.95, 1],
      type: ['solid', 'solid', 'solid'],
    },
    labels: monthlyCashflowTrend.months,
    xaxis: {
      type: 'category',
      labels: {
        style: { colors: axisColor, fontSize: '11px', fontWeight: 500 },
      },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: [
      {
        title: {
          text: 'Volume Kas Masuk (Juta Rp)',
          style: { color: axisColor, fontSize: '11px', fontWeight: 600 },
        },
        labels: {
          formatter: (val) => `Rp ${val}M`,
          style: { colors: axisColor, fontSize: '11px' },
        },
      },
      {
        opposite: true,
        title: {
          text: 'Kas Bersih Terealisasi (Juta Rp)',
          style: { color: '#16a34a', fontSize: '11px', fontWeight: 600 },
        },
        labels: {
          formatter: (val) => `Rp ${val}M`,
          style: { colors: '#16a34a', fontSize: '11px' },
        },
      },
    ],
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '12px',
      markers: { radius: 12 },
    },
    grid: {
      borderColor: gridBorderColor,
      strokeDashArray: 3,
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => (typeof y !== 'undefined' ? `Rp ${y.toFixed(1)} Juta` : y),
      },
    },
  };

  const cashflowComboSeries = [
    {
      name: 'Pendapatan Sewa SaaS (MRR)',
      type: 'column',
      data: monthlyCashflowTrend.subscriptionInflow,
    },
    {
      name: 'Komisi Take-Rate GMV Toko',
      type: 'column',
      data: monthlyCashflowTrend.takeRateInflow,
    },
    {
      name: 'Realisasi Kas Operasional Bersih',
      type: 'line',
      data: monthlyCashflowTrend.netOperatingCash,
    },
  ];

  // CHART 2 [WHERE]: Distribusi Tier & Kanal Pembayaran
  const tierDonutOptions = {
    chart: {
      height: 220,
      type: 'donut',
      background: 'transparent',
    },
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    colors: tierCashflowDistribution.colors,
    labels: tierCashflowDistribution.labels,
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            name: { show: true, fontSize: '12px', color: axisColor },
            value: {
              show: true,
              fontSize: '20px',
              fontWeight: 700,
              color: donutValueColor,
              formatter: (v) => `${v}%`,
            },
            total: {
              show: true,
              label: 'Enterprise Dominan',
              fontSize: '11px',
              color: '#ff6c2f',
              formatter: () => '52%',
            },
          },
        },
      },
    },
    stroke: { width: 2, colors: [donutStrokeColor] },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (val) => `${val}% Porsi Kas Masuk`
      }
    }
  };

  // CHART 3 [WHEN]: Proyeksi Likuiditas 30 Hari (M1-M4)
  const liquidityForecastOptions = {
    chart: {
      height: 230,
      type: 'area',
      background: 'transparent',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => `Rp ${val} Juta`
      }
    },
    colors: ['#ff6c2f', '#16a34a'],
    stroke: { curve: 'smooth', width: [2, 2.5] },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 95, 100],
      },
    },
    labels: liquidityForecastData.weeks,
    xaxis: {
      labels: { style: { colors: axisColor, fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val) => `Rp ${val}M`,
        style: { colors: axisColor, fontSize: '11px' },
      },
    },
    grid: { borderColor: gridBorderColor, strokeDashArray: 3 },
    legend: { position: 'top', horizontalAlign: 'right', fontSize: '11px' },
  };

  const liquidityForecastSeries = [
    { name: 'Target Kuota Penagihan', data: liquidityForecastData.targetQuota },
    { name: 'Proyeksi Realisasi Kas Masuk', data: liquidityForecastData.projectedInflow },
  ];

  // CHART 5 [WHY]: Atribusi Akar Penyebab Penolakan Debit
  const failureAttributionOptions = {
    chart: {
      height: 230,
      type: 'pie',
      background: 'transparent',
    },
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (val) => `${val}% Alasan Kegagalan`
      }
    },
    colors: failureAttributionData.map((d) => d.color),
    labels: failureAttributionData.map((d) => d.reason),
    legend: { show: false },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(0)}%`,
      style: { fontSize: '11px', fontWeight: 600 },
    },
    stroke: { width: 1, colors: [donutStrokeColor] },
  };

  // Filter General Ledger entries
  const filteredLedger = cashflowJournalEntries.filter((entry) => {
    if (selectedJournalFilter === 'ALL') return true;
    if (selectedJournalFilter === 'INFLOW') return entry.transactionType.startsWith('INFLOW');
    if (selectedJournalFilter === 'OUTFLOW') return entry.transactionType.startsWith('OUTFLOW');
    if (selectedJournalFilter === 'DUNNING') return entry.transactionType === 'ACCRUAL_DUNNING';
    return true;
  });

  return (
    <>
      {/* SECTION 1: ACCOUNTING CONTROLS & AUDIT INTEGRITY HEADER */}
      <Card className="border shadow-sm mb-4 bg-body">
        <CardBody className="p-3">
          <Row className="g-3 align-items-center justify-content-between">
            <Col lg={7}>
              <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle fs-11 fw-semibold">
                  <IconifyIcon icon="solar:shield-check-bold" className="me-1 fs-12" />
                  Audit Standar {accountingControls.accountingStandards}
                </span>
                <span className="badge bg-success-subtle text-success border border-success-subtle fs-11 fw-semibold">
                  <IconifyIcon icon="solar:check-circle-bold" className="me-1 fs-12" />
                  Rekonsiliasi Bank: Klir 100% (Selisih Rp 0)
                </span>
                <span className="text-muted fs-11">
                  Sinkronisasi Terakhir: {accountingControls.reconciliationAuditDate}
                </span>
              </div>
              <h5 className="fw-bold text-body mb-0">
                Pusat Rekonsiliasi Finansial, Manajemen Likuiditas & Arus Kas SaaS
              </h5>
              <p className="text-muted fs-12 mb-0">
                Monitoring pergerakan modal kerja, dekomposisi pendapatan kotor ke kas bersih, dan mitigasi risiko piutang.
              </p>
            </Col>

            <Col lg={5} className="d-flex flex-wrap justify-content-lg-end align-items-center gap-2">
              {/* Accounting Basis Switcher */}
              <div className="bg-light p-1 rounded-2 border d-inline-flex align-items-center">
                <Button
                  variant={accountingBasis === 'cash' ? 'primary' : (isDark ? 'dark' : 'light')}
                  size="sm"
                  className="py-1 px-2.5 fs-11 fw-semibold"
                  style={accountingBasis === 'cash' ? { backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' } : {}}
                  onClick={() => setAccountingBasis('cash')}
                >
                  Basis Kas (Cash Basis)
                </Button>
                <Button
                  variant={accountingBasis === 'accrual' ? 'primary' : (isDark ? 'dark' : 'light')}
                  size="sm"
                  className="py-1 px-2.5 fs-11 fw-semibold"
                  style={accountingBasis === 'accrual' ? { backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' } : {}}
                  onClick={() => setAccountingBasis('accrual')}
                >
                  Basis Akrual (Accrual)
                </Button>
              </div>

              {/* Fiscal Horizon Filter */}
              <div className="bg-light p-1 rounded-2 border d-inline-flex align-items-center">
                {['MTD', 'Q3', 'YTD'].map((period) => (
                  <Button
                    key={period}
                    variant={fiscalPeriod === period ? (isDark ? 'secondary' : 'dark') : (isDark ? 'dark' : 'light')}
                    size="sm"
                    className="py-1 px-2 fs-11 fw-medium"
                    onClick={() => setFiscalPeriod(period)}
                  >
                    {period === 'MTD' ? 'Bulan Ini' : period === 'Q3' ? 'Q3-2026' : 'Tahun 2026'}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* SECTION 2: SIX CORE EXECUTIVE ACCOUNTING BALANCE METRICS */}
      <Row className="g-3 mb-4">
        {/* Metric 1: Gross Cash Inflow */}
        <Col sm={6} xl={2}>
          <Card className="border shadow-sm h-100 bg-body" style={{ borderLeft: '4px solid #ff6c2f' }}>
            <CardBody className="p-3">
              <span className="text-muted fs-11 fw-medium d-block mb-1">Kas Masuk Bruto (Gross)</span>
              <h5 className="fw-bold text-body fs-16 mb-1">{formatRupiah(accountingControls.realizedGrossCash)}</h5>
              <div className="d-flex align-items-center text-success fs-10 fw-semibold">
                <IconifyIcon icon="solar:arrow-up-bold" className="me-1" />
                +19.2% vs periode lalu
              </div>
              <small className="text-muted fs-10 mt-1 d-block">Penagihan Langganan & GMV</small>
            </CardBody>
          </Card>
        </Col>

        {/* Metric 2: Net Operating Cashflow */}
        <Col sm={6} xl={2}>
          <Card className="border shadow-sm h-100 bg-body" style={{ borderLeft: '4px solid #16a34a' }}>
            <CardBody className="p-3">
              <span className="text-muted fs-11 fw-medium d-block mb-1">Arus Kas Operasional Bersih</span>
              <h5 className="fw-bold text-success fs-16 mb-1">{formatRupiah(accountingControls.netOperatingCashflow)}</h5>
              <div className="d-flex align-items-center text-success fs-10 fw-semibold">
                <IconifyIcon icon="solar:shield-check-bold" className="me-1" />
                Margin Kas 88.5%
              </div>
              <small className="text-muted fs-10 mt-1 d-block">Setelah MDR Bank & Server</small>
            </CardBody>
          </Card>
        </Col>

        {/* Metric 3: Deferred Revenue */}
        <Col sm={6} xl={2}>
          <Card className="border shadow-sm h-100 bg-body" style={{ borderLeft: '4px solid #3b82f6' }}>
            <CardBody className="p-3">
              <span className="text-muted fs-11 fw-medium d-block mb-1">Pendapatan Tangguhan</span>
              <h5 className="fw-bold text-primary fs-16 mb-1">{formatRupiah(accountingControls.deferredRevenueBalance)}</h5>
              <div className="d-flex align-items-center text-primary fs-10 fw-semibold">
                <IconifyIcon icon="solar:calendar-date-bold" className="me-1" />
                Amortisasi 12 Bulan
              </div>
              <small className="text-muted fs-10 mt-1 d-block">Sewa Tahunan Dimuka (PSAK 72)</small>
            </CardBody>
          </Card>
        </Col>

        {/* Metric 4: Accounts Receivable & Dunning */}
        <Col sm={6} xl={2}>
          <Card className="border shadow-sm h-100 bg-body" style={{ borderLeft: '4px solid #ef4444' }}>
            <CardBody className="p-3">
              <span className="text-muted fs-11 fw-medium d-block mb-1">Piutang Dunning (Overdue)</span>
              <h5 className="fw-bold text-danger fs-16 mb-1">{formatRupiah(accountingControls.accountsReceivableDunning)}</h5>
              <div className="d-flex align-items-center text-danger fs-10 fw-semibold">
                <IconifyIcon icon="solar:danger-circle-bold" className="me-1" />
                {accountingControls.badDebtProvision ? `${formatRupiah(accountingControls.badDebtProvision)} Cadangan` : ''}
              </div>
              <small className="text-muted fs-10 mt-1 d-block">4 Toko dalam Masa Tunggakan</small>
            </CardBody>
          </Card>
        </Col>

        {/* Metric 5: Gateway MDR Fee */}
        <Col sm={6} xl={2}>
          <Card className="border shadow-sm h-100 bg-body" style={{ borderLeft: '4px solid #f59e0b' }}>
            <CardBody className="p-3">
              <span className="text-muted fs-11 fw-medium d-block mb-1">Beban MDR & Switching Bank</span>
              <h5 className="fw-bold text-body fs-16 mb-1">{formatRupiah(accountingControls.paymentGatewayMdrFee)}</h5>
              <div className="d-flex align-items-center text-muted fs-10">
                <IconifyIcon icon="solar:tag-price-bold" className="me-1 text-warning" />
                1.95% Rata-rata Terbobot
              </div>
              <small className="text-muted fs-10 mt-1 d-block">Biaya Kliring Transaksi Masuk</small>
            </CardBody>
          </Card>
        </Col>

        {/* Metric 6: Cash Runway */}
        <Col sm={6} xl={2}>
          <Card className="border shadow-sm h-100 bg-body" style={{ borderLeft: '4px solid #64748b' }}>
            <CardBody className="p-3">
              <span className="text-muted fs-11 fw-medium d-block mb-1">Cadangan Likuiditas (Runway)</span>
              <h5 className="fw-bold text-body fs-16 mb-1">{accountingControls.cashRunwayMonths} Bulan</h5>
              <div className="d-flex align-items-center text-success fs-10 fw-semibold">
                <IconifyIcon icon="solar:card-check-bold" className="me-1" />
                Quick Ratio {accountingControls.quickRatio}x
              </div>
              <small className="text-muted fs-10 mt-1 d-block">Kapasitas Solvabilitas Sangat Kuat</small>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* SECTION 3: [WHAT] KOMPOSISI ARUS KAS MASUK & REALISASI PENDAPATAN BERSIH */}
      <Row className="g-3 mb-4">
        <Col lg={8}>
          <Card className="border shadow-sm h-100">
            <CardHeader className="p-3 border-bottom bg-body d-flex flex-wrap justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold text-body fs-14 mb-0">
                  Dekomposisi Arus Kas Masuk & Realisasi Pendapatan Bersih (Tren 12 Bulan)
                </h6>
                <p className="text-muted fs-11 mb-0">
                  Perbandingan penerimaan kas berulang dari langganan SaaS, bagi hasil GMV toko, dan margin operasional bersih.
                </p>
              </div>
              <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
                <span className="badge bg-success-subtle text-success border fs-11">
                  Margin Bersih 88.5%
                </span>
                <span className="badge bg-light text-muted border fs-11 font-monospace">
                  YTD: Rp 1,18 Miliar
                </span>
              </div>
            </CardHeader>
            <CardBody className="p-3">
              <div dir="ltr">
                <ReactApexChart
                  options={cashflowComboOptions}
                  series={cashflowComboSeries}
                  type="line"
                  height={320}
                />
              </div>
              <div className="p-2.5 rounded-2 bg-light bg-opacity-50 border mt-2 fs-11 text-muted d-flex flex-wrap align-items-center justify-content-between">
                <div>
                  <strong className="text-body">Catatan Analisis Akuntansi:</strong> Pendapatan sewa berulang (MRR) menyumbang 66.7% dari total kas masuk, menghasilkan stabilitas prediktabilitas arus kas tanpa fluktuasi musiman.
                </div>
                <div className="fw-semibold text-primary">
                  Pertumbuhan Kas Bersih MoM: +4.2%
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* SECTION 4: [WHERE] DISTRIBUSI SALURAN SETTLEMENT & KONTRIBUSI TIER */}
        <Col lg={4}>
          <Card className="border shadow-sm h-100">
            <CardHeader className="p-3 border-bottom bg-body">
              <h6 className="fw-bold text-body fs-14 mb-0">
                Kontribusi Arus Kas Berdasarkan Tier Paket
              </h6>
              <p className="text-muted fs-11 mb-0">
                Konsentrasi volume kas masuk per tingkatan langganan tenant.
              </p>
            </CardHeader>
            <CardBody className="p-3 d-flex flex-column justify-content-between">
              <div className="text-center my-auto" dir="ltr">
                <ReactApexChart
                  options={tierDonutOptions}
                  series={tierCashflowDistribution.series}
                  type="donut"
                  height={210}
                />
              </div>

              <div className="pt-2 border-top">
                <div className="d-flex align-items-center justify-content-between mb-1.5 fs-12">
                  <div className="d-flex align-items-center">
                    <span className="rounded-circle me-1.5" style={{ width: 10, height: 10, backgroundColor: '#ff6c2f' }} />
                    <span className="text-body fw-medium">Enterprise Tier:</span>
                  </div>
                  <strong className="text-body">Rp 65.850.000 (52%)</strong>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-1.5 fs-12">
                  <div className="d-flex align-items-center">
                    <span className="rounded-circle me-1.5" style={{ width: 10, height: 10, backgroundColor: '#3b82f6' }} />
                    <span className="text-body fw-medium">Pro Tier:</span>
                  </div>
                  <strong className="text-body">Rp 43.100.000 (34%)</strong>
                </div>
                <div className="d-flex align-items-center justify-content-between fs-12">
                  <div className="d-flex align-items-center">
                    <span className="rounded-circle me-1.5" style={{ width: 10, height: 10, backgroundColor: '#64748b' }} />
                    <span className="text-body fw-medium">Starter (Take-rate):</span>
                  </div>
                  <strong className="text-body">Rp 17.700.000 (14%)</strong>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* SECTION 5: [WHERE DETAIL] TABEL EFISIENSI KANAL PERBANKAN & BEBAN MDR */}
      <Card className="border shadow-sm mb-4">
        <CardHeader className="p-3 border-bottom bg-body d-flex flex-wrap justify-content-between align-items-center">
          <div>
            <h6 className="fw-bold text-body fs-14 mb-0">
              Analisis Efisiensi Saluran Settlement, Kecepatan Kliring & Beban MDR Perbankan
            </h6>
            <p className="text-muted fs-11 mb-0">
              Evaluasi biaya langsung transaksi per kanal perbankan untuk optimasi biaya merchant discount rate.
            </p>
          </div>
          <span className="badge bg-light text-muted border font-monospace fs-11">
            5 Saluran Gateway Aktif
          </span>
        </CardHeader>
        <div className="table-responsive">
          <Table hover className="align-middle mb-0 fs-12">
            <thead className="bg-light bg-opacity-50 border-bottom">
              <tr className="text-muted text-uppercase fs-11">
                <th className="ps-3" style={{ minWidth: 200 }}>Saluran Pembayaran</th>
                <th style={{ minWidth: 160 }}>Mitra Kliring</th>
                <th style={{ minWidth: 150 }}>Volume Kas Masuk</th>
                <th style={{ minWidth: 110 }}>Pangsa (%)</th>
                <th style={{ minWidth: 110 }}>Beban MDR</th>
                <th style={{ minWidth: 130 }}>Estimasi Biaya MDR</th>
                <th style={{ minWidth: 120 }}>Tingkat Penolakan</th>
                <th className="text-end pe-3" style={{ minWidth: 130 }}>Kecepatan Setor</th>
              </tr>
            </thead>
            <tbody>
              {paymentChannelAnalysis.map((ch) => (
                <tr key={ch.channel}>
                  <td className="ps-3">
                    <strong className="text-body">{ch.channel}</strong>
                  </td>
                  <td className="text-muted fs-11">{ch.provider}</td>
                  <td>
                    <strong className="text-body">{formatRupiah(ch.inflowAmount)}</strong>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-semibold text-body">{ch.sharePct}%</span>
                      <ProgressBar
                        now={ch.sharePct}
                        variant={ch.badgeColor}
                        style={{ height: 4, width: 50 }}
                      />
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-light text-secondary border font-monospace fs-11">
                      {ch.mdrRate}
                    </span>
                  </td>
                  <td className="text-danger fw-semibold">{formatRupiah(ch.mdrCost)}</td>
                  <td>
                    <span
                      className={`badge ${
                        parseFloat(ch.declineRate) < 2.0
                          ? 'bg-success-subtle text-success'
                          : parseFloat(ch.declineRate) < 4.0
                          ? 'bg-warning-subtle text-warning'
                          : 'bg-danger-subtle text-danger'
                      } border fs-11`}
                    >
                      {ch.declineRate}
                    </span>
                  </td>
                  <td className="text-end pe-3">
                    <span className="badge bg-light text-body border fs-11">
                      <IconifyIcon icon="solar:clock-circle-bold" className="me-1 text-primary fs-11" />
                      {ch.settlementSpeed}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* SECTION 6: [WHEN] JADWAL UMUR PIUTANG (AGING) & HORIZON LIKUIDITAS 30 HARI */}
      <Row className="g-3 mb-4">
        {/* Aging Schedule (Standar PSAK 71) */}
        <Col lg={6}>
          <Card className="border shadow-sm h-100">
            <CardHeader className="p-3 border-bottom bg-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold text-body fs-14 mb-0">
                  Jadwal Umur Piutang Tagihan (Aging Schedule - PSAK 71)
                </h6>
                <p className="text-muted fs-11 mb-0">
                  Klasifikasi piutang berdasarkan durasi keterlambatan dan probabilitas ketertagihan kas.
                </p>
              </div>
              <span className="badge bg-light text-muted border fs-11 font-monospace">
                Total: Rp 33,49 Juta
              </span>
            </CardHeader>
            <CardBody className="p-3">
              <div className="d-flex flex-column gap-3">
                {agingScheduleData.map((item) => (
                  <div key={item.category} className="p-2.5 rounded-2 bg-light bg-opacity-25 border">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div className="d-flex align-items-center">
                        <span
                          className="rounded-circle me-2"
                          style={{ width: 10, height: 10, backgroundColor: item.color }}
                        />
                        <strong className="text-body fs-12">{item.category}</strong>
                        <span className="badge bg-light text-muted border ms-2 fs-10">
                          {item.merchantCount} Toko
                        </span>
                      </div>
                      <strong className="text-body fs-13">{formatRupiah(item.amount)}</strong>
                    </div>

                    <div className="d-flex align-items-center justify-content-between text-muted fs-11 mt-1">
                      <span>Probabilitas Ketertagihan: <strong className="text-success">{item.collectionProbability}</strong></span>
                      <span className="badge bg-light text-secondary border fs-10">Tingkat Risiko: {item.riskLevel}</span>
                    </div>

                    <ProgressBar
                      now={item.sharePct}
                      style={{ height: 5, backgroundColor: 'rgba(0,0,0,0.05)' }}
                      className="mt-2"
                    >
                      <ProgressBar now={item.sharePct} style={{ backgroundColor: item.color }} />
                    </ProgressBar>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* 30-Day Cash Liquidity Forecast Horizon */}
        <Col lg={6}>
          <Card className="border shadow-sm h-100">
            <CardHeader className="p-3 border-bottom bg-body d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold text-body fs-14 mb-0">
                  Proyeksi Arus Kas Masuk & Jadwal Perpanjangan 30 Hari
                </h6>
                <p className="text-muted fs-11 mb-0">
                  Estimasi inflow likuiditas berdasarkan kalender perpanjangan sewa otomatis (*auto-renewal pipeline*).
                </p>
              </div>
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle fs-11">
                Target: Rp 120 Juta
              </span>
            </CardHeader>
            <CardBody className="p-3">
              <div dir="ltr">
                <ReactApexChart
                  options={liquidityForecastOptions}
                  series={liquidityForecastSeries}
                  type="area"
                  height={220}
                />
              </div>

              <Row className="g-2 pt-2 border-top mt-1">
                {liquidityForecastData.weeks.map((week, idx) => (
                  <Col key={week} xs={6} sm={3}>
                    <div className="p-2 rounded bg-light bg-opacity-25 border text-center">
                      <span className="text-muted fs-10 d-block">{week}</span>
                      <strong className="text-body fs-12 d-block">
                        Rp {liquidityForecastData.projectedInflow[idx]}M
                      </strong>
                      <small className="text-muted fs-10">
                        {liquidityForecastData.scheduledRenewals[idx]} Renewal
                      </small>
                    </div>
                  </Col>
                ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* SECTION 7: [WHY] ANALISIS VARIANS GROSS-TO-NET & ATRIBUSI PENOLAKAN DEBIT */}
      <Row className="g-3 mb-4">
        {/* Gross to Net Variance Decomposition */}
        <Col lg={7}>
          <Card className="border shadow-sm h-100">
            <CardHeader className="p-3 border-bottom bg-body">
              <h6 className="fw-bold text-body fs-14 mb-0">
                Dekomposisi Varians Tagihan Bruto ke Realisasi Kas Bersih
              </h6>
              <p className="text-muted fs-11 mb-0">
                Rekonsiliasi potongan harga siklus, biaya transaksi perbankan, dan piutang tertunda.
              </p>
            </CardHeader>
            <CardBody className="p-3">
              <div className="d-flex flex-column gap-2.5">
                {grossToNetWaterfall.map((item) => (
                  <div
                    key={item.label}
                    className={`p-2.5 rounded-2 border ${
                      item.isTotal
                        ? 'bg-success-subtle border-success-subtle'
                        : item.isDeduction
                        ? 'bg-danger-subtle bg-opacity-10 border-danger-subtle'
                        : 'bg-light bg-opacity-50'
                    }`}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <span
                          className={`badge ${
                            item.isTotal
                              ? 'bg-success text-white'
                              : item.isDeduction
                              ? 'bg-danger text-white'
                              : 'bg-secondary text-white'
                          } me-2 fs-10 font-monospace`}
                        >
                          {item.isTotal ? 'NET' : item.isDeduction ? 'DEDUCT' : 'GROSS'}
                        </span>
                        <span className={`fs-12 ${item.isTotal ? 'fw-bold text-success' : 'text-body'}`}>
                          {item.label}
                        </span>
                      </div>
                      <strong
                        className={`fs-13 ${
                          item.isTotal
                            ? 'text-success'
                            : item.isDeduction
                            ? 'text-danger'
                            : 'text-body'
                        }`}
                      >
                        {formatRupiah(item.amount)}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2.5 rounded bg-light border mt-3 fs-11 text-muted">
                <strong className="text-body">Kesimpulan Akuntan:</strong> Nilai realisasi penerimaan kas mencapai 91.5% dari total bruto tagihan. Tingkat kebocoran (*revenue leakage*) terkendali pada rasio wajar industri SaaS B2B.
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Root Cause Failure Attribution */}
        <Col lg={5}>
          <Card className="border shadow-sm h-100">
            <CardHeader className="p-3 border-bottom bg-body">
              <h6 className="fw-bold text-body fs-14 mb-0">
                Atribusi Akar Masalah Penolakan Auto-Debit
              </h6>
              <p className="text-muted fs-11 mb-0">
                Distribusi penyebab kegagalan pembayaran pada antrean dunning aktif.
              </p>
            </CardHeader>
            <CardBody className="p-3 d-flex flex-column justify-content-between">
              <div dir="ltr" className="my-auto text-center">
                <ReactApexChart
                  options={failureAttributionOptions}
                  series={failureAttributionData.map((d) => d.percentage)}
                  type="pie"
                  height={200}
                />
              </div>

              <div className="pt-2 border-top">
                {failureAttributionData.map((f) => (
                  <div key={f.reason} className="d-flex align-items-center justify-content-between mb-1 fs-11">
                    <div className="d-flex align-items-center text-truncate pe-2">
                      <span
                        className="rounded-circle me-1.5 flex-shrink-0"
                        style={{ width: 8, height: 8, backgroundColor: f.color }}
                      />
                      <span className="text-body text-truncate">{f.reason}</span>
                    </div>
                    <strong className="text-body flex-shrink-0">{f.percentage}% ({f.cases} kasus)</strong>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* SECTION 8: [WHO] MATRIKS KONTRIBUSI MERCHANT (PARETO 80/20) & KEPATUHAN */}
      <Card className="border shadow-sm mb-4">
        <CardHeader className="p-3 border-bottom bg-body d-flex flex-wrap justify-content-between align-items-center">
          <div>
            <h6 className="fw-bold text-body fs-14 mb-0">
              Matriks Kontributor Arus Kas Terbesar (Prinsip Pareto) & Profil Kepatuhan Pembayaran
            </h6>
            <p className="text-muted fs-11 mb-0">
              Merchant berbobot volume transaksi tinggi, indeks keandalan kredit, dan status verifikasi rekonsiliasi.
            </p>
          </div>
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle fs-11">
            Top 7 Merchant Penyumbang 80% Kas
          </span>
        </CardHeader>
        <div className="table-responsive">
          <Table hover className="align-middle mb-0 fs-12">
            <thead className="bg-light bg-opacity-50 border-bottom">
              <tr className="text-muted text-uppercase fs-11">
                <th className="ps-3" style={{ width: 60 }}>Rank</th>
                <th style={{ minWidth: 220 }}>Nama Toko & Kode</th>
                <th style={{ minWidth: 120 }}>Tier Paket</th>
                <th style={{ minWidth: 160 }}>Kontribusi Kas MTD</th>
                <th style={{ minWidth: 140 }}>Volume GMV Toko</th>
                <th style={{ minWidth: 170 }}>Metode Pembayaran</th>
                <th style={{ minWidth: 130 }}>Skor Keandalan</th>
                <th className="text-end pe-3" style={{ minWidth: 140 }}>Status Rekonsiliasi</th>
              </tr>
            </thead>
            <tbody>
              {topMerchantContributors.map((m) => (
                <tr key={m.id}>
                  <td className="ps-3 font-monospace fw-bold text-muted">{m.rank}</td>
                  <td>
                    <div className="fw-bold text-body fs-12">{m.merchantName}</div>
                    <span className="badge bg-light text-secondary border font-monospace fs-10">
                      {m.merchantCode}
                    </span>
                  </td>
                  <td>
                    <span
                      className="badge px-2 py-0.5 fs-10 text-uppercase"
                      style={{
                        backgroundColor:
                          m.tier === 'Enterprise'
                            ? '#ff6c2f'
                            : m.tier === 'Pro'
                            ? '#3b82f6'
                            : '#64748b',
                        color: '#fff',
                      }}
                    >
                      {m.tier}
                    </span>
                  </td>
                  <td>
                    <strong className="text-body fs-12">{formatRupiah(m.monthlyInflow)}</strong>
                    <div className="text-muted fs-10">{m.shareOfPlatformCash} dari total kas</div>
                  </td>
                  <td className="text-body fw-semibold">{formatRupiah(m.gmvAmount)}</td>
                  <td className="text-muted fs-11">{m.autoDebitMethod}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <ProgressBar
                        now={m.reliabilityScore}
                        variant={m.reliabilityScore >= 90 ? 'success' : 'warning'}
                        style={{ height: 5, width: 45 }}
                      />
                      <span className="fw-semibold text-body fs-11">{m.reliabilityScore}/100</span>
                    </div>
                  </td>
                  <td className="text-end pe-3">
                    <span
                      className={`badge ${
                        m.reconciliationStatus === 'MATCHED'
                          ? 'bg-success-subtle text-success border border-success-subtle'
                          : 'bg-warning-subtle text-warning border border-warning-subtle'
                      } fs-11 py-1 px-2`}
                    >
                      <IconifyIcon
                        icon={
                          m.reconciliationStatus === 'MATCHED'
                            ? 'solar:check-circle-bold'
                            : 'solar:clock-circle-bold'
                        }
                        className="me-1 fs-11"
                      />
                      {m.reconciliationStatus === 'MATCHED' ? 'Terekonsiliasi' : 'Dalam Proses'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* SECTION 9: [HOW] RASIO KESEHATAN FINANSIAL & UNIT ECONOMICS SAAS */}
      <Card className="border shadow-sm mb-4">
        <CardHeader className="p-3 border-bottom bg-body">
          <h6 className="fw-bold text-body fs-14 mb-0">
            Indikator Efisiensi Likuiditas, Solvabilitas & Rasio Kesehatan Finansial SaaS
          </h6>
          <p className="text-muted fs-11 mb-0">
            Metrik standar korporasi untuk mengukur efisiensi penagihan kas dan keberlanjutan model bisnis.
          </p>
        </CardHeader>
        <CardBody className="p-3">
          <Row className="g-3">
            {saasFinancialRatios.map((ratio) => (
              <Col md={6} xl={4} key={ratio.metric}>
                <div className="p-3 rounded-2 bg-light bg-opacity-25 border h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="text-muted fs-11 fw-medium">{ratio.metric}</span>
                      <span className="badge bg-success-subtle text-success border fs-10">
                        {ratio.status}
                      </span>
                    </div>
                    <div className="d-flex align-items-baseline gap-2 mb-1">
                      <h4 className="fw-bold text-body mb-0 fs-20">{ratio.value}</h4>
                      <span className="text-muted fs-11">({ratio.benchmark})</span>
                    </div>
                    <p className="text-muted fs-11 mb-2">{ratio.note}</p>
                  </div>

                  <div>
                    <div className="d-flex justify-content-between fs-10 text-muted mb-1">
                      <span>Indeks Skor Kepatuhan:</span>
                      <strong>{ratio.score}/100</strong>
                    </div>
                    <ProgressBar
                      now={ratio.score}
                      variant="success"
                      style={{ height: 4 }}
                    />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>

      {/* SECTION 10: BUKU JURNAL UMUM ARUS KAS / GENERAL LEDGER AUDIT TRAIL */}
      <Card className="border shadow-sm mb-4">
        <CardHeader className="p-3 border-bottom bg-body d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <h6 className="fw-bold text-body fs-14 mb-0">
              Buku Jurnal Umum Kas & Log Mutasi Rekonsiliasi Real-Time (General Ledger)
            </h6>
            <p className="text-muted fs-11 mb-0">
              Jejak audit pembukuan berpasangan (*double-entry bookkeeping*) untuk seluruh mutasi kas keluar dan masuk platform.
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Form.Select
              size="sm"
              className="fs-12"
              value={selectedJournalFilter}
              onChange={(e) => setSelectedJournalFilter(e.target.value)}
              style={{ width: 170 }}
            >
              <option value="ALL">Semua Mutasi Kas</option>
              <option value="INFLOW">Kas Masuk Saja</option>
              <option value="OUTFLOW">Beban MDR Saja</option>
              <option value="DUNNING">Akrual Dunning</option>
            </Form.Select>

            <Button
              variant="outline-secondary"
              size="sm"
              className="fs-11 d-flex align-items-center"
              onClick={() => alert('Jurnal buku besar diekspor dalam format spreadsheet akuntansi (XLSX).')}
            >
              <IconifyIcon icon="solar:export-bold" className="me-1" />
              Ekspor Buku Jurnal
            </Button>
          </div>
        </CardHeader>
        <div className="table-responsive">
          <Table hover className="align-middle mb-0 fs-12">
            <thead className="bg-light bg-opacity-50 border-bottom">
              <tr className="text-muted text-uppercase fs-11">
                <th className="ps-3" style={{ minWidth: 150 }}>No. Referensi & Waktu</th>
                <th style={{ minWidth: 190 }}>Akun Debit</th>
                <th style={{ minWidth: 190 }}>Akun Kredit</th>
                <th style={{ minWidth: 180 }}>Entitas Merchant</th>
                <th style={{ minWidth: 130 }}>Nominal Mutasi</th>
                <th style={{ minWidth: 120 }}>Klasifikasi</th>
                <th className="text-end pe-3" style={{ minWidth: 130 }}>Status Audit</th>
              </tr>
            </thead>
            <tbody>
              {filteredLedger.map((j) => (
                <tr key={j.id}>
                  <td className="ps-3">
                    <strong className="text-body font-monospace fs-11">{j.journalRef}</strong>
                    <div className="text-muted fs-10">{j.date} WIB</div>
                  </td>
                  <td>
                    <span className="badge bg-light text-body border font-monospace fs-11">
                      {j.debitAccount}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-light text-secondary border font-monospace fs-11">
                      {j.creditAccount}
                    </span>
                  </td>
                  <td>
                    <div className="fw-semibold text-body fs-12">{j.merchantName}</div>
                    <span className="text-muted fs-10 font-monospace">{j.merchantCode}</span>
                  </td>
                  <td>
                    <strong
                      className={`fs-12 ${
                        j.transactionType.startsWith('INFLOW')
                          ? 'text-success'
                          : j.transactionType.startsWith('OUTFLOW')
                          ? 'text-danger'
                          : 'text-warning'
                      }`}
                    >
                      {j.transactionType.startsWith('INFLOW') ? '+' : j.transactionType.startsWith('OUTFLOW') ? '-' : ''}
                      {formatRupiah(j.amount)}
                    </strong>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        j.transactionType === 'INFLOW_SUBSCRIPTION'
                          ? 'bg-primary-subtle text-primary'
                          : j.transactionType === 'INFLOW_COMMISSION'
                          ? 'bg-info-subtle text-info'
                          : j.transactionType === 'INFLOW_DEFERRED'
                          ? 'bg-secondary-subtle text-secondary'
                          : j.transactionType === 'OUTFLOW_MDR'
                          ? 'bg-danger-subtle text-danger'
                          : 'bg-warning-subtle text-warning'
                      } border fs-10`}
                    >
                      {j.transactionType}
                    </span>
                  </td>
                  <td className="text-end pe-3">
                    <span
                      className={`badge ${
                        j.reconciliationStatus === 'MATCHED'
                          ? 'bg-success-subtle text-success border border-success-subtle'
                          : 'bg-warning-subtle text-warning border border-warning-subtle'
                      } fs-11`}
                    >
                      <IconifyIcon
                        icon={
                          j.reconciliationStatus === 'MATCHED'
                            ? 'solar:check-circle-bold'
                            : 'solar:refresh-circle-bold'
                        }
                        className="me-1 fs-11"
                      />
                      {j.reconciliationStatus === 'MATCHED' ? 'Audited (Klir)' : 'Review Kliring'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </>
  );
};

export default CashflowOverviewTab;
