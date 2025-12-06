<template>
  <KitDialog v-model="dialog" size="lg" persistent>
    <template #header>
      {{ form.id ? 'ویرایش مقاله' : 'افزودن مقاله' }}
    </template>

    <form @submit.prevent="save" class="space-y-6">
      <!-- Image Upload Section -->
      <div
        class="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-300"
      >
        <label class="block text-sm font-semibold text-gray-700 mb-4 flex items-center">
          <Icon name="ph:image-bold" class="w-5 h-5 ml-2 text-blue-600" />
          تصویر مقاله
        </label>

        <div class="space-y-4">
          <div v-if="form.image" class="relative group">
            <div class="relative overflow-hidden rounded-xl shadow-lg">
              <img
                :src="form.image"
                alt="Preview"
                class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </div>
            <KitButton
              type="button"
              variant="danger"
              size="xs"
              icon-left="ph:trash-bold"
              class="absolute top-3 right-3 !w-8 !h-8 !p-0 !rounded-full"
              @click="removeImage"
              title="حذف تصویر"
            />
          </div>

          <div v-else class="relative">
            <div class="flex flex-col items-center justify-center py-12 px-4">
              <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Icon name="ph:image-bold" class="w-10 h-10 text-blue-600" />
              </div>
              <p class="text-gray-600 text-sm mb-2">هنوز تصویری انتخاب نشده است</p>
              <p class="text-gray-400 text-xs">JPG, PNG, WebP (حداکثر 5MB)</p>
            </div>
          </div>

          <!-- Upload Button -->
          <div class="flex items-center justify-center gap-4">
            <label
              class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Icon
                :name="uploading ? 'ph:spinner-bold' : 'ph:upload-bold'"
                :class="['w-5 h-5', uploading ? 'animate-spin' : '']"
              />
              <span class="font-medium">{{
                uploading ? 'در حال آپلود...' : form.image ? 'تغییر تصویر' : 'انتخاب تصویر'
              }}</span>
              <input
                type="file"
                @change="handleImageUpload"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                class="hidden"
                :disabled="uploading"
              />
            </label>
          </div>

          <div
            v-if="uploadError"
            class="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2"
          >
            <Icon name="ph:warning-circle-bold" class="w-5 h-5 text-red-600 flex-shrink-0" />
            <span class="text-sm text-red-700">{{ uploadError }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KitInput
          v-model="form.title"
          type="text"
          label="عنوان مقاله"
          placeholder="عنوان مقاله را وارد کنید"
          required
        />

        <KitInput
          v-model="form.subtitle"
          type="text"
          label="زیرعنوان"
          placeholder="زیرعنوان مقاله"
        />
      </div>

      <KitInput
        v-model="form.slug"
        type="text"
        label="شناسه (URL)"
        placeholder="article-slug"
        required
      />
      <p class="text-xs text-gray-500 -mt-4">فقط حروف انگلیسی، اعداد و خط تیره</p>

      <KitInput
        v-model="form.metaDescription"
        type="text"
        label="توضیح کوتاه (SEO)"
        placeholder="خلاصه‌ای از مقاله برای موتورهای جستجو"
      />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KitInput
          v-model="form.excerpt"
          type="text"
          label="خلاصه مقاله"
          placeholder="خلاصه کوتاه برای نمایش در لیست مقالات"
        />

        <KitInput
          v-model="form.category"
          type="text"
          label="دسته‌بندی"
          placeholder="مثال: تعمیرات، لباسشویی، نگهداری"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          برچسب‌ها (جدا شده با کاما)
        </label>
        <KitInput
          v-model="tagsInput"
          type="text"
          placeholder="تعمیرات, لباسشویی, سامسونگ"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          محتوای مقاله
          <span class="text-red-500">*</span>
        </label>
        <KitEditor v-model="form.content" placeholder="محتوای کامل مقاله" />
      </div>

      <div class="p-4 bg-gray-50 rounded-xl">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="form.published"
            type="checkbox"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span class="text-sm font-semibold text-gray-700">منتشر شده</span>
        </label>
      </div>

      <!-- SEO Settings Section -->
      <div class="border-t border-gray-200 pt-6 mt-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-900">تنظیمات SEO</h3>
          <button
            type="button"
            @click="showSEO = !showSEO"
            class="text-sm text-blue-600 hover:text-blue-700 font-semibold"
          >
            {{ showSEO ? 'مخفی کردن' : 'نمایش' }}
          </button>
        </div>

        <div v-show="showSEO" class="space-y-6">
          <KitInput
            v-model="form.seoTitle"
            type="text"
            label="عنوان SEO (اختیاری)"
            placeholder="اگر خالی باشد، از عنوان مقاله استفاده می‌شود"
            :maxlength="70"
            :help="`${form.seoTitle?.length || 0}/70 کاراکتر`"
          />

          <KitInput
            v-model="form.seoCanonical"
            type="text"
            label="Canonical URL (اختیاری)"
            placeholder="https://tamirmaster.com/articles/my-article"
            :help="'اگر خالی باشد، از URL مقاله استفاده می‌شود'"
          />

          <KitSelect
            v-model="form.seoRobots"
            :options="robotsOptions"
            label="Robots Meta"
          />

          <div class="border-t border-gray-200 pt-4">
            <h4 class="text-md font-semibold text-gray-900 mb-4">Open Graph (شبکه‌های اجتماعی)</h4>

            <KitInput
              v-model="form.seoOgTitle"
              type="text"
              label="عنوان Open Graph (اختیاری)"
              placeholder="اگر خالی باشد، از عنوان استفاده می‌شود"
              :maxlength="70"
            />

            <KitTextarea
              v-model="form.seoOgDescription"
              label="توضیحات Open Graph (اختیاری)"
              placeholder="اگر خالی باشد، از توضیحات متا استفاده می‌شود"
              :maxlength="320"
              :rows="2"
            />

            <KitInput
              v-model="form.seoOgImage"
              type="url"
              label="تصویر Open Graph (اختیاری)"
              placeholder="https://tamirmaster.com/images/og-image.jpg"
              :help="'اگر خالی باشد، از تصویر مقاله استفاده می‌شود'"
            />
          </div>

          <KitSelect
            v-model="form.seoTwitterCard"
            :options="twitterCardOptions"
            label="نوع Twitter Card"
          />

          <div class="border-t border-gray-200 pt-4">
            <h4 class="text-md font-semibold text-gray-900 mb-4">Structured Data (JSON-LD)</h4>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                JSON-LD Schema (اختیاری)
              </label>
              <textarea
                v-model="structuredDataText"
                class="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm"
                placeholder='{"@context": "https://schema.org", "@type": "Article", ...}'
                @input="updateStructuredData"
              ></textarea>
              <p class="text-xs text-gray-500 mt-2">
                می‌توانید JSON-LD را به صورت دستی وارد کنید. اگر خالی باشد، به صورت خودکار تولید می‌شود.
              </p>
              <div class="mt-2 flex gap-2">
                <KitButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  @click="loadDefaultArticleSchema"
                >
                  بارگذاری قالب پیش‌فرض
                </KitButton>
                <KitButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  @click="validateJSON"
                >
                  اعتبارسنجی JSON
                </KitButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <KitButton
          type="button"
          variant="secondary"
          size="md"
          @click="dialog = false"
        >
          انصراف
        </KitButton>

        <KitButton
          type="button"
          variant="primary"
          size="md"
          :loading="saving"
          :disabled="saving || uploading"
          @click="save"
        >
          {{ saving ? 'در حال ذخیره...' : form.id ? 'ذخیره تغییرات' : 'افزودن مقاله' }}
        </KitButton>
      </div>
    </template>
  </KitDialog>
</template>

<script setup lang="ts">
type ArticleFormModel = {
  id: string | null
  title: string
  subtitle: string
  slug: string
  content: string
  tags: string[]
  image: string
  metaDescription: string
  excerpt: string
  category: string
  published: boolean
  seoTitle: string
  seoCanonical: string | undefined
  seoRobots: 'index, follow' | 'noindex, follow' | 'index, nofollow' | 'noindex, nofollow'
  seoOgTitle: string | undefined
  seoOgDescription: string | undefined
  seoOgImage: string | undefined
  seoTwitterCard: 'summary' | 'summary_large_image' | 'none'
  seoStructuredData: any
}

const DEFAULT_MODEL: ArticleFormModel = {
  id: null,
  title: '',
  subtitle: '',
  slug: '',
  content: ' ',
  tags: [],
  image: '',
  metaDescription: '',
  excerpt: '',
  category: '',
  published: false,
  seoTitle: '',
  seoCanonical: undefined,
  seoRobots: 'index, follow',
  seoOgTitle: undefined,
  seoOgDescription: undefined,
  seoOgImage: undefined,
  seoTwitterCard: 'summary_large_image',
  seoStructuredData: null,
}

const dialog = ref(false)
const form = ref<ArticleFormModel>({ ...DEFAULT_MODEL })
const tagsInput = ref('')
const uploading = ref(false)
const uploadError = ref('')
const saving = ref(false)
const showSEO = ref(false)
const structuredDataText = ref('')

const robotsOptions = [
  { value: 'index, follow', label: 'index, follow' },
  { value: 'noindex, follow', label: 'noindex, follow' },
  { value: 'index, nofollow', label: 'index, nofollow' },
  { value: 'noindex, nofollow', label: 'noindex, nofollow' },
]

const twitterCardOptions = [
  { value: 'summary', label: 'Summary' },
  { value: 'summary_large_image', label: 'Summary Large Image' },
  { value: 'none', label: 'None' },
]

const set = (article: any) => {
  form.value = {
    id: article.id || null,
    title: article.title || '',
    subtitle: article.subtitle || '',
    slug: article.slug || '',
    content: article.content || ' ',
    tags: article.tags || [],
    image: article.image || '',
    metaDescription: article.metaDescription || '',
    excerpt: article.excerpt || '',
    category: article.category || '',
    published: article.published || false,
    seoTitle: article.seoTitle || '',
    seoCanonical: article.seoCanonical || undefined,
    seoRobots: article.seoRobots || 'index, follow',
    seoOgTitle: article.seoOgTitle || undefined,
    seoOgDescription: article.seoOgDescription || undefined,
    seoOgImage: article.seoOgImage || undefined,
    seoTwitterCard: article.seoTwitterCard || 'summary_large_image',
    seoStructuredData: article.seoStructuredData || null,
  }
  tagsInput.value = article.tags?.join(', ') || ''
  structuredDataText.value = article.seoStructuredData
    ? JSON.stringify(article.seoStructuredData, null, 2)
    : ''
  dialog.value = true
}

watch(dialog, (val: boolean) => {
  if (val) {
    uploadError.value = ''
  } else {
    form.value = { ...DEFAULT_MODEL }
    tagsInput.value = ''
    uploadError.value = ''
    structuredDataText.value = ''
    showSEO.value = false
  }
})

const updateStructuredData = () => {
  try {
    if (structuredDataText.value.trim()) {
      form.value.seoStructuredData = JSON.parse(structuredDataText.value)
    } else {
      form.value.seoStructuredData = null
    }
  } catch (e) {
    // Invalid JSON, will be caught on save
  }
}

const loadDefaultArticleSchema = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public?.baseUrl || 'https://tamirmaster.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: form.value.title || 'عنوان مقاله',
    description: form.value.metaDescription || form.value.subtitle || 'توضیحات مقاله',
    image: form.value.image ? [form.value.image] : [],
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': form.value.seoCanonical || `${baseUrl}/articles/${form.value.slug}`,
    },
  }

  structuredDataText.value = JSON.stringify(schema, null, 2)
  form.value.seoStructuredData = schema
}

