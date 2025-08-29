import { computed, type ComputedRef } from 'vue'
import { useAclStore } from '@/stores/acl'
import type { Permission, UserRole, PermissionCheck } from '@/types'

/**
 * Composable for permission checking and ACL functionality
 * Provides reactive permission checks and role-based access control
 */
export function usePermissions() {
  const aclStore = useAclStore()

  // ============================================================================
  // PERMISSION CHECKS
  // ============================================================================
  
  /**
   * Check if user has a specific permission
   */
  function hasPermission(permission: Permission): ComputedRef<boolean> {
    return computed(() => aclStore.hasPermission(permission).granted)
  }

  /**
   * Check if user has any of the specified permissions
   */
  function hasAnyPermission(permissions: Permission[]): ComputedRef<boolean> {
    return computed(() => aclStore.hasAnyPermission(permissions).granted)
  }

  /**
   * Check if user has all specified permissions
   */
  function hasAllPermissions(permissions: Permission[]): ComputedRef<boolean> {
    return computed(() => aclStore.hasAllPermissions(permissions).granted)
  }

  /**
   * Get detailed permission check result
   */
  function checkPermission(permission: Permission): ComputedRef<PermissionCheck> {
    return computed(() => aclStore.hasPermission(permission))
  }

  // ============================================================================
  // ROLE CHECKS
  // ============================================================================
  
  /**
   * Check if user has a specific role
   */
  function hasRole(role: UserRole): ComputedRef<boolean> {
    return computed(() => aclStore.hasRole(role))
  }

  /**
   * Check if user has role level equal or higher than specified
   */
  function hasRoleLevel(minLevel: number): ComputedRef<boolean> {
    return computed(() => aclStore.hasRoleLevel(minLevel))
  }

  /**
   * Check if user is admin
   */
  const isAdmin: ComputedRef<boolean> = computed(() => aclStore.isAdmin)

  /**
   * Check if user is manager or higher
   */
  const isManager: ComputedRef<boolean> = computed(() => aclStore.isManager)

  /**
   * Check if user is authenticated and ACL is initialized
   */
  const isInitialized: ComputedRef<boolean> = computed(() => aclStore.isInitialized)

  // ============================================================================
  // CONVENIENCE METHODS
  // ============================================================================
  
  /**
   * Check if user can view products
   */
  const canViewProducts: ComputedRef<boolean> = hasPermission('products.view' as Permission)

  /**
   * Check if user can create products
   */
  const canCreateProducts: ComputedRef<boolean> = hasPermission('products.create' as Permission)

  /**
   * Check if user can edit products
   */
  const canEditProducts: ComputedRef<boolean> = hasPermission('products.edit' as Permission)

  /**
   * Check if user can delete products
   */
  const canDeleteProducts: ComputedRef<boolean> = hasPermission('products.delete' as Permission)

  /**
   * Check if user can manage products (create, edit, delete)
   */
  const canManageProducts: ComputedRef<boolean> = hasAnyPermission([
    'products.create' as Permission,
    'products.edit' as Permission,
    'products.delete' as Permission
  ])

  /**
   * Check if user can view categories
   */
  const canViewCategories: ComputedRef<boolean> = hasPermission('categories.view' as Permission)

  /**
   * Check if user can create categories
   */
  const canCreateCategories: ComputedRef<boolean> = hasPermission('categories.create' as Permission)

  /**
   * Check if user can edit categories
   */
  const canEditCategories: ComputedRef<boolean> = hasPermission('categories.edit' as Permission)

  /**
   * Check if user can delete categories
   */
  const canDeleteCategories: ComputedRef<boolean> = hasPermission('categories.delete' as Permission)

  /**
   * Check if user can manage categories (create, edit, delete)
   */
  const canManageCategories: ComputedRef<boolean> = hasAnyPermission([
    'categories.create' as Permission,
    'categories.edit' as Permission,
    'categories.delete' as Permission
  ])

  /**
   * Check if user can access admin panel
   */
  const canAccessAdminPanel: ComputedRef<boolean> = hasPermission('admin.panel' as Permission)

  /**
   * Check if user can view reports
   */
  const canViewReports: ComputedRef<boolean> = hasPermission('reports.view' as Permission)

  /**
   * Check if user can manage settings
   */
  const canManageSettings: ComputedRef<boolean> = hasPermission('settings.manage' as Permission)

  /**
   * Check if user can manage users
   */
  const canManageUsers: ComputedRef<boolean> = hasAnyPermission([
    'users.view' as Permission,
    'users.create' as Permission,
    'users.edit' as Permission,
    'users.delete' as Permission
  ])

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================
  
  /**
   * Get current user role
   */
  const currentRole: ComputedRef<UserRole | null> = computed(() => aclStore.userRole)

  /**
   * Get current user permissions
   */
  const currentPermissions: ComputedRef<Permission[]> = computed(() => aclStore.userPermissions)

  /**
   * Get current user role level
   */
  const currentRoleLevel: ComputedRef<number> = computed(() => aclStore.userRoleLevel)

  // ============================================================================
  // RETURN
  // ============================================================================
  
  return {
    // Permission checks
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    checkPermission,
    
    // Role checks
    hasRole,
    hasRoleLevel,
    isAdmin,
    isManager,
    isInitialized,
    
    // Product permissions
    canViewProducts,
    canCreateProducts,
    canEditProducts,
    canDeleteProducts,
    canManageProducts,
    
    // Category permissions
    canViewCategories,
    canCreateCategories,
    canEditCategories,
    canDeleteCategories,
    canManageCategories,
    
    // System permissions
    canAccessAdminPanel,
    canViewReports,
    canManageSettings,
    canManageUsers,
    
    // Utility
    currentRole,
    currentPermissions,
    currentRoleLevel
  }
}