<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <div class="flex items-center space-x-3 mb-2">
            <img src="@/assets/innyx-logo-embedded.svg" alt="INNYX Logo" class="h-8 w-auto mr-3" />
            <h1 class="text-2xl font-semibold text-gray-900">Produtos</h1>
          </div>
          <p class="mt-2 text-sm text-gray-700">
            Lista de todos os produtos cadastrados no sistema.
          </p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <router-link
            to="/products/new"
            class="btn-primary text-sm"
            @click="handleAddProduct"
          >
            Adicionar Produto
          </router-link>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="mt-8">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <label for="search" class="sr-only">Buscar produtos</label>
            <div class="relative">
              <input
                id="search"
                v-model="searchQuery"
                type="text"
                placeholder="Buscar por nome ou descrição..."
                class="input-field pr-10"
                @input="handleSearch"
              />
              <div v-show="!searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <select
              v-model="sortBy"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              @change="handleSort"
            >
              <option value="name">Nome</option>
              <option value="price">Preço</option>
              <option value="created_at">Data de Criação</option>
            </select>
            <button
              @click="toggleSortOrder"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                class="h-4 w-4"
                :class="{ 'transform rotate-180': sortOrder === 'desc' }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="mt-8 flex justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="mt-8 rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else-if="products.length > 0" class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <div
          v-for="product in products"
          :key="product.id"
          class="card hover:shadow-lg transition-shadow duration-200 flex flex-col h-full"
        >
          <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 rounded-t-lg">
            <img
              v-if="product.image_url || product.imagem"
              :src="product.image_url || (product.imagem ? `http://127.0.0.1:8000/images/${product.imagem}` : '')"
              :alt="product.nome || product.name"
              class="h-48 w-full object-cover object-center"
            />
            <div v-else class="h-48 w-full bg-gray-200 flex items-center justify-center">
              <svg class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div class="p-4 flex flex-col flex-grow">
            <h3 class="text-base font-medium text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">{{ product.nome || product.name }}</h3>
            <p class="text-sm text-gray-500 line-clamp-3 flex-grow mb-3 min-h-[3.75rem]">{{ product.descricao || product.description }}</p>
            <div class="mt-auto">
              <div class="flex items-center justify-between mb-3">
                <p class="text-lg font-semibold text-gray-900 truncate">
                  R$ {{ formatPrice(product.preco || product.price) }}
                </p>
              </div>
              <div class="flex flex-wrap gap-2 justify-center">
                <router-link
                  :to="`/products/${product.id}`"
                  class="text-innyx-primary-600 hover:text-innyx-primary-800 text-xs font-medium transition-colors px-2 py-1 bg-innyx-primary-50 rounded hover:bg-innyx-primary-100"
                >
                  Ver
                </router-link>
                <router-link
                  :to="`/products/${product.id}/edit`"
                  class="text-innyx-secondary-600 hover:text-innyx-secondary-800 text-xs font-medium transition-colors px-2 py-1 bg-innyx-secondary-50 rounded hover:bg-innyx-secondary-100"
                >
                  Editar
                </router-link>
                <button
                  @click="deleteProduct(product.id)"
                  class="text-red-600 hover:text-red-900 text-xs font-medium transition-colors px-2 py-1 bg-red-50 rounded hover:bg-red-100"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="mt-8 text-center">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhum produto encontrado</h3>
        <p class="mt-1 text-sm text-gray-500">Comece criando um novo produto.</p>
        <div class="mt-6">
          <router-link
            to="/products/new"
            class="btn-primary text-sm"
          >
            Adicionar Produto
          </router-link>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Mostrando
              <span class="font-medium">{{ (currentPage - 1) * perPage + 1 }}</span>
              até
              <span class="font-medium">{{ Math.min(currentPage * perPage, total) }}</span>
              de
              <span class="font-medium">{{ total }}</span>
              resultados
            </p>
          </div>
          <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Anterior</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  page === currentPage
                    ? 'z-10 bg-innyx-primary-50 border-innyx-primary-500 text-innyx-primary-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-innyx-primary-50',
                  'relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Próximo</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const productsStore = useProductsStore()
const authStore = useAuthStore()

// State
const searchQuery = ref('')
const sortBy = ref('name')
const sortOrder = ref('asc')

// Computed properties from store
const products = computed(() => productsStore.products)
const loading = computed(() => productsStore.isLoading)
const error = computed(() => productsStore.error)
const currentPage = computed(() => productsStore.currentPage)
const totalPages = computed(() => productsStore.totalPages)
const total = computed(() => productsStore.totalProducts)
const perPage = computed(() => productsStore.pagination.per_page)

// Computed
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const fetchProducts = async (page = currentPage.value) => {
  try {
    const filters = {
      search: searchQuery.value,
      sort_by: sortBy.value,
      sort_order: sortOrder.value
    }
    console.log('ProductsView - Enviando filtros:', filters)
    await productsStore.fetchProducts(page, filters)
  } catch (err) {
    console.error('Erro ao carregar produtos:', err)
  }
}

const handleSearch = () => {
  fetchProducts(1)
}

const handleSort = () => {
  fetchProducts(1)
}

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  fetchProducts(1)
}

const goToPage = (page) => {
  fetchProducts(page)
}

const previousPage = () => {
  if (currentPage.value > 1) {
    fetchProducts(currentPage.value - 1)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    fetchProducts(currentPage.value + 1)
  }
}

const deleteProduct = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este produto?')) {
    return
  }
  
  try {
    await productsStore.deleteProduct(id)
    // Recarregar a página atual após exclusão
    await fetchProducts()
  } catch (err) {
    console.error('Erro ao excluir produto:', err)
  }
}

const formatPrice = (price) => {
  const numericPrice = parseFloat(price)
  if (isNaN(numericPrice) || numericPrice < 0) {
    return '0,00'
  }
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericPrice)
}

const handleAddProduct = () => {
  console.log('Botão Adicionar Produto clicado')
  console.log('Estado de autenticação:', authStore.isAuthenticated)
  console.log('Token:', authStore.token)
  console.log('Usuário:', authStore.user)
  console.log('Tentando navegar para /products/new')
  router.push('/products/new')
}

// Lifecycle
onMounted(() => {
  fetchProducts()
})

// Watchers
watch(searchQuery, () => {
  // Debounce search
  clearTimeout(window.searchTimeout)
  window.searchTimeout = setTimeout(() => {
    handleSearch()
  }, 300)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>