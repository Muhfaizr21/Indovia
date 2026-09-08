import logoDark from '@/assets/images/logo-dark.png';
import logoLight from '@/assets/images/logo-light.png';
import logoSm from '@/assets/images/logo-sm.png';
import { Link } from 'react-router-dom';
const LogoBox = () => {
  return <div className="logo-box">
      <Link to="/" className="logo-dark">
        <img src={logoSm} width={28} height={26} className="logo-sm" alt="Indovia" />
        <img src={logoDark} height={24} width={112} className="logo-lg" alt="Indovia" />
      </Link>
      <Link to="/" className="logo-light">
        <img src={logoSm} width={28} height={26} className="logo-sm" alt="Indovia" />
        <img src={logoLight} height={24} width={112} className="logo-lg" alt="Indovia" />
      </Link>
    </div>;
};
export default LogoBox;