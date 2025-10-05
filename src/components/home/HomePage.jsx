import React, { useEffect, useState } from 'react';
import Header from './Header';
import CardContainer from './CardContainer';
import api from '../../api';
import PlaceHolderContainer from '../ui/PlaceHolderContainer';
import { randomValue } from '../../GenerateCartCode';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    if (localStorage.getItem('cart_code') === null) {
      localStorage.setItem('cart_code', randomValue);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get('products');
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      {loading && <PlaceHolderContainer />}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && <CardContainer products={products} />}
    </>
  );
};

export default HomePage;
