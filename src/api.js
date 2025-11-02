import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Base URL for API
export const BASE_URL = 'https://allstarfashion-yb2ng.sevalla.app';
// export const BASE_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Add token to requests if available and valid
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');

    if (token) {
      const decoded = jwtDecode(token);
      const expiryDate = decoded.exp;
      const currentTime = Date.now() / 1000;

      if (expiryDate > currentTime) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
