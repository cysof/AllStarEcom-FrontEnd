import React, { useState, useEffect } from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import { Link, NavLink } from 'react-router-dom';
import NavBarLinks from './NavBarLinks';
import styles from './NavBar.module.css';
import logo from '../../assets/logo.jpeg';
const NavBar = ({ numCartItems = 0 }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close navbar when route changes (mobile)
  useEffect(() => {
    const handleRouteChange = () => {
      if (isNavbarOpen) {
        setIsNavbarOpen(false);
        // Close Bootstrap collapse
        const collapse = document.getElementById('navbarContent');
        if (collapse && collapse.classList.contains('show')) {
          collapse.classList.remove('show');
        }
      }
    };

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [isNavbarOpen]);

  // Handle navbar toggle
  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  // Close navbar (for mobile links)
  const closeNavbar = () => {
    setIsNavbarOpen(false);
    const collapse = document.getElementById('navbarContent');
    if (collapse && collapse.classList.contains('show')) {
      collapse.classList.remove('show');
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark py-3 ${styles.navbar} ${
        scrolled ? styles.scrolled : ''
      }`}
    >
      <div className="container">
        {/* Brand - Left Side with Logo */}
        <Link
          className={`navbar-brand fw-bold fs-3 ${styles.brand}`}
          to="/"
          onClick={closeNavbar}
        >
          <div className={styles.brandContainer}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <div className={styles.brandText}>
              <span>ALLSTAR</span> <span>🌟FASHION</span>
            </div>
          </div>
        </Link>

        {/* Toggle Button */}
        <button
          className={`navbar-toggler border-0 ${styles.toggler}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded={isNavbarOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
          onClick={handleNavbarToggle}
        >
          <span className={`navbar-toggler-icon ${styles.togglerIcon}`}></span>
        </button>

        {/* Navbar Content - All items floated right */}
        <div
          className={`collapse navbar-collapse ${styles.navbarCollapse}`}
          id="navbarContent"
        >
          <div className={`navbar-nav ${styles.allNavItems}`}>
            {/* Main Navigation Links */}
            <div className={styles.navGroup}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${styles.navLink} ${isActive ? styles.active : ''}`
                }
                onClick={closeNavbar}
                end
              >
                🏠 Home
              </NavLink>

              <NavLink
                to="#shop"
                className={({ isActive }) =>
                  `nav-link ${styles.navLink} ${isActive ? styles.active : ''}`
                }
                onClick={closeNavbar}
              >
                🛍️ Shop
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link ${styles.navLink} ${isActive ? styles.active : ''}`
                }
                onClick={closeNavbar}
              >
                ℹ️ About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link ${styles.navLink} ${isActive ? styles.active : ''}`
                }
                onClick={closeNavbar}
              >
                📞 Contact
              </NavLink>
            </div>

            {/* User Authentication Links */}
            <div className={styles.authGroup}>
              <NavBarLinks onLinkClick={closeNavbar} />
            </div>

            {/* Cart Button */}
            <Link
              to="/cart"
              className={`btn rounded-pill px-3 py-2 fw-semibold position-relative ${styles.cartButton}`}
              aria-label={`Shopping cart with ${numCartItems} items`}
              onClick={closeNavbar}
            >
              <GiShoppingCart size={20} className={styles.cartIcon} />
              <span className="ms-2">Cart</span>
              {numCartItems > 0 && (
                <span
                  className={`badge position-absolute ${styles.cartBadge} ${
                    numCartItems > 99 ? styles.cartBadgeSmall : ''
                  }`}
                >
                  {numCartItems > 99 ? '99+' : numCartItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
