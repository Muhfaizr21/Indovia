// src/app/(admin)/escrow/ledger/page.jsx
import React from 'react';
import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Row, Col, Card, CardBody, Table, Badge, Form, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import MerchantAuditTrailModal from '../components/MerchantAuditTrailModal';
import DisputeLockModal from '../components/DisputeLockModal';
import { useMerchantLedger } from '../hooks/useMerchantLedger';
import { formatRupiah } from '../data';

const MerchantLedgerPage = () => {
  const {
    overview,
    merchants,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedMerchantForAudit,
    setSelectedMerchantForAudit,
    selectedMerchantForDispute,
    setSelectedMerchantForDispute,
    isProcessingDispute,
    journals,
    journalsLoading,
    toastNotification,
    setToastNotification,
    handleDisputeAction,
    handleExportCSV,
    fetchLedger,
  } = useMerchantLedger();

  return (
    <>
      <PageTItle title="Buku Besar Saldo Merchant (Settlement Ledger)" />

      {/* TOAST NOTIFICATION CONTAINER */}
      {toastNotification && (
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
          <Toast
            bg={toastNotification.variant}
            onClose={() => setToastNotification(null)}
            show={!!toastNotification}
            delay={5000}
            autohide
          >
            <Toast.Header closeButton>
              <IconifyIcon
                icon={
                  toastNotification.variant === 'success'
                    ? 'solar:check-circle-bold'
                    : toastNotification.variant === 'danger'
                    ? 'solar:danger-triangle-bold'
                    : 'solar:info-circle-bold'
                }
                className="me-2 fs-16"
              />
              <strong className="me-auto text-body">{toastNotification.title}</strong>
              <small className="text-muted">{toastNotification.timestamp}</small>
            </Toast.Header>
            <Toast.Body className="text-white fs-12">{toastNotification.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}

      {/* HEADER ACTION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1 text-body">4.2 Merchant Escrow Wallet & Settlement Ledger</h4>
          <p className="text-muted fs-12 mb-0">
            Buku Besar Digital Multi-Dompet Toko: Pemisahan Saldo Pending (Ekspedisi), Available (Siap Cair), dan Locked (Proteksi Sengketa)
          </p>
        </div>
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center"
            onClick={() => fetchLedger(searchTerm, statusFilter)}
            title="Segarkan data dari server"
          >
            <IconifyIcon icon="solar:refresh-bold" className={`me-1 ${loading ? 'spin' : ''}`} />
            Segarkan
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            className="d-flex align-items-center"
            onClick={handleExportCSV}
          >
            <IconifyIcon icon="solar:file-download-bold" className="me-1" />
            Ekspor Buku Besar CSV
          </Button>
        </div>
      </div>

      {/* TRIPLE-BALANCE SUMMARY HERO */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <div className="p-3 rounded-2 bg-body border border-warning-subtle shadow-sm h-100" style={{ borderLeft: '4px solid #f59e0b' }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex align-items-center gap-2">
                <IconifyIcon icon="solar:box-minimalistic-bold" className="text-warning fs-20" />
                <h6 className="mb-0 fw-bold text-body fs-13">1. pending_balance</h6>
              </div>
              <Badge bg="warning-subtle" className="text-warning fs-11">
                Logistik Ekspedisi
              </Badge>
            </div>
            <h4 className="fw-bold text-warning mb-1 fs-18">
              {overview?.formatted_pending || 'Rp 0'}
            </h4>
            <p className="text-muted fs-11 mb-0">
              Dana pesanan pembeli yang resinya sedang dalam proses pengiriman kurir logistik (JNE, J&T, SiCepat). Belum dapat dicairkan merchant.
            </p>
          </div>
        </Col>

        <Col md={4}>
          <div className="p-3 rounded-2 bg-body border border-success-subtle shadow-sm h-100" style={{ borderLeft: '4px solid #16a34a' }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex align-items-center gap-2">
                <IconifyIcon icon="solar:check-circle-bold" className="text-success fs-20" />
                <h6 className="mb-0 fw-bold text-body fs-13">2. available_balance</h6>
              </div>
              <Badge bg="success-subtle" className="text-success fs-11">
                Siap Pencairan T+1
              </Badge>
            </div>
            <h4 className="fw-bold text-success mb-1 fs-18">
              {overview?.formatted_available || 'Rp 0'}
            </h4>
            <p className="text-muted fs-11 mb-0">
              Dana pesanan yang telah <em>Delivered & Confirmed</em> atau selesai otomatis dalam <strong>2x24 jam</strong>. Siap dicairkan via Payout Engine.
            </p>
          </div>
        </Col>

        <Col md={4}>
          <div className="p-3 rounded-2 bg-body border border-danger-subtle shadow-sm h-100" style={{ borderLeft: '4px solid #ef4444' }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex align-items-center gap-2">
                <IconifyIcon icon="solar:lock-bold" className="text-danger fs-20" />
                <h6 className="mb-0 fw-bold text-body fs-13">3. locked_balance</h6>
              </div>
              <Badge bg="danger-subtle" className="text-danger fs-11">
                {overview?.active_dispute_count || 0} Toko Sengketa
              </Badge>
            </div>
            <h4 className="fw-bold text-danger mb-1 fs-18">
              {overview?.formatted_locked || 'Rp 0'}
            </h4>
            <p className="text-muted fs-11 mb-0">
              Dana yang dibekukan superadmin karena ada tiket sengketa retur / komplain barang rusak dari pembeli hingga mediasi CS selesai.
            </p>
          </div>
        </Col>
      </Row>

      {/* MERCHANT LEDGER DIRECTORY TABLE */}
      <Card className="border-0 shadow-sm mb-4">
        <CardBody className="p-3 p-md-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <div className="d-flex align-items-center gap-2">
                <h5 className="fw-bold text-body mb-0 fs-15">
                  Direktori Buku Besar & Saldo Merchant Terdaftar
                </h5>
                <Badge bg="secondary-subtle" className="text-body fs-11">
                  {merchants.length} Toko
                </Badge>
              </div>
              <p className="text-muted fs-12 mb-0">
                Monitoring komprehensif likuiditas merchant, rekening penampung, dan audit sengketa
              </p>
            </div>

            <div className="d-flex flex-wrap gap-2">
              <Form.Control
                type="text"
                size="sm"
                placeholder="Cari Toko / Kode / Pemilik..."
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
                <option value="ALL">Semua Status Merchant</option>
                <option value="HEALTHY">Sehat (Bebas Sengketa)</option>
                <option value="ACTIVE_DISPUTE">Ada Sengketa Aktif</option>
              </Form.Select>
            </div>
          </div>

          <div className="table-responsive rounded-2 border border-secondary-subtle">
            <Table hover className="table-nowrap mb-0 align-middle">
              <thead className="bg-body-tertiary fs-11 text-uppercase text-muted">
                <tr>
                  <th className="py-2.5">Merchant & Toko</th>
                  <th>Rekening Pencairan</th>
                  <th className="text-end">Available (Siap Cair)</th>
                  <th className="text-end">Pending (Ekspedisi)</th>
                  <th className="text-end">Locked (Sengketa)</th>
                  <th>Jadwal Payout</th>
                  <th className="text-center">Status Sengketa</th>
                  <th className="text-end">Aksi Buku Besar</th>
                </tr>
              </thead>
              <tbody className="fs-12">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-5">
                      <Spinner animation="border" size="sm" variant="primary" className="me-2" />
                      <span className="text-muted fs-12">Memuat data buku besar merchant...</span>
                    </td>
                  </tr>
                ) : merchants.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-5 text-muted fs-12">
                      Tidak ada merchant yang sesuai dengan kriteria pencarian atau filter.
                    </td>
                  </tr>
                ) : (
                  merchants.map((m) => {
                    const merchantId = m.merchant_id || m.merchantId || m.id;
                    const merchantCode = m.merchant_code || m.merchantCode || m.code || `IND-M-${merchantId}`;
                    const storeName = m.store_name || m.storeName || m.name;
                    const ownerName = m.owner_name || m.ownerName;
                    const bank = m.bank_account || m.bankAccount || {};
                    const bankName = bank.bank_name || bank.bankName || 'BCA';
                    const accountNum = bank.account_number || bank.accountNumber || '-';
                    const accountHolder = bank.account_holder || bank.accountHolder || ownerName;
                    const isVerified = bank.is_verified ?? bank.isVerified ?? false;

                    const availBal = m.available_balance ?? m.availableBalance ?? 0;
                    const formattedAvail = m.formatted_available || formatRupiah(availBal);
                    const pendBal = m.pending_balance ?? m.pendingBalance ?? 0;
                    const formattedPend = m.formatted_pending || formatRupiah(pendBal);
                    const lockBal = m.locked_balance ?? m.lockedBalance ?? 0;
                    const formattedLock = m.formatted_locked || formatRupiah(lockBal);

                    const payoutSchedule = m.payout_schedule || m.payoutSchedule || 'DAILY_T1';
                    const disputeCount = m.dispute_count ?? m.disputeCount ?? 0;

                    return (
                      <tr key={merchantId}>
                        <td>
                          <div>
                            <strong className="text-body fs-13 d-block">{storeName}</strong>
                            <div className="d-flex align-items-center gap-1">
                              <span className="text-muted font-monospace fs-10">{merchantCode}</span>
                              <span className="text-muted">•</span>
                              <span className="text-body-secondary fs-11">{ownerName}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-1.5">
                            <Badge bg="body-secondary" className="text-body border border-secondary-subtle fs-11">
                              {bankName}
                            </Badge>
                            <span className="text-body font-monospace fs-11">{accountNum}</span>
                            {isVerified && (
                              <IconifyIcon icon="solar:verified-check-bold" className="text-success fs-14" title="Rekening Terverifikasi" />
                            )}
                          </div>
                          <small className="text-muted fs-10 d-block">a.n. {accountHolder}</small>
                        </td>
                        <td className="text-end fw-bold text-success fs-13">
                          {formattedAvail}
                        </td>
                        <td className="text-end fw-semibold text-warning">
                          {formattedPend}
                        </td>
                        <td className="text-end fw-bold text-danger">
                          {lockBal > 0 ? (
                            formattedLock
                          ) : (
                            <span className="text-muted">Rp 0</span>
                          )}
                        </td>
                        <td>
                          <Badge
                            bg={
                              payoutSchedule === 'DAILY_T1'
                                ? 'primary-subtle'
                                : payoutSchedule === 'WEEKLY'
                                ? 'info-subtle'
                                : 'secondary-subtle'
                            }
                            className={
                              payoutSchedule === 'DAILY_T1'
                                ? 'text-primary fs-11'
                                : payoutSchedule === 'WEEKLY'
                                ? 'text-info fs-11'
                                : 'text-body fs-11'
                            }
                          >
                            {payoutSchedule === 'DAILY_T1'
                              ? 'Otomatis T+1'
                              : payoutSchedule === 'WEEKLY'
                              ? 'Mingguan'
                              : 'On-Demand'}
                          </Badge>
                        </td>
                        <td className="text-center">
                          {disputeCount > 0 ? (
                            <Badge bg="danger-subtle" className="text-danger fs-11">
                              {disputeCount} Sengketa
                            </Badge>
                          ) : (
                            <Badge bg="success-subtle" className="text-success fs-11">
                              Bersih
                            </Badge>
                          )}
                        </td>
                        <td className="text-end">
                          <div className="d-flex justify-content-end gap-1">
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="py-1 px-2 fs-11"
                              onClick={() => setSelectedMerchantForAudit(m)}
                              title="Buka Buku Besar Double-Entry"
                            >
                              <IconifyIcon icon="solar:book-bookmark-bold" className="me-1" />
                              Jurnal
                            </Button>
                            <Button
                              variant={lockBal > 0 ? 'outline-warning' : 'outline-danger'}
                              size="sm"
                              className="py-1 px-2 fs-11"
                              onClick={() => setSelectedMerchantForDispute(m)}
                              title="Kunci / Lepas Sengketa"
                            >
                              <IconifyIcon
                                icon={lockBal > 0 ? 'solar:lock-password-unlocked-bold' : 'solar:lock-bold'}
                                className="me-1"
                              />
                              Dispute
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

      {/* AUDIT TRAIL MODAL */}
      {selectedMerchantForAudit && (
        <MerchantAuditTrailModal
          show={!!selectedMerchantForAudit}
          onHide={() => setSelectedMerchantForAudit(null)}
          merchant={selectedMerchantForAudit}
          journals={journals}
          loading={journalsLoading}
        />
      )}

      {/* DISPUTE LOCK MODAL */}
      {selectedMerchantForDispute && (
        <DisputeLockModal
          show={!!selectedMerchantForDispute}
          onHide={() => setSelectedMerchantForDispute(null)}
          merchant={selectedMerchantForDispute}
          onConfirmAction={handleDisputeAction}
          isProcessing={isProcessingDispute}
        />
      )}
    </>
  );
};

export default MerchantLedgerPage;
