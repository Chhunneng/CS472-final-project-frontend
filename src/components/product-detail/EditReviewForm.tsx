import { useState } from 'react';
import type { Review } from '../../types';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';

interface EditReviewFormProps {
  review: Review;
  onSave: (review: Review) => void;
  onCancel: () => void;
}

export function EditReviewForm({ review, onSave, onCancel }: EditReviewFormProps) {
  const [editedReview, setEditedReview] = useState(review);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedReview);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
      <Input
        label="Your Name"
        type="text"
        value={editedReview.author}
        onChange={(e) => setEditedReview({ ...editedReview, author: e.target.value })}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <select
          value={editedReview.rating}
          onChange={(e) => setEditedReview({ ...editedReview, rating: parseInt(e.target.value) })}
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
        value={editedReview.comment}
        onChange={(e) => setEditedReview({ ...editedReview, comment: e.target.value })}
        rows={4}
        required
      />

      <div className="flex space-x-4">
        <Button type="submit" variant="primary" className="flex-1">
          Save
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
} 