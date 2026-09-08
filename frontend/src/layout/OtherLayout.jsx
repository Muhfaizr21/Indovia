import Preloader from '@/components/Preloader';
import { Suspense, lazy, useLayoutEffect } from 'react';
// Auth / other pages use the admin design system.
const AuthAdminStyles = lazy(() => import('@/assets/scss/admin-styles'));

const OtherLayout = ({
  children
}) => {
  useLayoutEffect(() => {
    // 1. Clean up landing template stylesheet links if any
    const landingStyle = document.getElementById('landing-template-style');
    if (landingStyle) landingStyle.remove();
    const fixStyle = document.getElementById('landing-fix-style');
    if (fixStyle) fixStyle.remove();

    // 2. Re-enable admin stylesheets
    document.querySelectorAll('[data-landing-disabled="true"]').forEach(el => {
      el.disabled = false;
      el.removeAttribute('data-landing-disabled');
    });
  }, []);

  return <>
      <Suspense fallback={null}>
        <AuthAdminStyles />
      </Suspense>
      <Suspense fallback={<Preloader />}>{children}</Suspense>
    </>;
};
export default OtherLayout;