import React, { useState } from 'react';
import styles from './SizeGuide.module.css';

const SizeGuide = () => {
  const [activeCategory, setActiveCategory] = useState('clothing');
  const [measurementUnit, setMeasurementUnit] = useState('inches'); // inches or cm

  // Size data for different categories
  const sizeData = {
    clothing: {
      men: {
        headers: ['Size', 'Chest', 'Waist', 'Hip', 'Shoulder'],
        rows: [
          {
            size: 'XS',
            chest: '34-36',
            waist: '28-30',
            hip: '34-36',
            shoulder: '16.5',
          },
          {
            size: 'S',
            chest: '36-38',
            waist: '30-32',
            hip: '36-38',
            shoulder: '17',
          },
          {
            size: 'M',
            chest: '38-40',
            waist: '32-34',
            hip: '38-40',
            shoulder: '17.5',
          },
          {
            size: 'L',
            chest: '40-42',
            waist: '34-36',
            hip: '40-42',
            shoulder: '18',
          },
          {
            size: 'XL',
            chest: '42-44',
            waist: '36-38',
            hip: '42-44',
            shoulder: '18.5',
          },
          {
            size: 'XXL',
            chest: '44-46',
            waist: '38-40',
            hip: '44-46',
            shoulder: '19',
          },
        ],
      },
      women: {
        headers: ['Size', 'Bust', 'Waist', 'Hip', 'Length'],
        rows: [
          {
            size: 'XS',
            bust: '32-34',
            waist: '24-26',
            hip: '34-36',
            length: '28',
          },
          {
            size: 'S',
            bust: '34-36',
            waist: '26-28',
            hip: '36-38',
            length: '28.5',
          },
          {
            size: 'M',
            bust: '36-38',
            waist: '28-30',
            hip: '38-40',
            length: '29',
          },
          {
            size: 'L',
            bust: '38-40',
            waist: '30-32',
            hip: '40-42',
            length: '29.5',
          },
          {
            size: 'XL',
            bust: '40-42',
            waist: '32-34',
            hip: '42-44',
            length: '30',
          },
          {
            size: 'XXL',
            bust: '42-44',
            waist: '34-36',
            hip: '44-46',
            length: '30.5',
          },
        ],
      },
    },
    shoes: {
      men: {
        headers: ['US', 'UK', 'EU', 'CM'],
        rows: [
          { us: '6', uk: '5.5', eu: '39', cm: '24' },
          { us: '7', uk: '6', eu: '40', cm: '25' },
          { us: '8', uk: '7', eu: '41', cm: '26' },
          { us: '9', uk: '8', eu: '42', cm: '27' },
          { us: '10', uk: '9', eu: '43', cm: '28' },
          { us: '11', uk: '10', eu: '44', cm: '29' },
          { us: '12', uk: '11', eu: '45', cm: '30' },
        ],
      },
      women: {
        headers: ['US', 'UK', 'EU', 'CM'],
        rows: [
          { us: '5', uk: '3', eu: '35', cm: '22' },
          { us: '6', uk: '4', eu: '36', cm: '23' },
          { us: '7', uk: '5', eu: '37', cm: '24' },
          { us: '8', uk: '6', eu: '38', cm: '25' },
          { us: '9', uk: '7', eu: '39', cm: '26' },
          { us: '10', uk: '8', eu: '40', cm: '27' },
          { us: '11', uk: '9', eu: '41', cm: '28' },
        ],
      },
    },
  };

  const categories = [
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'shoes', name: 'Shoes', icon: '👟' },
  ];

  const genderTabs = [
    { id: 'men', name: "Men's" },
    { id: 'women', name: "Women's" },
  ];

  const [activeGender, setActiveGender] = useState('men');

  return (
    <div className={`container my-5 ${styles.sizeGuideContainer}`}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Size Guide</h1>
            <p className={styles.subtitle}>
              Find your perfect fit with our comprehensive size charts
            </p>
          </div>

          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryTab} ${
                  activeCategory === category.id ? styles.activeTab : ''
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className={styles.categoryIcon}>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* Gender Tabs */}
          <div className={styles.genderTabs}>
            {genderTabs.map((gender) => (
              <button
                key={gender.id}
                className={`${styles.genderTab} ${
                  activeGender === gender.id ? styles.activeGenderTab : ''
                }`}
                onClick={() => setActiveGender(gender.id)}
              >
                {gender.name}
              </button>
            ))}
          </div>

          {/* Measurement Unit Toggle */}
          <div className={styles.unitToggle}>
            <span className={styles.unitLabel}>Measurements in:</span>
            <button
              className={`${styles.unitBtn} ${
                measurementUnit === 'inches' ? styles.activeUnit : ''
              }`}
              onClick={() => setMeasurementUnit('inches')}
            >
              Inches
            </button>
            <button
              className={`${styles.unitBtn} ${
                measurementUnit === 'cm' ? styles.activeUnit : ''
              }`}
              onClick={() => setMeasurementUnit('cm')}
            >
              CM
            </button>
          </div>

          {/* Size Chart */}
          <div className={styles.chartContainer}>
            <div className={styles.tableResponsive}>
              <table className={styles.sizeTable}>
                <thead>
                  <tr>
                    {activeCategory === 'clothing' &&
                      sizeData.clothing[activeGender].headers.map(
                        (header, index) => <th key={index}>{header}</th>
                      )}
                    {activeCategory === 'shoes' &&
                      sizeData.shoes[activeGender].headers.map(
                        (header, index) => <th key={index}>{header}</th>
                      )}
                  </tr>
                </thead>
                <tbody>
                  {activeCategory === 'clothing' &&
                    sizeData.clothing[activeGender].rows.map((row, index) => (
                      <tr key={index}>
                        <td className={styles.sizeCell}>{row.size}</td>
                        <td>{row.chest || row.bust}</td>
                        <td>{row.waist}</td>
                        <td>{row.hip}</td>
                        <td>{row.shoulder || row.length}</td>
                      </tr>
                    ))}
                  {activeCategory === 'shoes' &&
                    sizeData.shoes[activeGender].rows.map((row, index) => (
                      <tr key={index}>
                        <td className={styles.sizeCell}>{row.us}</td>
                        <td>{row.uk}</td>
                        <td>{row.eu}</td>
                        <td>{row.cm}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure Section */}
          <div className={styles.measureSection}>
            <h2 className={styles.sectionTitle}>How to Measure</h2>

            {activeCategory === 'clothing' && (
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className={styles.measureCard}>
                    <h3 className={styles.measureTitle}>📏 Chest/Bust</h3>
                    <p className={styles.measureText}>
                      Measure around the fullest part of your chest, keeping the
                      tape horizontal.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className={styles.measureCard}>
                    <h3 className={styles.measureTitle}>📏 Waist</h3>
                    <p className={styles.measureText}>
                      Measure around your natural waistline, keeping the tape
                      comfortably loose.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className={styles.measureCard}>
                    <h3 className={styles.measureTitle}>📏 Hip</h3>
                    <p className={styles.measureText}>
                      Measure around the fullest part of your hips, about 8
                      inches below your waist.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className={styles.measureCard}>
                    <h3 className={styles.measureTitle}>📏 Shoulder/Length</h3>
                    <p className={styles.measureText}>
                      For shoulders: measure from one shoulder point to the
                      other. For length: measure from shoulder to hem.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'shoes' && (
              <div className="row">
                <div className="col-md-12">
                  <div className={styles.measureCard}>
                    <h3 className={styles.measureTitle}>👣 Foot Length</h3>
                    <p className={styles.measureText}>
                      1. Place your foot on a piece of paper
                      <br />
                      2. Mark the longest points of your heel and toe
                      <br />
                      3. Measure the distance between the marks
                      <br />
                      4. Use the measurement to find your size in the chart
                      above
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tips Section */}
          <div className={styles.tipsSection}>
            <h2 className={styles.sectionTitle}>💡 Sizing Tips</h2>
            <ul className={styles.tipsList}>
              <li>Measurements may vary by style and brand</li>
              <li>If you're between sizes, we recommend sizing up</li>
              <li>Check individual product pages for specific fit notes</li>
              <li>
                For the most accurate fit, measure yourself wearing the
                undergarments you plan to wear
              </li>
              <li>
                If in doubt, contact our customer service team for personalized
                assistance
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className={styles.contactSection}>
            <h3 className={styles.contactTitle}>Still Need Help?</h3>
            <p className={styles.contactText}>
              Our customer service team is here to help you find the perfect
              fit!
            </p>
            <div className={styles.contactButtons}>
              <button className={`btn btn-primary ${styles.contactBtn}`}>
                📧 Email Us
              </button>
              <button
                className={`btn btn-outline-primary ${styles.contactBtn}`}
              >
                💬 Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
