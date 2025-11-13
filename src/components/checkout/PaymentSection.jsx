import React, { useState } from 'react';
import styles from './PaymentSection.module.css';
import api from '../../api';

const PaymentSection = () => {
  const [loading, setLoading] = useState(false);

  function makePayment() {
    setLoading(true);
    const cart_code = localStorage.getItem('cart_code');

    // Get the access token
    const token = localStorage.getItem('access_token');

    api
      .post(
        '/initiate_payment/',
        { cart_code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        window.location.href = response.data.data.link;
      })
      .catch((err) => {
        console.error('Payment error:', err.response?.data || err.message);
        setLoading(false);
      });
  }

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
          >
            <i className="bi bi-paypal me-2"></i>
            Pay With PayPal
          </button>

          {/* Flutterwave Button */}
          <button
            className={`btn btn-warning w-100 ${styles.flutterwaveButton}`}
            id="flutterwave-button"
            onClick={makePayment}
            disabled={loading}
          >
            <i className="bi bi-credit-card me-2"></i>
            {loading ? 'Processing...' : 'Pay with Flutterwave'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
