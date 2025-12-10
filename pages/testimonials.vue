<template>
  <div class="min-h-screen bg-gray-50">
    <div
      class="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50"
      style="transform-origin: right center"
    >
      <div
        class="h-full bg-gradient-to-l from-blue-600 to-blue-400 transition-all duration-300 ease-out"
        :style="{ width: scrollProgress + '%' }"
      ></div>
    </div>

    <section class="contact-us__header relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"></div>

      <div class="container-custom relative z-10 py-16 md:py-24">
        <div class="text-center text-white">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            آنچه مردم در مورد تعمیرمستر می‌گویند
          </h1>

          <p class="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            آیا می‌خواهید در مورد تفاوت‌های تعمیرمستر بدانید؟ آن را مستقیماً از مشتریان ما بشنوید! برخی از بررسی‌های زیر را بررسی کنید تا درباره نحوه کار با تیم حرفه‌ای تعمیر ماشین لباسشویی ما بیشتر بدانید.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-gradient-to-b from-gray-50 to-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="mb-8">
              <p class="text-gray-600 leading-relaxed text-lg">
                اگر قبلاً با ما کار کرده‌اید، ما از شما درخواست می‌کنیم که نظر خود را بنویسید!
              </p>
            </div>

            <!-- Review Form -->
            <div class="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-8 lg:p-12 mb-12 overflow-hidden">
              <!-- Decorative Background Pattern -->
              <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div class="absolute bottom-0 left-0 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div class="relative z-10">
                <div class="flex items-center gap-4 mb-8">
                  <div class="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Icon name="ph:star-bold" class="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 class="text-2xl font-black text-gray-900 mb-1">
                      تجربه خود را با ما به اشتراک بگذارید
                    </h2>
                    <p class="text-sm text-gray-600">
                      نظرات شما برای ما ارزشمند است
                    </p>
                  </div>
                </div>

                <form @submit.prevent="submitReview" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        نام و نام خانوادگی
                      </label>
                      <input
                        v-model="reviewForm.fullName"
                        type="text"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                        placeholder="وارد کنید..."
                        required
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-2">
                        ایمیل
                      </label>
                      <input
                        v-model="reviewForm.email"
                        type="email"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                        placeholder="وارد کنید..."
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      محل زندگی
                    </label>
                    <input
                      v-model="reviewForm.location"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                      placeholder="وارد کنید..."
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      امتیاز
                    </label>
                    <div class="flex items-center gap-2">
                      <button
                        v-for="star in 5"
                        :key="star"
                        type="button"
                        @click="reviewForm.rating = star"
                        class="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Icon
                          :name="star <= reviewForm.rating ? 'ph:star-fill' : 'ph:star'"
                          :class="star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'"
                          class="w-8 h-8"
                        />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      توضیحات
                    </label>
                    <textarea
                      v-model="reviewForm.message"
                      rows="6"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none bg-white"
                      placeholder="نظر خود را بنویسید..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    class="group w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Icon name="ph:paper-plane-tilt-bold" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>ارسال نظر</span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <aside class="lg:col-span-1 space-y-6 lg:sticky lg:top-0 self-start">
            <ReviewsCarousel :reviews="reviews" />

            <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h4 class="text-xl font-black text-gray-900 mb-4">تعمیرمستر</h4>

              <p class="text-sm text-gray-600 leading-relaxed mb-6">
                مرکز تخصصی تعمیرات ماشین لباسشویی تعمیرمستر از بهترین و مجرب‌ترین متخصصین تشکیل شده است. همین امر موجب شده است بهترین خدمات به مشتریان ارائه شود.
              </p>

              <NuxtLink
                to="/contact"
                class="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                تماس با ما
                <Icon name="mdi:arrow-left" class="w-5 h-5 mr-2" />
              </NuxtLink>
            </div>

            <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h4 class="text-xl font-black text-gray-900 mb-6">چرا تعمیرمستر</h4>

              <ul class="space-y-3">
                <li v-for="(item, index) in whyChooseUs" :key="index">
                  <NuxtLink
                    :to="item.link"
                    class="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group"
                  >
                    <div class="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors flex-shrink-0">
                      <Icon :name="item.icon" class="w-4 h-4 text-blue-600" />
                    </div>

                    <span class="text-sm font-medium">{{ item.title }}</span>

                    <Icon name="mdi:chevron-left" class="w-4 h-4 text-gray-400 group-hover:text-blue-600 mr-auto transition-colors" />
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
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

const reviewForm = ref({
  fullName: '',
  email: '',
  location: '',
  message: '',
  rating: 0
})

const submitReview = () => {
  // TODO: Implement API call to submit review
  alert('نظر شما با موفقیت ثبت شد! به زودی بررسی و منتشر خواهد شد.')
  reviewForm.value = {
    fullName: '',
    email: '',
    location: '',
    message: '',
    rating: 0
  }
}

const reviews = ref([
  {
    rating: 3,
    text: 'نه این که آرزو کنم بیشتر وسایلم خراب شوند، اما اگر این کار را بکنند آنقدر ناراحت نمی‌شوم زیرا می‌دانم با چه کسی تماس بگیرم!',
    name: 'جعفرپناهی'
  },
  {
    rating: 3,
    text: 'نه این که آرزو کنم بیشتر وسایلم خراب شوند، اما اگر این کار را بکنند آنقدر ناراحت نمی‌شوم زیرا می‌دانم با چه کسی تماس بگیرم!',
    name: 'جعفرپناهی'
  },
  {
    rating: 3,
    text: 'نه این که آرزو کنم بیشتر وسایلم خراب شوند، اما اگر این کار را بکنند آنقدر ناراحت نمی‌شوم زیرا می‌دانم با چه کسی تماس بگیرم!',
    name: 'جعفرپناهی'
  }
])

const whyChooseUs = ref([
  {
    title: 'کارشناسان واجد شرایط',
    icon: 'ph:user-check-bold',
    link: '/qualified'
  },
  {
    title: 'گارانتی کار و قطعات',
    icon: 'ph:shield-check-bold',
    link: '/qualified'
  },
  {
    title: 'پیش بینی قیمت',
    icon: 'ph:currency-circle-dollar-bold',
    link: '/upfront-pricing'
  },
  {
    title: 'تکنسین های مودب و متحدالشکل',
    icon: 'ph:users-three-bold',
    link: '/professionals'
  },
  {
    title: 'خدمات طبق برنامه شما',
    icon: 'ph:calendar-check-bold',
    link: '/contact'
  },
  {
    title: 'در دسترس بودن',
    icon: 'ph:clock-bold',
    link: '/contact'
  }
])

useHead({
  title: 'نظرات مشتریان | تعمیرمستر',
  meta: [
    {
      name: 'description',
      content: 'نظرات و تجربیات مشتریان تعمیرمستر در مورد خدمات تعمیرات ماشین لباسشویی'
    }
  ]
})
</script>

