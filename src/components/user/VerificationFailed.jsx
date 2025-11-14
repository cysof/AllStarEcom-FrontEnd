import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerificationFailed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reason = searchParams.get('reason');

  const getMessage = () => {
    switch (reason) {
      case 'expired':
        return 'Your verification link has expired. Please request a new one.';
      case 'invalid':
        return 'This verification link is invalid or has already been used.';
      default:
        return 'An error occurred during verification. Please try again.';
    }
  };

  return (
    <div className="container text-center my-5">
      <div className="card p-5">
        <i
          className="bi bi-x-circle text-danger"
          style={{ fontSize: '4rem' }}
        ></i>
        <h2 className="mt-3">Verification Failed</h2>
        <p>{getMessage()}</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate('/register')}
        >
          Back to Register
        </button>
      </div>
    </div>
  );
};

export default VerificationFailed;
