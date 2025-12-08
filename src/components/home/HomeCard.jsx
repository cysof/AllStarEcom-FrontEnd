import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaTruck, FaBoxOpen } from 'react-icons/fa';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import styles from './HomeCard.module.css';

const HomeCard = ({ product }) => {
  // Format currency to Naira
  const formatPrice = (price) => {
    if (!price) return '₦0.00';
    const numPrice = parseFloat(price);
    return `₦${numPrice.toFixed(2)}`;
  };

  // Get stock status
  const getStockStatus = () => {
    if (!product.is_available) {
      return {
        text: 'Not Available',
        icon: <BiXCircle className={styles.statusIcon} />,
        className: styles.outOfStock,
      };
    }
    if (!product.in_stock) {
      return {
        text: 'Out of Stock',
        icon: <BiXCircle className={styles.statusIcon} />,
        className: styles.outOfStock,
      };
    }
    if (product.stock_quantity <= 5) {
      return {
        text: 'Low Stock',
        icon: <BiCheckCircle className={styles.statusIcon} />,
        className: styles.lowStock,
      };
    }
    return {
      text: 'In Stock',
      icon: <BiCheckCircle className={styles.statusIcon} />,
      className: styles.inStock,
    };
  };

  // Get shipping info
  const getShippingInfo = () => {
    if (!product.requires_shipping) {
      return {
        text: 'Digital',
        icon: <FaBoxOpen className={styles.statusIcon} />,
        className: styles.digital,
      };
    }
    if (product.free_shipping) {
      return {
        text: 'Free Shipping',
        icon: <FaTruck className={styles.statusIcon} />,
        className: styles.freeShipping,
      };
    }
    return null;
  };

  // Get variant info if applicable
  const hasVariants = product.has_variants;
  const variantCount = product.variants?.length || 0;

  const stockStatus = getStockStatus();
  const shippingInfo = getShippingInfo();

  return (
    <div className={styles.col}>
      <Link to={`/product-detail/${product.slug}`} className={styles.link}>
        <div className={styles.card}>
          {/* Product Image Container */}
          <div className={styles.cardImgWrapper}>
            {/* Stock Status Badge (Top Right) */}
            {!product.in_stock && (
              <div className={`${styles.badge} ${styles.stockBadge}`}>
                <span className={stockStatus.className}>
                  {stockStatus.icon}
                  <span className={styles.badgeText}>{stockStatus.text}</span>
                </span>
              </div>
            )}

            {/* Variant Badge (Top Left) */}
            {hasVariants && (
              <div className={`${styles.badge} ${styles.variantBadge}`}>
                <span className={styles.variantInfo}>
                  {variantCount} {variantCount === 1 ? 'Variant' : 'Variants'}
                </span>
              </div>
            )}

            <div className={styles.cardImgContainer}>
              <img
                src={
                  product.thumbnail_url ||
                  product.image_url ||
                  product.image ||
                  'https://dummyimage.com/300x300/dee2e6/6c757d.jpg'
                }
                className={styles.cardImgTop}
                alt={product.name || 'Product Image'}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://dummyimage.com/300x300/dee2e6/6c757d.jpg';
                }}
              />
              <FaShoppingBag className={styles.placeholderIcon} />
            </div>

            {/* Quick View Overlay */}
            <div className={styles.cardOverlay}>
              {/* <span className={styles.quickViewText}>View Details</span> */}
            </div>
          </div>

          {/* Product Details */}
          <div className={styles.cardBody}>
            {/* Category */}
            {product.category_name && (
              <p className={styles.cardCategory}>{product.category_name}</p>
            )}

            {/* Product Name */}
            <h5 className={styles.cardTitle} title={product.name}>
              {product.name}
            </h5>

            {/* Price */}
            <div className={styles.priceContainer}>
              <h6 className={styles.cardPrice}>
                {hasVariants ? 'From ' : ''}
                {formatPrice(product.price)}
              </h6>
            </div>

            {/* Stock & Shipping Info */}
            <div className={styles.productInfo}>
              {/* Stock Status (always show if not out of stock) */}
              {product.in_stock && product.is_available && (
                <div
                  className={`${styles.statusBadge} ${stockStatus.className}`}
                >
                  {stockStatus.icon}
                  <span className={styles.statusText}>{stockStatus.text}</span>
                </div>
              )}

              {/* Shipping Info */}
              {shippingInfo && (
                <div
                  className={`${styles.statusBadge} ${shippingInfo.className}`}
                >
                  {shippingInfo.icon}
                  <span className={styles.statusText}>{shippingInfo.text}</span>
                </div>
              )}

              {/* Show shipping fee if not free */}
              {product.requires_shipping &&
                !product.free_shipping &&
                product.calculated_shipping_fee > 0 && (
                  <div className={styles.shippingFee}>
                    +{formatPrice(product.calculated_shipping_fee)} shipping
                  </div>
                )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeCard;
