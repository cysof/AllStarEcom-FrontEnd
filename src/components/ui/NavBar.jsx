import React from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import NavBarLinks from './NavBarLinks';
import styles from './NavBar.module.css';

const NavBar = ({ numCartItems }) => {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark py-3 ${styles.navbar}`}
    >
      <div className="container">
        <Link className={`navbar-brand fw-bold fs-3 ${styles.brand}`} to="/">
          🌟 AllStar Collection
        </Link>
        <button
          className={`navbar-toggler border-0 ${styles.toggler}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <NavBarLinks />
          <Link
            to="/cart"
            className={`btn rounded-pill px-3 py-2 fw-semibold position-relative ${styles.cartButton}`}
            aria-label={`Shopping cart with ${numCartItems} items`}
          >
            <GiShoppingCart size={20} />
            <span className="ms-2">Cart</span>
            {numCartItems > 0 && (
              <span className={`badge position-absolute ${styles.cartBadge}`}>
                {numCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
