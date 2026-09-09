import { Suspense, useLayoutEffect, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from '@/components/Preloader';
import { loadLandingVendorScripts, initLandingInteractions } from '@/landing/landingUtils';

/**
 * Watcher component placed INSIDE Suspense.
 * Triggers interactive component initializations as soon as the lazy page chunk mounts into the DOM!
 */
const LandingContentWatcher = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    loadLandingVendorScripts().then(() => {
      if (!isMounted) return;

      const triggerInit = () => {
        if (isMounted) {
          initLandingInteractions();
        }
      };

      // Staggered initialization to account for DOM paint, fonts, and images
      triggerInit();
      const t1 = setTimeout(triggerInit, 80);
      const t2 = setTimeout(triggerInit, 250);
      const t3 = setTimeout(triggerInit, 600);

      // Mutation observer to automatically initialize dynamically added or swapped content
      const observer = new MutationObserver(() => {
        const uninitSwiper = document.querySelector('.swiper-container:not(.swiper-container-initialized)');
        const uninitSlick = document.querySelector('.product-image-slider:not(.slick-initialized), .slider-nav-thumbnails:not(.slick-initialized)');
        const uninitCountdown = document.querySelector('[data-countdown]:empty');
        const uninitFilter = document.querySelector('.btn-open-filter:not([data-filter-bound])');
        if ((uninitSwiper || uninitSlick || uninitCountdown || uninitFilter) && isMounted) {
          triggerInit();
        }
      });

      const wrapper = document.querySelector('.landing-wrapper');
      if (wrapper) {
        observer.observe(wrapper, { childList: true, subtree: true });
      }

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        observer.disconnect();
      };
    });

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  return <>{children}</>;
};

const LandingLayout = ({ children }) => {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // 1. Force explicit Light Theme & Pure White Background to prevent Dark Mode bleeding
    const prevTheme = root.getAttribute('data-bs-theme');
    const prevMenuColor = root.getAttribute('data-menu-color');
    const prevTopbarColor = root.getAttribute('data-topbar-color');

    root.setAttribute('data-bs-theme', 'light');
    root.setAttribute('data-theme', 'light');
    root.style.setProperty('color-scheme', 'light', 'important');
    root.style.setProperty('background-color', '#ffffff', 'important');

    body.setAttribute('data-bs-theme', 'light');
    body.style.setProperty('color-scheme', 'light', 'important');
    body.style.setProperty('background-color', '#ffffff', 'important');
    body.style.setProperty('color', '#111111', 'important');

    // 2. Disable Admin & Dashboard SCSS/CSS tags in dev mode to guarantee isolation
    const styleId = 'landing-template-style';
    const fixStyleId = 'landing-fix-style';

    const disableAdminStyles = () => {
      // Dev mode: Vite injected admin stylesheets
      document.querySelectorAll('style[data-vite-dev-id]').forEach(el => {
        const id = el.getAttribute('data-vite-dev-id') || '';
        // Only disable styles belonging to admin dashboard
        if (id.includes('/scss/') || id.includes('admin') || id.includes('app.scss')) {
          if (!el.hasAttribute('data-landing-disabled')) {
            el.disabled = true;
            el.setAttribute('data-landing-disabled', 'true');
          }
        }
      });

      // Prod mode: Admin <link rel="stylesheet">
      document.querySelectorAll('link[rel="stylesheet"]').forEach(el => {
        if (el.id !== styleId && el.id !== fixStyleId && !el.href.includes('googleapis') && !el.hasAttribute('data-landing-disabled')) {
          if (el.href.includes('admin') || el.href.includes('app.')) {
            el.disabled = true;
            el.setAttribute('data-landing-disabled', 'true');
          }
        }
      });
    };

    const enableAdminStyles = () => {
      document.querySelectorAll('[data-landing-disabled="true"]').forEach(el => {
        el.disabled = false;
        el.removeAttribute('data-landing-disabled');
      });
    };

    disableAdminStyles();

    // 3. Inject Indovia Landing Template Stylesheet
    let link = document.getElementById(styleId);
    if (!link) {
      link = document.createElement('link');
      link.id = styleId;
      link.rel = 'stylesheet';
      link.href = '/assets/css/style.css';
      document.head.appendChild(link);
    }

    // 4. Inject Landing Custom Layout & Isolation Fixes
    let fixLink = document.getElementById(fixStyleId);
    if (!fixLink) {
      fixLink = document.createElement('link');
      fixLink.id = fixStyleId;
      fixLink.rel = 'stylesheet';
      fixLink.href = '/assets/css/landing-fix.css';
      document.head.appendChild(fixLink);
    }

    return () => {
      // Cleanup styles on unmount
      const existing = document.getElementById(styleId);
      if (existing) existing.remove();

      const existingFix = document.getElementById(fixStyleId);
      if (existingFix) existingFix.remove();

      // Reset inline isolation styles
      root.style.removeProperty('color-scheme');
      root.style.removeProperty('background-color');
      body.style.removeProperty('color-scheme');
      body.style.removeProperty('background-color');
      body.style.removeProperty('color');

      // Restore previous admin styles and theme attributes
      enableAdminStyles();
      root.removeAttribute('data-theme');
      body.removeAttribute('data-theme');
      body.removeAttribute('data-bs-theme');

      if (prevTheme) {
        root.setAttribute('data-bs-theme', prevTheme);
        body.setAttribute('data-bs-theme', prevTheme);
      } else {
        root.removeAttribute('data-bs-theme');
        body.removeAttribute('data-bs-theme');
      }

      if (prevMenuColor) root.setAttribute('data-menu-color', prevMenuColor);
      else root.removeAttribute('data-menu-color');

      if (prevTopbarColor) root.setAttribute('data-topbar-color', prevTopbarColor);
      else root.removeAttribute('data-topbar-color');
    };
  }, []);

  return (
    <div className="landing-wrapper">
      <Suspense fallback={<Preloader />}>
        <LandingContentWatcher>
          {children}
        </LandingContentWatcher>
      </Suspense>
    </div>
  );
};

export default LandingLayout;
