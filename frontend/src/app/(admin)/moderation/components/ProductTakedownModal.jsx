// src/app/(admin)/moderation/components/ProductTakedownModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Badge, Row, Col } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { formatRupiah, formalViolationReasons } from '../data';

const ProductTakedownModal = ({ show, onHide, product, onConfirmTakedown }) => {
  const [selectedReasonCode, setSelectedReasonCode] = useState(
    formalViolationReasons[0].code
  );
  const [customDetail, setCustomDetail] = useState('');
  const [escalateStrike, setEscalateStrike] = useState(true);
  const [notifyMerchantViaWa, setNotifyMerchantViaWa] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!product) return null;

  const selectedReason = formalViolationReasons.find(
    (r) => r.code === selectedReasonCode
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onConfirmTakedown) {
        onConfirmTakedown({
          productId: product.id,
          reasonCode: selectedReasonCode,
          reasonTitle: selectedReason?.title,
          customDetail: customDetail || selectedReason?.description,
          escalateStrike,
          notifyMerchantViaWa,
        });
      }
      onHide();
    }, 600);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-secondary-subtle">
        <div className="d-flex align-items-center gap-2">
          <div className="avatar-sm bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center">
            <IconifyIcon icon="solar:shield-cross-bold-duotone" className="fs-22" />
          </div>
          <div>
            <Modal.Title className="fs-16 fw-bold mb-0 text-body">
              Pencabutan Produk Sepihak (Takedown by Superadmin)
            </Modal.Title>
            <span className="text-muted fs-12">
              Tindakan tegas penegakan kepatuhan hukum, UU ITE, dan regulasi perlindungan konsumen Indovia
            </span>
          </div>
        </div>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          {/* Target Product Summary Box */}
          <div className="p-3 bg-body-tertiary rounded border border-secondary-subtle mb-3">
            <Row className="align-items-center g-3">
              <Col xs="auto">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="rounded border"
                  style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                />
              </Col>
              <Col>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h6 className="fw-bold mb-0 text-body fs-13 line-clamp-1">{product.name}</h6>
                  <Badge bg="danger-subtle" className="text-danger border border-danger-subtle fs-10">
                    SKU: {product.sku}
                  </Badge>
                </div>
                <div className="text-muted fs-12 d-flex flex-wrap align-items-center gap-2">
                  <span>Toko: <strong className="text-body">{product.storeName}</strong></span>
                  <span>•</span>
                  <span>Pemilik: {product.ownerName}</span>
                  <span>•</span>
                  <span>Harga: <strong className="text-primary">{formatRupiah(product.price)}</strong></span>
                </div>
                {product.detectedKeywords && product.detectedKeywords.length > 0 && (
                  <div className="mt-2 d-flex align-items-center gap-1 flex-wrap">
                    <span className="text-danger fs-11 fw-semibold">Kata Terlarang Terdeteksi:</span>
                    {product.detectedKeywords.map((kw, i) => (
                      <span key={i} className="badge bg-danger text-white fs-10">
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </Col>
            </Row>
          </div>

          {/* Legal Consequence Alert */}
          <Alert variant="danger" className="border-danger-subtle d-flex align-items-start gap-2 mb-3">
            <IconifyIcon icon="solar:danger-triangle-bold" className="text-danger fs-20 flex-shrink-0 mt-1" />
            <div className="fs-12 text-body">
              <strong>Konsekuensi Pencabutan Instan:</strong> Produk ini akan langsung dicabut dari etalase publik seluruh cabang merchant Indovia, pencarian katalog dinonaktifkan, dan pesanan pending yang belum dikirim akan dibatalkan otomatis demi keamanan konsumen.
            </div>
          </Alert>

          {/* Reason Selection */}
          <Form.Group className="mb-3">
            <Form.Label className="fs-12 fw-semibold text-body">
              Alasan Resmi Pelanggaran Regulasi (Landasan Hukum Takedown) <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              value={selectedReasonCode}
              onChange={(e) => setSelectedReasonCode(e.target.value)}
              className="border-secondary-subtle fs-13"
              required
            >
              {formalViolationReasons.map((reason) => (
                <option key={reason.code} value={reason.code}>
                  {reason.title}
                </option>
              ))}
            </Form.Select>
            <small className="text-muted d-block mt-1 fs-11">
              {selectedReason?.description}
            </small>
          </Form.Group>

          {/* Custom Violation Notes */}
          <Form.Group className="mb-3">
            <Form.Label className="fs-12 fw-semibold text-body">
              Keterangan Tambahan / Catatan Bukti Pelanggaran
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={customDetail}
              onChange={(e) => setCustomDetail(e.target.value)}
              placeholder="Contoh: Ditemukan penjualan replika bermerek tanpa sertifikat distributor resmi, terbukti melanggar Pasal 100 UU Merek..."
              className="border-secondary-subtle fs-12"
            />
          </Form.Group>

          {/* Strike Escalation & Notification Options */}
          <div className="p-3 bg-danger-subtle rounded border border-danger-subtle mb-3">
            <h6 className="fw-bold text-danger fs-12 mb-2 d-flex align-items-center">
              <IconifyIcon icon="solar:flame-bold" className="me-2 fs-16" />
              Sistem Poin Pelanggaran (Strike Escalation)
            </h6>
            <Form.Check
              type="checkbox"
              id="strike-checkbox"
              label={
                <div>
                  <strong className="text-body fs-12">Berikan +1 Poin Pelanggaran (Strike) ke Akun Toko</strong>
                  <div className="text-muted fs-11">
                    Sesuai SOP: 1x Strike (Peringatan tertulis), 2x Strike (Upload dibekukan 7 hari), 3x Strike (Permanent Store Ban / Freeze).
                  </div>
                </div>
              }
              checked={escalateStrike}
              onChange={(e) => setEscalateStrike(e.target.checked)}
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              id="notify-checkbox"
              label={
                <div>
                  <strong className="text-body fs-12">Kirim Surat Pemberitahuan Resmi via Email & WhatsApp Toko</strong>
                  <div className="text-muted fs-11">
                    Notifikasi otomatis memuat nomor tiket takedown, alasan hukum, dan tautan pengajuan banding.
                  </div>
                </div>
              }
              checked={notifyMerchantViaWa}
              onChange={(e) => setNotifyMerchantViaWa(e.target.checked)}
            />
          </div>

          {/* Email Preview Snippet */}
          <div className="p-3 bg-body rounded border border-secondary-subtle fs-11 text-muted">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="fw-bold text-body">Pratinjau Surat Teguran ke Merchant:</span>
              <Badge bg="secondary-subtle" className="text-secondary">Official Notice</Badge>
            </div>
            <p className="mb-0 font-monospace">
              "Pemberitahuan Pelanggaran: Produk Anda '{product.name.slice(0, 40)}...' telah dicabut oleh Tim Kepatuhan Indovia atas dasar {selectedReason?.title}. Poin penalti telah dicatat pada sistem toko Anda."
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-secondary-subtle">
          <Button variant="outline-secondary" onClick={onHide} disabled={isSubmitting} className="px-3 py-1.5">
            Batalkan
          </Button>
          <Button variant="danger" type="submit" disabled={isSubmitting} className="fw-semibold px-3 py-1.5">
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Mengeksekusi Takedown...
              </>
            ) : (
              <>
                <IconifyIcon icon="solar:shield-cross-bold" className="me-2 fs-16" />
                Cabut Produk Sekarang (Takedown)
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductTakedownModal;
