import React, { useMemo, useRef } from 'react';
import { useCustomerStore } from '../store/customerStore';
import { mockCategories, mockDishes } from '../../../services/mock/mockDishes';
import { DishCard } from '../components/DishCard';
import { EmptyState } from '../../../components/shared/EmptyState';
import { UtensilsCrossed } from 'lucide-react';
import { motion } from 'framer-motion';

export const MenuTabView: React.FC = () => {
  const { searchQuery, selectedCategory, setSelectedCategory } = useCustomerStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter Logic
  const filteredDishes = useMemo(() => {
    return mockDishes.filter(dish => {
      const matchCategory = selectedCategory === 'All' || dish.category === selectedCategory;
      const matchSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col md:flex-row gap-8 h-full"
    >
      {/* Categories (Left Pane Desktop / Top Pills Mobile) */}
      <div className="md:w-64 flex-shrink-0">
        <div className="sticky top-32">
          <h2 className="hidden md:block font-serif text-xl text-primary font-bold mb-6">Menu</h2>
          <div className="flex flex-nowrap md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-1 pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 snap-x">
            {mockCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap snap-center px-4 py-2.5 md:py-3 md:px-5 rounded-full md:rounded-xl text-sm font-medium transition-all text-left shrink-0
                  ${selectedCategory === cat 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white/50 text-gray-600 hover:bg-white hover:text-primary'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dishes (Right Pane) */}
      <div className="flex-1 pb-28" ref={scrollContainerRef}>
        {/* Search Scope Context */}
        {searchQuery && (
          <div className="mb-6 bg-white/60 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
            <p className="text-sm text-primary">
              Showing results for <span className="font-semibold px-1">"{searchQuery}"</span> 
              {selectedCategory !== 'All' && <span> in <span className="font-semibold text-accent">{selectedCategory}</span></span>}
            </p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-serif text-2xl font-bold text-primary mb-2 flex items-center gap-3">
             {selectedCategory}
             <div className="h-px bg-gray-200 flex-1 ml-4 hidden sm:block"></div>
          </h3>
        </div>

        {filteredDishes.length === 0 ? (
          <EmptyState 
            icon={UtensilsCrossed}
            title="We couldn't find any dishes."
            description="Try adjusting your search or switching categories."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDishes.map(dish => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
