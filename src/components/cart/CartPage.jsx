import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import api from '../../api';
import Spinner from '../ui/Spinner';

const CartPage = ({ setNumCartItems }) => {
  const cart_code = localStorage.getItem('cart_code');
  const [cartItems, setCartItems] = useState([]); // Renamed from cartTotal
  const [cartTotal, setCartTotal] = useState(0); // Actual total price
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, [cart_code]);

  const fetchCart = async () => {
    // Generate cart_code if it doesn't exist
    let currentCartCode = cart_code;
    if (!currentCartCode) {
      currentCartCode = Math.random().toString(36).substring(2, 12);
      localStorage.setItem('cart_code', currentCartCode);
      console.log('Generated new cart code:', currentCartCode);
      setCartItems([]);
      setCartTotal(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`get_cart?cart_code=${currentCartCode}`);
      console.log('Cart data:', response.data);

      setCartItems(response.data.items || []);
      setCartTotal(response.data.sum_total || 0);
      setError(null);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setLoading(false);

      // Handle different error scenarios
      if (err.response?.status === 404) {
        // Cart not found - treat as empty cart
        setCartItems([]);
        setCartTotal(0);
        setError(null);
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
        setCartItems([]);
        setCartTotal(0);
      } else {
        setError('Failed to load cart. Please try again.');
        setCartItems([]);
        setCartTotal(0);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner loading={loading} />;
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
              <CartItem
                key={item.id}
                item={item}
                CartItems={cartItems}
                setCartItems={setCartItems}
                setCartTotal={setCartTotal}
                setNumCartItems={setNumCartItems}
              />
            ))}
          </div>
          <div className="col-md-4">
            <CartSummary cartTotal={cartTotal} cartItems={cartItems} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
