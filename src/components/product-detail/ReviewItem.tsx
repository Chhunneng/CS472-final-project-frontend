import type { Review } from '../../types';
import { useState, useCallback, useMemo } from 'react';
import React from 'react';
import Button from '../ui/Button';

interface ReviewItemProps {
  review: Review;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: string) => void;
}

export const ReviewItem = React.memo(function ReviewItem({ review, onEdit, onDelete }: ReviewItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleEdit = useCallback(() => onEdit(review), [onEdit, review]);
  const handleDelete = useCallback(() => onDelete(review.id), [onDelete, review.id]);

  const formattedDate = useMemo(() => {
    return new Date(review.date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [review.date]);

  const ratingStars = useMemo(() => {
    return [...Array(5)].map((_, index) => (
      <span 
        key={index}
        className={`text-lg ${
          index < review.rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  }, [review.rating]);

  return (
    <div 
      className="bg-white rounded-xl shadow-sm p-6 mb-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.01]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="space-y-4 flex-grow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-600 font-semibold text-lg">
                {review.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {review.author}
              </h3>
              <span className="text-sm text-gray-500">
                {formattedDate}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-primary-50 px-4 py-2 rounded-full">
              {ratingStars}
            </div>
          </div>
        </div>

        <div className={`flex gap-2 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-100'}`}>
          <Button
            onClick={handleEdit}
            variant="secondary"
            className="group px-4 py-2 text-primary-600 hover:text-primary-700 font-medium bg-white hover:bg-primary-50 rounded-lg transition-all duration-200 flex items-center gap-2 border border-primary-200 hover:border-primary-300 shadow-sm hover:shadow-md"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span className="relative">
              Edit
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-200"></span>
            </span>
          </Button>
          <Button
            onClick={handleDelete}
            variant="danger"
            className="px-4 py-2 hover:text-white-700 font-medium hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Delete
          </Button>
        </div>
      </div>
      
      <p className="mt-6 text-gray-600 text-lg leading-relaxed border-t border-gray-100 pt-6">
        {review.comment}
      </p>
    </div>
  );
}); 