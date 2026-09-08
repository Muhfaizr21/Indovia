// import Preloader from '@/components/Preloader'
import Preloader from '@/components/Preloader';
import { Suspense, lazy } from 'react';
// Auth / other pages use the admin design system.
const AuthAdminStyles = lazy(() => import('@/assets/scss/admin-styles'));
const OtherLayout = ({
  children
}) => {
  return <>
      <Suspense fallback={null}>
        <AuthAdminStyles />
      </Suspense>
      <Suspense fallback={<Preloader />}>{children}</Suspense>
    </>;
};
export default OtherLayout;