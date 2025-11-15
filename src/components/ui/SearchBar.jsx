import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear after search
    }
  };

  return (
    <form onSubmit={handleSearch} className="d-flex">
      <div className="input-group">
        <input
          type="search"
          className="form-control"
          placeholder="Search products..."
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;