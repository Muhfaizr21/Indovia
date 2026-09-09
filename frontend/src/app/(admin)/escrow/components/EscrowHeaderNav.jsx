// src/app/(admin)/escrow/components/EscrowHeaderNav.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

const EscrowHeaderNav = ({ activeKey: forcedActiveKey }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveKey = () => {
    if (forcedActiveKey) return forcedActiveKey;
    const path = location.pathname;
    if (path.includes('/escrow/gateway-hub')) return 'gateway-hub';
    if (path.includes('/escrow/ledger')) return 'ledger';
    if (path.includes('/escrow/disbursements')) return 'disbursements';
    return 'dashboard';
  };

  const currentKey = getActiveKey();

  const navItems = [
    {
      key: 'dashboard',
      label: 'Dashboard & Arus Escrow',
      route: '/escrow',
      icon: 'solar:shield-dollar-bold-duotone',
      badge: 'Live Cockpit',
      badgeClass: 'bg-primary-subtle text-primary',
    },
    {
      key: 'gateway-hub',
      label: 'Master Payment Gateway Hub',
      route: '/escrow/gateway-hub',
      icon: 'solar:server-square-bold-duotone',
      badge: '14 Kanal Aktif',
      badgeClass: 'bg-success-subtle text-success',
    },
    {
      key: 'ledger',
      label: 'Buku Besar Saldo Merchant',
      route: '/escrow/ledger',
      icon: 'solar:book-bookmark-bold-duotone',
      badge: 'Triple-Balance',
      badgeClass: 'bg-info-subtle text-info',
    },
    {
      key: 'disbursements',
      label: 'Pencairan Dana (Disbursement)',
      route: '/escrow/disbursements',
      icon: 'solar:hand-money-bold-duotone',
      badge: '3 Butuh 2FA',
      badgeClass: 'bg-warning-subtle text-warning',
    },
  ];

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body p-2">
        <Nav variant="pills" className="nav-fill flex-column flex-sm-row gap-1">
          {navItems.map((item) => {
            const isActive = currentKey === item.key;
            return (
              <Nav.Item key={item.key}>
                <Nav.Link
                  active={isActive}
                  onClick={() => navigate(item.route)}
                  className={`d-flex align-items-center justify-content-center py-2 px-3 fw-semibold cursor-pointer rounded-2 transition-all ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-body-secondary hover-bg-body-secondary'
                  }`}
                  style={{
                    backgroundColor: isActive ? '#ff6c2f' : 'transparent',
                    borderColor: isActive ? '#ff6c2f' : 'transparent',
                  }}
                >
                  <IconifyIcon icon={item.icon} className="fs-18 me-2" />
                  <span className="fs-13">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`badge ms-2 fs-10 fw-medium px-2 py-1 rounded-pill ${
                        isActive ? 'bg-white text-dark' : item.badgeClass
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </Nav>
      </div>
    </div>
  );
};

export default EscrowHeaderNav;
