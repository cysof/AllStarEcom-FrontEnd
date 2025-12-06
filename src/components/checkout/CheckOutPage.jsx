import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderSummary from './OrderSummary';
import PaymentSection from './PaymentSection';
import api from '../../api';
import Spinner from '../ui/Spinner';

const CheckOutPage = () => {
  const { orderNumber } = useParams(); // Get order number from URL
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      // If no order number, redirect to cart or show error
      if (!orderNumber) {
        setError('No order specified. Please create an order first.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        if (!token) {
          // User not logged in - redirect to login
          navigate('/login?return=/checkout');
          return;
        }

        // Fetch order details from API
        const response = await api.get(`orders/${orderNumber}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrder(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching order:', err);

        if (err.response?.status === 404) {
          setError('Order not found. Please create a new order.');
        } else if (
          err.response?.status === 401 ||
          err.response?.status === 403
        ) {
          setError('Please log in to view this order.');
          // Optional: redirect to login
          navigate('/login?return=/checkout');
        } else {
          setError('Failed to load order. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber, navigate]);

  const handlePayment = async (paymentData) => {
    if (!orderNumber) {
      alert('No order specified');
      return;
    }

    try {
      setPaymentLoading(true);
      const token = localStorage.getItem('token');

      // Initiate payment for this order
      const response = await api.post(
        `orders/${orderNumber}/pay/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Redirect to Flutterwave payment page
      if (response.data.data && response.data.data.link) {
        window.location.href = response.data.data.link;
      } else {
        throw new Error('No payment link received');
      }
    } catch (err) {
      console.error('Payment initiation error:', err);
      const errorMsg =
        err.response?.data?.error ||
        'Failed to initiate payment. Please try again.';
      alert(errorMsg);
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      setPaymentLoading(true);
      const token = localStorage.getItem('token');

      await api.post(
        `orders/${orderNumber}/cancel/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Order cancelled successfully.');
      navigate('/orders'); // Redirect to orders page
    } catch (err) {
      console.error('Error cancelling order:', err);
      const errorMsg = err.response?.data?.error || 'Failed to cancel order.';
      alert(errorMsg);
    } finally {
      setPaymentLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return <Spinner loading={loading} />;
  }

  // Error state
  if (error) {
    return (
      <div className="container my-5 py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <div className="mt-3">
            <button
              onClick={() => navigate('/cart')}
              className="btn btn-primary me-2"
            >
              Back to Cart
            </button>
            <button
              onClick={() => navigate('/orders')}
              className="btn btn-outline-secondary"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No order data
  if (!order) {
    return (
      <div className="container my-5 py-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">No Order Data</h4>
          <p>Unable to load order details.</p>
          <button
            onClick={() => navigate('/cart')}
            className="btn btn-primary mt-2"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-3 py-4">
      {/* Order Header */}
      <div className="mb-4">
        <h2 className="mb-2">Order #{order.order_number}</h2>
        <div className="d-flex align-items-center gap-3">
          <span
            className={`badge ${
              order.status === 'pending'
                ? 'bg-warning'
                : order.status === 'processing'
                ? 'bg-info'
                : order.status === 'paid'
                ? 'bg-success'
                : 'bg-secondary'
            }`}
          >
            {order.status.toUpperCase()}
          </span>
          <small className="text-muted">
            Created: {new Date(order.created_at).toLocaleDateString()}
          </small>
        </div>
      </div>

      <div className="row">
        {/* Order Summary - Updated to use order data */}
        <div className="col-lg-8 mb-4">
          <OrderSummary
            order={order}
            onCancel={handleCancelOrder}
            canCancel={
              order.status === 'pending' || order.status === 'payment_failed'
            }
          />
        </div>

        {/* Payment Section - Updated for order payment */}
        <div className="col-lg-4">
          <PaymentSection
            onSubmit={handlePayment}
            loading={paymentLoading}
            order={order}
            canPay={
              order.status === 'pending' || order.status === 'payment_failed'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
