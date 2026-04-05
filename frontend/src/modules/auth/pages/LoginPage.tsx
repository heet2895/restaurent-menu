import React from 'react';
import { useAuthStore } from '../store/authStore';
import type { Role } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleLogin = (role: Role) => {
    login(role);
    if (role === 'customer') navigate('/customer');
    if (role === 'waiter') navigate('/waiter');
    if (role === 'receptionist') navigate('/receptionist');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-primary mb-6">System Login</h2>
        <div className="space-y-4">
          <button 
            onClick={() => handleLogin('customer')}
            className="w-full py-3 px-4 bg-primary text-white rounded font-medium hover:bg-opacity-90 transition-all"
          >
            Login as Customer
          </button>
          <button 
            onClick={() => handleLogin('waiter')}
            className="w-full py-3 px-4 bg-accent text-white rounded font-medium hover:bg-opacity-90 transition-all"
          >
            Login as Waiter
          </button>
          <button 
            onClick={() => handleLogin('receptionist')}
            className="w-full py-3 px-4 outline outline-2 outline-primary text-primary rounded font-medium hover:bg-gray-50 transition-all"
          >
            Login as Receptionist
          </button>
        </div>
      </div>
    </div>
  );
};
