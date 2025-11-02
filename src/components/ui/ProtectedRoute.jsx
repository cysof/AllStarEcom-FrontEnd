import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import api from '../../api';
import Spinner from './Spinner';

const ProtectedRoute = ({ children, requireEmailVerification = false }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(null);
  const location = useLocation();
  const {
    setIsAuthenticated,
    setUsername,
    refreshUsername,
    isLoading: authContextLoading,
  } = useContext(AuthContext);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  async function refreshToken() {
    const refreshToken = localStorage.getItem('refresh');
    try {
      const res = await api.post('/token/refresh/', {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        localStorage.setItem('access', res.data.access);
        setIsAuthenticated(true);
        await refreshUsername();
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthorized(false);
      setIsAuthenticated(false);
    }
  }

  async function checkEmailVerification() {
    try {
      const response = await api.get('/account/profile/');
      setIsEmailVerified(response.data.email_verified);
      return response.data.email_verified;
    } catch (error) {
      return false;
    }
  }

  async function auth() {
    const token = localStorage.getItem('access');
    if (!token) {
      setIsAuthorized(false);
      setIsAuthenticated(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const expiry_date = decoded.exp;
      const current_time = Date.now() / 1000;

      if (current_time > expiry_date) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
        setIsAuthenticated(true);
        await refreshUsername();

        if (requireEmailVerification) {
          await checkEmailVerification();
        }
      }
    } catch (error) {
      setIsAuthorized(false);
      setIsAuthenticated(false);
    }
  }

  if (isAuthorized === null || authContextLoading) {
    return <Spinner loading={true} />;
  }

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireEmailVerification && isEmailVerified === false) {
    toast.warning(
      'Please verify your email address to proceed with checkout.',
      {
        position: 'top-right',
        autoClose: 4000,
      }
    );
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
