import { get, post, put, del } from "./client"
import type { Product, PaginatedProducts, AIGeneratedDescription } from "../types"

export async function getProducts(page = 1, category?: string): Promise<PaginatedProducts> {
  const queryParams = new URLSearchParams()
  queryParams.append("page", page.toString())
  if (category) queryParams.append("category", category)
  return get<PaginatedProducts>(`/products?${queryParams}`);
}

export async function getProductById(id: string): Promise<Product> {
  return get<Product>(`/products/${id}`)
}

export async function searchProducts(query: string): Promise<Product[]> {
  return get<Product[]>(`/products/search?q=${query}`)
}

export async function createProduct(product: Omit<Product, "id" | "averageRating" | "dateAdded">): Promise<Product> {
  return post<Product>("/products", product)
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  return put<Product>(`/products/${id}`, product)
}

export async function deleteProduct(id: string): Promise<void> {
  return del(`/products/${id}`)
}

export async function generateDescription(
  productName: string,
  category: string,
  features?: string[],
): Promise<AIGeneratedDescription> {
  return post<AIGeneratedDescription>("/ai/generate-description", {
    productName,
    category,
    features,
  })
}

export async function getAllCategories(): Promise<string[]> {
  return get<string[]>('/products/categories')
}
