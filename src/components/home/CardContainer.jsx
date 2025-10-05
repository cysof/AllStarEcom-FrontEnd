import React from 'react';
import HomeCard from './HomeCard';
import styles from './CardContainer.module.css';

const CardContainer = ({products}) => {
  return (
    <section className={`py-5 ${styles.productsSection}`} id="shop">
      <div className="container px-4 px-lg-5">
        <div className="text-center mb-5">
          <h2 className={`fw-bold ${styles.sectionTitle}`}>Our Products</h2>
          <p className={`lead ${styles.sectionSubtitle}`}>
            Discover our exclusive collection
          </p>
        </div>

        <div className="row justify-content-center">
          {products.map((product) => (
            <HomeCard key={product.id}  product={product}/>
          ))}

        </div>

        {/* Optional: View more button */}
        <div className="text-center mt-5">
          <button className={`btn ${styles.viewMoreBtn}`}>
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default CardContainer;
