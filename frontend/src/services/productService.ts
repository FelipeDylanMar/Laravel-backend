import apiService from './api'
import type { 
  Product, 
  ProductFormData, 
  Category, 
  ApiResponse, 
  PaginatedResponse, 
  SuccessResponse 
} from '@/types'

class ProductService {
  async getProducts(params: Record<string, string | number | boolean> = {}): Promise<PaginatedResponse<Product>> {
    try {
      const response = await apiService.get<PaginatedResponse<Product>>('/products', params)
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao buscar produtos')
      throw new Error(errorMessage)
    }
  }

  async getProduct(id: number | string): Promise<ApiResponse<Product>> {
    try {
      const response = await apiService.get<ApiResponse<Product>>(`/products/${id}`)
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao buscar produto')
      throw new Error(errorMessage)
    }
  }

  async createProduct(productData: ProductFormData | FormData): Promise<Product> {
    try {
      const formData = productData instanceof FormData ? productData : this.convertToFormData(productData)
      const response = await apiService.post<ApiResponse<Product>>('/products', formData)
      return response.data
    } catch (error) {
      throw new Error(this.extractErrorMessage(error, 'Erro ao criar produto'))
    }
  }

  private convertToFormData(productData: ProductFormData): FormData {
    const formData = new FormData()
    
    Object.entries(productData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, String(value))
        }
      }
    })
    
    return formData
  }

  async updateProduct(id: number | string, productData: ProductFormData | FormData): Promise<Product> {
    try {
      if (productData instanceof FormData) {
        productData.append('_method', 'PUT')
        const response = await apiService.post<Product>(`/products/${id}`, productData)
        return response
      } else {
        const response = await apiService.put<Product>(`/products/${id}`, productData)
        return response
      }
    } catch (error) {
      throw new Error(this.extractErrorMessage(error, 'Erro ao atualizar produto'))
    }
  }

  async deleteProduct(id: number | string): Promise<SuccessResponse> {
    try {
      const response = await apiService.delete<SuccessResponse>(`/products/${id}`)
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao deletar produto')
      throw new Error(errorMessage)
    }
  }

  async uploadProductImage(id: number | string, imageFile: File): Promise<ApiResponse<Product>> {
    try {
      const response = await apiService.upload<ApiResponse<Product>>(`/products/${id}/image`, imageFile)
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao fazer upload da imagem')
      throw new Error(errorMessage)
    }
  }

  async searchProducts(searchTerm: string, params: Record<string, string | number | boolean> = {}): Promise<PaginatedResponse<Product>> {
    try {
      const searchParams = {
        search: searchTerm,
        ...params
      }
      const response = await apiService.get<PaginatedResponse<Product>>('/products/search', searchParams)
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao buscar produtos')
      throw new Error(errorMessage)
    }
  }

  async getCategories(): Promise<ApiResponse<Category[]>> {
    try {
      const response = await apiService.get<ApiResponse<Category[]>>('/categories')
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao buscar categorias')
      throw new Error(errorMessage)
    }
  }

  async getProductsByCategory(categoryId: number | string, params: Record<string, string | number | boolean> = {}): Promise<PaginatedResponse<Product>> {
    try {
      const response = await apiService.get<PaginatedResponse<Product>>(`/products/category/${categoryId}`, params)
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao buscar produtos por categoria')
      throw new Error(errorMessage)
    }
  }

  async getFeaturedProducts(limit: number = 10): Promise<ApiResponse<Product[]>> {
    try {
      const response = await apiService.get<ApiResponse<Product[]>>('/products/featured', { limit })
      return response
    } catch (error: unknown) {
      const errorMessage = this.extractErrorMessage(error, 'Erro ao buscar produtos em destaque')
      throw new Error(errorMessage)
    }
  }

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

    if (productData.stock !== undefined && Number(productData.stock) < 0) {
      errors.push('Estoque não pode ser negativo')
    }

    return {
      isValid: errors.length === 0,
      errors
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

const productService = new ProductService()
export default productService