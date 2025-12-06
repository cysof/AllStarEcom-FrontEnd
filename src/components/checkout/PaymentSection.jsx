import React, { useState } from 'react';
import styles from './PaymentSection.module.css';
import api from '../../api';

const PaymentSection = ({
  onSubmit,
  loading: externalLoading,
  order = null,
  canPay = true,
}) => {
  const [internalLoading, setInternalLoading] = useState(false);

  // Use external loading prop or internal loading state
  const isLoading = externalLoading || internalLoading;

  // Format currency to Naira
  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount).toFixed(2)}`;
  };

  // Get payment status badge
  const getPaymentStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'paid':
        return <span className="badge bg-success">PAID</span>;
      case 'pending':
        return <span className="badge bg-warning">PENDING</span>;
      case 'failed':
        return <span className="badge bg-danger">FAILED</span>;
      default:
        return <span className="badge bg-secondary">UNKNOWN</span>;
    }
  };

  // Handle payment button click
  const handlePayment = async () => {
    if (!onSubmit) {
      console.error('No onSubmit handler provided');
      return;
    }

    setInternalLoading(true);

    try {
      await onSubmit();
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setInternalLoading(false);
    }
  };

  // If no order data, show loading/error state
  if (!order) {
    return (
      <div className="col-md-4">
        <div className={`card ${styles.card}`}>
          <div
            className="card-header"
            style={{ backgroundColor: '#6050DC', color: 'white' }}
          >
            <h5 className="mb-0">Payment</h5>
          </div>
          <div className="card-body text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading payment details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Check if order can be paid
  const isPaid =
    order.payment_status === 'completed' || order.payment_status === 'paid';
  const isPendingPayment =
    order.status === 'pending' || order.status === 'payment_failed';
  const canMakePayment = canPay && isPendingPayment && !isPaid;

  return (
    <div className="col-md-4">
      <div className={`card ${styles.card}`}>
        <div
          className="card-header d-flex justify-content-between align-items-center"
          style={{ backgroundColor: '#6050DC', color: 'white' }}
        >
          <h5 className="mb-0">Payment</h5>
          {getPaymentStatusBadge(order.payment_status)}
        </div>

        <div className="card-body">
          {/* Order Summary */}
          <div className="mb-4">
            <h6 className="mb-3">Order Details</h6>
            <div className="card bg-light">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Order #:</span>
                  <strong>{order.order_number}</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Items:</span>
                  <span>{order.items?.length || 0}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Order Status:</span>
                  <span
                    className={`badge bg-${
                      order.status === 'pending'
                        ? 'warning'
                        : order.status === 'processing'
                        ? 'info'
                        : order.status === 'delivered'
                        ? 'success'
                        : 'secondary'
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Amount */}
          <div className="mb-4">
            <h6 className="mb-3">Payment Amount</h6>
            <div className="text-center py-3 border rounded">
              <h3 className="text-primary mb-1">
                {formatCurrency(order.total)}
              </h3>
              <small className="text-muted">Total amount to pay</small>
            </div>

            {/* Amount Breakdown */}
            <div className="mt-3">
              <small className="d-block text-muted mb-1">
                <span className="me-2">Subtotal:</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </small>
              <small className="d-block text-muted mb-1">
                <span className="me-2">Shipping:</span>
                <span>{formatCurrency(order.shipping_fee)}</span>
              </small>
              <small className="d-block text-muted">
                <span className="me-2">Tax:</span>
                <span>{formatCurrency(order.tax)}</span>
              </small>
            </div>
          </div>

          {/* Payment Button */}
          {canMakePayment ? (
            <button
              className={`btn btn-warning w-100 py-3 ${styles.flutterwaveButton}`}
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Processing Payment...
                </>
              ) : (
                <>
                  <i className="bi bi-credit-card me-2"></i>
                  Pay {formatCurrency(order.total)} with Flutterwave
                </>
              )}
            </button>
          ) : (
            <div className="text-center">
              {isPaid ? (
                <div className="alert alert-success" role="alert">
                  <i className="bi bi-check-circle me-2"></i>
                  Payment completed for this order
                </div>
              ) : !isPendingPayment ? (
                <div className="alert alert-info" role="alert">
                  <i className="bi bi-info-circle me-2"></i>
                  This order cannot be paid for at this time
                </div>
              ) : (
                <div className="alert alert-warning" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Payment not available for this order
                </div>
              )}
            </div>
          )}

          {/* Payment Instructions */}
          <div className="mt-4">
            <h6 className="mb-2">Payment Instructions</h6>
            <ul className="list-unstyled small text-muted">
              <li className="mb-1">
                <i className="bi bi-shield-check me-2 text-success"></i>
                Secure payment powered by Flutterwave
              </li>
              <li className="mb-1">
                <i className="bi bi-credit-card me-2"></i>
                Accepts cards, bank transfers, and mobile money
              </li>
              <li className="mb-1">
                <i className="bi bi-clock me-2"></i>
                Orders are processed after payment confirmation
              </li>
              <li>
                <i className="bi bi-question-circle me-2"></i>
                Need help? Contact support@allstarfashion.com
              </li>
            </ul>
          </div>

          {/* Payment Status Info */}
          {order.paid_at && (
            <div className="mt-3 pt-3 border-top">
              <small className="text-muted">
                <i className="bi bi-calendar-check me-1"></i>
                Paid on: {new Date(order.paid_at).toLocaleDateString()}
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
