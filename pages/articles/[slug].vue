<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Scroll Progress Indicator -->
    <div
      class="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50"
      style="transform-origin: right center"
    >
      <div
        class="h-full bg-gradient-to-l from-blue-600 to-blue-400 transition-all duration-300 ease-out"
        :style="{ width: scrollProgress + '%' }"
      ></div>
    </div>

    <!-- Hero Section with Image -->
    <section
      v-if="article?.image"
      class="relative h-[60vh] flex items-center justify-center overflow-hidden"
    >
      <div class="absolute inset-0">
        <img
          :src="article.image"
          :alt="article.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div class="relative z-10 text-center text-white max-w-7xl mx-auto px-4">
        <h1 class="text-3xl lg:text-5xl font-black mb-4 leading-tight">
          {{ article?.title || 'مقاله' }}
        </h1>
        <p class="text-lg lg:text-xl font-light leading-relaxed max-w-3xl mx-auto">
          {{ article?.subtitle || article?.metaDescription || 'مقالات و راهنمای تعمیرات ماشین لباسشویی' }}
        </p>
      </div>
    </section>

    <!-- Fallback Header if no image -->
    <section
      v-else
      class="contact-us__header relative overflow-hidden"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"></div>
      <div class="container-custom relative z-10 py-16 md:py-24">
        <div class="text-center text-white">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            {{ article?.title || 'مقاله' }}
          </h1>
          <p class="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            {{ article?.subtitle || article?.metaDescription || 'مقالات و راهنمای تعمیرات ماشین لباسشویی' }}
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="bg-gradient-to-b from-gray-50 to-white py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Author and Meta Information -->
        <div class="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div class="flex items-center gap-4">
            <!-- Author Avatar -->
            <img
              v-if="article?.author?.avatar"
              :src="article.author.avatar"
              :alt="article.author.fullName"
              class="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div
              v-else
              class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg"
            >
              {{ article?.author?.fullName?.charAt(0) || 'ت' }}
            </div>

            <!-- Author Info -->
            <div class="text-right">
              <div class="font-medium text-gray-900">
                {{ article?.author?.fullName || 'تعمیرمستر' }}
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <span v-if="article?.publishedAt">
                  {{ formatDate(article.publishedAt) }}
                </span>
                <span v-else-if="article?.createdAt">
                  {{ formatDate(article.createdAt) }}
                </span>
                <span v-if="readingTime > 0">•</span>
                <span v-if="readingTime > 0">خواندن {{ readingTime }} دقیقه</span>
              </div>
            </div>
          </div>

          <!-- Social Share Buttons -->
          <div class="flex items-center gap-4">
            <button
              @click="shareOnLinkedIn"
              class="text-gray-400 hover:text-gray-600 transition-colors"
              title="اشتراک در LinkedIn"
            >
              <Icon name="mdi:linkedin" class="w-5 h-5" />
            </button>
            <button
              @click="shareOnTwitter"
              class="text-gray-400 hover:text-gray-600 transition-colors"
              title="اشتراک در Twitter"
            >
              <Icon name="mdi:twitter" class="w-5 h-5" />
            </button>
            <button
              @click="shareOnWhatsApp"
              class="text-gray-400 hover:text-gray-600 transition-colors"
              title="اشتراک در WhatsApp"
            >
              <Icon name="mdi:whatsapp" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Category/Tags -->
        <div v-if="article?.category || (article?.tags && article.tags.length > 0)" class="mb-6">
          <div v-if="article?.category" class="mb-3">
            <span class="bg-green-100 text-green-800 text-sm px-4 py-2 rounded-full">
              {{ article.category }}
            </span>
          </div>
          <div v-if="article?.tags && article.tags.length > 0" class="flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in article.tags"
              :key="index"
              class="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Article Content -->
        <div
          class="max-w-none text-gray-700 leading-relaxed editor-content mb-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12"
          v-html="article?.content"
        ></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// Make slug reactive
const slug = computed(() => route.params.slug as string)

// Fetch article with SSR - reactive to route changes
const { data: articleData, error } = await useAsyncData(
  () => `article-${slug.value}`,
  () => $fetch<{ article: any }>(`/api/articles/${slug.value}`),
  {
    watch: [slug],
  }
)

const article = computed(() => articleData.value?.article)

// Handle 404
if (error.value || !article.value) {
  throw createError({
    status: 404,
    statusText: 'مقاله یافت نشد',
  })
}

// Scroll progress
const scrollProgress = ref(0)

const handleScroll = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY
  const trackLength = documentHeight - windowHeight
  const percentage = (scrollTop / trackLength) * 100
  scrollProgress.value = Math.min(100, Math.max(0, percentage))
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Calculate reading time (average 200 words per minute)
const readingTime = computed(() => {
  if (!article.value?.content) return 0
  const text = article.value.content.replace(/<[^>]*>/g, '') // Remove HTML tags
  const words = text.split(/\s+/).filter((word: string) => word.length > 0).length
  return Math.ceil(words / 200)
})

// Date formatting
const { formatDate: formatDateHelper } = useDate()
const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return ''
  try {
    return formatDateHelper(date)
  } catch {
    return ''
  }
}

// Social sharing functions
const shareOnLinkedIn = () => {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
}

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(article.value?.title || '')
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const shareOnWhatsApp = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(article.value?.title || '')
  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank')
}

// SEO Meta Tags - Using article's SEO fields
const config = useRuntimeConfig()
const baseUrl = config.public?.baseUrl || 'https://tamirmaster.com'

