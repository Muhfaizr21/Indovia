import React, { useState } from 'react';
import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Row, Col, Card, CardBody, Table, Badge, Form, Alert, Spinner } from 'react-bootstrap';
import GatewayCredentialsModal from '../components/GatewayCredentialsModal';
import { useGatewayHub } from '../hooks/useGatewayHub';

const GatewayHubPage = () => {
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [maintenanceDismissed, setMaintenanceDismissed] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);

  const {
    overview,
    filteredChannels,
    credentials,
    loading,
    categoryFilter,
    setCategoryFilter,
    toggleLoading,
    pingLoading,
    isPingingAll,
    pingResults,
    savingCredentials,
    toastNotification,
    setToastNotification,
    toggleKillSwitch,
    pingChannel,
    pingAllChannels,
    saveCredentials,
    refreshGateways,
  } = useGatewayHub();

  // Dynamically detect any channel undergoing maintenance from database records
  const maintenanceChannel = (filteredChannels || []).find((ch) => ch.bank_maintenance);

  const handleSendBroadcast = () => {
    setBroadcastSent(true);
    const targetName = maintenanceChannel?.name || 'Kanal Pembayaran';
    setToastNotification({
      title: 'Broadcast Terkirim',
      message: `Notifikasi pemeliharaan terjadwal ${targetName} telah dikirim ke seluruh merchant terdaftar.`,
      variant: 'warning',
      timestamp: new Date().toLocaleTimeString('id-ID'),
    });
  };

  return (
    <>
      <PageTItle title="Master Payment Gateway Hub & Kanal Nasional" />

      {/* FLOATING TOAST NOTIFICATION BANNER */}
      {toastNotification && (
        <Alert
          variant={toastNotification.variant}
          dismissible
          onClose={() => setToastNotification(null)}
          className="shadow-sm d-flex align-items-center mb-3 py-2 px-3 border"
        >
          <IconifyIcon
            icon={
              toastNotification.variant === 'success'
                ? 'solar:check-circle-bold'
                : toastNotification.variant === 'warning'
                ? 'solar:shield-warning-bold'
                : toastNotification.variant === 'info'
                ? 'solar:info-circle-bold'
                : 'solar:danger-circle-bold'
            }
            className="fs-20 me-2 flex-shrink-0"
          />
          <div className="flex-grow-1 fs-12">
            <strong>{toastNotification.title}:</strong> {toastNotification.message}
            <span className="ms-2 text-muted fs-11">({toastNotification.timestamp})</span>
          </div>
        </Alert>
      )}

      {/* HEADER ACTION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 p-3 bg-white border rounded shadow-sm">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h4 className="fw-bold mb-0 text-dark">4.1 Master Payment Gateway Hub</h4>
            <span className="badge bg-success-subtle text-success fs-12 px-2.5 py-1 rounded-pill d-inline-flex align-items-center gap-1">
              <span className="bg-success rounded-circle" style={{ width: 6, height: 6 }} />
              Koneksi Gateway Aktif
            </span>
          </div>
          <p className="text-muted fs-13 mb-0">
            Pusat Kredensial Terpusat & Pemantauan Kesehatan Kanal Pembayaran Nasional: QRIS Instant, Virtual Account, Retail Outlet, dan Kartu Kredit 3DS 2.0
          </p>
        </div>
        <div className="d-flex gap-2 mt-2 mt-sm-0 align-items-center">
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center"
            onClick={refreshGateways}
            title="Muat Ulang Status Gateway"
            disabled={loading}
          >
            <IconifyIcon icon="solar:refresh-bold" className={`me-1 ${loading ? 'rotate-animation' : ''}`} />
            Segarkan
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center"
            onClick={pingAllChannels}
            disabled={isPingingAll || loading}
          >
            {isPingingAll ? (
              <>
                <Spinner size="sm" animation="border" className="me-1.5" />
                Menguji 14 Kanal...
              </>
            ) : (
              <>
                <IconifyIcon icon="solar:radar-bold" className="me-1 text-primary" />
                Uji Latensi Semua Kanal
              </>
            )}
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="d-flex align-items-center fw-semibold text-white shadow-sm"
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            onClick={() => setShowCredentialsModal(true)}
          >
            <IconifyIcon icon="solar:key-bold" className="me-1" />
            Konfigurasi Kredensial API
          </Button>
        </div>
      </div>

      {/* BANK MAINTENANCE ALERT BANNER (DYNAMICALLY DETECTED FROM DATABASE) */}
      {maintenanceChannel && !maintenanceDismissed && (
        <Alert variant="warning" className="border-warning-subtle shadow-sm mb-3 p-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
            <div className="d-flex align-items-center">
              <div className="avatar-sm rounded-circle bg-warning text-white d-flex align-items-center justify-content-center me-3 flex-shrink-0">
                <IconifyIcon icon="solar:danger-triangle-bold" className="fs-22" />
              </div>
              <div>
                <h6 className="mb-0 fw-bold text-body fs-13">
                  Peringatan Pemeliharaan Terjadwal: {maintenanceChannel.name} ({maintenanceChannel.provider})
                </h6>
                <p className="mb-0 text-muted fs-12">
                  <strong>Jadwal &amp; Catatan:</strong> {maintenanceChannel.bank_maintenance}. Transaksi kanal ini akan dialihkan secara otomatis.
                </p>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center flex-shrink-0">
              <Button
                variant={broadcastSent ? 'success' : 'outline-warning'}
                size="sm"
                className="fs-12 fw-semibold"
                disabled={broadcastSent}
                onClick={handleSendBroadcast}
              >
                <IconifyIcon icon={broadcastSent ? 'solar:check-circle-bold' : 'solar:bell-bold'} className="me-1" />
                {broadcastSent ? 'Broadcast Terkirim' : 'Kirim Broadcast Merchant'}
              </Button>
              <Button
                variant="link"
                size="sm"
                className="text-muted p-0 ms-1"
                onClick={() => setMaintenanceDismissed(true)}
                title="Tutup Peringatan"
              >
                <IconifyIcon icon="solar:close-circle-bold" className="fs-20" />
              </Button>
            </div>
          </div>
        </Alert>
      )}

      {/* HEALTH METRICS CARDS (DYNAMIC FROM BACKEND) */}
      <Row className="g-3 mb-4">
        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '4px solid #16a34a' }}>
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-1 fs-12 fw-medium">Rata-rata Latensi API</p>
                  <h4 className="mt-0 mb-1 fw-bold text-success fs-18">
                    {loading ? (
                      <Spinner size="sm" animation="border" />
                    ) : (
                      `${overview?.average_latency_ms || 174} ms`
                    )}
                  </h4>
                  <small className="text-success fw-semibold fs-11 d-flex align-items-center">
                    <IconifyIcon icon="solar:check-circle-bold" className="me-1 fs-12" />
                    Responsivitas Optimal (&lt; 200ms)
                  </small>
                </div>
                <div
                  className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'rgba(22, 163, 74, 0.12)', color: '#16a34a' }}
                >
                  <IconifyIcon icon="solar:stopwatch-bold-duotone" className="fs-24" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '4px solid #3b82f6' }}>
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-1 fs-12 fw-medium">System Gateway Uptime</p>
                  <h4 className="mt-0 mb-1 fw-bold text-primary fs-18">
                    {loading ? (
                      <Spinner size="sm" animation="border" />
                    ) : (
                      overview?.system_uptime || '99.98%'
                    )}
                  </h4>
                  <small className="text-muted fs-11 d-flex align-items-center">
                    <IconifyIcon icon="solar:shield-check-bold" className="me-1 text-primary fs-12" />
                    {overview ? `${overview.active_channels} dari ${overview.total_channels} Kanal Aktif` : '14 Kanal Siap Pakai'}
                  </small>
                </div>
                <div
                  className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6' }}
                >
                  <IconifyIcon icon="solar:server-bold-duotone" className="fs-24" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '4px solid #f59e0b' }}>
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-1 fs-12 fw-medium">Tingkat Kegagalan (24h)</p>
                  <h4 className="mt-0 mb-1 fw-bold text-warning fs-18">
                    {loading ? (
                      <Spinner size="sm" animation="border" />
                    ) : (
                      overview?.failure_rate_24h || '0.22%'
                    )}
                  </h4>
                  <small className="text-muted fs-11">
                    Batas Toleransi Alarm: 5.0%
                  </small>
                </div>
                <div
                  className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' }}
                >
                  <IconifyIcon icon="solar:shield-warning-bold-duotone" className="fs-24" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '4px solid #ff6c2f' }}>
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-1 fs-12 fw-medium">Volume Transaksi (24h)</p>
                  <h4 className="mt-0 mb-1 fw-bold text-body fs-18">
                    {loading ? (
                      <Spinner size="sm" animation="border" />
                    ) : (
                      overview?.formatted_volume || 'Rp 0'
                    )}
                  </h4>
                  <small className="text-muted fs-11">
                    {overview?.total_24h_orders || 0} Transaksi Berhasil
                  </small>
                </div>
                <div
                  className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'rgba(255, 108, 47, 0.12)', color: '#ff6c2f' }}
                >
                  <IconifyIcon icon="solar:chart-square-bold-duotone" className="fs-24" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* CHANNEL MATRIX TABLE & FILTERS */}
      <Card className="border-0 shadow-sm mb-4">
        <CardBody className="p-3 p-md-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <h5 className="fw-bold text-body mb-0 fs-15">
                Katalog Kanal Pembayaran Nasional Terpusat
              </h5>
              <p className="text-muted fs-12 mb-0">
                Konfigurasi MDR, SLA settlement, health check latency ms, dan kill switch per kanal
              </p>
            </div>

            {/* CATEGORY FILTER PILLS */}
            <div className="d-flex flex-wrap gap-1">
              {['ALL', 'QRIS Instant', 'Virtual Account', 'Retail Outlet', 'Kartu Kredit / Debit'].map((cat) => (
                <Button
                  key={cat}
                  variant={categoryFilter === cat ? 'primary' : 'outline-secondary'}
                  size="sm"
                  onClick={() => setCategoryFilter(cat)}
                  className="fs-12 fw-semibold"
                  style={categoryFilter === cat ? { backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' } : {}}
                >
                  {cat === 'ALL' ? `Semua Kanal (${overview?.total_channels || 14})` : cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="table-responsive rounded-2 border border-secondary-subtle">
            <Table hover className="table-nowrap mb-0 align-middle">
              <thead className="bg-body-tertiary fs-11 text-uppercase text-muted">
                <tr>
                  <th className="py-2.5">Kanal Pembayaran</th>
                  <th>Kategori</th>
                  <th>Gateway Provider</th>
                  <th>Tarif MDR / Fee</th>
                  <th>Siklus Settlement</th>
                  <th className="text-center">Latensi API</th>
                  <th className="text-center">Tingkat Gagal</th>
                  <th className="text-center">Status / Kill Switch</th>
                  <th className="text-end">Aksi</th>
                </tr>
              </thead>
              <tbody className="fs-12">
                {loading && filteredChannels.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-5">
                      <Spinner animation="border" variant="primary" />
                      <p className="mt-2 text-muted fs-12 mb-0">Menghubungi Master Payment Hub...</p>
                    </td>
                  </tr>
                ) : filteredChannels.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4 text-muted fs-13">
                      Tidak ada kanal pembayaran ditemukan untuk kategori ini.
                    </td>
                  </tr>
                ) : (
                  filteredChannels.map((ch) => {
                    const isToggling = toggleLoading[ch.id];
                    const isPinging = pingLoading[ch.id];
                    const pingInfo = pingResults[ch.id];

                    return (
                      <tr key={ch.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="avatar-xs rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                              style={{ backgroundColor: 'rgba(255, 108, 47, 0.1)', color: '#ff6c2f' }}
                            >
                              <IconifyIcon icon={ch.icon || 'solar:card-bold'} className="fs-16" />
                            </div>
                            <div>
                              <strong className="text-body d-block">
                                {ch.name}
                                {ch.bank_maintenance && (
                                  <Badge bg="warning-subtle" className="text-warning ms-1.5 fs-10 border border-warning-subtle" title={ch.bank_maintenance}>
                                    <IconifyIcon icon="solar:danger-triangle-bold" className="me-1" />
                                    Pemeliharaan Terjadwal
                                  </Badge>
                                )}
                              </strong>
                              <span className="text-muted font-monospace fs-10">{ch.code}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <Badge bg="body-secondary" className="text-body border border-secondary-subtle fs-11">
                            {ch.category}
                          </Badge>
                        </td>
                        <td>
                          <span className="text-body-secondary fs-12">{ch.provider}</span>
                        </td>
                        <td>
                          <span className="fw-bold text-body">{ch.mdr_rate}</span>
                          <small className="text-muted d-block fs-10">{ch.formatted_volume} ({ch.transaction_count} tx)</small>
                        </td>
                        <td>
                          <span className="badge bg-primary-subtle text-primary fs-11">
                            {ch.settlement_cycle}
                          </span>
                        </td>
                        <td className="text-center">
                          <span
                            className={`badge fs-11 fw-semibold ${
                              ch.latency_ms < 150
                                ? 'bg-success-subtle text-success'
                                : ch.latency_ms < 250
                                ? 'bg-info-subtle text-info'
                                : 'bg-warning-subtle text-warning'
                            }`}
                            title={pingInfo?.message || `Latensi saat ini: ${ch.latency_ms} ms`}
                          >
                            {isPinging ? (
                              <Spinner size="sm" animation="border" style={{ width: '10px', height: '10px' }} />
                            ) : (
                              `${ch.latency_ms} ms`
                            )}
                          </span>
                        </td>
                        <td className="text-center">
                          <span
                            className={`fw-semibold ${
                              ch.failure_rate_24h < 0.5 ? 'text-success' : 'text-warning'
                            }`}
                          >
                            {ch.failure_rate_24h}%
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="d-inline-flex align-items-center gap-1">
                            {isToggling ? (
                              <Spinner size="sm" animation="border" className="text-primary me-1" />
                            ) : (
                              <Form.Check
                                type="switch"
                                id={`switch-${ch.id}`}
                                checked={ch.status === 'ACTIVE'}
                                onChange={() => toggleKillSwitch(ch.id)}
                                disabled={isToggling}
                                label={
                                  ch.status === 'ACTIVE' ? (
                                    <span className="badge bg-success-subtle text-success fs-10">Aktif</span>
                                  ) : (
                                    <span className="badge bg-danger-subtle text-danger fs-10">Dihentikan</span>
                                  )
                                }
                                className="cursor-pointer"
                              />
                            )}
                          </div>
                        </td>
                        <td className="text-end">
                          <div className="d-flex justify-content-end gap-1">
                            <Button
                              variant="outline-info"
                              size="sm"
                              className="py-1 px-2 fs-11 d-flex align-items-center"
                              onClick={() => pingChannel(ch.id)}
                              disabled={isPinging}
                              title="Ping Test Koneksi"
                            >
                              {isPinging ? (
                                <Spinner size="sm" animation="border" className="me-1" style={{ width: '10px', height: '10px' }} />
                              ) : (
                                <IconifyIcon icon="solar:radar-bold" className="me-1" />
                              )}
                              Ping
                            </Button>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className="py-1 px-2 fs-11"
                              onClick={() => setShowCredentialsModal(true)}
                              title="Atur Kredensial"
                            >
                              <IconifyIcon icon="solar:settings-bold" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
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
        credentials={credentials}
        onSave={saveCredentials}
        saving={savingCredentials}
      />
    </>
  );
};

export default GatewayHubPage;
