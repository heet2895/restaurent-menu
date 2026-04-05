import React from 'react';
import { useCustomerStore } from '../store/customerStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, ChefHat } from 'lucide-react';

export const CustomerToast: React.FC = () => {
  const { lastAddedItem, orderStatus } = useCustomerStore();

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {lastAddedItem && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="bg-primary/95 backdrop-blur text-white px-6 py-3 rounded-full shadow-lg border border-white/10 flex items-center gap-3"
          >
            <CheckCircle2 className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Added <span className="font-semibold text-accent">{lastAddedItem.name}</span> to your meal ✨</span>
          </motion.div>
        )}
        
        {/* Live Kitchen Feedbacks based on mock order status */}
        {orderStatus === 'confirmed' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white/95 backdrop-blur text-primary px-6 py-3 rounded-full shadow-lg border border-gray-100 flex items-center gap-3"
          >
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Order confirmed! Waiting for kitchen.</span>
          </motion.div>
        )}

        {orderStatus === 'preparing' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-accent/95 backdrop-blur text-white px-6 py-3 rounded-full shadow-lg border border-white/10 flex items-center gap-3"
          >
            <ChefHat className="w-4 h-4" />
            <span className="text-sm font-medium">Your chef has started cooking 🧑‍🍳</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
