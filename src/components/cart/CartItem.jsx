import React, { useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';

const CartItem = ({ item, onUpdate }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);
  const [stockError, setStockError] = useState(null);

  // Calculate if item is in stock
  const isInStock = item.product.in_stock;
  const stockQuantity = item.product.stock_quantity;

  // Shipping info
  const hasFreeShipping = item.product.free_shipping;
  const requiresShipping = item.product.requires_shipping;
  const shippingFee = item.product.calculated_shipping_fee;

  // Validate quantity against stock
  const validateQuantity = (qty) => {
    const newQty = parseInt(qty);
    if (newQty > stockQuantity) {
      setStockError(`Only ${stockQuantity} units available`);
      return false;
    }
    setStockError(null);
    return true;
  };

  function updateCartItem() {
    const newQuantity = parseInt(quantity);

    if (newQuantity < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }

    if (!isInStock) {
      toast.error('This product is out of stock');
      return;
    }

    if (!validateQuantity(newQuantity)) {
      toast.error(stockError);
      return;
    }

    setLoading(true);
    const itemData = {
      quantity: newQuantity,
      item_id: item.id,
    };

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
        const errorMsg =
          err.response?.data?.error ||
          'Failed to update cart. Please try again.';
        toast.error(errorMsg);
        setQuantity(item.quantity); // Reset to original quantity
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function removeCartItem() {
    if (
      window.confirm(
        'Are you sure you want to remove this item from your cart?'
      )
    ) {
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

  // Handle quantity input change
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    validateQuantity(value);
  };

  // Stock status badge
  const StockBadge = () => {
    if (!isInStock) {
      return <span className="badge bg-danger">Out of Stock</span>;
    }
    if (stockQuantity <= 5) {
      return (
        <span className="badge bg-warning text-dark">
          Low Stock ({stockQuantity})
        </span>
      );
    }
    return <span className="badge bg-success">In Stock ({stockQuantity})</span>;
  };

  // Shipping badge
  const ShippingBadge = () => {
    if (!requiresShipping) {
      return <span className="badge bg-info">Digital</span>;
    }
    if (hasFreeShipping) {
      return <span className="badge bg-success">Free Shipping</span>;
    }
    if (shippingFee > 0) {
      return (
        <span className="badge bg-secondary">Shipping: ₦{shippingFee}</span>
      );
    }
    return null;
  };

  return (
    <div className="col-md-12">
      <div
        className="cart-item d-flex align-items-center mb-3 p-3"
        style={{
          backgroundColor: isInStock ? '#f8f9fa' : '#f8d7da',
          borderRadius: '8px',
          border: isInStock ? '1px solid #dee2e6' : '1px solid #f5c6cb',
        }}
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
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="mb-1">{item.product.name}</h5>
              <p className="mb-0 text-muted">
                ₦{parseFloat(item.product.price).toFixed(2)} each
              </p>
              <div className="d-flex gap-2 mt-1">
                <StockBadge />
                <ShippingBadge />
              </div>
            </div>
            <div className="text-end">
              <p className="mb-0 fw-bold">
                Subtotal: ₦{parseFloat(item.total).toFixed(2)}
              </p>
              {!isInStock && (
                <small className="text-danger">
                  This item is no longer available
                </small>
              )}
            </div>
          </div>

          {stockError && (
            <div
              className="alert alert-warning py-1 mt-2 mb-2"
              style={{ fontSize: '0.875rem' }}
            >
              <i className="bi bi-exclamation-triangle me-1"></i>
              {stockError}
            </div>
          )}
        </div>

        <div className="d-flex align-items-center">
          <div className="me-3">
            <div className="input-group" style={{ width: '120px' }}>
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  const newQty = parseInt(quantity) - 1;
                  if (newQty >= 1) {
                    setQuantity(newQty);
                    validateQuantity(newQty);
                  }
                }}
                disabled={loading || quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={stockQuantity}
                className="form-control text-center"
                value={quantity}
                onChange={handleQuantityChange}
                disabled={loading || !isInStock}
                title={!isInStock ? 'Out of stock' : ''}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  const newQty = parseInt(quantity) + 1;
                  setQuantity(newQty);
                  validateQuantity(newQty);
                }}
                disabled={
                  loading || !isInStock || parseInt(quantity) >= stockQuantity
                }
              >
                +
              </button>
            </div>
            <small className="text-muted d-block text-center mt-1">
              Max: {stockQuantity}
            </small>
          </div>

          <button
            className="btn btn-sm mx-2"
            onClick={updateCartItem}
            disabled={
              loading || !isInStock || quantity == item.quantity || stockError
            }
            style={{
              backgroundColor: '#0EC71A',
              color: 'white',
              opacity:
                !isInStock || quantity == item.quantity || stockError ? 0.5 : 1,
            }}
            title={
              !isInStock
                ? 'Out of stock'
                : quantity == item.quantity
                ? 'No changes to update'
                : stockError
                ? stockError
                : 'Update quantity'
            }
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-1"
                  role="status"
                  aria-hidden="true"
                ></span>
                Updating...
              </>
            ) : (
              'Update'
            )}
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={removeCartItem}
            disabled={loading}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              'Remove'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
