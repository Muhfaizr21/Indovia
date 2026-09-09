// src/app/(admin)/logistics/whatsapp/page.jsx
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
  ProgressBar,
  InputGroup,
  Alert,
} from 'react-bootstrap';
import WhatsAppConfigModal from '../components/WhatsAppConfigModal';
import TopUpWaQuotaModal from '../components/TopUpWaQuotaModal';
import {
  whatsappKpiSummary,
  whatsappGatewayConfig,
  merchantWaQuotas,
  outboundWaLogs,
} from '../data';

const WhatsAppGatewayPage = () => {
  // Modal states
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedMerchantForTopUp, setSelectedMerchantForTopUp] = useState(null);

  // Data states
  const [quotas, setQuotas] = useState(merchantWaQuotas);
  const [logs, setLogs] = useState(outboundWaLogs);
  const [gatewayConfig, setGatewayConfig] = useState(whatsappGatewayConfig);

  // Filter states for Quota Directory
  const [merchantSearch, setMerchantSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('ALL');

  // Filter states for Outbound Logs
  const [logTypeFilter, setLogTypeFilter] = useState('ALL');
  const [logStatusFilter, setLogStatusFilter] = useState('ALL');

  // Trigger Toggles State
  const [triggers, setTriggers] = useState({
    autoResi: gatewayConfig.autoTrackingReceiptEnabled,
    autoOtp: gatewayConfig.autoOtpLoginEnabled,
    autoOrder: gatewayConfig.autoOrderConfirmationEnabled,
  });

  const handleToggleTrigger = (key) => {
    setTriggers((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Handle Top Up Confirmation
  const handleTopUpConfirm = ({ merchantId, addedQuota }) => {
    setQuotas((prev) =>
      prev.map((m) => {
        if (m.merchantId === merchantId) {
          const newMonthly = m.monthlyQuota + addedQuota;
          const newRemaining = m.remainingQuota + addedQuota;
          const usagePercent = Math.round((m.usedQuota / newMonthly) * 100);
          let newStatus = 'NORMAL';
          if (usagePercent >= 95) newStatus = 'CRITICAL_LOW';
          else if (usagePercent >= 80) newStatus = 'WARNING_LOW';

          return {
            ...m,
            monthlyQuota: newMonthly,
            remainingQuota: newRemaining,
            status: newStatus,
          };
        }
        return m;
      })
    );
  };

  // Filtered Merchants
  const filteredMerchants = quotas.filter((m) => {
    const matchesSearch =
      m.storeName.toLowerCase().includes(merchantSearch.toLowerCase()) ||
      m.ownerName.toLowerCase().includes(merchantSearch.toLowerCase()) ||
      m.ownerPhone.includes(merchantSearch);
    const matchesTier = tierFilter === 'ALL' || m.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  // Filtered Logs
  const filteredLogs = logs.filter((log) => {
    const matchesType = logTypeFilter === 'ALL' || log.messageType === logTypeFilter;
    const matchesStatus = logStatusFilter === 'ALL' || log.status === logStatusFilter;
    return matchesType && matchesStatus;
  });

  return (
    <>
      <PageTItle title="Centralized WhatsApp Business Gateway Hub" />

      {/* HEADER ACTION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1 text-body">5.2 Centralized WhatsApp Business Gateway Hub</h4>
          <p className="text-muted fs-13 mb-0">
            Kendali integrasi pesan keluar (Fonnte / WABA / Twilio), otomasi notifikasi nomor resi ke pembeli, OTP login merchant, dan kuota toko.
          </p>
        </div>
        <div className="d-flex flex-wrap align-items-center gap-2 mt-2 mt-sm-0">
          <Badge bg="success-subtle" className="text-success border border-success-subtle px-3 py-2 fs-12 d-flex align-items-center">
            <span className="badge-dot bg-success me-2" />
            Gateway Aktif: <strong>{whatsappKpiSummary.activeProvider}</strong>
          </Badge>
          <Button
            variant="success"
            size="sm"
            className="d-flex align-items-center fw-semibold text-white"
            onClick={() => setShowConfigModal(true)}
          >
            <IconifyIcon icon="solar:settings-bold-duotone" className="me-2 fs-16" />
            Konfigurasi Gateway & Template
          </Button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <Row className="g-3 mb-3">
        {/* Card 1: Total Pesan Keluar */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Pesan Terkirim Bulan Ini
                </span>
                <div className="avatar-sm bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:chat-round-check-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-body">
                {whatsappKpiSummary.totalOutboundMonthly.toLocaleString('id-ID')}
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="text-success fw-semibold me-1">
                  <IconifyIcon icon="solar:clock-circle-bold" className="me-0.5" />
                  {whatsappKpiSummary.averageDeliverySeconds}s
                </span>
                <span>kecepatan rata-rata kirim</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Card 2: Resi Tracking Otomatis */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Notifikasi Resi Otomatis
                </span>
                <div className="avatar-sm bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:box-minimalistic-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-body">
                {whatsappKpiSummary.receiptTrackingSent.toLocaleString('id-ID')}
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="badge bg-primary-subtle text-primary me-1">Live Tracking</span>
                <span>Kirim otomatis saat input resi</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Card 3: OTP Merchant & Security */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  OTP Login & Reset Password
                </span>
                <div className="avatar-sm bg-info-subtle text-info rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:shield-keyhole-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-body">
                {whatsappKpiSummary.otpAuthSent.toLocaleString('id-ID')}
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="badge bg-info-subtle text-info me-1">2FA Auth</span>
                <span>Otentikasi aman akun toko</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Card 4: SLA Delivery Rate */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Delivery Success Rate
                </span>
                <div className="avatar-sm bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:verified-check-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-success">
                {whatsappKpiSummary.deliverySuccessRate}
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="text-muted me-1">Total Kuota Terpakai:</span>
                <strong className="text-body">
                  {Math.round((whatsappKpiSummary.totalQuotaConsumed / whatsappKpiSummary.totalQuotaAllocated) * 100)}%
                </strong>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* AUTOMATED OUTBOUND TRIGGERS CARD */}
      <Card className="border-secondary-subtle mb-3">
        <CardBody className="p-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <div>
              <h5 className="fw-bold mb-0 text-body d-flex align-items-center">
                <IconifyIcon icon="solar:bolt-bold-duotone" className="text-warning me-2 fs-20" />
                Trigger Otomatis Pesan WhatsApp Transaksional Keluar
              </h5>
              <span className="text-muted fs-12">
                Mengontrol kapan WhatsApp gateway secara otomatis menembakkan pesan ke pelanggan dan merchant.
              </span>
            </div>
          </div>

          <Row className="g-3">
            {/* Trigger 1: Auto Resi Pengiriman */}
            <Col md={4}>
              <div className="p-3 bg-body-tertiary rounded border border-secondary-subtle h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="fw-bold text-body fs-13 d-flex align-items-center">
                      <IconifyIcon icon="solar:delivery-bold-duotone" className="text-primary me-2 fs-18" />
                      Auto Resi Pengiriman
                    </span>
                    <Form.Check
                      type="switch"
                      id="switch-auto-resi"
                      checked={triggers.autoResi}
                      onChange={() => handleToggleTrigger('autoResi')}
                    />
                  </div>
                  <p className="text-muted fs-12 mb-0">
                    Otomatis kirim nomor resi dan link pelacakan kurir ke WhatsApp pembeli saat merchant menginput resi di dashboard.
                  </p>
                </div>
                <div className="mt-2 pt-2 border-top border-secondary-subtle d-flex align-items-center justify-content-between">
                  <span className="fs-11 text-muted">Status Engine:</span>
                  <Badge bg={triggers.autoResi ? 'success-subtle' : 'secondary-subtle'} className={triggers.autoResi ? 'text-success' : 'text-muted'}>
                    {triggers.autoResi ? 'AKTIF BERJALAN' : 'DIJEDA'}
                  </Badge>
                </div>
              </div>
            </Col>

            {/* Trigger 2: OTP Login Merchant */}
            <Col md={4}>
              <div className="p-3 bg-body-tertiary rounded border border-secondary-subtle h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="fw-bold text-body fs-13 d-flex align-items-center">
                      <IconifyIcon icon="solar:shield-keyhole-bold-duotone" className="text-info me-2 fs-18" />
                      OTP Login & Keamanan
                    </span>
                    <Form.Check
                      type="switch"
                      id="switch-auto-otp"
                      checked={triggers.autoOtp}
                      onChange={() => handleToggleTrigger('autoOtp')}
                    />
                  </div>
                  <p className="text-muted fs-12 mb-0">
                    Kirim kode 6 digit OTP saat merchant login ke perangkat baru atau melakukan permohonan reset password toko.
                  </p>
                </div>
                <div className="mt-2 pt-2 border-top border-secondary-subtle d-flex align-items-center justify-content-between">
                  <span className="fs-11 text-muted">Status Engine:</span>
                  <Badge bg={triggers.autoOtp ? 'success-subtle' : 'secondary-subtle'} className={triggers.autoOtp ? 'text-success' : 'text-muted'}>
                    {triggers.autoOtp ? 'AKTIF BERJALAN' : 'DIJEDA'}
                  </Badge>
                </div>
              </div>
            </Col>

            {/* Trigger 3: Escrow Payment Verified */}
            <Col md={4}>
              <div className="p-3 bg-body-tertiary rounded border border-secondary-subtle h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="fw-bold text-body fs-13 d-flex align-items-center">
                      <IconifyIcon icon="solar:card-recive-bold-duotone" className="text-success me-2 fs-18" />
                      Konfirmasi Bayar Escrow
                    </span>
                    <Form.Check
                      type="switch"
                      id="switch-auto-order"
                      checked={triggers.autoOrder}
                      onChange={() => handleToggleTrigger('autoOrder')}
                    />
                  </div>
                  <p className="text-muted fs-12 mb-0">
                    Broadcast konfirmasi pembayaran berhasil kepada pembeli segera setelah dana masuk ke rekening Escrow Indovia.
                  </p>
                </div>
                <div className="mt-2 pt-2 border-top border-secondary-subtle d-flex align-items-center justify-content-between">
                  <span className="fs-11 text-muted">Status Engine:</span>
                  <Badge bg={triggers.autoOrder ? 'success-subtle' : 'secondary-subtle'} className={triggers.autoOrder ? 'text-success' : 'text-muted'}>
                    {triggers.autoOrder ? 'AKTIF BERJALAN' : 'DIJEDA'}
                  </Badge>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* SECTION 1: MERCHANT WHATSAPP QUOTA DIRECTORY */}
      <Card className="border-secondary-subtle mb-4">
        <CardBody className="p-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <h5 className="fw-bold mb-0 text-body d-flex align-items-center">
                <IconifyIcon icon="solar:users-group-two-rounded-bold-duotone" className="text-primary me-2 fs-20" />
                Direktori Kuota Pesan WhatsApp per Merchant
              </h5>
              <span className="text-muted fs-12">
                Alokasi kuota pesan transaksional per toko sesuai paket langganan (Starter: 100/bln, Pro: 1.000/bln, Enterprise: 10.000/bln).
              </span>
            </div>

            {/* Filter Search and Tier */}
            <div className="d-flex flex-wrap gap-2">
              <InputGroup size="sm" style={{ width: '220px' }}>
                <InputGroup.Text className="bg-body border-secondary-subtle">
                  <IconifyIcon icon="solar:magnifer-linear" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Cari toko / nama / nomor..."
                  value={merchantSearch}
                  onChange={(e) => setMerchantSearch(e.target.value)}
                  className="border-secondary-subtle"
                />
              </InputGroup>

              <Form.Select
                size="sm"
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="border-secondary-subtle"
                style={{ width: '160px' }}
              >
                <option value="ALL">Semua Paket</option>
                <option value="Starter">Starter (100)</option>
                <option value="Pro Tier">Pro Tier (1.000)</option>
                <option value="Enterprise">Enterprise (10.000)</option>
              </Form.Select>
            </div>
          </div>

          <div className="table-responsive">
            <Table hover className="table-nowrap mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="fs-12 fw-semibold text-uppercase py-3 ps-3">Nama Toko & Pemilik</th>
                  <th className="fs-12 fw-semibold text-uppercase py-3">Paket Toko</th>
                  <th className="fs-12 fw-semibold text-uppercase py-3" style={{ minWidth: '220px' }}>
                    Penggunaan Kuota Pesan
                  </th>
                  <th className="fs-12 fw-semibold text-uppercase py-3">Sisa Kuota</th>
                  <th className="fs-12 fw-semibold text-uppercase py-3">Status Kuota</th>
                  <th className="fs-12 fw-semibold text-uppercase py-3">Terakhir Kirim</th>
                  <th className="fs-12 fw-semibold text-uppercase text-end py-3 pe-3">Aksi Superadmin</th>
                </tr>
              </thead>
              <tbody>
                {filteredMerchants.map((m) => {
                  const usagePercentage = Math.min(
                    100,
                    Math.round((m.usedQuota / m.monthlyQuota) * 100)
                  );
                  let progressVariant = 'primary';
                  if (usagePercentage >= 95) progressVariant = 'danger';
                  else if (usagePercentage >= 80) progressVariant = 'warning';

                  return (
                    <tr key={m.merchantId}>
                      {/* Store & Owner */}
                      <td className="py-3 ps-3">
                        <span className="fw-bold text-body fs-13 d-block mb-1">{m.storeName}</span>
                        <div className="text-muted fs-11 d-flex align-items-center gap-2">
                          <span>{m.ownerName}</span>
                          <span className="text-secondary opacity-50">•</span>
                          <span className="font-monospace">{m.ownerPhone}</span>
                        </div>
                      </td>

                      {/* Tier */}
                      <td className="py-3">
                        <Badge
                          bg={
                            m.tier === 'Enterprise'
                              ? 'primary-subtle'
                              : m.tier === 'Pro Tier'
                              ? 'info-subtle'
                              : 'secondary-subtle'
                          }
                          className={
                            m.tier === 'Enterprise'
                              ? 'text-primary border border-primary-subtle'
                              : m.tier === 'Pro Tier'
                              ? 'text-info border border-info-subtle'
                              : 'text-secondary border border-secondary-subtle'
                          }
                        >
                          {m.tier}
                        </Badge>
                      </td>

                      {/* Progress bar */}
                      <td className="py-3">
                        <div className="d-flex justify-content-between fs-11 mb-1">
                          <span className="fw-semibold text-body">
                            {m.usedQuota.toLocaleString('id-ID')} / {m.monthlyQuota.toLocaleString('id-ID')} pesan
                          </span>
                          <span className="text-muted fw-semibold">{usagePercentage}%</span>
                        </div>
                        <ProgressBar
                          now={usagePercentage}
                          variant={progressVariant}
                          style={{ height: '6px' }}
                          className="rounded-pill"
                        />
                      </td>

                      {/* Remaining */}
                      <td className="py-3">
                        <span
                          className={`fs-13 fw-bold font-monospace ${
                            m.remainingQuota === 0
                              ? 'text-danger'
                              : m.remainingQuota < 50
                              ? 'text-warning'
                              : 'text-success'
                          }`}
                        >
                          {m.remainingQuota.toLocaleString('id-ID')}
                        </span>
                        <span className="text-muted fs-11 d-block mt-1">pesan tersisa</span>
                      </td>

                      {/* Status */}
                      <td className="py-3">
                        {m.status === 'NORMAL' && (
                          <Badge bg="success-subtle" className="text-success border border-success-subtle fs-11">
                            Normal
                          </Badge>
                        )}
                        {m.status === 'WARNING_LOW' && (
                          <Badge bg="warning-subtle" className="text-warning border border-warning-subtle fs-11">
                            Mendekati Limit
                          </Badge>
                        )}
                        {m.status === 'CRITICAL_LOW' && (
                          <Badge bg="danger-subtle" className="text-danger border border-danger-subtle fs-11">
                            Kritis (&lt;5%)
                          </Badge>
                        )}
                        {m.status === 'EXCEEDED' && (
                          <Badge bg="danger" className="text-white fs-11">
                            Habis / Terlampaui
                          </Badge>
                        )}
                      </td>

                      {/* Last Sent */}
                      <td className="py-3">
                        <span className="fs-12 text-muted">{m.lastSent}</span>
                      </td>

                      {/* Action CTA */}
                      <td className="text-end py-3 pe-3">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="d-inline-flex align-items-center fs-12 fw-semibold px-2.5 py-1"
                          onClick={() => setSelectedMerchantForTopUp(m)}
                        >
                          <IconifyIcon icon="solar:add-circle-bold" className="me-1 fs-14" />
                          Top-Up Kuota
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

      {/* SECTION 2: REAL-TIME OUTBOUND MESSAGE QUEUE LOGS */}
      <Card className="border-secondary-subtle">
        <CardBody className="p-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <h5 className="fw-bold mb-0 text-body d-flex align-items-center">
                <IconifyIcon icon="solar:chat-line-bold-duotone" className="text-success me-2 fs-20" />
                Antrean & Riwayat Pesan WhatsApp Keluar Real-Time
              </h5>
              <span className="text-muted fs-12">
                Log audit pengiriman notifikasi nomor resi, OTP keamanan, dan konfirmasi transaksi.
              </span>
            </div>

            {/* Filter Type and Status */}
            <div className="d-flex flex-wrap gap-2">
              <Form.Select
                size="sm"
                value={logTypeFilter}
                onChange={(e) => setLogTypeFilter(e.target.value)}
                className="border-secondary-subtle"
                style={{ width: '180px' }}
              >
                <option value="ALL">Semua Jenis Notifikasi</option>
                <option value="RESI_AUTOMATION">Auto Resi Pengiriman</option>
                <option value="OTP_LOGIN">OTP Login Merchant</option>
                <option value="OTP_RESET_PASS">OTP Reset Password</option>
                <option value="PAYMENT_CONFIRM">Konfirmasi Escrow</option>
              </Form.Select>

              <Form.Select
                size="sm"
                value={logStatusFilter}
                onChange={(e) => setLogStatusFilter(e.target.value)}
                className="border-secondary-subtle"
                style={{ width: '150px' }}
              >
                <option value="ALL">Semua Status</option>
                <option value="READ">Dibaca (Read)</option>
                <option value="DELIVERED">Terkirim (Delivered)</option>
                <option value="FAILED">Gagal (Failed)</option>
              </Form.Select>
            </div>
          </div>

          <div className="table-responsive">
            <Table hover className="table-nowrap mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="fs-12 fw-semibold text-uppercase py-3 ps-3">ID Pesan & Waktu</th>
                  <th className="fs-12 fw-semibold text-uppercase py-3">Penerima</th>
                  <th className="fs-12 fw-semibold text-uppercase py-3">Tipe & Toko</th>
                  <th className="fs-12 fw-semibold text-uppercase py-3" style={{ maxWidth: '320px' }}>
                    Cuplikan Isi Pesan
                  </th>
                  <th className="fs-12 fw-semibold text-uppercase py-3">Provider & Kecepatan</th>
                  <th className="fs-12 fw-semibold text-uppercase text-center py-3 pe-3">Status Kirim</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => {
                  return (
                    <tr key={log.msgId}>
                      {/* ID & Timestamp */}
                      <td className="py-3 ps-3">
                        <span className="fs-12 fw-bold text-body font-monospace d-block mb-1">
                          {log.msgId}
                        </span>
                        <span className="text-muted fs-11">{log.timestamp}</span>
                      </td>

                      {/* Recipient */}
                      <td className="py-3">
                        <span className="fw-semibold text-body fs-13 d-block mb-1">
                          {log.recipientName}
                        </span>
                        <span className="text-muted fs-11 font-monospace">
                          {log.recipientNumber}
                        </span>
                      </td>

                      {/* Type & Store */}
                      <td className="py-3">
                        <Badge
                          bg={
                            log.messageType === 'RESI_AUTOMATION'
                              ? 'primary-subtle'
                              : log.messageType.startsWith('OTP')
                              ? 'info-subtle'
                              : 'success-subtle'
                          }
                          className={
                            log.messageType === 'RESI_AUTOMATION'
                              ? 'text-primary border border-primary-subtle px-2 py-1'
                              : log.messageType.startsWith('OTP')
                              ? 'text-info border border-info-subtle px-2 py-1'
                              : 'text-success border border-success-subtle px-2 py-1'
                          }
                        >
                          {log.messageType === 'RESI_AUTOMATION' && 'Auto Resi'}
                          {log.messageType === 'OTP_LOGIN' && 'OTP Login'}
                          {log.messageType === 'OTP_RESET_PASS' && 'Reset Sandi'}
                          {log.messageType === 'PAYMENT_CONFIRM' && 'Bayar Escrow'}
                        </Badge>
                        <span className="text-muted fs-11 d-block mt-1">{log.storeName}</span>
                      </td>

                      {/* Content Snippet */}
                      <td className="py-3" style={{ maxWidth: '320px', whiteSpace: 'normal' }}>
                        <span className="fs-12 text-body d-block">
                          {log.contentSnippet}
                        </span>
                        {log.failReason && (
                          <div className="text-danger fs-11 mt-1 fw-semibold d-flex align-items-center gap-1">
                            <IconifyIcon icon="solar:danger-triangle-bold" />
                            <span>Gagal: {log.failReason}</span>
                          </div>
                        )}
                      </td>

                      {/* Provider & Latency */}
                      <td className="py-3">
                        <span className="fs-12 text-body fw-semibold d-block mb-1">
                          {log.provider}
                        </span>
                        <span className="text-muted fs-11">
                          Latensi: <strong className="text-success">{log.latencySeconds}s</strong>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="text-center py-3 pe-3">
                        {log.status === 'READ' && (
                          <Badge bg="primary-subtle" className="text-primary border border-primary-subtle fs-11 px-2 py-1">
                            <IconifyIcon icon="solar:check-read-linear" className="me-1" />
                            DIBACA
                          </Badge>
                        )}
                        {log.status === 'DELIVERED' && (
                          <Badge bg="info-subtle" className="text-info border border-info-subtle fs-11 px-2 py-1">
                            <IconifyIcon icon="solar:check-square-bold" className="me-1" />
                            TERKIRIM
                          </Badge>
                        )}
                        {log.status === 'FAILED' && (
                          <Badge bg="danger-subtle" className="text-danger border border-danger-subtle fs-11 px-2 py-1">
                            <IconifyIcon icon="solar:close-circle-bold" className="me-1" />
                            GAGAL
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
      <WhatsAppConfigModal
        show={showConfigModal}
        onHide={() => setShowConfigModal(false)}
      />

      <TopUpWaQuotaModal
        show={!!selectedMerchantForTopUp}
        onHide={() => setSelectedMerchantForTopUp(null)}
        merchant={selectedMerchantForTopUp}
        onConfirm={handleTopUpConfirm}
      />
    </>
  );
};

export default WhatsAppGatewayPage;
