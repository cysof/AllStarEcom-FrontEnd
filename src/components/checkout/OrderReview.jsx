// ============================================================================
// OrderReview.jsx
// Step 3: Review Order Details Before Creating Order
// ============================================================================
import React from 'react';

const OrderReview = ({
  cart,
  shippingAddress,
  shippingMethod,
  shippingFee,
  onSubmit,
  onBack,
  loading,
}) => {
  // Calculate totals
  const subtotal = cart?.sum_total || 0;
  const vat = (subtotal * 0.075).toFixed(2); // 7.5% VAT
  const grandTotal = (
    parseFloat(subtotal) +
    parseFloat(vat) +
    shippingFee
  ).toFixed(2);

  // Build shipping address payload for backend
  const buildShippingAddressPayload = () => {
    return {
      full_name: `${shippingAddress.first_name} ${shippingAddress.last_name}`,
      email: shippingAddress.email || '', // User's email from profile
      phone: shippingAddress.phone,
      address_line1: shippingAddress.address,
      address_line2: '', // Optional
      city: shippingAddress.city,
      state: shippingAddress.state,
      postal_code: '', // Optional
      country: 'Nigeria',
      delivery_notes: '',
    };
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h5 className="card-title mb-4">
          <i className="bi bi-clipboard-check me-2"></i>
          Review Your Order
        </h5>

        {/* Shipping Address Section */}
        <div className="mb-4 pb-4 border-bottom">
          <h6 className="mb-3">
            <i className="bi bi-geo-alt me-2"></i>
            Shipping Address
          </h6>
          <p className="mb-1">
            <strong>
              {shippingAddress.first_name} {shippingAddress.last_name}
            </strong>
          </p>
          <p className="mb-1">{shippingAddress.address}</p>
          <p className="mb-1">
            {shippingAddress.city}, {shippingAddress.state}
          </p>
          <p className="mb-0 text-muted">{shippingAddress.phone}</p>
          <button
            className="btn btn-sm btn-outline-primary mt-2"
            onClick={onBack}
            disabled={loading}
          >
            <i className="bi bi-pencil me-1"></i>
            Edit Address
          </button>
        </div>

        {/* Shipping Method Section */}
        <div className="mb-4 pb-4 border-bottom">
          <h6 className="mb-3">
            <i className="bi bi-box-seam me-2"></i>
            Shipping Method
          </h6>
          <p className="mb-1">
            <strong>{shippingMethod?.name}</strong>
          </p>
          {shippingMethod?.days && (
            <p className="mb-1 text-muted">
              <i className="bi bi-calendar me-1"></i>
              Delivery in {shippingMethod.days} business day
              {shippingMethod.days > 1 ? 's' : ''}
            </p>
          )}
          <p className="mb-0">
            <strong>
              {shippingFee === 0 ? (
                <span className="text-success">Free Shipping</span>
              ) : (
                `₦${shippingFee.toFixed(2)}`
              )}
            </strong>
          </p>
          <button
            className="btn btn-sm btn-outline-primary mt-2"
            onClick={onBack}
            disabled={loading}
          >
            <i className="bi bi-pencil me-1"></i>
            Change Method
          </button>
        </div>

        {/* Order Items Section */}
        <div className="mb-4 pb-4 border-bottom">
          <h6 className="mb-3">
            <i className="bi bi-bag me-2"></i>
            Order Items ({cart?.num_of_items || 0})
          </h6>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {cart?.items?.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom"
              >
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={
                      item.product.thumbnail_url ||
                      item.product.image_url ||
                      'https://dummyimage.com/50x50/dee2e6/6c757d.jpg'
                    }
                    alt={item.product.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                  <div>
                    <p className="mb-0 small">{item.product.name}</p>
                    <small className="text-muted">
                      Qty: {item.quantity} × ₦
                      {parseFloat(item.product.price).toFixed(2)}
                    </small>
                  </div>
                </div>
                <p className="mb-0 fw-bold">
                  ₦{parseFloat(item.total).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>₦{parseFloat(subtotal).toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>VAT (7.5%):</span>
            <span>₦{vat}</span>
          </div>
          <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
            <span>Shipping:</span>
            <span>
              {shippingFee === 0 ? (
                <span className="text-success">Free</span>
              ) : (
                `₦${shippingFee.toFixed(2)}`
              )}
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <h6 className="mb-0">Total:</h6>
            <h6 className="mb-0 text-primary">₦{grandTotal}</h6>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="alert alert-info small mb-4" role="alert">
          <i className="bi bi-info-circle me-2"></i>
          By placing this order, you agree to our Terms & Conditions and Privacy
          Policy.
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-3">
          <button
            onClick={onBack}
            className="btn btn-outline-secondary flex-grow-1"
            disabled={loading}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </button>
          <button
            onClick={onSubmit}
            className="btn btn-success flex-grow-1"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Creating Order...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>
                Place Order & Continue to Payment
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
