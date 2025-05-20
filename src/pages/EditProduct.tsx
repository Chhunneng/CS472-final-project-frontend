import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById, updateProduct } from "../api/productApi";
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Loading from '../components/Loading';
import Button from '../components/ui/Button';

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    imageUrl: "",
  });

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
  });

  useEffect(() => {
    if (product) {
      setEditedProduct({
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price.toString(),
        imageUrl: product.imageUrl || "",
      });
    }
  }, [product]);

  const updateProductMutation = useMutation({
    mutationFn: (product: {
      name: string;
      description: string;
      category: string;
      price: number;
      imageUrl?: string;
    }) => updateProduct(id!, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      navigate(`/products/${id}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProductMutation.mutate({
      ...editedProduct,
      price: parseFloat(editedProduct.price),
    });
  };

  if (isLoading) {
    return <Loading size="large" />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow"
      >
        <Input
          label="Product Name"
          type="text"
          value={editedProduct.name}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, name: e.target.value })
          }
          required
        />

        <TextArea
          label="Description"
          value={editedProduct.description}
          onChange={(e) =>
            setEditedProduct({
              ...editedProduct,
              description: e.target.value,
            })
          }
          rows={4}
          required
        />

        <Input
          label="Category"
          type="text"
          value={editedProduct.category}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, category: e.target.value })
          }
          required
        />

        <Input
          label="Price"
          type="number"
          step="0.01"
          min="0"
          value={editedProduct.price}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, price: e.target.value })
          }
          required
        />

        <Input
          label="Image URL (optional)"
          type="url"
          value={editedProduct.imageUrl}
          onChange={(e) =>
            setEditedProduct({ ...editedProduct, imageUrl: e.target.value })
          }
        />

        <div className="flex gap-4">
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            isLoading={updateProductMutation.isPending}
          >
            {updateProductMutation.isPending
              ? "Saving Changes..."
              : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={() => navigate(`/products/${id}`)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
