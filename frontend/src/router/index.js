import { createRouter, createWebHistory } from 'vue-router'

// Lazy loading das views
const Home = () => import('../views/HomeView.vue')
const Login = () => import('../views/LoginView.vue')
const Products = () => import('../views/ProductsView.vue')
const ProductForm = () => import('../views/ProductFormView.vue')
const ProductDetail = () => import('../views/ProductDetailView.vue')

const routes = [
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
    meta: { requiresAuth: true }
  },
  {
    path: '/products/new',
    name: 'ProductCreate',
    component: ProductForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id/edit',
    name: 'ProductEdit',
    component: ProductForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guard de autenticação
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth_token')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !token) {
    next('/login')
  } else if (to.name === 'Login' && token) {
    next('/products')
  } else {
    next()
  }
})

export default router