import { useState, useMemo } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardTitle, Badge, Button, Form, InputGroup, Table, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { initialAuditLogs } from '../data';
import AuditDiffModal from '../components/AuditDiffModal';

const AuditLogsPage = () => {
  const navigate = useNavigate();

  // State
  const [logs, setLogs] = useState(initialAuditLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [selectedAction, setSelectedAction] = useState('ALL');
  const [activeLogForDiff, setActiveLogForDiff] = useState(null);
  const [showDiffModal, setShowDiffModal] = useState(false);
  const [copiedHash, setCopiedHash] = useState(null);

  // Filtered logs
  const filteredLogs = useMemo(() => {
    return logs.filter((item) => {
      const matchSearch =
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.actorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.targetTable.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.recordId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ipAddress.includes(searchTerm);

      const matchRole = selectedRole === 'ALL' || item.actorRole === selectedRole;
      const matchAction = selectedAction === 'ALL' || item.action === selectedAction;

      return matchSearch && matchRole && matchAction;
    });
  }, [logs, searchTerm, selectedRole, selectedAction]);

  const handleOpenDiff = (log) => {
    setActiveLogForDiff(log);
    setShowDiffModal(true);
  };

  const handleCopyHash = (hash, id) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(id);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <>
      <PageTItle title="Immutable Audit Trail Engine (WORM)" subName="Sistem &amp; Keamanan" />

      {/* HEADER ACTION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <h4 className="fw-bold mb-0 text-body d-flex align-items-center">
              <IconifyIcon icon="solar:history-bold-duotone" className="me-2 text-primary fs-24" />
              Immutable Audit Trail (WORM - Write Once Read Many)
            </h4>
            <Badge bg="info-subtle" className="text-info border border-info-subtle px-2 py-1 fs-11 font-monospace">
              <IconifyIcon icon="solar:lock-bold" className="me-1" />
              APPEND-ONLY PG ENGINE
            </Badge>
          </div>
          <p className="text-muted fs-12 mb-0">
            Pencatatan kriptografis permanen untuk seluruh mutasi data sensitif platform: Pelaku, Waktu Mikrodetik, IP Publik, User-Agent, serta Komparasi JSON Diff Sebelum vs Sesudah.
          </p>
        </div>

        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button
            variant="outline-primary"
            size="sm"
            className="d-flex align-items-center fw-semibold shadow-sm"
            onClick={() => navigate('/system/telemetry')}
          >
            <IconifyIcon icon="solar:server-square-bold-duotone" className="me-1 fs-16" />
            Buka Telemetri Runtime Golang
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center shadow-sm"
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", `indovia_audit_trail_worm_${new Date().toISOString().slice(0,10)}.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
          >
            <IconifyIcon icon="solar:download-square-bold" className="me-1 fs-16" />
            Ekspor JSON Terverifikasi
          </Button>
        </div>
      </div>

      {/* WORM COMPLIANCE BANNER */}
      <Card className="border-0 shadow-sm mb-4 bg-light-subtle border-start border-primary border-4">
        <CardBody className="p-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center">
            <div className="avatar-md bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0">
              <IconifyIcon icon="solar:shield-check-bold" className="fs-24" />
            </div>
            <div>
              <h6 className="fw-bold mb-1 text-body">
                Jaminan Kepatuhan Integritas Data (WORM Standard &amp; ISO 27001 / OJK / Kemenkominfo)
              </h6>
              <p className="text-muted fs-12 mb-0">
                Tabel <code>audit_logs</code> dilindungi aturan row-level security PostgreSQL dan trigger internal yang menolak kueri <code>UPDATE</code> maupun <code>DELETE</code>. Seluruh entri dirantai menggunakan hash <strong>SHA-256</strong> dan disimpan selama 7 tahun.
              </p>
            </div>
          </div>
          <div className="d-flex gap-2">
            <Badge bg="success-subtle" className="text-success border border-success-subtle px-2 py-1 fs-11">
              Zero Tampering Risk
            </Badge>
            <Badge bg="light" className="text-muted border px-2 py-1 fs-11">
              Retensi: 7 Tahun
            </Badge>
          </div>
        </CardBody>
      </Card>

      {/* AUDIT SUMMARY STATS */}
      <Row className="g-3 mb-4">
        <Col xl={3} sm={6}>
          <Card className="border-0 shadow-sm h-100">
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted fs-12 text-uppercase fw-medium">Total Log WORM</span>
                <div className="avatar-xs bg-primary-subtle text-primary rounded d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:documents-bold" className="fs-16" />
                </div>
              </div>
              <h4 className="fw-bold text-body mb-1 font-monospace">142,890</h4>
              <small className="text-success fs-11 d-flex align-items-center">
                <IconifyIcon icon="solar:arrow-up-linear" className="me-1" />
                +1,240 entri baru hari ini
              </small>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card className="border-0 shadow-sm h-100">
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted fs-12 text-uppercase fw-medium">Modifikasi Kritis</span>
                <div className="avatar-xs bg-danger-subtle text-danger rounded d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:danger-triangle-bold" className="fs-16" />
                </div>
              </div>
              <h4 className="fw-bold text-danger mb-1 font-monospace">34</h4>
              <small className="text-muted fs-11">Takedown, Role &amp; Gateway Swaps</small>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card className="border-0 shadow-sm h-100">
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted fs-12 text-uppercase fw-medium">Sesi Impersonasi Staf</span>
                <div className="avatar-xs bg-warning-subtle text-warning rounded d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:user-speak-bold" className="fs-16" />
                </div>
              </div>
              <h4 className="fw-bold text-body mb-1 font-monospace">8</h4>
              <small className="text-muted fs-11">Dengan tiket persetujuan resmi</small>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} sm={6}>
          <Card className="border-0 shadow-sm h-100">
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted fs-12 text-uppercase fw-medium">Integritas Hash Rantai</span>
                <div className="avatar-xs bg-success-subtle text-success rounded d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:shield-check-bold" className="fs-16" />
                </div>
              </div>
              <h4 className="fw-bold text-success mb-1 font-monospace">100% VALID</h4>
              <small className="text-success fs-11">0 modifikasi tanpa otorisasi</small>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* FILTER & AUDIT TRAIL LOGS TABLE */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="bg-transparent border-bottom p-3">
          <Row className="g-2 align-items-center">
            <Col lg={4}>
              <InputGroup size="sm">
                <InputGroup.Text className="bg-light border-end-0">
                  <IconifyIcon icon="solar:magnifer-linear" className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Cari ID, nama pelaku, tabel, record ID, atau IP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0 bg-light"
                />
              </InputGroup>
            </Col>

            <Col sm={6} lg={3}>
              <Form.Select
                size="sm"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="bg-light border"
              >
                <option value="ALL">Semua Peran (Role)</option>
                <option value="SUPERADMIN">Superadmin</option>
                <option value="FINANCE">Finance &amp; Escrow</option>
                <option value="SECURITY_OFFICER">Security Officer</option>
                <option value="CATALOG_LEAD">Catalog &amp; Moderation</option>
              </Form.Select>
            </Col>

            <Col sm={6} lg={3}>
              <Form.Select
                size="sm"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="bg-light border"
              >
                <option value="ALL">Semua Tipe Aksi</option>
                <option value="TAKEDOWN_PRODUCT">TAKEDOWN_PRODUCT</option>
                <option value="APPROVE_DISBURSEMENT">APPROVE_DISBURSEMENT</option>
                <option value="UPDATE_COMMISSION_RATE">UPDATE_COMMISSION_RATE</option>
                <option value="ROTATE_GATEWAY_KEY">ROTATE_GATEWAY_KEY</option>
                <option value="REVOKE_MERCHANT_SESSIONS">REVOKE_MERCHANT_SESSIONS</option>
                <option value="RESTRICT_MERCHANT_KYC">RESTRICT_MERCHANT_KYC</option>
              </Form.Select>
            </Col>

            <Col lg={2} className="text-end">
              <span className="text-muted fs-12">
                Ditemukan <strong>{filteredLogs.length}</strong> log
              </span>
            </Col>
          </Row>
        </CardHeader>

        <CardBody className="p-0">
          <div className="table-responsive">
            <Table className="table align-middle table-hover mb-0 fs-12">
              <thead className="table-light text-uppercase fs-11">
                <tr>
                  <th style={{ width: 180 }}>Waktu Transaksi (Microsecond)</th>
                  <th>Pelaku (Actor)</th>
                  <th>Aksi &amp; Target Record</th>
                  <th>Alamat IP &amp; Lokasi</th>
                  <th>Kriptografis (SHA-256)</th>
                  <th className="text-center" style={{ width: 140 }}>JSON Diff</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log.id}>
                      {/* TIMESTAMP */}
                      <td>
                        <div className="font-monospace fw-semibold text-body fs-11">
                          {log.timestamp.split(' ')[1]}
                        </div>
                        <small className="text-muted fs-11 font-monospace">
                          {log.timestamp.split(' ')[0]}
                        </small>
                      </td>

                      {/* ACTOR */}
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-xs bg-secondary-subtle text-body rounded-circle d-flex align-items-center justify-content-center me-2 flex-shrink-0 fw-bold fs-10">
                            {log.actorName
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .substring(0, 2)}
                          </div>
                          <div>
                            <strong className="d-block text-body fs-12">{log.actorName}</strong>
                            <div className="d-flex align-items-center gap-1">
                              <Badge bg="light" className="text-muted border fs-10 font-monospace">
                                {log.actorId}
                              </Badge>
                              <Badge
                                bg={
                                  log.actorRole === 'SUPERADMIN'
                                    ? 'danger-subtle'
                                    : log.actorRole === 'FINANCE'
                                    ? 'success-subtle'
                                    : 'primary-subtle'
                                }
                                className={
                                  log.actorRole === 'SUPERADMIN'
                                    ? 'text-danger'
                                    : log.actorRole === 'FINANCE'
                                    ? 'text-success'
                                    : 'text-primary'
                                }
                                style={{ fontSize: '9px' }}
                              >
                                {log.actorRole}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* ACTION & TARGET */}
                      <td>
                        <Badge bg={log.actionBadgeColor || 'primary'} className="mb-1 d-inline-block">
                          {log.action}
                        </Badge>
                        <div className="fs-11 text-muted">
                          Tabel: <code className="text-primary">{log.targetTable}</code> &bull; ID: <span className="font-monospace text-body fw-semibold">{log.recordId}</span>
                        </div>
                      </td>

                      {/* IP & LOCATION */}
                      <td>
                        <div className="font-monospace text-body fw-semibold fs-11">
                          {log.ipAddress}
                        </div>
                        <small className="text-muted d-block fs-11">
                          <IconifyIcon icon="solar:map-point-linear" className="me-1" />
                          {log.location}
                        </small>
                      </td>

                      {/* SHA-256 HASH */}
                      <td>
                        <div className="d-flex align-items-center gap-1">
                          <code className="font-monospace fs-11 text-muted" title={log.sha256Hash}>
                            {log.sha256Hash.substring(0, 10)}...{log.sha256Hash.substring(log.sha256Hash.length - 6)}
                          </code>
                          <button
                            type="button"
                            className="btn btn-sm btn-link p-0 text-muted"
                            title="Salin SHA-256 Hash"
                            onClick={() => handleCopyHash(log.sha256Hash, log.id)}
                          >
                            <IconifyIcon
                              icon={copiedHash === log.id ? 'solar:check-circle-bold' : 'solar:copy-linear'}
                              className={`fs-14 ${copiedHash === log.id ? 'text-success' : ''}`}
                            />
                          </button>
                        </div>
                        <span className="badge bg-success-subtle text-success mt-1" style={{ fontSize: '9px' }}>
                          <IconifyIcon icon="solar:shield-check-bold" className="me-1" />
                          Chained Verified
                        </span>
                      </td>

                      {/* JSON DIFF BUTTON */}
                      <td className="text-center">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="d-inline-flex align-items-center fw-semibold px-2 py-1 fs-11"
                          onClick={() => handleOpenDiff(log)}
                        >
                          <IconifyIcon icon="solar:code-file-bold" className="me-1 fs-14" />
                          Lihat JSON Diff
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-muted">
                      <IconifyIcon icon="solar:document-text-linear" className="fs-32 mb-2 d-block mx-auto text-muted" />
                      Tidak ada data log audit yang sesuai dengan filter pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>

        {/* FOOTER PAGINATION */}
        <div className="p-3 border-top d-flex justify-content-between align-items-center flex-wrap gap-2">
          <small className="text-muted fs-12">
            Menampilkan <strong>{filteredLogs.length}</strong> dari 142,890 audit trail terindeks
          </small>
          <Pagination size="sm" className="mb-0">
            <Pagination.Prev disabled />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>{1428}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </div>
      </Card>

      {/* JSON DIFF MODAL */}
      <AuditDiffModal
        show={showDiffModal}
        onHide={() => {
          setShowDiffModal(false);
          setActiveLogForDiff(null);
        }}
        log={activeLogForDiff}
      />
    </>
  );
};

export default AuditLogsPage;
