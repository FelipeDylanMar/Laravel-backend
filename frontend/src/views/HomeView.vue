<script setup>
import { computed } from 'vue'

const isAuthenticated = computed(() => {
  return localStorage.getItem('auth_token') !== null
})
</script>

<template>
  <div class="px-4 py-6 sm:px-0">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">
        Sistema de Gerenciamento de Produtos
      </h1>
      
      <div class="max-w-2xl mx-auto">
        <p class="text-lg text-gray-600 mb-8">
          Bem-vindo ao sistema de gerenciamento de produtos. 
          Aqui você pode criar, visualizar, editar e excluir produtos de forma simples e eficiente.
        </p>
        
        <div class="space-y-4" v-if="!isAuthenticated">
          <p class="text-gray-700">
            Para começar, faça login no sistema.
          </p>
          <router-link 
            to="/login"
            class="inline-block btn-primary py-3 px-6 text-lg"
          >
            Fazer Login
          </router-link>
        </div>
        
        <div class="space-y-4" v-else>
          <p class="text-gray-700">
            Você está logado! Acesse a área de produtos para gerenciar seu inventário.
          </p>
          <router-link 
            to="/products"
            class="inline-block bg-innyx-secondary-600 hover:bg-innyx-secondary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Ver Produtos
          </router-link>
        </div>
      </div>
      
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div class="card">
          <div class="text-innyx-primary-600 mb-4">
            <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Criar Produtos</h3>
          <p class="text-gray-600">Adicione novos produtos ao seu inventário com informações detalhadas.</p>
        </div>
        
        <div class="card">
          <div class="text-innyx-secondary-600 mb-4">
            <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Gerenciar Inventário</h3>
          <p class="text-gray-600">Visualize, edite e organize todos os seus produtos em um só lugar.</p>
        </div>
        
        <div class="card">
          <div class="text-innyx-primary-600 mb-4">
            <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Buscar Produtos</h3>
          <p class="text-gray-600">Encontre rapidamente produtos específicos usando nossa busca avançada.</p>
        </div>
      </div>
    </div>
  </div>
</template>