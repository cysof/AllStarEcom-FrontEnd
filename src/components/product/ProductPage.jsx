import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductPagePlaceHolder from './ProductPagePlaceHolder';
import RelatedProducts from './RelatedProducts';
import api from '../../api';
import { toast } from 'react-toastify';
import styles from './ProductPage.module.css';

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
  const [cartItemId, setCartItemId] = useState(null);

  // Variant selection state
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [availableVariants, setAvailableVariants] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug || slug === 'undefined' || slug === 'null') {
        setError('Invalid product URL');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`product-detail/${slug}/`);
        const productData = response.data;
        setProduct(productData);

        // DEBUG: Log the response
        console.log('📦 API Response keys:', Object.keys(productData));
        console.log('📦 Similar products:', productData.similar_products);
        console.log('📦 Related products:', productData.related_products);

        // Set similar products - handle both field names
        const relatedProds =
          productData.similar_products || productData.related_products || [];
        console.log(
          '📦 Setting similar products:',
          relatedProds.length,
          'items'
        );
        setSimilarProducts(relatedProds);

        // Initialize variant data
        if (productData.has_variants && productData.variants) {
          const variants = productData.variants;
          setAvailableVariants(variants);

          // Extract unique sizes and colors
          const sizes = [
            ...new Set(variants.map((v) => v.size).filter(Boolean)),
          ];
          const colors = [
            ...new Set(variants.map((v) => v.color).filter(Boolean)),
          ];

          setAvailableSizes(sizes);
          setAvailableColors(colors);

          // Auto-select first available variant
          const firstAvailable = variants.find((v) => v.in_stock);
          if (firstAvailable) {
            setSelectedVariant(firstAvailable);
            setSelectedSize(firstAvailable.size || '');
            setSelectedColor(firstAvailable.color || '');
          }
        }
      } catch (err) {
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

  // Check if product is in cart
  useEffect(() => {
    const checkCartStatus = async () => {
      const cart_code = localStorage.getItem('cart_code');
      if (!product?.id || !cart_code) return;

      setCheckingCart(true);
      try {
        const response = await api.get(
          `product_in_cart?cart_code=${cart_code}&product_id=${product.id}${
            selectedVariant ? `&variant_id=${selectedVariant.id}` : ''
          }`
        );
        setInCart(response.data.product_in_cart || false);
        setCartItemId(response.data.cart_item_id || null);
      } catch (err) {
        setInCart(false);
        setCartItemId(null);
      } finally {
        setCheckingCart(false);
      }
    };

    checkCartStatus();
  }, [product?.id, selectedVariant]);

  // Update selected variant when size or color changes
  useEffect(() => {
    if (!product?.has_variants || !availableVariants.length) return;

    let filteredVariants = availableVariants;

    if (selectedSize) {
      filteredVariants = filteredVariants.filter(
        (v) => v.size === selectedSize
      );
    }

    if (selectedColor) {
      filteredVariants = filteredVariants.filter(
        (v) => v.color === selectedColor
      );
    }

    // Find first available variant that matches selection
    const matchingVariant = filteredVariants.find((v) => v.in_stock);

    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
    } else {
      setSelectedVariant(null);
      // Show error message if no variant matches
      if (selectedSize || selectedColor) {
        toast.error('Selected combination is out of stock');
      }
    }
  }, [selectedSize, selectedColor, availableVariants, product?.has_variants]);

  // Add item to cart
  const add_item = async () => {
    // Validate variant selection for variant products
    if (product?.has_variants && !selectedVariant) {
      toast.error('Please select a size/color combination');
      return;
    }

    // Check if product/variant is available
    if (product?.has_variants) {
      if (!selectedVariant?.is_available) {
        toast.error('This variant is not available for purchase');
        return;
      }
      if (!selectedVariant?.in_stock) {
        toast.error('This variant is out of stock');
        return;
      }
    } else {
      if (!product?.is_available) {
        toast.error('This product is not available for purchase');
        return;
      }
      if (!product?.in_stock) {
        toast.error('This product is out of stock');
        return;
      }
    }

    const cart_code = localStorage.getItem('cart_code');
    if (!cart_code) {
      toast.error('Cart not initialized. Please refresh the page.');
      return;
    }
    if (!product?.id) {
      toast.error('Product information not available.');
      return;
    }

    setAddingToCart(true);
    const newItem = {
      cart_code: cart_code,
      product_id: product.id,
      quantity: quantity,
      variant_id: selectedVariant?.id || null,
    };

    try {
      const response = await api.post('add_item/', newItem);
      setInCart(true);
      setCartItemId(response.data.data?.id);
      toast.success('Product added to cart successfully');
      setNumCartItems((current) => current + quantity);
    } catch (err) {
      // Handle specific error messages from backend
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Failed to add item to cart. Please try again.';

      if (err.response?.status === 400) {
        toast.error(errorMessage);
      } else if (err.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setAddingToCart(false);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  // Handle similar product click
  const handleSimilarProductClick = (productSlug) => {
    if (productSlug) {
      navigate(`/product-detail/${productSlug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Format currency to Naira
  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount || 0).toFixed(2)}`;
  };

  // Get stock status badge
  const getStockBadge = () => {
    if (product?.has_variants) {
      if (selectedVariant) {
        if (!selectedVariant.is_available) {
          return <span className="badge bg-danger">Variant Not Available</span>;
        }
        if (!selectedVariant.in_stock) {
          return <span className="badge bg-danger">Variant Out of Stock</span>;
        }
        if (selectedVariant.stock_quantity <= 5) {
          return (
            <span className="badge bg-warning text-dark">
              Low Stock: {selectedVariant.stock_quantity}
            </span>
          );
        }
        return (
          <span className="badge bg-success">
            In Stock: {selectedVariant.stock_quantity}
          </span>
        );
      }
      return <span className="badge bg-info">Select size/color</span>;
    } else {
      if (!product?.is_available) {
        return <span className="badge bg-danger">Not Available</span>;
      }
      if (!product?.in_stock) {
        return <span className="badge bg-danger">Out of Stock</span>;
      }
      if (product?.stock_quantity <= 5) {
        return (
          <span className="badge bg-warning text-dark">
            Low Stock: {product.stock_quantity}
          </span>
        );
      }
      return (
        <span className="badge bg-success">
          In Stock: {product.stock_quantity}
        </span>
      );
    }
  };

  // Get shipping badge
  const getShippingBadge = () => {
    if (!product?.requires_shipping) {
      return <span className="badge bg-info">Digital Product</span>;
    }
    if (product?.free_shipping) {
      return <span className="badge bg-success">Free Shipping</span>;
    }
    if (product?.calculated_shipping_fee > 0) {
      return (
        <span className="badge bg-secondary">
          Shipping: {formatCurrency(product.calculated_shipping_fee)}
        </span>
      );
    }
    return <span className="badge bg-light text-dark">Shipping required</span>;
  };

  // Check if add to cart button should be disabled
  const isAddToCartDisabled = () => {
    if (product?.has_variants) {
      return (
        !selectedVariant ||
        !selectedVariant.is_available ||
        !selectedVariant.in_stock ||
        inCart ||
        addingToCart ||
        checkingCart
      );
    } else {
      return (
        !product?.is_available ||
        !product?.in_stock ||
        inCart ||
        addingToCart ||
        checkingCart
      );
    }
  };

  // Get add to cart button text
  const getAddToCartButtonText = () => {
    if (checkingCart) return 'Checking...';
    if (addingToCart) return 'Adding...';
    if (inCart) return 'Product added to cart';

    if (product?.has_variants) {
      if (!selectedVariant) return 'Select variant';
      if (!selectedVariant.is_available) return 'Variant Not Available';
      if (!selectedVariant.in_stock) return 'Variant Out of Stock';
    } else {
      if (!product?.is_available) return 'Not Available';
      if (!product?.in_stock) return 'Out of Stock';
    }

    return 'Add to Cart';
  };

  // Get display price
  const getDisplayPrice = () => {
    if (product?.has_variants && selectedVariant) {
      return selectedVariant.final_price;
    }
    return product?.price || 0;
  };

  // Render variant selection UI
  const renderVariantSelection = () => {
    if (!product?.has_variants || !availableVariants.length) return null;

    return (
      <div className="variant-selection mb-4">
        <h6 className="mb-3" style={{ color: '#28a745', fontWeight: '600' }}>
          Select Options
        </h6>

        {/* Size Selection */}
        {availableSizes.length > 0 && (
          <div className="mb-3">
            <label className="form-label fw-medium">Size</label>
            <div className="d-flex flex-wrap gap-2">
              {availableSizes.map((size) => {
                const variant = availableVariants.find(
                  (v) => v.size === size && v.in_stock
                );
                const isAvailable = !!variant;
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    type="button"
                    className={`btn ${
                      isSelected
                        ? 'btn-success'
                        : isAvailable
                        ? 'btn-outline-success'
                        : 'btn-outline-secondary'
                    }`}
                    onClick={() => isAvailable && setSelectedSize(size)}
                    disabled={!isAvailable}
                    title={isAvailable ? `Available` : 'Out of stock'}
                    style={{
                      minWidth: '60px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {size}
                    {!isAvailable && (
                      <span className="ms-1 text-danger">✗</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {availableColors.length > 0 && (
          <div className="mb-3">
            <label className="form-label fw-medium">Color</label>
            <div className="d-flex flex-wrap gap-2">
              {availableColors.map((color) => {
                const variant = availableVariants.find(
                  (v) => v.color === color && v.in_stock
                );
                const isAvailable = !!variant;
                const isSelected = selectedColor === color;

                return (
                  <button
                    key={color}
                    type="button"
                    className={`btn ${
                      isSelected
                        ? 'btn-success'
                        : isAvailable
                        ? 'btn-outline-success'
                        : 'btn-outline-secondary'
                    }`}
                    onClick={() => isAvailable && setSelectedColor(color)}
                    disabled={!isAvailable}
                    title={
                      isAvailable
                        ? `${color} - Available`
                        : `${color} - Out of stock`
                    }
                    style={{
                      minWidth: '80px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {color}
                    {!isAvailable && (
                      <span className="ms-1 text-danger">✗</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Variant Details */}
        {selectedVariant && (
          <div
            className="alert alert-success p-3"
            style={{
              backgroundColor: 'rgba(40, 167, 69, 0.1)',
              borderColor: '#28a745',
              color: '#155724',
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Selected:</strong> {selectedVariant.display_name}
                {selectedVariant.price_adjustment !== 0 && (
                  <small className="text-muted ms-2">
                    ({selectedVariant.price_adjustment > 0 ? '+' : ''}
                    {formatCurrency(selectedVariant.price_adjustment)})
                  </small>
                )}
              </div>
              <div className="fw-bold" style={{ color: '#28a745' }}>
                {formatCurrency(selectedVariant.final_price)}
              </div>
            </div>
            <div className="mt-2">
              <small>
                SKU: <strong>{selectedVariant.sku}</strong> | Stock:{' '}
                <strong>{selectedVariant.stock_quantity}</strong> units
              </small>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render quantity selector
  const renderQuantitySelector = () => {
    const maxQuantity =
      selectedVariant?.stock_quantity || product?.stock_quantity || 10;

    return (
      <div className="mb-4">
        <label className="form-label fw-medium">Quantity</label>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-secondary"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            disabled={quantity <= 1}
            style={{ width: '40px', height: '40px' }}
          >
            -
          </button>
          <input
            type="number"
            className="form-control text-center mx-2"
            style={{ width: '80px', height: '40px' }}
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            max={maxQuantity}
          />
          <button
            className="btn btn-outline-secondary"
            onClick={() => quantity < maxQuantity && setQuantity(quantity + 1)}
            disabled={quantity >= maxQuantity}
            style={{ width: '40px', height: '40px' }}
          >
            +
          </button>
          <small className="ms-3 text-muted">Max: {maxQuantity} units</small>
        </div>
      </div>
    );
  };

  if (loading) return <ProductPagePlaceHolder />;

  if (error) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error Loading Product</h4>
          <p>{error}</p>
          <hr />
          <button onClick={() => navigate('/')} className="btn btn-success">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-warning">
          <h4>Product not available</h4>
          <button
            onClick={() => navigate('/')}
            className="btn btn-success mt-3"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            {/* Product Image Section */}
            <div className="col-md-6">
              {/* Main Image */}
              <div className="product-main-image mb-5 mb-md-0">
                <img
                  className="img-fluid rounded shadow-sm"
                  src={
                    product.large_image_url ||
                    product.image_url ||
                    'https://dummyimage.com/600x700/dee2e6/6c757d.jpg'
                  }
                  alt={product.name || 'Product image'}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://dummyimage.com/600x700/dee2e6/6c757d.jpg';
                  }}
                />
              </div>

              {/* Variant Images */}
              {product?.has_variants && selectedVariant?.image && (
                <div className="mt-4">
                  <small className="text-muted">Variant Image:</small>
                  <img
                    src={selectedVariant.image}
                    alt={selectedVariant.display_name}
                    className="img-thumbnail mt-2"
                    style={{ maxWidth: '150px' }}
                  />
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="col-md-6">
              {/* Product Name */}
              <h1
                className="display-5 fw-bolder mb-3"
                style={{ color: '#333' }}
              >
                {product.name || 'Product Name'}
              </h1>

              {/* Price */}
              <div className="fs-3 mb-3">
                <span className="fw-bold" style={{ color: '#28a745' }}>
                  {formatCurrency(getDisplayPrice())}
                </span>
                {product?.has_variants && !selectedVariant && (
                  <small className="text-muted d-block mt-1">
                    (Select variant for exact price)
                  </small>
                )}
              </div>

              {/* Stock & Shipping Badges */}
              <div className="d-flex flex-wrap gap-2 mb-4">
                {getStockBadge()}
                {getShippingBadge()}
              </div>

              {/* Variant Selection */}
              {renderVariantSelection()}

              {/* Product Description */}
              <div className="mb-4">
                <h6 className="mb-2 fw-medium" style={{ color: '#28a745' }}>
                  Description
                </h6>
                <p className="text-muted" style={{ lineHeight: '1.6' }}>
                  {product.description || 'No description available.'}
                </p>
              </div>

              {/* Product Details */}
              <div className="mb-4">
                <h6 className="mb-3 fw-medium" style={{ color: '#28a745' }}>
                  Product Details
                </h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-box-seam me-2 text-success"></i>
                    <strong>Category:</strong>{' '}
                    <span className="text-muted">
                      {product.category?.name || 'Uncategorized'}
                    </span>
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-check-circle me-2 text-success"></i>
                    <strong>Type:</strong>{' '}
                    <span className="text-muted">
                      {product.has_variants
                        ? 'Product with variants'
                        : 'Simple product'}
                    </span>
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-grid-3x3-gap me-2 text-success"></i>
                    <strong>Total Stock:</strong>{' '}
                    <span className="text-muted">
                      {product.total_stock || 0} units
                    </span>
                  </li>
                  <li>
                    <i className="bi bi-truck me-2 text-success"></i>
                    <strong>Shipping:</strong>{' '}
                    <span className="text-muted">
                      {product.requires_shipping
                        ? product.free_shipping
                          ? 'Free Shipping'
                          : `Shipping fee: ${formatCurrency(
                              product.calculated_shipping_fee
                            )}`
                        : 'Digital - No shipping required'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Quantity Selector */}
              {renderQuantitySelector()}

              {/* Add to Cart Button */}
              <div className="d-flex mb-3">
                <button
                  className="btn btn-success flex-shrink-0 py-3"
                  type="button"
                  onClick={add_item}
                  disabled={isAddToCartDisabled()}
                  aria-label={getAddToCartButtonText()}
                  style={{
                    minWidth: '200px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <i className="bi-cart-fill me-2"></i>
                  {getAddToCartButtonText()}
                </button>
              </div>

              {/* Additional Info Messages */}
              <div className="messages mt-3">
                {product?.has_variants && !selectedVariant && (
                  <p className="text-warning mb-2">
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    Please select a size and color combination.
                  </p>
                )}
                {product?.has_variants &&
                  selectedVariant &&
                  !selectedVariant?.is_available && (
                    <p className="text-danger mb-2">
                      <i className="bi bi-exclamation-triangle me-1"></i>
                      This variant is not available for purchase.
                    </p>
                  )}
                {product?.has_variants &&
                  selectedVariant &&
                  !selectedVariant?.in_stock && (
                    <p className="text-danger mb-2">
                      <i className="bi bi-exclamation-triangle me-1"></i>
                      This variant is out of stock.
                    </p>
                  )}
                {!product?.has_variants && !product?.is_available && (
                  <p className="text-danger mb-2">
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    This product is not available for purchase.
                  </p>
                )}
                {!product?.has_variants &&
                  product?.is_available &&
                  !product?.in_stock && (
                    <p className="text-danger mb-2">
                      <i className="bi bi-exclamation-triangle me-1"></i>
                      This product is out of stock. Check back later!
                    </p>
                  )}
                {inCart && (
                  <p className="text-success mb-2">
                    <i className="bi bi-check-circle me-1"></i>
                    This product is already in your cart.
                    {cartItemId && (
                      <button
                        className="btn btn-link btn-sm p-0 ms-2"
                        onClick={() => navigate('/cart')}
                        style={{ color: '#28a745' }}
                      >
                        View in cart →
                      </button>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section - Always visible if there are similar products */}
      {similarProducts.length > 0 && (
        <section className="py-5 bg-light">
          <div className="container px-4 px-lg-5">
            <RelatedProducts
              products={similarProducts}
              onProductClick={handleSimilarProductClick}
              title="Related Products You Might Like"
              maxDisplay={4}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductPage;
