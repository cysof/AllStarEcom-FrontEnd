import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    phone: '',
    city: '',
    state: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const navigate = useNavigate();
  const {
    setIsAuthenticated,
    setUsername: setAuthUsername,
    setUser,
  } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.password2) {
      newErrors.password2 = 'Please confirm your password';
    } else if (formData.password !== formData.password2) {
      newErrors.password2 = 'Passwords do not match';
    }

    if (
      formData.phone &&
      !/^\+?1?\d{9,15}$/.test(formData.phone.replace(/\s/g, ''))
    ) {
      newErrors.phone =
        'Please enter a valid phone number with country code (e.g., +1234567890)';
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
      console.log('📝 Registering user...');
      const response = await api.post('/account/register/', formData);

      console.log('✅ Registration response:', response.data);
      console.log('👤 User data:', response.data.user);
      console.log('📧 Email verified:', response.data.user?.email_verified);

      // Store tokens
      localStorage.setItem('access', response.data.tokens.access);
      localStorage.setItem('refresh', response.data.tokens.refresh);

      // ✅ CRITICAL FIX: Store complete user data
      const userData = response.data.user;
      localStorage.setItem('user', JSON.stringify(userData));

      console.log('💾 Tokens and user data stored in localStorage');

      // Update auth context
      setIsAuthenticated(true);
      setAuthUsername(userData.username);

      // ✅ NEW: Set the complete user object (includes email_verified: false)
      if (setUser) {
        setUser(userData);
      }

      console.log('✅ AuthContext updated with user data');

      // Show success message with email verification reminder
      toast.success(
        <div>
          <strong>Registration successful!</strong>
          <p>Please check your email to verify your account.</p>
        </div>,
        {
          position: 'top-right',
          autoClose: 5000,
        }
      );

      // ✅ Show info about email verification
      toast.info(
        `Verification email sent to ${userData.email}. Please check your inbox.`,
        {
          position: 'top-right',
          autoClose: 7000,
        }
      );

      console.log('🔄 Redirecting to home...');

      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
    } catch (error) {
      console.error('❌ Registration error:', error);
      console.error('❌ Error response:', error.response?.data);

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

        if (errorData.username) {
          toast.error(errorData.username[0] || errorData.username, {
            position: 'top-right',
            autoClose: 3000,
          });
        } else if (errorData.email) {
          toast.error(errorData.email[0] || errorData.email, {
            position: 'top-right',
            autoClose: 3000,
          });
        } else if (errorData.detail) {
          toast.error(errorData.detail, {
            position: 'top-right',
            autoClose: 3000,
          });
        } else {
          toast.error(
            'Registration failed. Please check the form and try again.',
            {
              position: 'top-right',
              autoClose: 3000,
            }
          );
        }
      } else if (error.message === 'Network Error') {
        toast.error('Network error. Please check your connection.', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error('Registration failed. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Account</h2>
        <p className={styles.subtitle}>Join us today and start shopping!</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              disabled={isLoading}
              autoComplete="username"
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              disabled={isLoading}
              autoComplete="email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.first_name ? 'is-invalid' : ''
                }`}
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="John"
                disabled={isLoading}
                autoComplete="given-name"
              />
              {errors.first_name && (
                <div className="invalid-feedback">{errors.first_name}</div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.last_name ? 'is-invalid' : ''
                }`}
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Doe"
                disabled={isLoading}
                autoComplete="family-name"
              />
              {errors.last_name && (
                <div className="invalid-feedback">{errors.last_name}</div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <div className={styles.passwordGroup}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password (min. 8 characters)"
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                <span className={styles.passwordIcon}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </button>
            </div>
            {errors.password && (
              <div className="invalid-feedback d-block">{errors.password}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password2" className="form-label">
              Confirm Password <span className="text-danger">*</span>
            </label>
            <div className={styles.passwordGroup}>
              <input
                type={showPassword2 ? 'text' : 'password'}
                className={`form-control ${
                  errors.password2 ? 'is-invalid' : ''
                }`}
                id="password2"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                placeholder="Re-enter your password"
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword2(!showPassword2)}
                disabled={isLoading}
                tabIndex={-1}
                aria-label="Toggle password confirmation visibility"
              >
                <span className={styles.passwordIcon}>
                  {showPassword2 ? '👁️' : '👁️‍🗨️'}
                </span>
              </button>
            </div>
            {errors.password2 && (
              <div className="invalid-feedback d-block">{errors.password2}</div>
            )}
          </div>

          <div className={styles.divider}>
            <span>Optional Information</span>
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1234567890"
              disabled={isLoading}
              autoComplete="tel"
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
            <small className="form-text text-muted">
              Include country code (e.g., +1 for US)
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Street Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main Street"
              disabled={isLoading}
              autoComplete="street-address"
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="New York"
                disabled={isLoading}
                autoComplete="address-level2"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="state" className="form-label">
                State/Province
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="NY"
                disabled={isLoading}
                autoComplete="address-level1"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 mt-3"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
