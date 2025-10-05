import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import styles from './HomeCard.module.css';
import { BASE_URL } from '../../api';

const HomeCard = ({ product }) => {
  return (
    <div className={`col-md-3 ${styles.col}`}>
      <Link to={`/products/${product.slug}`} className={styles.link}>
        <div className={styles.card}>
          <div className={styles.cardImgWrapper}>
            <div className={styles.cardImgPlaceholder}>
              <FaShoppingBag className={styles.placeholderIcon} />
              <span>
                <img
                  src={`${BASE_URL}${product.image}`}
                  className={styles.cardImgTop}
                  alt="Product Image"
                />
              </span>
            </div>
            <div className={styles.cardOverlay}>
              <button className={styles.quickViewBtn}>Quick View</button>
            </div>
          </div>
          <div className={styles.cardBody}>
            <h5 className={styles.cardTitle}> {product.name}</h5>
            <div className={styles.priceContainer}>
              <h6 className={styles.cardPrice}> {product.price}</h6>
              <span className={styles.discountBadge}>-20%</span>
            </div>
            <div className={styles.rating}>
              ★★★★☆ <span className={styles.ratingCount}>(128)</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeCard;
