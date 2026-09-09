import { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert, Badge } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const AccountingExportModal = ({ show, onHide }) => {
  const [reportType, setReportType] = useState('SAK_FULL');
  const [format, setFormat] = useState('PDF');
  const [period, setPeriod] = useState('Q3_2026');
  const [includeTax, setIncludeTax] = useState(true);
  const [includeGmvAudit, setIncludeGmvAudit] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      onHide();
      alert(`Laporan Keuangan Standar Akuntansi Indonesia (${format}) periode ${period} berhasil diunduh!`);
    }, 1200);
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="d-flex align-items-center fs-16 fw-bold">
          <div className="avatar-xs bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center me-2">
            <IconifyIcon icon="solar:document-text-bold" className="fs-18" />
          </div>
          Ekspor Laporan Keuangan SAK Indonesia
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        <Alert variant="secondary" className="d-flex align-items-center mb-3 py-2 border-0 bg-light text-body fs-12">
          <IconifyIcon icon="solar:shield-check-bold" className="fs-20 me-2 text-success flex-shrink-0" />
          <div>
            Format laporan disusun sesuai <strong>PSAK 72 (Pendapatan dari Kontrak dengan Pelanggan)</strong> dan <strong>PSAK 1 (Penyajian Laporan Keuangan)</strong> yang siap diaudit oleh Kantor Akuntan Publik (KAP).
          </div>
        </Alert>

        <Form>
          {/* TIPE LAPORAN */}
          <Form.Group className="mb-3">
            <Form.Label className="fs-12 fw-semibold text-muted text-uppercase">Jenis Paket Laporan</Form.Label>
            <Form.Select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="fs-13"
            >
              <option value="SAK_FULL">Laporan Komprehensif Lengkap (Laba Rugi, Neraca &amp; Arus Kas)</option>
              <option value="SAAS_MRR">Executive SaaS Metrics &amp; Cohort Retention Report</option>
              <option value="TAX_PPN">Rekapitulasi Faktur Pajak Keluaran &amp; SPT Masa PPN 1111</option>
              <option value="GMV_TAKERATE">Audit Transaksi GMV &amp; Bagi Hasil Platform</option>
            </Form.Select>
          </Form.Group>

          {/* PERIODE FISKAL */}
          <Row className="g-2 mb-3">
            <Col sm={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-muted text-uppercase">Periode Laporan</Form.Label>
                <Form.Select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="fs-13"
                >
                  <option value="SEPT_2026">Bulan Berjalan (September 2026)</option>
                  <option value="Q3_2026">Kuartal 3 (Q3 2026: Jul - Sep)</option>
                  <option value="H1_2026">Semester 1 (Jan - Jun 2026)</option>
                  <option value="YTD_2026">Tahun Berjalan (YTD 2026)</option>
                  <option value="FY_2025">Tahun Buku Lalu (FY 2025 Audited)</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group>
                <Form.Label className="fs-12 fw-semibold text-muted text-uppercase">Format Berkas</Form.Label>
                <Form.Select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="fs-13"
                >
                  <option value="PDF">PDF (Auditor &amp; Investor Ready)</option>
                  <option value="EXCEL">Microsoft Excel (.xlsx)</option>
                  <option value="CSV">CSV Raw Data</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* OPSI TAMBAHAN */}
          <div className="border rounded p-3 bg-light-subtle mb-3">
            <span className="fs-11 fw-bold text-uppercase text-muted d-block mb-2">Lampiran Tambahan</span>
            <Form.Check
              type="checkbox"
              id="check-include-tax"
              label="Lampirkan Lembar Rekonsiliasi Fiskal & Bukti Potong PPN 11%"
              checked={includeTax}
              onChange={(e) => setIncludeTax(e.target.checked)}
              className="fs-12 mb-2"
            />
            <Form.Check
              type="checkbox"
              id="check-include-gmv"
              label="Sertakan Audit Trail Log Settlement Escrow & Rekening Penampung"
              checked={includeGmvAudit}
              onChange={(e) => setIncludeGmvAudit(e.target.checked)}
              className="fs-12"
            />
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="outline-secondary" size="sm" onClick={onHide} disabled={isExporting}>
          Batal
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="d-flex align-items-center text-white"
          style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
              Menyiapkan Dokumen...
            </>
          ) : (
            <>
              <IconifyIcon icon="solar:download-square-bold" className="me-1" />
              Unduh Berkas {format}
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AccountingExportModal;
