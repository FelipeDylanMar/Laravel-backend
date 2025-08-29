<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const logout = async () => {
  await authStore.logout()
  router.push('/login').then(() => {
    window.location.reload()
  })
}

onMounted(() => {
  authStore.checkAuth()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="navbar">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center space-x-3">
            <img src="@/assets/innyx-logo-embedded.svg" alt="INNYX Logo" class="h-8 w-auto" />
            <router-link to="/" class="text-xl font-bold text-white hover:text-innyx-primary-200 transition-colors">
              Sistema de Produtos
            </router-link>
          </div>
          
          <div class="flex items-center space-x-4" v-if="isAuthenticated">
            <router-link 
              to="/products" 
              class="text-white hover:text-innyx-primary-200 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Produtos
            </router-link>
            <button 
              @click="logout"
              class="btn-danger text-sm"
            >
              Sair
            </button>
          </div>
          
          <div class="flex items-center" v-else>
            <router-link 
              to="/login" 
              class="btn-primary text-sm"
            >
              Entrar
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>
