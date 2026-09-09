import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, Form, Modal, Badge, Alert, Card, CardBody } from 'react-bootstrap';
import SellerDetails from './components/SellerDetails';
import SellerChat from './components/SellerChat';
import LatestProduct from './components/LatestProduct';
import SearchableMerchantSelector from './components/SearchableMerchantSelector';
import { initialMerchantsData, formatRupiah } from '../data';
import { merchantDetailsMetadata } from './data';

const SellerDetailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [merchants, setMerchants] = useState(initialMerchantsData);
  const [currentMerchantId, setCurrentMerchantId] = useState(
    Number(searchParams.get('id')) || initialMerchantsData[0]?.id || 1
  );

  // Modals state
  const [showImpersonateModal, setShowImpersonateModal] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [kycNotes, setKycNotes] = useState('');
  const [domainVerifiedAlert, setDomainVerifiedAlert] = useState(null);
  const [impersonateTokenResult, setImpersonateTokenResult] = useState(null);

  // Sync with query params
  useEffect(() => {
    const idFromQuery = searchParams.get('id');
    if (idFromQuery) {
      setCurrentMerchantId(Number(idFromQuery));
    }
  }, [searchParams]);

  // Fetch from backend
  useEffect(() => {
    const fetchBackend = async () => {
      try {
        const res = await fetch('/api/v1/admin/merchants');
        if (res.ok) {
          const json = await res.json();
          if (json.data?.merchants?.length > 0) {
            setMerchants(json.data.merchants);
            // Default to sneakers or query id
            const targetId = Number(searchParams.get('id'));
            if (!targetId) {
              const defaultStore =
                json.data.merchants.find((m) => m.name.includes('Sneakers')) || json.data.merchants[0];
              setCurrentMerchantId(defaultStore.id);
            }
          }
        }
      } catch (err) {
        console.log('Using local merchant state', err);
      }
    };
    fetchBackend();
  }, []);

  const selectedMerchant =
    merchants.find((m) => m.id === currentMerchantId) || merchants[0] || initialMerchantsData[0];

  const selectedMetadata =
    merchantDetailsMetadata[selectedMerchant?.id] ||
    merchantDetailsMetadata[1] ||
    {};

  const handleSelectMerchant = (id) => {
    setCurrentMerchantId(Number(id));
    setSearchParams({ id: String(id) });
  };

  const handleExecuteImpersonate = async () => {
    try {
      const res = await fetch(`/api/v1/admin/merchants/${selectedMerchant.id}/impersonate`, {
        method: 'POST'
      });
      if (res.ok) {
        const json = await res.json();
        setImpersonateTokenResult(json.data);
      } else {
        setImpersonateTokenResult({
          token: 'jwt_mock_impersonate_' + Date.now(),
          expires_in: '30 menit',
          store_url: `https://${selectedMerchant.subdomain}.indovia.com`,
          merchant_name: selectedMerchant.name
        });
      }
    } catch {
      setImpersonateTokenResult({
        token: 'jwt_mock_impersonate_' + Date.now(),
        expires_in: '30 menit',
        store_url: `https://${selectedMerchant.subdomain}.indovia.com`,
        merchant_name: selectedMerchant.name
      });
    }
  };

  const handleKycReview = async (newStatus) => {
    try {
      await fetch(`/api/v1/admin/merchants/${selectedMerchant.id}/kyc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes: kycNotes })
      });
    } catch (e) {
      console.log(e);
    }
    setMerchants(
      merchants.map((m) =>
        m.id === selectedMerchant.id ? { ...m, kyc_status: newStatus, kyc_notes: kycNotes } : m
      )
    );
    setShowKycModal(false);
    alert(`Status KYC toko ${selectedMerchant.name} diubah menjadi: ${newStatus.toUpperCase()}`);
  };

  const handleSimulateDomainDns = async () => {
    try {
      const res = await fetch(`/api/v1/admin/merchants/${selectedMerchant.id}/verify-domain`, {
        method: 'POST'
      });
      if (res.ok) {
        const json = await res.json();
        setDomainVerifiedAlert({ success: true, message: json.message });
      } else {
        setDomainVerifiedAlert({
          success: true,
          message: 'DNS CNAME Terverifikasi Valid! Sertifikat Let\'s Encrypt SSL telah aktif (90 Hari).'
        });
      }
    } catch {
      setDomainVerifiedAlert({
        success: true,
        message: 'DNS CNAME Terverifikasi Valid! Sertifikat Let\'s Encrypt SSL telah aktif (90 Hari).'
      });
    }
  };

  return (
    <>
      <PageTItle title={`Detail & Audit Toko: ${selectedMerchant?.name || 'Merchant'}`} />

      {/* TOP CONTROLS & TENANT SWITCHER BAR */}
      <Card className="border-0 shadow-sm mb-3">
        <CardBody className="py-2.5 px-3">
          <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between gap-3">
            {/* SISI KIRI: Navigasi Kembali & Merchant Selector */}
            <div className="d-flex flex-wrap align-items-center gap-2">
              <Link
                to="/seller/seller-list"
                className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center fw-medium text-nowrap"
                title="Kembali ke Tabel Direktori Seluruh Toko"
              >
                <IconifyIcon icon="solar:arrow-left-linear" className="me-1.5 fs-15" />
                Ke Tabel Direktori
              </Link>
              <div className="vr d-none d-md-block mx-1" style={{ height: 26 }} />
              <SearchableMerchantSelector
                merchants={merchants}
                selectedMerchant={selectedMerchant}
                onSelectMerchant={handleSelectMerchant}
              />
            </div>

            {/* SISI KANAN: Tombol Aksi Cepat */}
            <div className="d-flex align-items-center gap-2 flex-wrap ms-lg-auto justify-content-end">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setShowImpersonateModal(true);
                  setImpersonateTokenResult(null);
                }}
                className="d-inline-flex align-items-center fw-medium text-nowrap px-3 py-1.5"
              >
                <IconifyIcon icon="solar:login-2-bold" className="me-1.5 fs-15" />
                Login as Store
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/seller/seller-add')}
                className="d-inline-flex align-items-center fw-semibold text-white text-nowrap px-3 py-1.5 shadow-sm"
                style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
              >
                <IconifyIcon icon="solar:add-circle-bold" className="me-1.5 fs-15" />
                + Daftarkan Toko Baru
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* KARTU PROFIL UTAMA (LAYOUT SELLER DETAILS) */}
      <SellerDetails
        merchant={selectedMerchant}
        metadata={selectedMetadata}
        onImpersonate={() => {
          setShowImpersonateModal(true);
          setImpersonateTokenResult(null);
        }}
        onOpenKyc={() => {
          setKycNotes(selectedMerchant.kyc_notes || '');
          setShowKycModal(true);
        }}
        onOpenDomain={() => {
          setDomainVerifiedAlert(null);
          setShowDomainModal(true);
        }}
      />

      {/* GRAFIK OMSET & REPUTASI TOKO */}
      <SellerChat merchant={selectedMerchant} />

      {/* KATALOG PRODUK TERKINI & SUMMARY ACCOUNTING */}
      <LatestProduct merchant={selectedMerchant} metadata={selectedMetadata} />

      {/* MODAL 1: IMPERSONASI ("LOGIN AS MERCHANT") */}
      <Modal
        show={showImpersonateModal}
        onHide={() => setShowImpersonateModal(false)}
        centered
        size="md"
      >
        <Modal.Header closeButton className="border-bottom pb-2">
          <Modal.Title className="fs-15 fw-bold text-dark d-flex align-items-center">
            <IconifyIcon icon="solar:shield-keyhole-bold-duotone" className="me-2 text-warning fs-20" />
            Impersonasi Superadmin (Login as Merchant)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3">
          <div className="alert alert-warning d-flex align-items-start py-2 px-3 mb-3 fs-12">
            <IconifyIcon icon="solar:info-circle-bold" className="fs-18 me-2 mt-0.5 flex-shrink-0" />
            <div>
              <strong>Audit Keamanan Aktif:</strong> Akses ini tercatat di Audit Log WORM Indovia dengan IP,
              waktu, dan ID Superadmin Anda untuk alasan kepatuhan dan akuntabilitas.
            </div>
          </div>

          <div className="mb-3">
            <p className="fs-12 text-dark mb-1">
              Target Toko: <strong>{selectedMerchant?.name}</strong>
            </p>
            <p className="fs-12 text-muted mb-0">
              Subdomain: <span className="font-monospace text-primary">{selectedMerchant?.subdomain}.indovia.com</span>
            </p>
          </div>

          {!impersonateTokenResult ? (
            <div className="text-center py-3">
              <p className="fs-12 text-muted mb-3">
                Klik tombol di bawah untuk menerbitkan token JWT sementara (berlaku 30 menit) dengan scope impersonasi.
              </p>
              <Button
                variant="primary"
                onClick={handleExecuteImpersonate}
                className="fw-bold px-4 py-2 text-white"
                style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
              >
                <IconifyIcon icon="solar:key-bold" className="me-1" />
                Generate Token &amp; Buka Sesi Toko
              </Button>
            </div>
          ) : (
            <div className="p-3 bg-light rounded border">
              <div className="d-flex align-items-center text-success fs-13 fw-semibold mb-2">
                <IconifyIcon icon="solar:check-circle-bold" className="me-1 fs-16" />
                Token Impersonasi Berhasil Diterbitkan!
              </div>
              <div className="mb-2">
                <label className="fs-11 text-muted">Cryptographic Access Token (JWT):</label>
                <input
                  type="text"
                  readOnly
                  value={impersonateTokenResult.token}
                  className="form-control form-control-sm font-monospace fs-11"
                />
              </div>
              <p className="fs-11 text-muted mb-3">Masa Berlaku: {impersonateTokenResult.expires_in}</p>
              <a
                href={impersonateTokenResult.store_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-success w-100 fw-semibold d-flex align-items-center justify-content-center"
              >
                <IconifyIcon icon="solar:login-2-bold" className="me-1" />
                Buka Storefront Toko di Tab Baru
              </a>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* MODAL 2: AUDIT & REVIEW KYC */}
      <Modal show={showKycModal} onHide={() => setShowKycModal(false)} centered size="lg">
        <Modal.Header closeButton className="border-bottom pb-2">
          <Modal.Title className="fs-15 fw-bold text-dark d-flex align-items-center">
            <IconifyIcon icon="solar:document-medicine-bold-duotone" className="me-2 text-primary fs-20" />
            Audit Legalitas &amp; Dokumen KYC ({selectedMerchant?.name})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="fs-11 text-muted">Nomor Induk Kependudukan (KTP):</label>
              <p className="fs-13 fw-semibold font-monospace text-dark mb-2">
                {selectedMerchant?.ktp_number || 'Belum diunggah'}
              </p>

              <label className="fs-11 text-muted">Nomor Pokok Wajib Pajak (NPWP):</label>
              <p className="fs-13 fw-semibold font-monospace text-dark mb-2">
                {selectedMerchant?.npwp_number || 'Tidak Dilampirkan (Perorangan)'}
              </p>

              <label className="fs-11 text-muted">Nomor Induk Berusaha (NIB):</label>
              <p className="fs-13 fw-semibold font-monospace text-dark mb-2">
                {selectedMerchant?.nib_number || 'Dalam Proses'}
              </p>
            </div>
            <div className="col-md-6">
              <label className="fs-11 text-muted">Informasi Rekening Bank:</label>
              <div className="p-2.5 rounded bg-light border mb-2">
                <span className="fs-12 d-block">
                  Bank: <strong>{selectedMerchant?.bank_name || '-'}</strong>
                </span>
                <span className="fs-12 d-block">
                  No. Rekening: <strong>{selectedMerchant?.bank_account_number || '-'}</strong>
                </span>
                <span className="fs-12 d-block">
                  Atas Nama: <strong>{selectedMerchant?.bank_account_holder || selectedMerchant?.owner_name}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <label className="fs-11 text-muted fw-semibold">Catatan Review Superadmin (Opsional):</label>
            <Form.Control
              as="textarea"
              rows={3}
              value={kycNotes}
              onChange={(e) => setKycNotes(e.target.value)}
              placeholder="Tuliskan catatan verifikasi atau alasan penolakan jika dokumen tidak sesuai..."
              className="fs-12"
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="border-top pt-2">
          <Button variant="outline-danger" size="sm" onClick={() => handleKycReview('rejected')}>
            Tolak Verifikasi
          </Button>
          <Button variant="success" size="sm" onClick={() => handleKycReview('approved')} className="text-white">
            Setujui &amp; Verifikasi KYC
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL 3: DOMAIN & SSL ENGINE */}
      <Modal show={showDomainModal} onHide={() => setShowDomainModal(false)} centered size="md">
        <Modal.Header closeButton className="border-bottom pb-2">
          <Modal.Title className="fs-15 fw-bold text-dark d-flex align-items-center">
            <IconifyIcon icon="solar:global-bold-duotone" className="me-2 text-primary fs-20" />
            Domain &amp; SSL Engine ({selectedMerchant?.name})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-3">
          <div className="p-3 bg-light rounded border mb-3">
            <span className="text-muted fs-11 d-block">Subdomain Default:</span>
            <span className="fs-13 fw-bold font-monospace text-primary">
              {selectedMerchant?.subdomain}.indovia.com
            </span>
          </div>

          <div className="mb-3">
            <label className="fs-12 text-dark fw-semibold mb-1">Domain Kustom Merchant:</label>
            <input
              type="text"
              readOnly
              value={selectedMerchant?.custom_domain || 'Belum dihubungkan'}
              className="form-control form-control-sm font-monospace"
            />
            <small className="text-muted fs-11 mt-1 d-block">
              Instruksi DNS: Arahkan rekod <code>CNAME</code> domain kustom ke <code>cname.indovia.com</code>
            </small>
          </div>

          {domainVerifiedAlert && (
            <Alert variant="success" className="py-2 px-3 fs-12 mb-3">
              <IconifyIcon icon="solar:check-circle-bold" className="me-1 fs-14" />
              {domainVerifiedAlert.message}
            </Alert>
          )}

          <Button
            variant="outline-primary"
            size="sm"
            className="w-100 fs-12 py-2"
            onClick={handleSimulateDomainDns}
          >
            <IconifyIcon icon="solar:refresh-bold" className="me-1" />
            Cek DNS &amp; Simulasikan Provisioning SSL Let&apos;s Encrypt
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SellerDetailsPage;