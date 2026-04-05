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
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};