watch(
  () => article.value,
  (art: any) => {
    if (!art) return

    // Use SEO title if available, otherwise use article title
    const seoTitle = art.seoTitle || art.title
    const fullTitle = `${seoTitle} | تعمیرمستر`

    // Use SEO canonical if available, otherwise use article URL
    const canonical = art.seoCanonical
      ? art.seoCanonical.startsWith('http')
        ? art.seoCanonical
        : `${baseUrl}${art.seoCanonical}`
      : `${baseUrl}/articles/${art.slug}`

    // Use OG image if available, otherwise use article image
    const ogImage = art.seoOgImage
      ? art.seoOgImage.startsWith('http')
        ? art.seoOgImage
        : `${baseUrl}${art.seoOgImage}`
      : art.image
      ? art.image.startsWith('http')
        ? art.image
        : `${baseUrl}${art.image}`
      : null

    // Use OG title/description if available, otherwise fallback to article fields
    const ogTitle = art.seoOgTitle || art.title
    const ogDescription = art.seoOgDescription || art.metaDescription || art.subtitle || ''

    useHead({
      title: fullTitle,
      meta: [
        {
          name: 'description',
          content: art.metaDescription || art.subtitle || 'مقالات و راهنمای تعمیرات ماشین لباسشویی',
        },
        {
          name: 'robots',
          content: art.seoRobots || 'index, follow',
        },
        {
          property: 'og:title',
          content: ogTitle,
        },
        {
          property: 'og:description',
          content: ogDescription,
        },
        {
          property: 'og:type',
          content: 'article',
        },
        {
          property: 'og:url',
          content: canonical,
        },
        ...(ogImage
          ? [
              {
                property: 'og:image',
                content: ogImage,
              },
            ]
          : []),
        {
          name: 'twitter:card',
          content: art.seoTwitterCard || 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: ogTitle,
        },
        {
          name: 'twitter:description',
          content: ogDescription,
        },
        ...(ogImage
          ? [
              {
                name: 'twitter:image',
                content: ogImage,
              },
            ]
          : []),
        {
          name: 'keywords',
          content: art.tags?.join(', ') || '',
        },
      ],
      link: [
        {
          rel: 'canonical',
          href: canonical,
        },
      ],
      htmlAttrs: {
        dir: 'rtl',
        lang: 'fa',
      },
    })

    // Add structured data if available
    const structuredData = art.seoStructuredData || {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: art.title,
      description: art.metaDescription || art.subtitle,
      image: art.image ? [art.image.startsWith('http') ? art.image : `${baseUrl}${art.image}`] : [],
      datePublished: art.publishedAt || art.createdAt,
      dateModified: art.updatedAt,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonical,
      },
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(structuredData),
        },
      ],
    })
  },
  { immediate: true }
)
</script>

<style scoped>
.editor-content :deep(p) {
  @apply text-gray-700 leading-relaxed mb-4 text-base md:text-lg;
}

.editor-content :deep(h1) {
  @apply text-3xl font-black text-gray-900 mt-8 mb-4;
}

.editor-content :deep(h2) {
  @apply text-2xl font-black text-gray-900 mt-8 mb-4;
}

.editor-content :deep(h3) {
  @apply text-xl font-black text-gray-900 mt-6 mb-4;
}

/* Unordered Lists (Bullet Lists) */
.editor-content :deep(ul) {
  list-style-type: disc !important;
  margin: 1rem 0 !important;
  padding-right: 2rem !important;
  padding-left: 0 !important;
  direction: rtl;
}

.editor-content :deep(ul li) {
  @apply text-gray-700 leading-relaxed mb-2;
  display: list-item !important;
  list-style-position: outside !important;
  margin-right: 1.5rem !important;
  margin-left: 0 !important;
}

/* Nested unordered lists */
.editor-content :deep(ul ul) {
  list-style-type: circle;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-right: 1.5rem;
}

.editor-content :deep(ul ul ul) {
  list-style-type: square;
}

/* Ordered Lists (Numbered Lists) */
.editor-content :deep(ol) {
  list-style-type: decimal !important;
  margin: 1rem 0 !important;
  padding-right: 2rem !important;
  padding-left: 0 !important;
  direction: rtl;
}

.editor-content :deep(ol li) {
  @apply text-gray-700 leading-relaxed mb-2;
  display: list-item !important;
  list-style-position: outside !important;
  margin-right: 1.5rem !important;
  margin-left: 0 !important;
}

/* Nested ordered lists */
.editor-content :deep(ol ol) {
  list-style-type: lower-alpha;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-right: 1.5rem;
}

.editor-content :deep(ol ol ol) {
  list-style-type: lower-roman;
}

/* Mixed nested lists */
.editor-content :deep(ul ol),
.editor-content :deep(ol ul) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding-right: 1.5rem;
}

.editor-content :deep(blockquote) {
  @apply border-r-4 border-blue-500 pr-4 my-6 italic text-gray-700;
}

.editor-content :deep(hr) {
  @apply border-gray-300 my-8;
}

.editor-content :deep(img) {
  @apply w-full h-auto rounded-lg shadow-md my-6;
}

.editor-content :deep(a) {
  @apply text-blue-600 hover:text-blue-700 underline;
}

.editor-content :deep(strong) {
  @apply font-bold text-gray-900;
}

.editor-content :deep(em) {
  @apply italic;
}

.editor-content :deep(code) {
  @apply bg-gray-100 px-2 py-1 rounded text-sm font-mono;
}

.editor-content :deep(pre) {
  @apply bg-gray-100 p-4 rounded-lg overflow-x-auto my-4;
}

.editor-content :deep(pre code) {
  @apply bg-transparent p-0;
}

</style>
