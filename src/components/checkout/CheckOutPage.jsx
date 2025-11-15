import React, { useState, useEffect } from 'react';
import OrderSummary from './OrderSummary';
import PaymentSection from './PaymentSection';
import api from '../../api';

const CheckOutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartCode = localStorage.getItem('cart_code');
        if (!cartCode) {
          console.log('No cart code found');
          setCartItems([]);
          setLoading(false);
          return;
        }

        const response = await api.get(`get_cart?cart_code=${cartCode}`);
        setCartItems(response.data.items || []);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handlePayment = (paymentData) => {
    console.log('Payment data:', paymentData);
    // TODO: Add your payment submission logic here
    alert('Order placed successfully!');
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading checkout...</p>
      </div>
    );
  }

  return (
    <div className="container my-3">
      <h2 className="mb-4">Checkout</h2>
      <div className="row">
        <OrderSummary cartItems={cartItems} />
        <PaymentSection onSubmit={handlePayment} loading={false} />
      </div>
    </div>
  );
};

export default CheckOutPage;
