import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(135deg, #fefefe 0%, #fafafa 100%)',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 text-center">
            {/* Error Code */}
            <div className="mb-4">
              <h1
                className="display-1 fw-bold"
                style={{
                  background:
                    'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                404
              </h1>
            </div>

            {/* Main Message */}
            <div className="mb-5">
              <h2 className="h1 fw-bold text-dark mb-3">Page Not Found!</h2>
              <p className="lead text-muted mb-4">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <div className="bg-light rounded-3 p-4 mb-4">
                <p className="text-dark mb-2 fw-semibold">
                  Here are some helpful links instead:
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Link to="/" className="text-decoration-none text-primary">
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="text-decoration-none text-primary"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="text-decoration-none text-primary"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Link
                to="/"
                className="btn btn-lg rounded-pill px-5 py-3 fw-semibold text-white border-0"
                style={{
                  background:
                    'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
                }}
                onMouseOver={(e) => {
                  e.target.style.background =
                    'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow =
                    '0 6px 20px rgba(220, 38, 38, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background =
                    'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow =
                    '0 4px 15px rgba(220, 38, 38, 0.3)';
                }}
              >
                ← Back to Homepage
              </Link>

              <button
                className="btn btn-lg rounded-pill px-5 py-3 fw-semibold border-2"
                style={{
                  color: '#6b7280',
                  borderColor: '#d1d5db',
                  background: 'transparent',
                }}
                onClick={() => window.history.back()}
                onMouseOver={(e) => {
                  e.target.style.background = '#6b7280';
                  e.target.style.color = 'white';
                  e.target.style.borderColor = '#6b7280';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#6b7280';
                  e.target.style.borderColor = '#d1d5db';
                }}
              >
                Go Back
              </button>
            </div>

            {/* Additional Help */}
            <div className="mt-5 pt-4 border-top">
              <p className="text-muted small">
                If you believe this is an error, please{' '}
                <Link
                  to="/contact"
                  className="text-decoration-none"
                  style={{ color: '#dc2626' }}
                >
                  contact our support team
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
