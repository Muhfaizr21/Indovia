import { Link } from 'react-router-dom';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="mobile-header-active mobile-header-wrapper-style d-block position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: 99999 }}>
      {/* Backdrop */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div
        className="mobile-header-wrapper-inner position-relative bg-white h-100 p-4 overflow-y-auto"
        style={{ maxWidth: '340px', zIndex: 2, boxShadow: '0 0 25px rgba(0,0,0,0.2)' }}
      >
        <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
          <img src="/assets/imgs/template/logo.svg" alt="Larkon Store" style={{ height: '32px' }} />
          <button
            type="button"
            className="btn btn-sm btn-light rounded-circle p-1 d-flex align-items-center justify-content-center"
            onClick={onClose}
            style={{ width: 32, height: 32 }}
          >
            <IconifyIcon icon="solar:close-circle-bold" className="fs-20" />
          </button>
        </div>

        {/* Admin Quick Link in Mobile */}
        <div className="p-3 mb-4 rounded-3 bg-primary-subtle border border-primary-subtle">
          <h6 className="fw-bold text-primary mb-1 d-flex align-items-center gap-1">
            <IconifyIcon icon="solar:widget-5-bold" />
            <span>Admin Management</span>
          </h6>
          <p className="small text-muted mb-2">Buka dashboard admin untuk mengelola produk & penjualan.</p>
          <Link
            to="/dashboard"
            onClick={onClose}
            className="btn btn-sm btn-primary w-100 fw-semibold"
          >
            Buka Dashboard Admin →
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="mb-4">
          <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
            <li>
              <a href="#" onClick={onClose} className="fw-semibold text-dark text-decoration-none">
                Beranda
              </a>
            </li>
            <li>
              <a href="#collections" onClick={onClose} className="fw-semibold text-dark text-decoration-none">
                Koleksi Kategori
              </a>
            </li>
            <li>
              <a href="#products" onClick={onClose} className="fw-semibold text-dark text-decoration-none">
                Produk Unggulan
              </a>
            </li>
            <li>
              <a href="#sale" onClick={onClose} className="fw-semibold text-dark text-decoration-none">
                Promo & Diskon
              </a>
            </li>
            <li>
              <a href="#testimonials" onClick={onClose} className="fw-semibold text-dark text-decoration-none">
                Ulasan Pembeli
              </a>
            </li>
            <li>
              <a href="#newsletter" onClick={onClose} className="fw-semibold text-dark text-decoration-none">
                Kontak & Langganan
              </a>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="pt-3 border-top d-flex flex-column gap-2">
          <Link
            to="/auth/sign-in"
            onClick={onClose}
            className="btn btn-outline-dark w-100 fw-medium"
          >
            Masuk ke Akun
          </Link>
          <Link
            to="/auth/sign-up"
            onClick={onClose}
            className="btn btn-dark w-100 fw-medium"
          >
            Daftar Akun Baru
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
