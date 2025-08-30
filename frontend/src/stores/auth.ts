import { defineStore } from 'pinia'
import { ref, computed, type Ref, type ComputedRef } from 'vue'
import authService from '@/services/authService'
import type { User, LoginCredentials } from '@/types'
import type { LoginResponse } from '@/services/authService'
import { useAclStore } from './acl'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = ref(null)
  const token: Ref<string | null> = ref(localStorage.getItem('token') || null)
  const isLoading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)

  const isAuthenticated: ComputedRef<boolean> = computed(() => !!token.value)
  const currentUser: ComputedRef<User | null> = computed(() => user.value)
  
  const aclStore = useAclStore()
  const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    isLoading.value = true
    error.value = null
    
    try {
      const data: LoginResponse = await authService.login(credentials)
      
      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', data.token)
      
      aclStore.initializeFromUser(data.user)
      
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
      
      aclStore.resetAcl()
    }
  }

  const checkAuth = async (): Promise<boolean> => {
    if (!token.value) return false

    try {
      const userData: User | null = await authService.verifyToken()
      if (userData) {
        user.value = userData
        
        aclStore.initializeFromUser(userData)
        
        return true
      } else {
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

  const clearAuthState = (): void => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    aclStore.resetAcl()
  }

  const validateTokenPeriodically = (): void => {
    if (token.value && user.value) {
      checkAuth().catch(() => {
        console.log('Token expirado detectado, estado limpo automaticamente')
      })
    }
  }

  if (typeof window !== 'undefined') {
    setInterval(validateTokenPeriodically, 5 * 60 * 1000)
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    currentUser,
    login,
    logout,
    checkAuth,
    clearError,
    clearAuthState
  }
})