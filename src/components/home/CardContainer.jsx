import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeCard from './HomeCard';
import styles from './CardContainer.module.css';

const CardContainer = ({
  products = [],
  title = 'Our Products',
  subtitle = 'Discover our exclusive collection',
  showViewAll = true,
  columns = 4, // Default 4 columns on desktop
}) => {
  const navigate = useNavigate();

  const handleViewAllProducts = () => {
    navigate('/products');
  };

  // Determine grid class based on columns
  const getGridClass = () => {
    if (columns === 2) return 'row-cols-1 row-cols-sm-2';
    if (columns === 3) return 'row-cols-1 row-cols-sm-2 row-cols-md-3';
    if (columns === 4)
      return 'row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4';
    if (columns === 5)
      return 'row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5';
    return 'row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4';
  };

  // Show empty state if no products
  if (products.length === 0) {
    return (
      <section className={`py-4 ${styles.productsSection}`} id="shop">
        <div className="container px-3 px-lg-4">
          <div className="text-center mb-4">
            <h2 className={`fw-bold ${styles.sectionTitle}`}>{title}</h2>
            {subtitle && (
              <p className={`lead ${styles.sectionSubtitle}`}>{subtitle}</p>
            )}
          </div>

          <div className="text-center py-4">
            <div className="alert alert-info d-inline-block py-3 px-4">
              <div className="d-flex flex-column align-items-center">
                <i className="bi bi-box-seam fs-1 text-muted mb-2"></i>
                <p className="mb-1">No products available at the moment.</p>
                <p className="mb-0 text-muted">
                  Check back soon for new arrivals!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-4 ${styles.productsSection}`} id="shop">
      <div className="container px-3 px-lg-4">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className={`fw-bold ${styles.sectionTitle}`}>{title}</h2>
          {subtitle && (
            <p className={`lead ${styles.sectionSubtitle}`}>{subtitle}</p>
          )}
        </div>

        {/* Products Grid */}
        <div className={`row ${getGridClass()} g-3 g-md-4`}>
          {products.map((product) => (
            <HomeCard key={product.id} product={product} />
          ))}
        </div>

        {/* View More Button (Conditional) */}
        {showViewAll && products.length > 0 && (
          <div className="text-center mt-4">
            <button
              className={`btn ${styles.viewMoreBtn}`}
              onClick={handleViewAllProducts}
              aria-label="View all products in the store"
            >
              <span className={styles.btnText}>View All Products</span>
              <span className={styles.btnIcon}>
                <i className="bi bi-arrow-right"></i>
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CardContainer;
