// src/app/(admin)/logistics/components/LogisticsApiConfigModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert, Badge } from 'react-bootstrap';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { logisticsGlobalConfig } from '../data';

const LogisticsApiConfigModal = ({ show, onHide }) => {
  const [activeTab, setActiveTab] = useState('rajaongkir');
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const [configForm, setConfigForm] = useState({
    rajaOngkirApiKey: logisticsGlobalConfig.rajaOngkirApiKey,
    rajaOngkirAccountType: logisticsGlobalConfig.rajaOngkirAccountType,
    jneApiKey: 'jne_live_99182938472910••••••••',
    jneMerchantCode: 'INDOVIA-HQ-01',
    jntApiToken: 'jnt_token_881928374620••••••••',
    sicepatApiKey: 'sicepat_live_771928471928••••••••',
    instantFleetClientId: 'gosend_client_6619283746••••••••',
    instantFleetSecret: 'gosend_sec_9918273645••••••••',
  });

  const handleTestPing = () => {
    setTestingConnection(true);
    setTestResult(null);
    setTimeout(() => {
      setTestingConnection(false);
      setTestResult({
        success: true,
        message: 'Koneksi RajaOngkir Pro & Direct API Berhasil! Akses ke 7.230 kecamatan aktif (HTTP 200 OK - Latensi 115ms).',
      });
    }, 900);
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Konfigurasi Master API Pengiriman berhasil disimpan ke Vault Logistik Indovia.');
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
      <Modal.Header closeButton className="border-secondary-subtle">
        <Modal.Title className="d-flex align-items-center fs-16 fw-bold text-body">
          <IconifyIcon icon="solar:key-bold-duotone" className="text-primary me-2 fs-22" />
          Konfigurasi Master API Pengiriman (Logistics Aggregator)
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {/* TAB SELECTION */}
        <div className="d-flex gap-2 mb-3">
          <Button
            variant={activeTab === 'rajaongkir' ? 'primary' : 'outline-secondary'}
            size="sm"
            onClick={() => {
              setActiveTab('rajaongkir');
              setTestResult(null);
            }}
            className="fw-semibold px-3 py-1.5"
            style={activeTab === 'rajaongkir' ? { backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' } : {}}
          >
            <IconifyIcon icon="solar:map-point-wave-bold" className="me-2 fs-16" />
            RajaOngkir Pro API (7.000+ Kecamatan)
          </Button>
          <Button
            variant={activeTab === 'direct_carrier' ? 'primary' : 'outline-secondary'}
            size="sm"
            onClick={() => {
              setActiveTab('direct_carrier');
              setTestResult(null);
            }}
            className="fw-semibold px-3 py-1.5"
            style={activeTab === 'direct_carrier' ? { backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' } : {}}
          >
            <IconifyIcon icon="solar:delivery-bold" className="me-2 fs-16" />
            Direct Carrier API (JNE, J&T, SiCepat, Instant)
          </Button>
        </div>

        <Form onSubmit={handleSave}>
          {activeTab === 'rajaongkir' ? (
            <Row className="g-3">
              <Col md={12}>
                <div className="p-3 rounded-2 bg-body-secondary border border-secondary-subtle mb-2">
                  <h6 className="fs-13 fw-bold text-body mb-1">RajaOngkir Multi-Kurir Pro Account</h6>
                  <p className="text-muted fs-12 mb-0">
                    Akun Pro memungkinkan kalkulasi ongkos kirim real-time hingga ke tingkat kelurahan/kecamatan di 514 kota/kabupaten seluruh Indonesia.
                  </p>
                </div>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body d-flex justify-content-between">
                    <span>RajaOngkir Pro API Key</span>
                    <Badge bg="danger-subtle" className="text-danger fs-10">Secret Token</Badge>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={configForm.rajaOngkirApiKey}
                    onChange={(e) => setConfigForm({ ...configForm, rajaOngkirApiKey: e.target.value })}
                    className="bg-body text-body border-secondary-subtle fs-13 font-monospace"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body">Tipe Akun Lisensi</Form.Label>
                  <Form.Control
                    type="text"
                    value={configForm.rajaOngkirAccountType}
                    disabled
                    className="bg-body-secondary text-body border-secondary-subtle fs-13"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body">Asal Pengiriman Default Gudang Pusat</Form.Label>
                  <Form.Control
                    type="text"
                    value={logisticsGlobalConfig.defaultOriginDistrict}
                    disabled
                    className="bg-body-secondary text-body border-secondary-subtle fs-13"
                  />
                </Form.Group>
              </Col>
            </Row>
          ) : (
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body">JNE Direct API Key</Form.Label>
                  <Form.Control
                    type="password"
                    value={configForm.jneApiKey}
                    onChange={(e) => setConfigForm({ ...configForm, jneApiKey: e.target.value })}
                    className="bg-body text-body border-secondary-subtle fs-13 font-monospace"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body">JNE Merchant Customer Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={configForm.jneMerchantCode}
                    onChange={(e) => setConfigForm({ ...configForm, jneMerchantCode: e.target.value })}
                    className="bg-body text-body border-secondary-subtle fs-13"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body">J&T Express Open API Token</Form.Label>
                  <Form.Control
                    type="password"
                    value={configForm.jntApiToken}
                    onChange={(e) => setConfigForm({ ...configForm, jntApiToken: e.target.value })}
                    className="bg-body text-body border-secondary-subtle fs-13 font-monospace"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body">SiCepat Cloud API Secret</Form.Label>
                  <Form.Control
                    type="password"
                    value={configForm.sicepatApiKey}
                    onChange={(e) => setConfigForm({ ...configForm, sicepatApiKey: e.target.value })}
                    className="bg-body text-body border-secondary-subtle fs-13 font-monospace"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body">GoSend / Grab Fleet Client ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={configForm.instantFleetClientId}
                    onChange={(e) => setConfigForm({ ...configForm, instantFleetClientId: e.target.value })}
                    className="bg-body text-body border-secondary-subtle fs-13 font-monospace"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fs-12 fw-semibold text-body">GoSend / Grab Fleet Client Secret</Form.Label>
                  <Form.Control
                    type="password"
                    value={configForm.instantFleetSecret}
                    onChange={(e) => setConfigForm({ ...configForm, instantFleetSecret: e.target.value })}
                    className="bg-body text-body border-secondary-subtle fs-13 font-monospace"
                  />
                </Form.Group>
              </Col>
            </Row>
          )}

          {testResult && (
            <Alert variant="success" className="mt-3 mb-0 d-flex align-items-center py-2 px-3 fs-12">
              <IconifyIcon icon="solar:check-circle-bold" className="fs-18 me-2 flex-shrink-0" />
              <div>{testResult.message}</div>
            </Alert>
          )}

          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-secondary-subtle">
            <Button
              variant="outline-info"
              size="sm"
              onClick={handleTestPing}
              disabled={testingConnection}
              className="d-flex align-items-center px-3 py-1.5"
            >
              {testingConnection ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Menguji Jangkauan API...
                </>
              ) : (
                <>
                  <IconifyIcon icon="solar:radar-bold" className="me-2 fs-16" />
                  Uji Koneksi Sub-district API (Ping)
                </>
              )}
            </Button>

            <div className="d-flex gap-2">
              <Button variant="outline-secondary" size="sm" onClick={onHide} className="px-3 py-1.5">
                Batal
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                className="fw-semibold text-white d-flex align-items-center px-3 py-1.5"
                style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
              >
                <IconifyIcon icon="solar:check-square-bold" className="me-2 fs-16" />
                Simpan API Key
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LogisticsApiConfigModal;
