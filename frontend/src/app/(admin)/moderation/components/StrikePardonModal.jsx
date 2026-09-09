// src/app/(admin)/moderation/components/StrikePardonModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Badge, Row, Col } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const StrikePardonModal = ({ show, onHide, merchant, onConfirmAction }) => {
  const [actionType, setActionType] = useState('REVOKE_ONE_STRIKE'); // 'REVOKE_ONE_STRIKE' | 'LIFT_COOLDOWN' | 'MANUAL_PERMANENT_BAN'
  const [adminNote, setAdminNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successNotice, setSuccessNotice] = useState(false);

  if (!merchant) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessNotice(true);
      if (onConfirmAction) {
        onConfirmAction({
          merchantId: merchant.merchantId,
          actionType,
          adminNote: adminNote || 'Pembaruan status sanksi oleh Superadmin',
        });
      }
      setTimeout(() => {
        setSuccessNotice(false);
        onHide();
      }, 1000);
    }, 600);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-secondary-subtle">
        <div className="d-flex align-items-center gap-2">
          <div className="avatar-sm bg-info-subtle text-info rounded-circle d-flex align-items-center justify-content-center">
            <IconifyIcon icon="solar:user-speak-rounded-bold-duotone" className="fs-22" />
          </div>
          <div>
            <Modal.Title className="fs-16 fw-bold mb-0 text-body">
              Penyesuaian Sanksi & Pengampunan Banding Toko
            </Modal.Title>
            <span className="text-muted fs-12">
              Superadmin dapat mencabut strike, memulihkan izin upload, atau menjatuhkan sanksi permanen
            </span>
          </div>
        </div>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          {successNotice && (
            <Alert variant="success" className="d-flex align-items-center gap-2 mb-3">
              <IconifyIcon icon="solar:check-circle-bold" className="fs-18 text-success" />
              <div>
                <strong>Aksi Berhasil Dieksekusi!</strong> Rekam jejak sanksi toko telah diperbarui.
              </div>
            </Alert>
          )}

          {/* Merchant Profile Box */}
          <div className="p-3 bg-body-tertiary rounded border border-secondary-subtle mb-3">
            <Row className="align-items-center">
              <Col md={7}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h6 className="fw-bold mb-0 text-body fs-14">{merchant.storeName}</h6>
                  <Badge
                    bg={
                      merchant.strikeLevel === 3
                        ? 'danger'
                        : merchant.strikeLevel === 2
                        ? 'warning'
                        : 'secondary'
                    }
                    className="fs-11"
                  >
                    Strike {merchant.strikeLevel} / 3
                  </Badge>
                </div>
                <div className="text-muted fs-12 d-flex flex-wrap align-items-center gap-2">
                  <span>Pemilik: <strong className="text-body">{merchant.ownerName}</strong></span>
                  <span>•</span>
                  <span>Email: {merchant.ownerEmail}</span>
                  <span>•</span>
                  <span>WA: {merchant.ownerPhone}</span>
                </div>
              </Col>
              <Col md={5} className="mt-2 mt-md-0 text-md-end">
                <span className="text-muted fs-11 d-block text-uppercase">Status Sanksi Berjalan:</span>
                <span className="fw-bold text-danger fs-12 d-block">{merchant.activePenalty}</span>
                <span className="text-muted fs-11">{merchant.cooldownUntil}</span>
              </Col>
            </Row>
          </div>

          {/* Violation Timeline Snippet */}
          <div className="mb-3">
            <Form.Label className="fs-12 fw-semibold text-body mb-1">
              Riwayat Poin Pelanggaran Toko ({merchant.violations?.length || 0} Insiden)
            </Form.Label>
            <div className="p-3 bg-body rounded border border-secondary-subtle">
              {merchant.violations?.map((v, i) => (
                <div key={i} className={`d-flex align-items-start gap-3 ${i > 0 ? 'mt-2 pt-2 border-top border-secondary-subtle' : ''}`}>
                  <Badge bg="danger-subtle" className="text-danger border border-danger-subtle fs-10 mt-1">
                    Strike #{v.strikeNo}
                  </Badge>
                  <div className="fs-12">
                    <strong className="text-body d-block mb-1">{v.productName}</strong>
                    <span className="text-muted">{v.reason} ({v.date})</span>
                    <span className="d-block text-danger fs-11 mt-1">Tindakan: {v.actionTaken}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Choice */}
          <Form.Group className="mb-3">
            <Form.Label className="fs-12 fw-semibold text-body mb-2">
              Pilih Tindakan Keputusan Superadmin:
            </Form.Label>
            <div className="d-flex flex-column gap-2">
              <Form.Check
                type="radio"
                id="act-revoke-strike"
                name="actionType"
                label={
                  <div>
                    <strong className="text-success fs-12">Cabut 1 Poin Strike (Pengampunan Banding Disetujui)</strong>
                    <div className="text-muted fs-11">
                      Gunakan ini jika merchant berhasil menunjukkan dokumen legalitas resmi (sertifikat BPOM asli, izin edar distributor resmi, dll).
                    </div>
                  </div>
                }
                checked={actionType === 'REVOKE_ONE_STRIKE'}
                onChange={() => setActionType('REVOKE_ONE_STRIKE')}
              />
              <Form.Check
                type="radio"
                id="act-lift-cooldown"
                name="actionType"
                label={
                  <div>
                    <strong className="text-primary fs-12">Pulihkan Izin Upload Produk Baru (Lift Cooldown)</strong>
                    <div className="text-muted fs-11">
                      Membatalkan pembatasan 7 hari upload produk baru tanpa menghapus riwayat pelanggaran dari catatan kepatuhan toko.
                    </div>
                  </div>
                }
                checked={actionType === 'LIFT_COOLDOWN'}
                onChange={() => setActionType('LIFT_COOLDOWN')}
              />
              <Form.Check
                type="radio"
                id="act-manual-ban"
                name="actionType"
                label={
                  <div>
                    <strong className="text-danger fs-12">Eksekusi Pembekuan Toko Permanen (Permanent Store Ban)</strong>
                    <div className="text-muted fs-11">
                      Tindakan tegas pembekuan akun toko, seluruh produk diturunkan dari katalog publik, dan penahanan saldo escrow untuk investigasi pidana.
                    </div>
                  </div>
                }
                checked={actionType === 'MANUAL_PERMANENT_BAN'}
                onChange={() => setActionType('MANUAL_PERMANENT_BAN')}
              />
            </div>
          </Form.Group>

          {/* Justification Audit Note */}
          <Form.Group className="mb-1">
            <Form.Label className="fs-12 fw-semibold text-body">
              Catatan Justifikasi / Audit Trail Petugas Kepatuhan <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="Wajib diisi: Alasan pemberian pengampunan, nomor surat klarifikasi, atau bukti tindak lanjut..."
              required
              className="border-secondary-subtle fs-12"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="border-secondary-subtle">
          <Button variant="outline-secondary" onClick={onHide} disabled={isSubmitting} className="px-3 py-1.5">
            Batal
          </Button>
          <Button
            variant={actionType === 'MANUAL_PERMANENT_BAN' ? 'danger' : 'success'}
            type="submit"
            disabled={isSubmitting || !adminNote.trim()}
            className="fw-semibold px-3 py-1.5"
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Menyimpan...
              </>
            ) : (
              <>
                <IconifyIcon icon="solar:check-circle-bold" className="me-2" />
                Eksekusi Keputusan Sanksi
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default StrikePardonModal;
