import { useState, useRef, useEffect, useMemo } from 'react';
import { Badge, Button, Modal, Row, Col } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { initialProductLayouts } from '@/app/(admin)/themes/data';

// Helper function to return category-specific icons & colors
const getCategoryMeta = (category) => {
  switch (category) {
    case 'Grid & Sticky':
      return {
        icon: 'solar:widget-4-bold',
        badgeBg: 'primary-subtle',
        textColor: 'text-primary',
        borderColor: 'border-primary-subtle'
      };
    case 'Slider & Carousel':
      return {
        icon: 'solar:slider-vertical-bold',
        badgeBg: 'info-subtle',
        textColor: 'text-info',
        borderColor: 'border-info-subtle'
      };
    case 'Fullwidth & Editorial':
      return {
        icon: 'solar:maximize-square-bold',
        badgeBg: 'success-subtle',
        textColor: 'text-success',
        borderColor: 'border-success-subtle'
      };
    case 'Minimalist & Clean':
      return {
        icon: 'solar:sun-2-bold',
        badgeBg: 'secondary-subtle',
        textColor: 'text-secondary',
        borderColor: 'border-secondary-subtle'
      };
    case 'Luxury & Dark':
      return {
        icon: 'solar:crown-bold',
        badgeBg: 'dark',
        textColor: 'text-warning',
        borderColor: 'border-warning-subtle'
      };
    case 'Specialty & Niche':
      return {
        icon: 'solar:magic-stick-3-bold',
        badgeBg: 'warning-subtle',
        textColor: 'text-warning-emphasis',
        borderColor: 'border-warning-subtle'
      };
    case 'Reviews & Community':
      return {
        icon: 'solar:chat-round-like-bold',
        badgeBg: 'danger-subtle',
        textColor: 'text-danger',
        borderColor: 'border-danger-subtle'
      };
    case 'Editorial & Lookbook':
      return {
        icon: 'solar:camera-bold',
        badgeBg: 'indigo-subtle',
        textColor: 'text-primary',
        borderColor: 'border-primary-subtle'
      };
    default:
      return {
        icon: 'solar:box-bold',
        badgeBg: 'light',
        textColor: 'text-muted',
        borderColor: 'border'
      };
  }
};

