import { computed, type ComputedRef } from 'vue'
import { useAclStore } from '@/stores/acl'
import type { Permission, UserRole, PermissionCheck } from '@/types'


export function usePermissions() {
  const aclStore = useAclStore()

 
  function hasPermission(permission: Permission): ComputedRef<boolean> {
    return computed(() => aclStore.hasPermission(permission).granted)
  }

 
  function hasAnyPermission(permissions: Permission[]): ComputedRef<boolean> {
    return computed(() => aclStore.hasAnyPermission(permissions).granted)
  }

 
  function hasAllPermissions(permissions: Permission[]): ComputedRef<boolean> {
    return computed(() => aclStore.hasAllPermissions(permissions).granted)
  }


  function checkPermission(permission: Permission): ComputedRef<PermissionCheck> {
    return computed(() => aclStore.hasPermission(permission))
  }
 
  function hasRole(role: UserRole): ComputedRef<boolean> {
    return computed(() => aclStore.hasRole(role))
  }

  function hasRoleLevel(minLevel: number): ComputedRef<boolean> {
    return computed(() => aclStore.hasRoleLevel(minLevel))
  }

  const isAdmin: ComputedRef<boolean> = computed(() => aclStore.isAdmin)

  const isManager: ComputedRef<boolean> = computed(() => aclStore.isManager)

  const isInitialized: ComputedRef<boolean> = computed(() => aclStore.isInitialized)

  const canViewProducts: ComputedRef<boolean> = hasPermission('products.view' as Permission)

  const canCreateProducts: ComputedRef<boolean> = hasPermission('products.create' as Permission)

  const canEditProducts: ComputedRef<boolean> = hasPermission('products.edit' as Permission)

  const canDeleteProducts: ComputedRef<boolean> = hasPermission('products.delete' as Permission)

  const canManageProducts: ComputedRef<boolean> = hasAnyPermission([
    'products.create' as Permission,
    'products.edit' as Permission,
    'products.delete' as Permission
  ])

  const canViewCategories: ComputedRef<boolean> = hasPermission('categories.view' as Permission)

  const canCreateCategories: ComputedRef<boolean> = hasPermission('categories.create' as Permission)

  const canEditCategories: ComputedRef<boolean> = hasPermission('categories.edit' as Permission)

  const canDeleteCategories: ComputedRef<boolean> = hasPermission('categories.delete' as Permission)

  const canManageCategories: ComputedRef<boolean> = hasAnyPermission([
    'categories.create' as Permission,
    'categories.edit' as Permission,
    'categories.delete' as Permission
  ])

  const canAccessAdminPanel: ComputedRef<boolean> = hasPermission('admin.panel' as Permission)

  const canViewReports: ComputedRef<boolean> = hasPermission('reports.view' as Permission)

  const canManageSettings: ComputedRef<boolean> = hasPermission('settings.manage' as Permission)

  const canManageUsers: ComputedRef<boolean> = hasAnyPermission([
    'users.view' as Permission,
    'users.create' as Permission,
    'users.edit' as Permission,
    'users.delete' as Permission
  ])

  const currentRole: ComputedRef<UserRole | null> = computed(() => aclStore.userRole)

  const currentPermissions: ComputedRef<Permission[]> = computed(() => aclStore.userPermissions)

  const currentRoleLevel: ComputedRef<number> = computed(() => aclStore.userRoleLevel)

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    checkPermission,
    
    hasRole,
    hasRoleLevel,
    isAdmin,
    isManager,
    isInitialized,
    
    canViewProducts,
    canCreateProducts,
    canEditProducts,
    canDeleteProducts,
    canManageProducts,
    
    canViewCategories,
    canCreateCategories,
    canEditCategories,
    canDeleteCategories,
    canManageCategories,
    
    canAccessAdminPanel,
    canViewReports,
    canManageSettings,
    canManageUsers,
    
    currentRole,
    currentPermissions,
    currentRoleLevel
  }
}