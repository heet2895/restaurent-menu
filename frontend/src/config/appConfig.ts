import { env } from './env';

export const appConfig = {
  apiBaseUrl: env.API_BASE_URL,
  features: {
    enableMockApi: true, // Used to toggle between real API and mock services
    enableThemeToggle: false,
  },
  defaultRole: 'customer',
};
