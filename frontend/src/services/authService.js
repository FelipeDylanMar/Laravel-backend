import apiService from './api.js'

// Serviço de autenticação
class AuthService {
  // Login do usuário
  async login(credentials) {
    try {
      const response = await apiService.post('/login', credentials)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao fazer login')
    }
  }

  // Logout do usuário
  async logout() {
    try {
      await apiService.post('/logout')
    } catch (error) {
      // Mesmo se der erro na API, vamos limpar o token local
      console.warn('Erro ao fazer logout na API:', error)
    }
  }

  // Obter dados do usuário autenticado
  async getUser() {
    try {
      const response = await apiService.get('/user')
      return response
    } catch (error) {
      throw new Error('Erro ao obter dados do usuário')
    }
  }

  // Registrar novo usuário
  async register(userData) {
    try {
      const response = await apiService.post('/register', userData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao registrar usuário')
    }
  }

  // Verificar se o token é válido
  async verifyToken() {
    try {
      const response = await apiService.get('/user')
      return response
    } catch (error) {
      return null
    }
  }

  // Atualizar senha
  async updatePassword(passwordData) {
    try {
      const response = await apiService.put('/user/password', passwordData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao atualizar senha')
    }
  }

  // Solicitar reset de senha
  async requestPasswordReset(email) {
    try {
      const response = await apiService.post('/password/reset', { email })
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao solicitar reset de senha')
    }
  }
}

// Instância singleton do serviço de autenticação
const authService = new AuthService()

export default authService