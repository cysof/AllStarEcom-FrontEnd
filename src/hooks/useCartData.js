import { useState, useEffect } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

function useCartData() {
  const cart_code = localStorage.getItem('cart_code');
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [numCartItems, setNumCartItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, [cart_code]);

  const fetchCart = async () => {
    let currentCartCode = cart_code;

    if (!currentCartCode) {
      currentCartCode = Math.random().toString(36).substring(2, 12);
      localStorage.setItem('cart_code', currentCartCode);
      console.log('Generated new cart code:', currentCartCode);
      setCartItems([]);
      setCartTotal(0);
      setNumCartItems(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`get_cart?cart_code=${currentCartCode}`);
      console.log('Cart data:', response.data);

      const items = response.data.items || [];
      const total = response.data.sum_total || 0;
      const itemCount = response.data.num_of_items || 0;

      setCartItems(items);
      setCartTotal(total);
      setNumCartItems(itemCount);
      setError(null);
    } catch (err) {
      console.error('Error fetching cart:', err);
      if (err.response?.status === 404) {
        setCartItems([]);
        setCartTotal(0);
        setNumCartItems(0);
        setError(null);
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
        setCartItems([]);
        setCartTotal(0);
        setNumCartItems(0);
      } else {
        setError('Failed to load cart. Please try again.');
        toast.error('Failed to load cart. Please try again.');
        setCartItems([]);
        setCartTotal(0);
        setNumCartItems(0);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    cartItems,
    cartTotal,
    numCartItems,
    loading,
    error,
    fetchCart,
    setNumCartItems,
  };
}

export default useCartData;
