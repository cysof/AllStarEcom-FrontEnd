import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerificationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success('Email verified successfully! You can now make payments.');

    setTimeout(() => {
      navigate('/profile', { state: { fromVerification: true } });
    }, 2000);
  }, [navigate]);

  return (
    <div className="container text-center my-5">
      <div className="card p-5 shadow">
        <i
          className="bi bi-check-circle text-success"
          style={{ fontSize: '4rem' }}
        ></i>
        <h2 className="mt-3">Email Verified!</h2>
        <p className="lead">Your email has been successfully verified.</p>
        <p>You can now make payments. Redirecting to your profile...</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() =>
            navigate('/profile', { state: { fromVerification: true } })
          }
        >
          Go to Profile Now
        </button>
      </div>
    </div>
  );
};

export default VerificationSuccess;
