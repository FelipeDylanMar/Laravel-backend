<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-8" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-4">
          <li>
            <div>
              <router-link to="/products" class="text-gray-400 hover:text-gray-500">
                <svg class="flex-shrink-0 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span class="sr-only">Produtos</span>
              </router-link>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <router-link to="/products" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                Produtos
              </router-link>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <span class="ml-4 text-sm font-medium text-gray-500 truncate">
                {{ product?.name || 'Carregando...' }}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="rounded-md bg-red-50 p-4">
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

      <!-- Product Detail -->
      <div v-else-if="product" class="card overflow-hidden">
        <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <!-- Image Gallery -->
          <div class="flex flex-col-reverse">
            <!-- Image selector -->
            <div class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <div class="grid grid-cols-4 gap-6" aria-orientation="horizontal">
                <button
                  v-for="(image, index) in productImages"
                  :key="index"
                  class="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                  :class="{
                    'ring-2 ring-indigo-500': selectedImageIndex === index,
                    'ring-1 ring-gray-300': selectedImageIndex !== index
                  }"
                  @click="selectedImageIndex = index"
                >
                  <span class="sr-only">{{ image.alt }}</span>
                  <span class="absolute inset-0 rounded-md overflow-hidden">
                    <img :src="image.src" :alt="image.alt" class="w-full h-full object-center object-cover" />
                  </span>
                </button>
              </div>
            </div>

            <!-- Main image -->
            <div class="w-full aspect-w-1 aspect-h-1">
              <div class="h-96 w-full overflow-hidden bg-gray-200 rounded-lg">
                <img
                  v-if="selectedImage"
                  :src="selectedImage.src"
                  :alt="selectedImage.alt"
                  class="w-full h-full object-center object-cover"
                />
                <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                  <svg class="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Product info -->
          <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div class="flex items-center justify-between">
              <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ product.name }}</h1>
              <div class="flex items-center space-x-2">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-800': product.is_active,
                    'bg-red-100 text-red-800': !product.is_active
                  }"
                >
                  {{ product.is_active ? 'Ativo' : 'Inativo' }}
                </span>
              </div>
            </div>

            <div class="mt-3">
              <h2 class="sr-only">Informações do produto</h2>
              <p class="text-3xl text-gray-900 font-bold">R$ {{ formatPrice(product.price) }}</p>
            </div>

            <!-- Category -->
            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-900">Categoria</h3>
              <div class="mt-2">
                <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {{ getCategoryName(product.category) }}
                </span>
              </div>
            </div>

            <!-- Stock -->
            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-900">Estoque</h3>
              <div class="mt-2 flex items-center">
                <span class="text-lg font-medium text-gray-900">{{ product.stock_quantity }} unidades</span>
                <span
                  class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-800': product.stock_quantity > 10,
                    'bg-yellow-100 text-yellow-800': product.stock_quantity > 0 && product.stock_quantity <= 10,
                    'bg-red-100 text-red-800': product.stock_quantity === 0
                  }"
                >
                  {{ getStockStatus(product.stock_quantity) }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-900">Descrição</h3>
              <div class="mt-2 prose prose-sm text-gray-500">
                <p>{{ product.description }}</p>
              </div>
            </div>

            <!-- Metadata -->
            <div class="mt-8 border-t border-gray-200 pt-8">
              <h3 class="text-sm font-medium text-gray-900">Informações Adicionais</h3>
              <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt class="text-sm font-medium text-gray-500">ID do Produto</dt>
                  <dd class="mt-1 text-sm text-gray-900">#{{ product.id }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Data de Criação</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ formatDate(product.created_at) }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Última Atualização</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ formatDate(product.updated_at) }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">SKU</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ product.sku || 'N/A' }}</dd>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-8 flex space-x-3">
              <router-link
                :to="`/products/${product.id}/edit`"
                class="btn-primary flex-1 text-center"
              >
                Editar Produto
              </router-link>
              <button
                @click="deleteProduct"
                class="btn-secondary flex-1"
              >
                Excluir
              </button>
            </div>

            <!-- Back to products -->
            <div class="mt-6">
              <router-link
                to="/products"
                class="text-blue-600 hover:text-blue-500 text-sm font-medium flex items-center transition-colors"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar para produtos
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

// State
const selectedImageIndex = ref(0)

// Computed
const productId = computed(() => route.params.id)
const product = computed(() => productsStore.currentProduct)
const loading = computed(() => productsStore.isLoading)
const error = computed(() => productsStore.error)

const productImages = computed(() => {
  if (!product.value) return []
  
  // Se o produto tem imagem, usar ela, senão usar placeholder
  if (product.value.image) {
    return [
      {
        src: product.value.image,
        alt: product.value.name
      }
    ]
  }
  
  // Placeholder images
  return [
    {
      src: 'https://via.placeholder.com/400x400?text=Produto',
      alt: 'Imagem do produto'
    }
  ]
})

const selectedImage = computed(() => {
  return productImages.value[selectedImageIndex.value] || null
})

// Methods
const fetchProduct = async () => {
  try {
    await productsStore.fetchProduct(productId.value)
  } catch (err) {
    console.error('Erro ao carregar produto:', err)
  }
}

const deleteProduct = async () => {
  if (!confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) {
    return
  }
  
  try {
    await productsStore.deleteProduct(productId.value)
    // Redirecionar para lista de produtos
    router.push('/products')
  } catch (err) {
    console.error('Erro ao excluir produto:', err)
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString))
}

const getCategoryName = (category) => {
  const categories = {
    electronics: 'Eletrônicos',
    clothing: 'Roupas',
    books: 'Livros',
    home: 'Casa e Jardim',
    sports: 'Esportes',
    toys: 'Brinquedos',
    other: 'Outros'
  }
  
  return categories[category] || category
}

const getStockStatus = (quantity) => {
  if (quantity === 0) return 'Esgotado'
  if (quantity <= 10) return 'Estoque Baixo'
  return 'Em Estoque'
}

// Lifecycle
onMounted(() => {
  // Clear any previous product data
  productsStore.clearCurrentProduct()
  productsStore.clearError()
  
  fetchProduct()
})
</script>

<style scoped>
.aspect-w-1 {
  position: relative;
  padding-bottom: 100%;
}

.aspect-h-1 {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.prose {
  max-width: none;
}

.prose p {
  margin-top: 0;
  margin-bottom: 0;
}
</style>