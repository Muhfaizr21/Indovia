import FallbackLoading from '@/components/FallbackLoading';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/Preloader';
import { lazy, Suspense, useLayoutEffect } from 'react';
import { useLayoutContext } from '@/context/useLayoutContext';
// Lazy-load admin (superadmin) SCSS chunk — only bundled with admin routes.
// Landing pages never load this file.
const AdminStyles = lazy(() => import('@/assets/scss/admin-styles'));
const VerticalNavigationBar = lazy(() => import('@/components/layout/VerticalNavigationBar/page'));
const TopNavigationBar = lazy(() => import('@/components/layout/TopNavigationBar/page'));
const AdminLayout = ({
  children
}) => {
  const { theme, topbarTheme, menu } = useLayoutContext();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // 1. Clean up residual landing page attributes and inline styles
    root.removeAttribute('data-theme');
    root.style.removeProperty('color-scheme');
    root.style.removeProperty('background-color');

    body.removeAttribute('data-theme');
    body.style.removeProperty('color-scheme');
    body.style.removeProperty('background-color');
    body.style.removeProperty('color');

    // 2. Remove lingering landing page CSS links if present
    const landingStyle = document.getElementById('landing-template-style');
    if (landingStyle) landingStyle.remove();
    const landingFix = document.getElementById('landing-fix-style');
    if (landingFix) landingFix.remove();

    // 3. Ensure all admin stylesheets are enabled
    document.querySelectorAll('[data-landing-disabled="true"]').forEach(el => {
      el.disabled = false;
      el.removeAttribute('data-landing-disabled');
    });

    // 4. Force synchronization of active theme on both <html> and <body>
    const activeTheme = theme || 'light';
    root.setAttribute('data-bs-theme', activeTheme);
    body.setAttribute('data-bs-theme', activeTheme);
    root.setAttribute('data-topbar-color', topbarTheme || activeTheme);
    root.setAttribute('data-menu-color', menu?.theme || activeTheme);
  }, [theme, topbarTheme, menu?.theme]);

  return <div className="wrapper">
      <Suspense fallback={null}>
        <AdminStyles />
      </Suspense>
      <Suspense fallback={<FallbackLoading />}>
        <TopNavigationBar />
      </Suspense>

      <Suspense fallback={<FallbackLoading />}>
        <VerticalNavigationBar />
      </Suspense>

      <div className="page-content">
        <div className="container-fluid">
          <Suspense fallback={<Preloader />}>{children}</Suspense>
        </div>

        <Footer />
      </div>
    </div>;
};
export default AdminLayout;