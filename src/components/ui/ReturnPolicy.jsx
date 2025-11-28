import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ReturnPolicy.module.css';

const ReturnPolicy = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'How long do I have to return an item?',
      answer:
        'You have 30 days from the date of delivery to initiate a return for most items. Some items may have different return windows, which will be specified on the product page.',
    },
    {
      question: 'Do I need the original packaging?',
      answer:
        'Yes, items must be returned in their original packaging with all tags attached. This helps us process your return faster and ensures the item can be resold.',
    },
    {
      question: 'Who pays for return shipping?',
      answer:
        'If the return is due to our error (wrong item, defective, etc.), we will provide a prepaid return label. For other returns, the customer is responsible for return shipping costs.',
    },
    {
      question: 'Can I return sale items?',
      answer:
        'Final sale items cannot be returned. All other sale items can be returned within the standard return period for store credit only.',
    },
    {
      question: 'How long does it take to receive my refund?',
      answer:
        'Once we receive and process your return, refunds are typically issued within 5-10 business days. The refund will be credited to your original payment method.',
    },
  ];

  const returnSteps = [
    {
      step: 1,
      icon: '📝',
      title: 'Initiate Return',
      description:
        'Log into your account and go to Order History. Select the item you want to return and click "Request Return".',
    },
    {
      step: 2,
      icon: '📦',
      title: 'Pack Your Item',
      description:
        'Pack the item securely in its original packaging with all accessories, manuals, and tags attached.',
    },
    {
      step: 3,
      icon: '🏷️',
      title: 'Print Label',
      description:
        'Print the return label we email you and attach it to your package. Drop it off at the designated carrier.',
    },
    {
      step: 4,
      icon: '✅',
      title: 'Get Refund',
      description:
        'Once we receive and inspect your return, your refund will be processed within 5-10 business days.',
    },
  ];

  const eligibleItems = [
    { icon: '👕', text: 'Clothing (unworn, tags attached)' },
    { icon: '👟', text: 'Shoes (unworn, original box)' },
    { icon: '💼', text: 'Accessories (unused condition)' },
    { icon: '🎒', text: 'Bags (unused, tags attached)' },
    { icon: '🕶️', text: 'Eyewear (unused, in case)' },
    { icon: '⌚', text: 'Watches (unworn, with warranty)' },
  ];

  const nonEligibleItems = [
    { icon: '🩲', text: 'Intimate apparel and underwear' },
    { icon: '💄', text: 'Cosmetics and beauty products' },
    { icon: '👂', text: 'Earrings and body jewelry' },
    { icon: '🎁', text: 'Gift cards and e-gift cards' },
    { icon: '🏷️', text: 'Final sale items' },
    { icon: '✂️', text: 'Altered or customized items' },
  ];

  return (
    <div className={`container my-5 ${styles.returnPolicyContainer}`}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Return Policy</h1>
            <p className={styles.subtitle}>
              We want you to love your purchase! If you're not completely
              satisfied, we're here to help with easy returns.
            </p>
          </div>

          {/* Quick Stats */}
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📅</div>
              <div className={styles.statValue}>30 Days</div>
              <div className={styles.statLabel}>Return Window</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>💰</div>
              <div className={styles.statValue}>Full Refund</div>
              <div className={styles.statLabel}>Money Back Guarantee</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🚚</div>
              <div className={styles.statValue}>Free Returns</div>
              <div className={styles.statLabel}>On Defective Items</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⚡</div>
              <div className={styles.statValue}>5-10 Days</div>
              <div className={styles.statLabel}>Refund Processing</div>
            </div>
          </div>

          {/* Return Process Steps */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>How to Return an Item</h2>
            <p className={styles.sectionIntro}>
              Follow these simple steps to return your item hassle-free
            </p>
            <div className={styles.stepsContainer}>
              {returnSteps.map((item) => (
                <div key={item.step} className={styles.stepCard}>
                  <div className={styles.stepNumber}>{item.step}</div>
                  <div className={styles.stepIcon}>{item.icon}</div>
                  <h3 className={styles.stepTitle}>{item.title}</h3>
                  <p className={styles.stepDescription}>{item.description}</p>
                </div>
              ))}
            </div>
            <div className={styles.actionCenter}>
              <Link
                to="/profile/orders"
                className={`btn btn-primary btn-lg ${styles.actionBtn}`}
              >
                Start a Return
              </Link>
            </div>
          </section>

          {/* Eligible Items */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>What Can Be Returned?</h2>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className={styles.itemsCard}>
                  <h3 className={styles.itemsCardTitle}>
                    <span className={styles.checkIcon}>✓</span>
                    Returnable Items
                  </h3>
                  <ul className={styles.itemsList}>
                    {eligibleItems.map((item, index) => (
                      <li key={index} className={styles.itemListItem}>
                        <span className={styles.itemIcon}>{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className={`${styles.itemsCard} ${styles.nonEligible}`}>
                  <h3 className={styles.itemsCardTitle}>
                    <span className={styles.crossIcon}>✕</span>
                    Non-Returnable Items
                  </h3>
                  <ul className={styles.itemsList}>
                    {nonEligibleItems.map((item, index) => (
                      <li key={index} className={styles.itemListItem}>
                        <span className={styles.itemIcon}>{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Return Conditions */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Return Conditions</h2>
            <div className={styles.conditionsGrid}>
              <div className={styles.conditionCard}>
                <div className={styles.conditionIcon}>⏰</div>
                <h3 className={styles.conditionTitle}>Timeframe</h3>
                <p className={styles.conditionText}>
                  Items must be returned within 30 days of delivery. Late
                  returns will not be accepted.
                </p>
              </div>
              <div className={styles.conditionCard}>
                <div className={styles.conditionIcon}>🏷️</div>
                <h3 className={styles.conditionTitle}>Original Condition</h3>
                <p className={styles.conditionText}>
                  Items must be unworn, unwashed, and in their original
                  condition with all tags attached.
                </p>
              </div>
              <div className={styles.conditionCard}>
                <div className={styles.conditionIcon}>📦</div>
                <h3 className={styles.conditionTitle}>Original Packaging</h3>
                <p className={styles.conditionText}>
                  Products must be returned in their original packaging with all
                  accessories included.
                </p>
              </div>
              <div className={styles.conditionCard}>
                <div className={styles.conditionIcon}>🧾</div>
                <h3 className={styles.conditionTitle}>Proof of Purchase</h3>
                <p className={styles.conditionText}>
                  You must provide a valid order number or receipt to process
                  your return.
                </p>
              </div>
            </div>
          </section>

          {/* Refund Information */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Refund Information</h2>
            <div className={styles.refundCard}>
              <div className={styles.refundHeader}>
                <h3 className={styles.refundTitle}>💳 How Refunds Work</h3>
              </div>
              <div className={styles.refundContent}>
                <div className={styles.refundItem}>
                  <strong>Original Payment Method:</strong>
                  <p>
                    Refunds are processed to your original payment method.
                    You'll see the credit within 5-10 business days after we
                    process your return.
                  </p>
                </div>
                <div className={styles.refundItem}>
                  <strong>Store Credit Option:</strong>
                  <p>
                    Choose store credit for faster processing (1-2 business
                    days) and get an additional 10% bonus credit!
                  </p>
                </div>
                <div className={styles.refundItem}>
                  <strong>Shipping Costs:</strong>
                  <p>
                    Original shipping costs are non-refundable unless the return
                    is due to our error or a defective product.
                  </p>
                </div>
                <div className={styles.refundItem}>
                  <strong>Partial Refunds:</strong>
                  <p>
                    Items returned in less than perfect condition may receive a
                    partial refund based on the item's condition.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Exchanges */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Exchanges</h2>
            <div className={styles.exchangeCard}>
              <div className={styles.exchangeIcon}>🔄</div>
              <h3 className={styles.exchangeTitle}>
                Need a Different Size or Color?
              </h3>
              <p className={styles.exchangeText}>
                We currently don't offer direct exchanges. To get a different
                size or color, please return your original item for a refund and
                place a new order. This ensures you get what you want as quickly
                as possible!
              </p>
              <div className={styles.exchangeTip}>
                <strong>💡 Pro Tip:</strong> Place your new order before
                returning the original item to avoid items selling out in your
                desired size or color.
              </div>
            </div>
          </section>

          {/* FAQs */}
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
            <h2 className={styles.contactTitle}>Need Help with Your Return?</h2>
            <p className={styles.contactText}>
              Our customer service team is here to assist you with any questions
              about returns or refunds.
            </p>
            <div className={styles.contactButtons}>
              <button className={`btn btn-light btn-lg ${styles.contactBtn}`}>
                📧 Email Support
              </button>
              <button className={`btn btn-light btn-lg ${styles.contactBtn}`}>
                💬 Live Chat
              </button>
              <button className={`btn btn-light btn-lg ${styles.contactBtn}`}>
                📞 Call Us
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
              <Link to="/shipping-policy" className={styles.relatedLink}>
                📦 Shipping Policy
              </Link>
              <Link to="/terms" className={styles.relatedLink}>
                📄 Terms & Conditions
              </Link>
              <Link to="/warranty" className={styles.relatedLink}>
                🛡️ Warranty Information
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

export default ReturnPolicy;
