import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAclStore } from '@/stores/acl'
import type { RouteGuard, Permission, UserRole } from '@/types'


function checkAuthAndAcl(
  to: RouteLocationNormalized,
  next: NavigationGuardNext
): { authStore: ReturnType<typeof useAuthStore>, aclStore: ReturnType<typeof useAclStore> } | null {
  const authStore = useAuthStore()
  const aclStore = useAclStore()
  
  if (!authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return null
  }
  
  if (!aclStore.isInitialized) {
    aclStore.initializeFromUser(authStore.user)
    
    if (!aclStore.isInitialized) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return null
    }
  }
  
  return { authStore, aclStore }
}

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
    
    if (!authStore.isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
    
    if (!aclStore.isInitialized) {
      aclStore.initializeFromUser(authStore.user)
      
      if (!aclStore.isInitialized) {
        next({ name: 'login', query: { redirect: to.fullPath } })
        return
      }
    }
    
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
    
    if (!authStore.isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
    
    if (!aclStore.isInitialized) {
      aclStore.initializeFromUser(authStore.user)
      
      if (!aclStore.isInitialized) {
        next({ name: 'login', query: { redirect: to.fullPath } })
        return
      }
    }
    
    if (!aclStore.hasRole(role)) {
      const redirectTo = options.redirectTo || 'unauthorized'
      next({ name: redirectTo })
      return
    }
    
    next()
  }
}


export function adminGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const stores = checkAuthAndAcl(to, next)
  if (!stores) return
  
  const { aclStore } = stores
  
  if (!aclStore.isAdmin) {
    next({ name: 'unauthorized' })
    return
  }
  
  next()
}


export function managerGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const stores = checkAuthAndAcl(to, next)
  if (!stores) return
  
  const { aclStore } = stores
  if (!aclStore.isManager) {
    next({ name: 'unauthorized' })
    return
  }
  
  next()
}


export function aclGuard(config: RouteGuard) {
  return function(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): void {
    const stores = checkAuthAndAcl(to, next)
    if (!stores) return
    
    const { authStore, aclStore } = stores
    
    if (config.validate) {
      if (!config.validate(authStore.user)) {
        const redirectTo = config.redirect || 'unauthorized'
        next({ name: redirectTo })
        return
      }
    }
    
    if (config.role && !aclStore.hasRole(config.role)) {
      const redirectTo = config.redirect || 'unauthorized'
      next({ name: redirectTo })
      return
    }
    
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