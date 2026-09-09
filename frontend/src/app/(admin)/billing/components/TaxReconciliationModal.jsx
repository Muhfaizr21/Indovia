import { Modal, Button, Row, Col, Badge, Table, Alert, Card, CardBody } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { formatRupiah, taxAndComplianceData } from '../data';

const TaxReconciliationModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="d-flex align-items-center fs-16 fw-bold">
          <div className="avatar-xs bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center me-2">
            <IconifyIcon icon="solar:document-medicine-bold" className="fs-18" />
          </div>
          Rekonsiliasi Pajak PPN SaaS 11% &amp; Pelaporan SPT Tahunan / Masa
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* TOP ALERT BADGE */}
        <Alert variant="info" className="d-flex align-items-center mb-4 py-2 border-0 bg-info-subtle text-info-emphasis">
          <IconifyIcon icon="solar:info-circle-bold" className="fs-22 me-2 flex-shrink-0" />
          <div className="fs-12">
            Perhitungan kepatuhan pajak otomatis sesuai <strong>UU HPP No. 7/2021</strong> dan <strong>PMK 60/PMK.03/2022</strong> mengenai penyerahan Jasa Kena Pajak (JKP) Perangkat Lunak SaaS di dalam daerah pabean.
          </div>
        </Alert>

        {/* SUMMARY CARDS */}
        <Row className="g-3 mb-4">
          <Col md={4}>
            <Card className="border-secondary-subtle bg-light-subtle h-100 mb-0 shadow-none">
              <CardBody className="p-3">
                <span className="text-muted fs-11 text-uppercase fw-semibold">Dasar Pengenaan Pajak (DPP)</span>
                <h4 className="fw-bold my-1 fs-16 text-body">{formatRupiah(taxAndComplianceData.dppSaaSRevenue)}</h4>
                <small className="text-muted fs-11">Omzet Langganan SaaS Bersih</small>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-secondary-subtle bg-light-subtle h-100 mb-0 shadow-none">
              <CardBody className="p-3">
                <span className="text-muted fs-11 text-uppercase fw-semibold">PPN Keluaran 11% (Terutang)</span>
                <h4 className="fw-bold my-1 fs-16 text-danger">{formatRupiah(taxAndComplianceData.ppnOutput11Pct)}</h4>
                <small className="text-success fs-11">
                  <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
                  e-Faktur DJP Terbit Otomatis
                </small>
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-secondary-subtle bg-light-subtle h-100 mb-0 shadow-none">
              <CardBody className="p-3">
                <span className="text-muted fs-11 text-uppercase fw-semibold">PPN Kurang Bayar (Setor Kas)</span>
                <h4 className="fw-bold my-1 fs-16 text-primary">{formatRupiah(taxAndComplianceData.ppnNetPayable)}</h4>
                <Badge bg="warning" className="text-dark fs-10 fw-medium">
                  Jatuh Tempo: {taxAndComplianceData.taxReportingDueDate}
                </Badge>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* DETAILED TAX BREAKDOWN TABLE */}
        <div className="table-responsive border rounded mb-4">
          <Table className="table-sm mb-0 align-middle">
            <thead className="table-light fs-12">
              <tr>
                <th>Komponen Rekonsiliasi Fiskal</th>
                <th className="text-end">Nominal (IDR)</th>
                <th>Dasar Hukum / Keterangan</th>
              </tr>
            </thead>
            <tbody className="fs-12">
              <tr>
                <td className="fw-medium">Total Penerimaan Sewa Software (Gross Invoiced)</td>
                <td className="text-end font-monospace">{formatRupiah(184500000)}</td>
                <td className="text-muted">Total invoice langganan merchant lunas</td>
              </tr>
              <tr>
                <td className="fw-medium">Dasar Pengenaan Pajak (DPP = Invoiced / 1.11)</td>
                <td className="text-end font-monospace fw-semibold">{formatRupiah(taxAndComplianceData.dppSaaSRevenue)}</td>
                <td className="text-muted">Nilai jasa sewa sebelum PPN</td>
              </tr>
              <tr>
                <td className="fw-medium text-danger">PPN Keluaran 11% atas Penyerahan JKP</td>
                <td className="text-end font-monospace fw-bold text-danger">+{formatRupiah(taxAndComplianceData.ppnOutput11Pct)}</td>
                <td className="text-muted">Faktur Pajak Seri 010.xxx otomatis via API DJP</td>
              </tr>
              <tr>
                <td className="fw-medium text-success">Kredit Pajak PPN Masukan (Cloud Hosting AWS/GCP)</td>
                <td className="text-end font-monospace fw-semibold text-success">-{formatRupiah(taxAndComplianceData.ppnInputCredited)}</td>
                <td className="text-muted">Faktur Masukan server &amp; CDN terlapor</td>
              </tr>
              <tr className="table-active">
                <td className="fw-bold text-primary">Total PPN Kurang Bayar (Siap Bayar ke Kas Negara)</td>
                <td className="text-end font-monospace fw-bold text-primary fs-14">{formatRupiah(taxAndComplianceData.ppnNetPayable)}</td>
                <td>
                  <Badge bg="success" className="fs-11">
                    Kode NTPN Billing: {taxAndComplianceData.ntpnBillingCode}
                  </Badge>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        {/* HISTORICAL TAX SUBMISSION LOG */}
        <h6 className="fw-bold fs-13 mb-2 text-body d-flex align-items-center">
          <IconifyIcon icon="solar:history-bold" className="me-1 text-primary" />
          Riwayat Pelaporan SPT Masa PPN 1111 Terakhir
        </h6>
        <div className="table-responsive border rounded">
          <Table className="table-sm mb-0 align-middle">
            <thead className="table-light fs-11 text-muted text-uppercase">
              <tr>
                <th>Masa Pajak</th>
                <th className="text-end">DPP</th>
                <th className="text-end">PPN 11%</th>
                <th>Status DJP</th>
                <th>Bukti Penerimaan (BPE)</th>
              </tr>
            </thead>
            <tbody className="fs-12">
              {taxAndComplianceData.reconciliationLogs.map((log) => (
                <tr key={log.id}>
                  <td className="fw-medium">{log.period}</td>
                  <td className="text-end font-monospace">{formatRupiah(log.dpp)}</td>
                  <td className="text-end font-monospace">{formatRupiah(log.ppn11)}</td>
                  <td>
                    <Badge bg="success-subtle" className="text-success border border-success-subtle">
                      <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
                      {log.status}
                    </Badge>
                  </td>
                  <td>
                    <Button variant="link" size="sm" className="p-0 text-decoration-none fs-12 text-primary">
                      <IconifyIcon icon="solar:file-download-bold" className="me-1" />
                      {log.ntpn}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="outline-secondary" size="sm" onClick={onHide}>
          Tutup
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="d-flex align-items-center text-white"
          style={{ backgroundColor: '#16a34a', borderColor: '#16a34a' }}
          onClick={() => {
            alert('Menghubungkan ke DJP Online API untuk verifikasi Faktur Pajak Elektronik...');
          }}
        >
          <IconifyIcon icon="solar:refresh-bold" className="me-1" />
          Sinkronisasi DJP Online API
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaxReconciliationModal;
