import React from 'react';
import { EmptyState } from '../../../components/shared/EmptyState';

export const ReceptionistDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-primary">Billing & Payments</h2>
      <EmptyState 
        title="Payment Terminals" 
        description="Completed orders ready for billing will be handled here."
      />
    </div>
  );
};
