import React from 'react';
import { useCustomerStore } from '../store/customerStore';
import { EmptyState } from '../../../components/shared/EmptyState';
import { Utensils, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const OrderTabView: React.FC = () => {
  const { cart, orderStatus, setOrderStatus, setActiveTab } = useCustomerStore();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% dummy tax
  const total = subtotal + tax;

  const handleConfirmExperience = () => {
    // Initiate mock order lifecycle
    setOrderStatus('pending');
    
    // Simulate kitchen status updates
    setTimeout(() => {
      setOrderStatus('confirmed');
    }, 2000);

    setTimeout(() => {
      setOrderStatus('preparing');
    }, 6000);
  };

  // Success State View
  if (orderStatus) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto mt-12 bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-primary mb-4">Your meal is being prepared 🍽️</h2>
        <p className="text-lightText mb-10 max-w-md mx-auto">
          We have received your order and the kitchen is working on it. Sit back, relax, and soak in the ambiance.
        </p>
        
        <div className="bg-background/50 rounded-2xl p-6 text-left border border-gray-50">
           <h4 className="font-medium text-primary mb-4 border-b border-gray-200 pb-2">Order Summary</h4>
           <div className="space-y-3">
             {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantity}x {item.name}</span>
                  <span className="font-medium text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
             ))}
             <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between font-semibold">
                <span className="text-primary">Total Amount</span>
                <span className="text-accent">${total.toFixed(2)}</span>
             </div>
           </div>
        </div>

        <button 
          onClick={() => setActiveTab('menu')}
          className="mt-8 text-primary font-medium hover:text-accent transition-colors underline-offset-4 hover:underline"
        >
          Return to Menu
        </button>
      </motion.div>
    );
  }

  // Review & Confirm View
  if (cart.length === 0) {
    return (
      <EmptyState 
        icon={Utensils}
        title="Your meal is waiting to be crafted."
        description="Head over to the menu to explore our culinary options."
        action={
          <button 
            onClick={() => setActiveTab('menu')}
            className="mt-6 bg-primary text-white px-8 py-3 rounded-full hover:bg-opacity-90 font-medium transition-colors"
          >
            Explore Menu
          </button>
        }
      />
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-8">
        <h2 className="font-serif text-2xl font-bold text-primary mb-2">Review Your Experience</h2>
        <p className="text-lightText text-sm">Review your selected items before confirming.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Items List */}
        <div className="p-6 md:p-8 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl" />
              <div className="flex-1">
                <h4 className="font-medium text-primary line-clamp-1">{item.name}</h4>
                <p className="text-lightText text-sm mt-1">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-primary">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Totals & Invoice Section */}
        <div className="bg-gray-50/50 p-6 md:p-8 border-t border-gray-100">
           <div className="space-y-4 max-w-sm ml-auto">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes & Fees</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="w-full h-px bg-gray-200 my-2" />
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-lg font-bold text-primary">Final Total</span>
                <span className="text-2xl font-bold text-accent">${total.toFixed(2)}</span>
              </div>
           </div>

           <div className="mt-8 flex justify-end">
             <button 
                onClick={handleConfirmExperience}
                className="bg-primary text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-primary/95 transition-all shadow-md active:scale-95"
             >
               Confirm Your Experience
             </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};
