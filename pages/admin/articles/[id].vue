<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-gray-900">{{ isEdit ? 'ویرایش مقاله' : 'مقاله جدید' }}</h1>
        <p class="text-gray-600 mt-1">{{ isEdit ? 'ویرایش و به‌روزرسانی مقاله' : 'ایجاد مقاله جدید' }}</p>
      </div>
      <KitButton variant="secondary" @click="$router.back()">بازگشت</KitButton>
    </div>

    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Title -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">عنوان *</label>
          <KitInput
            v-model="form.title"
            type="text"
            placeholder="عنوان مقاله"
            required
            class="w-full"
          />
        </div>

        <!-- Subtitle -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">زیرعنوان</label>
          <KitInput
            v-model="form.subtitle"
            type="text"
            placeholder="زیرعنوان مقاله"
            class="w-full"
          />
        </div>

        <!-- Slug -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">شناسه (URL) *</label>
          <KitInput
            v-model="form.slug"
            type="text"
            placeholder="article-slug"
            required
            class="w-full"
          />
          <p class="text-xs text-gray-500 mt-1">فقط حروف انگلیسی، اعداد و خط تیره</p>
        </div>

        <!-- Image URL -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">آدرس تصویر</label>
          <KitInput
            v-model="form.image"
            type="url"
            placeholder="https://example.com/image.jpg"
            class="w-full"
          />
        </div>

        <!-- Tags -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">برچسب‌ها (جدا شده با کاما)</label>
          <KitInput
            v-model="tagsInput"
            type="text"
            placeholder="تعمیرات, لباسشویی, سامسونگ"
            class="w-full"
          />
        </div>

        <!-- Meta Description -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">توضیحات متا (SEO)</label>
          <KitTextarea
            v-model="form.metaDescription"
            placeholder="توضیحات کوتاه برای موتورهای جستجو"
            :rows="3"
            class="w-full"
          />
        </div>

        <!-- Content Editor -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">محتوا *</label>
          <TipTapEditor
            v-model="form.content"
            placeholder="محتوا را اینجا بنویسید..."
          />
        </div>

        <!-- Published -->
        <div>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="form.published"
              type="checkbox"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span class="text-sm font-semibold text-gray-700">منتشر شده</span>
          </label>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {{ errorMessage }}
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
          {{ successMessage }}
        </div>

        <!-- Submit Button -->
        <div class="flex gap-3">
          <KitButton
            type="submit"
            variant="primary"
            class="flex-1"
            :loading="submitting"
            :disabled="submitting"
          >
            {{ isEdit ? 'به‌روزرسانی' : 'ایجاد' }}
          </KitButton>
          <KitButton
            type="button"
            variant="secondary"
            @click="$router.back()"
          >
            انصراف
          </KitButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const isEdit = id !== 'create'

const form = ref({
  title: '',
  subtitle: '',
  slug: '',
  content: '',
  tags: [] as string[],
  image: '',
  metaDescription: '',
  published: false,
})

const tagsInput = ref('')
const submitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const fetchArticle = async () => {
  if (!isEdit) return

  try {
    const res = await $fetch<{ article: any }>(`/api/admin/articles/${id}`, {
      credentials: 'include'
    })
    
    form.value = {
      title: res.article.title,
      subtitle: res.article.subtitle || '',
      slug: res.article.slug,
      content: res.article.content,
      tags: res.article.tags || [],
      image: res.article.image || '',
      metaDescription: res.article.metaDescription || '',
      published: res.article.published || false,
    }
    
    tagsInput.value = res.article.tags?.join(', ') || ''
  } catch (error) {
    console.error('Error fetching article:', error)
    errorMessage.value = 'خطا در بارگذاری مقاله'
  }
}

const handleSubmit = async () => {
  submitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  // Parse tags
  form.value.tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)

  try {
    if (isEdit) {
      await $fetch(`/api/admin/articles/${id}`, {
        method: 'PUT',
        body: form.value,
        credentials: 'include'
      })
      successMessage.value = 'مقاله با موفقیت به‌روزرسانی شد'
    } else {
      const res = await $fetch<{ success: boolean; message: string; article: any }>('/api/admin/articles', {
        method: 'POST',
        body: form.value,
        credentials: 'include'
      })
      successMessage.value = res.message || 'مقاله با موفقیت ایجاد شد'
      if (res.article?.id) {
        await router.push(`/admin/articles/${res.article.id}`)
      }
    }
  } catch (error: any) {
    errorMessage.value = error?.data?.message || error?.message || 'خطا در ذخیره مقاله'
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  if (isEdit) {
    fetchArticle()
  }
})
</script>

