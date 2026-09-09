import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { useLayoutContext } from '@/context/useLayoutContext';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
const LeftSideBarToggle = () => {
  const {
    menu: {
      size
    },
    changeMenu: {
      size: changeMenuSize
    },
    toggleBackdrop
  } = useLayoutContext();
  const pathname = useLocation();
  const isFirstRender = useRef(true);
  const handleMenuSize = () => {
    if (window.innerWidth <= 1140) {
      toggleBackdrop();
    } else {
      // Desktop: toggle between default and condensed
      if (size === 'condensed') {
        changeMenuSize('default');
      } else if (size === 'default') {
        changeMenuSize('condensed');
      } else if (size === 'hidden') {
        changeMenuSize('default');
        const htmlTag = document.getElementsByTagName('html')[0];
        if (htmlTag?.classList.contains('sidebar-enable')) {
          htmlTag.classList.remove('sidebar-enable');
        }
      } else {
        changeMenuSize('condensed');
      }
    }
  };
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else if (window.innerWidth <= 1140 && size === 'hidden') {
      const htmlTag = document.getElementsByTagName('html')[0];
      if (htmlTag?.classList.contains('sidebar-enable')) {
        toggleBackdrop();
      }
    }
  }, [pathname]);
  return <div className="topbar-item">
      <button type="button" onClick={handleMenuSize} className="button-toggle-menu me-2">
        <IconifyIcon icon="solar:hamburger-menu-broken" className="fs-24 align-middle" />
      </button>
    </div>;
};
export default LeftSideBarToggle;