import React from 'react';
import styles from './PaymentSection.module.css';

const PaymentSection = () => {
  const handlePayPalPayment = () => {
    console.log('PayPal payment initiated');
    // Add PayPal integration logic here
  };

  const handleFlutterwavePayment = () => {
    console.log('Flutterwave payment initiated');
    // Add Flutterwave integration logic here
  };

  return (
    <div className="col-md-4">
      <div className={`card ${styles.card}`}>
        <div
          className="card-header"
          style={{ backgroundColor: '#6050DC', color: 'white' }}
        >
          <h5 className="mb-0">Payment Options</h5>
        </div>
        <div className="card-body">
          {/* PayPal Button */}
          <button
            className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`}
            id="paypal-button"
            onClick={handlePayPalPayment}
          >
            <i className="bi bi-paypal me-2"></i>
            Pay With PayPal
          </button>

          {/* Flutterwave Button */}
          <button
            className={`btn btn-warning w-100 ${styles.flutterwaveButton}`}
            id="flutterwave-button"
            onClick={handleFlutterwavePayment}
          >
            <i className="bi bi-credit-card me-2"></i>
            Pay with Flutterwave
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
