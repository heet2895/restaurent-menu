import React from 'react';
import { useCustomerStore } from '../store/customerStore';
import type { Dish } from '../store/customerStore';
import { motion } from 'framer-motion';
import { Plus, Image as ImageIcon, Star } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
}

export const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const { addToCart, setActiveTab, setFocusDishId } = useCustomerStore();

  const handleViewGallery = () => {
    setFocusDishId(dish.id);
    setActiveTab('photos');
  };

  const handleSeeReviews = () => {
    setFocusDishId(dish.id);
    setActiveTab('reviews');
  };

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="bg-white/80 backdrop-blur-sm border border-white/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full group overflow-hidden cursor-pointer" onClick={handleViewGallery}>
        <img 
          src={dish.image} 
          alt={dish.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
          <ImageIcon className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg font-semibold text-primary leading-tight line-clamp-2 pr-2">
            {dish.name}
          </h3>
          <span className="font-semibold text-accent whitespace-nowrap">
            ${dish.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-sm text-lightText line-clamp-2 mb-4 flex-1">
          {dish.description}
        </p>

        {/* Action Row */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <button 
            onClick={handleSeeReviews}
            className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-accent transition-colors"
          >
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            <span>{dish.rating} (Reviews)</span>
          </button>

          <button 
            onClick={() => addToCart(dish)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Craft Plate</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
