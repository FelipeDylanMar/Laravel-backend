import apiService from './api'
import type { 
  User, 
  SuccessResponse, 
  PasswordUpdateData, 
  PasswordResetRequest, 
  LoginCredentials, 
  RegisterData,
  ApiError 
} from '@/types'

/**
 * Response interface for login and register operations
 */
export interface LoginResponse {
  /** User data returned from authentication */
  user: User
  /** JWT token for authenticated requests */
  token: string
  /** Success message from the server */
  message: string
}

/**
 * Authentication service for handling user authentication operations
 * Provides methods for login, logout, registration, and user management
 */
class AuthService {
  /**
   * Authenticate user with email and password
   * @param credentials - User login credentials
   * @returns Promise with user data and authentication token
   * @throws Error if authentication fails
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await apiService.post<LoginResponse>('/login', credentials)
      
      // Store token in localStorage for subsequent requests
      if (response.token) {
        localStorage.setItem('token', response.token)
      }
      
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao fazer login')
      throw new Error(errorMessage)
    }
  }

  /**
   * Log out the current user
   * Clears authentication token and notifies the server
   */
  async logout(): Promise<void> {
    try {
      await apiService.post('/logout')
    } catch (error: unknown) {
      console.warn('Erro ao fazer logout na API:', error)
    } finally {
      // Always clear local storage, even if API call fails
      localStorage.removeItem('token')
    }
  }

  /**
   * Get current authenticated user data
   * @returns Promise with current user data
   * @throws Error if user data cannot be retrieved
   */
  async getUser(): Promise<User> {
    try {
      const response = await apiService.get<User>('/user')
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao obter dados do usuário')
      throw new Error(errorMessage)
    }
  }

  /**
   * Register a new user account
   * @param userData - User registration data
   * @returns Promise with user data and authentication token
   * @throws Error if registration fails
   */
  async register(userData: RegisterData): Promise<LoginResponse> {
    try {
      const response = await apiService.post<LoginResponse>('/register', userData)
      
      // Store token in localStorage for subsequent requests
      if (response.token) {
        localStorage.setItem('token', response.token)
      }
      
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao registrar usuário')
      throw new Error(errorMessage)
    }
  }

  /**
   * Verify if the current token is valid
   * @returns Promise with user data if token is valid, null otherwise
   */
  async verifyToken(): Promise<User | null> {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        return null
      }
      
      const response = await apiService.get<User>('/user')
      return response
    } catch (error: unknown) {
      // Clear invalid token
      localStorage.removeItem('token')
      return null
    }
  }

  /**
   * Update user password
   * @param passwordData - Password update data
   * @returns Promise with success response
   * @throws Error if password update fails
   */
  async updatePassword(passwordData: PasswordUpdateData): Promise<SuccessResponse> {
    try {
      const response = await apiService.put<SuccessResponse>('/user/password', passwordData)
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao atualizar senha')
      throw new Error(errorMessage)
    }
  }

  /**
   * Request password reset for a user
   * @param email - User email address
   * @returns Promise with success response
   * @throws Error if password reset request fails
   */
  async requestPasswordReset(email: string): Promise<SuccessResponse> {
    try {
      const requestData: PasswordResetRequest = { email }
      const response = await apiService.post<SuccessResponse>('/password/reset', requestData)
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao solicitar reset de senha')
      throw new Error(errorMessage)
    }
  }

  /**
   * Extract error message from API error or fallback to default message
   * @param error - Error object from API call
   * @param defaultMessage - Default error message
   * @returns Extracted or default error message
   */
  private extractErrorMessage(error: unknown, defaultMessage: string): string {
    if (error instanceof Error) {
      return error.message
    }
    
    // Handle API error format
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return String((error as { message: unknown }).message)
    }
    
    return defaultMessage
  }
}

/**
 * Singleton instance of AuthService
 * Provides centralized authentication management for the application
 */
const authService = new AuthService()

/**
 * Default export of the AuthService singleton instance
 * Use this for all authentication operations throughout the application
 */
export default authService