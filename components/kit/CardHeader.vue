<template>
  <div class="v-card__header clearfix">
    <h2 class="v-card__title">
      <slot name="title">{{ title }}</slot>
    </h2>

    <div class="v-card__header--action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
})
</script>
