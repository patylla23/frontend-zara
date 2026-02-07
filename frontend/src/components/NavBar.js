import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import logoMbst from '../assets/logo_mbst.png';
import bagInactive from '../assets/bag_inactive.png';
import bagActive from '../assets/bag_active.png';
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

function NavBar() {
  const { cart } = useContext(AppContext);
  const { pathname } = useLocation();

  return (
    <nav className="navbar" aria-label="Navegación principal">
      <div className="navbar-content">
        <div className="navbar-left">
          <Link to="/products" className="navbar-logo-link" aria-label="Ir a inicio">
            <img src={logoMbst} alt="MBST Logo" className="navbar-logo" />
          </Link>
        </div>
        {pathname !== "/checkout" && (
          <div className="navbar-right">
            <Link to="/checkout" className="navbar-bag-link" aria-label="Ir al carrito">
            <img
              src={(cart?.length ?? 0) > 0 ? bagActive : bagInactive}
              alt="Carrito"
              className="navbar-bag"
              />
            <span className="navbar-cart-count">{cart?.length ?? 0}</span>
              </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
