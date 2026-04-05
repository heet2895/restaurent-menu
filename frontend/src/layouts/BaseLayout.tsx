import React from 'react';
import { Outlet } from 'react-router-dom';

export const BaseLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-primary font-sans flex flex-col">
      <main className="flex-1 flex flex-col pt-safe px-4 pb-16 md:px-8">
        <Outlet />
      </main>
      {/* Shared Footer or general App boundaries can go here */}
    </div>
  );
};
