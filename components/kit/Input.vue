<template>
  <div class="relative">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <div
        v-if="leftIcon"
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
      >
        <Icon :name="leftIcon" class="w-5 h-5 text-gray-400" />
      </div>

      <div
        v-if="rightIcon"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <Icon :name="rightIcon" class="w-5 h-5 text-gray-400" />
      </div>

      <input
        :id="inputId"
        ref="inputRef"
        :value="modelValue"
        :type="inputType"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :min="min"
        :max="max"
        :step="step"
        :autocomplete="autocomplete"
        :class="[
          'w-full px-4 py-3 bg-gray-50 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900',
          {
            'pl-12': rightIcon,
            'pr-12': leftIcon,
            'bg-gray-100 cursor-not-allowed': disabled,
            'border-red-500 focus:ring-red-500 focus:border-red-500': error,
            'border-green-500 focus:ring-green-500 focus:border-green-500': success,
          },
          customClass,
        ]"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown="handleKeydown"
      />

      <button
        v-if="type === 'password' && showPasswordToggle"
        type="button"
        class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 hover:text-gray-600 transition-colors"
        @click="togglePasswordVisibility"
      >
        <Icon :name="isPasswordVisible ? 'heroicons:eye-slash' : 'heroicons:eye'" class="w-5 h-5" />
      </button>
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
  modelValue?: string | number
  type?:
    | 'text'
    | 'email'
    | 'password'
    | 'tel'
    | 'url'
    | 'number'
    | 'search'
    | 'date'
    | 'time'
    | 'datetime-local'
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  error?: string
  success?: string
  helpText?: string
  leftIcon?: string
  rightIcon?: string
  showPasswordToggle?: boolean
  min?: number | string
  max?: number | string
  step?: number | string
  autocomplete?: string
  customClass?: string
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', event: Event): void
  (e: 'blur', event: FocusEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'keydown', event: KeyboardEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  readonly: false,
  showPasswordToggle: true,
  customClass: '',
})

const emit = defineEmits<Emits>()

const inputRef = ref<HTMLInputElement>()
const isPasswordVisible = ref(false)

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const inputType = computed(() => {
  if (props.type === 'password' && isPasswordVisible.value) {
    return 'text'
  }
  return props.type
})

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

const select = () => {
  inputRef.value?.select()
}

defineExpose({
  focus,
  blur,
  select,
  inputRef,
})
</script>
