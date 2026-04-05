import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  author: string;
  rating: number;
  date: string;
  content: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ author, rating, date, content }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary font-bold font-serif">
            {author.charAt(0)}
          </div>
          <div>
            <h4 className="font-medium text-primary text-sm">{author}</h4>
            <span className="text-xs text-lightText">{date}</span>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-accent text-accent' : 'fill-gray-200 text-gray-200'}`} />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">
        "{content}"
      </p>
    </div>
  );
};
