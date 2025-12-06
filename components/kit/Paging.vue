<template>
  <div class="kit-paging">
    <div class="kit-paging__controls">
      <!-- First Page Button -->
      <button
        :disabled="modelValue === 1"
        :class="['kit-paging__btn', { 'kit-paging__btn--disabled': modelValue === 1 }]"
        title="اولین"
        @click="first"
      >
        <Icon name="heroicons:chevron-double-right" class="w-4 h-4" />
      </button>

      <button
        :disabled="modelValue === 1"
        :class="['kit-paging__btn', { 'kit-paging__btn--disabled': modelValue === 1 }]"
        title="قبلی"
        @click="prev"
      >
        <Icon name="heroicons:chevron-right" class="w-4 h-4" />
      </button>

      <ul class="kit-paging__pages">
        <li v-if="startPage > 1" class="kit-paging__page-item">
          <button class="kit-paging__page-more" @click="updateValue(startPage)">...</button>
        </li>

        <li v-for="page in visiblePages" :key="page" class="kit-paging__page-item">
          <button
            :class="['kit-paging__page', { 'kit-paging__page--active': page === modelValue }]"
            @click="updateValue(page)"
          >
            {{ page }}
          </button>
        </li>

        <li v-if="endPage < totalPages" class="kit-paging__page-item">
          <button class="kit-paging__page-more" @click="updateValue(endPage + 1)">...</button>
        </li>
      </ul>

      <button
        :disabled="modelValue === totalPages"
        :class="['kit-paging__btn', { 'kit-paging__btn--disabled': modelValue === totalPages }]"
        title="بعدی"
        @click="next"
      >
        <Icon name="heroicons:chevron-left" class="w-4 h-4" />
      </button>

      <button
        :disabled="modelValue === totalPages"
        :class="['kit-paging__btn', { 'kit-paging__btn--disabled': modelValue === totalPages }]"
        title="آخرین"
        @click="last"
      >
        <Icon name="heroicons:chevron-double-left" class="w-4 h-4" />
      </button>
    </div>

    <div class="kit-paging__info">
      <div class="kit-paging__actions">
        <button
          v-if="!noRefresh"
          class="kit-paging__refresh"
          title="بارگذاری مجدد"
          @click="refresh"
        >
          <Icon name="heroicons:arrow-path" class="w-4 h-4" />
        </button>

        <div v-if="pageSizes && pageSizes.length" class="kit-paging__size-wrapper">
          <button
            :class="['kit-paging__size', { 'kit-paging__size--active': sizeMenuOpen }]"
            @click="toggleSizeMenu"
          >
            <span class="kit-paging__size-text">{{ pageSize }}</span>
            <Icon name="heroicons:chevron-up" class="w-3 h-3 kit-paging__size-icon" />
          </button>

          <ul v-if="sizeMenuOpen" class="kit-paging__size-menu">
            <li v-for="size in pageSizes" :key="size">
              <button
                :class="[
                  'kit-paging__size-item',
                  { 'kit-paging__size-item--active': size === pageSize },
                ]"
                @click="updatePageSize(size)"
              >
                {{ size }}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <span class="kit-paging__display">
        نمایش <span class="font-semibold">{{ min }} - {{ max }}</span> از
        <span class="font-semibold">{{ total }}</span>
      </span>
    </div>
  </div>
</template>

<script setup>
const DOTS_COUNT = 5

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 25,
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSizes: {
    type: Array,
    default: () => [10, 25, 50, 100],
  },
  noRefresh: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'update:pageSize', 'refresh'])

const sizeMenuOpen = ref(false)

const totalPages = computed(() => {
  if (props.total > 0 && props.pageSize > 0) {
    return Math.ceil(props.total / props.pageSize)
  }
  return 1
})

const min = computed(() => {
  return Math.min((props.modelValue - 1) * props.pageSize + 1, props.total)
})

const max = computed(() => {
  return Math.min(props.modelValue * props.pageSize, props.total)
})

const startPage = computed(() => {
  return Math.floor((props.modelValue - 1) / DOTS_COUNT) * DOTS_COUNT + 1
})

const endPage = computed(() => {
  return Math.min(startPage.value + DOTS_COUNT - 1, totalPages.value)
})

const visiblePages = computed(() => {
  const pages = []
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i)
  }
  return pages
})

const updateValue = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('update:modelValue', page)
  }
}

const first = () => {
  if (props.modelValue !== 1) {
    updateValue(1)
  }
}

const prev = () => {
  if (props.modelValue > 1) {
    updateValue(props.modelValue - 1)
  }
}

const next = () => {
  if (props.modelValue < totalPages.value) {
    updateValue(props.modelValue + 1)
  }
}

const last = () => {
  if (props.modelValue !== totalPages.value) {
    updateValue(totalPages.value)
  }
}

const updatePageSize = (size) => {
  sizeMenuOpen.value = false
  emit('update:pageSize', size)
  if (props.modelValue !== 1) {
    emit('update:modelValue', 1)
  }
}

const refresh = () => {
  emit('refresh')
}

const toggleSizeMenu = () => {
  sizeMenuOpen.value = !sizeMenuOpen.value
}

const handleClickOutside = (event) => {
  const target = event.target

  if (!target.closest('.kit-paging__size-wrapper')) {
    sizeMenuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss">
.kit-paging {
  @apply flex flex-col sm:flex-row items-center justify-between gap-4 py-4;
}

.kit-paging__controls {
  @apply flex items-center gap-1;
}

.kit-paging__btn {
  @apply flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600;

  &--disabled {
    @apply bg-gray-100 text-gray-400 cursor-not-allowed opacity-50 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-400;
  }
}

.kit-paging__pages {
  @apply flex items-center gap-1;
}

.kit-paging__page-item {
  @apply list-none;
}

.kit-paging__page {
  @apply flex items-center justify-center min-w-[36px] h-9 px-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium transition-all duration-200 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600;

  &--active {
    @apply bg-blue-500 text-white border-blue-600 shadow-md shadow-blue-500/30 hover:bg-blue-600 hover:border-blue-600 hover:text-white;
  }
}

.kit-paging__page-more {
  @apply flex items-center justify-center w-9 h-9 text-gray-400 font-bold hover:text-gray-600;
}

.kit-paging__info {
  @apply flex items-center gap-4;
}

.kit-paging__actions {
  @apply flex items-center gap-2;
}

.kit-paging__refresh {
  @apply flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 bg-white text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600;
}

.kit-paging__size-wrapper {
  @apply relative;
}

.kit-paging__size {
  @apply flex items-center gap-2 h-9 px-3 rounded-lg border border-gray-300 bg-white text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:border-blue-500;

  &--active {
    @apply bg-blue-50 border-blue-500;

    .kit-paging__size-icon {
      @apply rotate-180;
    }
  }
}

.kit-paging__size-text {
  @apply font-medium;
}

.kit-paging__size-icon {
  @apply transition-transform duration-200;
}

.kit-paging__size-menu {
  @apply absolute bottom-full left-0 mb-2 min-w-[80px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50;
}

.kit-paging__size-item {
  @apply w-full px-4 py-2 text-sm text-gray-700 text-center transition-colors duration-150 hover:bg-blue-50;

  &--active {
    @apply bg-blue-600 text-white hover:bg-blue-600;
  }
}

.kit-paging__display {
  @apply text-sm text-gray-600;
}
</style>
