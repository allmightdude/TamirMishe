<template>
  <Teleport to="body">
    <Transition name="snackbar">
      <div
        v-if="visible"
        :class="[
          'fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] px-6 py-4 rounded-xl shadow-2xl',
          'min-w-[320px] max-w-[500px] flex items-center space-x-3 space-x-reverse',
          'backdrop-blur-sm border',
          colorClasses,
        ]"
        role="alert"
      >
        <div class="flex-shrink-0">
          <Icon :name="icon" class="w-6 h-6" />
        </div>

        <div class="flex-1">
          <p class="text-sm font-medium">{{ message }}</p>
        </div>

        <button
          @click="close"
          class="flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
export interface SnackbarProps {
  message?: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

const props = withDefaults(defineProps<SnackbarProps>(), {
  message: '',
  type: 'info',
  duration: 3000,
})

const visible = ref(false)
const message = ref(props.message)
const type = ref(props.type)

let timeoutId: NodeJS.Timeout | null = null

const colorClasses = computed(() => {
  const types = {
    success: 'bg-green-500/90 text-white border-green-600',
    error: 'bg-red-500/90 text-white border-red-600',
    info: 'bg-blue-500/90 text-white border-blue-600',
    warning: 'bg-orange-500/90 text-white border-orange-600',
  }
  return types[type.value] || types.info
})

const icon = computed(() => {
  const icons = {
    success: 'heroicons:check-circle',
    error: 'heroicons:x-circle',
    info: 'heroicons:information-circle',
    warning: 'heroicons:exclamation-triangle',
  }
  return icons[type.value] || icons.info
})

const show = (msg: string, snackType: 'success' | 'error' | 'info' | 'warning' = 'info') => {
  message.value = msg
  type.value = snackType
  visible.value = true

  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  if (props.duration > 0) {
    timeoutId = setTimeout(() => {
      close()
    }, props.duration)
  }
}

const close = () => {
  visible.value = false

  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

defineExpose({
  show,
  close,
})
</script>

<style scoped>
.snackbar-enter-active,
.snackbar-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.snackbar-enter-from {
  opacity: 0;
  transform: translate(-50%, 20px);
}

.snackbar-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
