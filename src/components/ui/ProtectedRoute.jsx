import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api';
import Spinner from './Spinner';

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const location = useLocation();
  const {
    setIsAuthenticated,
    setUsername,
    refreshUsername,
    isLoading: authContextLoading,
  } = useContext(AuthContext);

  useEffect(function () {
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

        // Update AuthContext after successful token refresh
        setIsAuthenticated(true);

        // Refresh username from backend using AuthContext function
        await refreshUsername();

        setIsAuthorized(true);
        console.log('Token refreshed successfully');
      } else {
        setIsAuthorized(false);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('Token refresh failed:', error);
      setIsAuthorized(false);
      setIsAuthenticated(false);
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
        console.log('Token expired, attempting refresh...');
        await refreshToken();
      } else {
        console.log('Token valid, authorizing access');
        setIsAuthorized(true);
        setIsAuthenticated(true);

        // AuthContext's handleAuth will already set the username,
        // but we can call refreshUsername to ensure it's current
        await refreshUsername();
      }
    } catch (error) {
      console.log('Token validation failed:', error);
      setIsAuthorized(false);
      setIsAuthenticated(false);
    }
  }

  // Show spinner while checking authorization or if AuthContext is still loading
  if (isAuthorized === null || authContextLoading) {
    return <Spinner />;
  }

  return isAuthorized ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
