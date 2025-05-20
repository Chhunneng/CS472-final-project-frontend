import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductById } from "../api/productApi";
import {
  getReviews,
  addReview,
  updateReview,
  deleteReview,
} from "../api/reviewApi";
import type { Review } from "../types";
import { ProductInfo } from "../components/product-detail/ProductInfo";
import { ReviewForm } from "../components/product-detail/ReviewForm";
import { ReviewItem } from "../components/product-detail/ReviewItem";
import { EditReviewForm } from "../components/product-detail/EditReviewForm";
import Loading from "../components/Loading";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviews(id!),
  });

  const addReviewMutation = useMutation({
    mutationFn: (review: { author: string; rating: number; comment: string }) =>
      addReview(id!, review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });

  const updateReviewMutation = useMutation({
    mutationFn: (review: Review) =>
      updateReview(id!, review.id, {
        author: review.author,
        rating: review.rating,
        comment: review.comment,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      setEditingReview(null);
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId: string) => deleteReview(id!, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });

  if (productLoading || reviewsLoading) {
    return <Loading size="large" />;
  }

  return (
    <div className="space-y-8">
      {product && <ProductInfo product={product} />}

      <div className="card p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Reviews</h2>

        <ReviewForm onSubmit={(review) => addReviewMutation.mutate(review)} />

        <div className="space-y-8">
          {reviews?.map((review) => (
            <div key={review.id}>
              {editingReview?.id === review.id ? (
                <EditReviewForm
                  review={editingReview}
                  onSave={(review) => updateReviewMutation.mutate(review)}
                  onCancel={() => setEditingReview(null)}
                />
              ) : (
                <ReviewItem
                  review={review}
                  onEdit={setEditingReview}
                  onDelete={(reviewId) => deleteReviewMutation.mutate(reviewId)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
