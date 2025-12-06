<template>
  <div v-if="avatar" :class="['rounded-full overflow-hidden', sizeClasses, ringClass]">
    <img :src="avatar" :alt="displayName" class="w-full h-full object-cover" />
  </div>

  <div
    v-else
    :class="[
      'bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center',
      sizeClasses,
      ringClass,
    ]"
  >
    <span :class="['text-white font-semibold', textSizeClass]">
      {{ initials }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  avatar?: string
  fullName?: string
  userName?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  showRing?: boolean
  ringColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  avatar: '',
  fullName: '',
  userName: '',
  size: 'md',
  showRing: false,
  ringColor: 'ring-gray-200',
})

const displayName = computed(() => {
  return props.fullName || props.userName || 'User'
})

const initials = computed(() => {
  const name = props.fullName || props.userName
  return name.charAt(0).toUpperCase()
})

const sizeClasses = computed(() => {
  const sizes: Record<string, string> = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-32 h-32',
  }
  return sizes[props.size]
})

const textSizeClass = computed(() => {
  const textSizes: Record<string, string> = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
    xl: 'text-4xl',
  }
  return textSizes[props.size]
})

const ringClass = computed(() => {
  return props.showRing ? `ring-2 ${props.ringColor}` : ''
})
</script>
