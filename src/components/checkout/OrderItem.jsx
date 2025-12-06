import React from 'react';

const OrderItem = ({ item }) => {
  // Handle product data - may be null if product was deleted
  const productName = item?.product_name || item?.product?.name || 'Product';
  const productPrice = item?.product_price || item?.product?.price || 0;
  const quantity = item?.quantity || 1;
  const subtotal = item?.subtotal || productPrice * quantity;

  // Get image URL - try multiple sources
  const getImageUrl = () => {
    // Priority 1: Product thumbnail (if product exists)
    if (item?.product?.thumbnail_url) {
      return item.product.thumbnail_url;
    }
    // Priority 2: Product image (if product exists)
    if (item?.product?.image_url) {
      return item.product.image_url;
    }
    // Priority 3: Placeholder
    return 'https://dummyimage.com/60x60/dee2e6/6c757d.jpg';
  };

  const imageUrl = getImageUrl();

  // Format currency to Naira
  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center mb-3 p-2"
      style={{
        borderBottom: '1px solid #dee2e6',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px',
      }}
    >
      <div className="d-flex align-items-center">
        {/* Product Image */}
        <img
          src={imageUrl}
          alt={productName}
          className="img-fluid"
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'cover',
            borderRadius: '5px',
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://dummyimage.com/60x60/dee2e6/6c757d.jpg';
          }}
        />

        {/* Product Details */}
        <div className="ms-3">
          <h6 className="mb-0">{productName}</h6>

          {/* Price per unit */}
          <small className="text-muted">
            {formatCurrency(productPrice)} each
          </small>

          {/* Quantity */}
          <div className="mt-1">
            <small className="badge bg-secondary">Quantity: {quantity}</small>
          </div>

          {/* Product status (if deleted) */}
          {!item?.product && (
            <small className="text-warning d-block mt-1">
              <i className="bi bi-exclamation-triangle me-1"></i>
              Product no longer available
            </small>
          )}
        </div>
      </div>

      {/* Subtotal */}
      <div className="text-end">
        <h6 className="mb-0">{formatCurrency(subtotal)}</h6>
        <small className="text-muted">Subtotal</small>
      </div>
    </div>
  );
};

export default OrderItem;
