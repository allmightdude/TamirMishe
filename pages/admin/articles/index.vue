<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-gray-900">مدیریت مقالات</h1>
        <p class="text-gray-600 mt-1">مدیریت و ایجاد مقالات</p>
      </div>
      <KitButton variant="primary" icon-left="ph:plus-bold" @click="createHandler">
        مقاله جدید
      </KitButton>
    </div>

    <!-- Articles DataTable -->
    <KitDataTable
      :headers="headers"
      :data="articles"
      :loading="loading"
    >
      <template v-slot:[`item.status`]="{ item }">
        <span
          :class="[
            'text-xs font-bold px-3 py-1 rounded-full',
            item.published
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          ]"
        >
          {{ item.published ? 'منتشر شده' : 'پیش‌نویس' }}
        </span>
      </template>

      <template v-slot:[`item.createdAt`]="{ item }">
        <span class="text-sm text-gray-600">
          {{ formatDate(item.createdAt) }}
        </span>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div class="flex items-center gap-2">
          <button
            @click="editArticle(item)"
            class="text-blue-600 hover:text-blue-700 text-sm font-semibold"
          >
            ویرایش
          </button>
          <button
            @click="deleteArticle(item.id)"
            class="text-red-600 hover:text-red-700 text-sm font-semibold"
          >
            حذف
          </button>
        </div>
      </template>
    </KitDataTable>

    <!-- Create/Update Dialog -->
    <ArticleCreateOrUpdate ref="createRef" @saved="fetchArticles" />
  </div>
</template>

<script setup lang="ts">
import ArticleCreateOrUpdate from './_createOrUpdate.vue'
import { useDate } from '~/composables/useDate'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const { formatDate: formatDateHelper } = useDate()

const articles = ref<any[]>([])
const loading = ref(true)
const createRef = ref()

const headers = [
  { value: 'title', title: 'عنوان' },
  { value: 'slug', title: 'شناسه' },
  { value: 'status', title: 'وضعیت' },
  { value: 'createdAt', title: 'تاریخ' },
]

const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return ''
  try {
    return formatDateHelper(date)
  } catch {
    return new Date(date).toLocaleDateString('fa-IR')
  }
}

const createHandler = () => {
  createRef.value?.set({})
}

const editArticle = (article: any) => {
  createRef.value?.set(article)
}

const fetchArticles = async () => {
  loading.value = true
  try {
    const res = await $fetch<{ data: any[] }>('/api/admin/articles')
    articles.value = res.data || []
  } catch (error) {
    console.error('Error fetching articles:', error)
    articles.value = []
  } finally {
    loading.value = false
  }
}

const deleteArticle = async (articleId: string) => {
  if (!confirm('آیا از حذف این مقاله اطمینان دارید؟')) return

  try {
    await $fetch(`/api/admin/articles/${articleId}`, {
      method: 'DELETE'
    })
    await fetchArticles()
  } catch (error) {
    console.error('Error deleting article:', error)
    alert('خطا در حذف مقاله')
  }
}

onMounted(() => {
  fetchArticles()
})
</script>

