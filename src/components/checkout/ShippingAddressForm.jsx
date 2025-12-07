// ============================================================================
// ShippingAddressForm.jsx
// Step 1: Collect/Edit Shipping Address (Pre-filled from user profile)
// ============================================================================
import React, { useState } from 'react';

const ShippingAddressForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h5 className="card-title mb-4">
          <i className="bi bi-geo-alt me-2"></i>
          Shipping Address
        </h5>

        <form onSubmit={handleSubmit}>
          {/* First Name & Last Name */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.first_name ? 'is-invalid' : ''
                }`}
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={loading}
                placeholder="John"
              />
              {errors.first_name && (
                <div className="invalid-feedback d-block">
                  {errors.first_name}
                </div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.last_name ? 'is-invalid' : ''
                }`}
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={loading}
                placeholder="Doe"
              />
              {errors.last_name && (
                <div className="invalid-feedback d-block">
                  {errors.last_name}
                </div>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              placeholder="+234 800 000 0000"
            />
            {errors.phone && (
              <div className="invalid-feedback d-block">{errors.phone}</div>
            )}
          </div>

          {/* Street Address */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Street Address <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
              placeholder="123 Main Street"
            />
            {errors.address && (
              <div className="invalid-feedback d-block">{errors.address}</div>
            )}
          </div>

          {/* City & State */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="city" className="form-label">
                City <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={loading}
                placeholder="Lagos"
              />
              {errors.city && (
                <div className="invalid-feedback d-block">{errors.city}</div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="state" className="form-label">
                State <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                disabled={loading}
                placeholder="Lagos"
              />
              {errors.state && (
                <div className="invalid-feedback d-block">{errors.state}</div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-primary btn-lg w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Processing...
                </>
              ) : (
                <>
                  <i className="bi bi-arrow-right me-2"></i>
                  Continue to Shipping Method
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddressForm;
