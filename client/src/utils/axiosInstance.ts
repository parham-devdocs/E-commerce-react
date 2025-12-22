// lib/axiosInstance.ts  (or api/axiosInstance.js)

import axios from 'axios';

// Create instance
const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Example: Add auth token from localStorage
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Return successful response as-is
    return response;
  },
  (error) => {
    // Handle common errors (e.g., 401 = token expired)
    if (error.response?.status === 401) {
      // Redirect to login, clear tokens, etc.
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;