<template>
  <label
    :class="[
      'inline-block align-middle whitespace-nowrap rounded-[10px] text-[13px] leading-5',
      dense ? 'px-[9px] py-0.5' : 'px-[9px] py-1',
      colorClasses[color] || colorClasses.default,
    ]"
  >
    <slot />
  </label>
</template>

<script setup lang="ts">
interface Props {
  color?: 'default' | 'info' | 'warning' | 'success' | 'error'
  dense?: boolean
}

withDefaults(defineProps<Props>(), {
  color: 'default',
  dense: false,
})

const colorClasses = {
  default: 'text-gray-400 bg-gray-400/10',
  info: 'text-blue-600 bg-blue-600/10',
  warning: 'text-amber-500 bg-amber-500/10',
  success: 'text-green-600 bg-green-600/10',
  error: 'text-red-600 bg-red-600/10',
}
</script>
