import React from 'react';
import { EmptyState } from '../../../components/shared/EmptyState';

export const CustomerDashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-primary">Menu</h2>
      <EmptyState 
        title="Restaurant Menu" 
        description="Menu browsing and cart features will be implemented here."
      />
    </div>
  );
};
