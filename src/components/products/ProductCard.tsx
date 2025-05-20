import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  onDelete?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
  onDelete,
}) => {
  return (
    <Card className="flex flex-col h-full">
      {imageUrl && (
        <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xl font-bold text-blue-600">${price.toFixed(2)}</span>
        <div className="space-x-2">
          <Link to={`/products/${id}`}>
            <Button variant="secondary" size="sm">View</Button>
          </Link>
          <Link to={`/products/${id}/edit`}>
            <Button variant="primary" size="sm">Edit</Button>
          </Link>
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(id)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard; 