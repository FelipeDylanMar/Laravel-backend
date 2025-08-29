import { defineStore } from 'pinia'
import { ref, computed, type Ref, type ComputedRef } from 'vue'
import authService from '@/services/authService'
import type { User } from '@/types'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  user: User
  token: string
  message: string
}

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const user: Ref<User | null> = ref(null)
  const token: Ref<string | null> = ref(localStorage.getItem('token') || null)
  const isLoading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)

  // Getters
  const isAuthenticated: ComputedRef<boolean> = computed(() => !!token.value)
  const currentUser: ComputedRef<User | null> = computed(() => user.value)

  // Actions
  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    isLoading.value = true
    error.value = null
    
    try {
      const data: LoginResponse = await authService.login(credentials)
      
      // Armazenar token e dados do usuário
      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', data.token)
      
      return data
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Erro desconhecido'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await authService.logout()
    } catch (err: unknown) {
      console.warn('Erro ao fazer logout:', err)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('token')
    }
  }

  const checkAuth = async (): Promise<boolean> => {
    if (!token.value) return false

    try {
      const userData: User | null = await authService.verifyToken()
      if (userData) {
        user.value = userData
        return true
      } else {
        // Token inválido, fazer logout
        await logout()
        return false
      }
    } catch (err: unknown) {
      await logout()
      return false
    }
  }

  const clearError = (): void => {
    error.value = null
  }

  return {
    // Estado
    user,
    token,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    currentUser,
    // Actions
    login,
    logout,
    checkAuth,
    clearError
  }
})