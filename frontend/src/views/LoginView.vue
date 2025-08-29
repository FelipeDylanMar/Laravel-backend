<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <!-- Bloco de Informações de Teste -->
        <div class="order-2 lg:order-1">
          <div class="card bg-innyx-primary-50 border-innyx-primary-200">
            <div class="text-center mb-6">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-innyx-primary-100 mb-4">
                <svg class="h-6 w-6 text-innyx-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-innyx-primary-900 mb-2">
                Credenciais para Teste
              </h3>
              <p class="text-sm text-innyx-primary-700 mb-6">
                Use as credenciais abaixo para acessar o sistema de demonstração
              </p>
            </div>
            
            <div class="space-y-4">
              <!-- Administrador -->
              <div class="bg-white rounded-lg p-4 border border-red-200">
                <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg class="h-4 w-4 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  Administrador
                  <span class="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Acesso Total</span>
                </h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Email:</span>
                    <code class="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono cursor-pointer hover:bg-gray-200" onclick="navigator.clipboard.writeText('admin@example.com')">admin@example.com</code>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Senha:</span>
                    <code class="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono cursor-pointer hover:bg-gray-200" onclick="navigator.clipboard.writeText('password')">password</code>
                  </div>
                  <p class="text-xs text-gray-500 mt-2">✓ Gerenciar usuários, produtos, categorias e configurações do sistema</p>
                </div>
              </div>
              
              <!-- Gerente -->
              <div class="bg-white rounded-lg p-4 border border-blue-200">
                <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg class="h-4 w-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10"></path>
                  </svg>
                  Gerente
                  <span class="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Gerenciamento</span>
                </h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Email:</span>
                    <code class="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono cursor-pointer hover:bg-gray-200" onclick="navigator.clipboard.writeText('manager@example.com')">manager@example.com</code>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Senha:</span>
                    <code class="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono cursor-pointer hover:bg-gray-200" onclick="navigator.clipboard.writeText('password')">password</code>
                  </div>
                  <p class="text-xs text-gray-500 mt-2">✓ Criar, editar e excluir produtos e categorias</p>
                </div>
              </div>
              
              <!-- Usuário Comum -->
              <div class="bg-white rounded-lg p-4 border border-green-200">
                <h4 class="font-semibold text-gray-900 mb-3 flex items-center">
                  <svg class="h-4 w-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Usuário
                  <span class="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Visualização</span>
                </h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Email:</span>
                    <code class="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono cursor-pointer hover:bg-gray-200" onclick="navigator.clipboard.writeText('user@example.com')">user@example.com</code>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-gray-600">Senha:</span>
                    <code class="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono cursor-pointer hover:bg-gray-200" onclick="navigator.clipboard.writeText('password')">password</code>
                  </div>
                  <p class="text-xs text-gray-500 mt-2">✓ Visualizar produtos e categorias (acesso básico)</p>
                </div>
              </div>
            </div>
            
            <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div class="flex items-start">
                <svg class="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <div>
                  <h5 class="text-sm font-medium text-yellow-800 mb-1">Ambiente de Teste</h5>
                  <p class="text-xs text-yellow-700">
                    Este é um ambiente de demonstração. Os dados são fictícios e podem ser resetados a qualquer momento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="order-1 lg:order-2">
          <div class="max-w-md mx-auto space-y-8">
            <div class="card">
        <div class="text-center mb-6">
          <div class="flex justify-center mb-6">
            <img src="@/assets/innyx-logo-embedded.svg" alt="INNYX Logo" class="h-12 w-auto" />
          </div>
          <h2 class="text-3xl font-extrabold text-gray-900">
            Entrar na sua conta
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Ou
            <router-link to="/" class="font-medium text-innyx-primary-600 hover:text-innyx-primary-500">
              voltar para a página inicial
            </router-link>
          </p>
        </div>
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="input-field"
                placeholder="Endereço de email"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="input-field"
                placeholder="Senha"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.remember"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-innyx-primary-600 focus:ring-innyx-primary-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Lembrar de mim
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="btn-primary w-full flex justify-center relative disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="animate-spin h-5 w-5 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ loading ? 'Entrando...' : 'Entrar' }}
            </button>
          </div>

          <div v-if="error" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  {{ error }}
                </h3>
              </div>
            </div>
          </div>
        </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const loading = computed(() => authStore.isLoading)
const error = computed(() => authStore.error)

const handleLogin = async () => {
  authStore.clearError()
  
  try {
    await authStore.login({
      email: form.email,
      password: form.password
    })
    
    router.push('/products')
  } catch (err) {

  }
}
</script>