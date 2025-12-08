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
  const [searchInput, setSearchInput] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 12;

  // Mobile filter toggle
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: currentPage,
          page_size: pageSize,
          sort: sortBy,
        });

        if (selectedCategory) params.append('category', selectedCategory);
        if (searchQuery) params.append('search', searchQuery);
        if (priceRange.min > 0) params.append('min_price', priceRange.min);
        if (priceRange.max < 1000000)
          params.append('max_price', priceRange.max);

        const response = await api.get(`products/?${params.toString()}`);

        if (response.data && response.data.results) {
          setProducts(response.data.results);
          setFilteredProducts(response.data.results);
          setTotalProducts(response.data.count || 0);
          setTotalPages(Math.ceil(response.data.count / pageSize));
        } else if (Array.isArray(response.data)) {
          setProducts(response.data);
          setFilteredProducts(response.data);
          setTotalProducts(response.data.length);
          setTotalPages(1);
        } else {
          setProducts([]);
          setFilteredProducts([]);
          setTotalProducts(0);
          setTotalPages(1);
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

  // Handlers
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
    if (showMobileFilters) setShowMobileFilters(false);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceChange = (type, value) => {
    const numValue = parseInt(value) || 0;
    setPriceRange((prev) => ({ ...prev, [type]: numValue }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 1000000 });
    setSortBy('newest');
    setSearchQuery('');
    setSearchInput('');
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  if (loading && currentPage === 1) return <Spinner loading={loading} />;

  if (error && currentPage === 1)
    return (
      <div className="container my-5 py-5">
        <div className="alert alert-danger">
          <h4>Error Loading Products</h4>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="row mb-3 align-items-center">
        <div className="col-12 col-md-6">
          <h1 className="display-6 fw-bold mb-1">All Products</h1>
          <p className="text-muted mb-0">
            Discover our latest collection of fashion items
          </p>
        </div>
        <div className="col-12 col-md-6 text-md-end text-muted mt-2 mt-md-0">
          Showing {filteredProducts.length} of {totalProducts} products
        </div>
      </div>

      <div className="row">
        {/* Sidebar for Desktop */}
        <div className="col-lg-3 d-none d-lg-block mb-4">
          <div
            className="card border-0 shadow-sm sticky-top"
            style={{ top: '20px' }}
          >
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0">
                <i className="bi bi-filter me-2"></i>Filters
              </h5>
            </div>
            <div className="card-body">
              {/* Search */}
              <form onSubmit={handleSearchSubmit} className="mb-3">
                <input
                  type="search"
                  className="form-control mb-2"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className="btn btn-success w-100" type="submit">
                  Search
                </button>
              </form>

              {/* Category */}
              <div className="mb-3">
                <label className="fw-semibold mb-1">Category</label>
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

              {/* Price */}
              <div className="mb-3">
                <label className="fw-semibold mb-1">Price Range</label>
                <div className="d-flex gap-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Min ₦"
                    value={priceRange.min || ''}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Max ₦"
                    value={priceRange.max === 1000000 ? '' : priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="mb-3">
                <label className="fw-semibold mb-1">Sort By</label>
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

              <button
                className="btn btn-outline-secondary w-100"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filters Toggle */}
        <div className="col-12 d-lg-none mb-3">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => setShowMobileFilters((prev) => !prev)}
          >
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          {showMobileFilters && (
            <div className="card border-0 shadow-sm mt-2 p-3">
              <form onSubmit={handleSearchSubmit} className="mb-3">
                <input
                  type="search"
                  className="form-control mb-2"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className="btn btn-success w-100" type="submit">
                  Search
                </button>
              </form>

              {/* Category */}
              <div className="mb-3">
                <label className="fw-semibold mb-1">Category</label>
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

              {/* Price */}
              <div className="mb-3">
                <label className="fw-semibold mb-1">Price Range</label>
                <div className="d-flex gap-2">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Min ₦"
                    value={priceRange.min || ''}
                    onChange={(e) => handlePriceChange('min', e.target.value)}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Max ₦"
                    value={priceRange.max === 1000000 ? '' : priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="mb-3">
                <label className="fw-semibold mb-1">Sort By</label>
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

              <button
                className="btn btn-outline-secondary w-100"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="col-lg-9 col-12">
          {loading ? (
            <div className="text-center py-5">
              <Spinner loading={loading} />
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="col d-flex">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div className="alert alert-warning">
                <h4>No Products Found</h4>
                <p>No products match your current filters.</p>
                <button
                  className="btn btn-outline-primary"
                  onClick={resetFilters}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
