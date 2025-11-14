import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './VerificationSuccess.css'; // Import the CSS file

const VerificationSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    toast.success('Email verified successfully! You can now make payments.');

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Redirect to login after 3 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="container text-center my-5">
      <div className="card p-5">
        <i
          className="bi bi-check-circle text-success"
          style={{ fontSize: '4rem' }}
        ></i>
        <h2 className="mt-3">Email Verified!</h2>
        <p className="success-message">
          Your email has been successfully verified. You can now make payments.
        </p>

        {/* Progress bar for auto-redirect */}
        <div className="redirect-progress">
          <div className="redirect-progress-bar"></div>
        </div>

        {/* Countdown text */}
        <div className="redirect-timer">
          Redirecting to login in {countdown} second{countdown !== 1 ? 's' : ''}
          ...
        </div>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate('/login')}
        >
          Go to Login Now
        </button>
      </div>
    </div>
  );
};

export default VerificationSuccess;
