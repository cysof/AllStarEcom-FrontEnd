import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import './LoginPage.css';
import api from '../../api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation
  const navigate = useNavigate()


  const { setIsAuthenticated, setUsername: setAuthUsername } =
    useContext(AuthContext);

  // Check if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  // Clear errors when user types
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors((prev) => ({ ...prev, username: '' }));
    }
    if (apiError) setApiError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
    if (apiError) setApiError('');
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  // Fetch username from backend after successful login
  const fetchUsername = async () => {
    try {
      const response = await api.get('get_username');
      return response.data.username;
    } catch (error) {
      console.error('Failed to fetch username:', error);
      // Fallback to the username used for login
      return username.trim();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setApiError('');

    try {
      // Step 1: Get authentication tokens
      const response = await api.post('token/', {
        username: username.trim(),
        password: password,
      });

      // Store tokens in localStorage (but NOT username)
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);


      const from = location.state.from.pathname || "/";
      navigate(from, {replace: true})

      // Step 2: Fetch actual username from backend
      const actualUsername = await fetchUsername();

      // Step 3: Update auth context with the actual username
      setIsAuthenticated(true);
      setAuthUsername(actualUsername);

      // Show success toast
      toast.success('Login successful! Redirecting...', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Redirect after a short delay to show the toast
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      // Display error message
      if (error.response?.status === 401) {
        setApiError('Invalid username or password');
        toast.error('Invalid username or password', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else if (error.response?.data?.detail) {
        setApiError(error.response.data.detail);
        toast.error(error.response.data.detail, {
          position: 'top-right',
          autoClose: 3000,
        });
      } else if (error.response?.data?.non_field_errors) {
        setApiError(error.response.data.non_field_errors[0]);
        toast.error(error.response.data.non_field_errors[0], {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        setApiError('Login failed. Please try again.');
        toast.error('Login failed. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container my-5">
      <div className="login-card shadow">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please login to your account</p>

        {/* Display API Error */}
        {apiError && (
          <div className="alert alert-danger" role="alert">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              disabled={isLoading}
              autoComplete="username"
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                <span className="password-icon">
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </button>
            </div>
            {errors.password && (
              <div className="invalid-feedback d-block">{errors.password}</div>
            )}
          </div>

          {/* Submit Button */}
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
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="login-footer">
          <p>
            <a href="/forgot-password">Forgot Password?</a>
          </p>
          <p>
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
