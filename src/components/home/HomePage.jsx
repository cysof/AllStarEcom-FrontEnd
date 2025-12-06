import React, { useEffect, useState } from 'react';
import Header from './Header';
import CardContainer from './CardContainer';
import api from '../../api';
import PlaceHolderContainer from '../ui/PlaceHolderContainer';
import { randomValue } from '../../GenerateCartCode';
import './HomePage.module.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Start with true
  const [error, setError] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // Initialize cart code on first load
  useEffect(() => {
    if (!localStorage.getItem('cart_code')) {
      localStorage.setItem('cart_code', randomValue);
      console.log('Generated new cart code:', randomValue);
    }
  }, []);

  // Fetch products for homepage
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch featured or new products for homepage
        // You might want to add a query parameter for featured products
        const response = await api.get('products?sort=newest&page_size=12');

        // Extract products from paginated response
        const productsData = response.data.results || response.data || [];

        // Optional: Filter or highlight featured products
        const featured = productsData
          .filter((product) => product.is_available && product.in_stock)
          .slice(0, 8); // Show 8 featured products

        setProducts(productsData);
        setFeaturedProducts(featured);

        console.log('HomePage loaded products:', productsData.length);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to retry fetching products
  const retryFetch = () => {
    setError(null);
    setLoading(true);

    // Trigger useEffect again
    const fetchProducts = async () => {
      try {
        const response = await api.get('products?sort=newest&page_size=12');
        const productsData = response.data.results || response.data || [];
        setProducts(productsData);
        setFeaturedProducts(productsData.slice(0, 8));
      } catch (err) {
        setError('Failed to load products. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  };

  return (
    <>
      <Header />

      {/* Loading State */}
      {loading && <PlaceHolderContainer />}

      {/* Error State */}
      {error && (
        <div className="container my-5">
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <h4 className="alert-heading">Error Loading Products</h4>
            <p>{error}</p>
            <hr />
            <div className="d-flex gap-2">
              <button className="btn btn-danger" onClick={retryFetch}>
                Try Again
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success State - Pass featured products or all products */}
      {!loading && !error && (
        <CardContainer
          products={
            featuredProducts.length > 0
              ? featuredProducts
              : products.slice(0, 8)
          }
          title="Featured Products"
          subtitle="Discover our most popular items"
        />
      )}
    </>
  );
};

export default HomePage;
