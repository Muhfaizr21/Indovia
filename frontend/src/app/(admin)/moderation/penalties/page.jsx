// src/app/(admin)/moderation/penalties/page.jsx
import React, { useState } from 'react';
import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Badge,
  Form,
  InputGroup,
  Alert,
} from 'react-bootstrap';
import StrikePardonModal from '../components/StrikePardonModal';
import {
  penaltyKpiSummary,
  penaltyStrikeMerchants,
} from '../data';

const PenaltiesPage = () => {
  const [merchants, setMerchants] = useState(penaltyStrikeMerchants);
  const [kpi, setKpi] = useState(penaltyKpiSummary);
  const [selectedMerchantForAction, setSelectedMerchantForAction] = useState(null);

  // Search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [strikeFilter, setStrikeFilter] = useState('ALL');

  // Handle Action from StrikePardonModal
  const handleConfirmPardonAction = ({ merchantId, actionType }) => {
    setMerchants((prev) =>
      prev.map((m) => {
        if (m.merchantId === merchantId) {
          if (actionType === 'REVOKE_ONE_STRIKE') {
            const newLevel = Math.max(0, m.strikeLevel - 1);
            return {
              ...m,
              strikeLevel: newLevel,
              strikeStatus: newLevel === 0 ? 'CLEAN' : newLevel === 1 ? 'WARNING_ACTIVE' : 'RESTRICTED_UPLOAD',
              activePenalty: newLevel === 0 ? 'Tidak Ada Sanksi Aktif' : newLevel === 1 ? 'Peringatan Tertulis (Masa Pantau)' : 'Pembatasan Upload',
              cooldownUntil: newLevel === 0 ? '-' : 'Masa Pantau 30 Hari',
            };
          } else if (actionType === 'LIFT_COOLDOWN') {
            return {
              ...m,
              activePenalty: 'Cooldown Upload Dicabut oleh Superadmin',
              cooldownUntil: 'Izin Upload Dipulihkan',
            };
          } else if (actionType === 'MANUAL_PERMANENT_BAN') {
            return {
              ...m,
              strikeLevel: 3,
              strikeStatus: 'BANNED_FREEZE',
              activePenalty: 'Permanent Store Ban & Saldo Escrow Dibekukan',
              cooldownUntil: 'PERMANEN (Toko Ditutup untuk Publik)',
            };
          }
        }
        return m;
      })
    );
  };

  // Filtered merchants
  const filteredMerchants = merchants.filter((m) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      m.storeName.toLowerCase().includes(q) ||
      m.ownerName.toLowerCase().includes(q) ||
      m.ownerEmail.toLowerCase().includes(q) ||
      m.merchantId.toLowerCase().includes(q);

    const matchesStrike =
      strikeFilter === 'ALL' ||
      (strikeFilter === 'STRIKE_1' && m.strikeLevel === 1) ||
      (strikeFilter === 'STRIKE_2' && m.strikeLevel === 2) ||
      (strikeFilter === 'STRIKE_3' && m.strikeLevel === 3);

    return matchesSearch && matchesStrike;
  });

  return (
    <>
      <PageTItle title="Mekanisme Takedown Sepihak & Penalty System (Strike System)" />

      {/* HEADER ACTION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1 text-body">6.2 Mekanisme Takedown Sepihak & Penalty System</h4>
          <p className="text-muted fs-13 mb-0">
            Sistem poin penalti bertingkat (*Strike System*) untuk menegakkan standar etika dagang, kepatuhan UU ITE & UU Perlindungan Konsumen di Indovia.
          </p>
        </div>
        <div className="d-flex flex-wrap align-items-center gap-2 mt-2 mt-sm-0">
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center"
            onClick={() => alert('Mengunduh Laporan Rekapitulasi Pelanggaran & Takedown Katalog (PDF/CSV)...')}
          >
            <IconifyIcon icon="solar:document-text-bold-duotone" className="me-2 fs-16" />
            Ekspor Laporan Kepatuhan
          </Button>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <Row className="g-3 mb-3">
        {/* Card 1: Total Sanksi Aktif */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Toko Kena Sanksi Aktif
                </span>
                <div className="avatar-sm bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:flame-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-body">
                {kpi.totalStrikesActive} Toko
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="text-danger fw-semibold me-1">Audit Ketat</span>
                <span>terhadap 128rb produk</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Card 2: Strike 1 Peringatan */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Strike 1: Peringatan Tertulis
                </span>
                <div className="avatar-sm bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:bell-bing-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-warning">
                {kpi.strike1Warnings} Toko
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="badge bg-warning-subtle text-warning me-1">1x Pelanggaran</span>
                <span>Takedown produk & surat resmi</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Card 3: Strike 2 Pembatasan Upload 7 Hari */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Strike 2: Freeze Upload 7 Hari
                </span>
                <div className="avatar-sm bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:lock-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-warning">
                {kpi.strike2UploadFreeze} Toko
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="badge bg-warning-subtle text-warning me-1">2x Pelanggaran</span>
                <span>Upload produk baru diblokir</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Card 4: Strike 3 Permanent Ban */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Strike 3: Permanent Store Ban
                </span>
                <div className="avatar-sm bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:shield-cross-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-danger">
                {kpi.strike3PermanentBan} Toko
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="badge bg-danger text-white me-1">3x Pelanggaran</span>
                <span>Toko freeze & akun diblokir</span>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* STRIKE SYSTEM POLICY TIERS CARD */}
      <Card className="border-secondary-subtle mb-3">
        <CardBody className="p-3">
          <h5 className="fw-bold mb-1 text-body d-flex align-items-center">
            <IconifyIcon icon="solar:shield-warning-bold-duotone" className="text-primary me-2 fs-20" />
            Standar Prosedur Operasional (SOP) Sistem Poin Pelanggaran Bertingkat
          </h5>
          <p className="text-muted fs-12 mb-3">
            Setiap tindakan takedown produk oleh Superadmin akan secara otomatis mengeskalasi level strike toko terkait sesuai matriks kepatuhan hukum berikut:
          </p>

          <Row className="g-3">
            {/* Step 1 */}
            <Col md={4}>
              <div className="p-3 bg-body-tertiary rounded border border-secondary-subtle h-100">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <Badge bg="warning-subtle" className="text-warning border border-warning-subtle fs-12 px-2 py-1">
                    STRIKE 1 (1x Pelanggaran)
                  </Badge>
                  <IconifyIcon icon="solar:letter-bold-duotone" className="text-warning fs-20" />
                </div>
                <h6 className="fw-bold text-body fs-13 mb-1">Peringatan Tertulis + Takedown</h6>
                <p className="text-muted fs-12 mb-0">
                  Produk dicabut sepihak seketika dari etalase publik. Surat peringatan resmi dikirimkan via email dan WhatsApp toko. Masa pemantauan keaktifan 30 hari.
                </p>
              </div>
            </Col>

            {/* Step 2 */}
            <Col md={4}>
              <div className="p-3 bg-body-tertiary rounded border border-warning-subtle h-100">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <Badge bg="warning" className="text-dark fs-12 px-2 py-1">
                    STRIKE 2 (2x Pelanggaran)
                  </Badge>
                  <IconifyIcon icon="solar:lock-keyhole-bold-duotone" className="text-warning fs-20" />
                </div>
                <h6 className="fw-bold text-body fs-13 mb-1">Pembatasan Upload 7 Hari</h6>
                <p className="text-muted fs-12 mb-0">
                  Akses tambah produk baru dinonaktifkan otomatis selama 7 hari kalender. Merchant diwajibkan melakukan pembersihan mandiri terhadap seluruh katalog toko.
                </p>
              </div>
            </Col>

            {/* Step 3 */}
            <Col md={4}>
              <div className="p-3 bg-danger-subtle rounded border border-danger-subtle h-100">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <Badge bg="danger" className="text-white fs-12 px-2 py-1">
                    STRIKE 3 (3x Pelanggaran)
                  </Badge>
                  <IconifyIcon icon="solar:shield-cross-bold-duotone" className="text-danger fs-20" />
                </div>
                <h6 className="fw-bold text-danger fs-13 mb-1">Permanent Store Ban / Freeze</h6>
                <p className="text-body fs-12 mb-0">
                  Toko dibekukan secara permanen dari platform Indovia. Seluruh produk diturunkan dari pencarian publik, dan saldo escrow ditahan untuk investigasi tindak pidana.
                </p>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* MERCHANT STRIKE DIRECTORY TABLE */}
      <Card className="border-secondary-subtle">
        <CardBody className="p-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <h5 className="fw-bold mb-0 text-body d-flex align-items-center">
                <IconifyIcon icon="solar:users-group-two-rounded-bold-duotone" className="text-danger me-2 fs-20" />
                Direktori Toko Terkena Poin Pelanggaran (Strike Directory)
              </h5>
              <span className="text-muted fs-12">
                Daftar merchant yang terbukti melanggar ketentuan barang terlarang, hak cipta bermerek, atau regulasi hukum.
              </span>
            </div>

            {/* Search and Filter */}
            <div className="d-flex flex-wrap gap-2">
              <InputGroup size="sm" style={{ width: '240px' }}>
                <InputGroup.Text className="bg-body border-secondary-subtle">
                  <IconifyIcon icon="solar:magnifer-linear" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Cari toko, pemilik, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-secondary-subtle"
                />
              </InputGroup>

              <Form.Select
                size="sm"
                value={strikeFilter}
                onChange={(e) => setStrikeFilter(e.target.value)}
                className="border-secondary-subtle"
                style={{ width: '180px' }}
              >
                <option value="ALL">Semua Level Strike</option>
                <option value="STRIKE_1">Strike 1 (Peringatan)</option>
                <option value="STRIKE_2">Strike 2 (Freeze 7 Hari)</option>
                <option value="STRIKE_3">Strike 3 (Banned)</option>
              </Form.Select>
            </div>
          </div>

          <div className="table-responsive">
            <Table hover className="table-nowrap mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="fs-12 fw-semibold text-uppercase py-3 ps-3">Nama Toko & Kontak Pemilik</th>
                  <th className="fs-12 fw-semibold text-uppercase text-center py-3">Tingkat Strike</th>
                  <th className="fs-12 fw-semibold text-uppercase py-3">Sanksi Kepatuhan Aktif</th>
                  <th className="fs-12 fw-semibold text-uppercase py-3">Masa Berlaku / Countdown</th>
                  <th className="fs-12 fw-semibold text-uppercase text-center py-3">Produk Dicabut</th>
                  <th className="fs-12 fw-semibold text-uppercase py-3" style={{ minWidth: '220px' }}>Pelanggaran Terakhir</th>
                  <th className="fs-12 fw-semibold text-uppercase text-end py-3 pe-3">Aksi Superadmin</th>
                </tr>
              </thead>
              <tbody>
                {filteredMerchants.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-muted fs-13">
                      Tidak ada toko yang sesuai dengan filter pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredMerchants.map((m) => {
                    const isBanned = m.strikeLevel >= 3;
                    const isRestricted = m.strikeLevel === 2;

                    return (
                      <tr key={m.merchantId} className={isBanned ? 'table-danger-subtle' : ''}>
                        {/* Store & Contact */}
                        <td className="py-3 ps-3">
                          <span className="fw-bold text-body fs-13 d-block mb-1">{m.storeName}</span>
                          <div className="text-muted fs-11 d-flex flex-wrap align-items-center gap-2">
                            <span>{m.ownerName}</span>
                            <span>•</span>
                            <span className="font-monospace text-secondary fw-semibold">{m.ownerPhone}</span>
                          </div>
                        </td>

                        {/* Strike Badge */}
                        <td className="text-center py-3">
                          {isBanned ? (
                            <Badge bg="danger" className="text-white fs-11 px-3 py-1.5">
                              <IconifyIcon icon="solar:shield-cross-bold" className="me-1" />
                              Strike 3 / 3 (BANNED)
                            </Badge>
                          ) : isRestricted ? (
                            <Badge bg="warning" className="text-dark fs-11 px-3 py-1.5">
                              <IconifyIcon icon="solar:lock-bold" className="me-1" />
                              Strike 2 / 3 (RESTRICTED)
                            </Badge>
                          ) : (
                            <Badge bg="warning-subtle" className="text-warning border border-warning-subtle fs-11 px-3 py-1.5">
                              <IconifyIcon icon="solar:bell-bing-bold" className="me-1" />
                              Strike 1 / 3 (WARNING)
                            </Badge>
                          )}
                        </td>

                        {/* Active Penalty */}
                        <td className="py-3">
                          <span className={`fs-12 fw-semibold d-block ${isBanned ? 'text-danger' : isRestricted ? 'text-warning' : 'text-body'}`}>
                            {m.activePenalty}
                          </span>
                        </td>

                        {/* Cooldown / Expiry */}
                        <td className="py-3">
                          <span className="badge bg-secondary-subtle text-secondary fs-11 px-2.5 py-1">
                            <IconifyIcon icon="solar:clock-circle-bold" className="me-1" />
                            {m.cooldownUntil}
                          </span>
                        </td>

                        {/* Takedown Count */}
                        <td className="text-center py-3">
                          <span className="fw-bold text-danger fs-13 font-monospace">
                            {m.takedownCount} Produk
                          </span>
                        </td>

                        {/* Last Violation Snippet */}
                        <td className="py-3">
                          {m.violations && m.violations.length > 0 ? (
                            <div>
                              <span className="fw-semibold text-body fs-12 d-block line-clamp-1 mb-1">
                                {m.violations[m.violations.length - 1].productName}
                              </span>
                              <span className="text-muted fs-11">
                                {m.violations[m.violations.length - 1].reason}
                              </span>
                            </div>
                          ) : (
                            <span className="text-muted fs-11">-</span>
                          )}
                        </td>

                        {/* Action CTA */}
                        <td className="text-end py-3 pe-3">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            className="fs-11 fw-semibold d-inline-flex align-items-center py-1.5 px-3"
                            onClick={() => setSelectedMerchantForAction(m)}
                          >
                            <IconifyIcon icon="solar:settings-bold" className="me-1" />
                            Kelola Sanksi
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* MODAL PENALTY ADJUSTMENT / PARDON */}
      <StrikePardonModal
        show={!!selectedMerchantForAction}
        onHide={() => setSelectedMerchantForAction(null)}
        merchant={selectedMerchantForAction}
        onConfirmAction={handleConfirmPardonAction}
      />
    </>
  );
};

export default PenaltiesPage;
