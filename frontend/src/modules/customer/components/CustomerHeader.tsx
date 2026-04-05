import React, { useState, useEffect } from 'react';
import { useCustomerStore } from '../store/customerStore';
import { Search, X } from 'lucide-react';

export const CustomerHeader: React.FC = () => {
  const { tableNumber, searchQuery, setSearchQuery } = useCustomerStore();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, setSearchQuery]);

  // Sync back if changed globally
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm py-4 px-6 md:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Branding & QR Context */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <h1 className="font-serif text-2xl font-semibold text-primary">YG's Hotel</h1>
          <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full md:ml-4">
            {tableNumber}
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search for your favorite dish..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-full py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all text-primary placeholder-gray-400"
          />
          {localSearch && (
            <button 
              onClick={() => setLocalSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
