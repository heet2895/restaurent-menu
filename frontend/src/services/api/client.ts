import axios from 'axios';
import { appConfig } from '../../config/appConfig';

export const apiClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors
apiClient.interceptors.request.use(
  (config) => {
    // Inject token if needed
    // const token = localStorage.getItem('token');
    // if (token) { config.headers.Authorization = `Bearer ${token}`; }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (e.g., 401 Unauthorized -> logout)
    return Promise.reject(error);
  }
);
