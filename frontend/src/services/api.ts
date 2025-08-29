import type { ErrorResponse } from '@/types'

// Configuração base da API
const API_BASE_URL: string = 'http://127.0.0.1:8000/api'

interface ApiError extends Error {
  status?: number
  response?: ErrorResponse | string
}
class ApiService {
  private baseURL: string

  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Método para fazer requisições HTTP
  async request<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    // Configurações padrão
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      },
      ...options
    }

    // Adicionar token de autenticação se disponível
    const token = localStorage.getItem('token')
    if (token) {
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)
      
      // Verificar se a resposta é JSON
      const contentType = response.headers.get('content-type')
      let data: unknown = null
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        data = await response.text()
      }

      if (!response.ok) {
        const errorMessage = (data as any)?.message || `HTTP error! status: ${response.status}`
        const error = new Error(errorMessage) as ApiError
        error.status = response.status
        error.response = data as ErrorResponse | string
        throw error
      }

      return data as T
    } catch (error) {
      console.error('API Request Error:', error)
      throw error
    }
  }

  // Métodos HTTP convenientes
  async get<T = unknown>(endpoint: string, params: Record<string, string | number | boolean> = {}): Promise<T> {
    const stringParams: Record<string, string> = {}
    Object.entries(params).forEach(([key, value]) => {
      stringParams[key] = String(value)
    })
    const queryString = new URLSearchParams(stringParams).toString()
    const url = queryString ? `${endpoint}?${queryString}` : endpoint
    
    return this.request<T>(url, {
      method: 'GET'
    })
  }

  async post<T = unknown>(endpoint: string, data: Record<string, unknown> | FormData = {}): Promise<T> {
    const body = data instanceof FormData ? data : JSON.stringify(data)
    return this.request<T>(endpoint, {
      method: 'POST',
      body
    })
  }

  async put<T = unknown>(endpoint: string, data: Record<string, unknown> | FormData = {}): Promise<T> {
    const body = data instanceof FormData ? data : JSON.stringify(data)
    return this.request<T>(endpoint, {
      method: 'PUT',
      body
    })
  }

  async patch<T = unknown>(endpoint: string, data: Record<string, unknown> | FormData = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  async delete<T = unknown>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE'
    })
  }

  // Método para upload de arquivos
  async upload<T = unknown>(endpoint: string, formData: FormData): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {}
    })
  }
}

// Instância singleton da API
const apiService = new ApiService()

export default apiService

// Exportar também métodos específicos para conveniência
export const { get, post, put, patch, delete: del, upload } = apiService