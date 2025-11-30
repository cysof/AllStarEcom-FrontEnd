import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api';
import styles from './ResetPasswordPage.module.css';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', { autoClose: 3000 });
      return;
    }

    setIsLoading(true);
    try {
      await api.post(`/account/reset-password/${token}/`, {
        new_password: password,
        confirm_password: confirmPassword,
      });
      setSuccess(true);
      toast.success('Password reset successfully!', { autoClose: 3000 });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to reset password', {
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
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
          <h2 className={styles.titleSuccess}>Password Reset Successfully</h2>
          <p className={styles.message}>
            Your password has been updated successfully. You can now log in with
            your new password.
          </p>

          <div className={styles.actions}>
            <Link to="/login" className={styles.button}>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Reset Password</h2>
        <p className={styles.subtitle}>
          Enter your new password below to reset your account password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
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

export default ResetPasswordPage;
