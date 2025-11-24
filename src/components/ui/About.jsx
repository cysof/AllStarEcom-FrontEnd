import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';
import logo from '../../assets/logo.jpeg';

const About = () => {
  return (
    <div className={styles.about}>
      <div className="container py-5">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className={`display-4 fw-bold ${styles.title}`}>
            About Allstar-Fashion
          </h1>
          <p className="lead text-muted">Where Style Meets Excellence</p>
        </div>

        {/* Mission Section */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <h2 className="fw-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              At ALLSTAR 🌟FASHION, we believe that fashion is more than just
              clothing - it's a form of self-expression. Our mission is to
              empower individuals to showcase their unique style with confidence
              and authenticity.
            </p>
            <p className="mb-4">
              We curate collections that blend contemporary trends with timeless
              elegance, ensuring that every piece tells a story and makes a
              statement.
            </p>
          </div>
          <div className="col-lg-6">
            <div className={styles.logoContainer}>
              <img
                src={logo}
                alt="ALLSTAR FASHION Logo"
                className={styles.logo}
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="row mb-5">
          <div className="col-12 text-center mb-4">
            <h2 className="fw-bold">Our Values</h2>
          </div>
          <div className="col-md-4 mb-4">
            <div className={`card h-100 ${styles.valueCard}`}>
              <div className="card-body text-center">
                <div className={styles.valueIcon}>🌟</div>
                <h5 className="card-title">Quality First</h5>
                <p className="card-text">
                  We source only the finest materials and work with skilled
                  artisans to deliver products that exceed expectations.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className={`card h-100 ${styles.valueCard}`}>
              <div className="card-body text-center">
                <div className={styles.valueIcon}>💫</div>
                <h5 className="card-title">Style Innovation</h5>
                <p className="card-text">
                  Constantly evolving with fashion trends while maintaining our
                  unique identity and design philosophy.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className={`card h-100 ${styles.valueCard}`}>
              <div className="card-body text-center">
                <div className={styles.valueIcon}>🤝</div>
                <h5 className="card-title">Customer Focus</h5>
                <p className="card-text">
                  Your satisfaction is our priority. We're committed to
                  providing exceptional service and support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 order-lg-2">
            <h2 className="fw-bold mb-4">Our Story</h2>
            <p className="mb-4">
              Founded in 2020, ALLSTAR 🌟FASHION started as a small boutique
              with a big dream - to revolutionize the fashion industry by making
              high-quality, stylish clothing accessible to everyone.
            </p>
            <p className="mb-4">
              What began as a passion project has grown into a trusted brand
              loved by thousands of fashion enthusiasts worldwide. Our journey
              continues as we expand our collections and reach new milestones.
            </p>
          </div>
          <div className="col-lg-6 order-lg-1">
            <div className={styles.storyImage}>
              <div className={styles.placeholderImage}>
                Our Fashion Collection
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-5">
          <h3 className="mb-4">Ready to Explore Our Collection?</h3>
          <Link
            to="/products"
            className={`btn btn-primary btn-lg ${styles.ctaButton}`}
          >
            Start Shopping Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
