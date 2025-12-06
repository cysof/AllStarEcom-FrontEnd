import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CartSummary = ({
  cartItems = [],
  subtotal = 0,
  shippingFee = 0,
  vatAmount = 0,
  grandTotal = 0,
  itemCount = 0,
  allItemsInStock = true,
}) => {
  const navigate = useNavigate();

  // Format currency to Nigerian Naira
  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount).toFixed(2)}`;
  };

  // Check if cart has items
  const hasItems = cartItems.length > 0;

  // Handle checkout button click
  const handleCheckout = () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login with return URL
      navigate('/login?return=/checkout');
      return;
    }

    // Check if all items are in stock
    if (!allItemsInStock) {
      alert(
        'Some items in your cart are out of stock. Please remove them before checking out.'
      );
      return;
    }

    // Proceed to checkout
    navigate('/checkout');
  };

  // Calculate total number of items (if itemCount not provided)
  const totalItems =
    itemCount > 0
      ? itemCount
      : cartItems.reduce((count, item) => {
          return count + parseInt(item.quantity || 0);
        }, 0);

  return (
    <div className="align-self-start sticky-top" style={{ top: '20px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Order Summary</h5>{' '}
          {/* Changed from Cart Summary */}
          <hr />
          <div className="d-flex justify-content-between mb-2">
            <span>Items ({totalItems}):</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          {/* Shipping Fee - NEW */}
          <div className="d-flex justify-content-between mb-2">
            <span>Shipping:</span>
            <span className={shippingFee === 0 ? 'text-success' : ''}>
              {shippingFee === 0 ? 'Free' : formatCurrency(shippingFee)}
            </span>
          </div>
          {/* VAT */}
          <div className="d-flex justify-content-between mb-2">
            <span>VAT (7.5%):</span>
            <span>{formatCurrency(vatAmount)}</span>
          </div>
          <hr />
          {/* Grand Total - UPDATED (includes shipping) */}
          <div className="d-flex justify-content-between mb-3">
            <span className="fw-bold">Total:</span>
            <strong className="text-primary fs-5">
              {formatCurrency(grandTotal)}
            </strong>
          </div>
          {/* Checkout Button - UPDATED */}
          <button
            onClick={handleCheckout}
            className="btn btn-success w-100 py-2"
            style={{ backgroundColor: '#50dc60', borderColor: '#50dc60' }}
            disabled={!hasItems}
            title={
              !hasItems
                ? 'Add items to checkout'
                : !allItemsInStock
                ? 'Some items are out of stock'
                : 'Proceed to checkout'
            }
          >
            {!hasItems ? 'Cart is Empty' : 'Proceed to Checkout'}
          </button>
          {!hasItems ? (
            <p className="text-muted text-center mt-2 mb-0 small">
              Add items to checkout
            </p>
          ) : (
            !allItemsInStock && (
              <div className="alert alert-warning mt-2 mb-0 py-1" role="alert">
                <small>
                  <i className="bi bi-exclamation-triangle me-1"></i>
                  Some items are out of stock
                </small>
              </div>
            )
          )}
          {/* Continue Shopping Link */}
          <hr className="my-3" />
          <Link to="/products" className="text-decoration-none">
            <button className="btn btn-outline-secondary w-100">
              <i className="bi bi-arrow-left me-2"></i>
              Continue Shopping
            </button>
          </Link>
          {/* Security Notice */}
          <div className="mt-3 text-center">
            <small className="text-muted">
              <i className="bi bi-shield-check me-1"></i>
              Secure checkout
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
