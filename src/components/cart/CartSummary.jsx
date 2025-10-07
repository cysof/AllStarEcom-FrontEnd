import React from 'react';
import { Link } from 'react-router-dom';

const CartSummary = ({ cartTotal = [] }) => {
  // Calculate totals from cart items
  const subtotal = cartTotal.reduce((total, item) => {
    const price = parseFloat(item.product?.price || 0);
    const quantity = parseInt(item.quantity || 0);
    return total + price * quantity;
  }, 0);

  const taxRate = 0.1; // 10% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="align-self-start sticky-top" style={{ top: '20px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Cart Summary</h5>
          <hr />

          <div className="d-flex justify-content-between mb-2">
            <span>Items:</span>
            <span>{cartTotal.length}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span>Tax (10%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <hr />

          <div className="d-flex justify-content-between mb-3">
            <span className="fw-bold">Total:</span>
            <strong className="text-primary fs-5">${total.toFixed(2)}</strong>
          </div>

          <Link to="/checkout" className="text-decoration-none">
            <button
              className="btn btn-primary w-100 py-2"
              style={{ backgroundColor: '#6050DC', borderColor: '#6050DC' }}
              disabled={cartTotal.length === 0}
            >
              Proceed to Checkout
            </button>
          </Link>

          {cartTotal.length === 0 && (
            <p className="text-muted text-center mt-2 mb-0 small">
              Add items to checkout
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
