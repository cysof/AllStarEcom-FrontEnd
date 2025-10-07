import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import api from '../../api';

const CartPage = () => {
  const cart_code = localStorage.getItem('cart_code');
  const [cartTotal, setCartTotal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      // Generate cart_code if it doesn't exist
      let currentCartCode = cart_code;
      if (!currentCartCode) {
        currentCartCode = Math.random().toString(36).substring(2, 12);
        localStorage.setItem('cart_code', currentCartCode);
        console.log('Generated new cart code:', currentCartCode);
        setCartTotal([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`get_cart?cart_code=${currentCartCode}`);
        console.log('Cart data:', response.data);
        setCartTotal(response.data.items || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching cart:', err);

        // Handle different error scenarios
        if (err.response?.status === 404) {
          // Cart not found - treat as empty cart
          setCartTotal([]);
          setError(null);
        } else if (err.response?.status === 500) {
          setError('Server error. Please try again later.');
          setCartTotal([]);
        } else {
          setError('Failed to load cart. Please try again.');
          setCartTotal([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [cart_code]);

  if (loading) {
    return (
      <div className="container my-5 py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5 py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-danger mt-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-3 py-3">
      <h5 className="mb-4">Shopping Cart</h5>

      {cartTotal.length === 0 ? (
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
            {cartTotal.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdate={() => {
                  // Refresh cart after update
                  api
                    .get(`get_cart?cart_code=${cart_code}`)
                    .then((res) => setCartTotal(res.data.items || []))
                    .catch((err) => console.error(err));
                }}
              />
            ))}
          </div>
          <div className="col-md-4">
            <CartSummary cartTotal={cartTotal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
