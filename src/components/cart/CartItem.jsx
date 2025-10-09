import React, { useState } from 'react';
import api, { BASE_URL } from '../../api';
import { toast } from 'react-toastify';

const CartItem = ({
  item,
  CartItems,
  setCartItems,
  setCartTotal,
  setNumCartItems,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  function updateCartItem() {
    // Validate quantity before sending
    if (quantity < 1) {
      alert('Quantity must be at least 1');
      return;
    }

    setLoading(true);
    const itemData = { quantity: parseInt(quantity), item_id: item.id };

    api
      .patch('update_quantity/', itemData)
      .then((response) => {
        console.log('Update successful:', response.data);

        // Update the cart items with the new data from backend
        const updatedItems = CartItems.map((cartItem) =>
          cartItem.id === item.id ? response.data.data : cartItem
        );

        // Update cart items state
        setCartItems(updatedItems);

        // Calculate and update the new total
        const newTotal = updatedItems.reduce(
          (acc, curr) => acc + curr.total,
          0
        );
        setCartTotal(newTotal);
        toast.success('Cart Item updated successfully');

        // Calculate and update the total number of items
        const totalItems = updatedItems.reduce(
          (acc, curr) => acc + curr.quantity,
          0
        );
        setNumCartItems(totalItems);
      })
      .catch((err) => {
        console.log('Error:', err.message);
        console.log('Error details:', err.response?.data);

        // Show error message to user
        alert('Failed to update cart. Please try again.');

        // Reset quantity to original value
        setQuantity(item.quantity);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Function to handle remove item
  function removeCartItem() {
    if (window.confirm('Are you sure you want to remove this item?')) {
      setLoading(true);

      api
        .delete(`remove_cart_item/${item.id}/`)
        .then(() => {
          // Filter out the removed item
          const updatedItems = CartItems.filter(
            (cartItem) => cartItem.id !== item.id
          );
          toast.success('Cart item Removed successfuly');
          setCartItems(updatedItems);

          // Recalculate total
          const newTotal = updatedItems.reduce(
            (acc, curr) => acc + curr.total,
            0
          );
          setCartTotal(newTotal);

          // Recalculate total number of items
          const totalItems = updatedItems.reduce(
            (acc, curr) => acc + curr.quantity,
            0
          );
          setNumCartItems(totalItems);
        })
        .catch((err) => {
          console.error('Error removing item:', err);
          alert('Failed to remove item. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <div className="col-md-12">
      <div
        className="cart-item d-flex align-items-center mb-3 p-3"
        style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}
      >
        <img
          src={`${BASE_URL}${item.product.image}`}
          alt={item.product.name}
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '5px',
          }}
        />
        <div className="ms-3 flex-grow-1">
          <h5 className="mb-1">{item.product.name}</h5>
          <p className="mb-0 text-muted">{`$${item.product.price} each`}</p>
          <p className="mb-0 fw-bold">Subtotal: ${item.total}</p>
        </div>
        <div className="d-flex align-items-center">
          <input
            type="number"
            min="1"
            className="form-control me-3"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ width: '70px' }}
            disabled={loading}
          />
        </div>
        <button
          className="btn btn-sm mx-2"
          onClick={updateCartItem}
          disabled={loading || quantity == item.quantity}
          style={{ backgroundColor: '#4b3bcb', color: 'white' }}
          title={
            quantity == item.quantity
              ? 'No changes to update'
              : 'Update quantity'
          }
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={removeCartItem}
          disabled={loading}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
