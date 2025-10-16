import React, { useEffect } from 'react';
import useCartData from '../../hooks/useCartData';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import Spinner from '../ui/Spinner';

const CartPage = ({ setNumCartItems }) => {
  const { cartItems, cartTotal, numCartItems, loading, error, fetchCart } =
    useCartData();

  // Update parent component's cart item count whenever it changes
  useEffect(() => {
    if (setNumCartItems) {
      setNumCartItems(numCartItems);
    }
  }, [numCartItems, setNumCartItems]);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (error) {
    return (
      <div className="container my-5 py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <button onClick={fetchCart} className="btn btn-danger mt-2">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-3 py-3">
      <h5 className="mb-4">Shopping Cart</h5>
      {cartItems.length === 0 ? (
        <div className="row justify-content-center py-5">
          <div className="col-lg-6 col-md-8">
            <div
              className="alert alert-info shadow-lg border-0 p-5"
              role="alert"
            >
              <div className="text-center mb-4">
                <i
                  className="bi bi-cart-x"
                  style={{ fontSize: '5rem', color: '#0dcaf0' }}
                ></i>
              </div>
              <h2 className="alert-heading text-center mb-3">
                Your Cart is Empty
              </h2>
              <p className="text-center mb-4 fs-5">
                You haven't added any items to your cart yet. Start shopping to
                find amazing products!
              </p>
              <hr className="my-4" />
              <div className="text-center">
                <a href="/" className="btn btn-primary btn-lg px-5 py-3">
                  <i className="bi bi-shop me-2"></i>
                  Start Shopping Now
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div
            className="col-md-8"
            style={{ maxHeight: '70vh', overflowY: 'auto' }}
          >
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} onUpdate={fetchCart} />
            ))}
          </div>
          <div className="col-md-4">
            <CartSummary cartItems={cartItems} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
