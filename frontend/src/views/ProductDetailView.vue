<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                {{ product?.nome || 'Carregando...' }}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

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

      <div v-else-if="product" class="card overflow-hidden">
        <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <!-- Image Gallery -->
          <div class="flex flex-col-reverse">


            <div class="w-full">
              <div class="relative h-96 md:h-[500px] lg:h-[600px] w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-lg">
                <img
                  v-if="selectedImage && !imageError"
                  :src="selectedImage.src"
                  :alt="selectedImage.alt"
                  class="w-full h-full object-center object-cover transition-opacity duration-300"
                  @error="handleMainImageError"
                  @load="imageLoaded = true"
                  :class="{ 'opacity-0': !imageLoaded }"
                />
                <div v-if="!imageLoaded && selectedImage && !imageError" class="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
                <div v-if="!selectedImage || imageError" class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center text-gray-500">
                  <svg class="h-24 w-24 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p class="text-lg font-medium text-gray-600">Imagem não disponível</p>
                  <p class="text-sm text-gray-500 mt-1">{{ product?.nome || 'Produto' }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div class="flex items-start justify-between mb-6">
              <div class="flex-1">
                <div class="flex items-center mb-4">
                  <img src="@/assets/innyx-logo-embedded.svg" alt="INNYX" class="h-8 w-auto mr-3" />
                  <span class="text-sm text-gray-500 font-medium">Produto INNYX</span>
                </div>
                <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">{{ product.nome }}</h1>
              </div>
            </div>

            <div class="mt-6">
              <h2 class="sr-only">Informações do produto</h2>
              <div class="flex items-baseline space-x-2">
                <p class="text-4xl text-purple-600 font-bold">R$ {{ formatPrice(product.preco) }}</p>
                <span class="text-lg text-gray-500 font-medium">à vista</span>
              </div>
            </div>

            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 uppercase tracking-wide">Categoria</h3>
                <div class="mt-2">
                  <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    {{ product.category?.nome || 'Categoria não definida' }}
                  </span>
                </div>
              </div>

              <div class="bg-gray-50 rounded-lg p-4">
                <h3 class="text-sm font-medium text-gray-600 uppercase tracking-wide">Data de Validade</h3>
                <div class="mt-2">
                  <span class="text-lg font-semibold text-gray-900 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {{ formatDate(product.data_validade) }}
                  </span>
                </div>
              </div>
            </div>

            <div class="mt-8">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Descrição do Produto</h3>
              <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div class="prose prose-sm text-gray-700 leading-relaxed">
                  <p class="text-base">{{ product.descricao }}</p>
                </div>
              </div>
            </div>

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

              </div>
            </div>

            <div class="mt-10 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <router-link
                v-if="canEditProducts"
                :to="`/products/${product.id}/edit`"
                class="btn-primary flex-1 text-center inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                Editar Produto
              </router-link>
              <button
                v-if="canDeleteProducts"
                @click="deleteProduct"
                class="btn-secondary flex-1 inline-flex items-center justify-center px-6 py-3 border border-red-300 text-base font-medium rounded-lg text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Excluir
              </button>
            </div>

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

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'
import { usePermissions } from '@/composables/usePermissions'


const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const authStore = useAuthStore()
const { canEditProducts, canDeleteProducts } = usePermissions()

const imageError = ref(false)
const imageLoaded = ref(false)
const productId = computed(() => route.params.id as string)
const product = computed(() => productsStore.currentProduct)
const loading = computed(() => productsStore.isLoading)
const error = computed(() => productsStore.error)

const productImages = computed(() => {
  if (!product.value) return []
  
  const images = []
  
  
  if (product.value.imagem) {
    images.push({
      src: `http://127.0.0.1:8000/images/${product.value.imagem}`,
      alt: `${product.value.nome} - Imagem principal`
    })
  } else if (product.value.image_url) {
    images.push({
      src: product.value.image_url,
      alt: `${product.value.nome} - Imagem principal`
    })
  }
  
  
  if (images.length === 0) {
    images.push({
      src: 'https://via.placeholder.com/600x600/f3f4f6/9ca3af?text=Produto+INNYX',
      alt: 'Imagem do produto não disponível'
    })
  }
  
  return images
})

const selectedImage = computed(() => {
  return productImages.value[0] || null
})

const fetchProduct = async () => {
  try {
    await productsStore.fetchProduct(productId.value as string)
    imageError.value = false
    imageLoaded.value = false
  } catch (err) {
    console.error('ProductDetailView - Erro ao carregar produto:', err)
  }
}

const handleMainImageError = () => {
  imageError.value = true
  imageLoaded.value = false
}

const deleteProduct = async () => {
  if (!confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) {
    return
  }
  
  try {
    await productsStore.deleteProduct(productId.value as string)
    router.push('/products')
  } catch (err) {
    console.error('Erro ao excluir produto:', err)
  }
}

const formatPrice = (price: string | number | undefined) => {
  if (price === undefined || price === null) return '0,00'
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(typeof price === 'string' ? parseFloat(price) : price)
}

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return 'N/A'
  
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString))
}





onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }
  
  productsStore.clearCurrentProduct()
  productsStore.clearError()
  
  await fetchProduct()
  
  if (productsStore.error) {
    console.error('ProductDetailView - Erro ao carregar produto:', productsStore.error)
  }
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
  line-height: 1.6;
}
</style>