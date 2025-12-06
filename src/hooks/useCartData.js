import { useState, useEffect } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

function useCartData() {
  const cart_code = localStorage.getItem('cart_code');

  // State for cart data
  const [cartData, setCartData] = useState({
    items: [],
    cartId: null,
    cartCode: '',
    subtotal: 0,
    shippingFee: 0,
    vatAmount: 0,
    totalWithVat: 0,
    grandTotal: 0,
    itemCount: 0,
    createdAt: null,
    modifiedAt: null,
    paid: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, [cart_code]);

  const fetchCart = async () => {
    let currentCartCode = cart_code;

    // Generate new cart code if none exists
    if (!currentCartCode) {
      currentCartCode = Math.random().toString(36).substring(2, 12);
      localStorage.setItem('cart_code', currentCartCode);
      console.log('Generated new cart code:', currentCartCode);

      // Reset to empty cart state
      setCartData({
        items: [],
        cartId: null,
        cartCode: currentCartCode,
        subtotal: 0,
        shippingFee: 0,
        vatAmount: 0,
        totalWithVat: 0,
        grandTotal: 0,
        itemCount: 0,
        createdAt: null,
        modifiedAt: null,
        paid: false,
      });

      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch cart data from API
      const response = await api.get(`get_cart?cart_code=${currentCartCode}`);
      console.log('Cart API response:', response.data);

      // Extract data from response
      const {
        id = null,
        cart_code: cartCode = currentCartCode,
        items = [],
        sum_total = 0,
        vat_amount = 0,
        total_with_vat = 0,
        num_of_items = 0,
        total_shipping_fee = 0,
        grand_total = 0,
        created_at = null,
        modified_at = null,
        paid = false,
      } = response.data;

      // Update cart data state
      setCartData({
        items,
        cartId: id,
        cartCode,
        subtotal: parseFloat(sum_total) || 0,
        shippingFee: parseFloat(total_shipping_fee) || 0,
        vatAmount: parseFloat(vat_amount) || 0,
        totalWithVat: parseFloat(total_with_vat) || 0,
        grandTotal: parseFloat(grand_total) || 0,
        itemCount: parseInt(num_of_items) || 0,
        createdAt: created_at,
        modifiedAt: modified_at,
        paid: paid,
      });

      setError(null);
    } catch (err) {
      console.error('Error fetching cart:', err);

      // Handle different error cases
      if (err.response?.status === 404) {
        // Cart not found - treat as empty cart
        setCartData({
          items: [],
          cartId: null,
          cartCode: currentCartCode,
          subtotal: 0,
          shippingFee: 0,
          vatAmount: 0,
          totalWithVat: 0,
          grandTotal: 0,
          itemCount: 0,
          createdAt: null,
          modifiedAt: null,
          paid: false,
        });
        setError(null);
      } else if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
        toast.error('Server error. Please try again later.');
        // Keep existing cart data or reset?
      } else {
        setError('Failed to load cart. Please try again.');
        toast.error('Failed to load cart. Please try again.');
        // Network errors - keep existing data if any
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check if cart has items
  const hasItems = cartData.items.length > 0;

  // Helper function to check if all items are in stock
  const allItemsInStock = cartData.items.every(
    (item) =>
      item.product?.in_stock !== false && item.product?.is_available !== false
  );

  // Helper function to check if any item requires shipping
  const requiresShipping = cartData.items.some(
    (item) => item.product?.requires_shipping === true
  );

  // Helper function to get cart summary for display
  const getCartSummary = () => {
    return {
      subtotal: cartData.subtotal,
      shipping: cartData.shippingFee,
      vat: cartData.vatAmount,
      total: cartData.grandTotal,
      itemCount: cartData.itemCount,
    };
  };

  // Function to clear cart locally (useful for after checkout)
  const clearCart = () => {
    localStorage.removeItem('cart_code');
    setCartData({
      items: [],
      cartId: null,
      cartCode: '',
      subtotal: 0,
      shippingFee: 0,
      vatAmount: 0,
      totalWithVat: 0,
      grandTotal: 0,
      itemCount: 0,
      createdAt: null,
      modifiedAt: null,
      paid: false,
    });
  };

  // Function to update cart after modifications
  const updateCart = (newCartData) => {
    setCartData((prev) => ({
      ...prev,
      ...newCartData,
    }));
  };

  return {
    // Main cart data object
    cartData,

    // Individual properties for convenience
    cartItems: cartData.items,
    cartTotal: cartData.subtotal,
    shippingFee: cartData.shippingFee,
    vatAmount: cartData.vatAmount,
    grandTotal: cartData.grandTotal,
    numCartItems: cartData.itemCount,
    cartId: cartData.cartId,
    cartCode: cartData.cartCode,
    cartPaid: cartData.paid,

    // Helper values
    hasItems,
    allItemsInStock,
    requiresShipping,

    // State management
    loading,
    error,

    // Functions
    fetchCart,
    getCartSummary,
    clearCart,
    updateCart,
  };
}

export default useCartData;
