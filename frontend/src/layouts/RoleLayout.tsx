import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../modules/auth/store/authStore';
import type { Role } from '../modules/auth/store/authStore';

interface RoleLayoutProps {
  allowedRole: Role;
}

export const RoleLayout: React.FC<RoleLayoutProps> = ({ allowedRole }) => {
  const { role, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex flex-col h-full w-full">
      {/* Role-specific Navbars can be injected here based on allowedRole */}
      <header className="py-4 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-xl font-bold capitalize text-primary">{allowedRole} Dashboard</h1>
      </header>
      <div className="flex-1 py-6">
        <Outlet />
      </div>
    </div>
  );
};
