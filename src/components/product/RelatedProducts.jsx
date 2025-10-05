import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeCard from '../home/HomeCard';
import './RelatedProducts.css';

const RelatedProducts = ({ products }) => {
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return null;
  }

  const handleProductClick = (e, slug) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/products/${slug}`);
  };

  return (
    <section className="py-2 bg-light">
      <div className="container px-4 px-lg-5">
        <h3 className="fw-bolder mb-3" style={{ fontSize: '1.3rem' }}>
          Related Products
        </h3>
        <div className="row gx-2 gx-lg-3">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="related-product-wrapper col-6 col-md-3 mb-3"
              onClick={(e) => handleProductClick(e, product.slug)}
              style={{ cursor: 'pointer' }}
            >
              <HomeCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
