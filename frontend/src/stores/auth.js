import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)

  // Actions
  const login = async (credentials) => {
    isLoading.value = true
    error.value = null
    
    try {
      const data = await authService.login(credentials)
      
      // Armazenar token e dados do usuário
      token.value = data.token
      user.value = data.user
      localStorage.setItem('token', data.token)
      
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (err) {
      console.warn('Erro ao fazer logout:', err)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('token')
    }
  }

  const checkAuth = async () => {
    if (!token.value) return false

    try {
      const userData = await authService.verifyToken()
      if (userData) {
        user.value = userData
        return true
      } else {
        // Token inválido, fazer logout
        await logout()
        return false
      }
    } catch (err) {
      await logout()
      return false
    }
  }

  const clearError = () => {
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