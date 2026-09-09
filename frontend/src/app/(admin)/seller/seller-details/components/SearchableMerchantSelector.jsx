import { useState, useRef, useEffect } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Link } from 'react-router-dom';

const SearchableMerchantSelector = ({ merchants, selectedMerchant, onSelectMerchant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlanFilter, setSelectedPlanFilter] = useState('all');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 60);
    } else {
      setSearchTerm('');
      setSelectedPlanFilter('all');
    }
  }, [isOpen]);

  // Filter merchants based on search term and plan
  const filtered = (merchants || []).filter((m) => {
    const term = searchTerm.toLowerCase();
    const matchSearch =
      m.name?.toLowerCase().includes(term) ||
      m.code?.toLowerCase().includes(term) ||
      m.subdomain?.toLowerCase().includes(term) ||
      m.city?.toLowerCase().includes(term) ||
      m.category?.toLowerCase().includes(term) ||
      m.owner_name?.toLowerCase().includes(term);

    const matchPlan = selectedPlanFilter === 'all' || m.plan === selectedPlanFilter;
    return matchSearch && matchPlan;
  });

  const getPlanBadgeStyle = (plan) => {
    switch (plan) {
      case 'Enterprise':
        return { backgroundColor: '#fff7ed', color: '#ea580c', border: '1px solid #ffedd5' };
      case 'Pro':
        return { backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #dbeafe' };
      default:
        return { backgroundColor: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0' };
    }
  };

  return (
    <div className="position-relative d-inline-block" ref={dropdownRef}>
      {/* TRIGGER BUTTON (CLEAN & SPACIOUS ENTERPRISE DESIGN) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="btn border d-flex align-items-center justify-content-between px-2.5 py-1 rounded-2 shadow-sm text-start"
        style={{
          minWidth: 280,
          maxWidth: 380,
          backgroundColor: 'var(--bs-card-bg)',
          color: 'var(--bs-body-color)',
          borderColor: isOpen ? '#ff6c2f' : 'var(--bs-border-color)',
          boxShadow: isOpen ? '0 0 0 3px rgba(255, 108, 47, 0.15)' : '0 1px 2px rgba(0,0,0,0.05)',
          transition: 'all 0.15s ease-in-out'
        }}
      >
        <div className="d-flex align-items-center gap-2 overflow-hidden me-2">
          <img
            src={selectedMerchant?.avatar}
            alt={selectedMerchant?.name}
            className="rounded border flex-shrink-0"
            style={{ width: 28, height: 28, objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${selectedMerchant?.subdomain || 'store'}`;
            }}
          />
          <div className="overflow-hidden" style={{ minWidth: 0 }}>
            <div className="d-flex align-items-center gap-1.5">
              <span className="fw-bold text-body fs-12 text-truncate" style={{ maxWidth: 170 }}>
                {selectedMerchant?.name || 'Pilih Toko...'}
              </span>
              <span
                className="badge px-1.5 py-0.2 rounded fs-9 fw-semibold text-uppercase flex-shrink-0"
                style={getPlanBadgeStyle(selectedMerchant?.plan)}
              >
                {selectedMerchant?.plan || 'Plan'}
              </span>
            </div>
            <div className="text-muted fs-10 text-truncate">
              <span>{selectedMerchant?.subdomain}.indovia.com</span> &bull; <span>{selectedMerchant?.city}</span>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center text-muted ps-2 flex-shrink-0 border-start ms-auto">
          <IconifyIcon
            icon="solar:alt-arrow-down-linear"
            className="fs-16"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease',
              color: isOpen ? '#ff6c2f' : '#64748b'
            }}
          />
        </div>
      </button>

      {/* DROPDOWN POPOVER MENU */}
      {isOpen && (
        <div
          className="position-absolute top-100 start-0 mt-2 rounded-3 shadow-lg border p-2.5"
          style={{
            width: 420,
            maxWidth: '95vw',
            zIndex: 1060,
            backgroundColor: 'var(--bs-card-bg)',
            color: 'var(--bs-body-color)'
          }}
        >
          {/* SEARCH INPUT BAR */}
          <div className="position-relative mb-2">
            <IconifyIcon
              icon="solar:magnifer-linear"
              className="position-absolute top-50 start-0 translate-middle-y ms-2.5 text-muted fs-15"
            />
            <input
              ref={searchInputRef}
              type="text"
              className="form-control form-control-sm ps-4 pe-4 fs-12 border"
              placeholder="Cari toko berdasarkan nama, kota, kode, atau pemilik..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderColor: 'var(--bs-border-color)', borderRadius: 6 }}
            />
            {searchTerm && (
              <button
                type="button"
                className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y p-0 me-2 text-muted border-0"
                onClick={() => setSearchTerm('')}
              >
                <IconifyIcon icon="solar:close-circle-bold" className="fs-15" />
              </button>
            )}
          </div>

          {/* QUICK FILTER PILLS */}
          <div className="d-flex align-items-center gap-1 mb-2 pb-2 border-bottom">
            <span className="text-muted fs-10 fw-medium me-1">Filter:</span>
            {['all', 'Enterprise', 'Pro', 'Starter'].map((plan) => (
              <button
                key={plan}
                type="button"
                onClick={() => setSelectedPlanFilter(plan)}
                className={`btn btn-sm py-0.5 px-2 rounded-pill fs-10 fw-semibold ${
                  selectedPlanFilter === plan
                    ? 'btn-dark text-white'
                    : 'btn-light text-secondary border'
                }`}
              >
                {plan === 'all' ? 'Semua' : plan}
              </button>
            ))}
          </div>

          {/* LIST OF MERCHANTS */}
          <div
            className="overflow-y-auto pe-1"
            style={{ maxHeight: 260, scrollbarWidth: 'thin' }}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-4 text-muted">
                <IconifyIcon icon="solar:shop-bold-duotone" className="fs-28 mb-1 text-muted opacity-50" />
                <p className="fs-12 mb-0">Tidak ada toko yang cocok dengan pencarian</p>
                <small className="text-muted fs-11">&quot;{searchTerm}&quot;</small>
              </div>
            ) : (
              filtered.map((m) => {
                const isSelected = m.id === selectedMerchant?.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => {
                      onSelectMerchant(m.id);
                      setIsOpen(false);
                    }}
                    className="d-flex align-items-center justify-content-between p-2 rounded-2 mb-1 cursor-pointer transition-all"
                    style={{
                      backgroundColor: isSelected ? 'rgba(255, 108, 47, 0.15)' : 'transparent',
                      border: isSelected ? '1px solid rgba(255, 108, 47, 0.3)' : '1px solid transparent',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--bs-tertiary-bg)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div className="d-flex align-items-center gap-2.5 overflow-hidden me-2">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="rounded border flex-shrink-0"
                        style={{ width: 36, height: 36, objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${m.subdomain}`;
                        }}
                      />
                      <div className="overflow-hidden" style={{ minWidth: 0 }}>
                        <div className="d-flex align-items-center gap-1.5">
                          <strong className="text-body fs-12 text-truncate d-block">
                            {m.name}
                          </strong>
                          <span
                            className="px-1.5 py-0.2 rounded fs-9 fw-semibold text-muted font-monospace flex-shrink-0"
                            style={{ backgroundColor: 'var(--bs-tertiary-bg)' }}
                          >
                            {m.code}
                          </span>
                        </div>
                        <div className="text-muted fs-11 text-truncate mt-0.5">
                          <span>{m.category}</span> &bull; <span>{m.city}</span>
                        </div>
                        <div className="text-primary fs-10 font-monospace text-truncate">
                          {m.subdomain}.indovia.com
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-column align-items-end flex-shrink-0 gap-1 ps-2">
                      <span
                        className="badge px-1.5 py-0.5 rounded fs-9 fw-semibold text-uppercase"
                        style={getPlanBadgeStyle(m.plan)}
                      >
                        {m.plan}
                      </span>

                      {isSelected ? (
                        <span className="text-success fs-14 d-flex align-items-center" title="Toko Aktif">
                          <IconifyIcon icon="solar:check-circle-bold" />
                        </span>
                      ) : (
                        <span
                          className={`badge fs-9 px-1.5 py-0.5 ${
                            m.status === 'active'
                              ? 'bg-success-subtle text-success'
                              : m.status === 'trial'
                              ? 'bg-warning-subtle text-warning'
                              : 'bg-secondary-subtle text-secondary'
                          }`}
                        >
                          {m.status === 'active' ? 'Aktif' : m.status === 'trial' ? 'Trial' : 'Suspend'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* FOOTER BAR WITH DIRECT SHORTCUTS */}
          <div className="border-top pt-2 mt-1 px-1 d-flex align-items-center justify-content-between">
            <span className="text-muted fs-11">
              Total <strong>{merchants.length}</strong> toko terdaftar
            </span>
            <div className="d-flex gap-2">
              <Link
                to="/seller/seller-list"
                className="text-primary fs-11 text-decoration-none fw-medium"
                onClick={() => setIsOpen(false)}
              >
                Lihat Semua di Tabel &raquo;
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableMerchantSelector;
