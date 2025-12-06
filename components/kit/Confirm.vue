<template>
  <KitDialog v-model="value" class="v-confirm" x-small persistent>
    <template #header>
      <h5 v-if="options.title" class="h3 mb10">{{ options.title }}</h5>
    </template>

    <p :class="`h5 ${options.classes}`" v-html="options.html" />

    <template #footer>
      <button
        v-if="options.hasDiscard"
        class="bg-red-500 text-white px-4 py-2 rounded-md"
        :disabled="loading"
        @click="discard"
      >
        {{ options.discardTitle }}
      </button>

      <button
        v-if="options.hasConfirm"
        class="bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
        :loading="loading"
        @click="confirm"
      >
        {{ options.confirmTitle }}
      </button>
    </template>
  </KitDialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { assign } from '~/helpers/object'

interface ConfirmOptions {
  title?: string | null
  html: string
  confirmTitle: string
  confirmColor: string
  discardTitle: string
  discardColor: string
  hasConfirm: boolean
  hasDiscard: boolean
  async: boolean
  classes: string
}

const DEFAULT_OPTIONS: ConfirmOptions = {
  title: null,
  html: 'آیا مطمئن هستید؟',
  confirmTitle: 'بلـه',
  confirmColor: 'info',
  discardTitle: 'لغو',
  discardColor: 'grey',
  hasConfirm: true,
  hasDiscard: true,
  async: false,
  classes: '',
}

const loading = ref<boolean>(false)
const value = ref<boolean>(false)
const options = reactive<ConfirmOptions>({} as ConfirmOptions)

let resolvePromise: ((value: boolean) => void) | null = null
let rejectPromise: ((value: boolean) => void) | null = null

const create = (userOptions: Partial<ConfirmOptions>): Promise<boolean> | undefined => {
  if (value.value) {
    return
  }

  assign(options, DEFAULT_OPTIONS, userOptions)

  value.value = true

  return new Promise<boolean>((resolve, reject) => {
    resolvePromise = resolve
    rejectPromise = reject
  })
}

const discard = (): void => {
  value.value = false
  rejectPromise?.(false)
}

const confirm = (): void => {
  if (options.async) {
    loading.value = true
  } else {
    value.value = false
  }

  resolvePromise?.(true)
}

const complete = (): void => {
  loading.value = false
  value.value = false
}

defineExpose({
  create,
  discard,
  confirm,
  complete,
})
</script>
