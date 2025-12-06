import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import api from '../../api';
import Spinner from '../ui/Spinner';

const PaymentStatusPage = ({ setNumCartItems }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [statusMessage, setStatusMessage] = useState('Verifying your Payment');
  const [statusSubMessage, setStatusSubMessage] = useState(
    'Wait a moment, your payment is being verified!'
  );
  const [isLoading, setIsLoading] = useState(true);
  const [orderNumber, setOrderNumber] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const txRef = queryParams.get('tx_ref');
    const transactionId = queryParams.get('transaction_id');

    if (status && txRef && transactionId) {
      // Store payment status for UI
      setPaymentStatus(status);

      api
        .post(
          `payment_callback/?status=${status}&tx_ref=${txRef}&transaction_id=${transactionId}`
        )
        .then((response) => {
          setStatusMessage(response.data.message);
          setStatusSubMessage(response.data.subMessage);

          // Extract order number if available
          if (response.data.order_number) {
            setOrderNumber(response.data.order_number);
          }

          // Update cart items count (optional)
          if (setNumCartItems) {
            // You might want to fetch cart again or set to 0
            // For now, let's keep cart for continued shopping
            // setNumCartItems(0);
          }

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

  // Determine background color based on payment status
  const getBackgroundColor = () => {
    if (isLoading) return '#6050DC'; // Default blue while loading
    if (paymentStatus === 'successful') return '#28a745'; // Green for success
    if (paymentStatus === 'failed') return '#dc3545'; // Red for failure
    return '#6050DC'; // Default blue
  };

  if (isLoading) {
    return (
      <header
        className="py-5"
        style={{ backgroundColor: '#6050DC', minHeight: '70vh' }}
      >
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <Spinner loading={true} />
            <h2 className="display-4 fw-bold mt-4">{statusMessage}</h2>
            <p className="lead fw-normal text-white-75 mb-4">
              {statusSubMessage}
            </p>
          </div>
        </div>
      </header>
    );
  }

  const backgroundColor = getBackgroundColor();
  const isSuccess = paymentStatus === 'successful';

  return (
    <header
      className="py-5"
      style={{
        backgroundColor,
        minHeight: '70vh',
        transition: 'background-color 0.5s ease',
      }}
    >
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center text-white">
          {/* Status Icon */}
          <div className="mb-4">
            {isSuccess ? (
              <div className="status-icon-success">
                <i
                  className="bi bi-check-circle"
                  style={{ fontSize: '4rem' }}
                ></i>
              </div>
            ) : (
              <div className="status-icon-failed">
                <i className="bi bi-x-circle" style={{ fontSize: '4rem' }}></i>
              </div>
            )}
          </div>

          <h2 className="display-4 fw-bold">{statusMessage}</h2>
          <p className="lead fw-normal text-white-75 mb-4">
            {statusSubMessage}
          </p>

          {/* Show order number if available */}
          {orderNumber && (
            <div
              className="alert alert-light alert-dismissible fade show d-inline-block"
              role="alert"
            >
              <strong>Order #{orderNumber}</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-5">
            {isSuccess ? (
              <>
                {orderNumber ? (
                  <Link
                    to={`/order/${orderNumber}`}
                    className="btn btn-light btn-lg px-4 py-2 mx-2 mb-2"
                  >
                    <i className="bi bi-receipt me-2"></i>
                    View Order Details
                  </Link>
                ) : (
                  <Link
                    to="/orders"
                    className="btn btn-light btn-lg px-4 py-2 mx-2 mb-2"
                  >
                    <i className="bi bi-list-ul me-2"></i>
                    View My Orders
                  </Link>
                )}
                <Link
                  to="/products"
                  className="btn btn-outline-light btn-lg px-4 py-2 mx-2 mb-2"
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Continue Shopping
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate(-1)}
                  className="btn btn-light btn-lg px-4 py-2 mx-2 mb-2"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Try Payment Again
                </button>
                <Link
                  to="/cart"
                  className="btn btn-outline-light btn-lg px-4 py-2 mx-2 mb-2"
                >
                  <i className="bi bi-cart me-2"></i>
                  Back to Cart
                </Link>
                <Link
                  to="/"
                  className="btn btn-outline-light btn-lg px-4 py-2 mx-2 mb-2"
                >
                  <i className="bi bi-house me-2"></i>
                  Go Home
                </Link>
              </>
            )}
          </div>

          {/* Additional Info for Success */}
          {isSuccess && (
            <div className="mt-5">
              <div className="card bg-transparent border-light">
                <div className="card-body">
                  <h5 className="card-title text-white">
                    <i className="bi bi-info-circle me-2"></i>
                    What Happens Next?
                  </h5>
                  <ul className="list-unstyled text-white-75">
                    <li className="mb-2">
                      <i className="bi bi-check2 me-2"></i>
                      Your order is now being processed
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-truck me-2"></i>
                      You'll receive shipping updates via email
                    </li>
                    <li>
                      <i className="bi bi-envelope me-2"></i>
                      Order confirmation sent to your email
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PaymentStatusPage;
