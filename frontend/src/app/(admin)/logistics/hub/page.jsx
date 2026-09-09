// src/app/(admin)/logistics/hub/page.jsx
import React, { useState } from 'react';
import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Badge,
  Form,
  Alert,
  InputGroup,
} from 'react-bootstrap';
import LogisticsApiConfigModal from '../components/LogisticsApiConfigModal';
import CourierKillSwitchModal from '../components/CourierKillSwitchModal';
import MarginAdjustmentModal from '../components/MarginAdjustmentModal';
import {
  formatRupiah,
  logisticsKpiSummary,
  nationalCouriers,
  logisticsGlobalConfig,
  sampleShippingRates,
} from '../data';

const LogisticsHubPage = () => {
  // Modal states
  const [showApiModal, setShowApiModal] = useState(false);
  const [showMarginModal, setShowMarginModal] = useState(false);
  const [killSwitchCourier, setKillSwitchCourier] = useState(null);

  // Data states
  const [couriers, setCouriers] = useState(nationalCouriers);
  const [marginInfo, setMarginInfo] = useState({
    type: logisticsGlobalConfig.platformMarginType,
    amount: logisticsGlobalConfig.platformMarginAmount,
    purpose: logisticsGlobalConfig.insuranceFundAllocation,
  });
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [incidentDismissed, setIncidentDismissed] = useState(false);

  // Rate calculator simulation states
  const [calcOrigin, setCalcOrigin] = useState('Kec. Gambir, Kota Jakarta Pusat, DKI Jakarta');
  const [calcDestination, setCalcDestination] = useState('Kec. Wonokromo, Kota Surabaya, Jawa Timur');
  const [calcWeight, setCalcWeight] = useState(1000);
  const [isSimulatingRate, setIsSimulatingRate] = useState(false);
  const [ratesList, setRatesList] = useState(sampleShippingRates);

  // Filter couriers
  const filteredCouriers = couriers.filter((courier) => {
    const matchesSearch =
      courier.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      courier.code.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory =
      categoryFilter === 'ALL' || courier.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Check if any courier has active kill switch / overload incident
  const incidentCouriers = couriers.filter((c) => c.status === 'MAINTENANCE_OVERLOAD');

  // Handle Kill Switch Toggle
  const handleToggleCourierStatus = ({ courierId, newStatus, reason }) => {
    setCouriers((prev) =>
      prev.map((c) => {
        if (c.id === courierId) {
          const isNowOverload = newStatus === 'MAINTENANCE_OVERLOAD';
          return {
            ...c,
            status: newStatus,
            services: c.services.map((s) => ({ ...s, active: !isNowOverload })),
            incidentAlert: isNowOverload
              ? {
                  title: `Penonaktifan Darurat (${c.name})`,
                  description: reason,
                  severity: 'WARNING',
                  since: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
                }
              : null,
          };
        }
        return c;
      })
    );

    // Also update rate simulation availability for this courier
    setRatesList((prev) =>
      prev.map((r) => {
        const matchingCourier = couriers.find((c) => c.id === courierId);
        if (matchingCourier && r.courierName.includes(matchingCourier.code)) {
          return {
            ...r,
            status: newStatus === 'MAINTENANCE_OVERLOAD' ? 'DISABLED_KILL_SWITCH' : 'ACTIVE',
          };
        }
        return r;
      })
    );
  };

  // Handle Margin Adjustment update
  const handleSaveMargin = ({ marginType, marginAmount, allocationPurpose }) => {
    setMarginInfo({
      type: marginType,
      amount: marginAmount,
      purpose: allocationPurpose,
    });

    // Recalculate live sample rates
    setRatesList((prev) =>
      prev.map((rate) => {
        const addedMargin =
          marginType === 'FLAT'
            ? marginAmount
            : Math.round((rate.officialRate * marginAmount) / 100);
        return {
          ...rate,
          platformMargin: addedMargin,
          totalCustomerFee: rate.officialRate + addedMargin,
        };
      })
    );
  };

  // Refresh Courier Health Latency
  const handleRefreshCouriers = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCouriers((prev) =>
        prev.map((c) => ({
          ...c,
          trackingLatencyMs: Math.floor(Math.random() * 40 + 90),
        }))
      );
      setIsRefreshing(false);
    }, 700);
  };

  // Handle Rate Calculator Simulation
  const handleCalculateRate = (e) => {
    e.preventDefault();
    setIsSimulatingRate(true);
    setTimeout(() => {
      setIsSimulatingRate(false);
      // Recalculate based on weight multiplier
      const weightMultiplier = Math.max(1, Math.ceil(calcWeight / 1000));
      setRatesList((prev) =>
        prev.map((r) => {
          const baseRate = (r.officialRate / (weightMultiplier > 1 ? weightMultiplier - 1 || 1 : 1)) * weightMultiplier;
          const currentMargin =
            marginInfo.type === 'FLAT'
              ? marginInfo.amount
              : Math.round((baseRate * marginInfo.amount) / 100);
          return {
            ...r,
            officialRate: baseRate,
            platformMargin: currentMargin,
            totalCustomerFee: baseRate + currentMargin,
          };
        })
      );
    }, 600);
  };

  return (
    <>
      <PageTItle title="Logistics Aggregator Hub (RajaOngkir Pro & Direct Carrier API)" />

      {/* HEADER ACTION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1 text-body">5.1 Logistics Aggregator Hub</h4>
          <p className="text-muted fs-13 mb-0">
            Kalkulasi tarif pengiriman real-time ke 7.000+ kecamatan Indonesia, manajemen kurir nasional, global kill-switch, dan margin platform.
          </p>
        </div>
        <div className="d-flex flex-wrap align-items-center gap-2 mt-2 mt-sm-0">
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center"
            onClick={handleRefreshCouriers}
            disabled={isRefreshing}
          >
            <IconifyIcon
              icon="solar:refresh-bold"
              className={`me-2 fs-16 ${isRefreshing ? 'spin-animation' : ''}`}
            />
            {isRefreshing ? 'Memperbarui...' : 'Sinkronisasi Kurir'}
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            className="d-flex align-items-center"
            onClick={() => setShowMarginModal(true)}
          >
            <IconifyIcon icon="solar:tag-price-bold-duotone" className="me-2 fs-16" />
            Margin Markup ({marginInfo.type === 'FLAT' ? `+${formatRupiah(marginInfo.amount)}` : `+${marginInfo.amount}%`})
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="d-flex align-items-center"
            onClick={() => setShowApiModal(true)}
          >
            <IconifyIcon icon="solar:key-bold-duotone" className="me-2 fs-16" />
            Konfigurasi Master API
          </Button>
        </div>
      </div>

      {/* OVERLOAD / INCIDENT ALERT BANNER */}
      {incidentCouriers.length > 0 && !incidentDismissed && (
        <Alert
          variant="warning"
          className="border-warning-subtle d-flex align-items-start justify-content-between mb-3 shadow-sm"
        >
          <div className="d-flex align-items-start gap-2">
            <IconifyIcon
              icon="solar:shield-warning-bold-duotone"
              className="text-warning fs-24 mt-0.5 flex-shrink-0"
            />
            <div>
              <h6 className="fw-bold mb-1 text-body">
                Peringatan Operasional: Kill-Switch Kurir Aktif ({incidentCouriers.length} Kurir Nonaktif Global)
              </h6>
              {incidentCouriers.map((inc) => (
                <p key={inc.id} className="fs-12 text-muted mb-1">
                  <strong>{inc.name} ({inc.code}):</strong> {inc.incidentAlert?.title} —{' '}
                  {inc.incidentAlert?.description} ({inc.incidentAlert?.since})
                </p>
              ))}
              <div className="mt-2 d-flex gap-2">
                <Button
                  size="sm"
                  variant="outline-dark"
                  className="fs-11 py-0.5 px-2"
                  onClick={() => setKillSwitchCourier(incidentCouriers[0])}
                >
                  Kelola Kill Switch Kurir Ini
                </Button>
                <Button
                  size="sm"
                  variant="link"
                  className="fs-11 p-0 text-muted"
                  onClick={() => setIncidentDismissed(true)}
                >
                  Sembunyikan Peringatan
                </Button>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn-close fs-12"
            onClick={() => setIncidentDismissed(true)}
            aria-label="Close"
          />
        </Alert>
      )}

      {/* KPI METRIC CARDS */}
      <Row className="g-3 mb-3">
        {/* Card 1: Cakupan Wilayah Kecamatan */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Cakupan Wilayah Real-Time
                </span>
                <div className="avatar-sm bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:map-point-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-body">
                {logisticsKpiSummary.totalDistrictsCovered.toLocaleString('id-ID')}
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="text-success fw-semibold me-1">
                  <IconifyIcon icon="solar:check-circle-bold" className="me-0.5" />
                  RajaOngkir Pro Tier
                </span>
                <span>ke 514 Kota & Kabupaten</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Card 2: Mitra Kurir Nasional */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Mitra Kurir Nasional
                </span>
                <div className="avatar-sm bg-info-subtle text-info rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:delivery-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-body">
                {logisticsKpiSummary.activeCouriersCount} Ekspedisi
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="badge bg-success-subtle text-success me-1">
                  {logisticsKpiSummary.activeServicesCount} Layanan Aktif
                </span>
                <span>JNE, J&T, SiCepat, dll</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Card 3: Platform Margin Markup */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Margin Markup Platform
                </span>
                <div className="avatar-sm bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:shield-check-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-success">
                +{formatRupiah(marginInfo.amount)}
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="badge bg-info-subtle text-info me-1">Kas Asuransi</span>
                <span>Proteksi Barang Hilang</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Card 4: Volume Pengiriman Bulanan */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Volume Resi Pengiriman
                </span>
                <div className="avatar-sm bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:box-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-body">
                {logisticsKpiSummary.monthlyShipments.toLocaleString('id-ID')} Resi
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="text-success fw-semibold me-1">SLA {logisticsKpiSummary.slaOnTimeRate}</span>
                <span>Tepat waktu pengantaran</span>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* SECTION 1: MANAJEMEN KURIR NASIONAL & KILL SWITCH TABLE */}
      <Card className="border-secondary-subtle mb-4">
        <CardBody className="p-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <h5 className="fw-bold mb-0 text-body d-flex align-items-center">
                <IconifyIcon icon="solar:route-bold-duotone" className="text-primary me-2 fs-20" />
                Daftar Ekspedisi & Manajemen Kill Switch Global
              </h5>
              <span className="text-muted fs-12">
                Superadmin dapat mematikan salah satu kurir secara global jika terjadi gangguan logistik (misal overload Harbolnas).
              </span>
            </div>

            {/* Filter Search and Category */}
            <div className="d-flex flex-wrap gap-2">
              <InputGroup size="sm" style={{ width: '220px' }}>
                <InputGroup.Text className="bg-body border-secondary-subtle">
                  <IconifyIcon icon="solar:magnifer-linear" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Cari kurir atau kode..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="border-secondary-subtle"
                />
              </InputGroup>

              <Form.Select
                size="sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border-secondary-subtle"
                style={{ width: '180px' }}
              >
                <option value="ALL">Semua Kategori</option>
                <option value="Nasional & Express">Nasional & Express</option>
                <option value="Nasional & Cargo">Nasional & Cargo</option>
                <option value="Nasional & Same Day">Nasional & Same Day</option>
                <option value="Jangkauan Pelosok 3T">Jangkauan Pelosok 3T</option>
                <option value="Instant & Same Day (Kota Besar)">Instant / Same Day</option>
              </Form.Select>
            </div>
          </div>

          <div className="table-responsive">
            <Table hover className="table-nowrap mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="fs-12 fw-semibold text-uppercase">Kurir & Kategori</th>
                  <th className="fs-12 fw-semibold text-uppercase">Integrasi API</th>
                  <th className="fs-12 fw-semibold text-uppercase">Layanan Aktif & Estimasi</th>
                  <th className="fs-12 fw-semibold text-uppercase">Latensi & SLA</th>
                  <th className="fs-12 fw-semibold text-uppercase">Volume Bulan Ini</th>
                  <th className="fs-12 fw-semibold text-uppercase text-center">Status Operasional</th>
                  <th className="fs-12 fw-semibold text-uppercase text-end">Kill Switch</th>
                </tr>
              </thead>
              <tbody>
                {filteredCouriers.map((courier) => {
                  const isActive = courier.status === 'ACTIVE';
                  return (
                    <tr key={courier.id}>
                      {/* Name & Category */}
                      <td className="ps-3 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className={`avatar-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${
                              isActive ? 'bg-primary-subtle text-primary' : 'bg-danger-subtle text-danger'
                            }`}
                          >
                            <IconifyIcon icon={courier.icon} className="fs-20" />
                          </div>
                          <div>
                            <span className="fw-bold text-body fs-13 d-block mb-1">
                              {courier.name}
                            </span>
                            <div className="d-flex align-items-center gap-1.5">
                              <span className="badge bg-secondary-subtle text-secondary fs-11 me-1">
                                {courier.code}
                              </span>
                              <span className="text-muted fs-11">{courier.category}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* API Integration */}
                      <td>
                        <span className="fs-12 text-body font-monospace d-block">
                          {courier.integrationType}
                        </span>
                        <span className="text-muted fs-11">
                          Auto Sync Resi: <strong className="text-success">Aktif</strong>
                        </span>
                      </td>

                      {/* Services */}
                      <td>
                        <div className="d-flex flex-column gap-1">
                          {courier.services.map((srv) => (
                            <div key={srv.code} className="d-flex align-items-center gap-1">
                              <span
                                className={`badge fs-10 ${
                                  srv.active && isActive
                                    ? 'bg-primary-subtle text-primary border border-primary-subtle'
                                    : 'bg-secondary-subtle text-muted text-decoration-line-through'
                                }`}
                              >
                                {srv.name}
                              </span>
                              <span className="text-muted fs-10">({srv.etd})</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Latency & SLA */}
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <span className="fs-12 fw-semibold text-body">
                            {courier.trackingLatencyMs} ms
                          </span>
                          <span className="text-muted fs-11">
                            ({courier.trackingLatencyMs < 150 ? 'Cepat' : 'Normal'})
                          </span>
                        </div>
                        <span className="text-success fs-11 fw-semibold d-block">
                          SLA {courier.slaRate}
                        </span>
                      </td>

                      {/* Volume */}
                      <td>
                        <span className="fs-13 fw-semibold text-body d-block">
                          {courier.monthlyVolume.toLocaleString('id-ID')}
                        </span>
                        <span className="text-muted fs-11">Paket terkirim</span>
                      </td>

                      {/* Status */}
                      <td className="text-center">
                        {isActive ? (
                          <Badge bg="success-subtle" className="text-success border border-success-subtle px-2 py-1 fs-11">
                            <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
                            OPERASIONAL NORMAL
                          </Badge>
                        ) : (
                          <div>
                            <Badge bg="danger-subtle" className="text-danger border border-danger-subtle px-2 py-1 fs-11">
                              <IconifyIcon icon="solar:shield-warning-bold" className="me-1" />
                              OVERLOAD / SUSPENDED
                            </Badge>
                            {courier.incidentAlert && (
                              <span className="d-block text-danger fs-10 mt-0.5">
                                {courier.incidentAlert.title}
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Kill Switch CTA */}
                      <td className="text-end">
                        <Button
                          size="sm"
                          variant={isActive ? 'outline-danger' : 'outline-success'}
                          className="d-inline-flex align-items-center fs-12 fw-semibold"
                          onClick={() => setKillSwitchCourier(courier)}
                        >
                          <IconifyIcon
                            icon={isActive ? 'solar:power-bold' : 'solar:restart-bold'}
                            className="me-1 fs-14"
                          />
                          {isActive ? 'Kill Switch' : 'Pulihkan'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* SECTION 2: LIVE SHIPPING RATE SIMULATOR & DIAGNOSTIC */}
      <Card className="border-secondary-subtle">
        <CardBody className="p-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <div>
              <h5 className="fw-bold mb-0 text-body d-flex align-items-center">
                <IconifyIcon icon="solar:calculator-bold-duotone" className="text-info me-2 fs-20" />
                Live Shipping Rate Diagnostic & Margin Markup Simulator
              </h5>
              <span className="text-muted fs-12">
                Simulasi kalkulasi ongkir ke 7.230 kecamatan dengan visualisasi tarif resmi vs penambahan markup kas platform Indovia (+Rp {marginInfo.amount.toLocaleString('id-ID')}).
              </span>
            </div>
            <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
              <Badge bg="info-subtle" className="text-info border border-info-subtle px-2 py-1 fs-11">
                Margin Saat Ini: +{marginInfo.type === 'FLAT' ? formatRupiah(marginInfo.amount) : `${marginInfo.amount}%`} Flat
              </Badge>
            </div>
          </div>

          {/* Form Filter Origin -> Destination */}
          <Form onSubmit={handleCalculateRate} className="p-3 bg-body-tertiary rounded border border-secondary-subtle mb-3">
            <Row className="g-2 align-items-end">
              <Col lg={4} md={6}>
                <Form.Label className="fs-12 fw-semibold text-body mb-1">
                  Kecamatan Asal Pengirim (Origin)
                </Form.Label>
                <Form.Control
                  size="sm"
                  value={calcOrigin}
                  onChange={(e) => setCalcOrigin(e.target.value)}
                  placeholder="Kec. Gambir, Jakarta Pusat..."
                />
              </Col>
              <Col lg={4} md={6}>
                <Form.Label className="fs-12 fw-semibold text-body mb-1">
                  Kecamatan Tujuan Penerima (Destination)
                </Form.Label>
                <Form.Control
                  size="sm"
                  value={calcDestination}
                  onChange={(e) => setCalcDestination(e.target.value)}
                  placeholder="Kec. Wonokromo, Surabaya..."
                />
              </Col>
              <Col lg={2} sm={6}>
                <Form.Label className="fs-12 fw-semibold text-body mb-1">
                  Berat Paket (Gram)
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  min="100"
                  step="100"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                />
              </Col>
              <Col lg={2} sm={6}>
                <Button
                  variant="info"
                  size="sm"
                  type="submit"
                  className="w-100 fw-semibold text-white d-flex align-items-center justify-content-center"
                  disabled={isSimulatingRate}
                >
                  <IconifyIcon icon="solar:magnifer-linear" className="me-1 fs-14" />
                  {isSimulatingRate ? 'Menghitung...' : 'Hitung Ongkir'}
                </Button>
              </Col>
            </Row>

            {/* Quick preset destinations */}
            <div className="d-flex align-items-center gap-1 mt-2">
              <span className="text-muted fs-11 me-1">Tujuan Cepat:</span>
              {[
                { label: 'Surabaya', dest: 'Kec. Wonokromo, Kota Surabaya, Jawa Timur' },
                { label: 'Medan', dest: 'Kec. Medan Kota, Kota Medan, Sumatera Utara' },
                { label: 'Makassar', dest: 'Kec. Ujung Pandang, Kota Makassar, Sulawesi Selatan' },
                { label: 'Denpasar', dest: 'Kec. Denpasar Selatan, Kota Denpasar, Bali' },
              ].map((p) => (
                <Button
                  key={p.label}
                  variant="link"
                  size="sm"
                  className="fs-11 p-0 text-decoration-none text-primary me-2"
                  onClick={() => {
                    setCalcDestination(p.dest);
                  }}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </Form>

          {/* Rates Result Matrix */}
          <div className="table-responsive">
            <Table hover className="table-nowrap mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="fs-12 fw-semibold text-uppercase">Kurir & Layanan</th>
                  <th className="fs-12 fw-semibold text-uppercase">Estimasi Sampai (ETD)</th>
                  <th className="fs-12 fw-semibold text-uppercase">Tarif Resmi Ekspedisi</th>
                  <th className="fs-12 fw-semibold text-uppercase">Margin Markup (+Kas)</th>
                  <th className="fs-12 fw-semibold text-uppercase">Tarif Final Pembeli</th>
                  <th className="fs-12 fw-semibold text-uppercase text-center">Status Checkout</th>
                </tr>
              </thead>
              <tbody>
                {ratesList.map((rate, idx) => {
                  const isKillSwitched = rate.status === 'DISABLED_KILL_SWITCH';
                  return (
                    <tr key={idx} className={isKillSwitched ? 'opacity-50 table-secondary' : ''}>
                      <td>
                        <span className="fw-bold text-body fs-13 d-block">{rate.courierName}</span>
                        <span className="text-muted fs-12">{rate.serviceName}</span>
                      </td>
                      <td>
                        <span className="badge bg-secondary-subtle text-secondary fs-11">
                          <IconifyIcon icon="solar:clock-circle-bold" className="me-1" />
                          {rate.etd}
                        </span>
                      </td>
                      <td>
                        <span className="fs-13 text-body font-monospace">
                          {formatRupiah(rate.officialRate)}
                        </span>
                      </td>
                      <td>
                        <span className="fs-13 text-success fw-bold font-monospace">
                          +{formatRupiah(rate.platformMargin)}
                        </span>
                      </td>
                      <td>
                        <span className="fs-14 fw-bold text-primary font-monospace">
                          {formatRupiah(rate.totalCustomerFee)}
                        </span>
                      </td>
                      <td className="text-center">
                        {isKillSwitched ? (
                          <Badge bg="danger-subtle" className="text-danger border border-danger-subtle fs-11">
                            <IconifyIcon icon="solar:close-circle-bold" className="me-1" />
                            DIBLOKIR KILL SWITCH
                          </Badge>
                        ) : (
                          <Badge bg="success-subtle" className="text-success border border-success-subtle fs-11">
                            <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
                            TERSEDIA DI CHECKOUT
                          </Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* MODALS */}
      <LogisticsApiConfigModal
        show={showApiModal}
        onHide={() => setShowApiModal(false)}
      />

      <CourierKillSwitchModal
        show={!!killSwitchCourier}
        onHide={() => setKillSwitchCourier(null)}
        courier={killSwitchCourier}
        onToggleStatus={handleToggleCourierStatus}
      />

      <MarginAdjustmentModal
        show={showMarginModal}
        onHide={() => setShowMarginModal(false)}
        onSaveMargin={handleSaveMargin}
      />
    </>
  );
};

export default LogisticsHubPage;
