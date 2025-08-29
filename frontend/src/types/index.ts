// ============================================================================
// ENUMS
// ============================================================================

/** Possible sort orders for data queries */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

/** Available sort fields for products */
export enum ProductSortField {
  NAME = 'name',
  PRICE = 'price',
  CREATED_AT = 'created_at',
  DATA_VALIDADE = 'data_validade'
}

/** API response status types */
export enum ApiStatus {
  SUCCESS = 'success',
  ERROR = 'error'
}

// ============================================================================
// PRODUCT TYPES
// ============================================================================

/**
 * Product entity interface
 * Supports both English and Portuguese field names for backend compatibility
 */
export interface Product {
  /** Unique product identifier */
  id: number
  /** Product name (English) */
  name: string
  /** Product description (English) */
  description: string
  /** Product price in cents or decimal */
  price: number
  /** Associated category ID */
  category_id: number
  /** Product image filename or URL */
  image?: string
  /** Creation timestamp */
  created_at?: string
  /** Last update timestamp */
  updated_at?: string
  /** Associated category object */
  category?: Category
  
  // Portuguese field names for backend compatibility
  /** Product name (Portuguese) */
  nome?: string
  /** Product description (Portuguese) */
  descricao?: string
  /** Product price (Portuguese) - can be string for form inputs */
  preco?: number | string
  /** Product image (Portuguese) */
  imagem?: string
  /** Expiration date (Portuguese) */
  data_validade?: string
  /** Image URL (alternative field) */
  image_url?: string
}

/**
 * Product form data interface for create/update operations
 * Includes validation-ready field types
 */
export interface ProductFormData {
  /** Product name (English) - optional for updates */
  name?: string
  /** Product description (English) - optional for updates */
  description?: string
  /** Product price (English) - string for form inputs, number for API */
  price?: number | string
  /** Category ID - string for form selects, number for API */
  category_id: number | string
  /** Product image file for upload */
  image?: File | null
  /** Product stock quantity */
  stock?: number | string
  
  // Portuguese field names (required for backend)
  /** Product name (Portuguese) - required */
  nome: string
  /** Product description (Portuguese) - required */
  descricao: string
  /** Product price (Portuguese) - required */
  preco: number | string
  /** Expiration date (Portuguese) - required */
  data_validade: string
  /** Product stock (Portuguese) */
  estoque?: number | string
}

// ============================================================================
// CATEGORY TYPES
// ============================================================================

/**
 * Category entity interface
 * Supports both English and Portuguese field names
 */
export interface Category {
  /** Unique category identifier */
  id: number
  /** Category name (English) */
  name: string
  /** Category description (English) */
  description?: string
  /** Creation timestamp */
  created_at?: string
  /** Last update timestamp */
  updated_at?: string
  
  // Portuguese field names
  /** Category name (Portuguese) */
  nome?: string
  /** Category description (Portuguese) */
  descricao?: string
}

// ============================================================================
// FILTER TYPES
// ============================================================================

/**
 * Query filters for product listing and search
 * Used for API requests with pagination and sorting
 */
export interface Filters {
  /** Search term for name/description */
  search?: string
  /** Field to sort by */
  sort_by?: ProductSortField | string
  /** Sort direction */
  sort_order?: SortOrder
  /** Filter by category ID */
  category_id?: number | string
  /** Current page number (1-based) */
  page?: number
  /** Items per page */
  per_page?: number
}

// ============================================================================
// USER TYPES
// ============================================================================

/**
 * User entity interface
 * Represents authenticated user data
 */
export interface User {
  /** Unique user identifier */
  id: number
  /** User's full name */
  name: string
  /** User's email address */
  email: string
  /** Email verification timestamp */
  email_verified_at?: string
  /** Account creation timestamp */
  created_at?: string
  /** Last update timestamp */
  updated_at?: string
}

/**
 * Login credentials interface
 * Used for user authentication
 */
export interface LoginCredentials {
  /** User's email address */
  email: string
  /** User's password */
  password: string
  /** Index signature for API compatibility */
  [key: string]: string
}

