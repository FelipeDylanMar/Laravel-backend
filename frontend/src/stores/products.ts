import { defineStore } from 'pinia'
import { ref, computed, type Ref, type ComputedRef } from 'vue'
import productService from '@/services/productService'
import type { Product, Category, ProductFormData, PaginatedResponse } from '@/types'

interface Pagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

interface Filters {
  search: string
  category: number | null
  sort_by: string
  sort_order: 'asc' | 'desc'
}

export const useProductsStore = defineStore('products', () => {
  // Estado
  const products: Ref<Product[]> = ref([])
  const currentProduct: Ref<Product | null> = ref(null)
  const categories: Ref<Category[]> = ref([])
  const isLoading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  const pagination: Ref<Pagination> = ref({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0
  })
  const filters: Ref<Filters> = ref({
    search: '',
    category: null,
    sort_by: 'name',
    sort_order: 'asc'
  })

  // Getters
  const totalProducts: ComputedRef<number> = computed(() => pagination.value.total)
  const hasProducts: ComputedRef<boolean> = computed(() => products.value.length > 0)
  const currentPage: ComputedRef<number> = computed(() => pagination.value.current_page)
  const totalPages: ComputedRef<number> = computed(() => pagination.value.last_page)

  // Actions
  const fetchProducts = async (page: number = 1, customFilters: Partial<Filters> = {}): Promise<PaginatedResponse<Product>> => {
    isLoading.value = true
    error.value = null
    
    try {
      const params: Record<string, string | number | boolean> = {
        search: filters.value.search,
        sort_by: filters.value.sort_by,
        sort_order: filters.value.sort_order,
        page,
        per_page: 10
      }
      
      // Adicionar filtros customizados
      Object.assign(params, customFilters)
      
      // Adicionar categoria apenas se não for null
      if (filters.value.category !== null) {
        params.category = filters.value.category
      }
      
      const response = await productService.getProducts(params)
      
      products.value = response.data || []
      
      // Atualizar informações de paginação
      pagination.value = {
        current_page: response.current_page,
        last_page: response.last_page,
        per_page: response.per_page,
        total: response.total
      }
      
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      error.value = errorMessage
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchProduct = async (id: number | string): Promise<Product> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await productService.getProduct(id)
      currentProduct.value = response.data
      return currentProduct.value
    } catch (err) {
      console.error('ProductsStore - Erro capturado:', err)
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      error.value = errorMessage
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const createProduct = async (productData: ProductFormData): Promise<Product> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await productService.createProduct(productData)
      
      const newProduct = response.data
      products.value.unshift(newProduct)
      
      return newProduct
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      error.value = errorMessage
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateProduct = async (id: number | string, productData: ProductFormData): Promise<Product> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await productService.updateProduct(id, productData)
      const updatedProduct = response.data
      
      // Atualizar produto na lista
      const index = products.value.findIndex(p => p.id == id)
      if (index !== -1) {
        products.value[index] = updatedProduct
      }
      
      // Atualizar produto atual se for o mesmo
      if (currentProduct.value && currentProduct.value.id == id) {
        currentProduct.value = updatedProduct
      }
      
      return updatedProduct
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      error.value = errorMessage
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteProduct = async (id: number | string): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      await productService.deleteProduct(id)
      
      // Remover produto da lista
      products.value = products.value.filter(p => p.id != id)
      
      // Limpar produto atual se for o mesmo
      if (currentProduct.value && currentProduct.value.id == id) {
        currentProduct.value = null
      }
      
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      error.value = errorMessage
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const searchProducts = async (searchTerm: string): Promise<PaginatedResponse<Product>> => {
    filters.value.search = searchTerm
    return await fetchProducts(1)
  }

  const filterByCategory = async (categoryId: number | null): Promise<PaginatedResponse<Product>> => {
    filters.value.category = categoryId
    return await fetchProducts(1)
  }

  const sortProducts = async (sortBy: string, sortOrder: 'asc' | 'desc' = 'asc'): Promise<PaginatedResponse<Product>> => {
    filters.value.sort_by = sortBy
    filters.value.sort_order = sortOrder
    return await fetchProducts(1)
  }

  const fetchCategories = async (): Promise<Category[]> => {
    try {
      const response = await productService.getCategories()
      categories.value = response.data
      return categories.value
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      error.value = errorMessage
      throw err
    }
  }

  const clearFilters = () => {
    filters.value = {
      search: '',
      category: null,
      sort_by: 'name',
      sort_order: 'asc'
    }
  }

  const clearError = () => {
    error.value = null
  }

  const clearCurrentProduct = () => {
    currentProduct.value = null
  }

  return {
    // Estado
    products,
    currentProduct,
    categories,
    isLoading,
    error,
    pagination,
    filters,
    // Getters
    totalProducts,
    hasProducts,
    currentPage,
    totalPages,
    // Actions
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    filterByCategory,
    sortProducts,
    fetchCategories,
    clearFilters,
    clearError,
    clearCurrentProduct
  }
})