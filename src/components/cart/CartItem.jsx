import React, { useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';

const CartItem = ({ item, onUpdate }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  function updateCartItem() {
    if (quantity < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }

    setLoading(true);
    const itemData = { quantity: parseInt(quantity), item_id: item.id };

    api
      .patch('update_quantity/', itemData)
      .then((response) => {
        console.log('Update successful:', response.data);
        toast.success('Cart updated successfully!');
        if (onUpdate) {
          onUpdate();
        }
      })
      .catch((err) => {
        console.log('Error:', err.message);
        console.log('Error details:', err.response?.data);
        toast.error('Failed to update cart. Please try again.');
        setQuantity(item.quantity);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function removeCartItem() {
    if (window.confirm('Are you sure you want to remove this item?')) {
      setLoading(true);
      api
        .delete(`remove_cart_item/${item.id}/`)
        .then(() => {
          console.log('Item removed successfully');
          toast.success('Item removed from cart');
          if (onUpdate) {
            onUpdate();
          }
        })
        .catch((err) => {
          console.error('Error removing item:', err);
          toast.error('Failed to remove item. Please try again.');
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
          src={
            item.product.thumbnail_url ||
            item.product.image_url ||
            'https://dummyimage.com/80x80/dee2e6/6c757d.jpg'
          }
          alt={item.product.name}
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '5px',
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://dummyimage.com/80x80/dee2e6/6c757d.jpg';
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
