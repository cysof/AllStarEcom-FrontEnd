import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
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

  // Get description snippet
  const getDescriptionSnippet = () => {
    if (!product.description) return 'No description available';

    // Remove HTML tags if present
    const plainText = product.description.replace(/<[^>]*>/g, '');

    if (plainText.length <= 60) return plainText;
    return `${plainText.substring(0, 60)}...`;
  };

  return (
    <div className="card border-0 shadow-sm product-card h-100">
      {/* Product Image */}
      <Link
        to={`/product-detail/${product.slug}`}
        className="text-decoration-none"
      >
        <div
          className="position-relative overflow-hidden"
          style={{ height: '200px' }}
        >
          <img
            src={
              product.image_url ||
              'https://dummyimage.com/400x400/dee2e6/6c757d.jpg'
            }
            className="card-img-top h-100 w-100"
            alt={product.name}
            style={{
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://dummyimage.com/400x400/dee2e6/6c757d.jpg';
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = 'scale(1.05)')
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          {/* Out of stock overlay */}
          {!product.in_stock && (
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center">
              <span className="badge bg-danger p-2">Out of Stock</span>
            </div>
          )}
          {/* New badge */}
          {product.is_new && (
            <div className="position-absolute top-0 start-0 m-2">
              <span className="badge bg-primary">New</span>
            </div>
          )}
        </div>
      </Link>

      <div className="card-body d-flex flex-column p-3">
        {/* Category - FIXED: Using category_name from API */}
        <div className="mb-1">
          <small
            className="text-muted text-uppercase fw-medium"
            style={{ fontSize: '0.75rem' }}
          >
            {product.category_name || 'FASHION'}
          </small>
        </div>

        {/* Product Name */}
        <h6
          className="card-title mb-2"
          style={{
            minHeight: '40px',
            lineHeight: '1.3',
          }}
        >
          <Link
            to={`/product-detail/${product.slug}`}
            className="text-decoration-none text-dark fw-semibold"
            style={{ fontSize: '0.95rem' }}
          >
            {product.name}
          </Link>
        </h6>

        {/* Product Description Snippet - Fixed ellipsis issue */}
        {product.description && (
          <p
            className="card-text text-muted small mb-2 flex-grow-1"
            style={{
              fontSize: '0.85rem',
              lineHeight: '1.4',
              minHeight: '40px',
            }}
          >
            {getDescriptionSnippet()}
          </p>
        )}

        {/* Price */}
        <div className="mb-2">
          <span className="fw-bold text-success" style={{ fontSize: '1.1rem' }}>
            {formatCurrency(product.price)}
          </span>
          {product.has_variants && (
            <small
              className="text-muted d-block"
              style={{ fontSize: '0.8rem' }}
            >
              Starting price
            </small>
          )}
        </div>

        {/* Stock Status & Shipping */}
        <div className="mb-3 d-flex flex-wrap gap-1">
          {getStockStatus()}
          {product.free_shipping && (
            <span className="badge bg-info">Free Shipping</span>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Link
            to={`/product-detail/${product.slug}`}
            className="btn btn-outline-success w-100 py-2"
            style={{
              fontSize: '0.9rem',
              borderRadius: '4px',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#28a745';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#28a745';
            }}
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Additional info in footer */}
      <div className="card-footer bg-white border-top-0 pt-0 px-3 pb-3">
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            <i className="bi bi-eye me-1"></i>
            Details
          </small>
          {product.created_at && (
            <small className="text-muted">
              {new Date(product.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
