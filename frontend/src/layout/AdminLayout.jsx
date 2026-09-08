import FallbackLoading from '@/components/FallbackLoading';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/Preloader';
import { lazy, Suspense } from 'react';
// Lazy-load admin (superadmin) SCSS chunk — only bundled with admin routes.
// Landing pages never load this file.
const AdminStyles = lazy(() => import('@/assets/scss/admin-styles'));
const VerticalNavigationBar = lazy(() => import('@/components/layout/VerticalNavigationBar/page'));
const TopNavigationBar = lazy(() => import('@/components/layout/TopNavigationBar/page'));
const AdminLayout = ({
  children
}) => {
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