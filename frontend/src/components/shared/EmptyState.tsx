import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-full w-full">
      {Icon && <Icon className="w-16 h-16 text-gray-300 mb-4" />}
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      {description && <p className="text-lightText mb-6 max-w-sm">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};
