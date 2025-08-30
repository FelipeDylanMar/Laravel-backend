import { createRouter, createWebHistory, type RouteRecordRaw, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAclStore } from '@/stores/acl'
import type { Permission, UserRole } from '@/types'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    permissions?: Permission[]
    requireAllPermissions?: Permission[]
    role?: UserRole
    minRoleLevel?: number
  }
}

const Home = () => import('@/views/HomeView.vue')
const Login = () => import('@/views/LoginView.vue')
const Products = () => import('@/views/ProductsView.vue')
const ProductForm = () => import('@/views/ProductFormView.vue')
const ProductDetail = () => import('@/views/ProductDetailView.vue')
const Unauthorized = () => import('@/views/UnauthorizedView.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: { 
      requiresAuth: true,
      permissions: ['products.view' as Permission]
    }
  },
  {
    path: '/products/new',
    name: 'ProductCreate',
    component: ProductForm,
    meta: { 
      requiresAuth: true,
      permissions: ['products.create' as Permission]
    }
  },
  {
    path: '/products/:id/edit',
    name: 'ProductEdit',
    component: ProductForm,
    meta: { 
      requiresAuth: true,
      permissions: ['products.edit' as Permission]
    }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { 
      requiresAuth: true,
      permissions: ['products.view' as Permission]
    }
  },
  {
    path: '/unauthorized',
    name: 'unauthorized',
    component: Unauthorized,
    meta: { requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes
})

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> => {
  const authStore = useAuthStore()
  const aclStore = useAclStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (authStore.token && !authStore.user && requiresAuth) {
    const isValid = await authStore.checkAuth()
    if (!isValid) {
      next({ name: 'Login', query: { redirect: to.fullPath } })
      return
    }
  }

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }


  if (to.name === 'Login' && authStore.isAuthenticated) {
    const redirect = to.query.redirect as string
    next(redirect || '/products')
    return
  }


  if (authStore.isAuthenticated && requiresAuth) {

    if (!aclStore.isInitialized) {
      aclStore.initializeFromUser(authStore.user)
    }


    const routeMeta = to.matched.find(record => record.meta.permissions || record.meta.role || record.meta.minRoleLevel)?.meta

    if (routeMeta) {
      let hasAccess = true
      let reason = ''

  
      if (routeMeta.role && !aclStore.hasRole(routeMeta.role)) {
        hasAccess = false
        reason = `Papel necessário: ${routeMeta.role}`
      }

  
      if (routeMeta.minRoleLevel && !aclStore.hasRoleLevel(routeMeta.minRoleLevel)) {
        hasAccess = false
        reason = `Nível mínimo necessário: ${routeMeta.minRoleLevel}`
      }

  
      if (routeMeta.permissions && routeMeta.permissions.length > 0) {
        const permissionCheck = aclStore.hasAnyPermission(routeMeta.permissions)
        if (!permissionCheck.granted) {
          hasAccess = false
          reason = permissionCheck.reason || 'Permissões insuficientes'
        }
      }

  
      if (routeMeta.requireAllPermissions && routeMeta.requireAllPermissions.length > 0) {
        const permissionCheck = aclStore.hasAllPermissions(routeMeta.requireAllPermissions)
        if (!permissionCheck.granted) {
          hasAccess = false
          reason = permissionCheck.reason || 'Permissões insuficientes'
        }
      }

  
      if (!hasAccess) {
        next({
          name: 'unauthorized',
          query: {
            from: to.fullPath,
            reason: reason,
            permissions: routeMeta.permissions?.join(', ') || routeMeta.requireAllPermissions?.join(', ') || ''
          }
        })
        return
      }
    }
  }

  next()
})

export default router