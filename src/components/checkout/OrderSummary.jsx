import React from 'react';
import OrderItem from './OrderItem';

const OrderSummary = ({ cartItems = [] }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.total || 0), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="col-md-8">
      <div className="card mb-4">
        <div
          className="card-header"
          style={{ backgroundColor: '#6050DC', color: 'white' }}
        >
          <h5 className="mb-0">Order Summary</h5>
        </div>
        <div className="card-body">
          <div
            className="px-3"
            style={{ maxHeight: '300px', overflowY: 'auto' }}
          >
            {cartItems.length > 0 ? (
              cartItems.map((item) => <OrderItem key={item.id} item={item} />)
            ) : (
              <p className="text-muted text-center py-4">No items in cart</p>
            )}
          </div>
          {cartItems.length > 0 && (
            <div>
              <hr />
              <div className="px-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-0">
                  <strong>Total:</strong>
                  <strong className="text-primary fs-5">
                    ${total.toFixed(2)}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
