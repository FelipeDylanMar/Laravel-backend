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

/**
 * PermissionGuard Component
 * Conditionally renders content based on user permissions or roles
 */

interface Props {
  /** Required permissions (user needs ANY of these) */
  permissions?: Permission[]
  /** Required permissions (user needs ALL of these) */
  requireAllPermissions?: Permission[]
  /** Required role */
  role?: UserRole
  /** Minimum role level required */
  minRoleLevel?: number
  /** Custom validation function */
  validate?: () => boolean
  /** Show content when user DOESN'T have access (inverse logic) */
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

/**
 * Check if user has access based on provided criteria
 */
const hasAccess = computed(() => {
  // If ACL is not initialized, deny access
  if (!isInitialized.value) {
    return props.inverse
  }
  
  let access = true
  
  // Check permissions (ANY)
  if (props.permissions && props.permissions.length > 0) {
    access = access && hasAnyPermission(props.permissions).value
  }
  
  // Check permissions (ALL)
  if (props.requireAllPermissions && props.requireAllPermissions.length > 0) {
    access = access && hasAllPermissions(props.requireAllPermissions).value
  }
  
  // Check role
  if (props.role) {
    access = access && hasRole(props.role).value
  }
  
  // Check role level
  if (props.minRoleLevel !== undefined) {
    access = access && hasRoleLevel(props.minRoleLevel).value
  }
  
  // Custom validation
  if (props.validate) {
    access = access && props.validate()
  }
  
  // Apply inverse logic if needed
  return props.inverse ? !access : access
})
</script>

<style scoped>
/* No specific styles needed for this component */
</style>