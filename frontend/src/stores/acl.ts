import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserRole, Permission, Role, PermissionCheck } from '@/types'
import { useAuthStore } from './auth'


export const useAclStore = defineStore('acl', () => {
 
  const userRole = ref<UserRole | null>(null)
  const userPermissions = ref<Permission[]>([])
  const availableRoles = ref<Role[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)


  const isInitialized = computed(() => {
    const authStore = useAuthStore()
    return authStore.isAuthenticated && userRole.value !== null
  })


  const isAdmin = computed(() => {
    return userRole.value === 'admin'
  })


  const isManager = computed(() => {
    return userRole.value === 'admin' || userRole.value === 'manager'
  })

 
  const userRoleLevel = computed(() => {
    if (!userRole.value) return 0
    const role = availableRoles.value.find(r => r.id === userRole.value)
    return role?.level || 0
  })

  
  function initializeFromUser(user: User | null) {
    if (!user) {
      resetAcl()
      return
    }

    userRole.value = (user.role as UserRole) || 'user'
    userPermissions.value = (user.permissions as Permission[]) || getDefaultPermissions(userRole.value)
    
    if (availableRoles.value.length === 0) {
      initializeDefaultRoles()
    }
  }

  function hasPermission(permission: Permission): PermissionCheck {
    if (!isInitialized.value) {
      return { granted: false, reason: 'User not authenticated' }
    }

    if (isAdmin.value) {
      return { granted: true }
    }

    const hasPermission = userPermissions.value.includes(permission)
    return {
      granted: hasPermission,
      reason: hasPermission ? undefined : 'Insufficient permissions'
    }
  }

  function hasAnyPermission(permissions: Permission[]): PermissionCheck {
    if (!isInitialized.value) {
      return { granted: false, reason: 'User not authenticated' }
    }

    if (isAdmin.value) {
      return { granted: true }
    }

    const hasAny = permissions.some(permission => userPermissions.value.includes(permission))
    return {
      granted: hasAny,
      reason: hasAny ? undefined : 'Insufficient permissions'
    }
  }

  function hasAllPermissions(permissions: Permission[]): PermissionCheck {
    if (!isInitialized.value) {
      return { granted: false, reason: 'User not authenticated' }
    }

    if (isAdmin.value) {
      return { granted: true }
    }

    const hasAll = permissions.every(permission => userPermissions.value.includes(permission))
    return {
      granted: hasAll,
      reason: hasAll ? undefined : 'Insufficient permissions'
    }
  }


  function hasRole(role: UserRole): boolean {
    return userRole.value === role
  }

  
  function hasRoleLevel(minLevel: number): boolean {
    return userRoleLevel.value >= minLevel
  }

 
  function resetAcl() {
    userRole.value = null
    userPermissions.value = []
    error.value = null
  }

  function initializeDefaultRoles() {
    availableRoles.value = [
      {
        id: 'guest',
        name: 'Guest',
        description: 'Limited access user',
        permissions: ['products.view', 'categories.view'] as Permission[],
        level: 1
      },
      {
        id: 'user',
        name: 'User',
        description: 'Regular user with basic permissions',
        permissions: [
          'products.view',
          'categories.view'
        ] as Permission[],
        level: 2
      },
      {
        id: 'manager',
        name: 'Manager',
        description: 'Manager with extended permissions',
        permissions: [
          'products.view',
          'products.create',
          'products.edit',
          'categories.view',
          'categories.create',
          'categories.edit',
          'reports.view'
        ] as Permission[],
        level: 3
      },
      {
        id: 'admin',
        name: 'Administrator',
        description: 'Full system access',
        permissions: [
          'products.view',
          'products.create',
          'products.edit',
          'products.delete',
          'categories.view',
          'categories.create',
          'categories.edit',
          'categories.delete',
          'users.view',
          'users.create',
          'users.edit',
          'users.delete',
          'admin.panel',
          'reports.view',
          'settings.manage'
        ] as Permission[],
        level: 4
      }
    ]
  }

  function getDefaultPermissions(role: UserRole): Permission[] {
    const roleConfig = availableRoles.value.find(r => r.id === role)
    return roleConfig?.permissions || []
  }

 
  return {
    userRole,
    userPermissions,
    availableRoles,
    loading,
    error,
    
    isInitialized,
    isAdmin,
    isManager,
    userRoleLevel,
    
    initializeFromUser,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasRoleLevel,
    resetAcl,
    initializeDefaultRoles,
    getDefaultPermissions
  }
})