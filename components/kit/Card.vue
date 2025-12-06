<template>
  <component
    :is="to ? 'nuxt-link' : tag"
    :to="to"
    :class="[
      'v-card',
      { 'v-card--outline': outline },
      { 'v-card--flat': flat },
      { clipped: clipped },
      { clearfix: clearfix },
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  tag?: string
  to?: string | object | null
  outline?: boolean
  flat?: boolean
  clipped?: boolean
  clearfix?: boolean
}

withDefaults(defineProps<Props>(), {
  tag: 'article',
  to: null,
  outline: false,
  flat: false,
  clipped: false,
  clearfix: false,
})
</script>

<style lang="scss">
@use './Card.scss' as *;
</style>
