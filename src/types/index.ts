export interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  imageUrl?: string
  dateAdded: string
  averageRating: number
}

export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  comment: string
  date: string
}

export interface PaginatedProducts {
  products: Product[]
  totalPages: number
  currentPage: number
}

export interface AIGeneratedDescription {
  description: string
}
