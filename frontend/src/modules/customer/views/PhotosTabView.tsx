import React, { useState } from 'react';
import { useCustomerStore } from '../store/customerStore';
import { mockDishes } from '../../../services/mock/mockDishes';
import { EmptyState } from '../../../components/shared/EmptyState';
import { Camera, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PhotosTabView: React.FC = () => {
  const { focusDishId } = useCustomerStore();
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // If focusDishId exists, we might want to ensure it's scrolled into view or glowed.
  // We will just map all images.
  const imagesWithRef = mockDishes.map(dish => ({
    id: dish.id,
    url: dish.image,
    name: dish.name
  }));

  if (imagesWithRef.length === 0) {
    return (
      <EmptyState 
        icon={Camera}
        title="No visuals available for this dish"
      />
    );
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {imagesWithRef.map(img => (
          <div 
            key={img.id}
            onClick={() => setLightboxImg(img.url)}
            className={`aspect-square rounded-2xl overflow-hidden cursor-pointer relative group ${focusDishId === img.id ? 'ring-4 ring-accent shadow-[0_0_15px_rgba(212,175,55,0.5)]' : ''}`}
          >
            <img src={img.url} alt={img.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-4">
               <p className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 text-sm">
                 {img.name}
               </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-md"
            onClick={() => setLightboxImg(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
              onClick={() => setLightboxImg(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={lightboxImg} 
              alt="Lightbox View" 
              className="w-full max-w-5xl max-h-[85vh] object-contain rounded-xl shadow-2xl" 
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
