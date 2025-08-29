<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import UserProfile from '@/components/UserProfile.vue'

const authStore = useAuthStore()
const isInitializing = ref(true)

const isAuthenticated = computed(() => authStore.isAuthenticated)

onMounted(async () => {
  try {
    await authStore.checkAuth()
  } finally {
    isInitializing.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading Screen -->
    <div v-if="isInitializing" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="flex justify-center mb-4">
          <img src="@/assets/innyx-logo-embedded.svg" alt="INNYX Logo" class="h-12 w-auto" />
        </div>
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-innyx-primary-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Carregando...</p>
      </div>
    </div>

    <!-- Main App -->
    <div v-else>
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
              <UserProfile />
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
  </div>
</template>
