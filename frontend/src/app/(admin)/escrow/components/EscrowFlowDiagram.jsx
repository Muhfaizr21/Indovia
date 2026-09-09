// src/app/(admin)/escrow/components/EscrowFlowDiagram.jsx
import React, { useState } from 'react';
import { Card, CardBody, Row, Col, Badge, Form, Button } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { formatRupiah } from '../data';

const EscrowFlowDiagram = () => {
  const [simulationAmount, setSimulationAmount] = useState(200000);
  const [takeRatePercent, setTakeRatePercent] = useState(1.5);
  const [selectedGateway, setSelectedGateway] = useState('VA'); // 'VA' | 'QRIS' | 'CC'

  // Calculations
  const pgFee = selectedGateway === 'VA' ? 3500 : selectedGateway === 'QRIS' ? Math.round(simulationAmount * 0.007) : Math.round(simulationAmount * 0.0285 + 2000);
  const indoviaFee = Math.round((simulationAmount * takeRatePercent) / 100);
  const merchantNet = Math.max(0, simulationAmount - indoviaFee - (selectedGateway === 'CC' ? pgFee : 0));

  return (
    <Card className="border-0 shadow-sm mb-4">
      <CardBody className="p-4">
        {/* HEADER SECTION */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-primary-subtle text-primary px-2.5 py-1.5 fs-11 fw-bold text-uppercase">
                Arsitektur Finansial Kritis
              </span>
              <span className="badge bg-success-subtle text-success px-2 py-1 fs-11 fw-semibold">
                Master Merchant of Record (MMoR)
              </span>
            </div>
            <h5 className="fw-bold text-body mb-1">
              Alur Rekening Escrow Indovia & Split-Payment Engine
            </h5>
            <p className="text-muted fs-12 mb-0">
              Mekanisme penampungan dana pihak ketiga yang aman (Tokopedia/Shopify Payments model) untuk melindungi pembeli dan menjamin pencairan merchant.
            </p>
          </div>

          {/* SIMULATOR CONTROLS */}
          <div className="d-flex flex-wrap align-items-center gap-2 mt-2 mt-md-0 bg-body-tertiary p-2 rounded-3 border border-secondary-subtle">
            <span className="fs-12 fw-semibold text-body d-flex align-items-center">
              <IconifyIcon icon="solar:calculator-bold-duotone" className="me-1 text-primary fs-16" />
              Simulasi Nilai:
            </span>
            <Form.Select
              size="sm"
              value={simulationAmount}
              onChange={(e) => setSimulationAmount(Number(e.target.value))}
              className="bg-body text-body border-secondary-subtle"
              style={{ width: '140px' }}
            >
              <option value={100000}>Rp 100.000</option>
              <option value={200000}>Rp 200.000 (Default)</option>
              <option value={500000}>Rp 500.000</option>
              <option value={1500000}>Rp 1.500.000</option>
              <option value={10000000}>Rp 10.000.000</option>
            </Form.Select>
            <Form.Select
              size="sm"
              value={selectedGateway}
              onChange={(e) => setSelectedGateway(e.target.value)}
              className="bg-body text-body border-secondary-subtle"
              style={{ width: '130px' }}
            >
              <option value="VA">Virtual Account</option>
              <option value="QRIS">QRIS (0.7%)</option>
              <option value="CC">Kartu Kredit 3DS</option>
            </Form.Select>
          </div>
        </div>

        {/* VISUAL FLOW DIAGRAM CONTAINER */}
        <div className="p-3 p-md-4 rounded-3 bg-body-secondary border border-secondary-subtle position-relative overflow-hidden mb-3">
          <Row className="g-3 align-items-center text-center">
            {/* NODE 1: PEMBELI BAYAR */}
            <Col xs={12} md={3}>
              <div className="card h-100 border border-primary border-2 shadow-sm bg-body transition-all hover-shadow p-3 position-relative">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-primary text-white fs-10 px-2 py-0.5 rounded-pill">
                    Langkah 1
                  </span>
                  <IconifyIcon icon="solar:user-bold" className="text-primary fs-18" />
                </div>
                <div className="avatar-sm rounded-circle bg-primary-subtle text-primary mx-auto mb-2 d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:cart-check-bold" className="fs-20" />
                </div>
                <h6 className="fw-bold text-body mb-1 fs-13">Pembeli Bayar</h6>
                <div className="badge bg-primary-subtle text-primary fs-13 fw-bold py-1 mb-1">
                  {formatRupiah(simulationAmount)}
                </div>
                <p className="text-muted fs-11 mb-0">
                  Checkout di toko merchant via web / WA store
                </p>
              </div>
            </Col>

            {/* CONNECTOR 1 -> 2 */}
            <Col xs={12} md={1} className="d-none d-md-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <IconifyIcon icon="solar:arrow-right-bold" className="text-primary fs-24 animate-pulse" />
                <span className="fs-10 text-muted fw-semibold mt-1">Webhook</span>
              </div>
            </Col>

            {/* NODE 2: CENTRAL PAYMENT GATEWAY */}
            <Col xs={12} md={4}>
              <div className="card h-100 border border-secondary-subtle shadow-sm bg-body transition-all hover-shadow p-3 position-relative">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-secondary text-white fs-10 px-2 py-0.5 rounded-pill">
                    Langkah 2
                  </span>
                  <IconifyIcon icon="solar:server-square-bold" className="text-muted fs-18" />
                </div>
                <div className="avatar-sm rounded-circle bg-info-subtle text-info mx-auto mb-2 d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:card-transfer-bold-duotone" className="fs-20" />
                </div>
                <h6 className="fw-bold text-body mb-1 fs-13">Central PG (Midtrans / Xendit)</h6>
                <div className="d-flex justify-content-center gap-1 mb-1 flex-wrap">
                  <span className="badge bg-body-secondary text-body fs-10 border border-secondary-subtle">
                    QRIS Instant
                  </span>
                  <span className="badge bg-body-secondary text-body fs-10 border border-secondary-subtle">
                    VA 24/7
                  </span>
                  <span className="badge bg-body-secondary text-body fs-10 border border-secondary-subtle">
                    3DS 2.0
                  </span>
                </div>
                <p className="text-muted fs-11 mb-0">
                  MDR Gateway: <strong className="text-body">{formatRupiah(pgFee)}</strong>
                </p>
              </div>
            </Col>

            {/* CONNECTOR 2 -> 3 */}
            <Col xs={12} md={1} className="d-none d-md-flex justify-content-center">
              <div className="d-flex flex-column align-items-center">
                <IconifyIcon icon="solar:arrow-right-bold" className="text-info fs-24 animate-pulse" />
                <span className="fs-10 text-muted fw-semibold mt-1">Direct API</span>
              </div>
            </Col>

            {/* NODE 3: REKENING ESCROW INDOVIA (PENAMPUNGAN) */}
            <Col xs={12} md={3}>
              <div
                className="card h-100 border-2 shadow-sm bg-body transition-all hover-shadow p-3 position-relative"
                style={{ borderColor: '#6366f1' }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge text-white fs-10 px-2 py-0.5 rounded-pill" style={{ backgroundColor: '#6366f1' }}>
                    Langkah 3: Core Hub
                  </span>
                  <IconifyIcon icon="solar:shield-check-bold" className="fs-18" style={{ color: '#6366f1' }} />
                </div>
                <div
                  className="avatar-sm rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'rgba(99, 102, 241, 0.12)', color: '#6366f1' }}
                >
                  <IconifyIcon icon="solar:vault-bold-duotone" className="fs-20" />
                </div>
                <h6 className="fw-bold text-body mb-1 fs-13">Rekening Escrow Indovia</h6>
                <div className="badge fs-12 fw-bold py-1 mb-1" style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}>
                  Penampungan Terlindungi
                </div>
                <p className="text-muted fs-11 mb-0">
                  Status awal: <strong className="text-warning">Pending Balance</strong> (In-Transit)
                </p>
              </div>
            </Col>
          </Row>

          {/* SPLIT ARROW DOWN TO DESTINATIONS */}
          <div className="my-3 text-center d-none d-md-block">
            <div className="d-inline-flex flex-column align-items-center">
              <span className="badge bg-body text-body border border-secondary-subtle px-3 py-1 fs-11 shadow-sm mb-1">
                <IconifyIcon icon="solar:shield-warning-bold" className="me-1 text-success" />
                Trigger: Pesanan Delivered & Confirmed (atau Otomatis Selesai 2x24 Jam)
              </span>
              <IconifyIcon icon="solar:arrow-down-bold" className="text-body-secondary fs-20" />
            </div>
          </div>

          {/* BOTTOM SPLIT DESTINATIONS */}
          <Row className="g-3 mt-1">
            {/* DESTINATION A: MERCHANT WALLET */}
            <Col xs={12} md={6}>
              <div
                className="card h-100 border-2 shadow-sm bg-body p-3 transition-all hover-shadow"
                style={{ borderColor: '#16a34a' }}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="avatar-sm rounded-circle d-flex align-items-center justify-content-center"
                      style={{ backgroundColor: 'rgba(22, 163, 74, 0.15)', color: '#16a34a' }}
                    >
                      <IconifyIcon icon="solar:wallet-money-bold-duotone" className="fs-22" />
                    </div>
                    <div>
                      <h6 className="fw-bold text-body mb-0 fs-14">Merchant Wallet (Toko)</h6>
                      <small className="text-muted fs-11">Buku Besar Saldo Digital Merchant</small>
                    </div>
                  </div>
                  <span className="badge bg-success-subtle text-success fs-12 px-2.5 py-1 fw-bold">
                    {formatRupiah(merchantNet)}
                  </span>
                </div>
                <div className="p-2 rounded-2 bg-body-tertiary border border-secondary-subtle fs-12">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Status Awal Saat Resi Dibuat:</span>
                    <span className="badge bg-warning-subtle text-warning fs-10">pending_balance</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Setelah Paket Tiba & Konfirmasi:</span>
                    <span className="badge bg-success-subtle text-success fs-10">available_balance</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Hak Pencairan (Payout):</span>
                    <span className="text-success fw-semibold">Bisa Dicairkan (T+1 / On-Demand)</span>
                  </div>
                </div>
              </div>
            </Col>

            {/* DESTINATION B: INDOVIA FEE */}
            <Col xs={12} md={6}>
              <div
                className="card h-100 border-2 shadow-sm bg-body p-3 transition-all hover-shadow"
                style={{ borderColor: '#ff6c2f' }}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="avatar-sm rounded-circle d-flex align-items-center justify-content-center"
                      style={{ backgroundColor: 'rgba(255, 108, 47, 0.15)', color: '#ff6c2f' }}
                    >
                      <IconifyIcon icon="solar:dollar-bold-duotone" className="fs-22" />
                    </div>
                    <div>
                      <h6 className="fw-bold text-body mb-0 fs-14">Indovia SaaS Fee (Komisi)</h6>
                      <small className="text-muted fs-11">Pendapatan Platform Take-Rate</small>
                    </div>
                  </div>
                  <span className="badge fs-12 px-2.5 py-1 fw-bold text-white" style={{ backgroundColor: '#ff6c2f' }}>
                    {formatRupiah(indoviaFee)}
                  </span>
                </div>
                <div className="p-2 rounded-2 bg-body-tertiary border border-secondary-subtle fs-12">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Skema Take-Rate Platform:</span>
                    <span className="fw-semibold text-body">{takeRatePercent}% GMV Transaksi</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Auto-Deduction di Escrow:</span>
                    <span className="text-success fw-semibold">Otomatis Terpisah Real-time</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Peruntukan:</span>
                    <span className="text-muted">Kas Operasional & Laba Bersih SaaS</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* COMPLIANCE & SAFETY CALLOUT */}
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between p-3 rounded-2 bg-primary-subtle border border-primary-subtle gap-2">
          <div className="d-flex align-items-center">
            <IconifyIcon icon="solar:info-circle-bold" className="text-primary fs-22 me-2 flex-shrink-0" />
            <div className="fs-12 text-body">
              <strong>Aturan Pengamanan Escrow 2x24 Jam:</strong> Dana transaksi otomatis dipindahkan dari{' '}
              <code className="text-warning">pending_balance</code> ke{' '}
              <code className="text-success">available_balance</code> tepat 48 jam sejak kurir mencatat status{' '}
              <em>Delivered</em> jika pembeli tidak menekan tombol konfirmasi ataupun mengajukan sengketa retur barang.
            </div>
          </div>
          <span className="badge bg-primary text-white fs-11 px-2 py-1 flex-shrink-0">
            SLA Auto-Settlement 48h
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default EscrowFlowDiagram;
