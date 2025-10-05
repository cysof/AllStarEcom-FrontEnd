import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBarLinks.module.css';

const NavBarLinks = () => {
  return (
    <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${styles.navList}`}>
      <li className={`nav-item ${styles.navItem}`}>
        <Link
          to="/"
          className={`nav-link fw-semibold px-3 py-2 rounded ${styles.navLink}`}
        >
          Home
        </Link>
      </li>
      <li className={`nav-item ${styles.navItem}`}>
        <Link
          to="/shop"
          className={`nav-link fw-semibold px-3 py-2 rounded ${styles.navLink}`}
        >
          Shop
        </Link>
      </li>
      <li className={`nav-item ${styles.navItem}`}>
        <Link
          to="/about"
          className={`nav-link fw-semibold px-3 py-2 rounded ${styles.navLink}`}
        >
          About
        </Link>
      </li>
      <li className={`nav-item ${styles.navItem}`}>
        <Link
          to="/contact"
          className={`nav-link fw-semibold px-3 py-2 rounded ${styles.navLink}`}
        >
          Contact
        </Link>
      </li>
    </ul>
  );
};

export default NavBarLinks;
