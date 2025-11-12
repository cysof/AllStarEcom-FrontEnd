import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Contact.module.css';
import logo from '../../assets/logo.jpeg';
import api from '../../api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    setErrorMessage('');

    try {
      const response = await api.post('/account/contact/', formData);

      // Success case
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000);
    } catch (error) {
      setIsSubmitting(false);

      if (error.response?.status === 401) {
        setSubmitStatus('auth_error');
        setErrorMessage('Please log in to send a message.');
      } else if (error.response?.data?.errors) {
        // Handle validation errors
        setSubmitStatus('validation_error');
        const errors = error.response.data.errors;
        // Display first error message
        const firstError =
          Object.values(errors)[0]?.[0] || 'Please check your form inputs.';
        setErrorMessage(firstError);
      } else if (error.response?.data?.message) {
        setSubmitStatus('error');
        setErrorMessage(error.response.data.message);
      } else {
        setSubmitStatus('error');
        setErrorMessage('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className={styles.contact}>
      <div className="container py-5">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className={`display-4 fw-bold ${styles.title}`}>
            Contact ALLSTAR 🌟FASHION
          </h1>
          <p className="lead text-muted">We'd Love to Hear From You</p>
        </div>

        <div className="row">
          {/* Contact Information */}
          <div className="col-lg-4 mb-5">
            <div className={styles.contactInfo}>
              <div className="text-center mb-4">
                <img
                  src={logo}
                  alt="ALLSTAR FASHION Logo"
                  className={styles.logo}
                />
              </div>

              <h3 className="fw-bold mb-4">Get In Touch</h3>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📍</div>
                <div>
                  <h5>Visit Our Store</h5>
                  <p>
                    123 Fashion Avenue
                    <br />
                    Style District, ST 10001
                  </p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>📞</div>
                <div>
                  <h5>Call Us</h5>
                  <p>
                    +1 (555) 123-4567
                    <br />
                    Mon-Fri: 9AM-6PM EST
                  </p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>✉️</div>
                <div>
                  <h5>Email Us</h5>
                  <p>
                    support@allstarfashion.com
                    <br />
                    info@allstarfashion.com
                  </p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>🕒</div>
                <div>
                  <h5>Business Hours</h5>
                  <p>
                    Monday - Friday: 9AM - 8PM
                    <br />
                    Saturday - Sunday: 10AM - 6PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <div className={styles.contactForm}>
              <h3 className="fw-bold mb-4">Send Us a Message</h3>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className={`alert alert-success ${styles.alert}`}>
                  ✅ Thank you for your message! We'll get back to you within 24
                  hours.
                </div>
              )}

              {/* Authentication Error */}
              {submitStatus === 'auth_error' && (
                <div className={`alert alert-warning ${styles.alert}`}>
                  🔐 {errorMessage}{' '}
                  <Link to="/login" className="alert-link">
                    Log in here
                  </Link>
                  .
                </div>
              )}

              {/* Validation Error */}
              {submitStatus === 'validation_error' && (
                <div className={`alert alert-danger ${styles.alert}`}>
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* General Error */}
              {submitStatus === 'error' && (
                <div className={`alert alert-danger ${styles.alert}`}>
                  ❌ {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label fw-semibold">
                    Subject *
                  </label>
                  <select
                    className="form-select"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Support</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="form-label fw-semibold">
                    Message *
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help you..."
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary btn-lg w-100 ${styles.submitButton}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Sending Message...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className={styles.faqSection}>
              <h3 className="text-center fw-bold mb-4">
                Frequently Asked Questions
              </h3>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className={styles.faqItem}>
                    <h5>📦 What is your return policy?</h5>
                    <p>
                      We offer 30-day returns on all unworn items with original
                      tags. Items must be in original condition.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className={styles.faqItem}>
                    <h5>🚚 How long does shipping take?</h5>
                    <p>
                      Standard shipping: 3-5 business days. Express shipping:
                      1-2 business days. Free shipping on orders over $50.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className={styles.faqItem}>
                    <h5>💳 What payment methods do you accept?</h5>
                    <p>
                      We accept all major credit cards, PayPal, Apple Pay, and
                      Google Pay for your convenience.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className={styles.faqItem}>
                    <h5>👕 Do you offer international shipping?</h5>
                    <p>
                      Yes! We ship worldwide. International shipping times vary
                      by location (7-14 business days).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-5">
          <h4 className="mb-3">Can't Find What You're Looking For?</h4>
          <p className="text-muted mb-4">
            Check out our FAQ section or browse our collection for inspiration.
          </p>
          <div className={styles.ctaButtons}>
            <Link
              to="/shop"
              className={`btn btn-primary btn-lg me-3 ${styles.ctaButton}`}
            >
              Continue Shopping
            </Link>
            <Link
              to="/about"
              className={`btn btn-outline-primary btn-lg ${styles.ctaButton}`}
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
