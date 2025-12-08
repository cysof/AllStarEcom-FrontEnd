import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);

  const getStockStatus = () => {
    if (!product.is_available)
      return <span className="pc-badge danger">Not Available</span>;
    if (!product.in_stock)
      return <span className="pc-badge danger">Out of Stock</span>;
    if (product.stock_quantity <= 5)
      return <span className="pc-badge warning">Low Stock</span>;
    return <span className="pc-badge success">In Stock</span>;
  };

  return (
    <div className="product-card">
      <Link to={`/product-detail/${product.slug}`} className="pc-image-wrapper">
        <img
          src={
            product.image_url ||
            product.thumbnail_url ||
            'https://dummyimage.com/400x400/dee2e6/6c757d.jpg'
          }
          alt={product.name}
          className="pc-image"
          onError={(e) => {
            e.target.src = 'https://dummyimage.com/400x400/dee2e6/6c757d.jpg';
          }}
        />

        {!product.in_stock && (
          <div className="pc-overlay">
            <span className="pc-overlay-badge">Out of Stock</span>
          </div>
        )}

        {product.is_new && <span className="pc-tag-new">NEW</span>}
      </Link>

      <div className="pc-body">
        <div className="pc-category">{product.category_name || 'PRODUCT'}</div>

        <h3 className="pc-title">
          <Link to={`/product-detail/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="pc-price">
          <span className="pc-price-main">{formatCurrency(product.price)}</span>
          {product.has_variants && (
            <span className="pc-price-sub">Starting Price</span>
          )}
        </div>

        <div className="pc-status-row">
          {getStockStatus()}
          {product.free_shipping && (
            <span className="pc-badge info">Free Shipping</span>
          )}
        </div>

        <Link to={`/product-detail/${product.slug}`} className="pc-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
