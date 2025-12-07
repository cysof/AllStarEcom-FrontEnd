// ============================================================================
// CartSummary.jsx - FIXED Version
// Displays order summary and checkout button
// ============================================================================
import React, { useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const CartSummary = React.memo(
  ({
    cartItems = [],
    subtotal = 0,
    shippingFee = 0,
    vatAmount = 0,
    grandTotal = 0,
    itemCount = 0,
    allItemsInStock = true,
  }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    // Format currency helper
    const formatCurrency = (amount) => {
      return `₦${parseFloat(amount).toFixed(2)}`;
    };

    // Calculate total items count
    const totalItems = useMemo(() => {
      if (itemCount > 0) return itemCount;
      return cartItems.reduce(
        (count, item) => count + parseInt(item.quantity || 0),
        0
      );
    }, [itemCount, cartItems]);

    // Check if cart has items
    const hasItems = cartItems.length > 0;

    // Handle checkout flow
    const handleCheckout = () => {
      // Check if user is authenticated via AuthContext
      if (!isAuthenticated) {
        toast.info('Please log in to proceed with checkout');
        navigate('/login', { state: { returnTo: '/checkout' } });
        return;
      }

      // Validate all items are in stock
      if (!allItemsInStock) {
        toast.warning(
          'Some items are out of stock. Please remove them before checking out.'
        );
        return;
      }

      // Proceed to checkout
      navigate('/checkout');
    };

    return (
      <div className="position-sticky" style={{ top: '20px' }}>
        <div className="card shadow-sm border-0">
          <div className="card-body">
            {/* Header */}
            <h5 className="card-title mb-3">Order Summary</h5>
            <hr className="my-3" />

            {/* Summary Items */}
            <div className="mb-3">
              {/* Items */}
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Items ({totalItems}):</span>
                <span className="fw-normal">{formatCurrency(subtotal)}</span>
              </div>

              {/* Shipping */}
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Shipping:</span>
                <span
                  className={shippingFee === 0 ? 'text-success fw-medium' : ''}
                >
                  {shippingFee === 0 ? 'Free' : formatCurrency(shippingFee)}
                </span>
              </div>

              {/* VAT */}
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">VAT (7.5%):</span>
                <span className="fw-normal">{formatCurrency(vatAmount)}</span>
              </div>
            </div>

            <hr className="my-3" />

            {/* Grand Total */}
            <div className="d-flex justify-content-between mb-3">
              <span className="fw-bold">Total:</span>
              <strong className="text-primary fs-5">
                {formatCurrency(grandTotal)}
              </strong>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="btn btn-success w-100 py-2 fw-medium"
              style={{
                backgroundColor: '#50dc60',
                borderColor: '#50dc60',
                opacity: !hasItems || !allItemsInStock ? 0.6 : 1,
              }}
              disabled={!hasItems || !allItemsInStock}
              aria-label={
                !hasItems
                  ? 'Cart is empty'
                  : !allItemsInStock
                  ? 'Some items are out of stock'
                  : 'Proceed to checkout'
              }
            >
              {!hasItems ? 'Cart is Empty' : 'Proceed to Checkout'}
            </button>

            {/* Info Messages */}
            {!hasItems && (
              <p className="text-muted text-center mt-2 mb-0 small">
                Add items to your cart to checkout
              </p>
            )}

            {!allItemsInStock && (
              <div
                className="alert alert-warning mt-2 mb-0 py-2 px-2"
                role="alert"
              >
                <small>
                  <i className="bi bi-exclamation-triangle me-1"></i>
                  Some items are out of stock
                </small>
              </div>
            )}

            <hr className="my-3" />

            {/* Continue Shopping Link */}
            <a
              href="/products"
              className="btn btn-outline-secondary w-100 py-2"
              style={{ textDecoration: 'none' }}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Continue Shopping
            </a>

            {/* Security Badge */}
            <div className="mt-3 text-center">
              <small className="text-muted d-flex align-items-center justify-content-center gap-1">
                <i className="bi bi-shield-check"></i>
                Secure checkout powered by Flutterwave
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CartSummary.displayName = 'CartSummary';

export default CartSummary;
