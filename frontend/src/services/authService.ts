import apiService from './api'
import type { User, SuccessResponse, PasswordUpdateData, PasswordResetRequest, LoginCredentials, RegisterData } from '@/types'

export interface LoginResponse {
  user: User
  token: string
  message: string
}

// Serviço de autenticação
class AuthService {
  // Login do usuário
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const data = credentials as unknown as Record<string, unknown>
      const response = await apiService.post<LoginResponse>('/login', data)
      return response
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer login'
      throw new Error(errorMessage)
    }
  }

  // Logout do usuário
  async logout(): Promise<void> {
    try {
      await apiService.post('/logout')
    } catch (error: unknown) {
      // Mesmo se der erro na API, vamos limpar o token local
      console.warn('Erro ao fazer logout na API:', error)
    }
  }

  // Obter dados do usuário autenticado
  async getUser(): Promise<User> {
    try {
      const response = await apiService.get<User>('/user')
      return response
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao obter dados do usuário'
      throw new Error(errorMessage)
    }
  }

  // Registrar novo usuário
  async register(userData: RegisterData): Promise<LoginResponse> {
    try {
      const data = userData as unknown as Record<string, unknown>
      const response = await apiService.post<LoginResponse>('/register', data)
      return response
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao registrar usuário'
      throw new Error(errorMessage)
    }
  }

  // Verificar se o token é válido
  async verifyToken(): Promise<User | null> {
    try {
      const response = await apiService.get<User>('/user')
      return response
    } catch (error: unknown) {
      return null
    }
  }

  // Atualizar senha
  async updatePassword(passwordData: PasswordUpdateData): Promise<SuccessResponse> {
    try {
      const data = passwordData as unknown as Record<string, unknown>
      const response = await apiService.put<SuccessResponse>('/user/password', data)
      return response
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar senha'
      throw new Error(errorMessage)
    }
  }

  // Solicitar reset de senha
  async requestPasswordReset(email: string): Promise<SuccessResponse> {
    try {
      const requestData: PasswordResetRequest = { email }
      const data = requestData as unknown as Record<string, unknown>
      const response = await apiService.post<SuccessResponse>('/password/reset', data)
      return response
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao solicitar reset de senha'
      throw new Error(errorMessage)
    }
  }
}

// Instância singleton do serviço de autenticação
const authService = new AuthService()

export default authService