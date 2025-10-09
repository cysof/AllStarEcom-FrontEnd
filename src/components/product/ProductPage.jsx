import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductPagePlaceHolder from './ProductPagePlaceHolder';
import RelatedProducts from './RelatedProducts';
import { useEffect, useState } from 'react';
import api from '../../api';
import { BASE_URL } from '../../api';
import { toast } from 'react-toastify';

const ProductPage = ({ setNumCartItems }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [checkingCart, setCheckingCart] = useState(false);

  // Fetch product details first
  useEffect(() => {
    const fetchProduct = async () => {
      // Validate slug
      if (!slug || slug === 'undefined' || slug === 'null') {
        setError('Invalid product URL');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log('Fetching product with slug:', slug);
        const response = await api.get(`product-detail/${slug}`);
        console.log('Product data received:', response.data);
        setProduct(response.data);
        setSimilarProducts(response.data.similar_products || []);
      } catch (err) {
        console.error('Error fetching product:', err);
        if (err.response?.status === 404) {
          setError('Product not found');
        } else if (err.response?.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError('Failed to load product. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Check if product is in cart (only after product is loaded)
  useEffect(() => {
    const checkCartStatus = async () => {
      const cart_code = localStorage.getItem('cart_code');

      if (!product?.id || !cart_code) {
        console.log('Skipping cart check - missing product.id or cart_code');
        return;
      }

      setCheckingCart(true);

      try {
        console.log('Checking cart status for product:', product.id);
        const response = await api.get(
          `product_in_cart?cart_code=${cart_code}&product_id=${product.id}`
        );
        console.log('Cart status response:', response.data);
        setInCart(response.data.product_in_cart || false);
      } catch (err) {
        console.error('Error checking cart status:', err);
        // Don't show error to user for cart check failures
        // Just assume product is not in cart
        setInCart(false);
      } finally {
        setCheckingCart(false);
      }
    };

    checkCartStatus();
  }, [product?.id]);

  // Add item to cart
  const add_item = async () => {
    const cart_code = localStorage.getItem('cart_code');

    if (!cart_code) {
      alert('Cart not initialized. Please refresh the page.');
      return;
    }

    if (!product?.id) {
      alert('Product information not available.');
      return;
    }

    setAddingToCart(true);
    const newItem = {
      cart_code: cart_code,
      product_id: product.id,
    };

    try {
      console.log('Adding item to cart:', newItem);
      const response = await api.post('add_item/', newItem);
      console.log('Item added successfully:', response.data);
      setInCart(true);
      toast.success('Product added to cart successfully');
      setNumCartItems(currentValue => currentValue + 1)
    } catch (err) {
      console.error('Error adding to cart:', err);
      if (err.response?.status === 500) {
        alert('Server error. Please try again later.');
      } else if (err.response?.status === 400) {
        alert('Invalid request. Please try again.');
      } else {
        alert('Failed to add item to cart. Please try again.');
      }
    } finally {
      setAddingToCart(false);
    }
  };

  // Handle similar product click
  const handleSimilarProductClick = (productSlug) => {
    if (productSlug) {
      navigate(`/products/${productSlug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <ProductPagePlaceHolder />;
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Product</h4>
          <p>{error}</p>
          <hr />
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-warning" role="alert">
          <h4>Product not available</h4>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary mt-3"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={
                  product.image
                    ? `${BASE_URL}${product.image}`
                    : 'https://dummyimage.com/600x700/dee2e6/6c757d.jpg'
                }
                alt={product.name || 'Product image'}
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src =
                    'https://dummyimage.com/600x700/dee2e6/6c757d.jpg';
                }}
              />
            </div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder">
                {product.name || 'Product Name'}
              </h1>
              <div className="fs-5 mb-3">
                <span>
                  ${product.price ? Number(product.price).toFixed(2) : '0.00'}
                </span>
              </div>
              <p className="lead">
                {product.description || 'No description available.'}
              </p>
              <div className="d-flex">
                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                  onClick={add_item}
                  disabled={inCart || addingToCart || checkingCart}
                  aria-label={
                    inCart ? 'Product already in cart' : 'Add product to cart'
                  }
                >
                  <i className="bi-cart-fill me-1"></i>
                  {checkingCart
                    ? 'Checking...'
                    : addingToCart
                    ? 'Adding...'
                    : inCart
                    ? 'Product added to cart'
                    : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {similarProducts.length > 0 && (
        <RelatedProducts
          products={similarProducts}
          onProductClick={handleSimilarProductClick}
        />
      )}
    </div>
  );
};

export default ProductPage;
