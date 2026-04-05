export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  MENU: {
    GET_API: '/menu',
    CATEGORIES: '/menu/categories',
  },
  ORDERS: {
    CREATE: '/orders',
    UPDATE_STATUS: (id: string) => `/orders/${id}/status`,
    LIST_WAITERS: '/orders/waiter',
    LIST_RECEPTION: '/orders/receptionist',
  },
  PAYMENTS: {
    PROCESS: '/payments/process',
  }
};
