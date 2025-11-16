import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../../api';
import Spinner from '../ui/Spinner';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState(0);

  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || '';

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, searchQuery, categoryFilter, sortBy]);

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      // 🔥 FIXED URL — Added trailing slash
      let url = `products/?page=${page}`;

      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      if (categoryFilter) {
        url += `&category=${categoryFilter}`;
      }
      if (sortBy) {
        url += `&sort=${sortBy}`;
      }

      const response = await api.get(url);

      setProducts(response.data.results || []);
      setCount(response.data.count || 0);
      setTotalPages(Math.ceil((response.data.count || 0) / 12));
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchParams({});
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (newSort) {
      newParams.set('sort', newSort);
    } else {
      newParams.delete('sort');
    }

    setSearchParams(newParams);
    setCurrentPage(1);
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="fw-bold">
            {searchQuery ? (
              <>
                Search Results for "
                <span className="text-primary">{searchQuery}</span>"
              </>
            ) : (
              'All Products'
            )}
          </h2>
          <p className="text-muted">{count} products found</p>
        </div>

        <div className="col-md-4 text-end">
          <div className="d-flex justify-content-end gap-2">
            {(searchQuery || sortBy) && (
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}
            <select
              className="form-select form-select-sm"
              style={{ width: 'auto' }}
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="">Sort By</option>
              <option value="name">Name (A-Z)</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* No Results */}
      {products.length === 0 && (
        <div className="text-center py-5">
          <h3>No products found</h3>
          <p className="text-muted">
            {searchQuery
              ? `No products match "${searchQuery}"`
              : 'No products available'}
          </p>
          {searchQuery && (
            <button className="btn btn-primary mt-3" onClick={clearFilters}>
              View All Products
            </button>
          )}
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 && (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((product) => (
              <div key={product.id} className="col">
                <div className="card h-100 shadow-sm">
                  {/* 🔥 FIXED PRODUCT DETAIL LINK */}
                  <Link to={`/product-detail/${product.slug}`}>
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                  </Link>

                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text fw-bold text-primary">
                      ₦{product.price?.toLocaleString()}
                    </p>

                    {/* 🔥 FIXED PRODUCT DETAIL LINK */}
                    <Link
                      to={`/product-detail/${product.slug}`}
                      className="btn btn-primary btn-sm w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-5">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                  ) {
                    return (
                      <li
                        key={pageNum}
                        className={`page-item ${
                          currentPage === pageNum ? 'active' : ''
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      </li>
                    );
                  }
                  return null;
                })}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? 'disabled' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
