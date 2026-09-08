import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar as BsNavbar, Nav, Button } from 'react-bootstrap';
import { useLayoutContext } from '@/context/useLayoutContext';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import logoSm from '@/assets/images/logo-sm.png';
import logoDark from '@/assets/images/logo-dark.png';
import logoLight from '@/assets/images/logo-light.png';
import { navLinks } from '../data';

const Navbar = () => {
  const { theme, changeTheme } = useLayoutContext();
  const [expanded, setExpanded] = useState(false);

  const toggleTheme = () => {
    changeTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <BsNavbar
      expand="lg"
      sticky="top"
      expanded={expanded}
      className="py-3 landing-navbar shadow-sm"
      style={{
        backdropFilter: 'blur(12px)',
        backgroundColor: theme === 'dark' ? 'rgba(30, 38, 48, 0.88)' : 'rgba(255, 255, 255, 0.92)',
        borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease'
      }}
    >
      <Container>
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 me-4">
          <img src={logoSm} alt="Larkon Logo" width={32} height={30} />
          <img
            src={theme === 'dark' ? logoLight : logoDark}
            alt="Larkon"
            height={24}
            className="d-none d-sm-inline-block"
          />
        </Link>

        <BsNavbar.Toggle
          aria-controls="landing-nav"
          onClick={() => setExpanded(!expanded)}
          className="border-0 shadow-none"
        >
          <IconifyIcon
            icon={expanded ? 'solar:close-circle-bold' : 'solar:hamburger-menu-bold'}
            className="fs-24"
          />
        </BsNavbar.Toggle>

        <BsNavbar.Collapse id="landing-nav">
          <Nav className="mx-auto mb-2 mb-lg-0 gap-lg-2">
            {navLinks.map((item, idx) => (
              <Nav.Link
                key={idx}
                href={item.href}
                onClick={() => setExpanded(false)}
                className="fw-medium px-3 text-body"
                style={{ transition: 'color 0.2s ease' }}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {/* Theme Toggle Button */}
            <Button
              variant="light"
              size="sm"
              onClick={toggleTheme}
              className="btn-icon rounded-circle d-flex align-items-center justify-content-center p-2"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              style={{ width: 40, height: 40 }}
            >
              <IconifyIcon
                icon={theme === 'dark' ? 'solar:sun-2-bold-duotone' : 'solar:moon-stars-bold-duotone'}
                className={`fs-20 ${theme === 'dark' ? 'text-warning' : 'text-primary'}`}
              />
            </Button>

            {/* Auth Link */}
            <Link to="/auth/sign-in" className="btn btn-outline-secondary px-3 py-2 fw-medium">
              Masuk
            </Link>

            {/* Go to Dashboard CTA */}
            <Link
              to="/dashboard"
              className="btn btn-primary px-3 py-2 fw-medium d-flex align-items-center gap-1 shadow-sm"
            >
              <span>Dashboard Admin</span>
              <IconifyIcon icon="solar:arrow-right-line-duotone" className="fs-18" />
            </Link>
          </div>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
