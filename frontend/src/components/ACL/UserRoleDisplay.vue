<template>
  <div class="user-role-display" v-if="isInitialized">
    <div class="role-badge" :class="`role-${currentRole}`">
      <i class="role-icon" :class="roleIcon"></i>
      <span class="role-name">{{ roleDisplayName }}</span>
    </div>
    
    <div v-if="showPermissions && currentPermissions.length > 0" class="permissions-list">
      <h4 class="permissions-title">Permissões:</h4>
      <div class="permissions-grid">
        <span 
          v-for="permission in currentPermissions" 
          :key="permission"
          class="permission-tag"
        >
          {{ formatPermission(permission) }}
        </span>
      </div>
    </div>
    
    <div v-if="showLevel" class="role-level">
      <span class="level-label">Nível:</span>
      <span class="level-value">{{ currentRoleLevel }}</span>
    </div>
  </div>
  
  <div v-else class="user-role-loading">
    <i class="loading-icon">⏳</i>
    <span>Carregando permissões...</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePermissions } from '@/composables/usePermissions'
import type { UserRole } from '@/types'


interface Props {
  showPermissions?: boolean
  showLevel?: boolean
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showPermissions: false,
  showLevel: false,
  compact: false
})

const {
  currentRole,
  currentPermissions,
  currentRoleLevel,
  isInitialized
} = usePermissions()


const roleDisplayName = computed(() => {
  const roleNames: Record<UserRole, string> = {
    admin: 'Administrador',
    manager: 'Gerente',
    user: 'Usuário',
    guest: 'Visitante'
  }
  
  return currentRole.value ? roleNames[currentRole.value] || currentRole.value : 'Não definido'
})


const roleIcon = computed(() => {
  const roleIcons: Record<UserRole, string> = {
    admin: '👑',
    manager: '🏢',
    user: '👤',
    guest: '👥'
  }
  
  return currentRole.value ? roleIcons[currentRole.value] || '❓' : '❓'
})


function formatPermission(permission: string): string {
  
  const [resource, action] = permission.split('.')
  
  const resourceNames: Record<string, string> = {
    products: 'Produtos',
    categories: 'Categorias',
    users: 'Usuários',
    admin: 'Admin',
    reports: 'Relatórios',
    settings: 'Configurações'
  }
  
  const actionNames: Record<string, string> = {
    view: 'Visualizar',
    create: 'Criar',
    edit: 'Editar',
    delete: 'Excluir',
    panel: 'Painel',
    manage: 'Gerenciar'
  }
  
  const resourceName = resourceNames[resource] || resource
  const actionName = actionNames[action] || action
  
  return `${resourceName} - ${actionName}`
}
</script>

<style scoped>
.user-role-display {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
}

.role-admin {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
}

.role-manager {
  background: linear-gradient(135deg, #4834d4, #686de0);
  color: white;
  box-shadow: 0 2px 8px rgba(72, 52, 212, 0.3);
}

.role-user {
  background: linear-gradient(135deg, #00d2d3, #54a0ff);
  color: white;
  box-shadow: 0 2px 8px rgba(0, 210, 211, 0.3);
}

.role-guest {
  background: linear-gradient(135deg, #a4b0be, #747d8c);
  color: white;
  box-shadow: 0 2px 8px rgba(164, 176, 190, 0.3);
}

.role-icon {
  font-size: 16px;
}

.role-name {
  font-weight: 600;
}

.permissions-list {
  margin-top: 8px;
}

.permissions-title {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
}

.permissions-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.permission-tag {
  display: inline-block;
  padding: 4px 8px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  font-size: 12px;
  color: #495057;
  transition: all 0.2s ease;
}

.permission-tag:hover {
  background: #e9ecef;
  border-color: #dee2e6;
}

.role-level {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.level-label {
  color: #6c757d;
  font-weight: 500;
}

.level-value {
  font-weight: 600;
  color: #495057;
  padding: 2px 8px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.user-role-loading {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  color: #6c757d;
  font-size: 14px;
}

.loading-icon {
  font-size: 16px;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Compact mode */
.user-role-display.compact .role-badge {
  padding: 4px 8px;
  font-size: 12px;
}

.user-role-display.compact .permissions-grid {
  max-height: 60px;
  overflow-y: auto;
}

.user-role-display.compact .permission-tag {
  font-size: 10px;
  padding: 2px 6px;
}
</style>