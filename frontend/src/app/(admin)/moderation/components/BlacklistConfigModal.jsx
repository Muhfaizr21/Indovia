// src/app/(admin)/moderation/components/BlacklistConfigModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Badge, Row, Col, Alert, InputGroup } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { blacklistDictionary } from '../data';

const BlacklistConfigModal = ({ show, onHide, onSaveDictionary }) => {
  const [categories, setCategories] = useState(blacklistDictionary);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  const [newKeyword, setNewKeyword] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [autoAction, setAutoAction] = useState('FLAG_FOR_REVIEW'); // 'FLAG_FOR_REVIEW' | 'AUTO_TAKEDOWN'
  const [successAlert, setSuccessAlert] = useState(false);

  const currentCategory = categories[selectedCategoryIdx];

  const handleAddKeyword = (e) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    const cleanWord = newKeyword.trim().toLowerCase();

    setCategories((prev) =>
      prev.map((cat, idx) => {
        if (idx === selectedCategoryIdx) {
          if (cat.keywords.includes(cleanWord)) return cat;
          return {
            ...cat,
            keywords: [...cat.keywords, cleanWord],
          };
        }
        return cat;
      })
    );
    setNewKeyword('');
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setCategories((prev) =>
      prev.map((cat, idx) => {
        if (idx === selectedCategoryIdx) {
          return {
            ...cat,
            keywords: cat.keywords.filter((k) => k !== keywordToRemove),
          };
        }
        return cat;
      })
    );
  };

  const handleSave = () => {
    if (onSaveDictionary) {
      onSaveDictionary(categories);
    }
    setSuccessAlert(true);
    setTimeout(() => {
      setSuccessAlert(false);
      onHide();
    }, 1000);
  };

  const filteredKeywords = currentCategory.keywords.filter((k) =>
    k.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-secondary-subtle">
        <div className="d-flex align-items-center gap-2">
          <div className="avatar-sm bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center">
            <IconifyIcon icon="solar:shield-warning-bold-duotone" className="fs-22" />
          </div>
          <div>
            <Modal.Title className="fs-16 fw-bold mb-0 text-body">
              Kamus Kata Terlarang (Automated Blacklist Word Filter)
            </Modal.Title>
            <span className="text-muted fs-12">
              Pengaturan filter otomatis pencarian barang terlarang, narkotika, senjata, obat tanpa resep, barang palsu & pornografi
            </span>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-4">
        {successAlert && (
          <Alert variant="success" className="d-flex align-items-center gap-2 mb-3">
            <IconifyIcon icon="solar:check-circle-bold" className="fs-18 text-success" />
            <div>
              <strong>Kamus Berhasil Disimpan!</strong> Mesin audit otomatis Indovia akan memindai katalog menggunakan pembaruan kata kunci ini.
            </div>
          </Alert>
        )}

        {/* CATEGORY NAV BUTTONS */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {categories.map((cat, idx) => (
            <Button
              key={cat.category}
              variant={selectedCategoryIdx === idx ? 'primary' : 'outline-secondary'}
              size="sm"
              onClick={() => {
                setSelectedCategoryIdx(idx);
                setSearchFilter('');
              }}
              className="fs-12 fw-semibold d-flex align-items-center gap-1.5"
            >
              <span>{cat.category}</span>
              <Badge
                bg={selectedCategoryIdx === idx ? 'light' : 'secondary-subtle'}
                className={selectedCategoryIdx === idx ? 'text-primary ms-1' : 'text-body ms-1'}
              >
                {cat.keywords.length}
              </Badge>
            </Button>
          ))}
        </div>

        {/* ACTIVE CATEGORY DETAIL & DESCRIPTION */}
        <div className="p-3 bg-body-tertiary rounded border border-secondary-subtle mb-3">
          <div className="d-flex align-items-center justify-content-between mb-1">
            <h6 className="fw-bold mb-0 text-body fs-13">{currentCategory.category}</h6>
            <Badge
              bg={
                currentCategory.severity === 'CRITICAL'
                  ? 'danger'
                  : currentCategory.severity === 'HIGH'
                  ? 'warning'
                  : 'info'
              }
              className="text-uppercase fs-10"
            >
              Severity: {currentCategory.severity}
            </Badge>
          </div>
          <p className="text-muted fs-12 mb-0">{currentCategory.description}</p>
        </div>

        {/* ADD NEW KEYWORD & SEARCH */}
        <Row className="g-2 mb-3">
          <Col md={7}>
            <Form onSubmit={handleAddKeyword}>
              <InputGroup size="sm">
                <Form.Control
                  placeholder={`Tambah kata terlarang ke ${currentCategory.category}...`}
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="border-secondary-subtle"
                />
                <Button variant="success" type="submit" className="fw-semibold">
                  <IconifyIcon icon="solar:add-circle-bold" className="me-1" />
                  Tambah Kata
                </Button>
              </InputGroup>
            </Form>
          </Col>
          <Col md={5}>
            <InputGroup size="sm">
              <InputGroup.Text className="bg-body border-secondary-subtle">
                <IconifyIcon icon="solar:magnifer-linear" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Cari kata dalam kategori..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="border-secondary-subtle"
              />
            </InputGroup>
          </Col>
        </Row>

        {/* KEYWORDS TAGS CONTAINER */}
        <div className="p-3 bg-body rounded border border-secondary-subtle mb-3" style={{ minHeight: '130px', maxHeight: '200px', overflowY: 'auto' }}>
          <div className="d-flex flex-wrap gap-2">
            {filteredKeywords.length === 0 ? (
              <span className="text-muted fs-12 italic">Tidak ada kata kunci yang cocok dengan pencarian.</span>
            ) : (
              filteredKeywords.map((word) => (
                <span
                  key={word}
                  className="badge bg-danger-subtle text-danger border border-danger-subtle fs-12 d-inline-flex align-items-center py-1 px-2.5"
                >
                  <IconifyIcon icon="solar:shield-cross-bold" className="me-1 fs-12" />
                  {word}
                  <button
                    type="button"
                    className="btn-close btn-close-white ms-2"
                    style={{ fontSize: '8px', cursor: 'pointer' }}
                    onClick={() => handleRemoveKeyword(word)}
                    aria-label="Hapus kata"
                  />
                </span>
              ))
            )}
          </div>
        </div>

        {/* AUTOMATION ACTION SENSITIVITY */}
        <div className="p-3 bg-warning-subtle rounded border border-warning-subtle">
          <Form.Label className="fs-12 fw-bold text-body mb-1 d-flex align-items-center">
            <IconifyIcon icon="solar:bolt-bold" className="text-warning me-2 fs-16" />
            Aksi Otomatis Saat Kata Terlarang Terdeteksi di Judul/Deskripsi:
          </Form.Label>
          <div className="d-flex flex-column gap-2 mt-2">
            <Form.Check
              type="radio"
              id="action-flag"
              name="autoAction"
              label={
                <div>
                  <strong className="text-body fs-12">FLAGGED_FOR_REVIEW (Rekomendasi)</strong>
                  <div className="text-muted fs-11">
                    Produk masuk ke antrean investigasi Superadmin tanpa langsung mencabut produk agar terhindar dari false-positive.
                  </div>
                </div>
              }
              checked={autoAction === 'FLAG_FOR_REVIEW'}
              onChange={() => setAutoAction('FLAG_FOR_REVIEW')}
            />
            <Form.Check
              type="radio"
              id="action-takedown"
              name="autoAction"
              label={
                <div>
                  <strong className="text-body fs-12">AUTO_TAKEDOWN_AND_STRIKE (Strict Compliance)</strong>
                  <div className="text-muted fs-11">
                    Langsung mencabut produk secara instan dan memberikan +1 Strike ke akun toko saat kata terlarang terdeteksi.
                  </div>
                </div>
              }
              checked={autoAction === 'AUTO_TAKEDOWN'}
              onChange={() => setAutoAction('AUTO_TAKEDOWN')}
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-secondary-subtle">
        <Button variant="outline-secondary" onClick={onHide}>
          Tutup
        </Button>
        <Button variant="primary" onClick={handleSave} className="fw-semibold">
          <IconifyIcon icon="solar:diskette-bold" className="me-1" />
          Simpan Pembaruan Kamus
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlacklistConfigModal;
