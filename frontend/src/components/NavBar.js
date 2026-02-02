import React from 'react';
import './NavBar.scss';
import logoMbst from '../assets/logo_mbst.png';
import bagInactive from '../assets/bag_inactive.png';

function NavBar() {
  const cartCount = 0;

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <img src={logoMbst} alt="MBST Logo" className="navbar-logo" />
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
