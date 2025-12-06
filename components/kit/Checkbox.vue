<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="inputId"
        ref="checkboxRef"
        :checked="modelValue"
        type="checkbox"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :class="[
          'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors',
          {
            'cursor-not-allowed opacity-50': disabled,
            'border-red-300 focus:ring-red-500': error,
          },
          customClass,
        ]"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>

    <div class="mr-3">
      <label
        v-if="label"
        :for="inputId"
        :class="[
          'text-sm font-medium cursor-pointer',
          {
            'text-gray-700': !disabled,
            'text-gray-400 cursor-not-allowed': disabled,
            'text-red-600': error,
          },
        ]"
      >
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>

      <p v-if="description" class="text-xs text-gray-500 mt-1">
        {{ description }}
      </p>

      <div
        v-if="error"
        class="mt-1 text-sm text-red-600 flex items-center space-x-1 space-x-reverse"
      >
        <Icon name="heroicons:exclamation-circle" class="w-4 h-4" />
        <span>{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: boolean
  label?: string
  description?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  error?: string
  customClass?: string
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', event: Event): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  readonly: false,
  customClass: '',
})

const emit = defineEmits<Emits>()

const checkboxRef = ref<HTMLInputElement>()

const inputId = computed(() => `checkbox-${Math.random().toString(36).substr(2, 9)}`)

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const focus = () => {
  checkboxRef.value?.focus()
}

const blur = () => {
  checkboxRef.value?.blur()
}

defineExpose({
  focus,
  blur,
  checkboxRef,
})
</script>
