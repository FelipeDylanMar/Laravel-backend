import apiService from './api'
import type { Product, ProductFormData, Category, ApiResponse, PaginatedResponse, SuccessResponse } from '@/types'

// Serviço de produtos
class ProductService {
  // Listar produtos com paginação e filtros
  async getProducts(params: Record<string, string | number | boolean> = {}): Promise<PaginatedResponse<Product>> {
    try {
      const response = await apiService.get<PaginatedResponse<Product>>('/products', params)
      return response
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar produtos'
      throw new Error(errorMessage)
    }
  }

  // Obter um produto específico
  async getProduct(id: number | string): Promise<ApiResponse<Product>> {
    console.log('ProductService - getProduct chamado com ID:', id)
    console.log('ProductService - URL será:', `/products/${id}`)
    
    try {
      const response = await apiService.get<ApiResponse<Product>>(`/products/${id}`)
      console.log('ProductService - Resposta da API:', response)
      return response
    } catch (error: unknown) {
      console.error('ProductService - Erro na requisição:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar produto'
      throw new Error(errorMessage)
    }
  }

  // Criar novo produto
  async createProduct(productData: FormData | ProductFormData): Promise<ApiResponse<Product>> {
    try {
      // Se productData é FormData, usar upload, senão usar post normal
      if (productData instanceof FormData) {
        const response = await apiService.upload<ApiResponse<Product>>('/products', productData)
        return response
      } else {
        const data = productData as unknown as Record<string, unknown>
        const response = await apiService.post<ApiResponse<Product>>('/products', data)
        return response
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar produto'
      throw new Error(errorMessage)
    }
  }

  // Atualizar produto existente
  async updateProduct(id: number | string, productData: FormData | ProductFormData): Promise<ApiResponse<Product>> {
    try {
      const data = productData instanceof FormData ? productData : productData as unknown as Record<string, unknown>
      const response = await apiService.put<ApiResponse<Product>>(`/products/${id}`, data)
      return response
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar produto'
      throw new Error(errorMessage)
    }
  }

  // Deletar produto
  async deleteProduct(id: number | string): Promise<SuccessResponse> {
    try {
      const response = await apiService.delete<SuccessResponse>(`/products/${id}`)
      return response
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao deletar produto'
      throw new Error(errorMessage)
    }
  }

  // Upload de imagem do produto
  async uploadProductImage(id: number | string, imageFile: File): Promise<ApiResponse<Product>> {
    try {
      const formData = new FormData()
      formData.append('image', imageFile)
      
      const response = await apiService.upload<ApiResponse<Product>>(`/products/${id}/image`, formData)
      return response
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao fazer upload da imagem'
      throw new Error(errorMessage)
    }
  }

  // Buscar produtos por termo
  async searchProducts(searchTerm: string, params: Record<string, string | number | boolean> = {}): Promise<PaginatedResponse<Product>> {
    try {
      const searchParams = {
        search: searchTerm,
        ...params
      }
      const response = await apiService.get<PaginatedResponse<Product>>('/products/search', searchParams)
      return response
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar produtos'
      throw new Error(errorMessage)
    }
  }

  // Obter categorias de produtos
  async getCategories(): Promise<ApiResponse<Category[]>> {
    try {
      const response = await apiService.get<ApiResponse<Category[]>>('/categories')
      return response
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar categorias'
      throw new Error(errorMessage)
    }
  }

  // Filtrar produtos por categoria
  async getProductsByCategory(categoryId: number | string, params: Record<string, string | number | boolean> = {}): Promise<PaginatedResponse<Product>> {
    try {
      const response = await apiService.get<PaginatedResponse<Product>>(`/products/category/${categoryId}`, params)
      return response
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar produtos por categoria'
      throw new Error(errorMessage)
    }
  }

  // Obter produtos em destaque
  async getFeaturedProducts(limit: number = 10): Promise<ApiResponse<Product[]>> {
    try {
      const response = await apiService.get<ApiResponse<Product[]>>('/products/featured', { limit })
      return response
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar produtos em destaque'
      throw new Error(errorMessage)
    }
  }

  // Validar dados do produto antes de enviar
  validateProduct(productData: Partial<ProductFormData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!productData.name || productData.name.trim().length < 3) {
      errors.push('Nome deve ter pelo menos 3 caracteres')
    }

    if (!productData.description || productData.description.trim().length < 10) {
      errors.push('Descrição deve ter pelo menos 10 caracteres')
    }

    if (!productData.price || Number(productData.price) <= 0) {
      errors.push('Preço deve ser maior que zero')
    }

    if (!productData.category_id) {
      errors.push('Categoria é obrigatória')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}

// Instância singleton do serviço de produtos
const productService = new ProductService()

export default productService