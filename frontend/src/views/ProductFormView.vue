<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <nav class="flex" aria-label="Breadcrumb">
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
                <span class="ml-4 text-sm font-medium text-gray-500">
                  {{ isEditing ? 'Editar Produto' : 'Novo Produto' }}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div class="mt-4">
          <div class="flex items-center space-x-3 mb-2">
            <img src="@/assets/innyx-logo-embedded.svg" alt="INNYX Logo" class="h-8 w-auto mr-3" />
            <h1 class="text-2xl font-semibold text-gray-900">
              {{ isEditing ? 'Editar Produto' : 'Novo Produto' }}
            </h1>
          </div>
          <p class="mt-2 text-sm text-gray-700">
            {{ isEditing ? 'Atualize as informações do produto.' : 'Preencha as informações para criar um novo produto.' }}
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-innyx-primary-600"></div>
      </div>

      <!-- Form -->
      <div v-else class="card">
        <form @submit.prevent="handleSubmit" class="space-y-6 p-6">
          <!-- Name -->
          <div>
            <label for="nome" class="block text-sm font-medium text-gray-700">
              Nome do Produto *
            </label>
            <div class="mt-1">
              <input
                id="nome"
                v-model="form.nome"
                type="text"
                required
                class="input-field"
                :class="{ 'border-red-300': errors.nome }"
                placeholder="Digite o nome do produto"
              />
              <p v-if="errors.nome" class="mt-2 text-sm text-red-600">{{ errors.nome }}</p>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label for="descricao" class="block text-sm font-medium text-gray-700">
              Descrição *
            </label>
            <div class="mt-1">
              <textarea
                id="descricao"
                v-model="form.descricao"
                rows="4"
                required
                maxlength="200"
                class="input-field"
                :class="{ 'border-red-300': errors.descricao }"
                placeholder="Digite a descrição do produto"
              ></textarea>
              <div class="flex justify-between items-center mt-1">
                <p v-if="errors.descricao" class="text-sm text-red-600">{{ errors.descricao }}</p>
                <p class="text-sm text-gray-500 ml-auto">
                  {{ form.descricao.length }}/200 caracteres
                </p>
              </div>
            </div>
          </div>

          <!-- Price -->
          <div>
            <label for="preco" class="block text-sm font-medium text-gray-700">
              Preço (R$) *
            </label>
            <div class="mt-1">
              <input
                id="preco"
                v-model="form.preco"
                type="number"
                step="0.01"
                min="0"
                required
                class="input-field"
                :class="{ 'border-red-300': errors.preco }"
                placeholder="0,00"
              />
              <p v-if="errors.preco" class="mt-2 text-sm text-red-600">{{ errors.preco }}</p>
            </div>
          </div>

          <!-- Category -->
          <div>
            <label for="category_id" class="block text-sm font-medium text-gray-700">
              Categoria *
            </label>
            <div class="mt-1">
              <select
                id="category_id"
                v-model="form.category_id"
                required
                class="input-field"
                :class="{ 'border-red-300': errors.category_id }"
              >
                <option value="">Selecione uma categoria</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.nome }}
                </option>
              </select>
              <p v-if="errors.category_id" class="mt-2 text-sm text-red-600">{{ errors.category_id }}</p>
            </div>
          </div>

          <!-- Data de Validade -->
          <div>
            <label for="data_validade" class="block text-sm font-medium text-gray-700">
              Data de Validade *
            </label>
            <div class="mt-1">
              <input
                id="data_validade"
                v-model="form.data_validade"
                type="date"
                required
                class="input-field"
                :class="{ 'border-red-300': errors.data_validade }"
              />
              <p v-if="errors.data_validade" class="mt-2 text-sm text-red-600">{{ errors.data_validade }}</p>
            </div>
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Imagem do Produto
            </label>
            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
              <div class="space-y-1 text-center">
                <div v-if="imagePreview" class="mb-4">
                  <img :src="imagePreview" alt="Preview" class="mx-auto h-32 w-32 object-cover rounded-md" />
                  <button
                    type="button"
                    @click="removeImage"
                    class="mt-2 text-sm text-red-600 hover:text-red-500"
                  >
                    Remover imagem
                  </button>
                </div>
                <div v-else>
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label for="image" class="relative cursor-pointer bg-white rounded-md font-medium text-innyx-primary-600 hover:text-innyx-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-innyx-primary-500">
                      <span>Enviar uma imagem</span>
                      <input
                        id="image"
                        ref="imageInput"
                        type="file"
                        accept="image/*"
                        class="sr-only"
                        @change="handleImageUpload"
                      />
                    </label>
                    <p class="pl-1">ou arraste e solte</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                </div>
              </div>
            </div>
            <p v-if="errors.image" class="mt-2 text-sm text-red-600">{{ errors.image }}</p>
          </div>



          <!-- Error Message -->
          <div v-if="submitError" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">{{ submitError }}</h3>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <router-link
              to="/products"
              class="btn-secondary"
            >
              Cancelar
            </router-link>

            <button
              type="submit"
              :disabled="submitting"
              class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="submitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isEditing ? 'Atualizando...' : 'Criando...' }}
              </span>
              <span v-else>
                {{ isEditing ? 'Atualizar Produto' : 'Criar Produto' }}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import productService from '@/services/productService'
import type { Category, ProductFormData } from '@/types'

const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()

const loading = ref(false)
const submitting = ref(false)
const submitError = ref('')
const imagePreview = ref('')
const imageInput = ref<HTMLInputElement | null>(null)
const categories = ref<Category[]>([])

const form = reactive<ProductFormData & { image: File | null }>({
  nome: '',
  descricao: '',
  preco: '',
  category_id: '',
  data_validade: '',
  image: null
})

