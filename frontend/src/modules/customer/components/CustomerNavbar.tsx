import React from 'react';
import { useCustomerStore } from '../store/customerStore';
import type { TabType } from '../store/customerStore';

export const CustomerNavbar: React.FC = () => {
  const { activeTab, setActiveTab } = useCustomerStore();

  const tabs: { id: TabType; label: string }[] = [
    { id: 'menu', label: 'Menu' },
    { id: 'order', label: 'Your Order' },
    { id: 'photos', label: 'Photos' },
    { id: 'reviews', label: 'Reviews' },
  ];

  return (
    <nav className="sticky top-[73px] md:top-[76px] z-30 bg-background/90 backdrop-blur border-b border-gray-200 overflow-x-auto scrollbar-hide">
      <div className="max-w-5xl mx-auto flex px-4 md:px-8">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-6 py-4 text-sm font-medium transition-colors relative 
                ${isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-900'}
              `}
            >
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-t-full shadow-[0_-2px_8px_rgba(212,175,55,0.4)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
