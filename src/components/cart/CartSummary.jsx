import React from 'react';
import { Link } from 'react-router-dom';

const CartSummary = ({ cartItems = [] }) => {
  // Calculate totals from cart items
  const subtotal = cartItems.reduce((total, item) => {
    const itemTotal = parseFloat(item.total || 0);
    return total + itemTotal;
  }, 0);

  const vatRate = 0.075; // 7.5% VAT for Nigeria
  const vat = subtotal * vatRate;
  const total = subtotal + vat;

  // Calculate total number of items
  const totalItems = cartItems.reduce((count, item) => {
    return count + parseInt(item.quantity || 0);
  }, 0);

  return (
    <div className="align-self-start sticky-top" style={{ top: '20px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Cart Summary</h5>
          <hr />

          <div className="d-flex justify-content-between mb-2">
            <span>Items:</span>
            <span>{totalItems}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>₦{subtotal.toFixed(2)}</span> {/* Changed $ to ₦ */}
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span>VAT (7.5%):</span> {/* Changed from "Tax (10%)" */}
            <span>₦{vat.toFixed(2)}</span> {/* Changed $ to ₦ and tax to vat */}
          </div>

          <hr />

          <div className="d-flex justify-content-between mb-3">
            <span className="fw-bold">Total:</span>
            <strong className="text-primary fs-5">
              ₦{total.toFixed(2)}
            </strong>{' '}
            {/* Changed $ to ₦ */}
          </div>

          <Link to="/checkout" className="text-decoration-none">
            <button
              className="btn btn-success w-100 py-2"
              style={{ backgroundColor: '#50dc60', borderColor: '#50dc60' }}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </Link>

          {cartItems.length === 0 && (
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
