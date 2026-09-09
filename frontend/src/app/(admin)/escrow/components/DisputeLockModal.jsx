import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert, Badge, Spinner } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { formatRupiah } from '../data';

const DisputeLockModal = ({ show, onHide, merchant, onConfirmAction, isProcessing = false }) => {
  const [actionType, setActionType] = useState('LOCK'); // 'LOCK' | 'RELEASE'
  const [lockAmount, setLockAmount] = useState('');
  const [ticketId, setTicketId] = useState('');
  const [reasonCategory, setReasonCategory] = useState('PRODUCT_DAMAGED');
  const [resolutionNotes, setResolutionNotes] = useState('');

  if (!merchant) return null;

  const merchantId = merchant.merchant_id || merchant.merchantId || merchant.id;
  const storeName = merchant.store_name || merchant.storeName || merchant.name;
  const merchantCode = merchant.merchant_code || merchant.merchantCode || merchant.code || merchant.merchantId;
  const availableBal = merchant.available_balance ?? merchant.availableBalance ?? 0;
  const pendingBal = merchant.pending_balance ?? merchant.pendingBalance ?? 0;
  const lockedBal = merchant.locked_balance ?? merchant.lockedBalance ?? 0;
  const bankName = merchant.bank_account?.bank_name || merchant.bankAccount?.bankName || 'BCA';
  const accountNum = merchant.bank_account?.account_number || merchant.bankAccount?.accountNumber || '-';
  const accountHolder = merchant.bank_account?.account_holder || merchant.bankAccount?.accountHolder || merchant.owner_name || merchant.ownerName;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amountNum = Number(lockAmount);

    if (actionType === 'LOCK') {
      if (!amountNum || amountNum <= 0) {
        alert('Nominal pembekuan saldo harus lebih dari 0.');
        return;
      }
      if (amountNum > availableBal) {
        alert('Nominal pembekuan melebihi Saldo Available yang dimiliki merchant saat ini.');
        return;
      }
    } else {
      if (!amountNum || amountNum <= 0) {
        alert('Nominal pelepasan saldo harus lebih dari 0.');
        return;
      }
      if (amountNum > lockedBal) {
        alert('Nominal pelepasan melebihi Saldo Locked yang sedang dibekukan.');
        return;
      }
    }

    const success = await onConfirmAction({
      merchantId,
      actionType,
      amount: amountNum,
      ticketId: ticketId || 'DSP-' + Date.now().toString().slice(-6),
      reasonCategory,
      notes: resolutionNotes,
    });

    if (success !== false) {
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-secondary-subtle">
        <Modal.Title className="d-flex align-items-center fs-16 fw-bold text-body">
          <IconifyIcon
            icon={actionType === 'LOCK' ? 'solar:lock-bold-duotone' : 'solar:lock-password-unlocked-bold-duotone'}
            className={`${actionType === 'LOCK' ? 'text-danger' : 'text-success'} me-2 fs-22`}
          />
          {actionType === 'LOCK' ? 'Kunci Saldo Sengketa (Dispute Freeze)' : 'Lepas Kunci Saldo Sengketa (Release Funds)'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* MERCHANT SUMMARY CARD */}
        <div className="p-3 rounded-2 bg-body-secondary border border-secondary-subtle mb-3">
          <Row className="g-2 fs-12">
            <Col sm={6}>
              <span className="text-muted d-block">Merchant / Toko:</span>
              <strong className="text-body fs-13">{storeName}</strong>
              <small className="text-muted d-block">ID: {merchantCode}</small>
            </Col>
            <Col sm={6}>
              <span className="text-muted d-block">Rekening Bank Terdaftar:</span>
              <strong className="text-body">{bankName} - {accountNum}</strong>
              <small className="text-muted d-block">a.n. {accountHolder}</small>
            </Col>
          </Row>

          <hr className="my-2 border-secondary-subtle" />

          <Row className="g-2 text-center fs-12">
            <Col xs={4}>
              <span className="text-muted d-block">Saldo Available</span>
              <strong className="text-success fs-13">{formatRupiah(availableBal)}</strong>
            </Col>
            <Col xs={4}>
              <span className="text-muted d-block">Saldo Pending (Ekspedisi)</span>
              <strong className="text-warning fs-13">{formatRupiah(pendingBal)}</strong>
            </Col>
            <Col xs={4}>
              <span className="text-muted d-block">Saldo Locked (Sengketa)</span>
              <strong className="text-danger fs-13">{formatRupiah(lockedBal)}</strong>
            </Col>
          </Row>
        </div>

        {/* ACTION SELECTOR */}
        <div className="d-flex gap-2 mb-3">
          <Button
            variant={actionType === 'LOCK' ? 'danger' : 'outline-secondary'}
            size="sm"
            onClick={() => setActionType('LOCK')}
            className="d-flex align-items-center fw-semibold"
          >
            <IconifyIcon icon="solar:lock-bold" className="me-1.5 fs-16" />
            Bekukan Saldo (Dispute Inflow)
          </Button>
          <Button
            variant={actionType === 'RELEASE' ? 'success' : 'outline-secondary'}
            size="sm"
            onClick={() => setActionType('RELEASE')}
            disabled={merchant.lockedBalance <= 0}
            className="d-flex align-items-center fw-semibold"
          >
            <IconifyIcon icon="solar:lock-password-unlocked-bold" className="me-1.5 fs-16" />
            Lepas Kunci (Dispute Resolved)
          </Button>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-body">
                  Nominal {actionType === 'LOCK' ? 'yang Dibekukan' : 'yang Dilepaskan'} (Rp)
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder={actionType === 'LOCK' ? `Maks: ${merchant.availableBalance}` : `Maks: ${merchant.lockedBalance}`}
                  value={lockAmount}
                  onChange={(e) => setLockAmount(e.target.value)}
                  className="bg-body text-body border-secondary-subtle fs-13 font-monospace"
                  required
                />
                <Form.Text className="text-muted fs-11">
                  {actionType === 'LOCK'
                    ? 'Dana akan dipindahkan dari available_balance ke locked_balance.'
                    : 'Dana akan dikembalikan dari locked_balance ke available_balance merchant.'}
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-body">
                  ID Tiket Sengketa / Komplain Pembeli
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contoh: DSP-2026-9021"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  className="bg-body text-body border-secondary-subtle fs-13 font-monospace"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-body">
                  Klasifikasi Alasan Sengketa
                </Form.Label>
                <Form.Select
                  value={reasonCategory}
                  onChange={(e) => setReasonCategory(e.target.value)}
                  className="bg-body text-body border-secondary-subtle fs-13"
                >
                  <option value="PRODUCT_DAMAGED">Barang Diterima Rusak / Cacat Ekspedisi</option>
                  <option value="WRONG_ITEM">Barang Tidak Sesuai Deskripsi / Salah Ukuran & Warna</option>
                  <option value="PACKAGE_EMPTY">Paket Kosong / Terindikasi Pencurian Logistik</option>
                  <option value="FRAUD_INVESTIGATION">Indikasi Transaksi Fiktif / Cuci Uang</option>
                  <option value="DISPUTE_SETTLED_RETURN">Barang Retur Berhasil Diterima Merchant (Release)</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-body">
                  Catatan Justifikasi & Bukti Eskalasi
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Contoh: Pembeli mengunggah video unboxing paket robek. Kasus ditangani oleh tim resolusi CS Indovia."
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  className="bg-body text-body border-secondary-subtle fs-12"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top border-secondary-subtle">
            <Button variant="outline-secondary" size="sm" onClick={onHide} disabled={isProcessing}>
              Batal
            </Button>
            <Button
              variant={actionType === 'LOCK' ? 'danger' : 'success'}
              size="sm"
              type="submit"
              disabled={isProcessing}
              className="d-flex align-items-center fw-semibold text-white px-3"
            >
              {isProcessing ? (
                <>
                  <Spinner animation="border" size="sm" className="me-1.5" />
                  Memproses Aksi Sengketa...
                </>
              ) : (
                <>
                  <IconifyIcon icon="solar:check-square-bold" className="me-1.5 fs-16" />
                  Konfirmasi {actionType === 'LOCK' ? 'Pembekuan Dana' : 'Pelepasan Dana'}
                </>
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DisputeLockModal;
