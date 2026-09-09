// src/app/(admin)/escrow/components/DisbursementApprovalModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert, Badge } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { formatRupiah } from '../data';

const DisbursementApprovalModal = ({
  show,
  onHide,
  payout,
  config,
  onApprove,
  onReject,
  isSubmitting = false,
}) => {
  const [totpPin, setTotpPin] = useState('');
  const [approvalNote, setApprovalNote] = useState('');
  const [localSubmitting, setLocalSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRejectMode, setIsRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState('Indikasi anomali transaksi atau audit investigasi finansial.');

  useEffect(() => {
    if (show) {
      setTotpPin('');
      setApprovalNote('');
      setErrorMessage('');
      setIsRejectMode(false);
      setRejectReason('Indikasi anomali transaksi atau audit investigasi finansial.');
    }
  }, [show, payout]);

  if (!payout) return null;

  const payoutId = payout.payout_id || payout.payoutId || '-';
  const storeName = payout.store_name || payout.storeName || '-';
  const destinationBank = payout.destination_bank || payout.destinationBank || '-';
  const destinationAccount = payout.destination_account || payout.destinationAccount || '-';
  const destinationHolder = payout.destination_holder || payout.destinationHolder || '-';
  const requestedAmount = payout.requested_amount ?? payout.requestedAmount ?? 0;
  const formattedRequested = payout.formatted_requested || formatRupiah(requestedAmount);
  const bankFee = payout.bank_fee ?? payout.bankFee ?? 0;
  const formattedBankFee = payout.formatted_bank_fee || formatRupiah(bankFee);
  const netTransferAmount = payout.net_transfer_amount ?? payout.netTransferAmount ?? 0;
  const formattedNet = payout.formatted_net || formatRupiah(netTransferAmount);
  const note = payout.note || payout.approval_note || payout.approvalNote || '';

  const submitting = isSubmitting || localSubmitting;

  const handleSubmitApprove = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (totpPin.length !== 6) {
      setErrorMessage('Harap masukkan 6-digit PIN Token TOTP Authenticator yang valid (Contoh: 849201).');
      return;
    }

    setLocalSubmitting(true);
    try {
      const success = await onApprove({
        payoutId,
        totpPin,
        notes: approvalNote || 'Disetujui setelah verifikasi saldo escrow & mutasi bank.',
      });
      if (success) {
        onHide();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Gagal memproses otorisasi 2FA.');
    } finally {
      setLocalSubmitting(false);
    }
  };

  const handleSubmitReject = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!rejectReason.trim()) {
      setErrorMessage('Harap masukkan alasan penolakan/penahanan audit pencairan ini.');
      return;
    }

    setLocalSubmitting(true);
    try {
      const success = await onReject({
        payoutId,
        rejectReason,
        notes: approvalNote,
      });
      if (success) {
        onHide();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Gagal menahan pencairan dana.');
    } finally {
      setLocalSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-secondary-subtle">
        <Modal.Title className="d-flex align-items-center fs-16 fw-bold text-body">
          <IconifyIcon
            icon={isRejectMode ? 'solar:shield-cross-bold-duotone' : 'solar:shield-warning-bold-duotone'}
            className={`${isRejectMode ? 'text-danger' : 'text-warning'} me-2 fs-22`}
          />
          {isRejectMode
            ? 'Penahanan Audit Pencairan Dana (Finance Audit Hold)'
            : 'Persetujuan Pencairan Dana (Manual 2-Factor Approval)'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* ROLE_FINANCE_LEAD SECURITY BADGE */}
        <div
          className={`d-flex align-items-center justify-content-between p-3 rounded-2 border mb-3 ${
            isRejectMode
              ? 'bg-danger-subtle border-danger-subtle'
              : 'bg-warning-subtle border-warning-subtle'
          }`}
        >
          <div className="d-flex align-items-center gap-3">
            <IconifyIcon
              icon={isRejectMode ? 'solar:shield-cross-bold' : 'solar:user-check-rounded-bold'}
              className={`${isRejectMode ? 'text-danger' : 'text-warning'} fs-24 flex-shrink-0`}
            />
            <div>
              <h6 className="mb-0 fs-13 fw-bold text-body">
                Otorisasi Khusus: <span className={isRejectMode ? 'text-danger' : 'text-warning'}>{config?.manual_approval_role || 'ROLE_FINANCE_LEAD'}</span>
              </h6>
              <small className="text-muted fs-11">
                Penarikan bernilai &ge; {config?.formatted_auto_limit || formatRupiah(config?.auto_disbursement_limit || 10000000)} mewajibkan verifikasi manual ganda sesuai SOP Tata Kelola Escrow Indovia.
              </small>
            </div>
          </div>
          <Badge bg={isRejectMode ? 'danger' : 'warning'} className={`${isRejectMode ? 'text-white' : 'text-dark'} fs-11 px-3 py-1.5 fw-bold`}>
            {isRejectMode ? 'Audit Hold Action' : 'High-Value Payout'}
          </Badge>
        </div>

        {/* PAYOUT DETAILS SUMMARY */}
        <div className="p-3 rounded-2 bg-body-secondary border border-secondary-subtle mb-3">
          <Row className="g-2 fs-12">
            <Col sm={6}>
              <span className="text-muted d-block">ID Pencairan:</span>
              <strong className="text-body font-monospace fs-13">{payoutId}</strong>
            </Col>
            <Col sm={6}>
              <span className="text-muted d-block">Merchant / Toko:</span>
              <strong className="text-body">{storeName}</strong>
            </Col>
            <Col sm={6}>
              <span className="text-muted d-block">Bank Tujuan Transfer:</span>
              <span className="badge bg-body text-body border border-secondary-subtle fs-11 fw-bold">
                {destinationBank} - {destinationAccount}
              </span>
            </Col>
            <Col sm={6}>
              <span className="text-muted d-block">Nama Pemilik Rekening:</span>
              <strong className="text-success">{destinationHolder}</strong>
            </Col>
          </Row>

          <hr className="my-2 border-secondary-subtle" />

          <Row className="g-2 fs-12">
            <Col sm={4}>
              <span className="text-muted d-block">Nominal Penarikan:</span>
              <span className="fs-14 fw-bold text-body">{formattedRequested}</span>
            </Col>
            <Col sm={4}>
              <span className="text-muted d-block">Biaya Kliring Bank:</span>
              <span className="fs-13 text-muted">{formattedBankFee}</span>
            </Col>
            <Col sm={4}>
              <span className="text-muted d-block">Bersih yang Ditransfer:</span>
              <span className="fs-15 fw-bold text-success">{formattedNet}</span>
            </Col>
          </Row>
        </div>

        {/* NOTE FROM MERCHANT */}
        {note && (
          <div className="p-2.5 rounded-2 bg-body-tertiary border border-secondary-subtle mb-3 fs-12">
            <span className="text-muted fw-semibold me-1">Catatan Pengajuan Toko:</span>
            <span className="text-body italic">"{note}"</span>
          </div>
        )}

        {errorMessage && (
          <Alert variant="danger" className="py-2 px-3 fs-12 d-flex align-items-center mb-3">
            <IconifyIcon icon="solar:danger-triangle-bold" className="me-2 fs-16 flex-shrink-0" />
            <div>{errorMessage}</div>
          </Alert>
        )}

        {/* MODE TOGGLE / FORM */}
        {!isRejectMode ? (
          <Form onSubmit={handleSubmitApprove}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body d-flex justify-content-between">
                    <span>6-Digit Security Token / TOTP PIN</span>
                    <span className="text-muted fs-11">Google Authenticator</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    maxLength={6}
                    placeholder="Contoh: 849201"
                    value={totpPin}
                    onChange={(e) => {
                      setErrorMessage('');
                      setTotpPin(e.target.value.replace(/\D/g, ''));
                    }}
                    className="bg-body text-body border-secondary-subtle fs-16 font-monospace text-center fw-bold letter-spacing-2"
                    autoFocus
                    required
                  />
                  <Form.Text className="text-muted fs-11 d-block mt-1">
                    Masukkan PIN 6-digit dari aplikasi 2FA pimpinan keuangan (Testing: <strong>849201</strong>).
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body">
                    Catatan Persetujuan Finance (Audit Trail)
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Contoh: Mutasi escrow valid, tidak ada indikasi fraud pesanan."
                    value={approvalNote}
                    onChange={(e) => setApprovalNote(e.target.value)}
                    className="bg-body text-body border-secondary-subtle fs-12"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-secondary-subtle">
              <Button
                variant="outline-danger"
                size="sm"
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  setIsRejectMode(true);
                }}
                disabled={submitting}
                className="d-flex align-items-center px-3 py-1.5"
              >
                <IconifyIcon icon="solar:close-circle-bold" className="me-1.5 fs-16" />
                Tolak / Tahan Audit
              </Button>

              <div className="d-flex gap-2">
                <Button variant="outline-secondary" size="sm" onClick={onHide} disabled={submitting} className="px-3 py-1.5">
                  Batal
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  type="submit"
                  disabled={submitting}
                  className="d-flex align-items-center fw-semibold text-white px-3 py-1.5"
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Memverifikasi 2FA & Memicu API...
                    </>
                  ) : (
                    <>
                      <IconifyIcon icon="solar:check-read-bold" className="me-1.5 fs-16" />
                      Setujui & Eksekusi Payout API
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Form>
        ) : (
          <Form onSubmit={handleSubmitReject}>
            <Form.Group className="mb-3">
              <Form.Label className="fs-12 fw-semibold text-body">
                Alasan Penolakan / Penahanan Audit Finansial:
              </Form.Label>
              <Form.Select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="bg-body text-body border-secondary-subtle fs-12 mb-2"
              >
                <option value="Indikasi anomali transaksi atau audit investigasi finansial.">
                  Indikasi anomali transaksi / sengketa pesanan belum terselesaikan
                </option>
                <option value="Nama pemilik rekening bank tidak sesuai dengan dokumen KYC terverifikasi toko.">
                  Nama pemilik rekening bank tidak sesuai verifikasi identitas toko
                </option>
                <option value="Permintaan penahanan sementara atas instruksi manajemen risiko marketplace.">
                  Permintaan penahanan sementara oleh manajemen risiko
                </option>
                <option value="Lainnya">Alasan Spesifik Lainnya...</option>
              </Form.Select>

              {rejectReason === 'Lainnya' && (
                <Form.Control
                  type="text"
                  placeholder="Tuliskan alasan penahanan secara detail..."
                  className="bg-body text-body border-secondary-subtle fs-12 mt-2"
                  onChange={(e) => setRejectReason(e.target.value)}
                  required
                />
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fs-12 fw-semibold text-body">
                Catatan Tambahan untuk Merchant / Tim Terkait:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Instruksi perbaikan bagi merchant..."
                value={approvalNote}
                onChange={(e) => setApprovalNote(e.target.value)}
                className="bg-body text-body border-secondary-subtle fs-12"
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-secondary-subtle">
              <Button
                variant="outline-secondary"
                size="sm"
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  setIsRejectMode(false);
                }}
                disabled={submitting}
                className="px-3 py-1.5"
              >
                Kembali ke Form Persetujuan
              </Button>

              <Button
                variant="danger"
                size="sm"
                type="submit"
                disabled={submitting}
                className="d-flex align-items-center fw-semibold text-white px-3 py-1.5"
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Menahan Payout...
                  </>
                ) : (
                  <>
                    <IconifyIcon icon="solar:shield-cross-bold" className="me-1.5 fs-16" />
                    Konfirmasi Tahan Audit
                  </>
                )}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DisbursementApprovalModal;
