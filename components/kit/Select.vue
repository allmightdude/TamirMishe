<template>
  <div class="relative">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div
      ref="selectContainer"
      :class="[
        'relative cursor-pointer',
        {
          'ring-2 ring-blue-500 ring-opacity-50': isOpen,
          'border-red-300': error,
        },
      ]"
    >
      <button
        :id="inputId"
        ref="selectButton"
        type="button"
        :disabled="disabled"
        :class="[
          'w-full px-4 py-3 rounded-sm focus:outline-none focus:ring-2 transition-all text-right',
          customClass || 'bg-gray-50 border border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-transparent',
          {
            'bg-gray-100 cursor-not-allowed': disabled && !customClass,
            'border-red-500 focus:ring-red-500 focus:border-red-500': error,
            'text-gray-500': !selectedOption && !isOpen && !customClass,
          },
        ]"
        @click="toggleDropdown"
        @keydown="handleKeydown"
      >
        <span class="block truncate">
          {{ localPlaceholder }}
        </span>
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon
            :name="isOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'"
            class="w-5 h-5 text-gray-400"
          />
        </span>
      </button>

      <!-- Dropdown Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="isOpen"
          ref="dropdownMenu"
          class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-sm shadow-lg max-h-60 overflow-auto focus:outline-none"
        >
          <div v-if="searchable" class="p-2 border-b border-gray-200">
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="جستجو..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              @click.stop
            />
          </div>

          <div
            v-if="filteredOptions.length === 0"
            class="px-4 py-3 text-sm text-gray-500 text-center"
          >
            {{ searchQuery ? 'موردی یافت نشد' : 'گزینه‌ای موجود نیست' }}
          </div>

          <div
            v-for="(option, index) in filteredOptions"
            :key="getOptionValue(option, index)"
            :class="[
              'px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 transition-colors',
              {
                'bg-blue-50 text-blue-700': isSelected(option),
                'text-gray-900': !isSelected(option),
              },
            ]"
            @click="selectOption(option)"
          >
            {{ getOptionLabel(option) }}
          </div>
        </div>
      </Transition>
    </div>

    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>

    <p v-if="helper && !error" class="mt-1 text-sm text-gray-500">
      {{ helper }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Option {
  [key: string]: any
}

interface Props {
  modelValue?: any
  options: Option[]
  label?: string
  placeholder?: string
  valueKey?: string
  labelKey?: string
  disabled?: boolean
  required?: boolean
  error?: string
  helper?: string
  searchable?: boolean
  clearable?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'انتخاب کنید...',
  valueKey: 'value',
  labelKey: 'label',
  disabled: false,
  required: false,
  searchable: false,
  clearable: false,
  customClass: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  change: [value: any, option: Option | null]
}>()

const selectContainer = ref<HTMLElement>()
const selectButton = ref<HTMLButtonElement>()
const dropdownMenu = ref<HTMLElement>()
const searchInput = ref<HTMLInputElement>()

const isOpen = ref(false)
const searchQuery = ref('')
const focusedIndex = ref(-1)

const inputId = computed(() => `select-${Math.random().toString(36).substr(2, 9)}`)

const selectedOption = computed(() => {
  return props.options.find((option: Option) => getOptionValue(option) === props.modelValue) || null
})

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }

  return props.options.filter((option: Option) =>
    getOptionLabel(option).toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const localPlaceholder = computed(() => {
  if (selectedOption.value) {
    return getOptionLabel(selectedOption.value)
  }

  return isOpen.value ? 'جست و جو کنید ...' : props.placeholder
})

const getOptionValue = (option: Option, index?: number) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return option
  }
  return option[props.valueKey] ?? index
}

const getOptionLabel = (option: Option) => {
  if (typeof option === 'string' || typeof option === 'number') {
    return String(option)
  }
  return option[props.labelKey] ?? String(option)
}

const isSelected = (option: Option) => {
  return getOptionValue(option) === props.modelValue
}

const selectOption = (option: Option) => {
  const value = getOptionValue(option)
  emit('update:modelValue', value)
  emit('change', value, option)
  closeDropdown()
}

const toggleDropdown = () => {
  if (props.disabled) return

  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

const openDropdown = () => {
  isOpen.value = true
  searchQuery.value = ''
  focusedIndex.value = -1

  nextTick(() => {
    if (props.searchable && searchInput.value) {
      searchInput.value.focus()
    }
  })
}

const closeDropdown = () => {
  isOpen.value = false
  searchQuery.value = ''
  focusedIndex.value = -1
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      toggleDropdown()
      break
    case 'Escape':
      closeDropdown()
      break
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        openDropdown()
      } else {
        navigateOptions(1)
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (!isOpen.value) {
        openDropdown()
      } else {
        navigateOptions(-1)
      }
      break
  }
}

const navigateOptions = (direction: number) => {
  const options = filteredOptions.value
  if (options.length === 0) return

  focusedIndex.value = Math.max(0, Math.min(options.length - 1, focusedIndex.value + direction))

  nextTick(() => {
    const focusedElement = dropdownMenu.value?.children[focusedIndex.value] as HTMLElement
    if (focusedElement) {
      focusedElement.scrollIntoView({ block: 'nearest' })
    }
  })
}

const handleClickOutside = (event: Event) => {
  if (selectContainer.value && !selectContainer.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(
  () => props.modelValue,
  () => {
    if (selectedOption.value) {
      emit('change', props.modelValue, selectedOption.value)
    }
  }
)
</script>
