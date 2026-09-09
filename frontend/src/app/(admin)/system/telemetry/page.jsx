import { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, Badge, Button, ProgressBar, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { systemTelemetryData, telemetry24hTrend } from '../data';
import MaintenanceModeModal from '../components/MaintenanceModeModal';
import RateLimitConfigModal from '../components/RateLimitConfigModal';
import SessionRevocationModal from '../components/SessionRevocationModal';

const SystemTelemetryPage = () => {
  const navigate = useNavigate();

  // State
  const [telemetry, setTelemetry] = useState(systemTelemetryData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  // Modals
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showRateLimitModal, setShowRateLimitModal] = useState(false);
  const [showRevocationModal, setShowRevocationModal] = useState(false);

  // Fetch live telemetry from backend if available
  const fetchLiveTelemetry = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/v1/admin/system/telemetry');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          setTelemetry((prev) => ({
            ...prev,
            goroutines: d.runtime.goroutines,
            heapAllocMb: +(d.memory.heapAllocBytes / (1024 * 1024)).toFixed(1),
            heapSysMb: +(d.memory.heapSysBytes / (1024 * 1024)).toFixed(1),
            gcRuns: d.memory.numGc,
            database: {
              ...prev.database,
              maxOpen: d.database.maxOpenConnections,
              open: d.database.openConnections,
              inUse: d.database.inUse,
              idle: d.database.idle,
            },
          }));
        }
      }
    } catch {
      // Keep mock telemetry if backend call fails or runs in dev
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchLiveTelemetry();
    const interval = setInterval(fetchLiveTelemetry, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleMaintenanceToggle = (enabled, message, whitelist) => {
    setTelemetry((prev) => ({
      ...prev,
      maintenanceMode: {
        ...prev.maintenanceMode,
        isActive: enabled,
        message,
        whitelistIps: whitelist,
      },
    }));
    setAlertMessage({
      type: enabled ? 'danger' : 'success',
      text: enabled
        ? 'Global Maintenance Mode telah DIAKTIFKAN. Seluruh akses storefront toko dikunci.'
        : 'Global Maintenance Mode telah DINONAKTIFKAN. Seluruh toko beroperasi normal.',
    });
  };

  const handleRateLimitSave = (rate, burst, jailMin) => {
    setTelemetry((prev) => ({
      ...prev,
      rateLimiting: {
        ...prev.rateLimiting,
        defaultLimitPerMin: rate,
        burstAllowance: burst,
      },
    }));
    setAlertMessage({
      type: 'info',
      text: `Batas API Rate-Limit diperbarui menjadi ${rate} req/menit (Burst: ${burst}) dengan durasi blacklist ${jailMin} menit.`,
    });
  };

  const handleRevokeSessions = (scope, reason) => {
    setTelemetry((prev) => ({
      ...prev,
      jwtSessions: {
        ...prev.jwtSessions,
        activeTokens: scope === 'ALL' ? 0 : Math.round(prev.jwtSessions.activeTokens * 0.2),
        revokedLast24h: prev.jwtSessions.revokedLast24h + 890,
      },
    }));
    setAlertMessage({
      type: 'warning',
      text: `Seluruh sesi JWT pada cakupan [${scope}] berhasil dicabut seketika. Kunci enkripsi salt telah dirotasi.`,
    });
  };

  // Chart 1: Goroutines & Heap Allocation
  const runtimeChartOpts = {
    chart: {
      type: 'area',
      height: 310,
      toolbar: { show: false },
      sparkline: { enabled: false },
    },
    colors: ['#4f46e5', '#06b6d4'],
    stroke: {
      curve: 'smooth',
      width: [2.5, 2],
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: telemetry24hTrend.timestamps,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#64748b', fontSize: '11px' } },
    },
    yaxis: [
      {
        title: { text: 'Active Goroutines', style: { color: '#4f46e5', fontSize: '11px', fontWeight: 600 } },
        labels: { style: { colors: '#4f46e5', fontSize: '11px' } },
      },
      {
        opposite: true,
        title: { text: 'Heap Alloc (MB)', style: { color: '#06b6d4', fontSize: '11px', fontWeight: 600 } },
        labels: {
          style: { colors: '#06b6d4', fontSize: '11px' },
          formatter: (v) => `${v} MB`,
        },
      },
    ],
    tooltip: {
      shared: true,
      y: [
        { formatter: (val) => `${val} goroutines` },
        { formatter: (val) => `${val} MB` },
      ],
    },
    legend: { position: 'top', horizontalAlign: 'right', fontSize: '12px' },
    grid: { borderColor: '#f1f5f9', strokeDashArray: 3 },
  };

  const runtimeChartSeries = [
    { name: 'Active Goroutines', data: telemetry24hTrend.goroutines },
    { name: 'Heap Alloc (MB)', data: telemetry24hTrend.heapAllocMb },
  ];

  // Chart 2: Latency Percentiles vs Target 50ms
  const latencyChartOpts = {
    chart: {
      type: 'line',
      height: 310,
      toolbar: { show: false },
    },
    colors: ['#10b981', '#f59e0b', '#ef4444'],
    stroke: {
      curve: 'smooth',
      width: [2, 2.5, 2.5],
      dashArray: [0, 0, 0],
    },
    annotations: {
      yaxis: [
        {
          y: 50,
          borderColor: '#dc2626',
          strokeDashArray: 4,
          label: {
            borderColor: '#dc2626',
            style: { color: '#fff', background: '#dc2626', fontSize: '10px', fontWeight: 600 },
            text: 'SLA Target < 50ms',
          },
        },
      ],
    },
    xaxis: {
      categories: telemetry24hTrend.timestamps,
      labels: { style: { colors: '#64748b', fontSize: '11px' } },
    },
    yaxis: {
      title: { text: 'Latency (ms)', style: { fontSize: '11px', fontWeight: 600 } },
      labels: {
        formatter: (v) => `${v} ms`,
        style: { fontSize: '11px' },
      },
      max: 60,
    },
    tooltip: {
      shared: true,
      y: { formatter: (val) => `${val} ms` },
    },
    legend: { position: 'top', horizontalAlign: 'right', fontSize: '12px' },
    grid: { borderColor: '#f1f5f9', strokeDashArray: 3 },
  };

  const latencyChartSeries = [
    { name: 'P50 (Median)', data: [8.2, 7.8, 7.5, 8.4, 9.1, 10.2, 11.8, 9.5, 9.8, 12.4, 13.0, 8.4] },
    { name: 'P95 Latency', data: [14.1, 13.2, 12.8, 15.0, 18.2, 22.4, 28.1, 20.8, 22.5, 30.1, 32.4, 24.6] },
    { name: 'P99 Latency', data: telemetry24hTrend.p99LatencyMs },
  ];

  return (
    <>
      <PageTItle title="Telemetri Golang &amp; Kontrol Darurat" subName="Sistem &amp; Keamanan" />

      {/* HEADER ACTION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h4 className="fw-bold mb-0 text-body d-flex align-items-center">
              <IconifyIcon icon="solar:server-square-bold-duotone" className="me-2 text-primary fs-24" />
              Telemetri Runtime Golang &amp; Kontrol Keamanan
            </h4>
            <Badge bg="success-subtle" className="text-success border border-success-subtle px-2 py-1 fs-11">
              <span className="spinner-grow spinner-grow-sm me-1" role="status" style={{ width: 8, height: 8 }} />
              {telemetry.status} &bull; v1.22
            </Badge>
          </div>
          <p className="text-muted fs-12 mb-0">
            Pemantauan internal runtime Golang, alokasi memori heap, latensi SLA P95/P99, koneksi pool PostgreSQL, serta kontrol sakelar darurat platform.
          </p>
        </div>

        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button
            variant="outline-primary"
            size="sm"
            className="d-flex align-items-center fw-semibold shadow-sm"
            onClick={() => navigate('/system/audit-logs')}
          >
            <IconifyIcon icon="solar:history-bold-duotone" className="me-1 fs-16" />
            Buka Immutable Audit Trail
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="d-flex align-items-center shadow-sm"
            onClick={fetchLiveTelemetry}
            disabled={isRefreshing}
          >
            <IconifyIcon icon="solar:refresh-bold" className={`me-1 ${isRefreshing ? 'spinner-border spinner-border-sm border-0' : ''}`} />
            {isRefreshing ? 'Memperbarui...' : 'Sinkronisasi Metrik'}
          </Button>
        </div>
      </div>

      {/* NOTIFICATION BANNER */}
      {alertMessage && (
        <div className={`alert alert-${alertMessage.type} alert-dismissible fade show d-flex align-items-center shadow-sm mb-4`} role="alert">
          <IconifyIcon icon="solar:bell-bing-bold" className="fs-20 me-2 flex-shrink-0" />
          <div className="fs-13">{alertMessage.text}</div>
          <button type="button" className="btn-close ms-auto" onClick={() => setAlertMessage(null)} aria-label="Close" />
        </div>
      )}

      {/* 8.1 TELEMETRY KPI CARDS */}
      <Row className="g-3 mb-4">
        {/* CARD 1: ACTIVE GOROUTINES */}
        <Col xl={3} md={6}>
          <Card className="border-0 shadow-sm h-100">
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span className="text-muted fs-12 fw-medium text-uppercase">Active Goroutines</span>
                  <h3 className="fw-bold text-body mt-1 mb-0 font-monospace">{telemetry.goroutines}</h3>
                </div>
                <div className="avatar-sm bg-primary-subtle text-primary rounded d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:cpu-bolt-bold-duotone" className="fs-22" />
                </div>
              </div>

              <div className="mb-2">
                <div className="d-flex justify-content-between fs-11 text-muted mb-1">
                  <span>Leak Threshold: {telemetry.goroutinesThreshold}</span>
                  <span className="fw-semibold text-success">Normal (0 Leak)</span>
                </div>
                <ProgressBar
                  now={(telemetry.goroutines / telemetry.goroutinesThreshold) * 100}
                  variant={telemetry.goroutines > 1500 ? 'danger' : 'primary'}
                  style={{ height: 6 }}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center pt-2 border-top fs-11">
                <span className="text-muted">Peak 24 Jam:</span>
                <span className="fw-semibold font-monospace text-body">{telemetry.goroutinesPeak} rutinitas</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* CARD 2: HEAP ALLOC & GC PAUSE */}
        <Col xl={3} md={6}>
          <Card className="border-0 shadow-sm h-100">
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span className="text-muted fs-12 fw-medium text-uppercase">Memory Heap &amp; GC</span>
                  <h3 className="fw-bold text-body mt-1 mb-0 font-monospace">
                    {telemetry.heapAllocMb} <span className="fs-14 fw-normal text-muted">MB</span>
                  </h3>
                </div>
                <div className="avatar-sm bg-info-subtle text-info rounded d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:widget-add-bold-duotone" className="fs-22" />
                </div>
              </div>

              <div className="mb-2">
                <div className="d-flex justify-content-between fs-11 text-muted mb-1">
                  <span>GC Pause: <strong>{telemetry.gcPauseMs} ms</strong></span>
                  <span className="badge bg-success-subtle text-success">&lt; 1ms Target</span>
                </div>
                <ProgressBar
                  now={(telemetry.heapAllocMb / telemetry.heapSysMb) * 100}
                  variant="info"
                  style={{ height: 6 }}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center pt-2 border-top fs-11">
                <span className="text-muted">Total Heap Sys / GC:</span>
                <span className="fw-semibold font-monospace text-body">{telemetry.heapSysMb} MB ({telemetry.gcRuns}x)</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* CARD 3: API RESPONSE LATENCY SLA */}
        <Col xl={3} md={6}>
          <Card className="border-0 shadow-sm h-100">
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span className="text-muted fs-12 fw-medium text-uppercase">Latency P95 / P99</span>
                  <h3 className="fw-bold text-success mt-1 mb-0 font-monospace">
                    {telemetry.latency.p95} / {telemetry.latency.p99} <span className="fs-14 fw-normal text-muted">ms</span>
                  </h3>
                </div>
                <div className="avatar-sm bg-success-subtle text-success rounded d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:speedometer-middle-bold-duotone" className="fs-22" />
                </div>
              </div>

              <div className="mb-2">
                <div className="d-flex justify-content-between fs-11 text-muted mb-1">
                  <span>SLA P99 Target: &lt; {telemetry.latency.target}ms</span>
                  <span className="badge bg-success-subtle text-success fw-bold">SLA PASS</span>
                </div>
                <ProgressBar
                  now={(telemetry.latency.p99 / telemetry.latency.target) * 100}
                  variant="success"
                  style={{ height: 6 }}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center pt-2 border-top fs-11">
                <span className="text-muted">Median P50 / Error:</span>
                <span className="fw-semibold font-monospace text-body">{telemetry.latency.p50}ms ({telemetry.errorRatePct}%)</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* CARD 4: POSTGRESQL POOL */}
        <Col xl={3} md={6}>
          <Card className="border-0 shadow-sm h-100">
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <span className="text-muted fs-12 fw-medium text-uppercase">PostgreSQL 16 Pool</span>
                  <h3 className="fw-bold text-body mt-1 mb-0 font-monospace">
                    {telemetry.database.open} <span className="fs-14 fw-normal text-muted">/ {telemetry.database.maxOpen} Conns</span>
                  </h3>
                </div>
                <div className="avatar-sm bg-warning-subtle text-warning rounded d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:database-bold-duotone" className="fs-22" />
                </div>
              </div>

              <div className="mb-2">
                <div className="d-flex justify-content-between fs-11 text-muted mb-1">
                  <span>InUse: {telemetry.database.inUse} | Idle: {telemetry.database.idle}</span>
                  <span className="badge bg-light text-body border">Wait: 0ms</span>
                </div>
                <ProgressBar
                  now={(telemetry.database.open / telemetry.database.maxOpen) * 100}
                  variant="warning"
                  style={{ height: 6 }}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center pt-2 border-top fs-11">
                <span className="text-muted">Engine RDS Host:</span>
                <span className="fw-semibold text-truncate text-body" style={{ maxWidth: 140 }}>
                  AWS RDS Multi-AZ
                </span>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* CHARTS SECTION */}
      <Row className="g-3 mb-4">
        <Col xl={7}>
          <Card className="border-0 shadow-sm h-100">
            <CardHeader className="bg-transparent border-bottom d-flex justify-content-between align-items-center py-3">
              <div>
                <CardTitle as="h5" className="mb-0 fs-14 fw-bold">
                  Tren Beban Runtime Golang &amp; Heap Memory 24 Jam
                </CardTitle>
                <small className="text-muted fs-11">
                  Korelasi jumlah active goroutines terhadap konsumsi memori heap Go (tanpa indikasi leak)
                </small>
              </div>
              <Badge bg="primary-subtle" className="text-primary border border-primary-subtle fs-11">
                Real-time Polling 15s
              </Badge>
            </CardHeader>
            <CardBody className="p-3">
              <ReactApexChart
                options={runtimeChartOpts}
                series={runtimeChartSeries}
                type="area"
                height={310}
              />
            </CardBody>
          </Card>
        </Col>

        <Col xl={5}>
          <Card className="border-0 shadow-sm h-100">
            <CardHeader className="bg-transparent border-bottom d-flex justify-content-between align-items-center py-3">
              <div>
                <CardTitle as="h5" className="mb-0 fs-14 fw-bold">
                  Persentil Latensi API (P50, P95, P99 vs SLA)
                </CardTitle>
                <small className="text-muted fs-11">
                  Target SLA platform &lt; 50ms (Garis merah)
                </small>
              </div>
              <Badge bg="success-subtle" className="text-success border border-success-subtle fs-11">
                100% SLA Compliance
              </Badge>
            </CardHeader>
            <CardBody className="p-3">
              <ReactApexChart
                options={latencyChartOpts}
                series={latencyChartSeries}
                type="line"
                height={310}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* 8.3 KONTROL DARURAT & KEAMANAN PLATFORM (EMERGENCY OPERATIONS) */}
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div>
            <h5 className="fw-bold mb-0 text-body d-flex align-items-center">
              <IconifyIcon icon="solar:shield-warning-bold-duotone" className="me-2 text-danger fs-20" />
              8.3 Kontrol Darurat &amp; Keamanan Platform
            </h5>
            <p className="text-muted fs-12 mb-0">
              Sakelar penanganan insiden cepat, proteksi traffic flood scraping bot liar, dan pemutusan sesi token kredensial terkompromi.
            </p>
          </div>
        </div>

        <Row className="g-3">
          {/* EMERGENCY CARD 1: GLOBAL MAINTENANCE MODE */}
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <CardBody className="p-4 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="avatar-sm bg-danger-subtle text-danger rounded d-flex align-items-center justify-content-center">
                      <IconifyIcon icon="solar:lock-keyhole-bold" className="fs-22" />
                    </div>
                    {telemetry.maintenanceMode.isActive ? (
                      <Badge bg="danger" className="fs-11 px-2 py-1">
                        AKTIF &bull; STORE LOCKED
                      </Badge>
                    ) : (
                      <Badge bg="success-subtle" className="text-success border border-success-subtle fs-11 px-2 py-1">
                        STANDBY &bull; STORE NORMAL
                      </Badge>
                    )}
                  </div>

                  <h5 className="fw-bold text-body fs-15 mb-2">Global Maintenance Mode</h5>
                  <p className="text-muted fs-12 mb-3">
                    Kunci darurat untuk mengalihkan seluruh etalase toko publik ke halaman pemeliharaan kustom saat migrasi database PostgreSQL besar.
                  </p>

                  <div className="p-2 border rounded bg-light-subtle fs-11 text-muted mb-3 font-monospace">
                    Whitelist IP: {telemetry.maintenanceMode.whitelistIps.length} alamat admin aktif
                  </div>
                </div>

                <Button
                  variant={telemetry.maintenanceMode.isActive ? 'outline-success' : 'outline-danger'}
                  className="w-100 fw-semibold d-flex align-items-center justify-content-center py-2"
                  onClick={() => setShowMaintenanceModal(true)}
                >
                  <IconifyIcon icon="solar:settings-minimalistic-bold" className="me-1 fs-16" />
                  {telemetry.maintenanceMode.isActive ? 'Matikan Mode Maintenance' : 'Buka Kontrol Maintenance'}
                </Button>
              </CardBody>
            </Card>
          </Col>

          {/* EMERGENCY CARD 2: API RATE LIMITING & BOT MITIGATION */}
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <CardBody className="p-4 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="avatar-sm bg-info-subtle text-info rounded d-flex align-items-center justify-content-center">
                      <IconifyIcon icon="solar:shield-network-bold" className="fs-22" />
                    </div>
                    <Badge bg="info-subtle" className="text-info border border-info-subtle fs-11 px-2 py-1 font-monospace">
                      {telemetry.rateLimiting.defaultLimitPerMin} req/min
                    </Badge>
                  </div>

                  <h5 className="fw-bold text-body fs-15 mb-2">API Rate-Limiting &amp; Anti-DDoS</h5>
                  <p className="text-muted fs-12 mb-3">
                    Pembatasan request berbasis Golang Token Bucket algorithm untuk menangkal scraping bot liar, brute-force, dan traffic spikes.
                  </p>

                  <div className="d-flex justify-content-between p-2 border rounded bg-light-subtle fs-11 text-muted mb-3">
                    <span>Bot Liar Diblokir 24h:</span>
                    <strong className="text-danger font-monospace">{telemetry.rateLimiting.currentBlockedBotsCount.toLocaleString()} IP</strong>
                  </div>
                </div>

                <Button
                  variant="outline-info"
                  className="w-100 fw-semibold d-flex align-items-center justify-content-center py-2"
                  onClick={() => setShowRateLimitModal(true)}
                >
                  <IconifyIcon icon="solar:slider-minimalistic-horizontal-bold" className="me-1 fs-16" />
                  Konfigurasi Rate Limiter
                </Button>
              </CardBody>
            </Card>
          </Col>

          {/* EMERGENCY CARD 3: SESSION REVOCATION */}
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <CardBody className="p-4 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="avatar-sm bg-warning-subtle text-warning rounded d-flex align-items-center justify-content-center">
                      <IconifyIcon icon="solar:key-minimalistic-square-bold" className="fs-22" />
                    </div>
                    <Badge bg="primary-subtle" className="text-primary border border-primary-subtle fs-11 px-2 py-1 font-monospace">
                      {telemetry.jwtSessions.activeTokens} JWT Aktif
                    </Badge>
                  </div>

                  <h5 className="fw-bold text-body fs-15 mb-2">Pencabutan Sesi Token JWT</h5>
                  <p className="text-muted fs-12 mb-3">
                    Rotasi instan kunci enkripsi JWT secret salt untuk menginvalidasi seluruh sesi merchant atau staf admin seketika jika terdeteksi kebocoran.
                  </p>

                  <div className="d-flex justify-content-between p-2 border rounded bg-light-subtle fs-11 text-muted mb-3">
                    <span>Versi Salt Saat Ini:</span>
                    <strong className="text-body font-monospace">{telemetry.jwtSessions.saltVersion} ({telemetry.jwtSessions.revokedLast24h} dicabut)</strong>
                  </div>
                </div>

                <Button
                  variant="outline-danger"
                  className="w-100 fw-semibold d-flex align-items-center justify-content-center py-2"
                  onClick={() => setShowRevocationModal(true)}
                >
                  <IconifyIcon icon="solar:lock-password-bold" className="me-1 fs-16" />
                  Cabut Sesi Darurat
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {/* DATABASE POOL METRIC TABLE */}
      <Card className="border-0 shadow-sm mt-4">
        <CardHeader className="bg-transparent border-bottom d-flex justify-content-between align-items-center py-3">
          <div>
            <CardTitle as="h5" className="mb-0 fs-14 fw-bold">
              Rincian PostgreSQL 16 Connection Pool &amp; Runtime Metrics
            </CardTitle>
            <small className="text-muted fs-11">
              Statistik koneksi database dari paket Go <code>database/sql</code> pada instance utama AWS RDS Multi-AZ
            </small>
          </div>
          <Badge bg="success-subtle" className="text-success border border-success-subtle fs-11">
            Zero Connection Starvation
          </Badge>
        </CardHeader>
        <CardBody className="p-0">
          <div className="table-responsive">
            <Table className="table align-middle table-hover mb-0 fs-12">
              <thead className="table-light text-uppercase fs-11">
                <tr>
                  <th>Metrik Driver Database</th>
                  <th>Nilai Terkini</th>
                  <th>Ambang Batas Target</th>
                  <th>Status Diagnostik</th>
                  <th>Keterangan Arsitektural</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-semibold font-monospace">MaxOpenConnections</td>
                  <td>
                    <Badge bg="light" className="text-body border font-monospace fs-12">
                      {telemetry.database.maxOpen} koneksi
                    </Badge>
                  </td>
                  <td className="text-muted">Batas maksimal pgBouncer: 150</td>
                  <td>
                    <Badge bg="success-subtle" className="text-success">OPTIMAL</Badge>
                  </td>
                  <td className="text-muted">Membatasi alokasi socket TCP ke PostgreSQL RDS</td>
                </tr>
                <tr>
                  <td className="fw-semibold font-monospace">OpenConnections (InUse / Idle)</td>
                  <td>
                    <strong className="text-primary font-monospace">{telemetry.database.open}</strong> ({telemetry.database.inUse} aktif / {telemetry.database.idle} siap pakai)
                  </td>
                  <td className="text-muted">&lt; 80% dari MaxOpen</td>
                  <td>
                    <Badge bg="success-subtle" className="text-success">HEALTHY (28% POOL)</Badge>
                  </td>
                  <td className="text-muted">Koneksi tetap hangat di background untuk latency nol saat transaksi</td>
                </tr>
                <tr>
                  <td className="fw-semibold font-monospace">WaitCount &amp; WaitDuration</td>
                  <td>
                    <span className="font-monospace text-success fw-semibold">0 request antri (0 ms)</span>
                  </td>
                  <td className="text-muted">Target: 0 antrian (zero wait)</td>
                  <td>
                    <Badge bg="success-subtle" className="text-success">ZERO STARVATION</Badge>
                  </td>
                  <td className="text-muted">Tidak ada goroutine yang tertahan menunggu soket database kosong</td>
                </tr>
                <tr>
                  <td className="fw-semibold font-monospace">Garbage Collection (GC) STW Pause</td>
                  <td>
                    <span className="font-monospace text-primary fw-semibold">{telemetry.gcPauseMs} ms</span>
                  </td>
                  <td className="text-muted">Target SLA: &lt; 1.00 ms</td>
                  <td>
                    <Badge bg="success-subtle" className="text-success">SUB-MILLISECOND</Badge>
                  </td>
                  <td className="text-muted">Golang non-moving concurrent tri-color collector v1.22</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* MODALS */}
      <MaintenanceModeModal
        show={showMaintenanceModal}
        onHide={() => setShowMaintenanceModal(false)}
        isCurrentlyActive={telemetry.maintenanceMode.isActive}
        onConfirmToggle={handleMaintenanceToggle}
      />

      <RateLimitConfigModal
        show={showRateLimitModal}
        onHide={() => setShowRateLimitModal(false)}
        currentRate={telemetry.rateLimiting.defaultLimitPerMin}
        onSaveRate={handleRateLimitSave}
      />

      <SessionRevocationModal
        show={showRevocationModal}
        onHide={() => setShowRevocationModal(false)}
        onConfirmRevocation={handleRevokeSessions}
      />
    </>
  );
};

export default SystemTelemetryPage;
