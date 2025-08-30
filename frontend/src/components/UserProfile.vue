<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const isDropdownOpen = ref(false)

const user = computed(() => authStore.currentUser)
const userRole = computed(() => {
  if (!user.value?.role) return 'Usuário'
  
  const roleMap: Record<string, string> = {
    'admin': 'Administrador',
    'manager': 'Gerente',
    'user': 'Usuário'
  }
  
  return roleMap[user.value.role] || user.value.role
})

const userInitials = computed(() => {
  if (!user.value?.name) return 'U'
  return user.value.name
    .split(' ')
    .map(word => word.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const logout = async () => {
  closeDropdown()
  await authStore.logout()
  router.push('/login').then(() => {
    window.location.reload()
  })
}

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  const dropdown = document.getElementById('user-profile-dropdown')
  if (dropdown && !dropdown.contains(target)) {
    closeDropdown()
  }
}

const addClickOutsideListener = () => {
  if (isDropdownOpen.value) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
}

const watchDropdown = () => {
  addClickOutsideListener()
}

watch(isDropdownOpen, watchDropdown)
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative" id="user-profile-dropdown" v-if="user && authStore.isAuthenticated">
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-3 text-white hover:text-innyx-primary-200 transition-colors focus:outline-none focus:ring-2 focus:ring-innyx-primary-300 rounded-lg p-2"
      :class="{ 'bg-innyx-primary-700': isDropdownOpen }"
    >
      <div class="w-8 h-8 bg-innyx-primary-300 rounded-full flex items-center justify-center text-innyx-primary-800 font-semibold text-sm">
        {{ userInitials }}
      </div>
      
      <div class="hidden md:block text-left">
        <div class="text-sm font-medium">{{ user.name }}</div>
        <div class="text-xs text-innyx-primary-200">{{ userRole }}</div>
      </div>
      
      <svg 
        class="w-4 h-4 transition-transform duration-200" 
        :class="{ 'rotate-180': isDropdownOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isDropdownOpen"
        class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
      >
        <div class="px-4 py-3 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-innyx-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
              {{ userInitials }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900 truncate">{{ user.name }}</div>
              <div class="text-sm text-gray-500 truncate">{{ user.email }}</div>
              <div class="text-xs text-innyx-primary-600 font-medium">{{ userRole }}</div>
            </div>
          </div>
        </div>

        <div class="px-4 py-2 border-b border-gray-100" v-if="user.permissions && user.permissions.length > 0">
          <div class="text-xs text-gray-500 mb-1">Permissões:</div>
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="permission in user.permissions.slice(0, 3)" 
              :key="permission"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-innyx-primary-100 text-innyx-primary-800"
            >
              {{ permission.replace('.view', '').replace('.', ' ') }}
            </span>
            <span 
              v-if="user.permissions.length > 3"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600"
            >
              +{{ user.permissions.length - 3 }}
            </span>
          </div>
        </div>



        <div class="border-t border-gray-100 py-1">
          <button
            @click="logout"
            class="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
          >
            <svg class="w-4 h-4 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>