import apiService from './api.js'

// Serviço de produtos
class ProductService {
  // Listar produtos com paginação e filtros
  async getProducts(params = {}) {
    try {
      const response = await apiService.get('/products', params)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao carregar produtos')
    }
  }

  // Obter um produto específico
  async getProduct(id) {
    try {
      const response = await apiService.get(`/products/${id}`)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao carregar produto')
    }
  }

  // Criar novo produto
  async createProduct(productData) {
    try {
      const response = await apiService.post('/products', productData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao criar produto')
    }
  }

  // Atualizar produto existente
  async updateProduct(id, productData) {
    try {
      const response = await apiService.put(`/products/${id}`, productData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao atualizar produto')
    }
  }

  // Deletar produto
  async deleteProduct(id) {
    try {
      const response = await apiService.delete(`/products/${id}`)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao deletar produto')
    }
  }

  // Upload de imagem do produto
  async uploadProductImage(id, imageFile) {
    try {
      const formData = new FormData()
      formData.append('image', imageFile)
      
      const response = await apiService.upload(`/products/${id}/image`, formData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao fazer upload da imagem')
    }
  }

  // Buscar produtos por termo
  async searchProducts(searchTerm, params = {}) {
    try {
      const searchParams = {
        search: searchTerm,
        ...params
      }
      const response = await apiService.get('/products/search', searchParams)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao buscar produtos')
    }
  }

  // Obter categorias de produtos
  async getCategories() {
    try {
      const response = await apiService.get('/products/categories')
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao carregar categorias')
    }
  }

  // Filtrar produtos por categoria
  async getProductsByCategory(categoryId, params = {}) {
    try {
      const response = await apiService.get(`/products/category/${categoryId}`, params)
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao carregar produtos da categoria')
    }
  }

  // Obter produtos em destaque
  async getFeaturedProducts(limit = 10) {
    try {
      const response = await apiService.get('/products/featured', { limit })
      return response
    } catch (error) {
      throw new Error(error.message || 'Erro ao carregar produtos em destaque')
    }
  }

  // Validar dados do produto antes de enviar
  validateProduct(productData) {
    const errors = []

    if (!productData.name || productData.name.trim().length < 3) {
      errors.push('Nome deve ter pelo menos 3 caracteres')
    }

    if (!productData.description || productData.description.trim().length < 10) {
      errors.push('Descrição deve ter pelo menos 10 caracteres')
    }

    if (!productData.price || productData.price <= 0) {
      errors.push('Preço deve ser maior que zero')
    }

    if (!productData.quantity || productData.quantity < 0) {
      errors.push('Quantidade não pode ser negativa')
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