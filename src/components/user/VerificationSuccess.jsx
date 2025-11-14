import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerificationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success('Email verified successfully! You can now make payments.');

    // Redirect to login or home after 3 seconds
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  }, [navigate]);

  return (
    <div className="container text-center my-5">
      <div className="card p-5">
        <i
          className="bi bi-check-circle text-success"
          style={{ fontSize: '4rem' }}
        ></i>
        <h2 className="mt-3">Email Verified!</h2>
        <p>
          Your email has been successfully verified. You can now make payments.
        </p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate('/login')}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VerificationSuccess;
