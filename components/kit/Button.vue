<template>
  <button :type="type" :disabled="disabled || loading" :class="buttonClasses" @click="handleClick">
    <Icon v-if="loading" name="svg-spinners:ring-resize" :class="iconSizeClass" />

    <Icon v-else-if="iconLeft" :name="iconLeft" :class="[iconSizeClass, iconLeftClass]" />

    <span v-if="$slots.default && !iconOnly">
      <slot />
    </span>

    <Icon v-if="iconRight && !loading" :name="iconRight" :class="[iconSizeClass, iconRightClass]" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'outline'
    | 'ghost'
    | 'purple'
    | 'linkedin'
    | 'link'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  iconLeft?: string
  iconRight?: string
  iconOnly?: boolean
  fullWidth?: boolean
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  iconOnly: false,
  fullWidth: false,
  rounded: 'sm',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const sizeClasses = computed(() => {
  if (props.iconOnly) {
    const iconOnlySizes = {
      xs: 'p-1',
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-2.5',
      xl: 'p-3',
    }
    return iconOnlySizes[props.size]
  }

  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  }
  return sizes[props.size]
})

const iconSizeClass = computed(() => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  }
  return sizes[props.size]
})

const roundedClass = computed(() => {
  const rounded = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }
  return rounded[props.rounded]
})

const variantClasses = computed(() => {
  const variants = {
    primary:
      'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl focus:ring-blue-500 shadow-lg',
    secondary:
      'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg focus:ring-gray-400 shadow-md',
    danger:
      'bg-gradient-to-r from-red-500 to-rose-500 text-white hover:from-red-600 hover:to-rose-600 hover:shadow-lg focus:ring-red-500 shadow-md',
    success:
      'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:shadow-lg focus:ring-green-500 shadow-md',
    outline:
      'bg-transparent text-sky-600 border-2 border-sky-400 hover:bg-sky-50 hover:border-sky-500 focus:ring-sky-400',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
    purple:
      'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 hover:shadow-lg focus:ring-purple-500 shadow-md',
    linkedin:
      'bg-gradient-to-r from-[#0A66C2] to-[#004182] text-white hover:from-[#004182] hover:to-[#003060] hover:shadow-lg focus:ring-[#0A66C2] shadow-md',
    link: 'bg-transparent text-blue-600 hover:text-blue-800 hover:underline focus:ring-0 !shadow-none !p-0',
  }
  return variants[props.variant]
})

const iconLeftClass = computed(() => {
  return 'group-hover:scale-110 transition-transform duration-200'
})

const iconRightClass = computed(() => {
  return 'group-hover:rotate-90 transition-transform duration-200'
})

const buttonClasses = computed(() => {
  return [
    'inline-flex items-center justify-center space-x-2 space-x-reverse font-semibold',
    'transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
    'group',

    sizeClasses.value,
    roundedClass.value,

    variantClasses.value,

    props.fullWidth ? 'w-full' : 'w-auto',

    !props.disabled && !props.loading && 'hover:scale-105 active:scale-95',

    (props.disabled || props.loading) &&
      'opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-md',
  ]
})
</script>
