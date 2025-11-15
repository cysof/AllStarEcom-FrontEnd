import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaArrowRight,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container px-4">
        <div className="row">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className={styles.brandSection}>
              <h3 className={styles.brandTitle}>AllStar-Fashion</h3>
              <p className={styles.brandDescription}>
                Premium quality products that make you stand out from the crowd.
                Your trusted partner for exclusive collections.
              </p>
              <div className={styles.newsletter}>
                <h5 className={styles.newsletterTitle}>
                  Subscribe to Newsletter
                </h5>
                <div className={styles.newsletterForm}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={styles.newsletterInput}
                  />
                  <button className={styles.newsletterButton}>
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <div className={styles.linksList}>
              <Link to="/" className={styles.footerLink}>
                Home
              </Link>
              <Link to="/products" className={styles.footerLink}>
                shop
              </Link>
              <Link to="/about" className={styles.footerLink}>
                About
              </Link>
              <Link to="/contact" className={styles.footerLink}>
                Contact
              </Link>
              <Link to="#" className={styles.footerLink}>
                FAQ
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h4 className={styles.sectionTitle}>Customer Service</h4>
            <div className={styles.linksList}>
              <Link to="/shipping" className={styles.footerLink}>
                Shipping Info
              </Link>
              <Link to="/returns" className={styles.footerLink}>
                Returns
              </Link>
              <Link to="/privacy" className={styles.footerLink}>
                Privacy Policy
              </Link>
              <Link to="/terms" className={styles.footerLink}>
                Terms of Service
              </Link>
              <Link to="/size-guide" className={styles.footerLink}>
                Size Guide
              </Link>
            </div>
          </div>

          {/* Social Media & Contact */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h4 className={styles.sectionTitle}>Connect With Us</h4>
            <div className={styles.socialLinks}>
              <a
                href="https://www.facebook.com/share/17X24ZdzM2/"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com/allstarfashionglobal_limited_?igsh=MTVlOWZtM214cmFraw%3D%3D&utm_source=qr"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/c/2349069234701"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>

            <div className={styles.contactInfo}>
              <p className={styles.contactItem}>
                📧 hello@allstarfashionglobal.com
              </p>
              <p className={styles.contactItem}>📞 +234-9069234701</p>
              <p className={styles.contactItem}>📞 +234-8026487446</p>

              <p className={styles.contactItem}>
                🏢 122/124 Broad Street lagos Island
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <div className="w-100 d-flex justify-content-center">
            <p className={`${styles.copyrightText} text-center`}>
              &copy; {new Date().getFullYear()} AllStar-Fashion. All rights
              reserved. Developed by <strong>CySoft Home Technologies</strong>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
