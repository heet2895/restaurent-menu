import React, { Suspense, lazy } from 'react';
import { CustomerHeader } from '../components/CustomerHeader';
import { CustomerNavbar } from '../components/CustomerNavbar';
import { CartFloatingFab } from '../components/CartFloatingFab';
import { CartMiniDrawer } from '../components/CartMiniDrawer';
import { CustomerToast } from '../components/CustomerToast';
import { useCustomerStore } from '../store/customerStore';
import { AnimatePresence } from 'framer-motion';

// Lazy loaded views for performance
const MenuTabView = lazy(() => import('../views/MenuTabView').then(m => ({ default: m.MenuTabView })));
const OrderTabView = lazy(() => import('../views/OrderTabView').then(m => ({ default: m.OrderTabView })));
const PhotosTabView = lazy(() => import('../views/PhotosTabView').then(m => ({ default: m.PhotosTabView })));
const ReviewsTabView = lazy(() => import('../views/ReviewsTabView').then(m => ({ default: m.ReviewsTabView })));

export const CustomerDashboard: React.FC = () => {
  const { activeTab } = useCustomerStore();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'menu': return <MenuTabView key="menu" />;
      case 'order': return <OrderTabView key="order" />;
      case 'photos': return <PhotosTabView key="photos" />;
      case 'reviews': return <ReviewsTabView key="reviews" />;
      default: return <MenuTabView key="menu" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col font-sans">
      <CustomerHeader />
      <CustomerNavbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 relative">
        <Suspense fallback={
          <div className="flex animate-pulse flex-col items-center justify-center p-12 w-full h-full">
             <div className="w-12 h-12 border-4 border-gray-200 border-t-accent rounded-full animate-spin"></div>
          </div>
        }>
          <AnimatePresence mode="wait">
            {renderActiveView()}
          </AnimatePresence>
        </Suspense>
      </main>

      {/* Global Overlays & Modals */}
      <CartFloatingFab />
      <CartMiniDrawer />
      <CustomerToast />
    </div>
  );
};
