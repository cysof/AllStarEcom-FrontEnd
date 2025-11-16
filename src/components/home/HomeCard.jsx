import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import styles from './HomeCard.module.css';

const HomeCard = ({ product }) => {
  return (
    <div className={`col-md-3 ${styles.col}`}>
      <Link to={`/product-detail/${product.slug}`} className={styles.link}>
        <div className={styles.card}>
          <div className={styles.cardImgWrapper}>
            <div className={styles.cardImgPlaceholder}>
              <FaShoppingBag className={styles.placeholderIcon} />
              <span>
                <img
                  src={
                    product.medium_image_url ||
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
              </span>
            </div>
            <div className={styles.cardOverlay}>
              <button className={styles.quickViewBtn}>Quick View</button>
            </div>
          </div>
          <div className={styles.cardBody}>
            <h5 className={styles.cardTitle}>{product.name}</h5>
            <div className={styles.priceContainer}>
              <h6 className={styles.cardPrice}>₦{product.price}</h6>
            </div>
            <div className={styles.rating}></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeCard;
