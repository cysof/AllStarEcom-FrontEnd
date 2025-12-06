import React from 'react';
import OrderItem from './OrderItem';

const OrderSummary = ({ order = null, onCancel = null, canCancel = false }) => {
  // Early return if no order data
  if (!order) {
    return (
      <div className="col-md-8">
        <div className="card mb-4">
          <div className="card-body">
            <p className="text-muted text-center py-4">
              No order data available
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Extract data from order object
  const {
    order_number,
    status,
    created_at,
    items = [],
    shipping_address = {},
    shipping_method = {},
    subtotal = 0,
    shipping_fee = 0,
    tax = 0,
    total = 0,
  } = order;

  // Format currency to Naira
  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount).toFixed(2)}`;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'danger';
      case 'refunded':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="col-md-8">
      {/* Order Information Card */}
      <div className="card mb-4">
        <div
          className="card-header d-flex justify-content-between align-items-center"
          style={{ backgroundColor: '#6050DC', color: 'white' }}
        >
          <h5 className="mb-0">Order #{order_number}</h5>
          <span className={`badge bg-${getStatusColor(status)}`}>
            {status.toUpperCase()}
          </span>
        </div>
        <div className="card-body">
          {/* Order Details */}
          <div className="mb-4">
            <small className="text-muted">Order Placed</small>
            <p className="mb-0">{formatDate(created_at)}</p>
          </div>

          {/* Order Items */}
          <h6 className="mb-3">Items in Order</h6>
          <div
            className="px-3 mb-4"
            style={{ maxHeight: '300px', overflowY: 'auto' }}
          >
            {items.length > 0 ? (
              items.map((item, index) => (
                <OrderItem key={item.id || index} item={item} />
              ))
            ) : (
              <p className="text-muted text-center py-4">No items in order</p>
            )}
          </div>

          {/* Shipping Address */}
          {shipping_address && (
            <div className="mb-4">
              <h6 className="mb-3">Shipping Address</h6>
              <div className="card bg-light">
                <div className="card-body">
                  <p className="mb-1">
                    <strong>{shipping_address.full_name}</strong>
                  </p>
                  <p className="mb-1">{shipping_address.address_line1}</p>
                  {shipping_address.address_line2 && (
                    <p className="mb-1">{shipping_address.address_line2}</p>
                  )}
                  <p className="mb-1">
                    {shipping_address.city}, {shipping_address.state}
                  </p>
                  <p className="mb-1">{shipping_address.country}</p>
                  <p className="mb-1">Phone: {shipping_address.phone}</p>
                  <p className="mb-0">Email: {shipping_address.email}</p>
                  {shipping_address.delivery_notes && (
                    <div className="mt-2">
                      <small className="text-muted">
                        <strong>Delivery Notes:</strong>{' '}
                        {shipping_address.delivery_notes}
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Shipping Method */}
          {shipping_method && (
            <div className="mb-4">
              <h6 className="mb-3">Shipping Method</h6>
              <div className="card bg-light">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb-0">
                        <strong>{shipping_method.name}</strong>
                      </p>
                      <small className="text-muted">
                        {shipping_method.description}
                      </small>
                    </div>
                    <div className="text-end">
                      <p className="mb-0">
                        <strong>{formatCurrency(shipping_fee)}</strong>
                      </p>
                      {shipping_method.estimated_days && (
                        <small className="text-muted">
                          Est. delivery: {shipping_method.estimated_days}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Totals */}
          <div className="card bg-light">
            <div className="card-body">
              <h6 className="mb-3">Order Summary</h6>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>{formatCurrency(shipping_fee)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (VAT):</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-0">
                <strong>Grand Total:</strong>
                <strong className="text-primary fs-5">
                  {formatCurrency(total)}
                </strong>
              </div>
            </div>
          </div>

          {/* Cancel Button (if applicable) */}
          {canCancel && onCancel && (
            <div className="mt-4 text-center">
              <button
                className="btn btn-outline-danger"
                onClick={onCancel}
                disabled={!canCancel}
              >
                <i className="bi bi-x-circle me-2"></i>
                Cancel Order
              </button>
              <p className="text-muted mt-2 small">
                You can cancel this order as long as it hasn't been processed
                yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
