import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api';

export const AuthContext = createContext(false);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null); // ✅ NEW: Store complete user object
  const [isLoading, setIsLoading] = useState(true);

  // ✅ NEW: Fetch complete user profile from backend
  const fetchUserProfile = async () => {
    try {
      console.log('🔄 Fetching user profile from backend...');
      const response = await api.get('account/profile/'); // or your profile endpoint
      console.log('✅ User profile fetched:', response.data);
      console.log('📧 Email verified:', response.data.email_verified);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to fetch user profile:', error);
      return null;
    }
  };

  // Fetch username from backend API (LEGACY - keeping for compatibility)
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
    const storedUser = localStorage.getItem('user'); // ✅ NEW: Get stored user data

    console.log('AuthContext - Checking auth...');
    console.log('Token exists:', !!token);
    console.log('Stored user exists:', !!storedUser);

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

          // ✅ NEW: Load user data from localStorage first (faster)
          if (storedUser) {
            try {
              const userData = JSON.parse(storedUser);
              console.log('✅ Loaded user from localStorage:', userData);
              setUser(userData);
              setUsername(userData.username);

              // ✅ Then fetch fresh data in background to ensure it's up-to-date
              fetchUserProfile().then((freshUserData) => {
                if (freshUserData) {
                  console.log('✅ Updated with fresh user data');
                  setUser(freshUserData);
                  setUsername(freshUserData.username);
                  localStorage.setItem('user', JSON.stringify(freshUserData));
                }
              });
            } catch (error) {
              console.error('❌ Error parsing stored user:', error);
              // Fall back to fetching from backend
              const userData = await fetchUserProfile();
              if (userData) {
                setUser(userData);
                setUsername(userData.username);
                localStorage.setItem('user', JSON.stringify(userData));
              }
            }
          } else {
            // ✅ No stored user, fetch from backend
            console.log('📡 No stored user, fetching from backend...');
            const userData = await fetchUserProfile();
            if (userData) {
              setUser(userData);
              setUsername(userData.username);
              localStorage.setItem('user', JSON.stringify(userData));
            } else {
              // Final fallback to old method
              const backendUsername = await fetchUsernameFromBackend();
              if (backendUsername) {
                console.log('Setting username from backend:', backendUsername);
                setUsername(backendUsername);
              } else if (decoded.username) {
                console.log('Setting username from token:', decoded.username);
                setUsername(decoded.username);
              } else {
                console.log('Using user_id as fallback:', decoded.user_id);
                setUsername(`User ${decoded.user_id}`);
              }
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

  // ✅ UPDATED: Clear authentication data including user object
  const clearAuth = () => {
    setIsAuthenticated(false);
    setUsername('');
    setUserId(null);
    setUser(null); // ✅ NEW: Clear user object
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user'); // ✅ NEW: Clear stored user data
  };

  // ✅ NEW: Refresh user profile (useful after email verification)
  const refreshUserProfile = async () => {
    if (isAuthenticated) {
      console.log('🔄 Refreshing user profile...');
      const userData = await fetchUserProfile();
      if (userData) {
        setUser(userData);
        setUsername(userData.username);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('✅ User profile refreshed');
        return true;
      }
    }
    return false;
  };

  // Refresh username from backend (LEGACY - keeping for compatibility)
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
    // Clean up old token keys from previous implementation
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
    user, // ✅ NEW: Expose user object
    setUser, // ✅ NEW: Expose setUser function
    handleAuth,
    refreshUsername,
    refreshUserProfile, // ✅ NEW: Expose refresh function
    isLoading,
  };

  console.log('AuthContext current state:', {
    isAuthenticated,
    username,
    userId,
    user, // ✅ NEW: Log user object
    email_verified: user?.email_verified, // ✅ NEW: Log email_verified status
    isLoading,
  });

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
