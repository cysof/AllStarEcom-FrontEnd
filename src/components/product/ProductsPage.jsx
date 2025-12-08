import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Spinner from '../ui/Spinner';
import ProductCard from '../product/ProductCard';
import './ProductsPage.module.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build query parameters
        const params = new URLSearchParams({
          page: currentPage,
          page_size: pageSize,
          sort: sortBy,
        });

        if (selectedCategory) {
          params.append('category', selectedCategory);
        }
        if (searchQuery) {
          params.append('search', searchQuery);
        }
        if (priceRange.min > 0) {
          params.append('min_price', priceRange.min);
        }
        if (priceRange.max < 1000000) {
          params.append('max_price', priceRange.max);
        }

        const response = await api.get(`products/?${params.toString()}`);

        // Handle paginated response
        if (response.data.results) {
          // Django REST Framework pagination format
          setProducts(response.data.results);
          setFilteredProducts(response.data.results);
          setTotalPages(Math.ceil(response.data.count / pageSize));
        } else if (Array.isArray(response.data)) {
          // Simple array format
          setProducts(response.data);
          setFilteredProducts(response.data);
          setTotalPages(1);
        } else {
          // Single object or other format
          setProducts([]);
          setFilteredProducts([]);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategory, sortBy, searchQuery, priceRange]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('categories/');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle filter changes
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceChange = (type, value) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: parseInt(value) || 0,
    }));
    setCurrentPage(1);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 1000000 });
    setSortBy('newest');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount || 0).toFixed(2)}`;
  };

  // Loading state
  if (loading && currentPage === 1) {
    return <Spinner loading={loading} />;
  }

  // Error state
  if (error && currentPage === 1) {
    return (
      <div className="container my-5 py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Products</h4>
          <p>{error}</p>
          <div className="mt-3">
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h1 className="display-6 fw-bold mb-2">All Products</h1>
              <p className="text-muted mb-0">
                Discover our latest collection of fashion items
              </p>
            </div>
            <div className="text-muted">
              Showing {filteredProducts.length} products
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-lg-3 col-md-4 mb-4">
          <div
            className="card border-0 shadow-sm sticky-top"
            style={{ top: '20px' }}
          >
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0">
                <i className="bi bi-filter me-2"></i>
                Filters
              </h5>
            </div>
            <div className="card-body">
              {/* Search */}
              <div className="mb-4">
                <h6 className="mb-2 fw-semibold">Search</h6>
                <form onSubmit={handleSearch}>
                  <div className="input-group">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-outline-success" type="submit">
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </form>
              </div>

              {/* Categories */}
              <div className="mb-4">
                <h6 className="mb-2 fw-semibold">Category</h6>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name} ({category.product_count || 0})
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <h6 className="mb-2 fw-semibold">Price Range</h6>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label small text-muted">Min</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="₦0"
                      value={priceRange.min || ''}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      min="0"
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small text-muted">Max</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="₦1,000,000"
                      value={priceRange.max === 1000000 ? '' : priceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Sorting */}
              <div className="mb-4">
                <h6 className="mb-2 fw-semibold">Sort By</h6>
                <select
                  className="form-select"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>

              {/* Reset Filters Button */}
              <button
                onClick={resetFilters}
                className="btn btn-outline-secondary w-100"
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="col-lg-9 col-md-8">
          {/* Active Filters Display */}
          {(selectedCategory ||
            searchQuery ||
            priceRange.min > 0 ||
            priceRange.max < 1000000) && (
            <div className="alert alert-light border mb-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div className="d-flex flex-wrap gap-2">
                  <span className="fw-semibold">Active Filters:</span>
                  {selectedCategory && (
                    <span className="badge bg-primary">
                      Category:{' '}
                      {categories.find((c) => c.slug === selectedCategory)
                        ?.name || selectedCategory}
                      <button
                        className="btn-close btn-close-white ms-2"
                        style={{ fontSize: '10px' }}
                        onClick={() => setSelectedCategory('')}
                        aria-label="Remove category filter"
                      ></button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="badge bg-info">
                      Search: "{searchQuery}"
                      <button
                        className="btn-close btn-close-white ms-2"
                        style={{ fontSize: '10px' }}
                        onClick={() => setSearchQuery('')}
                        aria-label="Remove search filter"
                      ></button>
                    </span>
                  )}
                  {(priceRange.min > 0 || priceRange.max < 1000000) && (
                    <span className="badge bg-success">
                      Price: ₦{priceRange.min} - ₦{priceRange.max}
                      <button
                        className="btn-close btn-close-white ms-2"
                        style={{ fontSize: '10px' }}
                        onClick={() => setPriceRange({ min: 0, max: 1000000 })}
                        aria-label="Remove price filter"
                      ></button>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="col">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="mt-5">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? 'disabled' : ''
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <li
                          key={page}
                          className={`page-item ${
                            currentPage === page ? 'active' : ''
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        </li>
                      )
                    )}

                    <li
                      className={`page-item ${
                        currentPage === totalPages ? 'disabled' : ''
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          ) : (
            // No products found
            <div className="text-center py-5">
              <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">No Products Found</h4>
                <p>Try adjusting your filters or search term.</p>
                <button
                  onClick={resetFilters}
                  className="btn btn-outline-primary mt-2"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="row mt-5 pt-4 border-top">
        <div className="col-12">
          <div className="alert alert-light border" role="alert">
            <div className="row">
              <div className="col-md-4 text-center mb-3 mb-md-0">
                <i className="bi bi-truck display-6 text-success mb-2 d-block"></i>
                <h5>Free Shipping</h5>
                <p className="text-muted small">On orders over ₦50,000</p>
              </div>
              <div className="col-md-4 text-center mb-3 mb-md-0">
                <i className="bi bi-arrow-counterclockwise display-6 text-success mb-2 d-block"></i>
                <h5>30-Day Returns</h5>
                <p className="text-muted small">Hassle-free returns</p>
              </div>
              <div className="col-md-4 text-center">
                <i className="bi bi-shield-check display-6 text-success mb-2 d-block"></i>
                <h5>Secure Payment</h5>
                <p className="text-muted small">100% secure payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
