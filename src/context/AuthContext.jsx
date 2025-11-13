import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api';

export const AuthContext = createContext(false);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch username from backend API
  const fetchUsernameFromBackend = async () => {
    try {
      const response = await api.get('get_username');
      console.log('Fetched username from backend:', response.data.username);
      return response.data.username;
    } catch (error) {
      console.error('Failed to fetch username from backend:', error);
      return null;
    }
  };

  const handleAuth = async () => {
    const token = localStorage.getItem('access');
    console.log('AuthContext - Checking auth...');
    console.log('Token exists:', !!token);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expiry_date = decoded.exp;
        const current_time = Date.now() / 1000;

        console.log('Token decoded:', decoded);
        console.log('Token expired:', expiry_date < current_time);

        if (expiry_date >= current_time) {
          setIsAuthenticated(true);
          setUserId(decoded.user_id);

          // Step 1: Try to fetch username from backend
          const backendUsername = await fetchUsernameFromBackend();
          if (backendUsername) {
            console.log('Setting username from backend:', backendUsername);
            setUsername(backendUsername);
          } else {
            // Step 2: Fallback to token username if backend fails
            if (decoded.username) {
              console.log(
                'Setting username from token (backend failed):',
                decoded.username
              );
              setUsername(decoded.username);
            } else {
              // Step 3: Final fallback to user_id
              console.log('Using user_id as fallback:', decoded.user_id);
              setUsername(`User ${decoded.user_id}`);
            }
          }
        } else {
          // Token expired
          console.log('Token expired, clearing auth');
          clearAuth();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        clearAuth();
      }
    } else {
      console.log('No token found');
      clearAuth();
    }

    setIsLoading(false);
  };

  // Clear authentication data
  const clearAuth = () => {
    setIsAuthenticated(false);
    setUsername('');
    setUserId(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  };

  // Refresh username from backend (can be called when username might have changed)
  const refreshUsername = async () => {
    if (isAuthenticated) {
      const backendUsername = await fetchUsernameFromBackend();
      if (backendUsername) {
        setUsername(backendUsername);
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    // 🆕 Clean up old token keys from previous implementation
    // This ensures users with old 'access_token' keys migrate to 'access'
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    handleAuth();
  }, []);

  const authValue = {
    isAuthenticated,
    setIsAuthenticated,
    username,
    setUsername,
    userId,
    setUserId,
    handleAuth,
    refreshUsername,
    isLoading,
  };

  console.log('AuthContext current state:', {
    isAuthenticated,
    username,
    userId,
    isLoading,
  });

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
