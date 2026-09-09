// src/app/(admin)/escrow/disbursements/page.jsx
import React from 'react';
import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Row, Col, Card, CardBody, Table, Badge, Form, Modal, Alert, Spinner } from 'react-bootstrap';
import DisbursementApprovalModal from '../components/DisbursementApprovalModal';
import DisbursementReceiptModal from '../components/DisbursementReceiptModal';
import { useDisbursements } from '../hooks/useDisbursements';
import { formatRupiah } from '../data';

const PayoutDisbursementsPage = () => {
  const {
    overview,
    queue,
    config,
    loading,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    selectedPayoutForApproval,
    setSelectedPayoutForApproval,
    showConfigModal,
    setShowConfigModal,
    tempConfig,
    setTempConfig,
    selectedPayoutForReceipt,
    setSelectedPayoutForReceipt,
    isSubmitting2FA,
    isExecutingBatch,
    isSavingConfig,
    toastNotification,
    setToastNotification,
    fetchDisbursements,
    handleApprove,
    handleReject,
    handleBatchPayout,
    handleSaveConfig,
  } = useDisbursements();

  const handleConfigSubmit = async (e) => {
    e.preventDefault();
    await handleSaveConfig(tempConfig);
  };

  const getScheduleLabel = (code) => {
    switch (code) {
      case 'DAILY_T1':
        return 'Otomatis Harian (T+1)';
      case 'WEEKLY':
        return 'Otomatis Mingguan (Senin)';
      case 'ON_DEMAND':
        return 'Sesuai Permintaan (On-Demand)';
      default:
        return code || 'Otomatis Harian (T+1)';
    }
  };

  return (
    <>
      <PageTItle title="Pencairan Saldo Toko (Payout Disbursement Management)" />

      {/* ACTION NOTIFICATION TOAST */}
      {toastNotification && (
        <Alert
          variant={toastNotification.variant || 'success'}
          dismissible
          onClose={() => setToastNotification(null)}
          className="d-flex align-items-center justify-content-between mb-3 shadow-sm border"
        >
          <div className="d-flex align-items-center">
            <IconifyIcon
              icon={
                toastNotification.variant === 'danger'
                  ? 'solar:danger-triangle-bold'
                  : toastNotification.variant === 'warning'
                  ? 'solar:shield-warning-bold'
                  : 'solar:check-circle-bold'
              }
              className="me-2 fs-20 flex-shrink-0"
            />
            <div>
              <strong>{toastNotification.title}: </strong>
              <span>{toastNotification.message}</span>
            </div>
          </div>
          <small className="text-muted ms-3 font-monospace fs-11">{toastNotification.timestamp}</small>
        </Alert>
      )}

      {/* HEADER ACTION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1 text-body">4.3 Payout Disbursement Management</h4>
          <p className="text-muted fs-12 mb-0">
            Mesin Pencairan Dana Merchant Otomatis &amp; Alur Manual 2-Factor Approval untuk Transaksi &ge; {config.formatted_auto_limit || 'Rp 10.000.000'} ({config.manual_approval_role || 'ROLE_FINANCE_LEAD'})
          </p>
        </div>
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center"
            onClick={() => {
              setTempConfig({ ...config });
              setShowConfigModal(true);
            }}
          >
            <IconifyIcon icon="solar:settings-bold" className="me-1.5" />
            Parameter Payout Global
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            className="d-flex align-items-center"
            onClick={() => fetchDisbursements(searchTerm, filterType)}
            disabled={loading}
          >
            <IconifyIcon icon="solar:refresh-bold" className={`me-1 ${loading ? 'spin' : ''}`} />
            Segarkan
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="d-flex align-items-center fw-semibold text-white"
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            onClick={handleBatchPayout}
            disabled={isExecutingBatch}
          >
            {isExecutingBatch ? (
              <>
                <Spinner size="sm" className="me-1.5" />
                Mengeksekusi BI-FAST...
              </>
            ) : (
              <>
                <IconifyIcon icon="solar:play-circle-bold" className="me-1.5 fs-15" />
                Eksekusi Batch Payout Terjadwal (T+1)
              </>
            )}
          </Button>
        </div>
      </div>

      {/* PARAMETERS SUMMARY CARDS */}
      <Row className="g-3 mb-4">
        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '4px solid #6366f1' }}>
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-1 fs-12 fw-medium">Jadwal Pencairan Standar</p>
                  <h4 className="mt-0 mb-1 fw-bold text-body fs-16">
                    {getScheduleLabel(config.default_schedule)}
                  </h4>
                  <small className="text-muted fs-11">
                    Cut-off BI-FAST: <strong>{config.cut_off_time || '13:00 WIB'}</strong>
                  </small>
                </div>
                <div
                  className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'rgba(99, 102, 241, 0.12)', color: '#6366f1' }}
                >
                  <IconifyIcon icon="solar:calendar-bold-duotone" className="fs-24" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col sm={6} xl={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderLeft: '4px solid #16a34a' }}>
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-1 fs-12 fw-medium">Batas Minimal Penarikan</p>
                  <h4 className="mt-0 mb-1 fw-bold text-success fs-16">
                    {config.formatted_min_withdrawal || formatRupiah(config.min_withdrawal)}
                  </h4>
                  <small className="text-muted fs-11">
                    Biaya Transfer: <strong>{config.formatted_bank_fee || formatRupiah(config.bank_transfer_fee)}</strong>
                  </small>
                </div>
                <div
                  className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'rgba(22, 163, 74, 0.12)', color: '#16a34a' }}
                >
                  <IconifyIcon icon="solar:wallet-2-bold-duotone" className="fs-24" />
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
                  <p className="text-muted mb-1 fs-12 fw-medium">Ambang Batas Auto-Disburse</p>
                  <h4 className="mt-0 mb-1 fw-bold text-primary fs-16">
                    &lt; {config.formatted_auto_limit || formatRupiah(config.auto_disbursement_limit)}
                  </h4>
                  <small className="text-muted fs-11">
                    Direct API Xendit / Midtrans Iris
                  </small>
                </div>
                <div
                  className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6' }}
                >
                  <IconifyIcon icon="solar:bolt-bold-duotone" className="fs-24" />
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
                  <p className="text-muted mb-1 fs-12 fw-medium">Wajib Manual 2FA Approval</p>
                  <h4 className="mt-0 mb-1 fw-bold text-warning fs-16">
                    &ge; {config.formatted_auto_limit || formatRupiah(config.auto_disbursement_limit)}
                  </h4>
                  <small className="text-warning fw-semibold fs-11 d-block">
                    {overview?.total_pending_approval_count > 0 ? (
                      <span>{overview.total_pending_approval_count} Pengajuan Menunggu</span>
                    ) : (
                      <span>Otorisasi: {config.manual_approval_role || 'ROLE_FINANCE_LEAD'}</span>
                    )}
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
      </Row>

      {/* REALTIME SETTLEMENT SUMMARY BAR */}
      {overview && (
        <Card className="border-0 shadow-sm mb-4 bg-body-secondary">
          <CardBody className="p-3">
            <Row className="g-3 align-items-center">
              <Col md={6}>
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2 rounded-circle bg-success-subtle text-success">
                    <IconifyIcon icon="solar:hand-money-bold" className="fs-22" />
                  </div>
                  <div>
                    <span className="text-muted fs-11 fw-semibold text-uppercase d-block">Total Payout Berhasil Kliring Hari Ini</span>
                    <h5 className="mb-0 fw-bold text-success fs-16">
                      {overview.formatted_disbursed_today || 'Rp 0'}{' '}
                      <small className="text-muted fs-11 fw-normal">({overview.total_disbursed_count || 0} transaksi)</small>
                    </h5>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2 rounded-circle bg-warning-subtle text-warning">
                    <IconifyIcon icon="solar:clock-circle-bold" className="fs-22" />
                  </div>
                  <div>
                    <span className="text-muted fs-11 fw-semibold text-uppercase d-block">Total Nominal Menunggu 2FA Approval</span>
                    <h5 className="mb-0 fw-bold text-warning fs-16">
                      {overview.formatted_pending_approval_amount || 'Rp 0'}{' '}
                      <small className="text-muted fs-11 fw-normal">({overview.total_pending_approval_count || 0} transaksi tertahan)</small>
                    </h5>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      )}

      {/* DISBURSEMENT QUEUE TABLE */}
      <Card className="border-0 shadow-sm mb-4">
        <CardBody className="p-3 p-md-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <h5 className="fw-bold text-body mb-0 fs-15">
                Antrean Permintaan Pencairan Saldo (Disbursement Queue)
              </h5>
              <p className="text-muted fs-12 mb-0">
                Pencairan otomatis sistem vs verifikasi 2-Factor Authentication untuk nominal besar
              </p>
            </div>

            <div className="d-flex flex-wrap gap-2">
              <Form.Control
                type="text"
                size="sm"
                placeholder="Cari ID / Merchant / Rekening..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-body text-body border-secondary-subtle"
                style={{ width: '220px' }}
              />
              <Form.Select
                size="sm"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-body text-body border-secondary-subtle"
                style={{ width: '220px' }}
              >
                <option value="ALL">Semua Antrean Payout</option>
                <option value="NEED_APPROVAL">
                  Butuh Approval 2FA ({config?.formatted_auto_limit ? `\u2265 ${config.formatted_auto_limit}` : '\u2265 10jt'})
                </option>
                <option value="AUTO_PROCESSED">Auto-Disbursed Selesai</option>
                <option value="APPROVED">Telah Disetujui Finance</option>
                <option value="REJECTED">Audit Hold</option>
              </Form.Select>
            </div>
          </div>

          <div className="table-responsive rounded-2 border border-secondary-subtle">
            <Table hover className="table-nowrap mb-0 align-middle">
              <thead className="bg-body-tertiary fs-11 text-uppercase text-muted">
                <tr>
                  <th className="py-2.5">ID Pencairan &amp; Waktu</th>
                  <th>Merchant / Toko</th>
                  <th>Rekening Penerima Transfer</th>
                  <th className="text-end">Nominal Penarikan</th>
                  <th className="text-end">Biaya Bank</th>
                  <th className="text-end">Bersih Ditransfer</th>
                  <th>Mekanisme Approval</th>
                  <th>Status Transaksi</th>
                  <th className="text-end">Aksi Otorisasi</th>
                </tr>
              </thead>
              <tbody className="fs-12">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="text-center py-5">
                      <Spinner animation="border" variant="primary" size="sm" className="me-2" />
                      <span className="text-muted fs-13">Memuat antrean pencairan dana dari server database...</span>
                    </td>
                  </tr>
                ) : queue.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-5 text-muted">
                      <IconifyIcon icon="solar:box-minimalistic-bold-duotone" className="fs-32 mb-2 d-block mx-auto text-secondary" />
                      Tidak ada data antrean pencairan yang cocok dengan filter.
                    </td>
                  </tr>
                ) : (
                  queue.map((item) => {
                    const pId = item.payout_id || item.payoutId;
                    const sName = item.store_name || item.storeName;
                    const mCode = item.merchant_code || item.merchant_id || item.merchantId;
                    const dBank = item.destination_bank || item.destinationBank;
                    const dAcc = item.destination_account || item.destinationAccount;
                    const dHolder = item.destination_holder || item.destinationHolder;
                    const reqAmt = item.formatted_requested || formatRupiah(item.requested_amount || item.requestedAmount);
                    const bFee = item.formatted_bank_fee || formatRupiah(item.bank_fee || item.bankFee);
                    const netAmt = item.formatted_net || formatRupiah(item.net_transfer_amount || item.netTransferAmount);
                    const appType = item.approval_type || item.approvalType;
                    const appRole = item.approval_role || item.approvalRole;
                    const reqTime = item.request_timestamp || item.requestTimestamp;
                    const gwRef = item.gateway_reference || item.gatewayReference;
                    const status = item.status;

                    return (
                      <tr key={pId}>
                        <td>
                          <strong className="text-body font-monospace d-block">{pId}</strong>
                          <small className="text-muted fs-11">{reqTime}</small>
                        </td>
                        <td>
                          <span className="fw-semibold text-body d-block">{sName}</span>
                          <small className="text-muted font-monospace fs-10">ID: {mCode}</small>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-1.5">
                            <Badge bg="body-secondary" className="text-body border border-secondary-subtle fs-11">
                              {dBank}
                            </Badge>
                            <span className="text-body font-monospace fs-11">{dAcc}</span>
                          </div>
                          <small className="text-success fs-11 d-block fw-semibold">{dHolder}</small>
                        </td>
                        <td className="text-end fw-bold text-body fs-13">
                          {reqAmt}
                        </td>
                        <td className="text-end text-muted">
                          {bFee}
                        </td>
                        <td className="text-end fw-bold text-success fs-13">
                          {netAmt}
                        </td>
                        <td>
                          {appType === 'MANUAL_2FA_REQUIRED' ? (
                            <div>
                              <Badge bg="warning-subtle" className="text-warning fs-11 d-block mb-1">
                                Manual 2FA ({config?.formatted_auto_limit ? `\u2265 ${config.formatted_auto_limit}` : '\u2265 10jt'})
                              </Badge>
                              <small className="text-muted fs-10">Oleh: {appRole}</small>
                            </div>
                          ) : (
                            <div>
                              <Badge bg="info-subtle" className="text-info fs-11 d-block mb-1">
                                Auto-Disbursement ({config?.formatted_auto_limit ? `< ${config.formatted_auto_limit}` : '< 10jt'})
                              </Badge>
                              <small className="text-muted fs-10">Via API Xendit / Midtrans</small>
                            </div>
                          )}
                        </td>
                        <td>
                          {status === 'PENDING_APPROVAL_FINANCE' && (
                            <Badge bg="warning" className="text-dark fs-11 px-2 py-1 fw-bold">
                              Menunggu 2FA Finance
                            </Badge>
                          )}
                          {status === 'AUTO_PROCESSED' && (
                            <div>
                              <Badge bg="success-subtle" className="text-success fs-11">
                                Terkirim (Auto)
                              </Badge>
                              {gwRef && (
                                <small className="text-muted d-block font-monospace fs-10">
                                  {gwRef}
                                </small>
                              )}
                            </div>
                          )}
                          {status === 'APPROVED_BY_FINANCE' && (
                            <div>
                              <Badge bg="primary-subtle" className="text-primary fs-11">
                                Disetujui 2FA (Kliring)
                              </Badge>
                              {gwRef && (
                                <small className="text-muted d-block font-monospace fs-10">
                                  {gwRef}
                                </small>
                              )}
                            </div>
                          )}
                          {status === 'REJECTED_AUDIT_HOLD' && (
                            <div>
                              <Badge bg="danger-subtle" className="text-danger fs-11">
                                Audit Hold
                              </Badge>
                              {item.reject_reason && (
                                <small className="text-danger d-block fs-10 text-truncate" style={{ maxWidth: '140px' }} title={item.reject_reason}>
                                  {item.reject_reason}
                                </small>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="text-end">
                          {status === 'PENDING_APPROVAL_FINANCE' ? (
                            <Button
                              variant="warning"
                              size="sm"
                              className="py-1 px-2.5 fs-11 fw-bold text-dark d-inline-flex align-items-center"
                              onClick={() => setSelectedPayoutForApproval(item)}
                            >
                              <IconifyIcon icon="solar:shield-check-bold" className="me-1 fs-14" />
                              Review &amp; 2FA
                            </Button>
                          ) : (
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              className="py-1 px-2 fs-11 d-inline-flex align-items-center"
                              onClick={() => setSelectedPayoutForReceipt(item)}
                            >
                              <IconifyIcon icon="solar:printer-bold" className="me-1" />
                              Kuitansi
                            </Button>
                          )}
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

      {/* 2-FACTOR APPROVAL MODAL */}
      <DisbursementApprovalModal
        show={!!selectedPayoutForApproval}
        onHide={() => setSelectedPayoutForApproval(null)}
        payout={selectedPayoutForApproval}
        config={config}
        onApprove={handleApprove}
        onReject={handleReject}
        isSubmitting={isSubmitting2FA}
      />

      {/* DISBURSEMENT RECEIPT MODAL */}
      <DisbursementReceiptModal
        show={!!selectedPayoutForReceipt}
        onHide={() => setSelectedPayoutForReceipt(null)}
        payout={selectedPayoutForReceipt}
      />

      {/* GLOBAL PAYOUT PARAMETERS MODAL */}
      <Modal show={showConfigModal} onHide={() => setShowConfigModal(false)} centered backdrop="static">
        <Modal.Header closeButton className="border-secondary-subtle">
          <Modal.Title className="fs-15 fw-bold text-body d-flex align-items-center">
            <IconifyIcon icon="solar:settings-bold-duotone" className="text-primary me-2 fs-20" />
            Konfigurasi Parameter Payout Global
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={handleConfigSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-12 fw-semibold text-body">
                Jadwal Siklus Pencairan Otomatis
              </Form.Label>
              <Form.Select
                value={tempConfig.default_schedule || tempConfig.defaultSchedule || 'DAILY_T1'}
                onChange={(e) => setTempConfig({ ...tempConfig, default_schedule: e.target.value })}
                className="bg-body text-body border-secondary-subtle fs-13"
              >
                <option value="DAILY_T1">Otomatis Harian (T+1 Cut-off 13:00 WIB)</option>
                <option value="WEEKLY">Otomatis Mingguan (Setiap Hari Senin)</option>
                <option value="ON_DEMAND">Berdasarkan Permintaan (On-Demand)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fs-12 fw-semibold text-body">
                Batas Minimal Penarikan (Rp)
              </Form.Label>
              <Form.Control
                type="number"
                value={tempConfig.min_withdrawal ?? tempConfig.minWithdrawal ?? 50000}
                onChange={(e) => setTempConfig({ ...tempConfig, min_withdrawal: Number(e.target.value) })}
                className="bg-body text-body border-secondary-subtle fs-13"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fs-12 fw-semibold text-body">
                Biaya Transfer Antar-Bank Flat (Rp)
              </Form.Label>
              <Form.Control
                type="number"
                value={tempConfig.bank_transfer_fee ?? tempConfig.bankTransferFee ?? 2500}
                onChange={(e) => setTempConfig({ ...tempConfig, bank_transfer_fee: Number(e.target.value) })}
                className="bg-body text-body border-secondary-subtle fs-13"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fs-12 fw-semibold text-body">
                Ambang Batas Auto-Disbursement (Rp)
              </Form.Label>
              <Form.Control
                type="number"
                value={tempConfig.auto_disbursement_limit ?? tempConfig.autoDisbursementLimit ?? 10000000}
                onChange={(e) => setTempConfig({ ...tempConfig, auto_disbursement_limit: Number(e.target.value) })}
                className="bg-body text-body border-secondary-subtle fs-13"
                required
              />
              <Form.Text className="text-muted fs-11">
                Penarikan bernilai sama atau di atas nominal ini wajib otorisasi 2FA manual oleh ROLE_FINANCE_LEAD.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fs-12 fw-semibold text-body">
                Waktu Cut-Off Kliring Harian
              </Form.Label>
              <Form.Control
                type="text"
                value={tempConfig.cut_off_time || tempConfig.cutOffTime || '13:00 WIB'}
                onChange={(e) => setTempConfig({ ...tempConfig, cut_off_time: e.target.value })}
                className="bg-body text-body border-secondary-subtle fs-13"
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top border-secondary-subtle">
              <Button variant="outline-secondary" size="sm" onClick={() => setShowConfigModal(false)} disabled={isSavingConfig}>
                Batal
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                disabled={isSavingConfig}
                className="fw-semibold text-white"
                style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
              >
                {isSavingConfig ? (
                  <>
                    <Spinner size="sm" className="me-1.5" />
                    Menyimpan...
                  </>
                ) : (
                  'Simpan Perubahan'
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PayoutDisbursementsPage;
