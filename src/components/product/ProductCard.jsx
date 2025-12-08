import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount || 0).toFixed(2)}`;
  };

  // Get stock status
  const getStockStatus = () => {
    if (!product.is_available) {
      return <span className="badge bg-danger">Not Available</span>;
    }
    if (!product.in_stock) {
      return <span className="badge bg-danger">Out of Stock</span>;
    }
    if (product.stock_quantity <= 5) {
      return <span className="badge bg-warning text-dark">Low Stock</span>;
    }
    return <span className="badge bg-success">In Stock</span>;
  };

  return (
    <div className="card h-100 border-0 shadow-sm product-card">
      {/* Product Image */}
      <Link to={`/product-detail/${product.slug}`}>
        <img
          src={
            product.image_url ||
            'https://dummyimage.com/400x400/dee2e6/6c757d.jpg'
          }
          className="card-img-top"
          alt={product.name}
          style={{ height: '250px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://dummyimage.com/400x400/dee2e6/6c757d.jpg';
          }}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        {/* Category */}
        <div className="mb-2">
          <small className="text-muted">
            {product.category?.name || 'Uncategorized'}
          </small>
        </div>

        {/* Product Name */}
        <h5 className="card-title">
          <Link
            to={`/product-detail/${product.slug}`}
            className="text-decoration-none text-dark"
          >
            {product.name}
          </Link>
        </h5>

        {/* Product Description (short) */}
        <p className="card-text text-muted small flex-grow-1">
          {product.description?.substring(0, 80)}...
        </p>

        {/* Price */}
        <div className="mb-2">
          <span className="fw-bold fs-5 text-success">
            {formatCurrency(product.price)}
          </span>
          {product.has_variants && (
            <small className="text-muted ms-2">(From)</small>
          )}
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          {getStockStatus()}
          {product.free_shipping && (
            <span className="badge bg-info ms-2">Free Shipping</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="d-grid gap-2">
          <Link
            to={`/product-detail/${product.slug}`}
            className="btn btn-outline-success"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Card Footer (optional badges) */}
      <div className="card-footer bg-white border-top-0 pt-0">
        {product.is_new && <span className="badge bg-primary me-2">New</span>}
        {product.is_bestseller && (
          <span className="badge bg-warning text-dark">Bestseller</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
