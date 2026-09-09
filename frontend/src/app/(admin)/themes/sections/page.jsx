import { useState, useMemo } from 'react';
import { Row, Col, Card, CardBody, Badge, Button, Form, Table, Toast, ToastContainer } from 'react-bootstrap';
import PageTitle from '@/components/PageTitle';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { initialSections } from '../data';
import SectionSchemaModal from '../components/SectionSchemaModal';
import SectionKillSwitchModal from '../components/SectionKillSwitchModal';

const ModularSectionRegistryPage = () => {
  const [sections, setSections] = useState(initialSections);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Modals state
  const [schemaSection, setSchemaSection] = useState(null);
  const [killSwitchSection, setKillSwitchSection] = useState(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, variant = 'success') => {
    setToastMessage({ msg, variant });
  };

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(sections.map((s) => s.category));
    return ['ALL', ...Array.from(set)];
  }, [sections]);

  // Filtered sections
  const filteredSections = useMemo(() => {
    return sections.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = selectedCategory === 'ALL' || s.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [sections, searchTerm, selectedCategory]);

  // Statistics
  const stats = useMemo(() => {
    const total = sections.length;
    const active = sections.filter((s) => s.isEnabled).length;
    const disabled = sections.filter((s) => !s.isEnabled).length;
    const totalUsage = sections.reduce((acc, curr) => acc + curr.activeUsageCount, 0);
    return { total, active, disabled, totalUsage };
  }, [sections]);

  // Save updated schema
  const handleSaveSchema = (updatedSection) => {
    setSections((prev) =>
      prev.map((s) => (s.key === updatedSection.key ? updatedSection : s))
    );
    showToast(`JSON Schema untuk ${updatedSection.name} berhasil diperbarui!`, 'success');
  };

  // Confirm Kill-Switch / Toggle
  const handleConfirmKillSwitch = (sectionKey, nextState) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.key === sectionKey) {
          showToast(
            `Modul ${s.name} berhasil ${nextState ? 'DIAKTIFKAN KEMBALI' : 'DIMATIKAN SECARA GLOBAL (Kill-Switch)'}!`,
            nextState ? 'success' : 'danger'
          );
          return { ...s, isEnabled: nextState };
        }
        return s;
      })
    );
  };

  // Quick toggle merchant override allowance
  const handleToggleMerchantOverride = (sectionKey) => {
    setSections((prev) =>
      prev.map((s) => {
        if (s.key === sectionKey) {
          const next = !s.allowMerchantToggle;
          showToast(
            `Hak akses toggle toko untuk ${s.name} ${next ? 'DIIZINKAN' : 'DIKUNCI (Hanya Superadmin)'}!`,
            next ? 'info' : 'warning'
          );
          return { ...s, allowMerchantToggle: next };
        }
        return s;
      })
    );
  };

  return (
    <>
      <PageTitle title="Registri Seksi Moduler &amp; Fitur Storefront" subName="Tema &amp; Tata Letak" />

      {/* TOAST NOTIFICATION */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        {toastMessage && (
          <Toast
            onClose={() => setToastMessage(null)}
            show={!!toastMessage}
            delay={3500}
            autohide
            bg={toastMessage.variant}
          >
            <Toast.Header className="text-dark">
              <IconifyIcon icon="solar:bell-bing-bold" className="me-2" />
              <strong className="me-auto">Seksi &amp; Schema Registry</strong>
              <small>Baru saja</small>
            </Toast.Header>
            <Toast.Body className="text-white fw-medium">{toastMessage.msg}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>

      {/* KPI METRIC CARDS */}
      <Row className="g-3 mb-4">
        {/* Total Sections */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Total Modul Terdaftar</span>
                  <h3 className="text-body fw-bold my-1">{stats.total} Seksi</h3>
                  <small className="text-success fw-medium">
                    <IconifyIcon icon="solar:layers-minimalistic-bold" className="me-1" />
                    9 Master Blok + 3 Layout Ext
                  </small>
                </div>
                <div className="avatar-md bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:widget-5-bold-duotone" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Active Running */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Modul Aktif Global</span>
                  <h3 className="text-success fw-bold my-1">{stats.active} Aktif</h3>
                  <small className="text-muted">Tersedia di builder seluruh merchant</small>
                </div>
                <div className="avatar-md bg-success-subtle text-success rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:check-circle-bold-duotone" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Inactive / Kill Switch */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Emergency Kill-Switch</span>
                  <h3 className={stats.disabled > 0 ? 'text-danger fw-bold my-1' : 'text-muted fw-bold my-1'}>
                    {stats.disabled} Dinonaktifkan
                  </h3>
                  <small className="text-muted">Dimatikan global karena maintenance</small>
                </div>
                <div className="avatar-md bg-danger-subtle text-danger rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:power-bold-duotone" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Total Usage Adoption */}
        <Col sm={6} xl={3}>
          <Card className="border-secondary-subtle h-100 shadow-sm">
            <CardBody className="p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted fs-12 fw-semibold text-uppercase">Total Adopsi Merchant</span>
                  <h3 className="text-primary fw-bold my-1">{stats.totalUsage.toLocaleString('id-ID')}</h3>
                  <small className="text-muted">Instance blok aktif di etalase toko</small>
                </div>
                <div className="avatar-md bg-info-subtle text-info rounded-3 d-flex align-items-center justify-content-center flex-shrink-0">
                  <IconifyIcon icon="solar:chart-square-bold-duotone" className="fs-28" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* FILTER & SEARCH BAR */}
      <Card className="border-secondary-subtle mb-4">
        <CardBody className="p-3">
          <Row className="g-3 align-items-center">
            <Col md={6} lg={5}>
              <div className="position-relative">
                <Form.Control
                  type="search"
                  placeholder="Cari modul, kode seksi, kategori, dependensi sistem..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="ps-4 border-secondary-subtle fs-13"
                />
                <IconifyIcon
                  icon="solar:magnifer-linear"
                  className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted fs-16"
                />
              </div>
            </Col>

            <Col md={6} lg={4}>
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border-secondary-subtle fs-13"
              >
                <option value="ALL">Semua Kategori Modul ({sections.length})</option>
                {categories
                  .filter((c) => c !== 'ALL')
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </Form.Select>
            </Col>

            <Col lg={3} className="text-lg-end">
              <span className="text-muted fs-12">
                Menampilkan <strong className="text-body">{filteredSections.length}</strong> dari {sections.length} modul
              </span>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* SECTIONS REGISTRY TABLE */}
      <Card className="border-secondary-subtle">
        <CardBody className="p-0">
          <div className="table-responsive">
            <Table hover className="table-nowrap mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="fs-12 fw-semibold text-uppercase py-3 ps-3" style={{ minWidth: '300px' }}>
                    Modul Seksi &amp; Kunci Sistem
                  </th>
                  <th className="fs-12 fw-semibold text-uppercase py-3">Kategori</th>
                  <th className="fs-12 fw-semibold text-uppercase py-3">Toko Terpasang</th>
                  <th className="fs-12 fw-semibold text-uppercase py-3">Dependensi &amp; Latensi</th>
                  <th className="fs-12 fw-semibold text-uppercase py-3 text-center">Saklar Global (ON/OFF)</th>
                  <th className="fs-12 fw-semibold text-uppercase py-3 text-center">Hak Akses Toko</th>
                  <th className="fs-12 fw-semibold text-uppercase text-end py-3 pe-3">Aksi Superadmin</th>
                </tr>
              </thead>
              <tbody>
                {filteredSections.map((sec) => {
                  return (
                    <tr key={sec.key} className={!sec.isEnabled ? 'table-danger-subtle' : ''}>
                      {/* Section Name & Key */}
                      <td className="py-3 ps-3">
                        <span className="fw-bold text-body fs-13 d-block mb-1">{sec.name}</span>
                        <div className="d-flex align-items-center gap-2">
                          <span className="badge bg-secondary-subtle text-secondary font-monospace fs-10 border">
                            {sec.key}
                          </span>
                          <span className="text-muted fs-11">code: {sec.code}</span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3">
                        <Badge bg="primary-subtle" className="text-primary border border-primary-subtle fs-11 px-2.5 py-1">
                          {sec.category}
                        </Badge>
                      </td>

                      {/* Merchant Usage Count */}
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-1.5">
                          <IconifyIcon icon="solar:shop-2-bold" className="text-muted fs-16" />
                          <strong className="text-body fs-13">{sec.activeUsageCount}</strong>
                          <span className="text-muted fs-11">toko</span>
                        </div>
                      </td>

                      {/* System Dependency & Latency */}
                      <td className="py-3">
                        <span className="fs-12 text-body fw-semibold d-block mb-1">{sec.systemDependency}</span>
                        <span className="badge bg-body-secondary text-secondary fs-10 font-monospace border">
                          {sec.latencyRating}
                        </span>
                      </td>

                      {/* Global Kill Switch Toggle */}
                      <td className="py-3 text-center">
                        <div className="d-inline-flex flex-column align-items-center">
                          <Badge
                            bg={sec.isEnabled ? 'success' : 'danger'}
                            className="fs-10 px-2.5 py-1 mb-1 shadow-sm"
                          >
                            {sec.isEnabled ? 'LIVE AKTIF' : 'KILLED / OFF'}
                          </Badge>
                          <Button
                            size="sm"
                            variant={sec.isEnabled ? 'outline-danger' : 'outline-success'}
                            className="py-0 px-2 fs-10 fw-semibold"
                            onClick={() => setKillSwitchSection(sec)}
                            title={sec.isEnabled ? 'Matikan modul secara darurat' : 'Aktifkan kembali modul'}
                          >
                            {sec.isEnabled ? 'Matikan (Kill)' : 'Nyalakan'}
                          </Button>
                        </div>
                      </td>

                      {/* Allow Merchant Toggle */}
                      <td className="py-3 text-center">
                        <div className="d-inline-flex flex-column align-items-center">
                          <Badge
                            bg={sec.allowMerchantToggle ? 'info-subtle' : 'warning-subtle'}
                            className={sec.allowMerchantToggle ? 'text-info border border-info-subtle fs-10 px-2 py-0.5 mb-1' : 'text-warning border border-warning-subtle fs-10 px-2 py-0.5 mb-1'}
                          >
                            {sec.allowMerchantToggle ? 'Merchant Bebas ON/OFF' : 'Terkunci Superadmin'}
                          </Badge>
                          <Form.Check
                            type="switch"
                            id={`override-${sec.key}`}
                            checked={sec.allowMerchantToggle}
                            onChange={() => handleToggleMerchantOverride(sec.key)}
                            title="Klik untuk mengubah izin toggle di dashboard toko"
                          />
                        </div>
                      </td>

                      {/* Action CTA */}
                      <td className="text-end py-3 pe-3">
                        <div className="d-inline-flex align-items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            className="fs-11 fw-semibold d-inline-flex align-items-center py-1.5 px-3"
                            onClick={() => setSchemaSection(sec)}
                            title="Buka editor batasan parameter JSON Schema default"
                          >
                            <IconifyIcon icon="solar:code-file-bold" className="me-1 fs-14" />
                            Edit JSON Schema
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* MODALS */}
      <SectionSchemaModal
        show={!!schemaSection}
        onHide={() => setSchemaSection(null)}
        section={schemaSection}
        onSave={handleSaveSchema}
      />

      <SectionKillSwitchModal
        show={!!killSwitchSection}
        onHide={() => setKillSwitchSection(null)}
        section={killSwitchSection}
        onConfirmToggle={handleConfirmKillSwitch}
      />
    </>
  );
};

export default ModularSectionRegistryPage;
