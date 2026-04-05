import React from 'react';
import { useCustomerStore } from '../store/customerStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

export const CartMiniDrawer: React.FC = () => {
  const { cart, isCartOpen, setCartOpen, updateQuantity, clearCart, setActiveTab } = useCustomerStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setCartOpen(false);
    setActiveTab('order');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your meal?')) {
      clearCart();
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-background rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 flex flex-col md:max-w-md md:left-auto md:right-4 md:bottom-4 md:rounded-2xl border border-gray-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/50 rounded-t-3xl md:rounded-t-2xl">
              <div>
                <h2 className="font-serif text-xl font-semibold text-primary">Your Meal</h2>
                <p className="text-sm text-lightText">{totalItems} items</p>
              </div>
              <div className="flex items-center gap-4">
                {totalItems > 0 && (
                  <button onClick={handleClearCart} className="text-gray-400 hover:text-error transition-colors p-2">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <button onClick={() => setCartOpen(false)} className="bg-gray-100 p-2 rounded-full text-primary hover:bg-gray-200 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-lightText font-medium">Your meal is waiting to be crafted.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shadow-sm" />
                    <div className="flex-1">
                      <h4 className="font-medium text-primary text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-accent font-semibold">${item.price.toFixed(2)}</p>
                    </div>
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-white border border-gray-100 px-2 py-1 rounded-full shadow-sm">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-gray-500 hover:text-error">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-4 text-center font-medium text-primary text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-gray-500 hover:text-success">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-white border-t border-gray-100 md:rounded-b-2xl">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lightText font-medium">Subtotal</span>
                <span className="text-xl font-bold text-primary">${subtotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full bg-primary text-white py-4 rounded-xl font-medium text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(30,41,59,0.3)]"
              >
                Review & Confirm
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
