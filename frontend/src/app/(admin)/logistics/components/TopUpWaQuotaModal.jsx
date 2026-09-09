import React, { useState } from 'react';
import { Modal, Button, Form, Badge, Alert, Row, Col } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const TopUpWaQuotaModal = ({ show, onHide, merchant, onConfirm }) => {
  const [quotaAmount, setQuotaAmount] = useState(1000);
  const [billingType, setBillingType] = useState('FREE_PLATFORM_GRANT');
  const [adminNote, setAdminNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  if (!merchant) return null;

  const handleQuickAdd = (amount) => {
    setQuotaAmount(amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessNotice(true);
      if (onConfirm) {
        onConfirm({
          merchantId: merchant.merchantId,
          addedQuota: Number(quotaAmount),
          billingType,
          adminNote: adminNote || 'Pemberian kuota darurat Superadmin',
        });
      }
      setTimeout(() => {
        setSuccessNotice(false);
        onHide();
      }, 1200);
    }, 600);
  };

  const newTotalQuota = (merchant.monthlyQuota || 0) + Number(quotaAmount);
  const newRemaining = (merchant.remainingQuota || 0) + Number(quotaAmount);

  return (
    <Modal show={show} onHide={onHide} centered size="lg" backdrop="static">
      <Modal.Header closeButton className="border-secondary-subtle">
        <div className="d-flex align-items-center gap-2">
          <div className="avatar-sm bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center">
            <IconifyIcon icon="solar:chat-round-dots-bold-duotone" className="fs-20" />
          </div>
          <div>
            <Modal.Title className="fs-16 fw-semibold mb-0">
              Top-Up Kuota Pesan WhatsApp Darurat
            </Modal.Title>
            <span className="text-muted fs-12">
              Alokasi kuota pesan transaksional keluar untuk merchant Indovia
            </span>
          </div>
        </div>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="py-3">
          {successNotice && (
            <Alert variant="success" className="d-flex align-items-center gap-2 mb-3">
              <IconifyIcon icon="solar:check-circle-bold" className="fs-18 text-success" />
              <div>
                <strong>Berhasil Dialokasikan!</strong> Kuota tambahan sebesar {Number(quotaAmount).toLocaleString('id-ID')} pesan aktif seketika pada nomor WhatsApp gateway toko.
              </div>
            </Alert>
          )}

          {/* Info Banner Merchant */}
          <div className="p-3 bg-body-tertiary rounded border border-secondary-subtle mb-3">
            <Row className="align-items-center">
              <Col md={7}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h5 className="fs-15 fw-bold mb-0 text-body">{merchant.storeName}</h5>
                  <Badge bg="primary-subtle" className="text-primary border border-primary-subtle">
                    {merchant.tier}
                  </Badge>
                  <span className="text-muted fs-12 font-monospace">({merchant.merchantId})</span>
                </div>
                <div className="text-muted fs-12 d-flex align-items-center gap-2">
                  <span><IconifyIcon icon="solar:user-bold" className="me-1 text-secondary" />{merchant.ownerName}</span>
                  <span>•</span>
                  <span><IconifyIcon icon="solar:phone-bold" className="me-1 text-secondary" />{merchant.ownerPhone}</span>
                </div>
              </Col>
              <Col md={5} className="mt-2 mt-md-0 text-md-end">
                <div className="text-muted fs-11 text-uppercase fw-semibold">Sisa Kuota Saat Ini</div>
                <div className="d-flex align-items-center justify-content-md-end gap-2 mt-1">
                  <span className={`fs-16 fw-bold ${merchant.remainingQuota === 0 ? 'text-danger' : merchant.remainingQuota < 100 ? 'text-warning' : 'text-success'}`}>
                    {merchant.remainingQuota?.toLocaleString('id-ID')}
                  </span>
                  <span className="text-muted fs-12">/ {merchant.monthlyQuota?.toLocaleString('id-ID')} pesan</span>
                </div>
              </Col>
            </Row>
          </div>

          {/* Quick Select Presets */}
          <div className="mb-3">
            <Form.Label className="fs-13 fw-semibold text-body mb-2">
              Pilih Jumlah Tambahan Kuota Pesan
            </Form.Label>
            <div className="d-flex flex-wrap gap-2 mb-2">
              {[200, 500, 1000, 2500, 5000].map((preset) => (
                <Button
                  key={preset}
                  variant={quotaAmount === preset ? 'primary' : 'outline-secondary'}
                  size="sm"
                  type="button"
                  className="rounded-pill px-3 py-1"
                  onClick={() => handleQuickAdd(preset)}
                >
                  +{preset.toLocaleString('id-ID')} Pesan
                </Button>
              ))}
            </div>
            <Form.Control
              type="number"
              min="10"
              step="50"
              value={quotaAmount}
              onChange={(e) => setQuotaAmount(Number(e.target.value))}
              required
              className="mt-2"
              placeholder="Atau ketik jumlah kuota manual..."
            />
          </div>

          {/* Impact Simulation Preview */}
          <div className="p-3 bg-primary-subtle rounded border border-primary-subtle mb-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="fs-12 text-primary fw-semibold text-uppercase">
                Simulasi Setelah Ditambahkan:
              </span>
              <Badge bg="primary" className="fw-semibold">
                +{Number(quotaAmount).toLocaleString('id-ID')} Kuota
              </Badge>
            </div>
            <Row className="g-2 text-body">
              <Col xs={6}>
                <span className="text-muted fs-12 d-block">Alokasi Total Bulan Ini:</span>
                <span className="fs-14 fw-bold">{newTotalQuota.toLocaleString('id-ID')} pesan</span>
              </Col>
              <Col xs={6}>
                <span className="text-muted fs-12 d-block">Sisa Kuota Baru yang Bisa Dipakai:</span>
                <span className="fs-14 fw-bold text-success">{newRemaining.toLocaleString('id-ID')} pesan</span>
              </Col>
            </Row>
          </div>

          {/* Billing Type */}
          <div className="mb-3">
            <Form.Label className="fs-13 fw-semibold text-body mb-1">
              Ketentuan Pembiayaan Alokasi Kuota
            </Form.Label>
            <div className="d-flex flex-column gap-2">
              <Form.Check
                type="radio"
                id="billing-free"
                name="billingType"
                label={
                  <div>
                    <span className="fw-semibold text-body">Gratis / Platform Goodwill Grant (Rekomendasi)</span>
                    <small className="d-block text-muted">Ditanggung sebagai biaya operasional retensi merchant oleh platform Indovia.</small>
                  </div>
                }
                checked={billingType === 'FREE_PLATFORM_GRANT'}
                onChange={() => setBillingType('FREE_PLATFORM_GRANT')}
              />
              <Form.Check
                type="radio"
                id="billing-invoice"
                name="billingType"
                label={
                  <div>
                    <span className="fw-semibold text-body">Tagihkan ke Invoice Langganan Merchant Berikutnya</span>
                    <small className="d-block text-muted">Dikenakan tarif Rp 150/pesan WA pada siklus billing perpanjangan toko.</small>
                  </div>
                }
                checked={billingType === 'BILLED_MERCHANT'}
                onChange={() => setBillingType('BILLED_MERCHANT')}
              />
            </div>
          </div>

          {/* Admin Internal Note */}
          <Form.Group className="mb-1">
            <Form.Label className="fs-13 fw-semibold text-body">
              Catatan / Justifikasi Superadmin (Audit Trail)
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="Contoh: Lonjakan pesanan kampanye 12.12, merchant membutuhkan kuota resi ekstra untuk mencegah keterlambatan broadcast..."
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="border-secondary-subtle">
          <Button variant="outline-secondary" onClick={onHide} disabled={isSubmitting}>
            Batal
          </Button>
          <Button variant="success" type="submit" disabled={isSubmitting || quotaAmount <= 0}>
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" />
                Mengalokasikan...
              </>
            ) : (
              <>
                <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
                Tambahkan Kuota WhatsApp
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TopUpWaQuotaModal;
