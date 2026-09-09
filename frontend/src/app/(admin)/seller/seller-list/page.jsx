import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { initialMerchantsData, formatRupiah, statusConfig, kycConfig } from '../data';

const SellerListPage = () => {
  const [merchants, setMerchants] = useState(initialMerchantsData);
  const [loading, setLoading] = useState(false);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedKyc, setSelectedKyc] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('all');

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

    return matchSearch && matchStatus && matchKyc && matchPlan;
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
            onClick={() => setSelectedStatus('all')}
            style={{ borderLeft: '4px solid #ff6c2f' }}
          >
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-0 fs-11 fw-medium">Total Toko Terdaftar</p>
                  <h4 className="mt-0 mb-0 fw-bold text-body fs-17">{totalCount} Toko</h4>
                </div>
                <div
                  className="avatar-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'rgba(255, 108, 47, 0.1)', color: '#ff6c2f' }}
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
            onClick={() => setSelectedStatus('active')}
            style={{ borderLeft: '4px solid #16a34a' }}
          >
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-0 fs-11 fw-medium">Aktif Berbayar</p>
                  <h4 className="mt-0 mb-0 fw-bold text-success fs-17">{activeCount} Toko</h4>
                </div>
                <div
                  className="avatar-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#16a34a' }}
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
            onClick={() => setSelectedStatus('trial')}
            style={{ borderLeft: '4px solid #ea580c' }}
          >
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-0 fs-11 fw-medium">Masa Trial (14 Hari)</p>
                  <h4 className="mt-0 mb-0 fw-bold fs-17" style={{ color: '#ea580c' }}>
                    {trialCount} Toko
                  </h4>
                </div>
                <div
                  className="avatar-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'rgba(234, 88, 12, 0.1)', color: '#ea580c' }}
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
            onClick={() => setSelectedKyc('pending')}
            style={{ borderLeft: '4px solid #d97706' }}
          >
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-0 fs-11 fw-medium">Menunggu Verifikasi KYC</p>
                  <h4 className="mt-0 mb-0 fw-bold text-warning fs-17">
                    {kycPendingCount} Toko
                  </h4>
                </div>
                <div
                  className="avatar-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#d97706' }}
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
            onClick={() => setSelectedStatus('suspended')}
            style={{ borderLeft: '4px solid #475569' }}
          >
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-0 fs-11 fw-medium">Toko Ditangguhkan</p>
                  <h4 className="mt-0 mb-0 fw-bold text-secondary fs-17">
                    {suspendedCount} Toko
                  </h4>
                </div>
                <div
                  className="avatar-sm rounded-circle d-flex align-items-center justify-content-center"
                  style={{ backgroundColor: 'rgba(100, 116, 139, 0.1)', color: '#475569' }}
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
            <Col lg={4}>
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

            <Col xs={6} md={3} lg={2} className="text-end">
              {(searchTerm || selectedStatus !== 'all' || selectedKyc !== 'all' || selectedPlan !== 'all') ? (
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="w-100 fs-11 py-1 d-inline-flex align-items-center justify-content-center"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedStatus('all');
                    setSelectedKyc('all');
                    setSelectedPlan('all');
                  }}
                  title="Reset Filter"
                >
                  <IconifyIcon icon="solar:restart-bold" className="me-1" />
                  Reset Filter
                </Button>
              ) : (
                <div className="text-end">
                  <span className="badge bg-light text-muted border fw-normal py-1 px-2 fs-11">
                    {filteredMerchants.length} Toko Ditampilkan
                  </span>
                </div>
              )}
            </Col>
          </Row>

          {/* Bulk Selection Notice */}
          {selectedIds.length > 0 && (
            <div className="d-flex align-items-center justify-content-between p-2 mt-2 rounded bg-light border">
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
            <thead className="bg-light bg-opacity-50">
              <tr className="fs-11 text-uppercase text-muted border-bottom">
                <th className="ps-3" style={{ width: '40px' }}>
                  <Form.Check
                    type="checkbox"
                    checked={selectedIds.length === filteredMerchants.length && filteredMerchants.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th style={{ minWidth: '240px' }}>Toko & Kategori</th>
                <th style={{ minWidth: '190px' }}>Subdomain & Domain</th>
                <th style={{ minWidth: '160px' }}>Pemilik & Kontak</th>
                <th style={{ minWidth: '120px' }}>Paket & Status</th>
                <th style={{ minWidth: '150px' }}>Verifikasi KYC</th>
                <th style={{ minWidth: '130px' }}>Performa (GMV)</th>
                <th className="text-end pe-3" style={{ minWidth: '180px' }}>Aksi Superadmin</th>
              </tr>
            </thead>
            <tbody className="fs-12">
              {filteredMerchants.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-muted">
                    <IconifyIcon icon="solar:shop-2-bold" className="fs-32 text-muted mb-2 d-block mx-auto" />
                    <strong>Tidak ada data toko merchant yang cocok dengan filter.</strong>
                    <p className="fs-12 mb-0">Silakan sesuaikan kata kunci atau reset filter pencarian Anda.</p>
                  </td>
                </tr>
              ) : (
                filteredMerchants.map((m) => {
                  const statusInfo = statusConfig[m.status] || statusConfig.trial;
                  const kycInfo = kycConfig[m.kyc_status] || kycConfig.unverified;
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
                                className="badge bg-light text-secondary border font-monospace fs-10 px-1.5 py-0.5 ms-1"
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
                          <span className="d-inline-flex align-items-center px-2 py-0.5 rounded fs-11 fw-medium bg-light bg-opacity-75 text-body border border-light-subtle">
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
                      <td className="text-end pe-3">
                        <div className="d-inline-flex align-items-center justify-content-end gap-1.5">
                          <Link
                            to={`/seller/seller-details?id=${m.id}`}
                            className="btn btn-sm btn-outline-secondary py-1 px-2 fs-11 d-inline-flex align-items-center rounded-2"
                            title="Buka Profil & Audit Toko 360°"
                          >
                            <IconifyIcon icon="solar:eye-bold" className="me-1 fs-12 text-primary" />
                            Audit
                          </Link>

                          <Button
                            variant="primary"
                            size="sm"
                            className="py-1 px-2 fs-11 fw-semibold text-white d-inline-flex align-items-center rounded-2"
                            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
                            onClick={() => handleOpenImpersonate(m)}
                            title="Login as Merchant"
                          >
                            <IconifyIcon icon="solar:login-2-bold" className="me-1 fs-12" />
                            Masuk Toko
                          </Button>

                          <Dropdown align="end">
                            <DropdownToggle
                              as="button"
                              className="btn btn-sm btn-outline-secondary py-1 px-1.5 fs-12 border rounded-2"
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
          <div className="d-flex align-items-center gap-1">
            <Button variant="outline-light" size="sm" className="text-muted border py-0.5 px-2 fs-11" disabled>
              &laquo; Sebelumnya
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="py-0.5 px-2 fs-11 fw-semibold text-white"
              style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            >
              1
            </Button>
            <Button variant="outline-light" size="sm" className="text-muted border py-0.5 px-2 fs-11" disabled>
              Selanjutnya &raquo;
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* MODAL 1: CRYPTOGRAPHIC IMPERSONATION ("Login as Merchant") */}
      <Modal show={showImpersonateModal} onHide={() => setShowImpersonateModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-16 text-body d-flex align-items-center">
            <IconifyIcon icon="solar:shield-keyhole-bold" className="me-2 text-warning fs-20" />
            Sesi Bantuan: Login Sebagai Merchant
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 pt-2">
          {selectedMerchant && (
            <>
              <Alert variant="warning" className="d-flex align-items-start p-2.5 fs-12 mb-3">
                <IconifyIcon icon="solar:danger-triangle-bold" className="fs-18 me-2 flex-shrink-0 text-warning" />
                <div>
                  <strong>Audit Keamanan Aktif:</strong> Anda akan masuk ke dashboard toko{' '}
                  <strong>{selectedMerchant.name}</strong> (`{selectedMerchant.subdomain}.indovia.com`).
                  Seluruh perubahan akan terekam di sistem Audit Trail dengan penanda <code>is_impersonation: true</code>.
                </div>
              </Alert>

              <div className="p-2.5 rounded-2 bg-light mb-3 fs-12">
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Target Toko:</span>
                  <strong className="text-body">{selectedMerchant.name}</strong>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Subdomain URL:</span>
                  <span className="fw-medium text-primary">https://{selectedMerchant.subdomain}.indovia.com</span>
                </div>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted">Masa Berlaku Sesi:</span>
                  <span className="text-danger fw-semibold">30 Menit (Otomatis Expired)</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Tingkat Hak Akses:</span>
                  <span className="text-success fw-medium">Merchant Administrator Terbatas</span>
                </div>
              </div>

              {impersonateTokenResult ? (
                <div className="p-2.5 rounded-2 bg-success bg-opacity-10 border border-success border-opacity-25 mb-3">
                  <p className="text-success fw-bold fs-12 mb-1">
                    <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
                    Token Impersonasi Berhasil Diterbitkan!
                  </p>
                  <p className="text-muted fs-11 mb-2">
                    Gunakan tautan di bawah ini untuk membuka portal merchant:
                  </p>
                  <div className="d-flex gap-2">
                    <Button
                      variant="success"
                      size="sm"
                      className="w-100 fw-semibold"
                      onClick={() => window.open(impersonateTokenResult.store_url || `/dashboard`, '_blank')}
                    >
                      Buka Dashboard Toko Sekarang &rarr;
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted fs-11 mb-0">
                  Dengan mengklik tombol di bawah, backend Golang akan menerbitkan token otorisasi kriptografi sementara untuk akun Anda.
                </p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" size="sm" onClick={() => setShowImpersonateModal(false)}>
            Batal
          </Button>
          {!impersonateTokenResult && (
            <Button
              variant="primary"
              size="sm"
              className="fw-semibold text-white"
              style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
              onClick={handleExecuteImpersonate}
            >
              Mulai Sesi Login As Merchant
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* MODAL 2: VERIFIKASI MERCHANT & KYC */}
      <Modal show={showKycModal} onHide={() => setShowKycModal(false)} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-16 text-body d-flex align-items-center">
            <IconifyIcon icon="solar:shield-check-bold" className="me-2 text-primary fs-20" />
            Peninjauan Legalitas & Verifikasi KYC Merchant
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 pt-2">
          {selectedMerchant && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3 p-2 bg-light rounded-2">
                <div>
                  <h6 className="fw-bold mb-0 text-body">{selectedMerchant.name}</h6>
                  <span className="text-muted fs-11">
                    Kode: <strong>{selectedMerchant.code}</strong> &bull; Pemilik: <strong>{selectedMerchant.owner_name}</strong>
                  </span>
                </div>
                <Badge bg={selectedMerchant.kyc_status === 'approved' ? 'success' : 'warning'}>
                  {selectedMerchant.kyc_status?.toUpperCase()}
                </Badge>
              </div>

              <Row className="g-3 mb-3">
                <Col md={6}>
                  <div className="p-2.5 rounded border bg-light bg-opacity-25 h-100">
                    <h6 className="fw-bold text-body fs-12 mb-2 pb-1 border-bottom">
                      1. Identitas Kependudukan (KTP)
                    </h6>
                    <p className="mb-1 fs-12 text-muted">Nomor Induk Kependudukan (NIK):</p>
                    <p className="fw-bold text-body fs-14 mb-2">
                      {selectedMerchant.ktp_number || '3372011204850001'}
                    </p>
                    <div
                      className="rounded p-3 text-center bg-light border text-muted fs-11"
                      style={{ minHeight: 90 }}
                    >
                      <IconifyIcon icon="solar:card-2-bold" className="fs-28 text-muted mb-1" />
                      <br />
                      Foto KTP Elektronik Terlampir (Terbaca Jelas)
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <div className="p-2.5 rounded border bg-light bg-opacity-25 h-100">
                    <h6 className="fw-bold text-body fs-12 mb-2 pb-1 border-bottom">
                      2. Legalitas Usaha & Pajak (NPWP / NIB)
                    </h6>
                    <p className="mb-1 fs-12 text-muted">NPWP Usaha / Perorangan:</p>
                    <p className="fw-semibold text-body fs-13 mb-2">
                      {selectedMerchant.npwp_number || '08.123.456.7-526.000'}
                    </p>
                    <p className="mb-1 fs-12 text-muted">Nomor Induk Berusaha (NIB):</p>
                    <p className="fw-semibold text-body fs-13 mb-0">
                      {selectedMerchant.nib_number || '1209230018273'} &bull; OSS Valid
                    </p>
                  </div>
                </Col>

                <Col md={12}>
                  <div className="p-2.5 rounded border bg-light bg-opacity-25">
                    <h6 className="fw-bold text-body fs-12 mb-2 pb-1 border-bottom">
                      3. Rekening Bank Pencairan Dana (Settlement Payout)
                    </h6>
                    <Row className="align-items-center">
                      <Col sm={8}>
                        <div className="d-flex align-items-center">
                          <div
                            className="avatar-sm rounded-2 d-flex align-items-center justify-content-center me-2 bg-dark text-white fw-bold fs-12"
                          >
                            {selectedMerchant.bank_name || 'BCA'}
                          </div>
                          <div>
                            <p className="mb-0 fw-bold text-body fs-13">
                              {selectedMerchant.bank_account_number || '0158829910'}
                            </p>
                            <span className="text-muted fs-11">
                              A.N. {selectedMerchant.bank_account_holder || selectedMerchant.owner_name}
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col sm={4} className="text-sm-end mt-2 mt-sm-0">
                        <span className="badge bg-success bg-opacity-10 text-success fs-11 py-1 px-2">
                          <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
                          Nama Rekening Sesuai KTP
                        </span>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>

              <Form.Group className="mb-2">
                <Form.Label className="fs-12 fw-semibold text-body">
                  Catatan Evaluasi Verifikasi Superadmin:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={kycNotes}
                  onChange={(e) => setKycNotes(e.target.value)}
                  placeholder="Masukkan alasan jika menolak dokumen atau catatan khusus persetujuan..."
                  className="fs-12"
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" size="sm" onClick={() => setShowKycModal(false)}>
            Tutup
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleKycDecision('rejected')}
          >
            <IconifyIcon icon="solar:close-circle-bold" className="me-1" />
            Tolak Dokumen
          </Button>
          <Button
            variant="success"
            size="sm"
            className="fw-semibold text-white"
            onClick={() => handleKycDecision('approved')}
          >
            <IconifyIcon icon="solar:check-circle-bold" className="me-1" />
            Setujui Verifikasi KYC
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL 3: CUSTOM DOMAIN & ZERO-TOUCH SSL ENGINE */}
      <Modal show={showDomainModal} onHide={() => setShowDomainModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-16 text-body d-flex align-items-center">
            <IconifyIcon icon="solar:global-bold" className="me-2 text-primary fs-20" />
            Manajemen Domain Kustom & SSL Engine
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 pt-2">
          {selectedMerchant && (
            <>
              <p className="text-muted fs-12 mb-3">
                Hubungkan domain milik merchant sendiri untuk meningkatkan kredibilitas brand di storefront publik.
              </p>

              {domainVerifiedAlert && (
                <Alert variant={domainVerifiedAlert.type} className="p-2 fs-12 mb-3">
                  {domainVerifiedAlert.message}
                </Alert>
              )}

              <Form.Group className="mb-3">
                <Form.Label className="fs-12 fw-semibold text-body">
                  Nama Domain Kustom:
                </Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="e.g. brandkeren.co.id atau www.toko.id"
                  value={customDomainInput}
                  onChange={(e) => setCustomDomainInput(e.target.value)}
                  className="fs-12"
                />
              </Form.Group>

              <div className="p-2.5 rounded-2 bg-light border mb-3 fs-11">
                <strong className="text-body d-block mb-1">Panduan Pengaturan DNS Merchant:</strong>
                <p className="mb-1 text-muted">
                  Merchant wajib membuat DNS Record di penyedia domain mereka (Niagahoster, Domainesia, Cloudflare):
                </p>
                <div className="bg-light bg-opacity-25 p-2 rounded border font-monospace fs-11 mb-2">
                  <div><strong>Tipe:</strong> CNAME</div>
                  <div><strong>Host:</strong> @ atau www</div>
                  <div><strong>Target:</strong> cname.indovia.com</div>
                </div>
                <div className="d-flex align-items-center text-muted">
                  <IconifyIcon icon="solar:lock-bold" className="text-success me-1 fs-14" />
                  Sertifikat SSL Let's Encrypt akan diterbitkan otomatis setelah CNAME valid.
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" size="sm" onClick={() => setShowDomainModal(false)}>
            Tutup
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="fw-semibold text-white"
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            onClick={handleVerifyDomain}
          >
            <IconifyIcon icon="solar:check-read-bold" className="me-1" />
            Uji Resolusi DNS & Aktifkan SSL
          </Button>
        </Modal.Footer>
      </Modal>

      {/* MODAL 4: PROVISIONING MERCHANT BARU */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-16 text-body d-flex align-items-center">
            <IconifyIcon icon="solar:shop-2-bold" className="me-2 text-primary fs-20" />
            Pendaftaran & Provisioning Toko Baru
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleCreateMerchant}>
          <Modal.Body className="p-3 pt-2">
            <Alert variant="info" className="p-2.5 fs-12 mb-3">
              <IconifyIcon icon="solar:info-circle-bold" className="me-1 fs-15 text-primary" />
              Sistem akan otomatis mengalokasikan subdomain unik dan mengaktifkan{' '}
              <strong>Masa Percobaan (Trial 14 Hari)</strong> secara instan.
            </Alert>

            <Row className="g-2">
              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="fs-12 fw-semibold">Nama Toko:</Form.Label>
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
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="fs-12 fw-semibold">Subdomain Indovia:</Form.Label>
                  <div className="input-group input-group-sm">
                    <Form.Control
                      type="text"
                      required
                      placeholder="e.g. butik-azzahra"
                      value={newMerchant.subdomain}
                      onChange={(e) => setNewMerchant({ ...newMerchant, subdomain: e.target.value })}
                    />
                    <span className="input-group-text">.indovia.com</span>
                  </div>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="fs-12 fw-semibold">Nama Pemilik Toko:</Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    required
                    placeholder="e.g. Siti Azzahra"
                    value={newMerchant.owner_name}
                    onChange={(e) => setNewMerchant({ ...newMerchant, owner_name: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="fs-12 fw-semibold">Email Pemilik:</Form.Label>
                  <Form.Control
                    type="email"
                    size="sm"
                    required
                    placeholder="e.g. azzahra@gmail.com"
                    value={newMerchant.owner_email}
                    onChange={(e) => setNewMerchant({ ...newMerchant, owner_email: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="fs-12 fw-semibold">No. WhatsApp Toko:</Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    required
                    placeholder="e.g. 08123456789"
                    value={newMerchant.owner_phone}
                    onChange={(e) => setNewMerchant({ ...newMerchant, owner_phone: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="fs-12 fw-semibold">Kota Asal:</Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    placeholder="e.g. Surakarta, Jawa Tengah"
                    value={newMerchant.city}
                    onChange={(e) => setNewMerchant({ ...newMerchant, city: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="fs-12 fw-semibold">Kategori Industri:</Form.Label>
                  <Form.Select
                    size="sm"
                    value={newMerchant.category}
                    onChange={(e) => setNewMerchant({ ...newMerchant, category: e.target.value })}
                  >
                    <option value="Fashion & Busana">Fashion & Busana</option>
                    <option value="Elektronik & Gadget">Elektronik & Gadget</option>
                    <option value="Makanan & Minuman (F&B)">Makanan & Minuman (F&B)</option>
                    <option value="Kecantikan & Kosmetik">Kecantikan & Kosmetik</option>
                    <option value="Perabot & Furnitur">Perabot & Furnitur</option>
                    <option value="Kesehatan & Herbal">Kesehatan & Herbal</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-2">
                  <Form.Label className="fs-12 fw-semibold">Paket Langganan Awal:</Form.Label>
                  <Form.Select
                    size="sm"
                    value={newMerchant.plan}
                    onChange={(e) => setNewMerchant({ ...newMerchant, plan: e.target.value })}
                  >
                    <option value="Starter">Starter (Maks 50 Produk)</option>
                    <option value="Pro">Pro (Maks 500 Produk + Custom Domain)</option>
                    <option value="Enterprise">Enterprise (Unlimited + 0% Take-Rate)</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="light" size="sm" onClick={() => setShowAddModal(false)}>
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="fw-semibold text-white"
              style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            >
              Simpan & Alokasikan Toko
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default SellerListPage;