<template>
  <div v-if="hasAccess">
    <slot />
  </div>
  <div v-else-if="$slots.fallback">
    <slot name="fallback" />
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { usePermissions } from '@/composables/usePermissions'
import type { Permission, UserRole } from '@/types'

interface Props {
  permissions?: Permission[]
  requireAllPermissions?: Permission[]
  role?: UserRole
  minRoleLevel?: number
  validate?: () => boolean
  inverse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  permissions: () => [],
  requireAllPermissions: () => [],
  inverse: false
})

const {
  hasAnyPermission,
  hasAllPermissions,
  hasRole,
  hasRoleLevel,
  isInitialized
} = usePermissions()

const hasAccess = computed(() => {
  if (!isInitialized.value) {
    return props.inverse
  }
  
  let access = true
  
  if (props.permissions && props.permissions.length > 0) {
    access = access && hasAnyPermission(props.permissions).value
  }
  
  if (props.requireAllPermissions && props.requireAllPermissions.length > 0) {
    access = access && hasAllPermissions(props.requireAllPermissions).value
  }
  
  if (props.role) {
    access = access && hasRole(props.role).value
  }
  
  if (props.minRoleLevel !== undefined) {
    access = access && hasRoleLevel(props.minRoleLevel).value
  }
  
  if (props.validate) {
    access = access && props.validate()
  }
  
  return props.inverse ? !access : access
})
</script>

<style scoped>
</style>