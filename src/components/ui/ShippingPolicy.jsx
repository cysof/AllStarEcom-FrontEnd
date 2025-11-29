import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ShippingPolicy.module.css';

const ShippingPolicy = () => {
  const [selectedCountry, setSelectedCountry] = useState('domestic');
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const shippingMethods = {
    domestic: [
      {
        name: 'Standard Shipping',
        time: '5-7 Business Days',
        cost: '$4.99',
        icon: '📦',
        description: 'Economical option for regular deliveries',
      },
      {
        name: 'Express Shipping',
        time: '2-3 Business Days',
        cost: '$9.99',
        icon: '🚀',
        description: 'Faster delivery for urgent orders',
      },
      {
        name: 'Next Day Delivery',
        time: '1 Business Day',
        cost: '$19.99',
        icon: '⚡',
        description: 'Get your order tomorrow',
      },
      {
        name: 'Free Shipping',
        time: '7-10 Business Days',
        cost: 'FREE',
        icon: '🎁',
        description: 'On orders over $50',
      },
    ],
    international: [
      {
        name: 'Standard International',
        time: '10-15 Business Days',
        cost: '$19.99',
        icon: '🌍',
        description: 'Worldwide standard delivery',
      },
      {
        name: 'Express International',
        time: '5-7 Business Days',
        cost: '$39.99',
        icon: '✈️',
        description: 'Fast international shipping',
      },
      {
        name: 'Priority International',
        time: '3-5 Business Days',
        cost: '$59.99',
        icon: '🚁',
        description: 'Premium international service',
      },
    ],
  };

  const faqs = [
    {
      question: 'Do you ship internationally?',
      answer:
        'Yes! We ship to over 100 countries worldwide. International shipping rates and delivery times vary by destination. Customs fees and import duties may apply and are the responsibility of the recipient.',
    },
    {
      question: 'When will my order ship?',
      answer:
        'Orders are typically processed and shipped within 1-2 business days. Orders placed on weekends or holidays will be processed the next business day. You will receive a tracking number via email once your order ships.',
    },
    {
      question: 'Can I change my shipping address after placing an order?',
      answer:
        "If your order hasn't shipped yet, please contact us immediately and we'll do our best to update the address. Once shipped, we cannot modify the delivery address.",
    },
    {
      question: 'What if my package is lost or damaged?',
      answer:
        "If your package is lost or arrives damaged, please contact us within 48 hours of delivery (or expected delivery date for lost packages). We'll work with the carrier to resolve the issue and either resend your order or provide a full refund.",
    },
    {
      question: 'Do you offer expedited shipping?',
      answer:
        'Yes! We offer Express (2-3 days) and Next Day delivery options. Expedited shipping must be selected at checkout and orders must be placed before 2 PM EST for same-day processing.',
    },
  ];

  const shippingZones = [
    {
      zone: 'Zone 1',
      regions: 'United States (Domestic)',
      time: '3-7 Business Days',
      color: '#28a745',
    },
    {
      zone: 'Zone 2',
      regions: 'Canada & Mexico',
      time: '7-12 Business Days',
      color: '#17a2b8',
    },
    {
      zone: 'Zone 3',
      regions: 'Europe & UK',
      time: '10-15 Business Days',
      color: '#ffc107',
    },
    {
      zone: 'Zone 4',
      regions: 'Asia & Australia',
      time: '12-18 Business Days',
      color: '#fd7e14',
    },
    {
      zone: 'Zone 5',
      regions: 'Rest of World',
      time: '15-25 Business Days',
      color: '#dc3545',
    },
  ];

  return (
    <div className={`container my-5 ${styles.shippingPolicyContainer}`}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Shipping Policy</h1>
            <p className={styles.subtitle}>
              Fast, reliable shipping to your doorstep. Learn about our delivery
              options, timelines, and what to expect with your order.
            </p>
          </div>

          {/* Quick Stats */}
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🚚</div>
              <div className={styles.statValue}>Free Shipping</div>
              <div className={styles.statLabel}>Orders Over $50</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📦</div>
              <div className={styles.statValue}>1-2 Days</div>
              <div className={styles.statLabel}>Processing Time</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🌍</div>
              <div className={styles.statValue}>100+ Countries</div>
              <div className={styles.statLabel}>Worldwide Shipping</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📍</div>
              <div className={styles.statValue}>Track Online</div>
              <div className={styles.statLabel}>Real-Time Updates</div>
            </div>
          </div>

          {/* Shipping Methods */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Shipping Methods</h2>

            {/* Country Toggle */}
            <div className={styles.toggleContainer}>
              <button
                className={`${styles.toggleBtn} ${
                  selectedCountry === 'domestic' ? styles.activeToggle : ''
                }`}
                onClick={() => setSelectedCountry('domestic')}
              >
                🏠 Domestic Shipping
              </button>
              <button
                className={`${styles.toggleBtn} ${
                  selectedCountry === 'international' ? styles.activeToggle : ''
                }`}
                onClick={() => setSelectedCountry('international')}
              >
                🌍 International Shipping
              </button>
            </div>

            {/* Shipping Options Grid */}
            <div className={styles.methodsGrid}>
              {shippingMethods[selectedCountry].map((method, index) => (
                <div key={index} className={styles.methodCard}>
                  <div className={styles.methodIcon}>{method.icon}</div>
                  <h3 className={styles.methodName}>{method.name}</h3>
                  <div className={styles.methodTime}>{method.time}</div>
                  <div className={styles.methodCost}>{method.cost}</div>
                  <p className={styles.methodDescription}>
                    {method.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Shipping Zones
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Shipping Zones & Delivery Times
            </h2>
            <p className={styles.sectionIntro}>
              Delivery times vary by destination. Below are estimated delivery
              times after your order is processed and shipped.
            </p>
            <div className={styles.zonesContainer}>
              {shippingZones.map((zone, index) => (
                <div key={index} className={styles.zoneCard}>
                  <div
                    className={styles.zoneHeader}
                    style={{ backgroundColor: zone.color }}
                  >
                    <h3 className={styles.zoneName}>{zone.zone}</h3>
                  </div>
                  <div className={styles.zoneBody}>
                    <div className={styles.zoneRegions}>{zone.regions}</div>
                    <div className={styles.zoneTime}>
                      <span className={styles.clockIcon}>⏱️</span>
                      {zone.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section> */}

          {/* Order Processing */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Order Processing</h2>
            <div className={styles.processingCard}>
              <div className={styles.processingTimeline}>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineIcon}>🛒</div>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>Order Placed</h3>
                    <p className={styles.timelineText}>
                      You'll receive an order confirmation email immediately
                      after checkout.
                    </p>
                  </div>
                </div>
                <div className={styles.timelineLine}></div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineIcon}>📋</div>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>
                      Processing (1-2 Days)
                    </h3>
                    <p className={styles.timelineText}>
                      We prepare your order for shipment. This includes quality
                      checks and packaging.
                    </p>
                  </div>
                </div>
                <div className={styles.timelineLine}></div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineIcon}>📦</div>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>Shipped</h3>
                    <p className={styles.timelineText}>
                      Your order is on its way! You'll receive a tracking number
                      via email.
                    </p>
                  </div>
                </div>
                <div className={styles.timelineLine}></div>
                <div className={styles.timelineItem}>
                  <div className={styles.timelineIcon}>🏠</div>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>Delivered</h3>
                    <p className={styles.timelineText}>
                      Your package arrives at your doorstep. Enjoy your
                      purchase!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Important Information */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Important Shipping Information
            </h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📍</div>
                <h3 className={styles.infoTitle}>Address Accuracy</h3>
                <p className={styles.infoText}>
                  Please ensure your shipping address is correct. We cannot be
                  held responsible for orders shipped to incorrect addresses
                  provided by customers.
                </p>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>🚫</div>
                <h3 className={styles.infoTitle}>P.O. Boxes</h3>
                <p className={styles.infoText}>
                  We ship to P.O. Boxes only via USPS. Express and overnight
                  services are not available for P.O. Box addresses.
                </p>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>🌐</div>
                <h3 className={styles.infoTitle}>International Customs</h3>
                <p className={styles.infoText}>
                  International customers are responsible for all customs
                  duties, taxes, and import fees. These charges are not included
                  in our shipping costs.
                </p>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>⛈️</div>
                <h3 className={styles.infoTitle}>Weather Delays</h3>
                <p className={styles.infoText}>
                  Severe weather conditions may cause shipping delays. We're not
                  responsible for delays caused by weather or carrier issues.
                </p>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>🎁</div>
                <h3 className={styles.infoTitle}>Gift Orders</h3>
                <p className={styles.infoText}>
                  Gift orders can be shipped directly to the recipient. We can
                  include a gift message and omit pricing information upon
                  request.
                </p>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📦</div>
                <h3 className={styles.infoTitle}>Package Protection</h3>
                <p className={styles.infoText}>
                  All packages are insured up to $100. Additional insurance is
                  available for high-value items at checkout.
                </p>
              </div>
            </div>
          </section>

          {/* Tracking Your Order */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Tracking Your Order</h2>
            <div className={styles.trackingCard}>
              <div className={styles.trackingIcon}>📱</div>
              <h3 className={styles.trackingTitle}>
                Stay Updated Every Step of the Way
              </h3>
              <p className={styles.trackingText}>
                Once your order ships, you'll receive a confirmation email with
                a tracking number. You can track your package in real-time
                using:
              </p>
              <ul className={styles.trackingList}>
                <li>Your account dashboard on our website</li>
                <li>The tracking link in your shipping confirmation email</li>
                <li>Directly on the carrier's website</li>
              </ul>
              <div className={styles.trackingAction}>
                <Link
                  to="/profile/orders"
                  className={`btn btn-primary btn-lg ${styles.trackingBtn}`}
                >
                  Track My Order
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqContainer}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqItem}>
                  <div
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className={styles.faqQuestionText}>{faq.question}</h3>
                    <span className={styles.faqToggle}>
                      {activeFaq === index ? '−' : '+'}
                    </span>
                  </div>
                  <div
                    className={`${styles.faqAnswer} ${
                      activeFaq === index ? styles.faqActive : ''
                    }`}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <div className={styles.contactSection}>
            <h2 className={styles.contactTitle}>Questions About Shipping?</h2>
            <p className={styles.contactText}>
              Our customer service team is here to help with any shipping
              questions or concerns.
            </p>
            <div className={styles.contactButtons}>
              <button className={`btn btn-light btn-lg ${styles.contactBtn}`}>
                📧 Email Us
              </button>
              <button className={`btn btn-light btn-lg ${styles.contactBtn}`}>
                💬 Live Chat
              </button>
              <button className={`btn btn-light btn-lg ${styles.contactBtn}`}>
                📞 Call Support
              </button>
            </div>
            <p className={styles.contactHours}>
              Available Monday - Friday, 9am - 6pm EST
            </p>
          </div>

          {/* Related Links */}
          <div className={styles.relatedLinks}>
            <h3 className={styles.relatedTitle}>Related Policies</h3>
            <div className={styles.linksGrid}>
              <Link to="/return-policy" className={styles.relatedLink}>
                ↩️ Return Policy
              </Link>
              <Link to="/terms" className={styles.relatedLink}>
                📄 Terms & Conditions
              </Link>
              <Link to="/privacy-policy" className={styles.relatedLink}>
                🔒 Privacy Policy
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

export default ShippingPolicy;
