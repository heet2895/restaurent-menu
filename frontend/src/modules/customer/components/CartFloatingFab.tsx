import React from 'react';
import { useCustomerStore } from '../store/customerStore';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartFloatingFab: React.FC = () => {
  const { cart, setCartOpen, isCartOpen } = useCustomerStore();
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      {totalItems > 0 && !isCartOpen && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[90] bg-primary text-white px-8 py-4 rounded-full shadow-xl flex items-center gap-3 font-medium text-lg border border-gray-700"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          <ShoppingBag className="w-5 h-5 text-accent" />
          <span className="whitespace-nowrap">Create Your Meal</span>
          <span className="bg-accent flex-shrink-0 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-2">
            {totalItems}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
