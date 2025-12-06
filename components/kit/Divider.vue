<template>
  <div :class="dividerClasses"></div>
</template>

<script setup lang="ts">
interface Props {
  orientation?: 'vertical' | 'horizontal'
  color?: string
  spacing?: string
  thickness?: string
  height?: string
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
  color: 'bg-gray-400',
  spacing: 'mx-1',
  thickness: 'w-px',
  height: 'h-6',
  width: 'w-full',
})

const dividerClasses = computed(() => {
  if (props.orientation === 'horizontal') {
    return `h-px ${props.width} ${props.color} ${props.spacing}`
  }

  return `${props.thickness} ${props.height} ${props.color} ${props.spacing}`
})
</script>
