<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click="handleBackdropClick"
      >
        <Transition name="dialog-content">
          <div ref="dialogRef" :class="dialogClasses" @click.stop>
            <div class="p-6 border-b border-gray-200 relative">
              <h3 class="text-lg font-semibold text-gray-900">
                <slot name="header" />
              </h3>

              <!-- Close Button -->
              <button
                @click="closeDialog"
                class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close dialog"
              >
                <Icon name="ph:x-bold" class="w-6 h-6" />
              </button>
            </div>

            <!-- Content -->
            <div class="p-6">
              <slot />
            </div>

            <div class="px-6 py-4 border-t border-gray-200">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  size?: 'md' | 'lg'
  persistent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  persistent: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const dialogRef = ref<HTMLElement>()

const dialogClasses = computed(() => {
  const base = 'bg-white rounded-xl shadow-xl w-full max-h-[90vh] overflow-y-auto'
  const sizeClass = props.size === 'lg' ? 'max-w-5xl' : 'max-w-md'
  return `${base} ${sizeClass}`
})

const closeDialog = () => {
  emit('update:modelValue', false)
}

const handleBackdropClick = (event: Event) => {
  if (event.target === event.currentTarget && !props.persistent) {
    emit('update:modelValue', false)
  }
}
</script>

<style scoped>
/* Backdrop fade transition */
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

.dialog-content-enter-active,
.dialog-content-leave-active {
  transition: all 0.3s ease;
}

.dialog-content-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.dialog-content-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
