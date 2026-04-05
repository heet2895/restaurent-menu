import React from 'react';
import { EmptyState } from '../../../components/shared/EmptyState';

export const WaiterDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-primary">Active Orders</h2>
      <EmptyState 
        title="Order Queue" 
        description="Incoming orders for verification will appear here."
      />
    </div>
  );
};
