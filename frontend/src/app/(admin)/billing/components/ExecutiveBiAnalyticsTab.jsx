import { useState } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Badge, Button, Table, ProgressBar, Form } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useLayoutContext } from '@/context/useLayoutContext';
import {
  formatRupiah,
  executiveBiSaaS,
  mrrWaterfallTrend,
  macroCommerceTrends,
  demographicHeatmapData,
  peakShoppingHoursData,
  taxAndComplianceData,
} from '../data';
import TaxReconciliationModal from './TaxReconciliationModal';
import AccountingExportModal from './AccountingExportModal';

const ExecutiveBiAnalyticsTab = () => {
  const { theme } = useLayoutContext();
  const isDark = theme === 'dark';

  const [selectedPeriod, setSelectedPeriod] = useState('MTD'); // 'MTD' | 'Q3' | 'YTD'
  const [selectedGeoRegion, setSelectedGeoRegion] = useState('ALL');
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Dynamic theme colors
  const axisColor = isDark ? '#94a3b8' : '#64748b';
  const gridBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(100, 116, 139, 0.12)';

  // CHART 1: MRR Growth & Waterfall Decomposition (12 Bulan)
  const mrrChartOptions = {
    chart: {
      height: 330,
      type: 'bar',
      background: 'transparent',
      stacked: true,
      toolbar: { show: false },
    },
    theme: { mode: isDark ? 'dark' : 'light' },
    plotOptions: {
      bar: {
        columnWidth: '40%',
        borderRadius: 4,
      },
    },
    stroke: {
      width: [0, 0, 0, 3],
      curve: 'smooth',
    },
    colors: ['#16a34a', '#3b82f6', '#ef4444', '#ff6c2f'],
    labels: mrrWaterfallTrend.months,
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
          text: 'Arus MRR (Juta IDR)',
          style: { color: axisColor, fontSize: '11px', fontWeight: 600 },
        },
        labels: {
          formatter: (val) => `Rp ${val}M`,
          style: { colors: axisColor, fontSize: '11px' },
        },
      },
    ],
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '12px',
    },
    grid: {
      borderColor: gridBorderColor,
      strokeDashArray: 3,
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (val) => `Rp ${Math.abs(val)} Juta`,
      },
    },
  };

  const mrrChartSeries = [
    {
      name: 'New MRR (Toko Baru)',
      type: 'column',
      data: mrrWaterfallTrend.newMrr,
    },
    {
      name: 'Expansion MRR (Upgrade)',
      type: 'column',
      data: mrrWaterfallTrend.expansionMrr,
    },
    {
      name: 'Churn & Contraction MRR',
      type: 'column',
      data: mrrWaterfallTrend.churnContractionMrr,
    },
    {
      name: 'Total Active MRR',
      type: 'line',
      data: mrrWaterfallTrend.totalMrr,
    },
  ];

  // CHART 2: Hourly Peak Checkout Matrix (24 Jam)
  const hourlyChartOptions = {
    chart: {
      height: 310,
      type: 'area',
      background: 'transparent',
      toolbar: { show: false },
    },
    theme: { mode: isDark ? 'dark' : 'light' },
    stroke: {
      curve: 'smooth',
      width: 2.5,
    },
    colors: ['#ff6c2f', '#3b82f6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: peakShoppingHoursData.hourlyVolume.map((item) => item.hour),
      labels: {
        style: { colors: axisColor, fontSize: '10px' },
        rotate: -45,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val.toLocaleString()} trx`,
        style: { colors: axisColor, fontSize: '11px' },
      },
    },
    grid: {
      borderColor: gridBorderColor,
      strokeDashArray: 3,
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (val) => `${val.toLocaleString()} Transaksi Selesai`,
      },
    },
    markers: {
      size: 0,
      hover: { size: 5 },
    },
  };

  const hourlyChartSeries = [
    {
      name: 'Volume Transaksi Checkout',
      data: peakShoppingHoursData.hourlyVolume.map((item) => item.orders),
    },
  ];

  // Filtered provincial demographic
  const filteredProvinces = demographicHeatmapData.provinces.filter((p) => {
    if (selectedGeoRegion === 'ALL') return true;
    if (selectedGeoRegion === 'JABODETABEK') return p.region === 'Jabodetabek';
    if (selectedGeoRegion === 'JAWA') return p.region.includes('Jawa') || p.region === 'Banten';
    if (selectedGeoRegion === 'LUAR_JAWA') return !p.region.includes('Jawa') && p.region !== 'Jabodetabek' && p.region !== 'Banten';
    return true;
  });

  return (
    <div className="executive-bi-container">
      {/* SECTION CALLOUT BANNER */}
      <Card className="border-0 shadow-sm mb-4" style={{ background: 'linear-gradient(135deg, rgba(255, 108, 47, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)', borderLeft: '4px solid #ff6c2f' }}>
        <CardBody className="p-3">
          <Row className="align-items-center">
            <Col lg={8}>
              <div className="d-flex align-items-center mb-1">
                <Badge bg="primary" className="me-2 text-uppercase fs-10 px-2 py-1">
                  Modul 7
                </Badge>
                <h5 className="fw-bold mb-0 text-body">
                  Executive BI &amp; Platform-Wide Macro Analytics
                </h5>
              </div>
              <p className="text-muted fs-12 mb-0">
                Dasar pengambilan keputusan strategis bisnis bagi Founder, C-Level, dan Investor Indovia: Metrik Pertumbuhan Finansial SaaS, Tren Perdagangan Makro E-Commerce Nasional, Demografi Penjualan, serta Kepatuhan Fiskal SAK Indonesia.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end mt-2 mt-lg-0">
              <div className="d-flex justify-content-lg-end gap-2">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="d-flex align-items-center fs-12 fw-semibold"
                  onClick={() => setShowTaxModal(true)}
                >
                  <IconifyIcon icon="solar:document-medicine-bold" className="me-1 fs-14" />
                  Rekonsiliasi PPN 11%
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="d-flex align-items-center fs-12 fw-semibold text-white"
                  style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
                  onClick={() => setShowExportModal(true)}
                >
                  <IconifyIcon icon="solar:download-square-bold" className="me-1 fs-14" />
                  Ekspor SAK (PDF/Excel)
                </Button>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* ========================================================================= */}
      {/* 7.1 METRIK FINANSIAL SAAS (SAAS BUSINESS INTELLIGENCE)                     */}
      {/* ========================================================================= */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h5 className="fw-bold mb-0 text-body d-flex align-items-center">
            <IconifyIcon icon="solar:chart-square-bold-duotone" className="me-2 text-primary fs-20" />
            7.1 Metrik Finansial SaaS (SaaS Business Intelligence)
          </h5>
          <small className="text-muted">Kesehatan bisnis berulang, efisiensi modal, dan retensi pendapatan langganan</small>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Badge bg="success-subtle" className="text-success border border-success-subtle px-2 py-1 fs-11">
            <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
            {executiveBiSaaS.activePaidTenants} Toko Berlangganan Aktif
          </Badge>
          <Badge bg="info-subtle" className="text-info border border-info-subtle px-2 py-1 fs-11">
            {executiveBiSaaS.trialTenants} Toko Free-Trial
          </Badge>
        </div>
      </div>

      {/* 6 HERO CARDS */}
      <Row className="g-3 mb-4">
        {/* 1. MRR */}
        <Col sm={6} xl={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '3px solid #ff6c2f' }}>
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <span className="text-muted fs-11 fw-semibold text-uppercase">Monthly Recurring Revenue (MRR)</span>
                  <h3 className="fw-bold my-1 text-body fs-20">{formatRupiah(executiveBiSaaS.mrr)}</h3>
                  <div className="d-flex align-items-center fs-11 text-success fw-semibold">
                    <IconifyIcon icon="solar:arrow-up-bold" className="me-1" />
                    +{executiveBiSaaS.mrrGrowthMoM}% MoM
                    <span className="text-muted ms-1 font-monospace fw-normal">(Net New: +{formatRupiah(executiveBiSaaS.netNewMrr)})</span>
                  </div>
                </div>
                <div className="avatar-sm bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:wallet-money-bold-duotone" className="fs-22" />
                </div>
              </div>
              <hr className="my-2 border-secondary-subtle" />
              <div className="d-flex justify-content-between fs-11 text-muted">
                <span>New: <strong className="text-success">+{formatRupiah(executiveBiSaaS.newMrr)}</strong></span>
                <span>Expansion: <strong className="text-primary">+{formatRupiah(executiveBiSaaS.expansionMrr)}</strong></span>
                <span>Churn: <strong className="text-danger">-{formatRupiah(executiveBiSaaS.churnedMrr)}</strong></span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* 2. ARR */}
        <Col sm={6} xl={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '3px solid #3b82f6' }}>
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <span className="text-muted fs-11 fw-semibold text-uppercase">Annual Recurring Revenue (ARR Run-Rate)</span>
                  <h3 className="fw-bold my-1 text-primary fs-20">{formatRupiah(executiveBiSaaS.arrRunRate)}</h3>
                  <div className="fs-11 text-muted">
                    Proyeksi Akhir Tahun 2026: <strong className="text-body">{formatRupiah(executiveBiSaaS.arrProjectionYearEnd)}</strong>
                  </div>
                </div>
                <div className="avatar-sm bg-info-subtle text-info rounded-3 d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:calendar-date-bold-duotone" className="fs-22" />
                </div>
              </div>
              <hr className="my-2 border-secondary-subtle" />
              <div className="d-flex justify-content-between fs-11 text-muted">
                <span>Kontrak Berjalan: <strong>12x Run-Rate</strong></span>
                <span className="text-success fw-medium">On-Track Target Investor</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* 3. ARPU */}
        <Col sm={6} xl={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '3px solid #16a34a' }}>
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <span className="text-muted fs-11 fw-semibold text-uppercase">Avg Revenue Per User (ARPU)</span>
                  <h3 className="fw-bold my-1 text-success fs-20">{formatRupiah(executiveBiSaaS.arpu)} / toko</h3>
                  <div className="d-flex align-items-center fs-11 text-success fw-semibold">
                    <IconifyIcon icon="solar:arrow-up-bold" className="me-1" />
                    +{executiveBiSaaS.arpuGrowthYoY}% YoY (Peningkatan Adopsi Paket Pro)
                  </div>
                </div>
                <div className="avatar-sm bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:user-bold-duotone" className="fs-22" />
                </div>
              </div>
              <hr className="my-2 border-secondary-subtle" />
              <div className="d-flex justify-content-between fs-11 text-muted">
                <span>Starter: <strong>Rp 199k</strong></span>
                <span>Pro: <strong>Rp 499k</strong></span>
                <span>Enterprise: <strong>Rp 1.49M</strong></span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* 4. NRR */}
        <Col sm={6} xl={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '3px solid #8b5cf6' }}>
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <span className="text-muted fs-11 fw-semibold text-uppercase">Net Revenue Retention (NRR)</span>
                  <h3 className="fw-bold my-1 text-body fs-20">{executiveBiSaaS.nrr}%</h3>
                  <div className="fs-11 text-primary fw-medium">
                    <IconifyIcon icon="solar:star-bold" className="me-1" />
                    {executiveBiSaaS.nrrBenchmark}
                  </div>
                </div>
                <div className="avatar-sm bg-purple-subtle text-purple rounded-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                  <IconifyIcon icon="solar:infinity-bold" className="fs-22" />
                </div>
              </div>
              <hr className="my-2 border-secondary-subtle" />
              <small className="fs-11 text-muted d-block">
                Nilai belanja merchant lama tumbuh lebih besar dari angka pembatalan paket.
              </small>
            </CardBody>
          </Card>
        </Col>

        {/* 5. CUSTOMER CHURN */}
        <Col sm={6} xl={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '3px solid #eab308' }}>
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <span className="text-muted fs-11 fw-semibold text-uppercase">Customer (Logo) Churn Rate</span>
                  <h3 className="fw-bold my-1 text-body fs-20">{executiveBiSaaS.customerChurnRate}% / bln</h3>
                  <div className="fs-11 text-success fw-medium">
                    Target Sehat &lt; 2.5% ({executiveBiSaaS.customerChurnCount} toko berhenti bulan ini)
                  </div>
                </div>
                <div className="avatar-sm bg-warning-subtle text-warning rounded-3 d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:users-group-rounded-bold-duotone" className="fs-22" />
                </div>
              </div>
              <hr className="my-2 border-secondary-subtle" />
              <small className="fs-11 text-muted d-block">
                Tingkat loyalitas tinggi didukung fleksibilitas katalog 34 tema &amp; 24 layout.
              </small>
            </CardBody>
          </Card>
        </Col>

        {/* 6. REVENUE CHURN (NET NEGATIVE) */}
        <Col sm={6} xl={4}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '3px solid #10b981' }}>
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <span className="text-muted fs-11 fw-semibold text-uppercase">Revenue Churn Rate</span>
                  <h3 className="fw-bold my-1 text-success fs-20">{executiveBiSaaS.revenueChurnRate}%</h3>
                  <div className="fs-11 text-success fw-bold">
                    Net Negative Churn (Gold Standard SaaS)
                  </div>
                </div>
                <div className="avatar-sm bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:shield-check-bold-duotone" className="fs-22" />
                </div>
              </div>
              <hr className="my-2 border-secondary-subtle" />
              <small className="fs-11 text-muted d-block">
                Pendapatan ekspansi upgrade menutupi 100% nilai pembatalan langganan toko.
              </small>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* MRR WATERFALL & LTV/CAC RATIO ROW */}
      <Row className="g-3 mb-4">
        <Col lg={8}>
          <Card className="border-secondary-subtle shadow-sm h-100">
            <CardHeader className="d-flex justify-content-between align-items-center bg-transparent border-bottom py-3">
              <div>
                <h6 className="fw-bold mb-0 text-body">
                  Dekomposisi Pertumbuhan MRR Bulanan (Waterfall Decomposition)
                </h6>
                <small className="text-muted">Komparasi New MRR, Expansion MRR, Churn/Contraction, dan Total Run-Rate</small>
              </div>
              <Badge bg="primary-subtle" className="text-primary border border-primary-subtle">
                12 Bulan Terakhir
              </Badge>
            </CardHeader>
            <CardBody className="p-3">
              <ReactApexChart
                options={mrrChartOptions}
                series={mrrChartSeries}
                type="bar"
                height={320}
              />
            </CardBody>
          </Card>
        </Col>

        {/* LTV : CAC & UNIT ECONOMICS */}
        <Col lg={4}>
          <Card className="border-secondary-subtle shadow-sm h-100">
            <CardHeader className="bg-transparent border-bottom py-3">
              <h6 className="fw-bold mb-0 text-body">Unit Economics &amp; Efisiensi Modal</h6>
              <small className="text-muted">Rasio Kesehatan Investasi Pelanggan (CAC &amp; LTV)</small>
            </CardHeader>
            <CardBody className="p-3">
              {/* LTV */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted fs-12">Customer Lifetime Value (LTV):</span>
                <strong className="fs-13 text-body font-monospace">{formatRupiah(executiveBiSaaS.ltv)}</strong>
              </div>

              {/* CAC */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted fs-12">Customer Acquisition Cost (CAC):</span>
                <strong className="fs-13 text-body font-monospace">{formatRupiah(executiveBiSaaS.cac)}</strong>
              </div>

              {/* LTV / CAC */}
              <div className="p-3 rounded bg-light-subtle border mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fs-12 fw-bold text-muted text-uppercase">Rasio LTV / CAC</span>
                  <Badge bg="success" className="fs-12 fw-bold">
                    {executiveBiSaaS.ltvCacRatio}x (Sangat Unggul)
                  </Badge>
                </div>
                <ProgressBar now={85} variant="success" style={{ height: 6 }} className="mb-2" />
                <small className="text-muted fs-11 d-block">
                  Standar modal ventura tier-1 &gt; 3.0x. Indovia mencapai 7.38x berkat efek viralitas rujukan merchant.
                </small>
              </div>

              {/* CAC PAYBACK */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted fs-12">CAC Payback Period:</span>
                <Badge bg="info-subtle" className="text-info fs-12 fw-bold">
                  {executiveBiSaaS.paybackPeriodMonths} Bulan
                </Badge>
              </div>

              {/* RULE OF 40 */}
              <div className="p-3 rounded bg-primary-subtle border border-primary-subtle">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fs-12 fw-bold text-primary">SaaS Rule of 40 Index</span>
                  <strong className="text-primary fs-14">51.2%</strong>
                </div>
                <small className="text-muted fs-11">
                  (Pertumbuhan Pendapatan 37% + Margin Operasional Kas 14.2% = 51.2% &gt; 40%). Perusahaan siap ekspansi seri pendanaan baru.
                </small>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* ========================================================================= */}
      {/* 7.2 METRIK PERDAGANGAN PLATFORM (MACRO E-COMMERCE TRENDS)                  */}
      {/* ========================================================================= */}
      <div className="d-flex align-items-center justify-content-between mb-3 mt-4">
        <div>
          <h5 className="fw-bold mb-0 text-body d-flex align-items-center">
            <IconifyIcon icon="solar:shop-2-bold-duotone" className="me-2 text-success fs-20" />
            7.2 Metrik Perdagangan Platform (Macro E-Commerce Trends)
          </h5>
          <small className="text-muted">Akumulasi perputaran omset toko merchant, take-rate komisi, dan pola perilaku pembeli nasional</small>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Badge bg="primary" className="fs-11 px-2 py-1">
            Total GMV: {formatRupiah(macroCommerceTrends.totalPlatformGmv)}
          </Badge>
        </div>
      </div>

      {/* 4 MACRO COMMERCE CARDS */}
      <Row className="g-3 mb-4">
        {/* GMV */}
        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '3px solid #ff6c2f' }}>
            <CardBody className="p-3">
              <span className="text-muted fs-11 fw-semibold text-uppercase">Total Platform GMV</span>
              <h3 className="fw-bold my-1 text-body fs-18">{formatRupiah(macroCommerceTrends.totalPlatformGmv)}</h3>
              <small className="text-success fw-semibold fs-11 d-flex align-items-center">
                <IconifyIcon icon="solar:arrow-up-bold" className="me-1" />
                +{macroCommerceTrends.gmvGrowthMoM}% MoM (Omset ratusan toko)
              </small>
            </CardBody>
          </Card>
        </Col>

        {/* TAKE-RATE REVENUE */}
        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '3px solid #16a34a' }}>
            <CardBody className="p-3">
              <span className="text-muted fs-11 fw-semibold text-uppercase">Take-Rate Revenue Net</span>
              <h3 className="fw-bold my-1 text-success fs-18">{formatRupiah(macroCommerceTrends.takeRateRevenueNet)}</h3>
              <small className="text-muted fs-11">
                Blended Take-Rate: <strong>{macroCommerceTrends.blendedTakeRatePct}%</strong> dari pesanan lunas
              </small>
            </CardBody>
          </Card>
        </Col>

        {/* NATIONAL CONVERSION RATE */}
        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '3px solid #3b82f6' }}>
            <CardBody className="p-3">
              <span className="text-muted fs-11 fw-semibold text-uppercase">Tingkat Konversi Nasional</span>
              <h3 className="fw-bold my-1 text-primary fs-18">{macroCommerceTrends.nationalConversionRate}%</h3>
              <small className="text-success fw-medium fs-11">
                <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
                Di atas rata-rata industri (2.40%)
              </small>
            </CardBody>
          </Card>
        </Col>

        {/* TOTAL COMPLETED ORDERS */}
        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '3px solid #8b5cf6' }}>
            <CardBody className="p-3">
              <span className="text-muted fs-11 fw-semibold text-uppercase">Total Pesanan Sukses</span>
              <h3 className="fw-bold my-1 text-body fs-18">{macroCommerceTrends.totalCompletedOrders.toLocaleString()} Trx</h3>
              <small className="text-muted fs-11">
                Average Order Value (AOV): <strong>{formatRupiah(macroCommerceTrends.aovAverage)}</strong>
              </small>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* HEATMAP DEMOGRAFI & JAM SIBUK CHECKOUT NASIONAL */}
      <Row className="g-3 mb-4">
        {/* HEATMAP DEMOGRAFI: JABODETABEK VS NON-JAWA */}
        <Col lg={6}>
          <Card className="border-secondary-subtle shadow-sm h-100">
            <CardHeader className="d-flex justify-content-between align-items-center bg-transparent border-bottom py-3">
              <div>
                <h6 className="fw-bold mb-0 text-body">
                  Heatmap Demografi: Konsentrasi Penjualan Antar-Provinsi
                </h6>
                <small className="text-muted">Peta sebaran transaksi: Jabodetabek vs Non-Jabodetabek Jawa vs Luar Jawa</small>
              </div>
              <Form.Select
                size="sm"
                className="w-auto fs-11"
                value={selectedGeoRegion}
                onChange={(e) => setSelectedGeoRegion(e.target.value)}
              >
                <option value="ALL">Semua Wilayah</option>
                <option value="JABODETABEK">Hanya Jabodetabek</option>
                <option value="JAWA">Pulau Jawa</option>
                <option value="LUAR_JAWA">Luar Pulau Jawa</option>
              </Form.Select>
            </CardHeader>
            <CardBody className="p-3">
              {/* 3 REGION PILL PROGRESS BARS */}
              <div className="mb-3">
                <div className="d-flex justify-content-between fs-12 mb-1">
                  <span>
                    <strong className="text-primary">Jabodetabek</strong> ({demographicHeatmapData.summary.jabodetabek.pct}%)
                  </span>
                  <span>
                    <strong className="text-info">Jawa (Non-Jabodetabek)</strong> ({demographicHeatmapData.summary.nonJawaIsland.pct}%)
                  </span>
                  <span>
                    <strong className="text-success">Luar Jawa</strong> ({demographicHeatmapData.summary.luarJawa.pct}%)
                  </span>
                </div>
                <ProgressBar className="rounded-pill" style={{ height: 10 }}>
                  <ProgressBar now={54.2} variant="primary" key={1} />
                  <ProgressBar now={28.6} variant="info" key={2} />
                  <ProgressBar now={17.2} variant="success" key={3} />
                </ProgressBar>
              </div>

              {/* INSIGHT CARD */}
              <div className="alert alert-light border py-2 px-3 mb-3 fs-11 text-muted">
                <IconifyIcon icon="solar:info-circle-bold" className="me-1 text-primary" />
                <strong>Temuan Makro:</strong> Pelanggan Luar Jawa memiliki keranjang belanja <strong>+35% lebih tinggi (AOV Rp 406.000)</strong> untuk memaksimalkan efisiensi subsidi ongkos kirim.
              </div>

              {/* PROVINCES TABLE */}
              <div className="table-responsive" style={{ maxHeight: 250, overflowY: 'auto' }}>
                <Table className="table-sm table-hover align-middle mb-0 fs-12">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th>Provinsi / Wilayah</th>
                      <th className="text-end">Omzet GMV</th>
                      <th className="text-center">Share</th>
                      <th className="text-end">AOV</th>
                      <th className="text-end">Pertumbuhan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProvinces.map((prov, idx) => (
                      <tr key={idx}>
                        <td className="fw-medium">
                          <span className="me-1 text-muted fs-11">#{idx + 1}</span> {prov.name}
                        </td>
                        <td className="text-end font-monospace">{formatRupiah(prov.gmv)}</td>
                        <td className="text-center">
                          <Badge bg="light" className="text-dark border">
                            {prov.gmvShare}%
                          </Badge>
                        </td>
                        <td className="text-end font-monospace">{formatRupiah(prov.aov)}</td>
                        <td className="text-end text-success fw-semibold">{prov.growth}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* POLA WAKTU BELANJA: JAM SIBUK CHECKOUT NASIONAL */}
        <Col lg={6}>
          <Card className="border-secondary-subtle shadow-sm h-100">
            <CardHeader className="d-flex justify-content-between align-items-center bg-transparent border-bottom py-3">
              <div>
                <h6 className="fw-bold mb-0 text-body">
                  Pola Waktu Belanja: Analisis Jam Sibuk Checkout Nasional
                </h6>
                <small className="text-muted">Distribusi transaksi 24 jam (WIB) untuk rekomendasi autoscaling backend</small>
              </div>
              <Badge bg="warning-subtle" className="text-warning border border-warning-subtle">
                Peak: 19:00 - 21:30 WIB
              </Badge>
            </CardHeader>
            <CardBody className="p-3">
              {/* HOURLY CHART */}
              <ReactApexChart
                options={hourlyChartOptions}
                series={hourlyChartSeries}
                type="area"
                height={210}
              />

              {/* AUTOSCALING RECOMMENDATION CALLOUT */}
              <div className="p-3 mt-3 rounded bg-dark text-white border">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center">
                    <div className="avatar-xs bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center me-2">
                      <IconifyIcon icon="solar:server-square-bold" className="fs-16" />
                    </div>
                    <span className="fw-bold fs-12 text-warning">
                      Rekomendasi Autoscaling Infrastruktur Golang
                    </span>
                  </div>
                  <Badge bg="success" className="fs-10">
                    SLA Target: P99 &lt; 35ms
                  </Badge>
                </div>
                <p className="fs-11 text-white-50 mb-2">
                  {peakShoppingHoursData.infrastructureRecommendation.actionPrompt}
                </p>
                <div className="d-flex flex-wrap gap-3 fs-11 text-light">
                  <span>Base Pods: <strong>{peakShoppingHoursData.infrastructureRecommendation.currentBasePods} Pods</strong></span>
                  <span>Target Auto-scale: <strong className="text-warning">{peakShoppingHoursData.infrastructureRecommendation.recommendedPods} Pods</strong></span>
                  <span>Jendela Pemanasan: <strong>18:30 WIB</strong></span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* ========================================================================= */}
      {/* 7.3 PELAPORAN & REKONSILIASI PAJAK (INDONESIAN TAX COMPLIANCE)             */}
      {/* ========================================================================= */}
      <Card className="border-secondary-subtle shadow-sm mb-4">
        <CardHeader className="d-flex justify-content-between align-items-center bg-transparent border-bottom py-3">
          <div>
            <h5 className="fw-bold mb-0 text-body d-flex align-items-center">
              <IconifyIcon icon="solar:document-medicine-bold-duotone" className="me-2 text-danger fs-20" />
              7.3 Pelaporan &amp; Rekonsiliasi Pajak SAK Indonesia
            </h5>
            <small className="text-muted">Kalkulasi otomatis PPN 11% atas sewa software SaaS, penerbitan e-Faktur, dan pelaporan SPT Masa PPN 1111</small>
          </div>
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center fs-12"
            onClick={() => setShowTaxModal(true)}
          >
            <IconifyIcon icon="solar:eye-bold" className="me-1" />
            Buka Lembar Rekonsiliasi Lengkap
          </Button>
        </CardHeader>
        <CardBody className="p-3">
          <Row className="g-3 align-items-center">
            {/* DPP */}
            <Col sm={6} lg={3}>
              <div className="p-3 border rounded bg-light-subtle">
                <span className="text-muted fs-11 text-uppercase fw-semibold">Dasar Pengenaan Pajak (DPP)</span>
                <h5 className="fw-bold my-1 text-body font-monospace">{formatRupiah(taxAndComplianceData.dppSaaSRevenue)}</h5>
                <small className="text-muted fs-11">Omzet Langganan SaaS Sebelum PPN</small>
              </div>
            </Col>

            {/* PPN KELUARAN 11% */}
            <Col sm={6} lg={3}>
              <div className="p-3 border rounded bg-light-subtle">
                <span className="text-muted fs-11 text-uppercase fw-semibold">PPN Keluaran Terutang (11%)</span>
                <h5 className="fw-bold my-1 text-danger font-monospace">+{formatRupiah(taxAndComplianceData.ppnOutput11Pct)}</h5>
                <small className="text-success fs-11">
                  <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
                  e-Faktur DJP Otomatis Terbit
                </small>
              </div>
            </Col>

            {/* KREDIT PPN MASUKAN */}
            <Col sm={6} lg={3}>
              <div className="p-3 border rounded bg-light-subtle">
                <span className="text-muted fs-11 text-uppercase fw-semibold">Kredit PPN Masukan (Cloud/Server)</span>
                <h5 className="fw-bold my-1 text-success font-monospace">-{formatRupiah(taxAndComplianceData.ppnInputCredited)}</h5>
                <small className="text-muted fs-11">Faktur Masukan Cloud AWS/GCP</small>
              </div>
            </Col>

            {/* PPN KURANG BAYAR */}
            <Col sm={6} lg={3}>
              <div className="p-3 border rounded bg-primary-subtle border-primary-subtle">
                <span className="text-primary fs-11 text-uppercase fw-bold">PPN Kurang Bayar (Setor Kas Negara)</span>
                <h5 className="fw-bold my-1 text-primary font-monospace">{formatRupiah(taxAndComplianceData.ppnNetPayable)}</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <Badge bg="success" className="fs-10">Status: Siap Lapor DJP</Badge>
                  <span className="text-muted fs-10">Batas: {taxAndComplianceData.taxReportingDueDate}</span>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* MODALS */}
      <TaxReconciliationModal show={showTaxModal} onHide={() => setShowTaxModal(false)} />
      <AccountingExportModal show={showExportModal} onHide={() => setShowExportModal(false)} />
    </div>
  );
};

export default ExecutiveBiAnalyticsTab;