const validateJSON = () => {
  try {
    if (structuredDataText.value.trim()) {
      JSON.parse(structuredDataText.value)
      alert('JSON معتبر است ✓')
    } else {
      alert('JSON خالی است')
    }
  } catch (e: any) {
    alert(`JSON نامعتبر: ${e.message}`)
  }
}

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  if (!validTypes.includes(file.type)) {
    uploadError.value = 'فرمت تصویر معتبر نیست. فقط JPG, PNG, WebP مجاز است.'
    return
  }

  const maxSize = 5 * 1024 * 1024 // 5MB

  if (file.size > maxSize) {
    uploadError.value = 'حجم تصویر نباید بیشتر از 5 مگابایت باشد.'
    return
  }

  try {
    uploading.value = true
    uploadError.value = ''

    // For now, convert to base64. You can implement actual file upload later
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      if (imageUrl) {
        form.value.image = imageUrl
      }
    }
    reader.readAsDataURL(file)
  } catch (error: any) {
    uploadError.value = 'خطا در آپلود تصویر'
  } finally {
    uploading.value = false
  }
}

const removeImage = () => {
  form.value.image = ''
  uploadError.value = ''
}

const save = async () => {
  if (!form.value.title?.trim()) {
    alert('عنوان الزامی است')
    return
  }

  if (!form.value.slug?.trim()) {
    alert('شناسه (URL) الزامی است')
    return
  }

  if (!form.value.content?.trim() || form.value.content === ' ') {
    alert('محتوا الزامی است')
    return
  }

  // Parse tags
  form.value.tags = tagsInput.value
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0)

  // Validate structured data JSON
  if (structuredDataText.value.trim()) {
    try {
      form.value.seoStructuredData = JSON.parse(structuredDataText.value)
    } catch (e) {
      alert('JSON-LD نامعتبر است. لطفاً JSON را بررسی کنید.')
      return
    }
  }

  saving.value = true

  try {
    const body = {
      title: form.value.title,
      subtitle: form.value.subtitle,
      slug: form.value.slug,
      content: form.value.content,
      tags: form.value.tags,
      image: form.value.image,
      metaDescription: form.value.metaDescription,
      excerpt: form.value.excerpt,
      category: form.value.category,
      published: form.value.published,
      seoTitle: form.value.seoTitle,
      seoCanonical: form.value.seoCanonical || null,
      seoRobots: form.value.seoRobots,
      seoOgTitle: form.value.seoOgTitle || null,
      seoOgDescription: form.value.seoOgDescription || null,
      seoOgImage: form.value.seoOgImage || null,
      seoTwitterCard: form.value.seoTwitterCard,
      seoStructuredData: form.value.seoStructuredData,
    }

    if (form.value.id) {
      await $fetch(`/api/admin/articles/${form.value.id}`, {
        method: 'PUT',
        body,
        credentials: 'include',
      })
    } else {
      await $fetch('/api/admin/articles', {
        method: 'POST',
        body,
        credentials: 'include',
      })
    }

    dialog.value = false
    // Emit event to refresh list
    emit('saved')
  } catch (error: any) {
    alert(error?.data?.message || error?.message || 'خطا در ذخیره مقاله')
  } finally {
    saving.value = false
  }
}

const emit = defineEmits<{
  saved: []
}>()

defineExpose({ dialog, set })
</script>


