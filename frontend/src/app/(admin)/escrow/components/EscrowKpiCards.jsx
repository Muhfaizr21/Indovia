// src/app/(admin)/escrow/components/EscrowKpiCards.jsx
import React from 'react';
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { formatRupiah } from '../data';

const EscrowKpiCards = ({ kpi }) => {
  const navigate = useNavigate();

  // Dynamic kpi from backend PostgreSQL database
  const totalEscrow = kpi?.formatted_total_escrow || formatRupiah(kpi?.total_escrow_balance ?? 0);
  const available = kpi?.formatted_available || formatRupiah(kpi?.available_balance ?? 0);
  const pending = kpi?.formatted_pending || formatRupiah(kpi?.pending_balance ?? 0);
  const locked = kpi?.formatted_locked || formatRupiah(kpi?.locked_balance ?? 0);
  const platformFee = kpi?.formatted_platform_fee || formatRupiah(kpi?.platform_fee_accumulated ?? 0);

  return (
    <Row className="g-3 mb-4">
      {/* KPI 1: Total Dana Escrow Penampungan */}
      <Col sm={6} xl>
        <Card
          className="border-0 shadow-sm h-100 cursor-pointer transition-all hover-shadow"
          style={{ borderLeft: '4px solid #6366f1' }}
          onClick={() => navigate('/escrow')}
          title="Klik untuk melihat Detail Arus Escrow"
        >
          <CardBody className="p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-1 fs-12 fw-medium">Dana Escrow Mengendap</p>
                <h4 className="mt-0 mb-1 fw-bold text-body fs-18">
                  {totalEscrow}
                </h4>
                <small className="text-info fw-semibold fs-11 d-flex align-items-center">
                  <IconifyIcon icon="solar:shield-check-bold" className="me-1 fs-12" />
                  Rekening BCA &amp; Mandiri
                </small>
              </div>
              <div
                className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                style={{ backgroundColor: 'rgba(99, 102, 241, 0.12)', color: '#6366f1' }}
              >
                <IconifyIcon icon="solar:vault-bold-duotone" className="fs-24" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* KPI 2: Saldo Available (Siap Dicairkan) */}
      <Col sm={6} xl>
        <Card
          className="border-0 shadow-sm h-100 cursor-pointer transition-all hover-shadow"
          style={{ borderLeft: '4px solid #16a34a' }}
          onClick={() => navigate('/escrow/disbursements')}
          title="Klik untuk membuka Antrean Pencairan Dana"
        >
          <CardBody className="p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-1 fs-12 fw-medium">Saldo Siap Cair (Available)</p>
                <h4 className="mt-0 mb-1 fw-bold text-success fs-18">
                  {available}
                </h4>
                <small className="text-muted fs-11 d-flex align-items-center">
                  <IconifyIcon icon="solar:check-circle-bold" className="me-1 fs-12 text-success" />
                  Delivered / 2x24 Jam Auto
                </small>
              </div>
              <div
                className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                style={{ backgroundColor: 'rgba(22, 163, 74, 0.12)', color: '#16a34a' }}
              >
                <IconifyIcon icon="solar:wallet-money-bold-duotone" className="fs-24" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* KPI 3: Saldo Pending (In-Transit Ekspedisi) */}
      <Col sm={6} xl>
        <Card
          className="border-0 shadow-sm h-100 cursor-pointer transition-all hover-shadow"
          style={{ borderLeft: '4px solid #f59e0b' }}
          onClick={() => navigate('/escrow/ledger')}
          title="Klik untuk membuka Buku Besar Saldo Merchant"
        >
          <CardBody className="p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-1 fs-12 fw-medium">Saldo Pending (In-Transit)</p>
                <h4 className="mt-0 mb-1 fw-bold text-warning fs-18">
                  {pending}
                </h4>
                <small className="text-muted fs-11 d-flex align-items-center">
                  <IconifyIcon icon="solar:box-minimalistic-bold" className="me-1 fs-12 text-warning" />
                  Dalam Kiriman Kurir
                </small>
              </div>
              <div
                className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' }}
              >
                <IconifyIcon icon="solar:delivery-bold-duotone" className="fs-24" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* KPI 4: Dana Sengketa Dibekukan (Locked) */}
      <Col sm={6} xl>
        <Card
          className="border-0 shadow-sm h-100 cursor-pointer transition-all hover-shadow"
          style={{ borderLeft: '4px solid #ef4444' }}
          onClick={() => navigate('/escrow/ledger')}
          title="Klik untuk melihat Daftar Merchant dengan Saldo Locked"
        >
          <CardBody className="p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-1 fs-12 fw-medium">Dana Beku Sengketa (Locked)</p>
                <h4 className="mt-0 mb-1 fw-bold text-danger fs-18">
                  {locked}
                </h4>
                <small className="text-danger fw-semibold fs-11 d-flex align-items-center">
                  <IconifyIcon icon="solar:lock-keyhole-bold" className="me-1 fs-12" />
                  Dispute Buyer Protection
                </small>
              </div>
              <div
                className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}
              >
                <IconifyIcon icon="solar:lock-password-unlocked-bold-duotone" className="fs-24" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* KPI 5: Akumulasi Fee Komisi SaaS Indovia */}
      <Col sm={6} xl>
        <Card
          className="border-0 shadow-sm h-100 cursor-pointer transition-all hover-shadow"
          style={{ borderLeft: '4px solid #ff6c2f' }}
          onClick={() => navigate('/billing/take-rate')}
          title="Klik untuk membuka Halaman Take-Rate &amp; Monetisasi SaaS"
        >
          <CardBody className="p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="text-muted mb-1 fs-12 fw-medium">Komisi SaaS Indovia (Fee)</p>
                <h4 className="mt-0 mb-1 fw-bold text-body fs-18">
                  {platformFee}
                </h4>
                <small className="text-success fw-semibold fs-11 d-flex align-items-center">
                  <IconifyIcon icon="solar:chart-square-bold" className="me-1 fs-12" />
                  Take-Rate Platform
                </small>
              </div>
              <div
                className="avatar-md rounded-circle d-flex align-items-center justify-content-center"
                style={{ backgroundColor: 'rgba(255, 108, 47, 0.12)', color: '#ff6c2f' }}
              >
                <IconifyIcon icon="solar:dollar-minimalistic-bold-duotone" className="fs-24" />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default EscrowKpiCards;
