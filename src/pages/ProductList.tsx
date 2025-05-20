import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  getProducts,
  searchProducts,
  getAllCategories,
} from "../api/productApi";
import { useProduct } from "../context/ProductContext";
import type { Product } from "../types";
import Loading from "../components/Loading";
import Button from "../components/ui/Button";

const DEFAULT_IMAGE =
  "https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image";

export default function ProductList() {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    currentPage,
    setCurrentPage,
  } = useProduct();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", currentPage, selectedCategory],
    queryFn: () => getProducts(currentPage, selectedCategory || undefined),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const { data: searchResults } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => searchProducts(searchQuery),
    enabled: !!searchQuery,
  });

  const displayProducts = searchQuery ? searchResults : products?.products;

  if (isLoading) {
    return <Loading size="large" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={!selectedCategory ? "primary" : "secondary"}
            className={!selectedCategory ? "bg-primary-100 text-primary-800 border-primary-300" : ""}
          >
            All
          </Button>
          {categories?.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "primary" : "secondary"}
              className={selectedCategory === category ? "bg-primary-100 text-primary-800 border-primary-300" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
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

      {!searchQuery && products && (
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: products.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <Button
                key={page}
                onClick={() => setCurrentPage(page)}
                variant={currentPage === page ? "primary" : "secondary"}
                size="sm"
              >
                {page}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
}
