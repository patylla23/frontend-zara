import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import logoMbst from '../assets/logo_mbst.png';
import bagInactive from '../assets/bag_inactive.png';

function NavBar() {
  const cartCount = 0;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <Link to="/products" className="navbar-logo-link" aria-label="Ir a inicio">
            <img src={logoMbst} alt="MBST Logo" className="navbar-logo" />
          </Link>
        </div>
        <div className="navbar-right">
          <img src={bagInactive} alt="Carrito" className="navbar-bag" />
          <span className="navbar-cart-count">{cartCount}</span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
