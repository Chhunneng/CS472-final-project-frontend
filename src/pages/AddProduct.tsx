import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, generateDescription } from '../api/productApi';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Button from '../components/ui/Button';

interface ValidationError {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
}

interface ApiError {
  error: string;
  details?: ValidationError[];
}

type Product = {
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl?: string;
}

export default function AddProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createProductMutation = useMutation({
    mutationFn: (product: Product) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate(-1);
    },
    onError: (error: ApiError) => {
      if (error.details) {
        const newErrors: Record<string, string> = {};
        error.details.forEach((detail) => {
          const fieldName = detail.path[0];
          newErrors[fieldName] = detail.message;
        });
        setErrors(newErrors);
      }
    },
  });

  const generateDescriptionMutation = useMutation({
    mutationFn: () => generateDescription(newProduct.name, newProduct.category),
    onSuccess: (data) => {
      setNewProduct(prev => ({ ...prev, description: data.description }));
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    createProductMutation.mutate({
      ...newProduct,
      price: parseFloat(newProduct.price),
    });
  };

  const handleGenerateDescription = () => {
    if (!newProduct.name || !newProduct.category) {
      alert('Please enter product name and category first');
      return;
    }
    generateDescriptionMutation.mutate();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
        <Input
          label="Product Name"
          type="text"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          error={errors.name}
          required
        />

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={generateDescriptionMutation.isPending}
              className="px-3 py-1.5 text-sm font-medium bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generateDescriptionMutation.isPending ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                </div>
              ) : (
                'Auto Generate'
              )}
            </button>
          </div>
          <TextArea
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            rows={4}
            error={errors.description}
            required
          />
        </div>

        <Input
          label="Category"
          type="text"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          error={errors.category}
          required
        />

        <Input
          label="Price"
          type="number"
          step="0.01"
          min="0"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          error={errors.price}
          required
        />

        <Input
          label="Image URL (optional)"
          type="url"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          error={errors.imageUrl}
        />

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={createProductMutation.isPending}
        >
          {createProductMutation.isPending ? 'Adding Product...' : 'Add Product'}
        </Button>
      </form>
    </div>
  );
} 