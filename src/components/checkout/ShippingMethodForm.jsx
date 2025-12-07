// ============================================================================
// ShippingMethodForm.jsx - IMPROVED
// Step 2: Select Shipping Method (with calculated fees per location)
// ============================================================================
import React from 'react';

const ShippingMethodForm = ({
  methods = [],
  address,
  selectedMethod,
  onSelect,
  onBack,
  loading,
}) => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h5 className="card-title mb-4">
          <i className="bi bi-box-seam me-2"></i>
          Select Shipping Method
        </h5>

        {/* Address Summary */}
        <div className="alert alert-light mb-4" role="alert">
          <small className="text-muted">
            <i className="bi bi-geo-alt me-1"></i>
            Shipping to:{' '}
            <strong>
              {address?.city}, {address?.state}
            </strong>
          </small>
        </div>

        {/* No shipping methods available */}
        {methods.length === 0 ? (
          <div className="alert alert-warning" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            No shipping methods available for your location. Please try again
            later or contact support.
          </div>
        ) : (
          <>
            {/* Shipping methods list */}
            <div className="shipping-methods">
              {methods.map((method) => (
                <div key={method.id} className="mb-3">
                  <div
                    className={`p-3 border rounded-3 cursor-pointer transition-all ${
                      selectedMethod?.id === method.id
                        ? 'border-primary bg-light'
                        : 'border-secondary bg-white'
                    }`}
                    onClick={() => onSelect(method.id)}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3 flex-grow-1">
                        {/* Radio button */}
                        <input
                          type="radio"
                          name="shipping_method"
                          id={`method_${method.id}`}
                          value={method.id}
                          checked={selectedMethod?.id === method.id}
                          onChange={() => onSelect(method.id)}
                          disabled={loading}
                        />

                        {/* Method details */}
                        <div className="flex-grow-1">
                          <label
                            htmlFor={`method_${method.id}`}
                            className="mb-0 fw-medium"
                            style={{ cursor: 'pointer' }}
                          >
                            {method.name}
                          </label>

                          {method.description && (
                            <small className="text-muted d-block">
                              {method.description}
                            </small>
                          )}

                          {/* Delivery estimate */}
                          {method.estimated_days && (
                            <small className="text-muted d-block">
                              <i className="bi bi-calendar me-1"></i>
                              {method.estimated_days}
                            </small>
                          )}

                          {/* Fee breakdown */}
                          {(method.base_fee > 0 || method.product_fees > 0) && (
                            <small className="text-muted d-block mt-1">
                              <i className="bi bi-info-circle me-1"></i>
                              Base: ₦{method.base_fee.toFixed(2)}
                              {method.product_fees > 0 && (
                                <>
                                  {' '}
                                  + Product: ₦{method.product_fees.toFixed(2)}
                                </>
                              )}
                            </small>
                          )}
                        </div>
                      </div>

                      {/* Total Fee */}
                      <div
                        className="text-end ms-3"
                        style={{ minWidth: '100px' }}
                      >
                        <p className="mb-0 fw-bold fs-5">
                          {method.total_fee === 0 ? (
                            <span className="text-success">Free</span>
                          ) : (
                            <>
                              <span className="d-block">
                                ₦{method.total_fee.toFixed(2)}
                              </span>
                            </>
                          )}
                        </p>
                        <small className="text-muted d-block">Total</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 d-flex gap-3">
              <button
                onClick={onBack}
                className="btn btn-outline-secondary flex-grow-1"
                disabled={loading}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back
              </button>
              <button
                onClick={() => onSelect(selectedMethod?.id)}
                className="btn btn-primary flex-grow-1"
                disabled={loading || !selectedMethod}
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
                    Continue to Review
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShippingMethodForm;
