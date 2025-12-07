import React, { useState, useCallback } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';

const CartItem = ({ item, onUpdate }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);
  const [stockError, setStockError] = useState(null);

  // Item properties
  const isInStock = item.product.in_stock;
  const stockQuantity = item.product.stock_quantity;
  const hasFreeShipping = item.product.free_shipping;
  const requiresShipping = item.product.requires_shipping;
  const shippingFee = item.product.calculated_shipping_fee;

  // Validate quantity against stock
  const validateQuantity = useCallback(
    (qty) => {
      const newQty = parseInt(qty);
      if (isNaN(newQty) || newQty < 1) {
        setStockError('Quantity must be at least 1');
        return false;
      }
      if (newQty > stockQuantity) {
        setStockError(`Only ${stockQuantity} units available`);
        return false;
      }
      setStockError(null);
      return true;
    },
    [stockQuantity]
  );

  // Check if quantity has changed
  const hasQuantityChanged = parseInt(quantity) !== item.quantity;

  // Handle quantity input change
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    validateQuantity(value);
  };

  // Update cart item quantity
  const updateCartItem = useCallback(() => {
    const newQuantity = parseInt(quantity);

    // Validation checks
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

    if (!hasQuantityChanged) {
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
        console.error('Error updating cart:', err);
        const errorMsg =
          err.response?.data?.error ||
          'Failed to update cart. Please try again.';
        toast.error(errorMsg);
        setQuantity(item.quantity); // Reset to original
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    quantity,
    item,
    isInStock,
    stockError,
    hasQuantityChanged,
    onUpdate,
    validateQuantity,
  ]);

  // Remove item from cart
  const removeCartItem = useCallback(() => {
    if (
      window.confirm(
        'Are you sure you want to remove this item from your cart?'
      )
    ) {
      setLoading(true);
      api
        .delete(`remove_cart_item/${item.id}/`)
        .then(() => {
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
  }, [item.id, onUpdate]);

  // Decrement quantity
  const decrementQuantity = useCallback(() => {
    const newQty = parseInt(quantity) - 1;
    if (newQty >= 1) {
      setQuantity(newQty);
      validateQuantity(newQty);
    }
  }, [quantity, validateQuantity]);

  // Increment quantity
  const incrementQuantity = useCallback(() => {
    const newQty = parseInt(quantity) + 1;
    if (newQty <= stockQuantity) {
      setQuantity(newQty);
      validateQuantity(newQty);
    }
  }, [quantity, stockQuantity, validateQuantity]);

  // Stock status badge
  const StockBadge = () => {
    if (!isInStock) {
      return (
        <span className="badge bg-danger" aria-label="Out of stock">
          Out of Stock
        </span>
      );
    }
    if (stockQuantity <= 5) {
      return (
        <span
          className="badge bg-warning text-dark"
          aria-label={`Low stock: ${stockQuantity} units available`}
        >
          Low Stock ({stockQuantity})
        </span>
      );
    }
    return (
      <span
        className="badge bg-success"
        aria-label={`In stock: ${stockQuantity} units available`}
      >
        In Stock ({stockQuantity})
      </span>
    );
  };

  // Shipping badge
  const ShippingBadge = () => {
    if (!requiresShipping) {
      return (
        <span className="badge bg-info" aria-label="Digital product">
          Digital
        </span>
      );
    }
    if (hasFreeShipping) {
      return (
        <span className="badge bg-success" aria-label="Free shipping">
          Free Shipping
        </span>
      );
    }
    if (shippingFee > 0) {
      return (
        <span
          className="badge bg-secondary"
          aria-label={`Shipping fee: ₦${shippingFee.toFixed(2)}`}
        >
          Shipping: ₦{shippingFee.toFixed(2)}
        </span>
      );
    }
    return null;
  };

  // Item subtotal
  const itemSubtotal = (parseFloat(item.product.price) * quantity).toFixed(2);

  return (
    <div className="mb-3">
      <div
        className="d-flex gap-3 p-3"
        style={{
          backgroundColor: isInStock ? '#f8f9fa' : '#f8d7da',
          borderRadius: '8px',
          border: isInStock ? '1px solid #dee2e6' : '2px solid #f5c6cb',
        }}
      >
        {/* Product Image */}
        <div style={{ flexShrink: 0 }}>
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
        </div>

        {/* Product Details */}
        <div style={{ flex: '1 1 auto', minWidth: 0 }}>
          <div className="mb-2">
            <h6 className="mb-1">{item.product.name}</h6>
            <p className="mb-0 text-muted small">
              ₦{parseFloat(item.product.price).toFixed(2)} each
            </p>
          </div>

          {/* Badges */}
          <div className="d-flex flex-wrap gap-2 mb-2">
            <StockBadge />
            <ShippingBadge />
          </div>

          {/* Stock error alert */}
          {stockError && (
            <div
              className="alert alert-warning py-1 px-2 mb-0"
              style={{ fontSize: '0.8rem' }}
              role="alert"
            >
              <i className="bi bi-exclamation-triangle me-1"></i>
              {stockError}
            </div>
          )}

          {/* Out of stock message */}
          {!isInStock && (
            <small className="text-danger d-block mt-1">
              <i className="bi bi-x-circle me-1"></i>
              This item is no longer available
            </small>
          )}
        </div>

        {/* Quantity & Actions */}
        <div
          className="d-flex flex-column align-items-end gap-2"
          style={{ flexShrink: 0 }}
        >
          {/* Subtotal */}
          <div>
            <p className="mb-0 fw-bold" style={{ fontSize: '0.95rem' }}>
              ₦{itemSubtotal}
            </p>
            <small className="text-muted">Subtotal</small>
          </div>

          {/* Quantity Control */}
          <div
            className="input-group"
            style={{ width: '120px', fontSize: '0.9rem' }}
          >
            <button
              className="btn btn-outline-secondary btn-sm"
              type="button"
              onClick={decrementQuantity}
              disabled={loading || isInStock === false || quantity <= 1}
              aria-label={`Decrease quantity for ${item.product.name}`}
            >
              −
            </button>
            <input
              type="number"
              min="1"
              max={stockQuantity}
              className="form-control form-control-sm text-center"
              value={quantity}
              onChange={handleQuantityChange}
              disabled={loading || !isInStock}
              aria-label={`Quantity for ${item.product.name}`}
            />
            <button
              className="btn btn-outline-secondary btn-sm"
              type="button"
              onClick={incrementQuantity}
              disabled={
                loading || !isInStock || parseInt(quantity) >= stockQuantity
              }
              aria-label={`Increase quantity for ${item.product.name}`}
            >
              +
            </button>
          </div>
          <small
            className="text-muted text-center d-block"
            style={{ width: '100%' }}
          >
            Max: {stockQuantity}
          </small>

          {/* Update & Remove Buttons */}
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm"
              onClick={updateCartItem}
              disabled={
                loading || !isInStock || !hasQuantityChanged || !!stockError
              }
              style={{
                backgroundColor: '#0EC71A',
                color: 'white',
                border: 'none',
                opacity:
                  !isInStock || !hasQuantityChanged || stockError ? 0.5 : 1,
              }}
              aria-label={`Update quantity for ${item.product.name}`}
              title={
                !isInStock
                  ? 'Out of stock'
                  : !hasQuantityChanged
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
              aria-label={`Remove ${item.product.name} from cart`}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                <i className="bi bi-trash"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
