import { useState, useEffect, useRef } from 'react';
import { Modal, Button, Badge, Spinner } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { formatRupiah } from '../data';

const ThemePreviewModal = ({ show, onHide, theme }) => {
  const [viewport, setViewport] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [iframeLoading, setIframeLoading] = useState(true);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (show) {
      setIframeLoading(true);
    }
  }, [show, theme?.id, theme?.demoPath]);

  if (!theme) return null;

  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return '390px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  const handleReload = () => {
    if (iframeRef.current) {
      setIframeLoading(true);
      iframeRef.current.src = theme.demoPath;
    }
  };

  return (
    <Modal show={show} onHide={onHide} fullscreen centered backdrop="static" className="theme-preview-modal">
      <Modal.Header className="bg-dark text-white py-2 px-3 border-secondary border-opacity-50">
        <div className="d-flex align-items-center justify-content-between w-100 flex-wrap gap-2">
          {/* Theme Title & Meta */}
          <div className="d-flex align-items-center gap-3">
            <span className="badge bg-primary text-white font-monospace fs-12 px-2.5 py-1.5 shadow-sm">
              {theme.demoNumber}
            </span>
            <div>
              <h5 className="mb-0 fs-14 fw-bold text-white d-flex align-items-center gap-2">
                {theme.name}
                <Badge bg="secondary" className="fs-10 font-monospace">
                  {theme.version}
                </Badge>
              </h5>
              <div className="text-white-50 fs-11 d-flex align-items-center gap-2 mt-0.5">
                <span className="text-light">{theme.category}</span>
                <span>•</span>
                <span className={theme.status === 'PREMIUM' ? 'text-warning fw-semibold' : 'text-success fw-semibold'}>
                  {formatRupiah(theme.price)}
                </span>
                <span>•</span>
                <span>{theme.activeMerchantsCount} Toko Menggunakan</span>
              </div>
            </div>
          </div>

          {/* Viewport Switcher Controls */}
          <div className="d-flex align-items-center bg-black bg-opacity-60 p-1 rounded-3 border border-secondary border-opacity-50 gap-1 shadow-sm">
            <Button
              size="sm"
              variant={viewport === 'desktop' ? 'primary' : 'link'}
              className={`text-decoration-none px-2.5 py-1 fs-12 ${viewport === 'desktop' ? 'text-white fw-semibold' : 'text-white-50'}`}
              onClick={() => setViewport('desktop')}
              title="Tampilan Desktop (Full Width)"
            >
              <IconifyIcon icon="solar:laptop-bold" className="me-1 fs-14" />
              Desktop
            </Button>
            <Button
              size="sm"
              variant={viewport === 'tablet' ? 'primary' : 'link'}
              className={`text-decoration-none px-2.5 py-1 fs-12 ${viewport === 'tablet' ? 'text-white fw-semibold' : 'text-white-50'}`}
              onClick={() => setViewport('tablet')}
              title="Tampilan Tablet (768px)"
            >
              <IconifyIcon icon="solar:tablet-bold" className="me-1 fs-14" />
              Tablet
            </Button>
            <Button
              size="sm"
              variant={viewport === 'mobile' ? 'primary' : 'link'}
              className={`text-decoration-none px-2.5 py-1 fs-12 ${viewport === 'mobile' ? 'text-white fw-semibold' : 'text-white-50'}`}
              onClick={() => setViewport('mobile')}
              title="Tampilan Smartphone (390px)"
            >
              <IconifyIcon icon="solar:smartphone-bold" className="me-1 fs-14" />
              Mobile
            </Button>
          </div>

          {/* Action buttons */}
          <div className="d-flex align-items-center gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              className="text-white border-secondary d-inline-flex align-items-center fs-12 px-2.5 py-1.5"
              onClick={handleReload}
              title="Muat Ulang Pratinjau"
            >
              <IconifyIcon icon="solar:refresh-bold" className="me-1 fs-14" />
              Muat Ulang
            </Button>
            <a
              href={theme.demoPath}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-light text-dark fw-semibold d-inline-flex align-items-center fs-12 px-3 py-1.5 shadow-sm"
              title="Buka Storefront di Tab Baru"
            >
              <IconifyIcon icon="solar:link-circle-bold" className="me-1.5 fs-14 text-primary" />
              Buka di Tab Baru
            </a>
            <Button variant="danger" size="sm" onClick={onHide} className="px-3 py-1.5 fs-12 d-inline-flex align-items-center fw-semibold">
              <IconifyIcon icon="solar:close-circle-bold" className="me-1.5 fs-14" />
              Tutup Pratinjau
            </Button>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-0 bg-dark bg-opacity-75 d-flex justify-content-center align-items-stretch overflow-hidden" style={{ height: 'calc(100vh - 58px)' }}>
        <div
          className="d-flex flex-column h-100 bg-white position-relative shadow-lg"
          style={{
            width: getViewportWidth(),
            maxWidth: '100%',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            borderLeft: viewport !== 'desktop' ? '2px solid rgba(255,255,255,0.2)' : 'none',
            borderRight: viewport !== 'desktop' ? '2px solid rgba(255,255,255,0.2)' : 'none',
            boxShadow: viewport !== 'desktop' ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
          }}
        >
          {/* Simulation Status Bar for Mobile / Tablet */}
          {viewport !== 'desktop' && (
            <div className="bg-dark text-white-50 py-1 px-3 fs-11 text-center font-monospace border-bottom border-secondary d-flex align-items-center justify-content-between">
              <span>{viewport === 'mobile' ? 'iPhone / Android' : 'iPad / Tablet'}</span>
              <span className="badge bg-secondary font-monospace fs-10">{getViewportWidth()}</span>
              <span>Zoom 100%</span>
            </div>
          )}

          {/* Loading Spinner Overlay */}
          {iframeLoading && (
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-white z-3"
              style={{ minHeight: '300px' }}
            >
              <Spinner animation="border" variant="primary" style={{ width: '2.5rem', height: '2.5rem' }} className="mb-3" />
              <div className="fs-14 fw-bold text-dark">Memuat Storefront {theme.name}...</div>
              <div className="text-muted fs-12 mt-1">Menyiapkan komponen, katalog produk, dan tata letak live demo</div>
            </div>
          )}

          {/* Storefront Live Frame */}
          <iframe
            ref={iframeRef}
            src={theme.demoPath}
            title={`Preview of ${theme.name}`}
            className="w-100 h-100 border-0 flex-grow-1"
            onLoad={() => setIframeLoading(false)}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ThemePreviewModal;
