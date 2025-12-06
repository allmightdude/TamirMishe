<template>
  <div class="v-page">
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div class="flex-1">
        <h3 class="text-xl font-bold text-gray-900">
          <slot name="title" />
        </h3>
      </div>

      <div class="flex items-center space-x-3 space-x-reverse">
        <slot name="actions" />

        <NuxtLink
          v-if="retreat && urls.length"
          :to="urls[urls.length - 1]"
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Icon name="heroicons:arrow-left" class="w-4 h-4 ml-2" />
          بازگشت
        </NuxtLink>
      </div>
    </div>

    <div class="mt-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  retreat?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  retreat: false,
})

const urls = ref<string[]>([])

onMounted(() => {
  if (process.client) {
    try {
      const storedUrls = localStorage.getItem('urls')
      if (storedUrls) {
        urls.value = JSON.parse(storedUrls)
      }
    } catch (error) {
      console.warn('Failed to parse stored URLs:', error)
      urls.value = []
    }
  }
})
</script>
