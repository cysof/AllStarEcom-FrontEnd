import React from 'react';

const ProductPagePlaceHolder = () => {
  return (
    <section className="py-3">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          {/* Product Image Placeholder */}
          <div className="col-md-6">
            <div
              className="card-img-top mb-5 mb-md-0 placeholder"
              style={{
                height: '500px',
                backgroundColor: '#e9ecef',
                borderRadius: '0.375rem',
              }}
            ></div>

            {/* Variant Image Placeholder */}
            <div className="mt-3 placeholder-glow">
              <small className="placeholder col-3"></small>
              <div
                className="img-thumbnail placeholder mt-2"
                style={{
                  width: '150px',
                  height: '150px',
                  backgroundColor: '#e9ecef',
                }}
              ></div>
            </div>
          </div>

          {/* Product Details Placeholder */}
          <div className="col-md-6">
            {/* Product Name */}
            <div className="placeholder-glow">
              <h1
                className="display-5 fw-bolder placeholder col-8"
                style={{ height: '2.5rem' }}
              ></h1>
            </div>

            {/* Price */}
            <div className="fs-5 mb-3 placeholder-glow">
              <span
                className="placeholder col-3"
                style={{ height: '1.5rem' }}
              ></span>
              <small
                className="placeholder col-4 ms-2"
                style={{ height: '1rem' }}
              ></small>
            </div>

            {/* Stock & Shipping Badges */}
            <div className="d-flex flex-wrap gap-2 mb-3 placeholder-glow">
              <span
                className="placeholder col-2"
                style={{ height: '1.5rem', borderRadius: '20px' }}
              ></span>
              <span
                className="placeholder col-3"
                style={{ height: '1.5rem', borderRadius: '20px' }}
              ></span>
            </div>

            {/* Variant Selection Placeholder */}
            <div className="variant-selection mb-4 placeholder-glow">
              <div
                className="placeholder col-3 mb-2"
                style={{ height: '1.25rem' }}
              ></div>

              {/* Size Selection Placeholder */}
              <div className="mb-3">
                <div
                  className="placeholder col-2 mb-2"
                  style={{ height: '1rem' }}
                ></div>
                <div className="d-flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <button
                      key={item}
                      className="btn placeholder"
                      style={{
                        width: '60px',
                        height: '38px',
                        backgroundColor: '#e9ecef',
                        border: 'none',
                      }}
                      disabled
                    ></button>
                  ))}
                </div>
              </div>

              {/* Color Selection Placeholder */}
              <div className="mb-3">
                <div
                  className="placeholder col-2 mb-2"
                  style={{ height: '1rem' }}
                ></div>
                <div className="d-flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((item) => (
                    <button
                      key={item}
                      className="btn placeholder"
                      style={{
                        width: '80px',
                        height: '38px',
                        backgroundColor: '#e9ecef',
                        border: 'none',
                      }}
                      disabled
                    ></button>
                  ))}
                </div>
              </div>

              {/* Selected Variant Details Placeholder */}
              <div className="alert alert-info p-3 placeholder-glow">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span
                      className="placeholder col-4"
                      style={{ height: '1rem' }}
                    ></span>
                    <small className="placeholder col-3 ms-2"></small>
                  </div>
                  <div>
                    <span
                      className="placeholder col-3"
                      style={{ height: '1.5rem' }}
                    ></span>
                  </div>
                </div>
                <div className="mt-2">
                  <small className="placeholder col-6"></small>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="mb-4 placeholder-glow">
              <div
                className="placeholder col-3 mb-2"
                style={{ height: '1.25rem' }}
              ></div>
              <div className="lead">
                <span className="placeholder col-12 mb-1"></span>
                <span className="placeholder col-12 mb-1"></span>
                <span className="placeholder col-10 mb-1"></span>
                <span className="placeholder col-11 mb-1"></span>
                <span className="placeholder col-9"></span>
              </div>
            </div>

            {/* Product Details List */}
            <div className="mb-4 placeholder-glow">
              <div
                className="placeholder col-3 mb-2"
                style={{ height: '1.25rem' }}
              ></div>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <span
                    className="placeholder col-4 me-2"
                    style={{ height: '1rem' }}
                  ></span>
                  <span
                    className="placeholder col-6"
                    style={{ height: '1rem' }}
                  ></span>
                </li>
                <li className="mb-2">
                  <span
                    className="placeholder col-4 me-2"
                    style={{ height: '1rem' }}
                  ></span>
                  <span
                    className="placeholder col-7"
                    style={{ height: '1rem' }}
                  ></span>
                </li>
                <li className="mb-2">
                  <span
                    className="placeholder col-4 me-2"
                    style={{ height: '1rem' }}
                  ></span>
                  <span
                    className="placeholder col-5"
                    style={{ height: '1rem' }}
                  ></span>
                </li>
                <li>
                  <span
                    className="placeholder col-4 me-2"
                    style={{ height: '1rem' }}
                  ></span>
                  <span
                    className="placeholder col-8"
                    style={{ height: '1rem' }}
                  ></span>
                </li>
              </ul>
            </div>

            {/* Quantity Selector Placeholder */}
            <div className="mb-4 placeholder-glow">
              <div
                className="placeholder col-2 mb-2"
                style={{ height: '1rem' }}
              ></div>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary placeholder"
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#e9ecef',
                    border: 'none',
                  }}
                  disabled
                ></button>
                <div
                  className="form-control placeholder mx-2"
                  style={{
                    width: '80px',
                    height: '40px',
                    backgroundColor: '#e9ecef',
                    border: 'none',
                  }}
                ></div>
                <button
                  className="btn btn-outline-secondary placeholder"
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#e9ecef',
                    border: 'none',
                  }}
                  disabled
                ></button>
                <small className="placeholder col-3 ms-3"></small>
              </div>
            </div>

            {/* Add to Cart Button Placeholder */}
            <div className="d-flex mb-3 placeholder-glow">
              <button
                className="btn btn-outline-dark flex-shrink-0 placeholder"
                type="button"
                disabled
                style={{
                  minWidth: '200px',
                  height: '3.5rem',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1.1rem',
                  backgroundColor: '#e9ecef',
                  border: 'none',
                }}
              ></button>
            </div>

            {/* Additional Info Placeholders */}
            <div className="placeholder-glow">
              {[1, 2, 3].map((item) => (
                <div key={item} className="mt-2">
                  <span
                    className="placeholder col-8"
                    style={{ height: '1rem' }}
                  ></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPagePlaceHolder;
