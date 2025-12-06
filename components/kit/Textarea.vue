<template>
  <div class="relative">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <textarea
        :id="inputId"
        ref="textareaRef"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :maxlength="maxlength"
        :class="[
          'w-full px-4 py-3 bg-gray-50 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 resize-y',
          {
            'bg-gray-100 cursor-not-allowed': disabled,
            'border-red-500 focus:ring-red-500 focus:border-red-500': error,
            'border-green-500 focus:ring-green-500 focus:border-green-500': success,
            'resize-none': !resizable,
          },
          customClass,
        ]"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>

    <div
      v-if="showCharCount && maxlength"
      class="mt-1 text-xs text-gray-500 text-left"
      :class="{ 'text-red-500': charCountExceeded }"
    >
      {{ charCount }} / {{ maxlength }}
    </div>

    <div v-if="error" class="mt-2 text-sm text-red-600 flex items-center space-x-1 space-x-reverse">
      <Icon name="heroicons:exclamation-circle" class="w-4 h-4" />

      <span>{{ error }}</span>
    </div>

    <div
      v-if="success && !error"
      class="mt-2 text-sm text-green-600 flex items-center space-x-1 space-x-reverse"
    >
      <Icon name="heroicons:check-circle" class="w-4 h-4" />

      <span>{{ success }}</span>
    </div>

    <div v-if="helpText && !error && !success" class="mt-2 text-sm text-gray-500">
      {{ helpText }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  error?: string
  success?: string
  helpText?: string
  rows?: number
  maxlength?: number
  showCharCount?: boolean
  resizable?: boolean
  customClass?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  readonly: false,
  rows: 3,
  showCharCount: false,
  resizable: true,
  customClass: '',
})

const emit = defineEmits<Emits>()

const textareaRef = ref<HTMLTextAreaElement>()

const inputId = computed(() => `textarea-${Math.random().toString(36).substr(2, 9)}`)

const charCount = computed(() => {
  return props.modelValue?.length || 0
})

const charCountExceeded = computed(() => {
  if (!props.maxlength) return false
  return charCount.value > props.maxlength
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const focus = () => {
  textareaRef.value?.focus()
}

const blur = () => {
  textareaRef.value?.blur()
}

const select = () => {
  textareaRef.value?.select()
}

defineExpose({
  focus,
  blur,
  select,
  textareaRef,
})
</script>
