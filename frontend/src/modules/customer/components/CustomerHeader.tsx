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
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm py-4 px-4 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:grid md:grid-cols-3 gap-4 md:items-center">
        {/* Branding & QR Context */}
        <div className="flex justify-between md:justify-start items-center gap-4 shrink-0">
          <h1 className="font-serif text-2xl md:text-2xl font-semibold text-primary truncate">YG's Hotel</h1>
          <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full shrink-0">
            {tableNumber}
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center w-full md:col-span-1">
          <div className="relative w-full max-w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search for your favorite dish..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full py-3 pl-12 pr-12 text-base focus:outline-none focus:ring-2 focus:ring-accent transition-all text-primary placeholder-gray-400 shadow-sm"
            />
            {localSearch && (
              <button 
                onClick={() => setLocalSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors h-10 w-10 flex items-center justify-center rounded-full active:bg-gray-100"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        
        {/* Right side spacer for perfect centering on desktop */}
        <div className="hidden md:block"></div>
      </div>
    </header>
  );
};
