import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts & Shared
import { BaseLayout } from '../layouts/BaseLayout';
import { RoleLayout } from '../layouts/RoleLayout';
import { ErrorBoundary } from '../components/shared/ErrorBoundary';

// Auth module
import { ProtectedRoute } from '../modules/auth/components/ProtectedRoute';
import { LoginPage } from '../modules/auth/pages/LoginPage';

// Domain pages
import { CustomerDashboard } from '../modules/customer/pages/CustomerDashboard';
import { WaiterDashboard } from '../modules/waiter/pages/WaiterDashboard';
import { ReceptionistDashboard } from '../modules/receptionist/pages/ReceptionistDashboard';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<BaseLayout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="unauthorized" element={<div className="p-8 text-center bg-background min-h-screen text-error font-bold">Unauthorized Access</div>} />
            
            {/* Protected Role-Based Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="customer" element={<RoleLayout allowedRole="customer" />}>
                <Route index element={<CustomerDashboard />} />
              </Route>
              
              <Route path="waiter" element={<RoleLayout allowedRole="waiter" />}>
                <Route index element={<WaiterDashboard />} />
              </Route>

              <Route path="receptionist" element={<RoleLayout allowedRole="receptionist" />}>
                <Route index element={<ReceptionistDashboard />} />
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
