import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'customer' | 'waiter' | 'receptionist' | null;

interface AuthState {
  role: Role;
  isAuthenticated: boolean;
  login: (role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: null,
      isAuthenticated: false,
      login: (role) => set({ role, isAuthenticated: true }),
      logout: () => set({ role: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
