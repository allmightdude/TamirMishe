<template>
  <slot v-bind="$attrs" />
</template>

<script setup lang="ts">
defineOptions({
  name: 'KitProxy',
})
</script>
