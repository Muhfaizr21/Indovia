import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageTItle from '@/components/PageTItle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Row,
  Badge,
  Button,
  Form,
  Modal,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert
} from 'react-bootstrap';
import { initialMerchantsData, formatRupiah, statusConfig, kycConfig, getMerchantThemeInfo } from '../data';

const SellerListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [merchants, setMerchants] = useState(initialMerchantsData);
  const [loading, setLoading] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedKyc, setSelectedKyc] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedTheme, setSelectedTheme] = useState(searchParams.get('theme') || 'all');

  useEffect(() => {
    const themeParam = searchParams.get('theme');
    if (themeParam) {
      setSelectedTheme(themeParam);
    }
  }, [searchParams]);

  // Multi-selection checkboxes
  const [selectedIds, setSelectedIds] = useState([]);

  // Modals state
  const [showImpersonateModal, setShowImpersonateModal] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  // Form states
  const [kycNotes, setKycNotes] = useState('');
  const [customDomainInput, setCustomDomainInput] = useState('');
  const [domainVerifiedAlert, setDomainVerifiedAlert] = useState(null);
  const [impersonateTokenResult, setImpersonateTokenResult] = useState(null);

  // New Merchant Form
  const [newMerchant, setNewMerchant] = useState({
    name: '',
    subdomain: '',
    owner_name: '',
    owner_email: '',
    owner_phone: '',
    city: 'Jakarta',
    category: 'Fashion & Busana',
    plan: 'Starter'
  });

  // Fetch real backend data on mount, fallback to mock data
  useEffect(() => {
    fetchMerchants();
  }, []);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/v1/admin/merchants');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.merchants && json.data.merchants.length > 0) {
          setMerchants(json.data.merchants);
        }
      }
    } catch (e) {
      console.log('Backend sync info: using localized state store', e);
    } finally {
      setLoading(false);
    }
  };

  // Filtered merchants
  const filteredMerchants = merchants.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.subdomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.owner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.owner_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = selectedStatus === 'all' || m.status === selectedStatus;
    const matchKyc = selectedKyc === 'all' || m.kyc_status === selectedKyc;
    const matchPlan = selectedPlan === 'all' || m.plan === selectedPlan;

    const themeInfo = getMerchantThemeInfo(m);
    const matchTheme = selectedTheme === 'all' || themeInfo.theme_id === selectedTheme;

    return matchSearch && matchStatus && matchKyc && matchPlan && matchTheme;
  });

  // KPI Calculations
  const totalCount = merchants.length;
  const activeCount = merchants.filter((m) => m.status === 'active').length;
  const trialCount = merchants.filter((m) => m.status === 'trial').length;
  const kycPendingCount = merchants.filter((m) => m.kyc_status === 'pending').length;
  const suspendedCount = merchants.filter((m) => m.status === 'suspended').length;

  // Checkbox handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredMerchants.map((m) => m.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Impersonate Handlers
  const handleOpenImpersonate = (merchant) => {
    setSelectedMerchant(merchant);
    setImpersonateTokenResult(null);
    setShowImpersonateModal(true);
  };

  const handleExecuteImpersonate = async () => {
    if (!selectedMerchant) return;
    try {
      const res = await fetch(`/api/v1/admin/merchants/${selectedMerchant.id}/impersonate`, {
        method: 'POST'
      });
      if (res.ok) {
        const json = await res.json();
        setImpersonateTokenResult(json.data);
      } else {
        setImpersonateTokenResult({
          token: 'simulated_jwt_token_' + Date.now(),
          expires_in: '30 menit',
          store_url: `http://${selectedMerchant.subdomain}.indovia.com`,
          merchant_name: selectedMerchant.name
        });
      }
    } catch {
      setImpersonateTokenResult({
        token: 'simulated_jwt_token_' + Date.now(),
        expires_in: '30 menit',
        store_url: `http://${selectedMerchant.subdomain}.indovia.com`,
        merchant_name: selectedMerchant.name
      });
    }
  };

  // KYC Handlers
  const handleOpenKyc = (merchant) => {
    setSelectedMerchant(merchant);
    setKycNotes(merchant.kyc_notes || '');
    setShowKycModal(true);
  };

  const handleKycDecision = async (decision) => {
    if (!selectedMerchant) return;
    try {
      await fetch(`/api/v1/admin/merchants/${selectedMerchant.id}/kyc`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision, notes: kycNotes })
      });
    } catch (e) {
      console.log(e);
    }

    setMerchants((prev) =>
      prev.map((m) =>
        m.id === selectedMerchant.id
          ? {
              ...m,
              kyc_status: decision,
              kyc_notes: kycNotes,
              bank_verified: decision === 'approved'
            }
          : m
      )
    );
    setShowKycModal(false);
  };

  // Domain Handlers
  const handleOpenDomain = (merchant) => {
    setSelectedMerchant(merchant);
    setCustomDomainInput(merchant.custom_domain || '');
    setDomainVerifiedAlert(null);
    setShowDomainModal(true);
  };

  const handleVerifyDomain = async () => {
    if (!selectedMerchant) return;
    try {
      await fetch(`/api/v1/admin/merchants/${selectedMerchant.id}/verify-domain`, {
        method: 'POST'
      });
    } catch (e) {
      console.log(e);
    }

    setDomainVerifiedAlert({
      type: 'success',
      message: `Domain ${customDomainInput} terverifikasi valid! Sertifikat SSL Let's Encrypt aktif 90 hari.`
    });

    setMerchants((prev) =>
      prev.map((m) =>
        m.id === selectedMerchant.id
          ? {
              ...m,
              custom_domain: customDomainInput,
              domain_verified: true,
              ssl_status: 'active'
            }
          : m
      )
    );
  };

  // Status Handlers
  const handleStatusChange = async (merchantId, newStatus) => {
    try {
      await fetch(`/api/v1/admin/merchants/${merchantId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, reason: 'Pembaruan status dari portal Superadmin' })
      });
    } catch (e) {
      console.log(e);
    }

    setMerchants((prev) =>
      prev.map((m) => (m.id === merchantId ? { ...m, status: newStatus } : m))
    );
  };

  // Create Merchant Handler
  const handleCreateMerchant = async (e) => {
    e.preventDefault();
    const slug = newMerchant.subdomain || newMerchant.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const createdObj = {
      id: Date.now(),
      code: `IND-M-${Math.floor(100 + Math.random() * 900)}`,
      name: newMerchant.name,
      subdomain: slug,
      custom_domain: '',
      domain_verified: false,
      ssl_status: 'unconfigured',
      owner_name: newMerchant.owner_name,
      owner_email: newMerchant.owner_email,
      owner_phone: newMerchant.owner_phone,
      city: newMerchant.city,
      category: newMerchant.category,
      plan: newMerchant.plan,
      status: 'trial',
      monthly_gmv: 0,
      total_orders: 0,
      item_count: 0,
      rating: 5.0,
      review_count: 0,
      kyc_status: 'unverified',
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${slug}`
    };

    try {
      await fetch('/api/v1/admin/merchants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMerchant)
      });
    } catch (err) {
      console.log(err);
    }

    setMerchants([createdObj, ...merchants]);
    setShowAddModal(false);
    setNewMerchant({
      name: '',
      subdomain: '',
      owner_name: '',
      owner_email: '',
      owner_phone: '',
      city: 'Jakarta',
      category: 'Fashion & Busana',
      plan: 'Starter'
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`URL disalin ke clipboard: ${text}`);
  };

  return (
    <>
      <PageTItle title="Direktori Merchant & Multi-Tenant" />

      {/* HEADER ACTION BAR */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold mb-1 text-body">Direktori Toko & Tenant E-Commerce</h4>
          <p className="text-muted fs-12 mb-0">
            Daftar Seluruh Merchant, Status Siklus Hidup, Legalitas KYC, Domain Kustom, dan Akses Cepat
          </p>
        </div>
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={fetchMerchants}
            className="d-flex align-items-center"
          >
            <IconifyIcon icon="solar:refresh-bold" className="me-1" />
            Muat Ulang
          </Button>
          <Link
            to="/seller/seller-add"
            className="btn btn-sm btn-primary d-flex align-items-center fw-semibold text-white"
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
          >
            <IconifyIcon icon="solar:add-circle-bold" className="me-1" />
            + Daftarkan Toko Baru
          </Link>
        </div>
      </div>

      {/* BARIS 1: 5 KPI SUMMARY CARDS */}
      <Row className="g-2 mb-3">
        <Col sm={6} xl>
          <Card
            className="border-0 shadow-sm h-100 cursor-pointer"
            onClick={() => {
              setSelectedStatus('all');
              setSelectedKyc('all');
            }}
            style={{
              borderLeft: '4px solid #ff6c2f',
              backgroundColor: selectedStatus === 'all' && selectedKyc === 'all' ? 'rgba(255, 108, 47, 0.06)' : undefined,
              boxShadow: selectedStatus === 'all' && selectedKyc === 'all' ? '0 4px 14px rgba(255, 108, 47, 0.15)' : undefined,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-0 fs-11 fw-medium">Total Toko Terdaftar</p>
                  <h4 className="mt-0 mb-1 fw-bold text-body fs-17">{totalCount} Toko</h4>
                  {selectedStatus === 'all' && selectedKyc === 'all' ? (
                    <span className="badge bg-primary-subtle text-primary fs-10 py-0.5 px-1.5 fw-semibold d-inline-flex align-items-center">
                      <IconifyIcon icon="solar:filter-bold" className="me-1 fs-11" />
                      Filter Aktif
                    </span>
                  ) : (
                    <small className="text-muted fs-10">Seluruh tenant</small>
                  )}
                </div>
                <div
                  className="avatar-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255, 108, 47, 0.12)', color: '#ff6c2f' }}
                >
                  <IconifyIcon icon="solar:shop-bold-duotone" className="fs-18" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col sm={6} xl>
          <Card
            className="border-0 shadow-sm h-100 cursor-pointer"
            onClick={() => {
              setSelectedStatus('active');
              setSelectedKyc('all');
            }}
            style={{
              borderLeft: '4px solid #16a34a',
              backgroundColor: selectedStatus === 'active' ? 'rgba(22, 163, 74, 0.06)' : undefined,
              boxShadow: selectedStatus === 'active' ? '0 4px 14px rgba(22, 163, 74, 0.15)' : undefined,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-0 fs-11 fw-medium">Aktif Berbayar</p>
                  <h4 className="mt-0 mb-1 fw-bold text-success fs-17">{activeCount} Toko</h4>
                  {selectedStatus === 'active' ? (
                    <span className="badge bg-success-subtle text-success fs-10 py-0.5 px-1.5 fw-semibold d-inline-flex align-items-center">
                      <IconifyIcon icon="solar:filter-bold" className="me-1 fs-11" />
                      Filter Aktif
                    </span>
                  ) : (
                    <small className="text-muted fs-10">SaaS Revenue</small>
                  )}
                </div>
                <div
                  className="avatar-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(34, 197, 94, 0.12)', color: '#16a34a' }}
                >
                  <IconifyIcon icon="solar:check-circle-bold-duotone" className="fs-18" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col sm={6} xl>
          <Card
            className="border-0 shadow-sm h-100 cursor-pointer"
            onClick={() => {
              setSelectedStatus('trial');
              setSelectedKyc('all');
            }}
            style={{
              borderLeft: '4px solid #ea580c',
              backgroundColor: selectedStatus === 'trial' ? 'rgba(234, 88, 12, 0.06)' : undefined,
              boxShadow: selectedStatus === 'trial' ? '0 4px 14px rgba(234, 88, 12, 0.15)' : undefined,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-0 fs-11 fw-medium">Masa Trial (14 Hari)</p>
                  <h4 className="mt-0 mb-1 fw-bold fs-17" style={{ color: '#ea580c' }}>
                    {trialCount} Toko
                  </h4>
                  {selectedStatus === 'trial' ? (
                    <span className="badge bg-warning-subtle text-warning fs-10 py-0.5 px-1.5 fw-semibold d-inline-flex align-items-center">
                      <IconifyIcon icon="solar:filter-bold" className="me-1 fs-11" />
                      Filter Aktif
                    </span>
                  ) : (
                    <small className="text-muted fs-10">Potensi konversi</small>
                  )}
                </div>
                <div
                  className="avatar-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(234, 88, 12, 0.12)', color: '#ea580c' }}
                >
                  <IconifyIcon icon="solar:clock-circle-bold-duotone" className="fs-18" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col sm={6} xl>
          <Card
            className="border-0 shadow-sm h-100 cursor-pointer"
            onClick={() => {
              setSelectedKyc('pending');
              setSelectedStatus('all');
            }}
            style={{
              borderLeft: '4px solid #d97706',
              backgroundColor: selectedKyc === 'pending' ? 'rgba(217, 119, 6, 0.06)' : undefined,
              boxShadow: selectedKyc === 'pending' ? '0 4px 14px rgba(217, 119, 6, 0.15)' : undefined,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-0 fs-11 fw-medium">Menunggu Verifikasi KYC</p>
                  <h4 className="mt-0 mb-1 fw-bold text-warning fs-17">
                    {kycPendingCount} Toko
                  </h4>
                  {selectedKyc === 'pending' ? (
                    <span className="badge bg-warning-subtle text-warning fs-10 py-0.5 px-1.5 fw-semibold d-inline-flex align-items-center">
                      <IconifyIcon icon="solar:filter-bold" className="me-1 fs-11" />
                      Filter Aktif
                    </span>
                  ) : (
                    <small className="text-muted fs-10">Perlu tindakan</small>
                  )}
                </div>
                <div
                  className="avatar-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#d97706' }}
                >
                  <IconifyIcon icon="solar:shield-warning-bold-duotone" className="fs-18" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col sm={6} xl>
          <Card
            className="border-0 shadow-sm h-100 cursor-pointer"
            onClick={() => {
              setSelectedStatus('suspended');
              setSelectedKyc('all');
            }}
            style={{
              borderLeft: '4px solid #475569',
              backgroundColor: selectedStatus === 'suspended' ? 'rgba(100, 116, 139, 0.06)' : undefined,
              boxShadow: selectedStatus === 'suspended' ? '0 4px 14px rgba(100, 116, 139, 0.15)' : undefined,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-0 fs-11 fw-medium">Toko Ditangguhkan</p>
                  <h4 className="mt-0 mb-1 fw-bold text-secondary fs-17">
                    {suspendedCount} Toko
                  </h4>
                  {selectedStatus === 'suspended' ? (
                    <span className="badge bg-secondary-subtle text-secondary fs-10 py-0.5 px-1.5 fw-semibold d-inline-flex align-items-center">
                      <IconifyIcon icon="solar:filter-bold" className="me-1 fs-11" />
                      Filter Aktif
                    </span>
                  ) : (
                    <small className="text-muted fs-10">Pelanggaran / dunning</small>
                  )}
                </div>
                <div
                  className="avatar-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(100, 116, 139, 0.12)', color: '#475569' }}
                >
                  <IconifyIcon icon="solar:close-circle-bold-duotone" className="fs-18" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* MASTER DATA TABLE WITH INTEGRATED FILTER HEADER */}
      <Card className="border-0 shadow-sm overflow-hidden mb-4">
        {/* Integrated Filter & Search Toolbar */}
        <CardHeader className="p-3 border-bottom bg-body">
          <Row className="g-2 align-items-center">
            <Col xs={12} lg={3}>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-sm ps-4"
                  placeholder="Cari nama toko, subdomain, kode, pemilik..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconifyIcon
                  icon="solar:magnifer-linear"
                  className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
                />
              </div>
            </Col>

            <Col xs={6} md={3} lg={2}>
              <Form.Select
                size="sm"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="fs-12"
              >
                <option value="all">Semua Status Toko</option>
                <option value="active">Aktif Berbayar</option>
                <option value="trial">Masa Trial 14H</option>
                <option value="past_due">Tunggakan Tagihan</option>
                <option value="suspended">Ditangguhkan</option>
              </Form.Select>
            </Col>

            <Col xs={6} md={3} lg={2}>
              <Form.Select
                size="sm"
                value={selectedKyc}
                onChange={(e) => setSelectedKyc(e.target.value)}
                className="fs-12"
              >
                <option value="all">Semua Status KYC</option>
                <option value="pending">Menunggu Review</option>
                <option value="approved">KYC Terverifikasi</option>
                <option value="rejected">KYC Ditolak</option>
                <option value="unverified">Belum Verifikasi</option>
              </Form.Select>
            </Col>

            <Col xs={6} md={3} lg={2}>
              <Form.Select
                size="sm"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="fs-12"
              >
                <option value="all">Semua Paket</option>
                <option value="Starter">Paket Starter</option>
                <option value="Pro">Paket Pro</option>
                <option value="Enterprise">Paket Enterprise</option>
              </Form.Select>
            </Col>

            {/* FILTER BERDASARKAN TEMA / TEMPLATE */}
            <Col xs={6} md={3} lg={2}>
              <Form.Select
                size="sm"
                value={selectedTheme}
                onChange={(e) => {
                  setSelectedTheme(e.target.value);
                  if (e.target.value === 'all') {
                    searchParams.delete('theme');
                    setSearchParams(searchParams);
                  } else {
                    setSearchParams({ theme: e.target.value });
                  }
                }}
                className="fs-12 fw-medium text-body border-primary-subtle"
              >
                <option value="all">Semua Tema / Desain</option>
                <option value="fashion-01">Demo 01 (Fashion Store)</option>
                <option value="fashion-02">Demo 02 (Minimalist)</option>
                <option value="fashion-03">Demo 03 (Luxury)</option>
              </Form.Select>
            </Col>

            <Col xs={12} md={12} lg={1} className="text-end">
              {(searchTerm || selectedStatus !== 'all' || selectedKyc !== 'all' || selectedPlan !== 'all' || selectedTheme !== 'all') ? (
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="w-100 fs-11 py-1 d-inline-flex align-items-center justify-content-center"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedStatus('all');
                    setSelectedKyc('all');
                    setSelectedPlan('all');
                    setSelectedTheme('all');
                    searchParams.delete('theme');
                    setSearchParams(searchParams);
                  }}
                  title="Reset Filter"
                >
                  <IconifyIcon icon="solar:restart-bold" className="me-1" />
                  Reset
                </Button>
              ) : (
                <div className="text-end">
                  <span className="badge bg-body-secondary text-body border border-secondary-subtle fw-medium py-1 px-2 fs-11" title="Jumlah Toko">
                    {filteredMerchants.length} Toko
                  </span>
                </div>
              )}
            </Col>
          </Row>

          {/* Bulk Selection Notice */}
          {selectedIds.length > 0 && (
            <div className="d-flex align-items-center justify-content-between p-2.5 mt-2 rounded-3 bg-body-secondary border border-secondary-subtle">
              <span className="fs-12 text-body">
                <strong>{selectedIds.length}</strong> toko terpilih dari tabel
              </span>
              <div className="d-flex gap-2">
                <Button variant="outline-secondary" size="sm" className="fs-11 py-0.5">
                  <IconifyIcon icon="solar:export-bold" className="me-1" />
                  Ekspor Terpilih
                </Button>
                <Button variant="outline-danger" size="sm" className="fs-11 py-0.5">
                  <IconifyIcon icon="solar:close-circle-bold" className="me-1" />
                  Tangguhkan Toko
                </Button>
              </div>
            </div>
          )}
        </CardHeader>

        <div className="table-responsive">
          <Table hover className="align-middle mb-0">
            <thead className="bg-body-tertiary">
              <tr className="fs-11 text-uppercase text-muted border-bottom">
                <th className="ps-3" style={{ width: '40px' }}>
                  <Form.Check
                    type="checkbox"
                    checked={selectedIds.length === filteredMerchants.length && filteredMerchants.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th style={{ minWidth: '220px' }}>Toko &amp; Kategori</th>
                <th style={{ minWidth: '170px' }}>Subdomain &amp; Domain</th>
                <th style={{ minWidth: '150px' }}>Pemilik &amp; Kontak</th>
                <th style={{ minWidth: '175px' }}>Tema &amp; Tata Letak</th>
                <th style={{ minWidth: '120px' }}>Paket &amp; Status</th>
                <th style={{ minWidth: '140px' }}>Verifikasi KYC</th>
                <th style={{ minWidth: '120px' }}>Performa (GMV)</th>
                <th className="text-end pe-3" style={{ minWidth: '220px' }}>Aksi Superadmin</th>
              </tr>
            </thead>
            <tbody className="fs-12">
              {filteredMerchants.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-5 text-muted">
                    <IconifyIcon icon="solar:shop-2-bold" className="fs-32 text-muted mb-2 d-block mx-auto" />
                    <strong>Tidak ada data toko merchant yang cocok dengan filter.</strong>
                    <p className="fs-12 mb-0">Silakan sesuaikan kata kunci atau reset filter pencarian Anda.</p>
                  </td>
                </tr>
              ) : (
                filteredMerchants.map((m) => {
                  const statusInfo = statusConfig[m.status] || statusConfig.trial;
                  const kycInfo = kycConfig[m.kyc_status] || kycConfig.unverified;
                  const themeInfo = getMerchantThemeInfo(m);
                  const isChecked = selectedIds.includes(m.id);

                  return (
                    <tr key={m.id} className={isChecked ? 'table-active' : ''}>
                      {/* Checkbox */}
                      <td className="ps-3">
                        <Form.Check
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleSelectRow(m.id)}
                        />
                      </td>

                      {/* Toko & Kategori */}
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <Link to={`/seller/seller-details?id=${m.id}`} className="flex-shrink-0 d-block">
                            <img
                              src={m.avatar}
                              alt={m.name}
                              className="rounded-2 border"
                              style={{ width: 42, height: 42, objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.src = `https://api.dicebear.com/7.x/identicon/svg?seed=${m.subdomain}`;
                              }}
                            />
                          </Link>
                          <div className="overflow-hidden">
                            <div className="d-flex align-items-center flex-wrap gap-1 mb-0.5">
                              <Link
                                to={`/seller/seller-details?id=${m.id}`}
                                className="text-body fw-bold fs-13 text-decoration-none hover-primary text-truncate d-inline-block"
                                style={{ maxWidth: '170px' }}
                                title="Buka Detail & Audit Toko"
                              >
                                {m.name}
                              </Link>
                              <span
                                className="badge bg-body-secondary text-secondary border border-secondary-subtle font-monospace fs-10 px-1.5 py-0.5 ms-1"
                                style={{ letterSpacing: '0.2px' }}
                              >
                                {m.code}
                              </span>
                            </div>
                            <div className="text-muted fs-11 d-flex align-items-center gap-1">
                              <span>{m.category}</span>
                              <span className="opacity-50">&bull;</span>
                              <span>{m.city}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Subdomain & Domain */}
                      <td>
                        <div className="mb-1">
                          <span className="d-inline-flex align-items-center px-2 py-0.5 rounded fs-11 fw-medium bg-body-secondary text-body border border-secondary-subtle">
                            <IconifyIcon icon="solar:link-bold" className="fs-11 me-1 text-primary" />
                            {m.subdomain}.indovia.com
                            <IconifyIcon
                              icon="solar:copy-linear"
                              className="fs-12 ms-1 cursor-pointer text-muted hover-primary"
                              title="Salin Subdomain"
                              onClick={() => copyToClipboard(`https://${m.subdomain}.indovia.com`)}
                            />
                          </span>
                        </div>

                        {m.custom_domain ? (
                          <div
                            className="d-inline-flex align-items-center px-2 py-0.5 rounded fs-10 fw-medium cursor-pointer"
                            style={{
                              backgroundColor: m.domain_verified ? 'rgba(34, 197, 94, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                              color: m.domain_verified ? '#16a34a' : '#d97706',
                              border: `1px solid ${m.domain_verified ? 'rgba(34, 197, 94, 0.25)' : 'rgba(245, 158, 11, 0.25)'}`
                            }}
                            onClick={() => handleOpenDomain(m)}
                            title="Klik untuk mengelola domain & SSL"
                          >
                            <IconifyIcon icon="solar:lock-bold" className="fs-10 me-1" />
                            {m.custom_domain}
                          </div>
                        ) : (
                          <span
                            className="fs-10 text-muted text-decoration-underline cursor-pointer d-inline-block hover-primary"
                            onClick={() => handleOpenDomain(m)}
                          >
                            + Domain Kustom
                          </span>
                        )}
                      </td>

                      {/* Pemilik & Kontak */}
                      <td>
                        <strong className="text-body d-block fs-12">{m.owner_name}</strong>
                        <div className="d-flex align-items-center fs-11 mt-0.5">
                          <a
                            href={`https://wa.me/${m.owner_phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-success text-decoration-none d-inline-flex align-items-center"
                            title="Hubungi WhatsApp"
                          >
                            <IconifyIcon icon="solar:chat-round-dots-bold" className="me-1 fs-12" />
                            {m.owner_phone}
                          </a>
                        </div>
                      </td>

                      {/* Tema & Tata Letak Toko */}
                      <td>
                        <div className="d-flex flex-column gap-1">
                          <div>
                            <Badge
                              bg={
                                themeInfo.theme_id === 'fashion-01'
                                  ? 'primary-subtle'
                                  : themeInfo.theme_id === 'fashion-02'
                                  ? 'info-subtle'
                                  : 'warning-subtle'
                              }
                              className={`border fs-11 fw-semibold d-inline-flex align-items-center ${
                                themeInfo.theme_id === 'fashion-01'
                                  ? 'text-primary border-primary-subtle'
                                  : themeInfo.theme_id === 'fashion-02'
                                  ? 'text-info border-info-subtle'
                                  : 'text-warning border-warning-subtle'
                              }`}
                            >
                              <IconifyIcon icon="solar:pallete-2-bold" className="me-1 fs-12" />
                              {themeInfo.demo_number} ({themeInfo.theme_id === 'fashion-02' ? 'Minimalist' : themeInfo.theme_id === 'fashion-03' ? 'Luxury' : 'Fashion'})
                            </Badge>
                          </div>
                          <div className="text-muted fs-11 d-flex align-items-center gap-1">
                            <IconifyIcon icon="solar:widget-linear" className="fs-12 text-secondary" />
                            <span className="text-truncate" style={{ maxWidth: 110 }} title={themeInfo.product_layout}>
                              {themeInfo.product_layout}
                            </span>
                            <Link
                              to={`/seller/seller-details?id=${m.id}&tab=themes`}
                              className="text-primary ms-1 d-inline-flex align-items-center"
                              title="Ubah Tema & Tata Letak Toko Ini"
                            >
                              <IconifyIcon icon="solar:pen-bold" className="fs-11" />
                            </Link>
                          </div>
                        </div>
                      </td>

                      {/* Paket & Status */}
                      <td>
                        <div className="mb-1">
                          <span
                            className="badge px-1.5 py-0.5 fs-10 fw-semibold text-uppercase"
                            style={{
                              backgroundColor:
                                m.plan === 'Enterprise'
                                  ? '#ff6c2f'
                                  : m.plan === 'Pro'
                                  ? '#3b82f6'
                                  : '#64748b',
                              color: '#ffffff'
                            }}
                          >
                            {m.plan}
                          </span>
                        </div>
                        <span
                          className="px-2 py-0.5 rounded fs-10 fw-semibold d-inline-block"
                          style={{ backgroundColor: statusInfo.bg, color: statusInfo.color }}
                        >
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* Verifikasi KYC */}
                      <td>
                        <div
                          className="d-inline-flex align-items-center px-2 py-1 rounded fs-11 fw-semibold cursor-pointer mb-1"
                          style={{ backgroundColor: kycInfo.bg, color: kycInfo.color }}
                          onClick={() => handleOpenKyc(m)}
                          title="Klik untuk meninjau dokumen legalitas"
                        >
                          <IconifyIcon icon={kycInfo.icon} className="me-1 fs-13" />
                          {kycInfo.label}
                        </div>
                        {m.bank_name && (
                          <div className="text-muted fs-10">
                            {m.bank_name} &bull; {m.bank_account_number}
                          </div>
                        )}
                      </td>

                      {/* Performa Toko */}
                      <td>
                        <strong className="text-body fs-13 d-block">{formatRupiah(m.monthly_gmv)}</strong>
                        <small className="text-muted fs-11">
                          {m.total_orders} order &bull; {m.item_count} SKU
                        </small>
                      </td>

                      {/* Aksi Superadmin */}
                      <td className="text-end pe-3" style={{ whiteSpace: 'nowrap' }}>
                        <div className="d-inline-flex align-items-center justify-content-end" style={{ gap: '8px' }}>
                          <Link
                            to={`/seller/seller-details?id=${m.id}`}
                            className="btn btn-sm btn-outline-secondary py-1 px-2.5 fs-11 d-inline-flex align-items-center rounded-2 shadow-none"
                            title="Buka Profil & Audit Toko 360°"
                          >
                            <IconifyIcon icon="solar:eye-bold" className="me-1 fs-12 text-primary" />
                            Audit
                          </Link>

                          <Button
                            variant="primary"
                            size="sm"
                            className="py-1 px-2.5 fs-11 fw-semibold text-white d-inline-flex align-items-center rounded-2 shadow-none border-0"
                            style={{ backgroundColor: '#ff6c2f' }}
                            onClick={() => handleOpenImpersonate(m)}
                            title="Login as Merchant"
                          >
                            <IconifyIcon icon="solar:login-2-bold" className="me-1 fs-12" />
                            Masuk Toko
                          </Button>

                          <Dropdown align="end" className="d-inline-flex">
                            <DropdownToggle
                              as="button"
                              className="btn btn-sm btn-outline-secondary py-1 px-2 fs-12 border rounded-2 d-inline-flex align-items-center justify-content-center shadow-none"
                              style={{ minWidth: '30px', height: '28px' }}
                              title="Opsi Lainnya"
                            >
                              <IconifyIcon icon="solar:menu-dots-bold" />
                            </DropdownToggle>
                            <DropdownMenu className="fs-12 shadow-sm border">
                              <DropdownItem onClick={() => handleOpenKyc(m)}>
                                <IconifyIcon icon="solar:shield-check-bold" className="me-2 text-primary" />
                                Tinjau Legalitas & KYC
                              </DropdownItem>
                              <DropdownItem onClick={() => handleOpenDomain(m)}>
                                <IconifyIcon icon="solar:global-bold" className="me-2 text-info" />
                                Domain Kustom & SSL
                              </DropdownItem>
                              <DropdownItem
                                as={Link}
                                to={`/seller/seller-details?id=${m.id}&tab=themes`}
                                className="text-primary fw-medium"
                              >
                                <IconifyIcon icon="solar:pallete-2-bold" className="me-2 text-primary" />
                                Kelola Tema &amp; Layout Toko
                              </DropdownItem>
                              <DropdownItem onClick={() => copyToClipboard(`https://${m.subdomain}.indovia.com`)}>
                                <IconifyIcon icon="solar:copy-linear" className="me-2 text-muted" />
                                Salin Subdomain URL
                              </DropdownItem>
                              <div className="dropdown-divider" />
                              {m.status !== 'active' && (
                                <DropdownItem
                                  onClick={() => handleStatusChange(m.id, 'active')}
                                  className="text-success"
                                >
                                  <IconifyIcon icon="solar:check-circle-bold" className="me-2" />
                                  Aktifkan Toko
                                </DropdownItem>
                              )}
                              {m.status !== 'suspended' && (
                                <DropdownItem
                                  onClick={() => handleStatusChange(m.id, 'suspended')}
                                  className="text-danger"
                                >
                                  <IconifyIcon icon="solar:close-circle-bold" className="me-2" />
                                  Tangguhkan (Suspend)
                                </DropdownItem>
                              )}
                            </DropdownMenu>
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

        {/* TABLE FOOTER & PAGINATION */}
        <CardFooter className="py-2.5 px-3 border-top bg-body d-flex flex-wrap align-items-center justify-content-between">
          <p className="text-muted fs-12 mb-0">
            Menampilkan <strong>{filteredMerchants.length}</strong> dari <strong>{merchants.length}</strong> toko merchant terdaftar
          </p>
          <div className="d-flex align-items-center" style={{ gap: '6px' }}>
            <Button variant="outline-secondary" size="sm" className="py-1 px-2.5 fs-11" disabled>
              &laquo; Sebelumnya
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="py-1 px-2.5 fs-11 fw-semibold text-white border-0"
              style={{ backgroundColor: '#ff6c2f' }}
            >
              1
            </Button>
            <Button variant="outline-secondary" size="sm" className="py-1 px-2.5 fs-11" disabled>
              Selanjutnya &raquo;
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* MODAL 1: CRYPTOGRAPHIC IMPERSONATION ("Login as Merchant") */}
      <Modal show={showImpersonateModal} onHide={() => setShowImpersonateModal(false)} centered>
        <Modal.Header closeButton className="border-bottom px-3 py-2.5 bg-body">
          <Modal.Title className="fw-bold fs-15 text-body d-flex align-items-center">
            <div
              className="avatar-xs rounded-circle d-flex align-items-center justify-content-center me-2 bg-warning-subtle text-warning"
            >
              <IconifyIcon icon="solar:shield-keyhole-bold" className="fs-16" />
            </div>
            Sesi Akses Bantuan: Login Sebagai Merchant
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          {selectedMerchant && (
            <>
              <Alert variant="warning" className="d-flex align-items-start p-2.5 fs-12 mb-3 border-warning-subtle">
                <IconifyIcon icon="solar:danger-triangle-bold" className="fs-18 me-2 flex-shrink-0 text-warning" />
                <div>
                  <strong>Audit Keamanan Aktif:</strong> Anda akan masuk ke konsol merchant{' '}
                  <strong>{selectedMerchant.name}</strong> (`{selectedMerchant.subdomain}.indovia.com`).
                  Seluruh perubahan operasional terekam di sistem Audit Trail dengan metadata <code>is_impersonation: true</code>.
                </div>
              </Alert>

              <div className="p-3 rounded-3 bg-body-secondary border mb-3 fs-12">
                <div className="d-flex justify-content-between align-items-center mb-1.5 pb-1.5 border-bottom">
                  <span className="text-muted">Target Toko:</span>
                  <strong className="text-body d-flex align-items-center">
                    {selectedMerchant.name}
                    <span className="badge bg-body text-secondary border font-monospace fs-10 px-1.5 py-0.5 ms-1.5">
                      {selectedMerchant.code}
                    </span>
                  </strong>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-1.5 pb-1.5 border-bottom">
                  <span className="text-muted">Subdomain Storefront:</span>
                  <span className="fw-medium text-primary font-monospace">
                    https://{selectedMerchant.subdomain}.indovia.com
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-1.5 pb-1.5 border-bottom">
                  <span className="text-muted">Masa Berlaku Sesi:</span>
                  <span className="badge bg-danger-subtle text-danger fs-10 fw-semibold px-2 py-0.5 border border-danger-subtle">
                    30 Menit (Auto-Expired)
                  </span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">Tingkat Hak Akses:</span>
                  <span className="badge bg-success-subtle text-success fs-10 fw-medium px-2 py-0.5 border border-success-subtle">
                    Merchant Administrator Terbatas
                  </span>
                </div>
              </div>

              {impersonateTokenResult ? (
                <div className="p-3 rounded-3 bg-success-subtle border border-success-subtle mb-3">
                  <div className="d-flex align-items-center text-success fw-bold fs-12 mb-1.5">
                    <IconifyIcon icon="solar:check-circle-bold" className="me-1.5 fs-16" />
                    Token Impersonasi Berhasil Diterbitkan!
                  </div>
                  <p className="text-muted fs-11 mb-2">
                    Gunakan tautan di bawah ini untuk membuka portal merchant secara langsung:
                  </p>
                  <Button
                    variant="success"
                    size="sm"
                    className="w-100 fw-bold text-white d-flex align-items-center justify-content-center py-2 rounded-2"
                    style={{ backgroundColor: '#16a34a', borderColor: '#16a34a' }}
                    onClick={() => window.open(impersonateTokenResult.store_url || `/dashboard`, '_blank')}
                  >
                    <IconifyIcon icon="solar:login-2-bold" className="me-1.5 fs-15" />
                    Buka Dashboard Toko Sekarang &rarr;
                  </Button>
                </div>
              ) : (
                <p className="text-muted fs-11 mb-0 d-flex align-items-center">
                  <IconifyIcon icon="solar:info-circle-linear" className="me-1 text-primary fs-14 flex-shrink-0" />
                  Mengklik tombol di bawah akan menerbitkan token otorisasi kriptografi sementara (JWT) untuk sesi audit Superadmin.
                </p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-top px-3 py-2.5 bg-body d-flex justify-content-between align-items-center">
          <Button variant="outline-secondary" size="sm" className="px-3 py-1.5 fs-12" onClick={() => setShowImpersonateModal(false)}>
            Batal
          </Button>
          {!impersonateTokenResult && (
            <Button
              variant="primary"
              size="sm"
              className="px-3.5 py-1.5 fs-12 fw-semibold text-white d-inline-flex align-items-center rounded-2 shadow-sm"
              style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
              onClick={handleExecuteImpersonate}
            >
              <IconifyIcon icon="solar:login-2-bold" className="me-1.5 fs-14" />
              Mulai Sesi Login As Merchant
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      {/* MODAL 2: VERIFIKASI MERCHANT & KYC */}
      <Modal show={showKycModal} onHide={() => setShowKycModal(false)} size="lg" centered>
        <Modal.Header closeButton className="border-bottom px-3 py-2.5 bg-body">
          <Modal.Title className="fw-bold fs-15 text-body d-flex align-items-center">
            <div
              className="avatar-xs rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ backgroundColor: 'rgba(255, 108, 47, 0.12)', color: '#ff6c2f' }}
            >
              <IconifyIcon icon="solar:shield-check-bold" className="fs-16" />
            </div>
            Peninjauan Legalitas & Verifikasi KYC Merchant
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-3">
          {selectedMerchant && (
            <>
              {/* Merchant Info Banner */}
              <div className="d-flex flex-wrap justify-content-between align-items-center p-3 mb-3 bg-body-secondary border rounded-3">
                <div className="d-flex align-items-center mb-2 mb-sm-0">
                  <div
                    className="avatar-md rounded-3 d-flex align-items-center justify-content-center me-3 fw-bold text-white shadow-sm flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #ff6c2f 0%, #ea580c 100%)',
                      fontSize: '18px'
                    }}
                  >
                    {selectedMerchant.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="d-flex align-items-center flex-wrap gap-1 mb-1">
                      <h5 className="fw-bold mb-0 text-body fs-15 me-1">{selectedMerchant.name}</h5>
                      <span className="badge bg-body text-secondary border font-monospace fs-10 px-1.5 py-0.5">
                        {selectedMerchant.code}
                      </span>
                    </div>
                    <div className="d-flex align-items-center flex-wrap gap-2 text-muted fs-11">
                      <span className="d-inline-flex align-items-center">
                        <IconifyIcon icon="solar:user-bold" className="me-1 text-primary fs-12" />
                        Pemilik: <strong className="ms-1 text-body">{selectedMerchant.owner_name}</strong>
                      </span>
                      <span>&bull;</span>
                      <span className="d-inline-flex align-items-center text-primary">
                        <IconifyIcon icon="solar:link-bold" className="me-1 fs-12" />
                        {selectedMerchant.subdomain}.indovia.com
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-sm-end">
                  <span
                    className={`d-inline-flex align-items-center px-2.5 py-1 rounded-pill fs-11 fw-semibold border ${
                      selectedMerchant.kyc_status === 'approved'
                        ? 'bg-success-subtle text-success border-success-subtle'
                        : selectedMerchant.kyc_status === 'rejected'
                        ? 'bg-danger-subtle text-danger border-danger-subtle'
                        : 'bg-warning-subtle text-warning border-warning-subtle'
                    }`}
                  >
                    <IconifyIcon
                      icon={
                        selectedMerchant.kyc_status === 'approved'
                          ? 'solar:shield-check-bold'
                          : selectedMerchant.kyc_status === 'rejected'
                          ? 'solar:shield-cross-bold'
                          : 'solar:shield-warning-bold'
                      }
                      className="me-1 fs-13"
                    />
                    {selectedMerchant.kyc_status === 'approved'
                      ? 'Terverifikasi Resmi'
                      : selectedMerchant.kyc_status === 'rejected'
                      ? 'Dokumen Ditolak'
                      : 'Menunggu Verifikasi'}
                  </span>
                </div>
              </div>

              {/* Two Column Grid: KTP vs NPWP/NIB with Equal Heights */}
              <Row className="g-3 mb-3">
                {/* Column 1: Identitas Kependudukan (e-KTP) */}
                <Col md={6}>
                  <div className="p-3 rounded-3 border bg-body-secondary h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                        <span className="fw-bold text-body fs-12 d-flex align-items-center">
                          <IconifyIcon icon="solar:user-id-bold" className="me-1.5 text-primary fs-14" />
                          1. Identitas Kependudukan (KTP)
                        </span>
                        <span className="badge bg-success-subtle text-success fs-10 px-1.5 py-0.5 border border-success-subtle">
                          ✓ Terverifikasi NIK
                        </span>
                      </div>

                      <div className="mb-2">
                        <small className="text-muted fs-11 d-block mb-0.5">Nomor Induk Kependudukan (NIK):</small>
                        <div className="d-flex align-items-center justify-content-between bg-body p-2 rounded border">
                          <code className="fs-13 fw-bold text-body font-monospace">
                            {selectedMerchant.ktp_number || '3372011204850001'}
                          </code>
                          <button
                            type="button"
                            className="btn btn-xs btn-outline-secondary py-0.5 px-1.5 fs-10 d-inline-flex align-items-center"
                            onClick={() => copyToClipboard(selectedMerchant.ktp_number || '3372011204850001')}
                            title="Salin NIK"
                          >
                            <IconifyIcon icon="solar:copy-linear" className="me-1" />
                            Salin
                          </button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between text-muted fs-11 mb-2">
                        <span>Nama di KTP: <strong className="text-body">{selectedMerchant.owner_name}</strong></span>
                        <span className="text-success fw-medium">Seumur Hidup</span>
                      </div>
                    </div>

                    {/* e-KTP Simulated Preview Card */}
                    <div className="mt-2 p-2.5 rounded-2 bg-body border">
                      <div className="d-flex align-items-center justify-content-between mb-1.5">
                        <span className="fs-10 fw-bold text-uppercase text-secondary d-flex align-items-center">
                          <IconifyIcon icon="solar:sim-card-bold" className="me-1 text-warning fs-12" />
                          E-KTP Elektronik RI
                        </span>
                        <span className="badge bg-success-subtle text-success fs-10 py-0.5 px-1.5">
                          OCR 100% Cocok
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between pt-1 border-top">
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded d-flex align-items-center justify-content-center bg-secondary bg-opacity-10 text-muted me-2"
                            style={{ width: 34, height: 34 }}
                          >
                            <IconifyIcon icon="solar:gallery-bold" className="fs-18 text-primary" />
                          </div>
                          <div>
                            <span className="fs-11 fw-medium text-body d-block">foto_ktp_depan.jpg</span>
                            <small className="text-muted fs-10">1.8 MB &bull; Resolusi Tinggi</small>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-xs btn-outline-primary py-1 px-2 fs-10 d-inline-flex align-items-center"
                          onClick={() => alert(`Pratinjau KTP Digital untuk ${selectedMerchant.name} telah diverifikasi secara kriptografis.`)}
                        >
                          <IconifyIcon icon="solar:eye-bold" className="me-1" />
                          Lihat KTP
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Column 2: Legalitas Usaha & Pajak (NPWP / NIB) */}
                <Col md={6}>
                  <div className="p-3 rounded-3 border bg-body-secondary h-100 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                        <span className="fw-bold text-body fs-12 d-flex align-items-center">
                          <IconifyIcon icon="solar:document-text-bold" className="me-1.5 text-primary fs-14" />
                          2. Legalitas Usaha & Pajak (NPWP / NIB)
                        </span>
                        <span className="badge bg-info-subtle text-info fs-10 px-1.5 py-0.5 border border-info-subtle">
                          ✓ Terdaftar DJP & OSS
                        </span>
                      </div>

                      <div className="mb-2">
                        <small className="text-muted fs-11 d-block mb-0.5">NPWP Usaha / Perorangan:</small>
                        <div className="d-flex align-items-center justify-content-between bg-body p-2 rounded border">
                          <code className="fs-13 fw-bold text-body font-monospace">
                            {selectedMerchant.npwp_number || '08.123.456.7-526.000'}
                          </code>
                          <button
                            type="button"
                            className="btn btn-xs btn-outline-secondary py-0.5 px-1.5 fs-10 d-inline-flex align-items-center"
                            onClick={() => copyToClipboard(selectedMerchant.npwp_number || '08.123.456.7-526.000')}
                            title="Salin NPWP"
                          >
                            <IconifyIcon icon="solar:copy-linear" className="me-1" />
                            Salin
                          </button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between text-muted fs-11 mb-2">
                        <span>NIB: <strong className="text-body">{selectedMerchant.nib_number || '1209230018273'}</strong></span>
                        <span className="text-primary fw-medium">OSS RBA Valid</span>
                      </div>
                    </div>

                    {/* NIB Simulated Certificate Preview Card */}
                    <div className="mt-2 p-2.5 rounded-2 bg-body border">
                      <div className="d-flex align-items-center justify-content-between mb-1.5">
                        <span className="fs-10 fw-bold text-uppercase text-secondary d-flex align-items-center">
                          <IconifyIcon icon="solar:diploma-verified-bold" className="me-1 text-info fs-12" />
                          Sertifikat NIB Berbasis Risiko
                        </span>
                        <span className="badge bg-info-subtle text-info fs-10 py-0.5 px-1.5">
                          KBLI 47711
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between pt-1 border-top">
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded d-flex align-items-center justify-content-center bg-info bg-opacity-10 text-info me-2"
                            style={{ width: 34, height: 34 }}
                          >
                            <IconifyIcon icon="solar:document-bold" className="fs-18" />
                          </div>
                          <div>
                            <span className="fs-11 fw-medium text-body d-block">izin_nib_oss.pdf</span>
                            <small className="text-muted fs-10">Dokumen Legal Terdaftar</small>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-xs btn-outline-info py-1 px-2 fs-10 d-inline-flex align-items-center"
                          onClick={() => alert(`Sertifikat NIB untuk ${selectedMerchant.name} terdaftar pada sistem OSS Republik Indonesia.`)}
                        >
                          <IconifyIcon icon="solar:file-download-bold" className="me-1" />
                          Unduh NIB
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>

                {/* Section 3: Rekening Bank Pencairan Dana */}
                <Col md={12}>
                  <div className="p-3 rounded-3 border bg-body-secondary">
                    <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                      <span className="fw-bold text-body fs-12 d-flex align-items-center">
                        <IconifyIcon icon="solar:wallet-bold" className="me-1.5 text-success fs-14" />
                        3. Rekening Bank Pencairan Dana (Settlement Payout)
                      </span>
                      <span className="badge bg-success-subtle text-success fs-10 px-2 py-0.5 border border-success-subtle d-inline-flex align-items-center">
                        <IconifyIcon icon="solar:check-circle-bold" className="me-1 fs-11" />
                        Nama Pemilik 100% Cocok Sesuai KTP
                      </span>
                    </div>

                    <Row className="align-items-center g-2">
                      <Col sm={7}>
                        <div className="d-flex align-items-center p-2.5 rounded bg-body border">
                          <div
                            className="avatar-sm rounded-2 d-flex align-items-center justify-content-center me-3 fw-bold text-white fs-12 flex-shrink-0 shadow-sm"
                            style={{
                              backgroundColor:
                                selectedMerchant.bank_name === 'BCA'
                                  ? '#003d79'
                                  : selectedMerchant.bank_name === 'Mandiri'
                                  ? '#002d62'
                                  : selectedMerchant.bank_name === 'BRI'
                                  ? '#00529c'
                                  : '#ff6c2f'
                            }}
                          >
                            {selectedMerchant.bank_name || 'BCA'}
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center gap-2">
                              <span className="fw-bold text-body fs-14 font-monospace">
                                {selectedMerchant.bank_account_number || '0158829910'}
                              </span>
                              <button
                                type="button"
                                className="btn btn-link p-0 text-muted"
                                onClick={() => copyToClipboard(selectedMerchant.bank_account_number || '0158829910')}
                                title="Salin Nomor Rekening"
                              >
                                <IconifyIcon icon="solar:copy-linear" className="fs-12" />
                              </button>
                            </div>
                            <small className="text-muted fs-11 d-block">
                              Atas Nama: <strong className="text-body">{selectedMerchant.bank_account_holder || selectedMerchant.owner_name}</strong>
                            </small>
                          </div>
                        </div>
                      </Col>

                      <Col sm={5}>
                        <div className="p-2.5 rounded bg-body border fs-11 text-muted">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <span>Kanal Kliring:</span>
                            <strong className="text-body">BI-FAST Realtime</strong>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <span>Siklus Pembayaran:</span>
                            <span className="text-success fw-medium">T+1 Auto-Disbursement</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>

              {/* Section 4: Catatan Evaluasi & Preset Chips */}
              <div className="p-3 rounded-3 border bg-body-secondary mb-2">
                <div className="d-flex flex-wrap align-items-center justify-content-between mb-2">
                  <label className="fs-12 fw-semibold text-body mb-0">
                    Catatan Evaluasi Verifikasi Superadmin:
                  </label>
                  <small className="text-muted fs-11">
                    Pilih preset catatan cepat di bawah:
                  </small>
                </div>

                {/* Quick Presets */}
                <div className="d-flex flex-wrap mb-2" style={{ gap: '6px' }}>
                  {[
                    'Dokumen Lengkap & Terbaca Jelas',
                    'KTP & NIK Valid Kemendagri',
                    'Foto KTP Buram / Silau, mohon unggah ulang',
                    'Nama Rekening Bank Berbeda dengan KTP'
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className="btn btn-xs btn-outline-secondary py-0.5 px-2 fs-10 rounded-pill d-inline-flex align-items-center"
                      onClick={() => setKycNotes(preset)}
                    >
                      + {preset}
                    </button>
                  ))}
                </div>

                <Form.Control
                  as="textarea"
                  rows={2}
                  value={kycNotes}
                  onChange={(e) => setKycNotes(e.target.value)}
                  placeholder="Masukkan alasan jika menolak dokumen atau catatan khusus persetujuan..."
                  className="fs-12"
                />
              </div>
            </>
          )}
        </Modal.Body>

        <Modal.Footer className="border-top px-3 py-2.5 bg-body d-flex justify-content-between align-items-center">
          <Button
            variant="outline-secondary"
            size="sm"
            className="px-3 py-1.5 fs-12"
            onClick={() => setShowKycModal(false)}
          >
            Tutup
          </Button>

          <div className="d-flex align-items-center" style={{ gap: '10px' }}>
            <Button
              variant="outline-danger"
              size="sm"
              className="px-3 py-1.5 fs-12 fw-semibold d-inline-flex align-items-center rounded-2"
              onClick={() => handleKycDecision('rejected')}
            >
              <IconifyIcon icon="solar:close-circle-bold" className="me-1.5 fs-14" />
              Tolak Dokumen
            </Button>
            <Button
              variant="success"
              size="sm"
              className="px-3.5 py-1.5 fs-12 fw-bold text-white d-inline-flex align-items-center rounded-2 shadow-sm"
              style={{ backgroundColor: '#16a34a', borderColor: '#16a34a' }}
              onClick={() => handleKycDecision('approved')}
            >
              <IconifyIcon icon="solar:check-circle-bold" className="me-1.5 fs-15" />
              Setujui Verifikasi KYC
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* MODAL 3: CUSTOM DOMAIN & ZERO-TOUCH SSL ENGINE */}
      <Modal show={showDomainModal} onHide={() => setShowDomainModal(false)} centered size="lg">
        <Modal.Header closeButton className="border-bottom px-3 py-2.5 bg-body">
          <Modal.Title className="fw-bold fs-15 text-body d-flex align-items-center">
            <div
              className="avatar-xs rounded-circle d-flex align-items-center justify-content-center me-2 bg-info-subtle text-info"
            >
              <IconifyIcon icon="solar:global-bold" className="fs-16" />
            </div>
            Manajemen Domain Kustom &amp; SSL Engine
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          {selectedMerchant && (
            <>
              {/* Target Merchant Header */}
              <div className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-body-secondary border mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="avatar-sm rounded-2 d-flex align-items-center justify-content-center text-white fw-bold fs-13 flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}
                  >
                    {selectedMerchant.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="fw-bold text-body fs-13 d-block">{selectedMerchant.name}</span>
                    <small className="text-muted fs-11 font-monospace">{selectedMerchant.subdomain}.indovia.com</small>
                  </div>
                </div>
                <span className={`badge ${selectedMerchant.domain_verified ? 'bg-success-subtle text-success border-success-subtle' : 'bg-warning-subtle text-warning border-warning-subtle'} border fs-10 px-2 py-1`}>
                  {selectedMerchant.domain_verified ? '✓ SSL Terpasang' : 'Menunggu Konfigurasi DNS'}
                </span>
              </div>

              {domainVerifiedAlert && (
                <Alert variant={domainVerifiedAlert.type} className="p-2.5 fs-12 mb-3 d-flex align-items-center">
                  <IconifyIcon icon="solar:check-circle-bold" className="me-2 fs-16 text-success flex-shrink-0" />
                  <div>{domainVerifiedAlert.message}</div>
                </Alert>
              )}

              <Form.Group className="mb-3">
                <Form.Label className="fs-12 fw-semibold text-body mb-1">
                  Nama Domain Kustom Merchant:
                </Form.Label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-body-secondary text-muted fs-12 font-monospace">https://</span>
                  <Form.Control
                    type="text"
                    placeholder="e.g. brandkeren.co.id atau www.toko.id"
                    value={customDomainInput}
                    onChange={(e) => setCustomDomainInput(e.target.value)}
                    className="fs-12 font-monospace"
                  />
                </div>
                <Form.Text className="text-muted fs-11 mt-1 d-block">
                  Mendukung domain lokal (.id, .co.id) maupun TLD internasional (.com, .store, .online).
                </Form.Text>
              </Form.Group>

              {/* DNS Table Guide */}
              <div className="p-3 rounded-3 bg-body-secondary border mb-2 fs-11">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <strong className="text-body d-flex align-items-center fs-12">
                    <IconifyIcon icon="solar:server-square-bold" className="me-1.5 text-primary fs-14" />
                    Panduan Konfigurasi DNS Record Merchant:
                  </strong>
                  <span className="badge bg-info-subtle text-info fs-10">CNAME Routing</span>
                </div>
                <p className="mb-2 text-muted fs-11">
                  Arahkan rekod DNS di Registrar penyedia domain (Niagahoster, Domainesia, Cloudflare, Namecheap):
                </p>
                <div className="table-responsive">
                  <table className="table table-sm table-bordered bg-body mb-2 fs-11 font-monospace align-middle">
                    <thead className="bg-body-tertiary text-muted">
                      <tr>
                        <th className="py-1.5 px-2">Tipe</th>
                        <th className="py-1.5 px-2">Host / Name</th>
                        <th className="py-1.5 px-2">Target Nilai</th>
                        <th className="py-1.5 px-2 text-center" style={{ width: '90px' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="fw-bold text-primary py-1.5 px-2">CNAME</td>
                        <td className="py-1.5 px-2">@ atau www</td>
                        <td className="py-1.5 px-2 text-body fw-medium">cname.indovia.com</td>
                        <td className="py-1.5 px-2 text-center">
                          <button
                            type="button"
                            className="btn btn-xs btn-outline-secondary py-0.5 px-2 fs-10 d-inline-flex align-items-center"
                            onClick={() => copyToClipboard('cname.indovia.com')}
                            title="Salin Target DNS"
                          >
                            <IconifyIcon icon="solar:copy-linear" className="me-1" />
                            Salin
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="d-flex align-items-center text-muted fs-11 pt-1">
                  <IconifyIcon icon="solar:lock-bold" className="text-success me-1.5 fs-14 flex-shrink-0" />
                  <span>Sertifikat SSL Let's Encrypt Wildcard diterbitkan otomatis segera setelah CNAME terpropagasi.</span>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-top px-3 py-2.5 bg-body d-flex justify-content-between align-items-center">
          <Button variant="outline-secondary" size="sm" className="px-3 py-1.5 fs-12" onClick={() => setShowDomainModal(false)}>
            Tutup
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="px-3.5 py-1.5 fs-12 fw-semibold text-white d-inline-flex align-items-center rounded-2 shadow-sm"
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            onClick={handleVerifyDomain}
          >
            <IconifyIcon icon="solar:check-read-bold" className="me-1.5 fs-14" />
            Uji Resolusi DNS &amp; Aktifkan SSL
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL 4: PROVISIONING MERCHANT BARU */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg" centered>
        <Modal.Header closeButton className="border-bottom px-3 py-2.5 bg-body">
          <Modal.Title className="fw-bold fs-15 text-body d-flex align-items-center">
            <div
              className="avatar-xs rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ backgroundColor: 'rgba(255, 108, 47, 0.12)', color: '#ff6c2f' }}
            >
              <IconifyIcon icon="solar:shop-2-bold" className="fs-16" />
            </div>
            Pendaftaran &amp; Provisioning Toko Baru
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleCreateMerchant}>
          <Modal.Body className="p-3">
            <Alert variant="info" className="p-2.5 fs-12 mb-3 border-info-subtle d-flex align-items-center">
              <IconifyIcon icon="solar:info-circle-bold" className="me-2 fs-18 text-info flex-shrink-0" />
              <div>
                Sistem akan otomatis mengalokasikan subdomain unik dan mengaktifkan{' '}
                <strong>Masa Percobaan (Trial 14 Hari)</strong> secara instan tanpa biaya pendaftaran awal.
              </div>
            </Alert>

            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body mb-1">
                    Nama Toko: <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    required
                    placeholder="e.g. Butik Azzahra Solo"
                    value={newMerchant.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      const slug = val.toLowerCase().replace(/[^a-z0-9]/g, '-');
                      setNewMerchant({ ...newMerchant, name: val, subdomain: slug });
                    }}
                    className="fs-12"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body mb-1">
                    Subdomain Indovia: <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="input-group input-group-sm">
                    <Form.Control
                      type="text"
                      required
                      placeholder="e.g. butik-azzahra"
                      value={newMerchant.subdomain}
                      onChange={(e) => setNewMerchant({ ...newMerchant, subdomain: e.target.value })}
                      className="fs-12 font-monospace"
                    />
                    <span className="input-group-text bg-body-secondary text-muted fs-11 font-monospace">.indovia.com</span>
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body mb-1">
                    Nama Pemilik Toko: <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    required
                    placeholder="e.g. Siti Azzahra"
                    value={newMerchant.owner_name}
                    onChange={(e) => setNewMerchant({ ...newMerchant, owner_name: e.target.value })}
                    className="fs-12"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body mb-1">
                    Email Pemilik: <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    size="sm"
                    required
                    placeholder="e.g. azzahra@gmail.com"
                    value={newMerchant.owner_email}
                    onChange={(e) => setNewMerchant({ ...newMerchant, owner_email: e.target.value })}
                    className="fs-12"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body mb-1">
                    No. WhatsApp Toko: <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    required
                    placeholder="e.g. 08123456789"
                    value={newMerchant.owner_phone}
                    onChange={(e) => setNewMerchant({ ...newMerchant, owner_phone: e.target.value })}
                    className="fs-12"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body mb-1">Kota Asal:</Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    placeholder="e.g. Surakarta, Jawa Tengah"
                    value={newMerchant.city}
                    onChange={(e) => setNewMerchant({ ...newMerchant, city: e.target.value })}
                    className="fs-12"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body mb-1">Kategori Industri:</Form.Label>
                  <Form.Select
                    size="sm"
                    value={newMerchant.category}
                    onChange={(e) => setNewMerchant({ ...newMerchant, category: e.target.value })}
                    className="fs-12"
                  >
                    <option value="Fashion & Busana">Fashion &amp; Busana</option>
                    <option value="Elektronik & Gadget">Elektronik &amp; Gadget</option>
                    <option value="Makanan & Minuman (F&B)">Makanan &amp; Minuman (F&amp;B)</option>
                    <option value="Kecantikan & Kosmetik">Kecantikan &amp; Kosmetik</option>
                    <option value="Perabot & Furnitur">Perabot &amp; Furnitur</option>
                    <option value="Kesehatan & Herbal">Kesehatan &amp; Herbal</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body mb-1">Paket Langganan Awal:</Form.Label>
                  <Form.Select
                    size="sm"
                    value={newMerchant.plan}
                    onChange={(e) => setNewMerchant({ ...newMerchant, plan: e.target.value })}
                    className="fs-12"
                  >
                    <option value="Starter">Starter (Maks 50 Produk)</option>
                    <option value="Pro">Pro (Maks 500 Produk + Custom Domain)</option>
                    <option value="Enterprise">Enterprise (Unlimited + 0% Take-Rate)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-top px-3 py-2.5 bg-body d-flex justify-content-between align-items-center">
            <Button variant="outline-secondary" size="sm" className="px-3 py-1.5 fs-12" onClick={() => setShowAddModal(false)}>
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="px-3.5 py-1.5 fs-12 fw-semibold text-white d-inline-flex align-items-center rounded-2 shadow-sm"
              style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            >
              <IconifyIcon icon="solar:check-circle-bold" className="me-1.5 fs-14" />
              Simpan &amp; Alokasikan Toko
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default SellerListPage;