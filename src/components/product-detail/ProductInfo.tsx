import { Link, useNavigate } from 'react-router-dom';
import { useState, useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../../api/productApi';
import type { Product } from '../../types';
import Button from '../ui/Button';

const DEFAULT_IMAGE = 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const deleteProductMutation = useMutation({
    mutationFn: () => deleteProduct(product.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate(-1);
    },
  });

  const handleDelete = useCallback(() => {
    setShowDeleteConfirm(true);
  }, []);

  const confirmDelete = useCallback(() => {
    deleteProductMutation.mutate();
  }, [deleteProductMutation]);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteConfirm(false);
  }, []);

  const formattedPrice = useMemo(() => {
    return product?.price.toFixed(2);
  }, [product?.price]);

  const formattedRating = useMemo(() => {
    return product?.averageRating.toFixed(1);
  }, [product?.averageRating]);

  return (
    <div className="card p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={product.imageUrl || DEFAULT_IMAGE}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-2/3">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-bold text-gray-900">{product?.name}</h1>
            <div className="flex gap-3">
              <Link
                to={`/products/${product.id}/edit`}
                className="btn btn-primary"
              >
                Edit
              </Link>
              <Button
                onClick={handleDelete}
                variant="danger"
                isLoading={deleteProductMutation.isPending}
              >
                {deleteProductMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
          <p className="text-gray-600 mt-4 text-lg">{product?.description}</p>
          <div className="mt-6 flex justify-between items-center">
            <span className="text-3xl font-bold text-primary-600">
              ${formattedPrice}
            </span>
            <div className="flex items-center bg-primary-50 px-4 py-2 rounded-full">
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="ml-2 text-primary-700 text-xl font-medium">
                {formattedRating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Product</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={handleCancelDelete}
                variant="secondary"
                disabled={deleteProductMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                variant="danger"
                isLoading={deleteProductMutation.isPending}
              >
                {deleteProductMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 