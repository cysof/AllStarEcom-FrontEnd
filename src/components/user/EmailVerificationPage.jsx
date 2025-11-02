import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';
import Spinner from '../ui/Spinner';
import styles from './EmailVerificationPage.module.css';

const EmailVerificationPage = () => {
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    if (!token) {
      setVerificationStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    try {
      const response = await api.post(`/account/verify-email/${token}/`);

      setVerificationStatus('success');
      setMessage(response.data.message || 'Email verified successfully!');
      setUserEmail(response.data.user?.email || '');

      toast.success('Email verified successfully! You can now login.', {
        position: 'top-right',
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 3000);
    } catch (error) {
      setVerificationStatus('error');

      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
        toast.error(error.response.data.error, {
          position: 'top-right',
          autoClose: 4000,
        });
      } else if (error.message === 'Network Error') {
        setMessage('Network error. Please check your connection.');
        toast.error('Network error. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        setMessage('Verification failed. Please try again.');
        toast.error('Verification failed. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  const handleResendVerification = async () => {
    toast.info('Resend verification feature coming soon!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  if (verificationStatus === 'verifying') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.spinnerWrapper}>
            <Spinner loading={true} />
          </div>
          <h2 className={styles.title}>Verifying Your Email</h2>
          <p className={styles.message}>
            Please wait while we verify your email address...
          </p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'success') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.iconSuccess}>
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2" />
              <path
                d="M8 12l3 3 5-5"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className={styles.titleSuccess}>Email Verified!</h2>
          <p className={styles.message}>{message}</p>
          {userEmail && <p className={styles.email}>{userEmail}</p>}
          <p className={styles.redirect}>Redirecting to login page...</p>
          <Link to="/login" className={styles.button}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconError}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
            <path
              d="M15 9l-6 6M9 9l6 6"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h2 className={styles.titleError}>Verification Failed</h2>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button
            onClick={handleResendVerification}
            className={styles.buttonSecondary}
          >
            Resend Verification Email
          </button>
          <Link to="/login" className={styles.button}>
            Go to Login
          </Link>
        </div>

        <div className={styles.help}>
          <p>Need help?</p>
          <Link to="/contact">Contact Support</Link>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