const ProductLayoutPicker = ({ selectedLayoutName, onSelectLayout, onPreviewLayout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [showModalGallery, setShowModalGallery] = useState(false);

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Find currently active layout item
  const activeLayout = useMemo(() => {
    return (
      initialProductLayouts.find((l) => l.name === selectedLayoutName) ||
      initialProductLayouts[0]
    );
  }, [selectedLayoutName]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus search input when opening dropdown
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchTerm('');
      setSelectedCategory('ALL');
    }
  }, [isOpen]);

  // Unique categories list with item counts
  const categoriesWithCounts = useMemo(() => {
    const counts = { ALL: initialProductLayouts.length };
    initialProductLayouts.forEach((l) => {
      counts[l.category] = (counts[l.category] || 0) + 1;
    });

    const uniqueCats = Array.from(new Set(initialProductLayouts.map((l) => l.category)));
    return [{ id: 'ALL', label: 'Semua', count: counts.ALL }, ...uniqueCats.map((cat) => ({
      id: cat,
      label: cat,
      count: counts[cat] || 0
    }))];
  }, []);

  // Filtered layouts based on search and category
  const filteredLayouts = useMemo(() => {
    return initialProductLayouts.filter((layout) => {
      const term = searchTerm.toLowerCase();
      const matchSearch =
        layout.name.toLowerCase().includes(term) ||
        layout.layoutNumber.toLowerCase().includes(term) ||
        layout.styleType.toLowerCase().includes(term) ||
        layout.category.toLowerCase().includes(term) ||
        layout.description.toLowerCase().includes(term) ||
        (layout.features && layout.features.some((f) => f.toLowerCase().includes(term)));

      const matchCat = selectedCategory === 'ALL' || layout.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchTerm, selectedCategory]);

  const handleSelect = (layout) => {
    onSelectLayout(layout.name);
    setIsOpen(false);
    setShowModalGallery(false);
  };

  const handlePreview = (layout) => {
    setIsOpen(false);
    setShowModalGallery(false);
    if (onPreviewLayout) {
      onPreviewLayout(layout);
    }
  };

  const activeMeta = getCategoryMeta(activeLayout.category);

  return (
    <div className="product-layout-picker-wrapper mb-3" ref={dropdownRef}>
      {/* LABEL & BADGE HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-1.5">
        <label className="fs-12 fw-semibold text-uppercase text-muted mb-0 d-flex align-items-center gap-1.5">
          <IconifyIcon icon="solar:gallery-check-bold" className="text-primary fs-14" />
          Tata Letak Halaman Detail Produk (24 Pilihan Desain)
        </label>
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle fs-11 font-monospace">
          {activeLayout.layoutNumber} &bull; {activeLayout.name}
        </span>
      </div>

      {/* TRIGGER CARD / BUTTON */}
      <div className="position-relative">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          className="p-2.5 border rounded-3 d-flex align-items-center justify-content-between shadow-sm transition-all"
          style={{
            backgroundColor: 'var(--bs-card-bg)',
            color: 'var(--bs-body-color)',
            borderColor: isOpen ? '#4f46e5' : 'var(--bs-border-color)',
            boxShadow: isOpen
              ? '0 0 0 3px rgba(79, 70, 229, 0.15)'
              : '0 1px 3px rgba(0,0,0,0.04)',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          {/* SISI KIRI: PREVIEW LAYOUT AKTIF */}
          <div className="d-flex align-items-center gap-2.5 overflow-hidden me-2">
            <div
              className="rounded-2 d-flex flex-column align-items-center justify-content-center px-2 py-1 flex-shrink-0 shadow-sm"
              style={{
                backgroundColor: '#4f46e5',
                color: '#fff',
                minWidth: 70,
                textAlign: 'center'
              }}
            >
              <span className="fs-10 text-uppercase opacity-75 font-monospace" style={{ letterSpacing: '0.5px' }}>
                LAYOUT
              </span>
              <strong className="fs-13 fw-bold font-monospace leading-none">
                {activeLayout.layoutNumber?.replace(/[^0-9]/g, '') || '01'}
              </strong>
            </div>

            <div className="overflow-hidden" style={{ minWidth: 0 }}>
              <div className="d-flex align-items-center gap-1.5 flex-wrap">
                <span className="fw-bold text-body fs-13 text-truncate">
                  {activeLayout.name}
                </span>
                <span className={`badge bg-${activeMeta.badgeBg} ${activeMeta.textColor} ${activeMeta.borderColor} border fs-10 py-0.5 px-1.5`}>
                  {activeLayout.category}
                </span>
              </div>
              <div className="text-muted fs-11 text-truncate mt-0.5">
                <span className="text-body-secondary fw-medium">{activeLayout.styleType}</span>
              </div>
            </div>
          </div>

          {/* SISI KANAN: ACTION BUTTONS & TOGGLE */}
          <div className="d-flex align-items-center gap-2 flex-shrink-0 ms-auto">
            <Button
              type="button"
              variant="outline-secondary"
              size="sm"
              className="fs-11 py-1 px-2.5 d-none d-md-inline-flex align-items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                setShowModalGallery(true);
              }}
              title="Buka Katalog Visual 24 Layout"
            >
              <IconifyIcon icon="solar:gallery-wide-bold" className="fs-13 text-primary" />
              <span>Katalog Visual (24)</span>
            </Button>

            <div
              className="btn btn-sm py-1 px-2.5 fs-11 fw-medium d-flex align-items-center gap-1.5 rounded-2"
              style={{
                backgroundColor: isOpen ? '#4f46e5' : 'var(--bs-tertiary-bg)',
                color: isOpen ? '#ffffff' : 'var(--bs-body-color)',
                border: '1px solid var(--bs-border-color)'
              }}
            >
              <span>Pilih Layout</span>
              <IconifyIcon
                icon="solar:alt-arrow-down-linear"
                className="fs-14"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease'
                }}
              />
            </div>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* DROPDOWN MENU POPOVER (MODERN ENTERPRISE FLOATING PANEL) */}
        {/* ==================================================================== */}
        {isOpen && (
          <div
            className="position-absolute start-0 w-100 mt-2 rounded-3 shadow-lg border"
            style={{
              top: '100%',
              zIndex: 1020,
              backgroundColor: 'var(--bs-card-bg)',
              color: 'var(--bs-body-color)',
              borderColor: 'var(--bs-border-color)',
              boxShadow: '0 18px 42px rgba(0, 0, 0, 0.18)',
              padding: '18px'
            }}
          >
            {/* SEARCH INPUT BAR */}
            <div className="position-relative mb-3">
              <IconifyIcon
                icon="solar:magnifer-linear"
                className="position-absolute top-50 translate-middle-y text-muted fs-16"
                style={{ left: '14px', pointerEvents: 'none' }}
              />
              <input
                ref={searchInputRef}
                type="text"
                className="form-control fs-12"
                placeholder="Cari dari 24 layout produk (misal: sticky, 360, slider, minimalist, oled, video)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: '40px',
                  paddingRight: '38px',
                  paddingTop: '9px',
                  paddingBottom: '9px',
                  borderRadius: 8,
                  borderColor: 'var(--bs-border-color)',
                  backgroundColor: 'var(--bs-body-bg)'
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y p-0 me-2.5 text-muted border-0"
                  onClick={() => setSearchTerm('')}
                >
                  <IconifyIcon icon="solar:close-circle-bold" className="fs-16" />
                </button>
              )}
            </div>

            {/* CATEGORY FILTER PILLS */}
            <div className="mb-3 pb-3 border-bottom">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-muted fs-11 fw-semibold text-uppercase" style={{ letterSpacing: '0.4px' }}>
                  Filter Kategori:
                </span>
                <span className="text-muted fs-11">
                  {selectedCategory === 'ALL' ? 'Menampilkan semua kategori' : selectedCategory}
                </span>
              </div>
              <div
                className="d-flex align-items-center flex-wrap"
                style={{ gap: '8px 8px' }}
              >
                {categoriesWithCounts.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`btn btn-sm rounded-pill fs-11 fw-medium transition-all ${
                        isActive
                          ? 'btn-primary text-white border-primary shadow-xs'
                          : 'btn-light text-body border'
                      }`}
                      style={{
                        padding: '4px 12px',
                        lineHeight: '1.4',
                        borderColor: isActive ? 'transparent' : 'var(--bs-border-color)'
                      }}
                    >
                      {cat.label} <span className="opacity-75 ms-0.5">({cat.count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LIST OF 24 LAYOUTS */}
            <div
              className="layout-items-list pe-1 pt-1"
              style={{
                maxHeight: '340px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              {filteredLayouts.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <IconifyIcon icon="solar:sad-circle-linear" className="fs-32 mb-1 opacity-50" />
                  <p className="fs-12 mb-1">Tidak ada layout yang sesuai kata kunci "{searchTerm}"</p>
                  <Button
                    variant="link"
                    size="sm"
                    className="fs-11 p-0"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('ALL');
                    }}
                  >
                    Reset Pencarian
                  </Button>
                </div>
              ) : (
                filteredLayouts.map((layout) => {
                  const isSelected = layout.name === selectedLayoutName;
                  const catMeta = getCategoryMeta(layout.category);

                  return (
                    <div
                      key={layout.id}
                      onClick={() => handleSelect(layout)}
                      className={`rounded-3 border d-flex align-items-start justify-content-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary-subtle bg-opacity-25 shadow-sm'
                          : 'bg-light-subtle hover-bg'
                      }`}
                      style={{
                        cursor: 'pointer',
                        borderColor: isSelected ? '#4f46e5' : 'var(--bs-border-color)',
                        padding: '14px 16px'
                      }}
                    >
                      {/* LEFT: INFO */}
                      <div className="d-flex align-items-start gap-3 overflow-hidden me-2">
                        <div
                          className={`rounded-2 px-2.5 py-1.5 fw-bold font-monospace fs-11 flex-shrink-0 text-center ${
                            isSelected ? 'bg-primary text-white shadow-xs' : 'bg-secondary-subtle text-body'
                          }`}
                          style={{ minWidth: 68 }}
                        >
                          {layout.layoutNumber}
                        </div>

                        <div className="overflow-hidden">
                          <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                            <strong className="fs-13 text-body">{layout.name}</strong>
                            <span className={`badge bg-${catMeta.badgeBg} ${catMeta.textColor} ${catMeta.borderColor} border fs-10 py-0.5 px-1.5`}>
                              {layout.category}
                            </span>
                            {isSelected && (
                              <span className="badge bg-success text-white fs-10 py-0.5 px-2 d-flex align-items-center gap-1">
                                <IconifyIcon icon="solar:check-circle-bold" className="fs-11" />
                                Aktif
                              </span>
                            )}
                          </div>
                          <div className="text-body-secondary fs-11 fw-medium mb-1 text-truncate">
                            {layout.styleType}
                          </div>
                          <p className="text-muted fs-11 mb-2 line-clamp-1">
                            {layout.description}
                          </p>

                          {/* MICRO FEATURE TAGS */}
                          <div className="d-flex gap-1.5 flex-wrap">
                            {layout.features?.slice(0, 3).map((feat, fIdx) => (
                              <span key={fIdx} className="badge bg-white text-muted border fs-10 py-1 px-1.5 shadow-2xs">
                                &bull; {feat}
                              </span>
                            ))}
                            {layout.features?.length > 3 && (
                              <span className="text-muted fs-10 align-self-center">+{layout.features.length - 3} lainnya</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* RIGHT: SELECT / PREVIEW BUTTONS */}
                      <div className="d-flex align-items-center gap-2 flex-shrink-0 ms-2">
                        {onPreviewLayout && (
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="py-1 px-2.5 fs-11 d-flex align-items-center gap-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePreview(layout);
                            }}
                            title="Pratinjau Langsung"
                          >
                            <IconifyIcon icon="solar:eye-bold" className="fs-12" />
                            <span className="d-none d-sm-inline">Demo</span>
                          </Button>
                        )}
                        <Button
                          variant={isSelected ? 'primary' : 'outline-primary'}
                          size="sm"
                          className="py-1 px-3 fs-11 fw-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelect(layout);
                          }}
                        >
                          {isSelected ? 'Terpilih' : 'Gunakan'}
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* DROPDOWN FOOTER BAR */}
            <div className="d-flex justify-content-between align-items-center pt-2.5 mt-2 border-top">
              <span className="text-muted fs-11">
                Menampilkan <strong>{filteredLayouts.length}</strong> dari 24 layout produk
              </span>
              <Button
                variant="link"
                size="sm"
                className="p-0 fs-11 text-primary fw-semibold text-decoration-none d-flex align-items-center gap-1"
                onClick={() => {
                  setIsOpen(false);
                  setShowModalGallery(true);
                }}
              >
                <IconifyIcon icon="solar:gallery-wide-bold" className="fs-13" />
                Buka Katalog Visual Lengkap (Grid 24) &rarr;
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* HIGHLIGHT KARTU PREVIEW LAYOUT PRODUK TERPILIH */}
      {/* ==================================================================== */}
      <div className="p-3 border rounded-3 bg-light-subtle mt-2.5 shadow-sm">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <strong className="fs-14 text-body">{activeLayout.name}</strong>
              <span className="badge bg-primary text-white fs-11 font-monospace">
                {activeLayout.layoutNumber}
              </span>
              <span className={`badge bg-${activeMeta.badgeBg} ${activeMeta.textColor} ${activeMeta.borderColor} border fs-10`}>
                {activeLayout.category}
              </span>
            </div>
            <div className="text-body-secondary fs-12 fw-medium mb-1">
              Gaya: {activeLayout.styleType}
            </div>
            <p className="text-muted fs-11 mb-2">
              {activeLayout.description}
            </p>
          </div>

          <div className="d-flex gap-1.5 flex-shrink-0 ms-2">
            {onPreviewLayout && (
              <Button
                variant="outline-primary"
                size="sm"
                className="fs-11 py-1 px-2.5 d-flex align-items-center gap-1"
                onClick={() => handlePreview(activeLayout)}
              >
                <IconifyIcon icon="solar:eye-bold" className="fs-13" />
                Pratinjau Layout Ini
              </Button>
            )}
            <Button
              variant="light"
              size="sm"
              className="fs-11 py-1 px-2 border d-flex align-items-center gap-1"
              onClick={() => setShowModalGallery(true)}
              title="Lihat Galeri 24 Layout"
            >
              <IconifyIcon icon="solar:gallery-wide-bold" className="fs-13 text-muted" />
            </Button>
          </div>
        </div>

        {/* FITUR UNGGULAN DARI LAYOUT TERPILIH */}
        <div className="d-flex gap-1 flex-wrap pt-2 border-top">
          <span className="text-muted fs-11 me-1 align-self-center">Fitur bawaan:</span>
          {activeLayout.features?.map((feat, idx) => (
            <span key={idx} className="badge bg-white text-body border fs-11 py-1 px-2 shadow-2xs">
              &bull; {feat}
            </span>
          ))}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MODAL KATALOG VISUAL LENGKAP (24 LAYOUTS RESPONSIVE GRID) */}
      {/* ==================================================================== */}
      <Modal
        show={showModalGallery}
        onHide={() => setShowModalGallery(false)}
        size="xl"
        scrollable
        centered
      >
        <Modal.Header closeButton className="border-bottom py-3">
          <Modal.Title className="fs-16 fw-bold d-flex align-items-center gap-2">
            <IconifyIcon icon="solar:gallery-wide-bold" className="text-primary fs-20" />
            <span>Katalog 24 Desain Tata Letak Halaman Produk</span>
            <Badge bg="primary-subtle" className="text-primary border border-primary-subtle fs-11">
              Modular Theme Engine
            </Badge>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4" style={{ backgroundColor: 'var(--bs-tertiary-bg)' }}>
          {/* SEARCH & CATEGORY BAR DI DALAM MODAL */}
          <div className="p-3 bg-card rounded-3 border shadow-sm mb-4" style={{ backgroundColor: 'var(--bs-card-bg)' }}>
            <Row className="g-3 align-items-center">
              <Col lg={5}>
                <div className="position-relative">
                  <IconifyIcon
                    icon="solar:magnifer-linear"
                    className="position-absolute top-50 translate-middle-y text-muted fs-16"
                    style={{ left: '14px', pointerEvents: 'none' }}
                  />
                  <input
                    type="text"
                    className="form-control fs-12"
                    placeholder="Cari nama, fitur, atau spesifikasi layout..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      paddingLeft: '40px',
                      paddingRight: '14px',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                      borderRadius: 8
                    }}
                  />
                </div>
              </Col>
              <Col lg={7}>
                <div className="d-flex flex-wrap justify-content-lg-end" style={{ gap: '8px 8px' }}>
                  {categoriesWithCounts.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`btn btn-sm rounded-pill fs-11 fw-medium transition-all ${
                        selectedCategory === cat.id
                          ? 'btn-primary text-white shadow-xs'
                          : 'btn-light text-body border'
                      }`}
                      style={{
                        padding: '4px 12px',
                        borderColor: selectedCategory === cat.id ? 'transparent' : 'var(--bs-border-color)'
                      }}
                    >
                      {cat.label} ({cat.count})
                    </button>
                  ))}
                </div>
              </Col>
            </Row>
          </div>

          {/* GRID 24 LAYOUT CARDS */}
          <Row className="g-3">
            {filteredLayouts.map((layout) => {
              const isSelected = layout.name === selectedLayoutName;
              const catMeta = getCategoryMeta(layout.category);

              return (
                <Col md={6} lg={4} key={layout.id}>
                  <div
                    className={`card h-100 border transition-all ${
                      isSelected ? 'border-primary shadow' : 'shadow-sm'
                    }`}
                    style={{
                      borderColor: isSelected ? '#4f46e5' : 'var(--bs-border-color)',
                      backgroundColor: 'var(--bs-card-bg)'
                    }}
                  >
                    {/* CARD HEADER */}
                    <div className="card-header bg-transparent border-bottom py-2.5 px-3 d-flex justify-content-between align-items-center">
                      <span className={`badge ${isSelected ? 'bg-primary text-white' : 'bg-dark text-white'} font-monospace fs-11`}>
                        {layout.layoutNumber}
                      </span>
                      <span className={`badge bg-${catMeta.badgeBg} ${catMeta.textColor} ${catMeta.borderColor} border fs-10`}>
                        {layout.category}
                      </span>
                    </div>

                    {/* CARD BODY */}
                    <div className="card-body p-3 d-flex flex-column justify-content-between">
                      <div>
                        <h6 className="fs-13 fw-bold text-body mb-1">{layout.name}</h6>
                        <div className="text-body-secondary fs-11 fw-medium mb-2">
                          {layout.styleType}
                        </div>
                        <p className="text-muted fs-11 mb-3" style={{ minHeight: 45 }}>
                          {layout.description}
                        </p>

                        <div className="mb-3">
                          <small className="text-muted fs-10 fw-semibold text-uppercase d-block mb-1">
                            Fitur Utama:
                          </small>
                          <div className="d-flex gap-1 flex-wrap">
                            {layout.features?.map((feat, fIdx) => (
                              <span key={fIdx} className="badge bg-light text-body border fs-10 py-0.5">
                                &bull; {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CARD FOOTER ACTIONS */}
                      <div className="pt-2 border-top d-flex gap-2">
                        {onPreviewLayout && (
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="fs-11 py-1 px-2.5 flex-fill d-flex align-items-center justify-content-center gap-1"
                            onClick={() => handlePreview(layout)}
                          >
                            <IconifyIcon icon="solar:eye-bold" className="fs-12" />
                            <span>Demo</span>
                          </Button>
                        )}
                        <Button
                          variant={isSelected ? 'success' : 'primary'}
                          size="sm"
                          className="fs-11 py-1 px-2.5 flex-fill d-flex align-items-center justify-content-center gap-1 fw-semibold"
                          onClick={() => handleSelect(layout)}
                        >
                          {isSelected ? (
                            <>
                              <IconifyIcon icon="solar:check-circle-bold" className="fs-13" />
                              <span>Sedang Digunakan</span>
                            </>
                          ) : (
                            <span>Gunakan Layout Ini</span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Modal.Body>

        <Modal.Footer className="border-top py-2.5 px-3 d-flex justify-content-between">
          <small className="text-muted fs-11">
            Klik <strong>"Gunakan Layout Ini"</strong> untuk menerapkan tata letak ke konfigurasi toko merchant.
          </small>
          <Button variant="secondary" size="sm" onClick={() => setShowModalGallery(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductLayoutPicker;
