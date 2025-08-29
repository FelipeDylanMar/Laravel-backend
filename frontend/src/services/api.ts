import type { ErrorResponse, ApiError, RequestConfig } from '@/types'

/**
 * API Configuration
 * Supports environment-based URL configuration
 */
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  TIMEOUT: 10000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000
} as const

/**
 * HTTP status codes for better error handling
 */
const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
} as const
/**
 * API Service class for handling HTTP requests
 * Provides a centralized way to interact with the backend API
 */
class ApiService {
  private baseURL: string
  private retryCount: number = 0

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
  }

  /**
   * Get authentication token from localStorage
   * @returns Authentication token or null
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('token')
  }

  /**
   * Create request headers with authentication
   * @param customHeaders - Additional headers to include
   * @returns Complete headers object
   */
  private createHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...customHeaders
    }

    const token = this.getAuthToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    return headers
  }

  /**
   * Handle API errors with proper typing and logging
   * @param error - The error to handle
   * @param response - The response object
   * @param data - The response data
   */
  private handleError(error: unknown, response?: Response, data?: unknown): never {
    console.error('API Request Error:', {
      error,
      status: response?.status,
      statusText: response?.statusText,
      data
    })

    if (response?.status === HTTP_STATUS.UNAUTHORIZED) {
      // Clear invalid token and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }

    const apiError = error as ApiError
    apiError.status = response?.status
    apiError.response = data as ErrorResponse | string
    throw apiError
  }

  /**
   * Sleep function for retry delays
   * @param ms - Milliseconds to sleep
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Main HTTP request method with retry logic and proper error handling
   * @param endpoint - API endpoint to call
   * @param options - Request options
   * @param retryCount - Current retry attempt (internal use)
   * @returns Promise with typed response data
   */
  async request<T = unknown>(
    endpoint: string, 
    options: RequestInit = {}, 
    retryCount: number = 0
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    // Merge headers properly
    const headers = this.createHeaders(options.headers as Record<string, string>)
    
    // Configure request with timeout and merged options
    const config: RequestInit = {
      signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
      ...options,
      headers
    }

    try {
      const response = await fetch(url, config)
      
      // Parse response based on content type
      const contentType = response.headers.get('content-type')
      let data: unknown = null
      
      if (contentType?.includes('application/json')) {
        data = await response.json()
      } else {
        data = await response.text()
      }

      // Handle non-successful responses
      if (!response.ok) {
        // Retry on server errors (5xx) if retries available
        if (response.status >= 500 && retryCount < API_CONFIG.MAX_RETRIES) {
          await this.sleep(API_CONFIG.RETRY_DELAY * (retryCount + 1))
          return this.request<T>(endpoint, options, retryCount + 1)
        }

        const errorMessage = (data as any)?.message || `HTTP error! status: ${response.status}`
        const error = new Error(errorMessage) as ApiError
        this.handleError(error, response, data)
      }

      return data as T
    } catch (error) {
      // Retry on network errors if retries available
      if (retryCount < API_CONFIG.MAX_RETRIES && 
          (error instanceof TypeError || error instanceof DOMException)) {
        await this.sleep(API_CONFIG.RETRY_DELAY * (retryCount + 1))
        return this.request<T>(endpoint, options, retryCount + 1)
      }

      this.handleError(error)
    }
  }

  /**
   * HTTP GET request with query parameters
   * @param endpoint - API endpoint
   * @param params - Query parameters
   * @returns Promise with typed response data
   */
  async get<T = unknown>(
    endpoint: string, 
    params: Record<string, string | number | boolean> = {}
  ): Promise<T> {
    const stringParams: Record<string, string> = {}
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        stringParams[key] = String(value)
      }
    })
    
    const queryString = new URLSearchParams(stringParams).toString()
    const url = queryString ? `${endpoint}?${queryString}` : endpoint
    
    return this.request<T>(url, { method: 'GET' })
  }

  /**
   * HTTP POST request
   * @param endpoint - API endpoint
   * @param data - Request body data
   * @returns Promise with typed response data
   */
  async post<T = unknown>(
    endpoint: string, 
    data: Record<string, unknown> | FormData = {}
  ): Promise<T> {
    const isFormData = data instanceof FormData
    const headers = isFormData ? {} : undefined // Let browser set Content-Type for FormData
    
    return this.request<T>(endpoint, {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
      headers
    })
  }

  /**
   * HTTP PUT request
   * @param endpoint - API endpoint
   * @param data - Request body data
   * @returns Promise with typed response data
   */
  async put<T = unknown>(
    endpoint: string, 
    data: Record<string, unknown> | FormData = {}
  ): Promise<T> {
    const isFormData = data instanceof FormData
    const headers = isFormData ? {} : undefined
    
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: isFormData ? data : JSON.stringify(data),
      headers
    })
  }

  /**
   * HTTP PATCH request
   * @param endpoint - API endpoint
   * @param data - Request body data
   * @returns Promise with typed response data
   */
  async patch<T = unknown>(
    endpoint: string, 
    data: Record<string, unknown> | FormData = {}
  ): Promise<T> {
    const isFormData = data instanceof FormData
    const headers = isFormData ? {} : undefined
    
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: isFormData ? data : JSON.stringify(data),
      headers
    })
  }

  /**
   * HTTP DELETE request
   * @param endpoint - API endpoint
   * @returns Promise with typed response data
   */
  async delete<T = unknown>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE'
    })
  }

  /**
   * Upload file with additional data
   * @param endpoint - API endpoint for file upload
   * @param file - File to upload
   * @param additionalData - Additional form data
   * @returns Promise with typed response data
   */
  async upload<T = unknown>(
    endpoint: string, 
    file: File, 
    additionalData: Record<string, string> = {}
  ): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)
    
    // Add additional data to FormData
    Object.entries(additionalData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value)
      }
    })

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {} // Let browser set Content-Type for FormData
    })
  }
}

/**
 * Singleton instance of ApiService
 * Provides a centralized HTTP client for the application
 */
const apiService = new ApiService()

/**
 * Exported HTTP methods for convenient usage throughout the application
 * These methods are bound to the singleton instance
 */
export const { get, post, put, patch, delete: del, upload } = apiService

/**
 * Default export of the ApiService singleton instance
 * Use this for accessing the full API service functionality
 */
export default apiService