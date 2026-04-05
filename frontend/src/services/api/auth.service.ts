// import { apiClient } from './client';
// import { API_ENDPOINTS } from './endpoints';
import type { Role } from '../../modules/auth/store/authStore';

export const authService = {
  login: async (_username: string, role: Role) => {
    // Example of calling real API
    // const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { username, role });
    // return response.data;

    // Simulated login for mock purposes
    return new Promise<{ role: Role, token: string }>((resolve) => {
      setTimeout(() => {
        resolve({ role, token: 'mock-jwt-token' });
      }, 500);
    });
  },
  
  logout: async () => {
    // await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    return Promise.resolve();
  }
};
