import apiService from './api'
import type { 
  User, 
  SuccessResponse, 
  PasswordUpdateData, 
  PasswordResetRequest, 
  LoginCredentials, 
  RegisterData
} from '@/types'

export interface LoginResponse {
  user: User
  token: string
  message: string
}

class AuthService {
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

  async logout(): Promise<void> {
    try {
      await apiService.post('/logout')
    } catch (error: unknown) {
      console.warn('Erro ao fazer logout na API:', error)
    } finally {
      localStorage.removeItem('token')
    }
  }

  async getUser(): Promise<User> {
    try {
      const response = await apiService.get<User>('/user')
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao obter dados do usuário')
      throw new Error(errorMessage)
    }
  }

  async register(userData: RegisterData): Promise<LoginResponse> {
    try {
      const response = await apiService.post<LoginResponse>('/register', userData)
      
      if (response.token) {
        localStorage.setItem('token', response.token)
      }
      
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao registrar usuário')
      throw new Error(errorMessage)
    }
  }

  async verifyToken(): Promise<User | null> {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        return null
      }
      
      const response = await apiService.get<User>('/user')
      return response
    } catch (error: unknown) {
      localStorage.removeItem('token')
      return null
    }
  }

  async updatePassword(passwordData: PasswordUpdateData): Promise<SuccessResponse> {
    try {
      const response = await apiService.put<SuccessResponse>('/user/password', passwordData)
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao atualizar senha')
      throw new Error(errorMessage)
    }
  }

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

  private extractErrorMessage(error: unknown, defaultMessage: string): string {
    if (error instanceof Error) {
      return error.message
    }
    
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return String((error as { message: unknown }).message)
    }
    
    return defaultMessage
  }
}

const authService = new AuthService()
export default authService