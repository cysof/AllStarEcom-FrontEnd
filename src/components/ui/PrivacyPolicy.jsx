import React from 'react';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={`container my-5 ${styles.privacyContainer}`}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Privacy Policy</h1>
            <p className={styles.lastUpdated}>
              Last Updated: November 24, 2025
            </p>
          </div>

          {/* Introduction */}
          <section className={styles.section}>
            <p className={styles.intro}>
              Welcome to our Privacy Policy. Your privacy is critically
              important to us. This Privacy Policy document contains types of
              information that is collected and recorded by our website and how
              we use it.
            </p>
          </section>

          {/* Information We Collect */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
            <p className={styles.text}>
              We collect several different types of information for various
              purposes to provide and improve our service to you.
            </p>

            <h3 className={styles.subTitle}>Personal Data</h3>
            <p className={styles.text}>
              While using our service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you. This may include:
            </p>
            <ul className={styles.list}>
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Address, State, Province, ZIP/Postal code, City</li>
              <li>Cookies and Usage Data</li>
            </ul>

            <h3 className={styles.subTitle}>Usage Data</h3>
            <p className={styles.text}>
              We may also collect information on how the service is accessed and
              used. This Usage Data may include information such as your
              computer's Internet Protocol address, browser type, browser
              version, the pages you visit, the time and date of your visit, and
              other diagnostic data.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              2. How We Use Your Information
            </h2>
            <p className={styles.text}>
              We use the collected data for various purposes:
            </p>
            <ul className={styles.list}>
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features</li>
              <li>To provide customer support</li>
              <li>
                To gather analysis or valuable information to improve our
                service
              </li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To process your orders and manage your account</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Data Security</h2>
            <p className={styles.text}>
              The security of your data is important to us, but remember that no
              method of transmission over the Internet or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot
              guarantee its absolute security.
            </p>
            <p className={styles.text}>
              We implement appropriate technical and organizational measures to
              protect your personal information, including:
            </p>
            <ul className={styles.list}>
              <li>Encryption of sensitive data</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure payment processing</li>
            </ul>
          </section>

          {/* Cookies */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Cookies and Tracking</h2>
            <p className={styles.text}>
              We use cookies and similar tracking technologies to track activity
              on our service and hold certain information. Cookies are files
              with a small amount of data which may include an anonymous unique
              identifier.
            </p>
            <p className={styles.text}>
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our service.
            </p>
          </section>

          {/* Third-Party Services */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Third-Party Services</h2>
            <p className={styles.text}>
              We may employ third-party companies and individuals to facilitate
              our service, provide the service on our behalf, perform
              service-related services, or assist us in analyzing how our
              service is used.
            </p>
            <p className={styles.text}>
              These third parties have access to your Personal Data only to
              perform these tasks on our behalf and are obligated not to
              disclose or use it for any other purpose. This may include:
            </p>
            <ul className={styles.list}>
              <li>Payment processors</li>
              <li>Analytics services</li>
              <li>Email service providers</li>
              <li>Cloud storage providers</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              6. Your Data Protection Rights
            </h2>
            <p className={styles.text}>
              You have certain data protection rights. You have the right to:
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Access:</strong> Request copies of your personal data
              </li>
              <li>
                <strong>Rectification:</strong> Request correction of inaccurate
                data
              </li>
              <li>
                <strong>Erasure:</strong> Request deletion of your personal data
              </li>
              <li>
                <strong>Restrict Processing:</strong> Request restriction of
                processing
              </li>
              <li>
                <strong>Object to Processing:</strong> Object to our processing
                of your data
              </li>
              <li>
                <strong>Data Portability:</strong> Request transfer of your data
              </li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Children's Privacy</h2>
            <p className={styles.text}>
              Our service does not address anyone under the age of 18. We do not
              knowingly collect personally identifiable information from
              children under 18. If you are a parent or guardian and you are
              aware that your child has provided us with personal data, please
              contact us.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              8. Changes to This Privacy Policy
            </h2>
            <p className={styles.text}>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last Updated" date at the top of this Privacy
              Policy.
            </p>
            <p className={styles.text}>
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
          </section>

          {/* Contact Us */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Contact Us</h2>
            <p className={styles.text}>
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <div className={styles.contactInfo}>
              <p>
                <strong>Email:</strong> privacy@yourcompany.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Address:</strong> 123 Business Street, City, State 12345
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              By using our service, you agree to the collection and use of
              information in accordance with this policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
