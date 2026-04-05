import React, { useMemo } from 'react';
import { useCustomerStore } from '../store/customerStore';
import { mockDishes } from '../../../services/mock/mockDishes';
import { ReviewCard } from '../components/ReviewCard';
import { EmptyState } from '../../../components/shared/EmptyState';
import { MessageSquareText } from 'lucide-react';
import { motion } from 'framer-motion';

export const ReviewsTabView: React.FC = () => {
  const { focusDishId } = useCustomerStore();

  const focusedDish = useMemo(() => {
    return mockDishes.find(d => d.id === focusDishId);
  }, [focusDishId]);

  // Generate some deterministic dummy reviews based on the dish rating
  const dummyReviews = useMemo(() => {
    if (!focusedDish) return [];
    return [
      { id: '1', author: 'Sarah Jenkins', rating: Math.floor(focusedDish.rating || 5), date: '2 days ago', content: `Absolutely phenomenal! The ${focusedDish.name} was incredibly fresh and perfectly balanced.` },
      { id: '2', author: 'Michael R.', rating: 5, date: '1 week ago', content: 'Hands down one of the best dining experiences. The flavors were extraordinary.' },
      { id: '3', author: 'Emily C.', rating: 4, date: '3 weeks ago', content: 'Very well prepared. Atmosphere matched the quality of the dish perfectly.' },
    ];
  }, [focusedDish]);

  if (!focusDishId) {
    return (
      <EmptyState 
        icon={MessageSquareText}
        title="Select a dish to view its reviews"
        description="Go back to the menu and click 'See Reviews' on any dish to explore what others are saying."
      />
    );
  }

  if (dummyReviews.length === 0) {
    return (
       <EmptyState 
          icon={MessageSquareText}
          title="Be the first to share your experience"
          description={`There are currently no reviews for ${focusedDish?.name}.`}
        />
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-8 text-center md:text-left">
        <h2 className="font-serif text-2xl font-bold text-primary mb-2">Thoughts & Experiences</h2>
        <p className="text-lightText">See what others are saying about the <span className="font-semibold text-primary">{focusedDish?.name}</span>.</p>
      </div>

      <div className="space-y-4">
        {dummyReviews.map((review, i) => (
          <motion.div 
            key={review.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <ReviewCard {...review} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
