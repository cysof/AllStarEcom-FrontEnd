import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Terms.module.css';

const Terms = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms', icon: '✓' },
    { id: 'account', title: '2. Account Registration', icon: '👤' },
    { id: 'products', title: '3. Products & Services', icon: '🛍️' },
    { id: 'orders', title: '4. Orders & Payments', icon: '💳' },
    { id: 'shipping', title: '5. Shipping & Delivery', icon: '📦' },
    { id: 'returns', title: '6. Returns & Refunds', icon: '↩️' },
    { id: 'intellectual', title: '7. Intellectual Property', icon: '©' },
    { id: 'liability', title: '8. Limitation of Liability', icon: '⚖️' },
    { id: 'termination', title: '9. Termination', icon: '🚫' },
    { id: 'changes', title: '10. Changes to Terms', icon: '📝' },
  ];

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className={`container my-5 ${styles.termsContainer}`}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Terms and Conditions</h1>
            <p className={styles.lastUpdated}>
              Last Updated: November 28, 2025
            </p>
            <p className={styles.intro}>
              Please read these Terms and Conditions carefully before using our
              service. By accessing or using our website, you agree to be bound
              by these terms.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className={styles.navigation}>
            <h3 className={styles.navTitle}>Quick Navigation</h3>
            <div className={styles.navGrid}>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={styles.navLink}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(section.id)?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                >
                  <span className={styles.navIcon}>{section.icon}</span>
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          {/* Section 1: Acceptance of Terms */}
          <section id="acceptance" className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection('acceptance')}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>✓</span>
                1. Acceptance of Terms
              </h2>
              <span className={styles.toggleIcon}>
                {activeSection === 'acceptance' ? '−' : '+'}
              </span>
            </div>
            <div
              className={`${styles.sectionContent} ${
                activeSection === 'acceptance' ? styles.active : ''
              }`}
            >
              <p className={styles.text}>
                By accessing and using this website, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to these Terms and Conditions, please do not use this
                website.
              </p>
              <p className={styles.text}>
                These Terms and Conditions apply to all visitors, users, and
                others who access or use the service. Your continued use of the
                website following the posting of any changes to these terms
                constitutes acceptance of those changes.
              </p>
            </div>
          </section>

          {/* Section 2: Account Registration */}
          <section id="account" className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection('account')}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>👤</span>
                2. Account Registration
              </h2>
              <span className={styles.toggleIcon}>
                {activeSection === 'account' ? '−' : '+'}
              </span>
            </div>
            <div
              className={`${styles.sectionContent} ${
                activeSection === 'account' ? styles.active : ''
              }`}
            >
              <p className={styles.text}>
                To access certain features of our service, you may be required
                to create an account. When creating an account, you agree to:
              </p>
              <ul className={styles.list}>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>
                  Accept all responsibility for activities under your account
                </li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              <p className={styles.text}>
                You must be at least 18 years old to create an account and use
                our services. We reserve the right to refuse service, terminate
                accounts, or cancel orders at our discretion.
              </p>
            </div>
          </section>

          {/* Section 3: Products & Services */}
          <section id="products" className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection('products')}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>🛍️</span>
                3. Products & Services
              </h2>
              <span className={styles.toggleIcon}>
                {activeSection === 'products' ? '−' : '+'}
              </span>
            </div>
            <div
              className={`${styles.sectionContent} ${
                activeSection === 'products' ? styles.active : ''
              }`}
            >
              <p className={styles.text}>
                All products and services are subject to availability. We
                reserve the right to:
              </p>
              <ul className={styles.list}>
                <li>Discontinue any product at any time</li>
                <li>Limit quantities of any products or services</li>
                <li>Refuse service to anyone for any reason</li>
                <li>Modify product descriptions and pricing</li>
              </ul>
              <p className={styles.text}>
                We make every effort to display product colors and images as
                accurately as possible. However, we cannot guarantee that your
                device's display will accurately reflect the actual color of the
                product.
              </p>
              <div className={styles.importantBox}>
                <strong>Important:</strong> Product descriptions,
                specifications, and pricing are subject to change without
                notice. We are not responsible for typographical errors.
              </div>
            </div>
          </section>

          {/* Section 4: Orders & Payments */}
          <section id="orders" className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection('orders')}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>💳</span>
                4. Orders & Payments
              </h2>
              <span className={styles.toggleIcon}>
                {activeSection === 'orders' ? '−' : '+'}
              </span>
            </div>
            <div
              className={`${styles.sectionContent} ${
                activeSection === 'orders' ? styles.active : ''
              }`}
            >
              <h3 className={styles.subTitle}>Order Placement</h3>
              <p className={styles.text}>
                When you place an order, you are making an offer to purchase the
                products. We reserve the right to accept or decline your order
                for any reason.
              </p>

              <h3 className={styles.subTitle}>Payment Methods</h3>
              <p className={styles.text}>
                We accept the following payment methods:
              </p>
              <ul className={styles.list}>
                <li>Credit/Debit Cards (Visa, MasterCard, American Express)</li>
                <li>PayPal</li>
                <li>Bank Transfer</li>
                <li>Other payment gateways as specified at checkout</li>
              </ul>

              <h3 className={styles.subTitle}>Pricing</h3>
              <p className={styles.text}>
                All prices are listed in the specified currency and include
                applicable taxes unless otherwise stated. We reserve the right
                to change prices at any time without prior notice.
              </p>
            </div>
          </section>

          {/* Section 5: Shipping & Delivery */}
          <section id="shipping" className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection('shipping')}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>📦</span>
                5. Shipping & Delivery
              </h2>
              <span className={styles.toggleIcon}>
                {activeSection === 'shipping' ? '−' : '+'}
              </span>
            </div>
            <div
              className={`${styles.sectionContent} ${
                activeSection === 'shipping' ? styles.active : ''
              }`}
            >
              <p className={styles.text}>
                We strive to process and ship orders promptly. Delivery times
                are estimates and not guaranteed. Factors affecting delivery
                include:
              </p>
              <ul className={styles.list}>
                <li>Shipping method selected</li>
                <li>Destination location</li>
                <li>Customs clearance (for international orders)</li>
                <li>Weather conditions and carrier delays</li>
              </ul>
              <p className={styles.text}>
                You will receive tracking information once your order ships.
                Please ensure your shipping address is correct - we are not
                responsible for orders shipped to incorrect addresses provided
                by the customer.
              </p>
            </div>
          </section>

          {/* Section 6: Returns & Refunds */}
          <section id="returns" className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection('returns')}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>↩️</span>
                6. Returns & Refunds
              </h2>
              <span className={styles.toggleIcon}>
                {activeSection === 'returns' ? '−' : '+'}
              </span>
            </div>
            <div
              className={`${styles.sectionContent} ${
                activeSection === 'returns' ? styles.active : ''
              }`}
            >
              <h3 className={styles.subTitle}>Return Policy</h3>
              <p className={styles.text}>
                We accept returns within 30 days of delivery for most items. To
                be eligible for a return, items must be:
              </p>
              <ul className={styles.list}>
                <li>Unused and in the same condition as received</li>
                <li>In the original packaging</li>
                <li>Accompanied by proof of purchase</li>
              </ul>

              <h3 className={styles.subTitle}>Refund Process</h3>
              <p className={styles.text}>
                Once we receive and inspect your return, we will notify you of
                the approval or rejection of your refund. Approved refunds will
                be processed within 5-10 business days to your original payment
                method.
              </p>

              <div className={styles.warningBox}>
                <strong>Note:</strong> Certain items are non-returnable,
                including perishable goods, custom products, personal care
                items, and sale items.
              </div>
            </div>
          </section>

          {/* Section 7: Intellectual Property */}
          <section id="intellectual" className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection('intellectual')}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>©</span>
                7. Intellectual Property
              </h2>
              <span className={styles.toggleIcon}>
                {activeSection === 'intellectual' ? '−' : '+'}
              </span>
            </div>
            <div
              className={`${styles.sectionContent} ${
                activeSection === 'intellectual' ? styles.active : ''
              }`}
            >
              <p className={styles.text}>
                All content on this website, including text, graphics, logos,
                images, and software, is the property of our company or its
                content suppliers and is protected by international copyright
                laws.
              </p>
              <p className={styles.text}>
                You may not reproduce, distribute, modify, or create derivative
                works from any content without our express written permission.
              </p>
            </div>
          </section>

          {/* Section 8: Limitation of Liability */}
          <section id="liability" className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection('liability')}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>⚖️</span>
                8. Limitation of Liability
              </h2>
              <span className={styles.toggleIcon}>
                {activeSection === 'liability' ? '−' : '+'}
              </span>
            </div>
            <div
              className={`${styles.sectionContent} ${
                activeSection === 'liability' ? styles.active : ''
              }`}
            >
              <p className={styles.text}>
                To the maximum extent permitted by law, we shall not be liable
                for any indirect, incidental, special, consequential, or
                punitive damages resulting from:
              </p>
              <ul className={styles.list}>
                <li>Your use or inability to use the service</li>
                <li>Unauthorized access to your account or data</li>
                <li>Errors, mistakes, or inaccuracies of content</li>
                <li>Interruption or cessation of transmission</li>
              </ul>
            </div>
          </section>

          {/* Section 9: Termination */}
          <section id="termination" className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection('termination')}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>🚫</span>
                9. Termination
              </h2>
              <span className={styles.toggleIcon}>
                {activeSection === 'termination' ? '−' : '+'}
              </span>
            </div>
            <div
              className={`${styles.sectionContent} ${
                activeSection === 'termination' ? styles.active : ''
              }`}
            >
              <p className={styles.text}>
                We may terminate or suspend your account and access to our
                service immediately, without prior notice, for any reason,
                including if you breach these Terms and Conditions.
              </p>
              <p className={styles.text}>
                Upon termination, your right to use the service will cease
                immediately. All provisions of the Terms which by their nature
                should survive termination shall survive, including ownership
                provisions and liability limitations.
              </p>
            </div>
          </section>

          {/* Section 10: Changes to Terms */}
          <section id="changes" className={styles.section}>
            <div
              className={styles.sectionHeader}
              onClick={() => toggleSection('changes')}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>📝</span>
                10. Changes to Terms
              </h2>
              <span className={styles.toggleIcon}>
                {activeSection === 'changes' ? '−' : '+'}
              </span>
            </div>
            <div
              className={`${styles.sectionContent} ${
                activeSection === 'changes' ? styles.active : ''
              }`}
            >
              <p className={styles.text}>
                We reserve the right to modify or replace these Terms at any
                time. We will provide notice of any material changes by posting
                the new Terms on this page and updating the "Last Updated" date.
              </p>
              <p className={styles.text}>
                Your continued use of the service after any changes constitutes
                acceptance of the new Terms. We encourage you to review these
                Terms periodically.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <div className={styles.contactSection}>
            <h2 className={styles.contactTitle}>Questions About Our Terms?</h2>
            <p className={styles.contactText}>
              If you have any questions or concerns about these Terms and
              Conditions, please don't hesitate to contact us.
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <div>
                  <strong>Email</strong>
                  <p>hello@allstarfashionglobal.com</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <div>
                  <strong>Phone</strong>
                  <p>+234-9069234701</p>
                </div>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📍</span>
                <div>
                  <strong>Address</strong>
                  <p>122/124 Broad Street lagos Island</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className={styles.relatedLinks}>
            <h3 className={styles.relatedTitle}>Related Documents</h3>
            <div className={styles.linksGrid}>
              <Link to="/privacy-policy" className={styles.relatedLink}>
                🔒 Privacy Policy
              </Link>
              <Link to="/shipping-policy" className={styles.relatedLink}>
                📦 Shipping Policy
              </Link>
              <Link to="/return-policy" className={styles.relatedLink}>
                ↩️ Return Policy
              </Link>
              <Link to="/faq" className={styles.relatedLink}>
                ❓ FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
