import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getProducts, searchProducts } from '../api/productApi';
import { useProduct } from '../context/ProductContext';
import type { Product } from '../types';

const DEFAULT_IMAGE = 'https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image';

export default function Home() {
  const { searchQuery } = useProduct();
  
  const { data: featuredProducts } = useQuery({
    queryKey: ['products', 1],
    queryFn: () => getProducts(1),
  });

  const { data: searchResults } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => searchProducts(searchQuery),
    enabled: !!searchQuery,
  });

  const displayProducts = searchQuery ? searchResults : featuredProducts?.products;

  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          Welcome to Product Reviews
        </h1>
        <p className="text-xl text-primary-100 max-w-2xl mx-auto">
          Discover and share your experiences with products. Find the best products based on real user reviews.
        </p>
      </section>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {searchQuery ? 'Search Results' : 'Featured Products'}
          </h2>
          <Link
            to="/products"
            className="btn btn-primary"
          >
            View All Products
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts?.map((product: Product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="card group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.imageUrl || DEFAULT_IMAGE}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center bg-primary-50 px-3 py-1 rounded-full">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-primary-700 font-medium">
                      {product.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}