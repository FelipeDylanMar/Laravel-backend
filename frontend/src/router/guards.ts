import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAclStore } from '@/stores/acl'
import type { RouteGuard, Permission, UserRole } from '@/types'

/**
 * Authentication guard - ensures user is authenticated
 */
export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }
  
  next()
}

/**
 * Guest guard - ensures user is not authenticated (for login/register pages)
 */
export function guestGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const authStore = useAuthStore()
  
  if (authStore.isAuthenticated) {
    next({ name: 'home' })
    return
  }
  
  next()
}

/**
 * Permission guard - checks if user has required permissions
 */
export function permissionGuard(
  permissions: Permission[],
  options: {
    requireAll?: boolean
    redirectTo?: string
  } = {}
) {
  return function(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): void {
    const authStore = useAuthStore()
    const aclStore = useAclStore()
    
    // Check if user is authenticated
    if (!authStore.isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
    
    // Check if ACL is initialized
    if (!aclStore.isInitialized) {
      // Try to initialize ACL from current user
      aclStore.initializeFromUser(authStore.user)
      
      // If still not initialized, redirect to login
      if (!aclStore.isInitialized) {
        next({ name: 'login', query: { redirect: to.fullPath } })
        return
      }
    }
    
    // Check permissions
    const hasPermission = options.requireAll
      ? aclStore.hasAllPermissions(permissions).granted
      : aclStore.hasAnyPermission(permissions).granted
    
    if (!hasPermission) {
      const redirectTo = options.redirectTo || 'unauthorized'
      next({ name: redirectTo })
      return
    }
    
    next()
  }
}

/**
 * Role guard - checks if user has required role
 */
export function roleGuard(
  role: UserRole,
  options: {
    redirectTo?: string
  } = {}
) {
  return function(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): void {
    const authStore = useAuthStore()
    const aclStore = useAclStore()
    
    // Check if user is authenticated
    if (!authStore.isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
    
    // Check if ACL is initialized
    if (!aclStore.isInitialized) {
      aclStore.initializeFromUser(authStore.user)
      
      if (!aclStore.isInitialized) {
        next({ name: 'login', query: { redirect: to.fullPath } })
        return
      }
    }
    
    // Check role
    if (!aclStore.hasRole(role)) {
      const redirectTo = options.redirectTo || 'unauthorized'
      next({ name: redirectTo })
      return
    }
    
    next()
  }
}

/**
 * Admin guard - ensures user is admin
 */
export function adminGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const authStore = useAuthStore()
  const aclStore = useAclStore()
  
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }
  
  // Check if ACL is initialized
  if (!aclStore.isInitialized) {
    aclStore.initializeFromUser(authStore.user)
    
    if (!aclStore.isInitialized) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
  }
  
  // Check if user is admin
  if (!aclStore.isAdmin) {
    next({ name: 'unauthorized' })
    return
  }
  
  next()
}

/**
 * Manager guard - ensures user is manager or higher
 */
export function managerGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const authStore = useAuthStore()
  const aclStore = useAclStore()
  
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }
  
  // Check if ACL is initialized
  if (!aclStore.isInitialized) {
    aclStore.initializeFromUser(authStore.user)
    
    if (!aclStore.isInitialized) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
  }
  
  // Check if user is manager or higher
  if (!aclStore.isManager) {
    next({ name: 'unauthorized' })
    return
  }
  
  next()
}

/**
 * Generic ACL guard that accepts RouteGuard configuration
 */
export function aclGuard(config: RouteGuard) {
  return function(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): void {
    const authStore = useAuthStore()
    const aclStore = useAclStore()
    
    // Check if user is authenticated
    if (!authStore.isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
    
    // Check if ACL is initialized
    if (!aclStore.isInitialized) {
      aclStore.initializeFromUser(authStore.user)
      
      if (!aclStore.isInitialized) {
        next({ name: 'login', query: { redirect: to.fullPath } })
        return
      }
    }
    
    // Custom validation function
    if (config.validate) {
      if (!config.validate(authStore.user)) {
        const redirectTo = config.redirect || 'unauthorized'
        next({ name: redirectTo })
        return
      }
    }
    
    // Check role
    if (config.role && !aclStore.hasRole(config.role)) {
      const redirectTo = config.redirect || 'unauthorized'
      next({ name: redirectTo })
      return
    }
    
    // Check permissions
    if (config.permissions && config.permissions.length > 0) {
      const hasPermission = aclStore.hasAnyPermission(config.permissions).granted
      
      if (!hasPermission) {
        const redirectTo = config.redirect || 'unauthorized'
        next({ name: redirectTo })
        return
      }
    }
    
    next()
  }
}