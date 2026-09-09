// src/app/(admin)/moderation/catalog/page.jsx
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
import ProductTakedownModal from '../components/ProductTakedownModal';
import BlacklistConfigModal from '../components/BlacklistConfigModal';
import {
  formatRupiah,
  moderationKpiSummary,
  sampleCatalogProducts,
  blacklistDictionary,
} from '../data';

const CatalogAuditPage = () => {
  // Modal states
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const [selectedProductForTakedown, setSelectedProductForTakedown] = useState(null);

  // Data states
  const [products, setProducts] = useState(sampleCatalogProducts);
  const [kpi, setKpi] = useState(moderationKpiSummary);
  const [isRescanning, setIsRescanning] = useState(false);
  const [rescanNotice, setRescanNotice] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Handle Rescan
  const handleRescan = () => {
    setIsRescanning(true);
    setTimeout(() => {
      setIsRescanning(false);
      setRescanNotice(true);
      setTimeout(() => setRescanNotice(false), 3000);
    }, 1000);
  };

  // Handle Approve Product
  const handleApproveProduct = (id) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status: 'APPROVED',
            riskLevel: 'SAFE',
            flagReason: 'Telah diverifikasi dan disetujui manual oleh Superadmin.',
          };
        }
        return p;
      })
    );
  };

  // Handle Confirm Takedown from Modal
  const handleConfirmTakedown = ({ productId, reasonTitle, customDetail }) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            status: 'TAKEDOWN_BY_ADMIN',
            takedownDate: 'Hari Ini, Baru Saja',
            takedownBy: 'Superadmin Indovia Compliance',
            flagReason: `${reasonTitle}: ${customDetail}`,
          };
        }
        return p;
      })
    );
    setKpi((prev) => ({
      ...prev,
      takedownByAdmin: prev.takedownByAdmin + 1,
      flaggedForReview: Math.max(0, prev.flaggedForReview - 1),
    }));
  };

  // Filtered Products
  const filteredProducts = products.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(q) ||
      item.sku.toLowerCase().includes(q) ||
      item.storeName.toLowerCase().includes(q) ||
      item.ownerName.toLowerCase().includes(q);

    const matchesCategory =
      categoryFilter === 'ALL' || item.category === categoryFilter;

    const matchesStatus =
      statusFilter === 'ALL' || item.status === statusFilter;

    const min = minPrice ? Number(minPrice) : 0;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    const matchesPrice = item.price >= min && item.price <= max;

    return matchesSearch && matchesCategory && matchesStatus && matchesPrice;
  });

  return (
    <>
      <PageTItle title="Mesin Audit Katalog Nasional & Blacklist Word Filter" />

      {/* HEADER ACTION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1 text-body">6.1 Mesin Audit Katalog Nasional</h4>
          <p className="text-muted fs-13 mb-0">
            Pencarian global lintas ratusan toko, pemfilteran otomatis kata kunci barang terlarang (narkotika, senjata, obat tanpa BPOM, barang palsu, pornografi).
          </p>
        </div>
        <div className="d-flex flex-wrap align-items-center gap-2 mt-2 mt-sm-0">
          <Badge bg="success-subtle" className="text-success border border-success-subtle px-3 py-2 fs-12 d-flex align-items-center">
            <span className="badge-dot bg-success me-2" />
            Filter Otomatis: <strong>{kpi.totalBlacklistKeywords} Kata Terlarang</strong>
          </Badge>
          <Button
            variant="outline-secondary"
            size="sm"
            className="d-flex align-items-center"
            onClick={handleRescan}
            disabled={isRescanning}
          >
            <IconifyIcon
              icon="solar:refresh-bold"
              className={`me-2 fs-16 ${isRescanning ? 'spin-animation' : ''}`}
            />
            {isRescanning ? 'Memindai Katalog...' : 'Pindai Ulang Katalog'}
          </Button>
          <Button
            variant="warning"
            size="sm"
            className="d-flex align-items-center fw-semibold text-dark"
            onClick={() => setShowBlacklistModal(true)}
          >
            <IconifyIcon icon="solar:shield-warning-bold-duotone" className="me-2 fs-16" />
            Kamus Kata Terlarang (Blacklist)
          </Button>
        </div>
      </div>

      {/* RESCAN TOAST/ALERT */}
      {rescanNotice && (
        <Alert variant="info" className="border-info-subtle d-flex align-items-center justify-content-between mb-3 shadow-sm">
          <div className="d-flex align-items-center gap-2">
            <IconifyIcon icon="solar:check-circle-bold" className="text-info fs-20" />
            <span className="fs-12 text-body">
              <strong>Pemindaian Selesai!</strong> 128.450 produk di katalog nasional telah diverifikasi ulang terhadap 215 kata kunci barang terlarang.
            </span>
          </div>
          <button type="button" className="btn-close fs-12" onClick={() => setRescanNotice(false)} />
        </Alert>
      )}

      {/* KPI METRIC CARDS */}
      <Row className="g-3 mb-3">
        {/* Card 1: Total Produk Diaudit */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Total Produk Terdaftar
                </span>
                <div className="avatar-sm bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:box-minimalistic-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-body">
                {kpi.totalProductsAudited.toLocaleString('id-ID')}
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="text-success fw-semibold me-1">Lintas Ratusan Toko</span>
                <span>di ekosistem Indovia</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Card 2: Lolos & Tayang Publik */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Lolos & Tayang (Approved)
                </span>
                <div className="avatar-sm bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:check-circle-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-success">
                {kpi.approvedProducts.toLocaleString('id-ID')}
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="badge bg-success-subtle text-success me-1">98.2%</span>
                <span>Produk aman & sesuai regulasi</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Card 3: Flagged for Review */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Ditandai Butuh Review
                </span>
                <div className="avatar-sm bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:danger-triangle-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-warning">
                {kpi.flaggedForReview.toLocaleString('id-ID')}
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="badge bg-warning-subtle text-warning me-1">Trigger Otomatis</span>
                <span>Kata kunci terlarang terdeteksi</span>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Card 4: Dicabut Sepihak (Takedown) */}
        <Col xl={3} sm={6}>
          <Card className="h-100 border-secondary-subtle">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-12 fw-semibold text-uppercase">
                  Takedown by Admin
                </span>
                <div className="avatar-sm bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center">
                  <IconifyIcon icon="solar:shield-cross-bold-duotone" className="fs-20" />
                </div>
              </div>
              <h3 className="fw-bold mb-1 text-danger">
                {kpi.takedownByAdmin.toLocaleString('id-ID')}
              </h3>
              <div className="d-flex align-items-center text-muted fs-12">
                <span className="badge bg-danger-subtle text-danger me-1">Pelanggaran Hukum</span>
                <span>Dicabut sepihak dari toko</span>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* FILTER SEARCH BAR & MULTI-DIMENSIONAL AUDIT */}
      <Card className="border-secondary-subtle mb-3">
        <CardBody className="p-3">
          <Row className="g-2 align-items-end">
            {/* Global Search */}
            <Col lg={4} md={6}>
              <Form.Label className="fs-12 fw-semibold text-body mb-1">
                Pencarian Global Multi-Dimensi
              </Form.Label>
              <InputGroup size="sm">
                <InputGroup.Text className="bg-body border-secondary-subtle">
                  <IconifyIcon icon="solar:magnifer-linear" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Cari kata kunci judul, SKU, nama toko, pemilik..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-secondary-subtle"
                />
              </InputGroup>
            </Col>

            {/* Category Filter */}
            <Col lg={3} md={6}>
              <Form.Label className="fs-12 fw-semibold text-body mb-1">
                Kategori Produk
              </Form.Label>
              <Form.Select
                size="sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border-secondary-subtle"
              >
                <option value="ALL">Semua Kategori</option>
                <option value="Jam Tangan & Perhiasan">Jam Tangan & Perhiasan</option>
                <option value="Kesehatan & Obat-obatan">Kesehatan & Obat-obatan</option>
                <option value="Olahraga & Hobi">Olahraga & Hobi</option>
                <option value="Kecantikan & Kosmetik">Kecantikan & Kosmetik</option>
                <option value="Pakaian & Mode Tradisional">Pakaian & Mode Tradisional</option>
                <option value="Makanan & Minuman">Makanan & Minuman</option>
                <option value="Sepatu Pria & Olahraga">Sepatu Pria & Olahraga</option>
                <option value="Rokok & Tembakau">Rokok & Tembakau</option>
                <option value="Tas & Aksesoris Wanita">Tas & Aksesoris Wanita</option>
              </Form.Select>
            </Col>

            {/* Price Range Min - Max */}
            <Col lg={3} md={6}>
              <Form.Label className="fs-12 fw-semibold text-body mb-1">
                Rentang Harga (Rp)
              </Form.Label>
              <div className="d-flex gap-1">
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="border-secondary-subtle"
                />
                <span className="text-muted align-self-center">-</span>
                <Form.Control
                  size="sm"
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="border-secondary-subtle"
                />
              </div>
            </Col>

            {/* Reset Filter Button */}
            <Col lg={2} md={6}>
              <Button
                variant="outline-secondary"
                size="sm"
                className="w-100 fw-semibold"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('ALL');
                  setStatusFilter('ALL');
                  setMinPrice('');
                  setMaxPrice('');
                }}
              >
                <IconifyIcon icon="solar:restart-bold" className="me-1" />
                Reset Filter
              </Button>
            </Col>
          </Row>

          {/* Status Filter Buttons */}
          <div className="d-flex flex-wrap align-items-center gap-2 mt-3 pt-2 border-top border-secondary-subtle">
            <span className="text-muted fs-11 me-2 text-uppercase fw-semibold">Status Moderasi:</span>
            {[
              { key: 'ALL', label: 'Semua Status' },
              { key: 'FLAGGED_FOR_REVIEW', label: 'Butuh Review (Flagged)' },
              { key: 'TAKEDOWN_BY_ADMIN', label: 'Takedown by Admin' },
              { key: 'APPROVED', label: 'Lolos (Approved)' },
            ].map((st) => (
              <Button
                key={st.key}
                variant={statusFilter === st.key ? 'primary' : 'outline-secondary'}
                size="sm"
                className="fs-11 py-1 px-3 rounded-pill fw-semibold"
                onClick={() => setStatusFilter(st.key)}
              >
                {st.label}
              </Button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* CATALOG AUDIT TABLE */}
      <Card className="border-secondary-subtle">
        <CardBody className="p-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <div>
              <h5 className="fw-bold mb-0 text-body d-flex align-items-center">
                <IconifyIcon icon="solar:checklist-bold-duotone" className="text-primary me-2 fs-20" />
                Hasil Audit Katalog Produk Lintas Toko ({filteredProducts.length} Produk Ditemukan)
              </h5>
              <span className="text-muted fs-12">
                Klik "Takedown Instan" untuk mencabut produk pelanggar sepihak dan menerapkan eskalasi sanksi strike ke merchant.
              </span>
            </div>
          </div>

          <div className="table-responsive">
            <Table hover className="table-nowrap mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="fs-12 fw-semibold text-uppercase py-2.5 ps-3" style={{ minWidth: '320px' }}>
                    Informasi Produk & SKU
                  </th>
                  <th className="fs-12 fw-semibold text-uppercase py-2.5">Nama Toko & Pemilik</th>
                  <th className="fs-12 fw-semibold text-uppercase py-2.5">Kategori</th>
                  <th className="fs-12 fw-semibold text-uppercase py-2.5">Harga Jual</th>
                  <th className="fs-12 fw-semibold text-uppercase py-2.5" style={{ minWidth: '220px' }}>
                    Kata Terlarang Terdeteksi
                  </th>
                  <th className="fs-12 fw-semibold text-uppercase text-center py-2.5">Status Moderasi</th>
                  <th className="fs-12 fw-semibold text-uppercase text-end py-2.5 pe-3">Aksi Penegakan</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-muted fs-13">
                      Tidak ada produk yang cocok dengan kriteria pencarian atau filter.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((prd) => {
                    const isFlagged = prd.status === 'FLAGGED_FOR_REVIEW';
                    const isTakedown = prd.status === 'TAKEDOWN_BY_ADMIN';
                    const isApproved = prd.status === 'APPROVED';

                    return (
                      <tr key={prd.id} className={isFlagged ? 'table-warning-subtle' : ''}>
                        {/* Product info with image */}
                        <td className="ps-3 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={prd.imageUrl}
                              alt={prd.name}
                              className="rounded-3 border flex-shrink-0"
                              style={{ width: '52px', height: '52px', objectFit: 'cover' }}
                            />
                            <div style={{ maxWidth: '300px' }}>
                              <span
                                className="fw-bold text-body fs-13 d-block text-truncate mb-1"
                                title={prd.name}
                              >
                                {prd.name}
                              </span>
                              <div className="d-flex align-items-center gap-2 text-muted fs-11">
                                <span className="badge bg-body-secondary text-secondary fw-semibold font-monospace px-1.5 py-0.5 border">
                                  {prd.sku}
                                </span>
                                <span>•</span>
                                <span>Stok: <strong className="text-body">{prd.stock}</strong></span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Store & Owner */}
                        <td className="py-3">
                          <span className="fw-semibold text-body fs-13 d-block mb-1">
                            {prd.storeName}
                          </span>
                          <span className="text-muted fs-11">
                            {prd.ownerName} ({prd.storeId})
                          </span>
                        </td>

                        {/* Category */}
                        <td className="py-3">
                          <span className="badge bg-secondary-subtle text-secondary fs-11 px-2 py-1">
                            {prd.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3">
                          <span className="fw-bold text-body fs-13 font-monospace">
                            {formatRupiah(prd.price)}
                          </span>
                        </td>

                        {/* Detected Blacklist Words */}
                        <td className="py-3">
                          {prd.detectedKeywords && prd.detectedKeywords.length > 0 ? (
                            <div>
                              <div className="d-flex flex-wrap gap-1 mb-1">
                                {prd.detectedKeywords.map((kw, i) => (
                                  <span
                                    key={i}
                                    className="badge bg-danger text-white fs-10 d-inline-flex align-items-center py-1 px-1.5"
                                  >
                                    <IconifyIcon icon="solar:shield-cross-bold" className="me-1 fs-10" />
                                    {kw}
                                  </span>
                                ))}
                              </div>
                              <span className="d-block text-danger fs-10 fw-semibold">
                                {prd.violationCategory}
                              </span>
                            </div>
                          ) : (
                            <span className="badge bg-success-subtle text-success fs-10 px-2 py-1">
                              <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
                              Bersih (Tidak Ada)
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="text-center py-3">
                          {isFlagged && (
                            <Badge bg="warning" className="text-dark border border-warning fs-11 py-1.5 px-2.5">
                              <IconifyIcon icon="solar:danger-triangle-bold" className="me-1" />
                              FLAGGED REVIEW
                            </Badge>
                          )}
                          {isTakedown && (
                            <div>
                              <Badge bg="danger" className="text-white fs-11 py-1.5 px-2.5">
                                <IconifyIcon icon="solar:close-circle-bold" className="me-1" />
                                TAKEDOWN BY ADMIN
                              </Badge>
                              <span className="d-block text-muted fs-10 mt-1">
                                Dicabut Sepihak
                              </span>
                            </div>
                          )}
                          {isApproved && (
                            <Badge bg="success-subtle" className="text-success border border-success-subtle fs-11 py-1.5 px-2.5">
                              <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
                              APPROVED & TAYANG
                            </Badge>
                          )}
                        </td>

                        {/* Action CTA */}
                        <td className="text-end py-3 pe-3">
                          <div className="d-inline-flex align-items-center gap-2">
                            {isFlagged && (
                              <Button
                                size="sm"
                                variant="outline-success"
                                className="fs-11 fw-semibold d-inline-flex align-items-center py-1 px-2.5"
                                onClick={() => handleApproveProduct(prd.id)}
                                title="Setujui produk (bila false-positive)"
                              >
                                <IconifyIcon icon="solar:check-bold" className="me-1" />
                                Loloskan
                              </Button>
                            )}
                            {!isTakedown ? (
                              <Button
                                size="sm"
                                variant="outline-danger"
                                className="fs-11 fw-semibold d-inline-flex align-items-center py-1 px-2.5"
                                onClick={() => setSelectedProductForTakedown(prd)}
                              >
                                <IconifyIcon icon="solar:shield-cross-bold" className="me-1" />
                                Takedown
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="secondary"
                                className="fs-11 fw-semibold d-inline-flex align-items-center py-1 px-2.5"
                                disabled
                              >
                                Dicabut
                              </Button>
                            )}
                          </div>
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

      {/* MODALS */}
      <ProductTakedownModal
        show={!!selectedProductForTakedown}
        onHide={() => setSelectedProductForTakedown(null)}
        product={selectedProductForTakedown}
        onConfirmTakedown={handleConfirmTakedown}
      />

      <BlacklistConfigModal
        show={showBlacklistModal}
        onHide={() => setShowBlacklistModal(false)}
      />
    </>
  );
};

export default CatalogAuditPage;
