import React, { useEffect, useState } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

const PaymentStatusPage = ({ setNumCartItems }) => {
  const [statusMessage, setStatusMessage] = useState('Verifying your Payment');
  const [statusSubMessage, setStatusSubMessage] = useState(
    'Wait a moment, your payment is being verified!'
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const txRef = queryParams.get('tx_ref');
    const transactionId = queryParams.get('transaction_id');

    if (status && txRef && transactionId) {
      api
        .post(
          `payment_callback/?status=${status}&tx_ref=${txRef}&transaction_id=${transactionId}`
        )
        .then((response) => {
          setStatusMessage(response.data.message);
          setStatusSubMessage(response.data.subMessage);
          localStorage.removeItem('cart_code');
          setNumCartItems(0);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Payment verification error:', err.message);
          setStatusMessage('Payment Verification Failed');
          setStatusSubMessage(
            'There was an error verifying your payment. Please contact support.'
          );
          setIsLoading(false);
        });
    } else {
      setStatusMessage('Invalid Payment Details');
      setStatusSubMessage('Missing required payment information.');
      setIsLoading(false);
    }
  }, [location.search, setNumCartItems]);

  return (
    <header className="py-5" style={{ backgroundColor: '#6050DC' }}>
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          <h2 className="display-4 fw-bold">{statusMessage}</h2>
          <p className="lead fw-normal text-white-75 mb-4">
            {statusSubMessage}
          </p>
          {!isLoading && (
            <span>
              <Link
                to="/profile"
                className="btn btn-light btn-lg px-4 py-2 mx-3"
              >
                View Order Details
              </Link>
              <Link to="/" className="btn btn-light btn-lg px-4 py-2">
                Continue Shopping
              </Link>
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default PaymentStatusPage;
