import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeCard from '../home/HomeCard';
import './RelatedProducts.css';

const RelatedProducts = ({
  products,
  title = 'Related Products',
  maxDisplay = 4,
}) => {
  const navigate = useNavigate();

  // DEBUG
  console.log('🎁 RelatedProducts received:', products);
  console.log('🎁 Products length:', products?.length);

  // Early return if no products
  if (!products || products.length === 0) {
    console.log('🎁 No products - returning null');
    return null;
  }

  // Filter only available products for display (must be is_available)
  // Don't filter by in_stock since related products are already available from backend
  const availableProducts = products
    .filter((product) => {
      console.log(
        `🎁 Product "${product.name}": is_available=${product.is_available}, in_stock=${product.in_stock}`
      );
      return product.is_available;
    })
    .slice(0, maxDisplay);

  console.log('🎁 Available products after filter:', availableProducts.length);

  // If no available products after filtering, don't show the section
  if (availableProducts.length === 0) {
    console.log('🎁 No available products after filtering - returning null');
    return null;
  }

  const handleProductClick = (slug) => {
    navigate(`/product-detail/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllRelated = () => {
    navigate('/products');
  };

  // Helper function to display variant information
  const getVariantInfo = (product) => {
    if (product.has_variants) {
      const variantCount = product.variants?.length || 0;
      return `Available in ${variantCount} ${
        variantCount === 1 ? 'variant' : 'variants'
      }`;
    }
    return null;
  };

  // Format price for display
  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount || 0).toFixed(2)}`;
  };

  return (
    <section className="py-4 bg-white related-products-section">
      <div className="container px-4 px-lg-5 mt-5">
        {/* Section Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3
              className="fw-bold mb-1"
              style={{ fontSize: '1.75rem', color: '#28a745' }}
            >
              {title}
            </h3>
            <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
              Products you might like
            </p>
          </div>

          {/* View All Link (Optional) */}
          {products.length > maxDisplay && (
            <button
              onClick={handleViewAllRelated}
              className="btn btn-link text-decoration-none p-0"
              style={{
                color: '#28a745',
                fontWeight: '500',
                fontSize: '0.95rem',
              }}
            >
              View All <i className="bi bi-arrow-right ms-1"></i>
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {availableProducts.map((product) => (
            <div
              key={product.id}
              className="col-6 col-md-3 related-product-col"
            >
              <div
                className="related-product-card h-100 position-relative"
                onClick={() => handleProductClick(product.slug)}
              >
                {/* Product Image */}
                <div className="related-product-image-container">
                  <img
                    src={
                      product.image_url ||
                      product.thumbnail_url ||
                      'https://dummyimage.com/300x300/dee2e6/6c757d.jpg'
                    }
                    className="related-product-image"
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://dummyimage.com/300x300/dee2e6/6c757d.jpg';
                    }}
                  />

                  {/* Variant Badge */}
                  {product.has_variants && (
                    <div className="variant-badge">
                      <span className="badge bg-primary">
                        <i className="bi bi-option me-1"></i>Variants
                      </span>
                    </div>
                  )}

                  {/* Out of Stock Badge */}
                  {!product.in_stock && (
                    <div className="out-of-stock-badge">
                      <span className="badge bg-danger">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="related-product-info p-3">
                  {/* Category */}
                  {product.category?.name && (
                    <small
                      className="text-muted d-block mb-1"
                      style={{ fontSize: '0.8rem' }}
                    >
                      {product.category.name}
                    </small>
                  )}

                  {/* Product Name */}
                  <h6
                    className="related-product-name mb-2"
                    style={{
                      color: '#333',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      lineHeight: '1.3',
                      minHeight: '2.6rem',
                    }}
                  >
                    {product.name}
                  </h6>

                  {/* Variant Info */}
                  {product.has_variants && (
                    <small
                      className="text-primary d-block mb-2"
                      style={{ fontSize: '0.8rem' }}
                    >
                      <i className="bi bi-arrow-down-up me-1"></i>
                      {getVariantInfo(product)}
                    </small>
                  )}

                  {/* Price */}
                  <div className="related-product-price mb-2">
                    <span
                      className="fw-bold"
                      style={{ color: '#28a745', fontSize: '1.1rem' }}
                    >
                      {product.has_variants ? (
                        <>
                          From {formatCurrency(product.price)}
                          <small
                            className="text-muted d-block"
                            style={{ fontSize: '0.8rem' }}
                          >
                            Select options for exact price
                          </small>
                        </>
                      ) : (
                        formatCurrency(product.price)
                      )}
                    </span>
                  </div>

                  {/* View Details Button */}
                  <button
                    className="btn btn-sm w-100"
                    style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      fontSize: '0.9rem',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.slug);
                    }}
                  >
                    {product.has_variants ? 'Select Options' : 'View Details'}
                  </button>
                </div>

                {/* Hover Effect Overlay */}
                <div className="related-product-overlay">
                  <div className="overlay-content">
                    <i className="bi bi-eye"></i>
                    <span>View Product</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show message if some products were filtered out */}
        {availableProducts.length < products.slice(0, maxDisplay).length && (
          <div className="mt-4 text-center">
            <small className="text-muted" style={{ fontSize: '0.85rem' }}>
              <i className="bi bi-info-circle me-1"></i>
              Showing only available products ({
                availableProducts.length
              } of {Math.min(products.length, maxDisplay)})
            </small>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="text-center mt-4">
          <div
            style={{
              width: '100px',
              height: '3px',
              backgroundColor: '#28a745',
              margin: '0 auto',
              borderRadius: '2px',
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