const errors = reactive<Record<string, string>>({
  nome: '',
  descricao: '',
  preco: '',
  category_id: '',
  data_validade: '',
  image: ''
})

const isEditing = computed(() => !!route.params.id)
const productId = computed(() => route.params.id as string)

const loadCategories = async () => {
  try {
    const response = await productService.getCategories()
    categories.value = (response as any) || []
  } catch (error) {
    console.error('Erro ao carregar categorias:', error)
    categories.value = [
      { id: 1, nome: 'Eletrônicos', name: 'Eletrônicos' },
      { id: 2, nome: 'Roupas', name: 'Roupas' },
      { id: 3, nome: 'Livros', name: 'Livros' },
      { id: 4, nome: 'Casa e Jardim', name: 'Casa e Jardim' },
      { id: 5, nome: 'Esportes', name: 'Esportes' },
      { id: 6, nome: 'Brinquedos', name: 'Brinquedos' },
      { id: 7, nome: 'Outros', name: 'Outros' }
    ]
  }
}

const fetchProduct = async () => {
  if (!isEditing.value) return
  
  loading.value = true
  
  try {
    await productsStore.fetchProduct(productId.value as string)
    
    if (productsStore.currentProduct) {
      Object.assign(form, {
        nome: productsStore.currentProduct.nome || '',
        descricao: productsStore.currentProduct.descricao || '',
        preco: productsStore.currentProduct.preco || '',
        category_id: productsStore.currentProduct.category_id || '',
        data_validade: productsStore.currentProduct.data_validade || '',
        image: null
      })
      if (productsStore.currentProduct.image_url) {
        imagePreview.value = productsStore.currentProduct.image_url
      } else if (productsStore.currentProduct.imagem) {
        imagePreview.value = `http://127.0.0.1:8000/images/${productsStore.currentProduct.imagem}`
      }
    }
  } catch (err) {
    submitError.value = productsStore.error || 'Erro ao carregar produto'
  } finally {
    loading.value = false
  }
}

const validateForm = () => {
  Object.keys(errors).forEach((key: string) => {
    errors[key] = ''
  })
  
  let isValid = true
  
  if (!form.nome.trim()) {
    errors.nome = 'Nome é obrigatório'
    isValid = false
  }
  
  if (!form.descricao.trim()) {
    errors.descricao = 'Descrição é obrigatória'
    isValid = false
  } else if (form.descricao.length > 200) {
    errors.descricao = 'Descrição deve ter no máximo 200 caracteres'
    isValid = false
  }
  
  if (!form.preco || parseFloat(form.preco.toString()) <= 0) {
    errors.preco = 'Preço deve ser maior que zero'
    isValid = false
  }
  
  if (!form.category_id) {
    errors.category_id = 'Categoria é obrigatória'
    isValid = false
  }
  
  if (!form.data_validade) {
    errors.data_validade = 'Data de validade é obrigatória'
    isValid = false
  }
  
  return isValid
}



const handleSubmit = async () => {
  if (!validateForm()) return
  
  submitting.value = true
  submitError.value = ''
  
  try {
    if (isEditing.value) {
      const productData = {
          nome: form.nome,
          descricao: form.descricao,
          preco: parseFloat(form.preco.toString()),
          data_validade: form.data_validade,
          category_id: parseInt(form.category_id.toString())
        }
      
      await productsStore.updateProduct(productId.value as string, productData)
      
      if (form.image) {
      }
    } else {
      const formData = new FormData()
      formData.append('nome', form.nome)
      formData.append('descricao', form.descricao)
      formData.append('preco', form.preco.toString())
      formData.append('data_validade', form.data_validade)
      formData.append('categoria_id', form.category_id.toString())
      
      if (form.image) {
        formData.append('imagem', form.image)
      }
      
      await productsStore.createProduct(formData as any)
    }
    
    router.push('/products')
  } catch (err: any) {
    if (err?.response && typeof err.response === 'object') {
      const backendErrors = err.response as any
      
      if (backendErrors.errors) {
        Object.keys(backendErrors.errors).forEach(field => {
          if (field === 'descricao' && backendErrors.errors[field].includes('200')) {
            errors.descricao = 'Descrição deve ter no máximo 200 caracteres'
          } else if (errors.hasOwnProperty(field)) {
            errors[field] = backendErrors.errors[field][0] || backendErrors.errors[field]
          }
        })
        submitError.value = 'Por favor, corrija os erros nos campos destacados'
      } else {
        submitError.value = backendErrors.message || 'Erro de validação do servidor'
      }
    } else {
      submitError.value = productsStore.error || err?.message || 'Erro ao salvar produto'
    }
  } finally {
    submitting.value = false
  }
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return
  
  if (!file.type.startsWith('image/')) {
    errors.image = 'Por favor, selecione um arquivo de imagem'
    return
  }
  
  if (file.size > 10 * 1024 * 1024) {
    errors.image = 'A imagem deve ter no máximo 10MB'
    return
  }
  
  form.image = file
  errors.image = ''
  
  const reader = new FileReader()
  reader.onload = (e: ProgressEvent<FileReader>) => {
    if (e.target?.result) {
      imagePreview.value = e.target.result as string
    }
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  form.image = null
  imagePreview.value = ''
  errors.image = ''
  
  if (imageInput.value) {
    imageInput.value.value = ''
  }
}

onMounted(() => {
  productsStore.clearCurrentProduct()
  productsStore.clearError()
  
  if (!isEditing.value) {
    const today = new Date()
    const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    form.data_validade = nextYear.toISOString().split('T')[0]
  }
  
  loadCategories()
  fetchProduct()
})
</script>