<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-10">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in headers"
              :key="header.value"
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header.title }}
            </th>
            <th
              v-if="hasActionsSlot"
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              عملیات
            </th>
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(item, index) in tableData"
            :key="index"
            class="hover:bg-gray-50 transition-colors"
          >
            <td
              v-for="header in headers"
              :key="header.value"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              <slot
                :name="`item.${header.value}`"
                :item="item"
                :index="index"
                :value="getNestedValue(item, header.value)"
              >
                {{ getNestedValue(item, header.value) }}
              </slot>
            </td>

            <td v-if="hasActionsSlot" class="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <slot name="item.actions" :item="item" :index="index" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="tableData.length === 0" class="text-center py-12">
      <svg
        v-if="!tableLoading"
        class="w-12 h-12 text-gray-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <div v-if="tableLoading" class="flex items-center justify-center">
        <Icon name="heroicons:arrow-path" class="w-8 h-8 text-blue-600 animate-spin" />
      </div>
      <p class="text-gray-500 mt-4">
        {{ tableLoading ? 'در حال بارگذاری...' : 'هیچ داده‌ای یافت نشد' }}
      </p>
    </div>

    <div v-if="paging && resource" class="border-t border-gray-100 py-4 px-6">
      <KitPaging
        :model-value="pagination.pageNumber"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :page-sizes="pageSizes"
        :no-refresh="noRefresh"
        @update:model-value="updatePageNumber"
        @update:page-size="updatePageSize"
        @refresh="onRefresh"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Header {
  value: string
  title: string
}

interface Props {
  title?: string
  headers: Header[]
  data?: any[]
  resource?: string
  loading?: boolean
  pageSizes?: number[]
  paging?: boolean
  noRefresh?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  resource: undefined,
  loading: false,
  pageSizes: () => [10, 25, 50, 100],
  paging: true,
  noRefresh: false,
})

const slots = useSlots()

const hasActionsSlot = computed(() => {
  return !!slots['item.actions']
})

const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((current: any, key: string) => current?.[key], obj)
}

const store = computed(() => {
  if (!props.resource) return null

  return useDynamicStore(props.resource)
})

const tableData = computed(() => {
  if (props.resource && store.value) {
    const storeData = (store.value as any)[props.resource]

    return storeData || []
  }

  return props.data
})

const tableLoading = computed(() => {
  if (props.resource && store.value) {
    return (store.value as any).loading
  }

  return props.loading
})

const pagination = computed(() => {
  if (props.resource && store.value) {
    return (store.value as any).pagination
  }

  return { total: 0, pageNumber: 1, pageSize: 25, totalPages: 0 }
})

const updatePageNumber = (newPage: number) => {
  if (store.value) {
    ;(store.value as any).setFilters({ pageNumber: newPage })

    fetchData()
  }
}

const updatePageSize = (newSize: number) => {
  if (store.value) {
    ;(store.value as any).setFilters({ pageSize: newSize, pageNumber: 1 })
    fetchData()
  }
}

const fetchData = () => {
  if (!store.value || !props.resource) return

  const fetchMethodMap: Record<string, string> = {
    articles: 'fetchArticles',
    jobs: 'fetchJobs',
    users: 'fetchUsers',
    categories: 'fetchCategories',
    resumes: 'fetchResumes',
    directors: 'fetchDirectors',
  }

  const methodName = fetchMethodMap[props.resource]

  const fetchMethod = (store.value as any)[methodName]

  if (methodName && typeof fetchMethod === 'function') {
    fetchMethod()
  }
}

const onRefresh = () => {
  fetchData()
}

onMounted(() => {
  if (props.resource && store.value) {
    ;(store.value as any).resetFilters()
    fetchData()
  }
})
</script>
