import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes module
import "./Layout.css";

const Layout = ({ children }) => {
  Layout.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1 className="page-name">Sana Commerce</h1>
          <nav>
            <Link to="/" className="nav-link">
              Catalog
            </Link>
            <Link to="/cart" className="nav-link">
              Shopping Cart
            </Link>
            <Link to="/login" className="login-button">
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <p>@K-Viera</p>
      </footer>
    </div>
  );
};

export default Layout;
