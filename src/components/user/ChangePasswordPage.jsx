import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api';
import styles from './ChangePasswordPage.module.css';

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    new_password2: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPassword2, setShowNewPassword2] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.old_password) {
      newErrors.old_password = 'Current password is required';
    }

    if (!formData.new_password) {
      newErrors.new_password = 'New password is required';
    } else if (formData.new_password.length < 8) {
      newErrors.new_password = 'Password must be at least 8 characters';
    }

    if (!formData.new_password2) {
      newErrors.new_password2 = 'Please confirm your new password';
    } else if (formData.new_password !== formData.new_password2) {
      newErrors.new_password2 = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/account/change-password/', formData);

      toast.success(response.data.message || 'Password changed successfully!', {
        position: 'top-right',
        autoClose: 4000,
      });

      // Clear form
      setFormData({
        old_password: '',
        new_password: '',
        new_password2: '',
      });

      // Optionally logout user after password change for security
      setTimeout(() => {
        toast.info('Please login again with your new password', {
          position: 'top-right',
          autoClose: 3000,
        });

        // Logout user
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsAuthenticated(false);

        navigate('/login', { replace: true });
      }, 2000);
    } catch (error) {
      if (error.response?.data) {
        const errorData = error.response.data;
        const newErrors = {};

        Object.keys(errorData).forEach((key) => {
          if (Array.isArray(errorData[key])) {
            newErrors[key] = errorData[key][0];
          } else if (typeof errorData[key] === 'string') {
            newErrors[key] = errorData[key];
          }
        });

        setErrors(newErrors);

        if (errorData.old_password) {
          toast.error(errorData.old_password[0] || errorData.old_password, {
            position: 'top-right',
            autoClose: 3000,
          });
        } else if (errorData.detail) {
          toast.error(errorData.detail, {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          toast.error('Failed to change password. Please check the form.', {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      } else if (error.message === 'Network Error') {
        toast.error('Network error. Please check your connection.', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error('Failed to change password. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Change Password</h2>
        <p className={styles.subtitle}>Update your account password</p>

        <form onSubmit={handleSubmit}>
          {/* Current Password */}
          <div className="mb-3">
            <label htmlFor="old_password" className="form-label">
              Current Password <span className="text-danger">*</span>
            </label>
            <div className={styles.passwordGroup}>
              <input
                type={showOldPassword ? 'text' : 'password'}
                className={`form-control ${
                  errors.old_password ? 'is-invalid' : ''
                }`}
                id="old_password"
                name="old_password"
                value={formData.old_password}
                onChange={handleChange}
                placeholder="Enter your current password"
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowOldPassword(!showOldPassword)}
                disabled={isLoading}
                tabIndex={-1}
                aria-label="Toggle current password visibility"
              >
                <span className={styles.passwordIcon}>
                  {showOldPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </button>
            </div>
            {errors.old_password && (
              <div className="invalid-feedback d-block">
                {errors.old_password}
              </div>
            )}
          </div>

          {/* New Password */}
          <div className="mb-3">
            <label htmlFor="new_password" className="form-label">
              New Password <span className="text-danger">*</span>
            </label>
            <div className={styles.passwordGroup}>
              <input
                type={showNewPassword ? 'text' : 'password'}
                className={`form-control ${
                  errors.new_password ? 'is-invalid' : ''
                }`}
                id="new_password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                placeholder="Enter new password (min. 8 characters)"
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowNewPassword(!showNewPassword)}
                disabled={isLoading}
                tabIndex={-1}
                aria-label="Toggle new password visibility"
              >
                <span className={styles.passwordIcon}>
                  {showNewPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </button>
            </div>
            {errors.new_password && (
              <div className="invalid-feedback d-block">
                {errors.new_password}
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="mb-4">
            <label htmlFor="new_password2" className="form-label">
              Confirm New Password <span className="text-danger">*</span>
            </label>
            <div className={styles.passwordGroup}>
              <input
                type={showNewPassword2 ? 'text' : 'password'}
                className={`form-control ${
                  errors.new_password2 ? 'is-invalid' : ''
                }`}
                id="new_password2"
                name="new_password2"
                value={formData.new_password2}
                onChange={handleChange}
                placeholder="Re-enter your new password"
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowNewPassword2(!showNewPassword2)}
                disabled={isLoading}
                tabIndex={-1}
                aria-label="Toggle password confirmation visibility"
              >
                <span className={styles.passwordIcon}>
                  {showNewPassword2 ? '👁️' : '👁️‍🗨️'}
                </span>
              </button>
            </div>
            {errors.new_password2 && (
              <div className="invalid-feedback d-block">
                {errors.new_password2}
              </div>
            )}
          </div>

          {/* Password Requirements */}
          <div className={styles.passwordRequirements}>
            <h6>Password Requirements:</h6>
            <ul>
              <li
                className={
                  formData.new_password.length >= 8 ? styles.requirementMet : ''
                }
              >
                At least 8 characters long
              </li>
              <li>Not too common or similar to your personal information</li>
              <li>Not entirely numeric</li>
            </ul>
          </div>

          {/* Form Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.cancelButton}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Changing Password...
                </>
              ) : (
                'Change Password'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
