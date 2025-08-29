// Product Types
export interface Product {
  id: number
  name: string
  description: string
  price: number
  category_id: number
  image?: string
  created_at?: string
  updated_at?: string
  category?: Category
  // Portuguese field names for backend compatibility
  nome?: string
  descricao?: string
  preco?: number | string
  imagem?: string
  data_validade?: string
  image_url?: string
}

export interface ProductFormData {
  name?: string
  description?: string
  price?: number | string
  category_id: number | string
  image?: File | null
  // Portuguese field names
  nome: string
  descricao: string
  preco: number | string
  data_validade: string
}

// Category Types
export interface Category {
  id: number
  name: string
  description?: string
  created_at?: string
  updated_at?: string
  // Portuguese field names
  nome?: string
  descricao?: string
}

// Filter Types
export interface Filters {
  search?: string
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  category_id?: number | string
  page?: number
  per_page?: number
}

// User Types
export interface User {
  id: number
  name: string
  email: string
  email_verified_at?: string
  created_at?: string
  updated_at?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

// API Response Types
export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  status?: string
}

export interface SuccessResponse {
  message: string
  status: 'success'
}

export interface ErrorResponse {
  message: string
  status: 'error'
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number
  to: number
}

export interface ValidationError {
  message: string
  errors: Record<string, string[]>
}

// Store Types
export interface ProductsState {
  products: Product[]
  currentProduct: Product | null
  categories: Category[]
  loading: boolean
  error: string | null
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

// Router Types
export interface RouteParams {
  id?: string
  [key: string]: string | undefined
}

// Form Validation Types
export interface FormErrors {
  [key: string]: string | string[]
}

// HTTP Client Types
export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: string | FormData | Record<string, unknown>
  params?: Record<string, string | number | boolean>
}

export interface ApiError extends Error {
  status?: number
  response?: ErrorResponse | string
}

// Password Update Types
export interface PasswordUpdateData {
  current_password: string
  password: string
  password_confirmation: string
}

export interface PasswordResetRequest {
  email: string
}