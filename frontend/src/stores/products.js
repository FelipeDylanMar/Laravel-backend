import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import productService from '@/services/productService'

export const useProductsStore = defineStore('products', () => {
  // Estado
  const products = ref([])
  const currentProduct = ref(null)
  const categories = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0
  })
  const filters = ref({
    search: '',
    category: null,
    sort_by: 'name',
    sort_order: 'asc'
  })

  // Getters
  const totalProducts = computed(() => pagination.value.total)
  const hasProducts = computed(() => products.value.length > 0)
  const currentPage = computed(() => pagination.value.current_page)
  const totalPages = computed(() => pagination.value.last_page)

  // Actions
  const fetchProducts = async (page = 1, customFilters = {}) => {
    isLoading.value = true
    error.value = null
    
    try {
      const params = {
        page,
        per_page: pagination.value.per_page,
        ...filters.value,
        ...customFilters
      }
      
      console.log('ProductsStore - Parâmetros finais:', params)
      const response = await productService.getProducts(params)
      
      products.value = response.data || response.products || []
      
      // Atualizar informações de paginação
      if (response.meta) {
        pagination.value = {
          current_page: response.meta.current_page,
          last_page: response.meta.last_page,
          per_page: response.meta.per_page,
          total: response.meta.total
        }
      } else if (response.pagination) {
        pagination.value = response.pagination
      }
      
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchProduct = async (id) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await productService.getProduct(id)
      currentProduct.value = response.data || response
      return currentProduct.value
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const createProduct = async (productData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await productService.createProduct(productData)
      
      // Adicionar o novo produto à lista
      const newProduct = response.data || response
      products.value.unshift(newProduct)
      
      return newProduct
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateProduct = async (id, productData) => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await productService.updateProduct(id, productData)
      const updatedProduct = response.data || response
      
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
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const deleteProduct = async (id) => {
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
      error.value = err.message
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const searchProducts = async (searchTerm) => {
    filters.value.search = searchTerm
    return await fetchProducts(1)
  }

  const filterByCategory = async (categoryId) => {
    filters.value.category = categoryId
    return await fetchProducts(1)
  }

  const sortProducts = async (sortBy, sortOrder = 'asc') => {
    filters.value.sort_by = sortBy
    filters.value.sort_order = sortOrder
    return await fetchProducts(1)
  }

  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories()
      categories.value = response.data || response
      return categories.value
    } catch (err) {
      error.value = err.message
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