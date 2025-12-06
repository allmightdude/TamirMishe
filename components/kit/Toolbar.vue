<template>
  <div class="mb-6">
    <div v-if="$slots['actions-append']" class="mb-4">
      <div class="flex items-center justify-between">
        <slot name="actions-append" />
      </div>
    </div>

    <div
      class="bg-white rounded-2xl border border-gray-100 hover:border-gray-100 transition-all duration-300"
    >
      <div class="p-6">
        <div
          class="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 space-y-3 md:space-y-0"
        >
          <div class="flex items-center space-x-4 space-x-reverse">
            <div
              class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30"
            >
              <Icon name="heroicons:funnel" class="w-6 h-6 text-white" />
            </div>

            <div>
              <h3 class="text-lg font-bold text-gray-900">فیلترهای جستجو</h3>
            </div>
          </div>
        </div>

        <div class="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6"></div>

        <form ref="form" @submit.prevent="() => submit()" class="space-y-6">
          <slot name="filters" v-bind="{ model }" />

          <div
            class="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse pt-6 border-t border-gray-100"
          >
            <KitButton
              type="submit"
              variant="primary"
              size="md"
              icon-left="heroicons:magnifying-glass"
              :full-width="false"
              class="w-full sm:w-auto"
            >
              اعمال فیلتر
            </KitButton>

            <KitButton
              type="button"
              variant="secondary"
              size="md"
              icon-left="heroicons:x-mark"
              :disabled="isEmpty"
              :full-width="false"
              class="w-full sm:w-auto"
              @click="clear"
            >
              پاک کردن
            </KitButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  resource: string
  action?: string
}

const props = withDefaults(defineProps<Props>(), {
  action: 'read',
})

const emit = defineEmits<{
  beforeSubmit: [model: any]
  submit: [model: any]
  clear: []
}>()

const model = ref<Record<string, any>>({})

const assign = (target: any, source: any) => ({ ...target, ...source })

const isEmptyObject = (obj: any) =>
  Object.values(obj).every(
    (value) =>
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0)
  )

const keys = (obj: any) => Object.keys(obj)

const isEmpty = computed(() => isEmptyObject(model.value))

const getStore = () => {
  try {
    return useDynamicStore(props.resource as any)
  } catch (error) {
    console.warn(`Store for resource '${props.resource}' not found`)
    return null
  }
}

const submit = async () => {
  emit('beforeSubmit', model.value)

  const store = getStore()

  if (store) {
    store.setFilters(assign({ page: 1 }, model.value))
  }

  const fetchMethodName = `fetch${props.resource.charAt(0).toUpperCase() + props.resource.slice(1)}`

  await store?.[fetchMethodName]?.()

  emit('submit', { model: model.value })
}

const clear = async () => {
  if (isEmpty.value) return

  keys(model.value).forEach((i) => {
    model.value[i] = null
  })

  const store = getStore()

  if (store) {
    if (typeof store.setData === 'function') {
      store.setData([])
    }

    if (typeof store.setTotal === 'function') {
      store.setTotal(0)
    }
  }

  await submit()
  model.value = {}
}

defineExpose({
  submit,
  clear,
  model,
})
</script>