/**
 * User registration data interface
 * Includes password confirmation for validation
 */
export interface RegisterData {
  /** User's full name */
  name: string
  /** User's email address */
  email: string
  /** User's password */
  password: string
  /** Password confirmation for validation */
  password_confirmation: string
  /** Index signature for API compatibility */
  [key: string]: string
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

/**
 * Generic API response wrapper
 * @template T - Type of the response data
 */
export interface ApiResponse<T = unknown> {
  /** Response data payload */
  data: T
  /** Optional response message */
  message?: string
  /** Response status indicator */
  status?: ApiStatus | string
}

/**
 * Success response interface
 * Used for successful API operations
 */
export interface SuccessResponse {
  /** Success message */
  message: string
  /** Success status */
  status: ApiStatus.SUCCESS
}

/**
 * Error response interface
 * Used for failed API operations with validation errors
 */
export interface ErrorResponse {
  /** Error message */
  message: string
  /** Error status */
  status: ApiStatus.ERROR
  /** Validation errors by field */
  errors?: Record<string, string[]>
}

/**
 * Paginated API response interface
 * @template T - Type of the paginated items
 */
export interface PaginatedResponse<T> {
  /** Array of items for current page */
  data: T[]
  /** Current page number */
  current_page: number
  /** Total number of pages */
  last_page: number
  /** Items per page */
  per_page: number
  /** Total number of items */
  total: number
  /** First item number on current page */
  from: number
  /** Last item number on current page */
  to: number
}

/**
 * Validation error interface
 * Used for form validation responses
 */
export interface ValidationError {
  /** Error message */
  message: string
  /** Field-specific validation errors */
  errors: Record<string, string[]>
}

// ============================================================================
// STORE STATE TYPES
// ============================================================================

/**
 * Products store state interface
 * Manages product-related application state
 */
export interface ProductsState {
  /** List of products */
  products: Product[]
  /** Currently selected/viewed product */
  currentProduct: Product | null
  /** Available categories */
  categories: Category[]
  /** Loading state indicator */
  loading: boolean
  /** Error message if any */
  error: string | null
}

/**
 * Authentication store state interface
 * Manages user authentication state
 */
export interface AuthState {
  /** Authenticated user data */
  user: User | null
  /** Authentication token */
  token: string | null
  /** Authentication status */
  isAuthenticated: boolean
  /** Loading state indicator */
  loading: boolean
  /** Error message if any */
  error: string | null
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Route parameters interface
 * Used for dynamic route parameters
 */
export interface RouteParams {
  /** Optional ID parameter */
  id?: string
  /** Additional dynamic parameters */
  [key: string]: string | undefined
}

/**
 * Form validation errors interface
 * Maps field names to error messages
 */
export interface FormErrors {
  /** Field name to error message(s) mapping */
  [key: string]: string | string[]
}

// ============================================================================
// HTTP TYPES
// ============================================================================

/**
 * HTTP request configuration interface
 * Used for API service requests
 */
export interface RequestConfig {
  /** HTTP method */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  /** Request headers */
  headers?: Record<string, string>
  /** Request body */
  body?: string | FormData | Record<string, unknown>
  /** Query parameters */
  params?: Record<string, string | number | boolean>
}

/**
 * API error interface
 * Extends native Error with additional API-specific properties
 */
export interface ApiError extends Error {
  /** HTTP status code */
  status?: number
  /** Error response data */
  response?: ErrorResponse | string
}

// ============================================================================
// PASSWORD TYPES
// ============================================================================

/**
 * Password update data interface
 * Used for changing user passwords
 */
export interface PasswordUpdateData {
  /** Current password for verification */
  current_password: string
  /** New password */
  password: string
  /** New password confirmation */
  password_confirmation: string
  /** Index signature for API compatibility */
  [key: string]: string
}

/**
 * Password reset request interface
 * Used for requesting password reset emails
 */
export interface PasswordResetRequest {
  /** User's email address */
  email: string
  /** Index signature for API compatibility */
  [key: string]: string
}