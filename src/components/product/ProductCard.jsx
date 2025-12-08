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
    if (!product.description) return null;
    
    // Remove HTML tags if present
    const plainText = product.description.replace(/<[^>]*>/g, '');
    
    if (plainText.length <= 50) return plainText;
    return `${plainText.substring(0, 50)}...`;
  };

  // Get category display name
  const getCategoryDisplay = () => {
    const category = product.category_name || 'FASHION';
    // Shorten long category names for 4-column layout
    if (category.length > 15) {
      return category.substring(0, 15) + '...';
    }
    return category;
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
          style={{ height: '160px' }}
        >
          <img
            src={
              product.image_url ||
              product.thumbnail_url ||
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
              <span className="badge bg-danger p-2" style={{ fontSize: '0.7rem' }}>
                Out of Stock
              </span>
            </div>
          )}
          
          {/* New badge */}
          {product.is_new && (
            <div className="position-absolute top-0 start-0 m-2">
              <span className="badge bg-primary" style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}>
                New
              </span>
            </div>
          )}
          
          {/* Variant badge */}
          {product.has_variants && (
            <div className="position-absolute top-0 end-0 m-2">
              <span className="badge bg-info" style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}>
                Variants
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="card-body d-flex flex-column p-2">
        {/* Category */}
        <div className="mb-1">
          <small
            className="text-muted text-uppercase fw-medium"
            style={{ fontSize: '0.7rem' }}
          >
            {getCategoryDisplay()}
          </small>
        </div>

        {/* Product Name */}
        <h6
          className="card-title mb-1"
          style={{
            minHeight: '36px',
            lineHeight: '1.3',
          }}
        >
          <Link
            to={`/product-detail/${product.slug}`}
            className="text-decoration-none text-dark fw-semibold"
            style={{ 
              fontSize: '0.85rem',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            title={product.name}
          >
            {product.name}
          </Link>
        </h6>

        {/* Product Description Snippet - Only show if exists */}
        {product.description && (
          <div className="mb-1 flex-grow-1">
            <small
              className="text-muted"
              style={{
                fontSize: '0.75rem',
                lineHeight: '1.3',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
              title={product.description.replace(/<[^>]*>/g, '')}
            >
              {getDescriptionSnippet()}
            </small>
          </div>
        )}

        {/* Price */}
        <div className="mb-1">
          <span className="fw-bold text-success" style={{ fontSize: '0.95rem' }}>
            {formatCurrency(product.price)}
          </span>
          {product.has_variants && (
            <small
              className="text-muted d-block"
              style={{ fontSize: '0.7rem' }}
            >
              Starting price
            </small>
          )}
        </div>

        {/* Stock Status & Shipping */}
        <div className="mb-2 d-flex flex-wrap gap-1">
          {getStockStatus()}
          {product.free_shipping && (
            <span 
              className="badge bg-info" 
              style={{ fontSize: '0.7rem', padding: '0.2rem 0.4rem' }}
            >
              Free Shipping
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Link
            to={`/product-detail/${product.slug}`}
            className="btn btn-outline-success w-100"
            style={{
              fontSize: '0.8rem',
              borderRadius: '4px',
              transition: 'all 0.2s ease',
              padding: '0.4rem 0.5rem',
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

      {/* Additional info in footer - Optional, can remove for more compact design */}
      {product.created_at && (
        <div className="card-footer bg-white border-top-0 pt-0 px-2 pb-2">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted" style={{ fontSize: '0.7rem' }}>
              <i className="bi bi-calendar me-1"></i>
              {new Date(product.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </small>
            <small className="text-muted" style={{ fontSize: '0.7rem' }}>
              <i className="bi bi-eye me-1"></i>
              Details
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;