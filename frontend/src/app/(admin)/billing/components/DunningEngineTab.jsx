import { useState } from 'react';
import { Card, CardHeader, CardBody, Row, Col, Badge, Button, Table, Form, Dropdown, Alert } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { formatRupiah, initialDunningQueue, dunningStageConfig } from '../data';
import DunningConfigModal from './DunningConfigModal';

const DunningEngineTab = () => {
  const [dunningQueue, setDunningQueue] = useState(initialDunningQueue);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [actionAlert, setActionAlert] = useState(null);

  // Filtered queue
  const filteredQueue = dunningQueue.filter((item) => {
    const matchesSearch =
      item.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.merchantCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === 'all' || item.status === selectedStage;
    return matchesSearch && matchesStage;
  });

  // Action: Trigger instant manual retry
  const handleTriggerRetry = (id) => {
    setDunningQueue((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isSuccess = Math.random() > 0.4;
          if (isSuccess) {
            return {
              ...item,
              status: 'RESOLVED',
              dunningStage: 'STAGE_RESOLVED',
              failureReason: null,
              lastAttemptAt: new Date().toISOString(),
              nextRetryAt: null,
            };
          } else {
            return {
              ...item,
              attemptCount: item.attemptCount + 1,
              lastAttemptAt: new Date().toISOString(),
            };
          }
        }
        return item;
      })
    );

    setActionAlert({
      type: 'info',
      message: `Percobaan penagihan ulang instan dijalankan untuk antrean ${id}. Gateway e-wallet / card tokenization merespons.`,
    });
    setTimeout(() => setActionAlert(null), 5000);
  };

  // Action: Freeze Store manually
  const handleFreezeStore = (id) => {
    setDunningQueue((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: 'FROZEN',
            dunningStage: 'STAGE_H7',
          };
        }
        return item;
      })
    );
    setActionAlert({
      type: 'danger',
      message: `Toko dalam antrean ${id} berhasil DIBEKUKAN (FROZEN). Checkout publik storefront telah dikunci.`,
    });
    setTimeout(() => setActionAlert(null), 5000);
  };

  // Action: Extend grace period
  const handleExtendGrace = (id) => {
    setDunningQueue((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            gracePeriodEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          };
        }
        return item;
      })
    );
    setActionAlert({
      type: 'success',
      message: `Masa toleransi (grace period) untuk ${id} diperpanjang +7 hari. Toko tidak akan dibekukan otomatis.`,
    });
    setTimeout(() => setActionAlert(null), 5000);
  };

  return (
    <>
      {/* ACTION ALERT NOTIFICATION */}
      {actionAlert && (
        <Alert
          variant={actionAlert.type}
          dismissible
          onClose={() => setActionAlert(null)}
          className="d-flex align-items-center mb-3 shadow-sm"
        >
          <IconifyIcon icon="solar:bell-bing-bold" className="me-2 fs-18 flex-shrink-0" />
          <div className="fs-12">{actionAlert.message}</div>
        </Alert>
      )}

      {/* VISUAL RETRY ENGINE LIFECYCLE TIMELINE */}
      <Card className="border-0 shadow-sm mb-4">
        <CardHeader className="p-3 border-bottom bg-body d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <h6 className="fw-bold text-body mb-0 d-flex align-items-center">
              <IconifyIcon icon="solar:refresh-circle-bold-duotone" className="me-2 text-warning fs-20" />
              Arsitektur Dunning Engine: Alur Percobaan Ulang & Eskalasi Otomatis
            </h6>
            <p className="text-muted fs-11 mb-0">
              Integrasi card tokenization & e-wallet auto-debit untuk perpanjangan sewa software tanpa intervensi manual.
            </p>
          </div>
          <Button
            variant="outline-secondary"
            size="sm"
            className="fs-11 py-1 px-2.5 d-flex align-items-center"
            onClick={() => setShowConfigModal(true)}
          >
            <IconifyIcon icon="solar:settings-bold" className="me-1" />
            Konfigurasi Engine
          </Button>
        </CardHeader>

        <CardBody className="p-3">
          <Row className="g-3">
            {/* Step 1: Hari H */}
            <Col md={3}>
              <div
                className="p-3 rounded-2 border h-100 position-relative"
                style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', borderLeft: '4px solid #f59e0b' }}
              >
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <span className="badge bg-warning text-dark font-monospace fs-10">TAHAP 1</span>
                  <span className="text-muted fs-11 fw-semibold">Hari H (Jatuh Tempo)</span>
                </div>
                <h6 className="fw-bold text-body fs-12 mb-1">Transaksi Dijalankan</h6>
                <p className="text-muted fs-11 mb-2">
                  Auto-debit dieksekusi. Jika gagal, webhook memicu pengiriman notifikasi invoice ke Email & WhatsApp pemilik toko.
                </p>
                <div className="d-flex align-items-center text-warning fs-11 fw-medium">
                  <IconifyIcon icon="solar:letter-bold" className="me-1" /> Email + WhatsApp Terkirim
                </div>
              </div>
            </Col>

            {/* Step 2: Hari H+1 */}
            <Col md={3}>
              <div
                className="p-3 rounded-2 border h-100 position-relative"
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', borderLeft: '4px solid #3b82f6' }}
              >
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <span className="badge bg-primary text-white font-monospace fs-10">TAHAP 2</span>
                  <span className="text-muted fs-11 fw-semibold">Hari H+1</span>
                </div>
                <h6 className="fw-bold text-body fs-12 mb-1">Percobaan Otomatis Ke-2</h6>
                <p className="text-muted fs-11 mb-2">
                  Sistem mencoba kembali penagihan tokenized card. Pengingat intensif diterbitkan ke WhatsApp toko.
                </p>
                <div className="d-flex align-items-center text-primary fs-11 fw-medium">
                  <IconifyIcon icon="solar:restart-bold" className="me-1" /> Retry Engine #2
                </div>
              </div>
            </Col>

            {/* Step 3: Hari H+3 */}
            <Col md={3}>
              <div
                className="p-3 rounded-2 border h-100 position-relative"
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', borderLeft: '4px solid #ef4444' }}
              >
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <span className="badge bg-danger text-white font-monospace fs-10">TAHAP 3</span>
                  <span className="text-danger fs-11 fw-bold">Hari H+3</span>
                </div>
                <h6 className="fw-bold text-danger fs-12 mb-1">Status: PAST_DUE</h6>
                <p className="text-muted fs-11 mb-2">
                  Percobaan ke-3 gagal. Status toko eskalasi menjadi <code>PAST_DUE</code>. Banner merah muncul di admin toko merchant.
                </p>
                <div className="d-flex align-items-center text-danger fs-11 fw-medium">
                  <IconifyIcon icon="solar:danger-triangle-bold" className="me-1" /> Warning Banner Aktif
                </div>
              </div>
            </Col>

            {/* Step 4: Hari H+7 */}
            <Col md={3}>
              <div
                className="p-3 rounded-2 border h-100 position-relative"
                style={{ backgroundColor: 'rgba(100, 116, 139, 0.05)', borderLeft: '4px solid #475569' }}
              >
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <span className="badge bg-dark text-white font-monospace fs-10">TAHAP 4</span>
                  <span className="text-secondary fs-11 fw-bold">Hari H+7</span>
                </div>
                <h6 className="fw-bold text-body fs-12 mb-1">Status: FROZEN</h6>
                <p className="text-muted fs-11 mb-2">
                  Akses checkout toko publik dikunci permanen hingga tagihan lunas. Tenant masuk fase karantina.
                </p>
                <div className="d-flex align-items-center text-dark fs-11 fw-medium">
                  <IconifyIcon icon="solar:lock-bold" className="me-1" /> Checkout Dikunci
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* MASTER DATA TABLE: ACTIVE DUNNING QUEUE */}
      <Card className="border-0 shadow-sm overflow-hidden mb-4">
        <CardHeader className="p-3 border-bottom bg-body">
          <Row className="g-2 align-items-center">
            <Col lg={5}>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-sm ps-4"
                  placeholder="Cari toko dunning, kode tenant, atau metode bayar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconifyIcon
                  icon="solar:magnifer-linear"
                  className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
                />
              </div>
            </Col>

            <Col xs={6} md={4} lg={3}>
              <Form.Select
                size="sm"
                className="fs-12"
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
              >
                <option value="all">Semua Status Dunning</option>
                <option value="RETRY_1">Percobaan #1 (Hari H)</option>
                <option value="RETRY_2">Percobaan #2 (Hari H+1)</option>
                <option value="PAST_DUE">Tunggakan Tagihan (PAST_DUE)</option>
                <option value="FROZEN">Toko Dibekukan (FROZEN)</option>
                <option value="RESOLVED">Selesai Dibayar (RESOLVED)</option>
              </Form.Select>
            </Col>

            <Col xs={6} md={3} lg={4} className="text-end">
              <span className="badge bg-light text-muted border fw-normal py-1 px-2 fs-11">
                {filteredQueue.length} Kasus Terpantau
              </span>
            </Col>
          </Row>
        </CardHeader>

        <div className="table-responsive">
          <Table hover className="align-middle mb-0 fs-12">
            <thead className="bg-light bg-opacity-50 border-bottom">
              <tr className="text-muted text-uppercase fs-11">
                <th className="ps-3" style={{ minWidth: 220 }}>Toko & Kontak Merchant</th>
                <th style={{ minWidth: 150 }}>Paket & Tagihan</th>
                <th style={{ minWidth: 160 }}>Tahap & Status Dunning</th>
                <th style={{ minWidth: 200 }}>Metode & Alasan Kegagalan</th>
                <th style={{ minWidth: 150 }}>Jatuh Tempo & Notifikasi</th>
                <th className="text-end pe-3" style={{ minWidth: 180 }}>Aksi Superadmin</th>
              </tr>
            </thead>
            <tbody>
              {filteredQueue.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    <IconifyIcon icon="solar:check-circle-bold-duotone" className="fs-32 text-success mb-2 d-block mx-auto" />
                    <strong>Tidak ada antrean dunning yang cocok dengan filter pencarian.</strong>
                    <p className="fs-11 mb-0">Semua perpanjangan sewa SaaS tenant berjalan lancar.</p>
                  </td>
                </tr>
              ) : (
                filteredQueue.map((item) => {
                  const stageInfo = dunningStageConfig[item.dunningStage] || dunningStageConfig.STAGE_H;

                  return (
                    <tr key={item.id}>
                      {/* Toko & Kontak */}
                      <td className="ps-3">
                        <div className="fw-bold text-body fs-13">{item.merchantName}</div>
                        <div className="d-flex align-items-center gap-1.5 mt-0.5">
                          <span className="badge bg-light text-secondary border font-monospace fs-10">
                            {item.merchantCode}
                          </span>
                          <span className="text-muted fs-11">&bull; {item.ownerName}</span>
                        </div>
                        <div className="text-muted fs-11 mt-0.5">
                          <a
                            href={`https://wa.me/${item.ownerPhone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-success text-decoration-none d-inline-flex align-items-center"
                          >
                            <IconifyIcon icon="solar:chat-round-dots-bold" className="me-1 fs-12" />
                            {item.ownerPhone}
                          </a>
                        </div>
                      </td>

                      {/* Paket & Tagihan */}
                      <td>
                        <div className="d-flex align-items-center gap-1 mb-1">
                          <span
                            className="badge px-1.5 py-0.5 fs-10 fw-semibold text-uppercase"
                            style={{
                              backgroundColor:
                                item.plan === 'Enterprise'
                                  ? '#ff6c2f'
                                  : item.plan === 'Pro'
                                  ? '#3b82f6'
                                  : '#64748b',
                              color: '#fff',
                            }}
                          >
                            {item.plan}
                          </span>
                          <span className="text-muted fs-11">({item.billingCycle})</span>
                        </div>
                        <strong className="text-body fs-13 d-block">{formatRupiah(item.amount)}</strong>
                      </td>

                      {/* Tahap & Status Dunning */}
                      <td>
                        <div
                          className="d-inline-flex align-items-center px-2 py-0.5 rounded fs-11 fw-semibold mb-1"
                          style={{ backgroundColor: stageInfo.bg, color: stageInfo.textColor }}
                        >
                          <IconifyIcon
                            icon={
                              item.status === 'FROZEN'
                                ? 'solar:lock-bold'
                                : item.status === 'PAST_DUE'
                                ? 'solar:danger-triangle-bold'
                                : item.status === 'RESOLVED'
                                ? 'solar:check-circle-bold'
                                : 'solar:refresh-circle-bold'
                            }
                            className="me-1 fs-12"
                          />
                          {stageInfo.label}
                        </div>
                        <div className="text-muted fs-10">
                          Percobaan ke-<strong>{item.attemptCount}</strong>
                          {item.nextRetryAt && (
                            <span> &bull; Retry:{' '}
                              {new Date(item.nextRetryAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Metode & Alasan Kegagalan */}
                      <td>
                        <div className="fw-medium text-body fs-12">{item.paymentMethod}</div>
                        {item.failureReason ? (
                          <div className="text-danger fs-11 mt-0.5 d-flex align-items-center">
                            <IconifyIcon icon="solar:close-circle-bold" className="me-1 fs-12 flex-shrink-0" />
                            <span className="text-truncate" style={{ maxWidth: 220 }} title={item.failureReason}>
                              {item.failureReason}
                            </span>
                          </div>
                        ) : (
                          <div className="text-success fs-11 mt-0.5 d-flex align-items-center">
                            <IconifyIcon icon="solar:check-circle-bold" className="me-1 fs-12" />
                            Transaksi Berhasil Diselesaikan
                          </div>
                        )}
                      </td>

                      {/* Jatuh Tempo & Notifikasi */}
                      <td>
                        <div className="text-muted fs-11">
                          Due:{' '}
                          <strong className="text-body">
                            {new Date(item.dueDate).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </strong>
                        </div>
                        <div className="d-flex align-items-center gap-1 mt-1">
                          {item.notificationLogs.map((log, idx) => (
                            <span
                              key={idx}
                              className="badge bg-light text-muted border fs-10 d-inline-flex align-items-center"
                              title={`${log.type} status: ${log.status}`}
                            >
                              <IconifyIcon
                                icon={log.type === 'WHATSAPP' ? 'solar:chat-round-bold' : 'solar:letter-bold'}
                                className={`me-0.5 ${log.type === 'WHATSAPP' ? 'text-success' : 'text-primary'}`}
                              />
                              {log.type}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Aksi Superadmin */}
                      <td className="text-end pe-3">
                        <div className="d-inline-flex align-items-center justify-content-end gap-1.5">
                          {item.status !== 'RESOLVED' && (
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="py-1 px-2 fs-11 d-inline-flex align-items-center rounded-2"
                              title="Eksekusi Penagihan Ulang Sekarang"
                              onClick={() => handleTriggerRetry(item.id)}
                            >
                              <IconifyIcon icon="solar:restart-bold" className="me-1 fs-12" />
                              Retry
                            </Button>
                          )}

                          <a
                            href={`https://wa.me/${item.ownerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Halo ${item.ownerName}, kami menginformasikan perpanjangan sewa software Indovia untuk toko ${item.merchantName} (${formatRupiah(item.amount)}) saat ini tertunda. Mohon segera lakukan verifikasi pembayaran.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-outline-success py-1 px-2 fs-11 d-inline-flex align-items-center rounded-2"
                            title="Kirim Notifikasi WhatsApp Tagihan"
                          >
                            <IconifyIcon icon="solar:chat-round-dots-bold" className="me-1 fs-12" />
                            Ingatkan WA
                          </a>

                          <Dropdown align="end">
                            <Dropdown.Toggle
                              as="button"
                              className="btn btn-sm btn-outline-secondary py-1 px-1.5 fs-12 border rounded-2"
                              title="Aksi Tambahan"
                            >
                              <IconifyIcon icon="solar:menu-dots-bold" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="fs-12 shadow-sm border">
                              <Dropdown.Item onClick={() => handleExtendGrace(item.id)}>
                                <IconifyIcon icon="solar:clock-circle-bold" className="me-2 text-warning" />
                                Perpanjang Grace Period (+7 Hari)
                              </Dropdown.Item>
                              <div className="dropdown-divider" />
                              {item.status !== 'FROZEN' ? (
                                <Dropdown.Item
                                  onClick={() => handleFreezeStore(item.id)}
                                  className="text-danger"
                                >
                                  <IconifyIcon icon="solar:lock-bold" className="me-2" />
                                  Kunci Checkout (Freeze Toko)
                                </Dropdown.Item>
                              ) : (
                                <Dropdown.Item
                                  onClick={() => handleTriggerRetry(item.id)}
                                  className="text-success"
                                >
                                  <IconifyIcon icon="solar:check-circle-bold" className="me-2" />
                                  Buka Kunci Toko (Unfreeze)
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* Dunning Configuration Modal */}
      <DunningConfigModal
        show={showConfigModal}
        onHide={() => setShowConfigModal(false)}
        onSave={(newCfg) => {
          setActionAlert({
            type: 'success',
            message: `Konfigurasi Dunning Engine berhasil diperbarui. Retry interval & template notifikasi telah sinkron.`,
          });
          setTimeout(() => setActionAlert(null), 5000);
        }}
      />
    </>
  );
};

export default DunningEngineTab;
