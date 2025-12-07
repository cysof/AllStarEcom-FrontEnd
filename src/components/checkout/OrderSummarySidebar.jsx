// ============================================================================
// OrderSummarySidebar.jsx
// Sticky Summary displayed alongside checkout steps
// ============================================================================
import React from 'react';

const OrderSummarySidebar = ({ cart, shippingFee, currentStep }) => {
  if (!cart) {
    return null;
  }

  const subtotal = cart.sum_total || 0;
  const vat = (subtotal * 0.075).toFixed(2); // 7.5% VAT
  const grandTotal = (
    parseFloat(subtotal) +
    parseFloat(vat) +
    shippingFee
  ).toFixed(2);

  const stepLabels = {
    1: 'Address',
    2: 'Shipping Method',
    3: 'Review Order',
  };

  return (
    <div className="position-sticky" style={{ top: '20px' }}>
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          {/* Header */}
          <h5 className="card-title mb-3">
            <i className="bi bi-receipt me-2"></i>
            Order Summary
          </h5>
          <hr className="my-3" />

          {/* Current Step */}
          <div className="mb-3 pb-3 border-bottom">
            <small className="text-muted d-block mb-1">Current Step</small>
            <p className="mb-0">
              <strong>{stepLabels[currentStep]}</strong>
            </p>
          </div>

          {/* Items Count */}
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Items ({cart.num_of_items}):</span>
            <span className="fw-normal">
              ₦{parseFloat(subtotal).toFixed(2)}
            </span>
          </div>

          {/* VAT */}
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">VAT (7.5%):</span>
            <span className="fw-normal">₦{vat}</span>
          </div>

          {/* Shipping */}
          <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
            <span className="text-muted">Shipping:</span>
            <span className={shippingFee === 0 ? 'text-success fw-medium' : ''}>
              {shippingFee === 0 ? 'Free' : `₦${shippingFee.toFixed(2)}`}
            </span>
          </div>

          {/* Grand Total */}
          <div className="d-flex justify-content-between mb-3">
            <span className="fw-bold">Total:</span>
            <strong className="text-primary fs-5">₦{grandTotal}</strong>
          </div>

          {/* Items Preview */}
          <hr className="my-3" />
          <p className="small text-muted mb-2">
            <strong>Items in Cart:</strong>
          </p>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {cart.items?.map((item) => (
              <div key={item.id} className="mb-2 pb-2 border-bottom">
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <small className="text-truncate">{item.product.name}</small>
                  <small className="text-muted flex-shrink-0">
                    x{item.quantity}
                  </small>
                </div>
                <small className="text-muted">
                  ₦{parseFloat(item.total).toFixed(2)}
                </small>
              </div>
            ))}
          </div>

          {/* Security Badge */}
          <div className="mt-3 pt-3 text-center border-top">
            <small className="text-muted d-flex align-items-center justify-content-center gap-1">
              <i className="bi bi-shield-check"></i>
              Secure by Flutterwave
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummarySidebar;
