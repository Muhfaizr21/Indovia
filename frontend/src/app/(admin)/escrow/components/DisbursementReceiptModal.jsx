// src/app/(admin)/escrow/components/DisbursementReceiptModal.jsx
import React from 'react';
import { Modal, Button, Row, Col, Badge } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { formatRupiah } from '../data';

const DisbursementReceiptModal = ({ show, onHide, payout }) => {
  if (!payout) return null;

  const payoutId = payout.payout_id || payout.payoutId || '-';
  const storeName = payout.store_name || payout.storeName || '-';
  const merchantId = payout.merchant_code || payout.merchant_id || payout.merchantId || '-';
  const destinationBank = payout.destination_bank || payout.destinationBank || '-';
  const destinationAccount = payout.destination_account || payout.destinationAccount || '-';
  const destinationHolder = payout.destination_holder || payout.destinationHolder || '-';
  const requestedAmount = payout.requested_amount ?? payout.requestedAmount ?? 0;
  const formattedRequested = payout.formatted_requested || formatRupiah(requestedAmount);
  const bankFee = payout.bank_fee ?? payout.bankFee ?? 0;
  const formattedBankFee = payout.formatted_bank_fee || formatRupiah(bankFee);
  const netTransferAmount = payout.net_transfer_amount ?? payout.netTransferAmount ?? 0;
  const formattedNet = payout.formatted_net || formatRupiah(netTransferAmount);
  const status = payout.status || '-';
  const gatewayRef = payout.gateway_reference || payout.gatewayReference || `BI-FAST-${payoutId}`;
  const timestamp = payout.approved_timestamp || payout.approvedTimestamp || payout.request_timestamp || payout.requestTimestamp || new Date().toLocaleString('id-ID');
  const approvedBy = payout.approved_by || payout.approvedBy || (payout.approval_type === 'AUTO_DISBURSE' ? 'Sistem Otomatis BI-FAST Iris API' : 'Tim Finansial Indovia');
  const approvalNote = payout.approval_note || payout.approvalNote || '-';

  const getCustodySenderInfo = (bank) => {
    const b = (bank || '').toUpperCase();
    if (b.includes('BCA')) {
      return {
        bankTitle: 'PT Indovia Digital Nusantara (Escrow Pool BCA)',
        accountDesc: 'Bank Central Asia Custody Account',
        accountNumber: '804-552-1920',
      };
    } else if (b.includes('BNI')) {
      return {
        bankTitle: 'PT Indovia Digital Nusantara (Escrow Pool BNI)',
        accountDesc: 'Bank Negara Indonesia Custody Account',
        accountNumber: '023-889-1029',
      };
    } else if (b.includes('BRI')) {
      return {
        bankTitle: 'PT Indovia Digital Nusantara (Escrow Pool BRI)',
        accountDesc: 'Bank Rakyat Indonesia Custody Account',
        accountNumber: '0019-01-000452-30-1',
      };
    } else if (b.includes('BSI')) {
      return {
        bankTitle: 'PT Indovia Digital Nusantara (Escrow Pool BSI Syariah)',
        accountDesc: 'Bank Syariah Indonesia Custody Account',
        accountNumber: '712-990-4412',
      };
    }
    return {
      bankTitle: 'PT Indovia Digital Nusantara (Escrow Pool Mandiri)',
      accountDesc: 'Bank Mandiri Escrow Custody Account',
      accountNumber: '137-00-9988112-4',
    };
  };

  const senderCustody = getCustodySenderInfo(destinationBank);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-secondary-subtle">
        <Modal.Title className="d-flex align-items-center fs-16 fw-bold text-body">
          <IconifyIcon icon="solar:bill-check-bold-duotone" className="text-success me-2 fs-22" />
          Kuitansi Resmi Pencairan Dana (Official Disbursement Receipt)
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* RECEIPT CARD */}
        <div className="p-4 rounded-3 border border-secondary-subtle bg-body shadow-sm" id="disbursement-printable-receipt">
          {/* TOP HEADER */}
          <div className="d-flex flex-wrap justify-content-between align-items-center pb-3 border-bottom border-secondary-subtle mb-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="badge bg-primary text-white fs-12 px-2.5 py-1 fw-bold">
                  INDOVIA ESCROW
                </span>
                <span className="badge bg-success-subtle text-success fs-11 fw-semibold">
                  <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
                  BERHASIL DITRANSFER
                </span>
              </div>
              <h5 className="fw-bold mb-0 text-body">Bukti Kliring Transfer Perbankan</h5>
              <small className="text-muted fs-11">Jaringan Settlement: BI-FAST & Payout Iris Network</small>
            </div>
            <div className="text-sm-end mt-2 mt-sm-0">
              <span className="text-muted fs-11 d-block">Nomor Referensi Gateway:</span>
              <strong className="text-body font-monospace fs-13">{gatewayRef}</strong>
              <small className="text-muted fs-11 d-block">{timestamp}</small>
            </div>
          </div>

          {/* SENDER & BENEFICIARY INFO */}
          <Row className="g-3 mb-3">
            <Col sm={6}>
              <div className="p-3 rounded-2 bg-body-tertiary border border-secondary-subtle h-100">
                <span className="text-muted fs-11 fw-semibold text-uppercase d-block mb-1">Rekening Pengirim (Escrow Pool)</span>
                <strong className="text-body fs-13 d-block">{senderCustody.bankTitle}</strong>
                <span className="text-muted fs-12 d-block">{senderCustody.accountDesc}</span>
                <span className="font-monospace fs-12 text-secondary">No. Rek: {senderCustody.accountNumber}</span>
              </div>
            </Col>
            <Col sm={6}>
              <div className="p-3 rounded-2 bg-body-tertiary border border-secondary-subtle h-100">
                <span className="text-muted fs-11 fw-semibold text-uppercase d-block mb-1">Penerima Dana (Merchant)</span>
                <strong className="text-body fs-13 d-block">{storeName}</strong>
                <span className="text-success fs-12 fw-semibold d-block">a.n. {destinationHolder}</span>
                <span className="font-monospace fs-12 text-secondary">
                  {destinationBank} - {destinationAccount} (Merchant ID: {merchantId})
                </span>
              </div>
            </Col>
          </Row>

          {/* FINANCIAL BREAKDOWN TABLE */}
          <div className="rounded-2 border border-secondary-subtle overflow-hidden mb-3">
            <div className="d-flex justify-content-between p-2.5 bg-body-secondary border-bottom border-secondary-subtle fs-12 fw-semibold text-body">
              <span>Deskripsi Penarikan Saldo</span>
              <span className="text-end">Rincian Finansial (IDR)</span>
            </div>
            <div className="p-3 fs-12">
              <div className="d-flex justify-content-between py-1">
                <span className="text-body">Jumlah Bruto Penarikan (Gross Payout)</span>
                <span className="fw-semibold text-body">{formattedRequested}</span>
              </div>
              <div className="d-flex justify-content-between py-1 border-bottom border-secondary-subtle pb-2">
                <span className="text-muted">Biaya Administrasi Jaringan Antar-Bank (Flat Fee)</span>
                <span className="text-danger">- {formattedBankFee}</span>
              </div>
              <div className="d-flex justify-content-between py-2 pt-2.5 fs-14 fw-bold">
                <span className="text-success">Total Dana Bersih Masuk Rekening (Net Transferred)</span>
                <span className="text-success fs-15">{formattedNet}</span>
              </div>
            </div>
          </div>

          {/* AUDIT DETAILS */}
          <div className="p-3 rounded-2 bg-body-secondary border border-secondary-subtle fs-11 text-muted">
            <Row className="g-2">
              <Col sm={6}>
                <span className="d-block">Otorisasi / Pemroses:</span>
                <strong className="text-body">{approvedBy}</strong>
              </Col>
              <Col sm={6}>
                <span className="d-block">Status Validasi:</span>
                <span className="text-success fw-semibold">Lolos Validasi Rekonsiliasi Escrow Bank</span>
              </Col>
              {approvalNote && approvalNote !== '-' && (
                <Col sm={12} className="mt-1">
                  <span className="d-block">Catatan Audit:</span>
                  <span className="text-body italic">"{approvalNote}"</span>
                </Col>
              )}
            </Row>
          </div>

          {/* FOOTER NOTICE */}
          <div className="mt-3 pt-2 text-center text-muted fs-11 border-top border-secondary-subtle">
            <p className="mb-0">
              Dokumen ini merupakan bukti sah settlement pencairan dana escrow yang diterbitkan secara otomatis oleh Sistem Kliring Otomatis Indovia Marketplace.
            </p>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-secondary-subtle d-flex justify-content-between">
        <Button variant="outline-secondary" size="sm" onClick={onHide}>
          Tutup
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="d-flex align-items-center fw-semibold text-white"
          style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
          onClick={handlePrint}
        >
          <IconifyIcon icon="solar:printer-bold" className="me-1.5 fs-15" />
          Cetak / Unduh Bukti Transfer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DisbursementReceiptModal;
