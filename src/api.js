import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Base URL for API
export const BASE_URL = 'https://api.allstarfashionglobal.com';
// export const BASE_URL = 'http://localhost:8000';

// Create axios instance with default headers
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests if available and valid
api.interceptors.request.use(
  (config) => {
    console.log('🔍 Interceptor - Request to:', config.url);

    // ✅ ADD TRAILING SLASH FOR DJANGO
    if (config.url && !config.url.endsWith('/') && !config.url.includes('?')) {
      config.url = config.url + '/';
      console.log('✅ Added trailing slash:', config.url);
    }

    // Ensure Content-Type is always set
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    // Check both possible keys for migration
    const token =
      localStorage.getItem('access') || localStorage.getItem('access_token');

    console.log('🔍 Token found:', !!token);
    console.log(
      '🔍 Token value (first 20 chars):',
      token ? token.substring(0, 20) + '...' : 'null'
    );

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expiryDate = decoded.exp;
        const currentTime = Date.now() / 1000;

        console.log(
          '🔍 Token expiry:',
          new Date(expiryDate * 1000).toISOString()
        );
        console.log(
          '🔍 Current time:',
          new Date(currentTime * 1000).toISOString()
        );
        console.log('🔍 Token expired?', expiryDate <= currentTime);

        if (expiryDate > currentTime) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log('✅ Authorization header added');
        } else {
          console.log('❌ Token expired, not adding to headers');
          // Clean up expired tokens
          localStorage.removeItem('access');
          localStorage.removeItem('access_token');
        }
      } catch (error) {
        console.error('❌ Error decoding token:', error);
        // Clean up invalid tokens
        localStorage.removeItem('access');
        localStorage.removeItem('access_token');
      }
    } else {
      console.log('❌ No token found in localStorage');
    }

    console.log('🔍 Final headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error logging
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('🚫 401 Unauthorized - Token may be invalid or expired');
      console.error('Response data:', error.response.data);
      // Clean up tokens on 401
      localStorage.removeItem('access');
      localStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  }
);

export default api;
