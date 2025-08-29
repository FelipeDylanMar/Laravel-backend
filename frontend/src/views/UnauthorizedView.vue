<template>
  <div class="unauthorized-container">
    <div class="unauthorized-content">
      <!-- Error Icon -->
      <div class="error-icon">
        <i class="icon">🚫</i>
      </div>
      
      <!-- Error Message -->
      <div class="error-message">
        <h1 class="error-title">Acesso Negado</h1>
        <p class="error-description">
          Você não possui permissão para acessar esta página.
        </p>
      </div>
      
      <!-- User Info -->
      <div class="user-info" v-if="isAuthenticated">
        <UserRoleDisplay :show-permissions="false" :show-level="true" />
      </div>
      
      <!-- Actions -->
      <div class="error-actions">
        <button 
          @click="goBack" 
          class="btn btn-secondary"
          v-if="canGoBack"
        >
          <i class="btn-icon">←</i>
          Voltar
        </button>
        
        <router-link 
          to="/" 
          class="btn btn-primary"
        >
          <i class="btn-icon">🏠</i>
          Ir para Home
        </router-link>
        
        <button 
          @click="requestAccess" 
          class="btn btn-outline"
          v-if="isAuthenticated"
        >
          <i class="btn-icon">📧</i>
          Solicitar Acesso
        </button>
      </div>
      
      <!-- Additional Info -->
      <div class="additional-info">
        <details class="error-details">
          <summary>Detalhes do Erro</summary>
          <div class="details-content">
            <p><strong>Página solicitada:</strong> {{ requestedRoute }}</p>
            <p><strong>Seu papel atual:</strong> {{ currentRole || 'Não definido' }}</p>
            <p><strong>Permissões necessárias:</strong> {{ requiredPermissions || 'Não especificadas' }}</p>
            <p><strong>Horário:</strong> {{ new Date().toLocaleString() }}</p>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePermissions } from '@/composables/usePermissions'
import UserRoleDisplay from '@/components/ACL/UserRoleDisplay.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { currentRole, isInitialized } = usePermissions()

const canGoBack = ref(false)
const requestedRoute = ref('')
const requiredPermissions = ref('')

const isAuthenticated = computed(() => authStore.isAuthenticated)

onMounted(() => {
  canGoBack.value = window.history.length > 1
  requestedRoute.value = (route.query.from as string) || route.fullPath
  requiredPermissions.value = (route.query.permissions as string) || 'Não especificadas'
})

function goBack() {
  router.go(-1)
}

function requestAccess() {
  alert('Funcionalidade de solicitação de acesso será implementada em breve.')
}
</script>

<style scoped>
.unauthorized-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.unauthorized-content {
  background: white;
  border-radius: 16px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-icon {
  margin-bottom: 24px;
}

.error-icon .icon {
  font-size: 64px;
  display: block;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.error-message {
  margin-bottom: 32px;
}

.error-title {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 16px 0;
}

.error-description {
  font-size: 16px;
  color: #6c757d;
  margin: 0;
  line-height: 1.5;
}

.user-info {
  margin-bottom: 32px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.error-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-outline:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 16px;
}

.additional-info {
  border-top: 1px solid #e9ecef;
  padding-top: 24px;
}

.error-details {
  text-align: left;
}

.error-details summary {
  cursor: pointer;
  font-weight: 500;
  color: #495057;
  padding: 8px 0;
  outline: none;
}

.error-details summary:hover {
  color: #667eea;
}

.details-content {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.5;
}

.details-content p {
  margin: 8px 0;
}

.details-content strong {
  color: #495057;
}

/* Responsive design */
@media (max-width: 768px) {
  .unauthorized-content {
    padding: 24px;
    margin: 16px;
  }
  
  .error-title {
    font-size: 24px;
  }
  
  .error-icon .icon {
    font-size: 48px;
  }
  
  .error-actions {
    gap: 8px;
  }
  
  .btn {
    padding: 10px 20px;
    font-size: 13px;
  }
}
</style>