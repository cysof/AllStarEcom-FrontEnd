import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';
import styles from './ForgotPasswordPage.module.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const validate = () => {
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      toast.error(validationError, {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/account/forgot-password/', { email });

      setEmailSent(true);
      toast.success('Password reset link sent! Please check your email.', {
        position: 'top-right',
        autoClose: 5000,
      });
    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
        toast.error(error.response.data.error, {
          position: 'top-right',
          autoClose: 3000,
        });
      } else if (error.message === 'Network Error') {
        setError('Network error. Please check your connection.');
        toast.error('Network error. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        setError('Failed to send reset link. Please try again.');
        toast.error('Failed to send reset link. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
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
          <h2 className={styles.titleSuccess}>Check Your Email</h2>
          <p className={styles.message}>
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className={styles.messageSecondary}>
            Please check your inbox and click the link to reset your password.
            The link will expire in 1 hour.
          </p>

          <div className={styles.actions}>
            <Link to="/login" className={styles.button}>
              Back to Login
            </Link>
          </div>

          <div className={styles.help}>
            <p>Didn't receive the email?</p>
            <button
              onClick={() => setEmailSent(false)}
              className={styles.linkButton}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Forgot Password?</h2>
        <p className={styles.subtitle}>
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className={`form-control ${error ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              disabled={isLoading}
              autoComplete="email"
              autoFocus
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Remember your password? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
