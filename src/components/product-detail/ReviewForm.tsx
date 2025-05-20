import { useState, useCallback } from 'react';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';

interface ReviewFormProps {
  onSubmit: (review: { author: string; rating: number; comment: string }) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    comment: '',
  });

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newReview);
    setNewReview({ author: '', rating: 5, comment: '' });
  }, [newReview, onSubmit]);

  const handleAuthorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReview(prev => ({ ...prev, author: e.target.value }));
  }, []);

  const handleRatingChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewReview(prev => ({ ...prev, rating: parseInt(e.target.value) }));
  }, []);

  const handleCommentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview(prev => ({ ...prev, comment: e.target.value }));
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mb-12 space-y-6 bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-900">Write a Review</h3>
      
      <Input
        label="Your Name"
        type="text"
        value={newReview.author}
        onChange={handleAuthorChange}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <select
          value={newReview.rating}
          onChange={handleRatingChange}
          className="input"
        >
          {[5, 4, 3, 2, 1].map((rating) => (
            <option key={rating} value={rating}>
              {rating} Stars
            </option>
          ))}
        </select>
      </div>

      <TextArea
        label="Review"
        value={newReview.comment}
        onChange={handleCommentChange}
        rows={4}
        required
      />

      <Button type="submit" variant="primary" className="w-full">
        Submit Review
      </Button>
    </form>
  );
} 