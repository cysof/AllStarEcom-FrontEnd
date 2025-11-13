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
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>

            <div className={styles.contactInfo}>
              <p className={styles.contactItem}>
                📧 hello@allstarcollection.com
              </p>
              <p className={styles.contactItem}>📞 +1 (555) 123-4567</p>
              <p className={styles.contactItem}>
                🏢 123 Fashion Street, Style City
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className={styles.copyrightText}>
                &copy; {new Date().getFullYear()} AllStar Collection. All rights
                reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className={styles.paymentMethods}>
                <span className={styles.paymentText}>We accept:</span>
                <span className={styles.paymentIcons}>💳 🅰️ 🅱️ 📱</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
