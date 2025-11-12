import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import styles from './ProductsPage.module.css';
import HomeCard from '../home/HomeCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const handleProductClick = (productSlug) => {
    if (productSlug) {
      navigate(`/products/${productSlug}`);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center" role="alert">
          <h4>Error Loading Products</h4>
          <p>{error}</p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary mt-2"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productsPage}>
      <div className="container px-4 px-lg-5 py-5">
        {/* Header Section - Same as CardContainer */}
        <div className="text-center mb-5">
          <h1 className={`fw-bold ${styles.pageTitle}`}>All Products</h1>
          <p className={`lead ${styles.pageSubtitle}`}>
            Explore our complete collection
          </p>
        </div>

        {/* Products Grid - EXACT SAME LAYOUT AS CARDCONTAINER */}
        <div className="row justify-content-center">
          {products.map((product) => (
            <HomeCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
            />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <div className="text-center py-5">
            <h4>No products found</h4>
            <p className="text-muted">Check back later for new arrivals.</p>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
