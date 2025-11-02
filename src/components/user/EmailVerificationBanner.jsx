import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api';
import styles from './EmailVerificationBanner.module.css';

const EmailVerificationBanner = ({ user }) => {
  const [isResending, setIsResending] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (!user || user.email_verified || isDismissed) {
    return null;
  }

  const handleResendVerification = async () => {
    setIsResending(true);

    try {
      await api.post('/account/resend-verification/');

      toast.success('Verification email sent! Please check your inbox.', {
        position: 'top-right',
        autoClose: 4000,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          'Failed to resend verification email. Please try again.',
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className={styles.message}>
          <strong>Verify your email address</strong>
          <p>
            Please check your inbox at{' '}
            <span className={styles.email}>{user.email}</span> and click the
            verification link.
          </p>
        </div>
        <div className={styles.actions}>
          <button
            onClick={handleResendVerification}
            disabled={isResending}
            className={styles.resendBtn}
          >
            {isResending ? 'Sending...' : 'Resend Email'}
          </button>
          <button
            onClick={handleDismiss}
            className={styles.dismissBtn}
            aria-label="Dismiss banner"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationBanner;
