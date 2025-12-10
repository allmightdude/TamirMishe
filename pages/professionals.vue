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
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute top-20 right-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"></div>

      <div class="container-custom relative z-10 py-16 md:py-24">
        <div class="text-center text-white">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            حرفه‌ای‌های مودب و منظم
          </h1>

          <p class="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            به تکنسین‌هایی که وارد خانه شما می‌شوند اعتماد کنید
          </p>
        </div>
      </div>
    </section>

    <section class="bg-gradient-to-b from-gray-50 to-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12 mb-12">
              <div class="prose prose-lg max-w-none">
                <p class="text-gray-700 leading-relaxed mb-6 text-base md:text-lg">
                  اغلب، مشتریان مجبور می‌شوند با شرکت‌های تعمیر لوازم خانگی که تکنسین‌های بی‌رحم، بی‌ملاحظه و آماتور را به خانه‌شان می‌فرستند، تماس بگیرند، نه با تعمیرمستر. ما می دانیم که این تجربه چقدر سخت و اذیت کننده است و متعهد به متفاوت بودن و مسئولیت پذیر بودن هستیم.
                </p>

                <p class="text-gray-700 leading-relaxed mb-6 text-base md:text-lg">
                  به همین دلیل است که می‌توانید مطمئن باشید وقتی با شماره نمایندگی تعمیرمستر تماس می گیرید، با تکنسین‌هایی کار می‌کنید که متخصص، مودب و محترم هستند.
                </p>

                <p class="text-gray-700 leading-relaxed mb-6 text-base md:text-lg">
                  آنها به شما و زمان شما احترام می گذارند، همانطور که شما به زمان و وظایف ما احترام می‌گذارید. همه ی تکنسین های ما موظف هستند در زمانی که با توافق دو طرف برنامه ریزی می شود در محل حاضر بشوند. در صورت حاضر نبودن شما در زمان مقرر شده مسئولیتی به عهده ی تکنسین نیست.
                </p>

                <div class="relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 border-r-4 border-blue-500 pr-6 py-8 my-8 rounded-xl shadow-md overflow-hidden">
                  <!-- Decorative Background Pattern -->
                  <div class="absolute top-0 left-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
                  <div class="absolute bottom-0 right-0 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
                  
                  <div class="relative z-10">
                    <div class="flex items-start gap-4 mb-6">
                      <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Icon name="ph:phone-call-bold" class="w-6 h-6 text-white" />
                      </div>
                      <div class="flex-1">
                        <h3 class="text-xl font-black text-gray-900 mb-2">آماده پاسخگویی هستیم</h3>
                        <p class="text-gray-700 leading-relaxed">
                          مهمتر از آن، ما با لذت بردن در این فرآیند زندگی می کنیم! برای کسب اطلاعات بیشتر، همین امروز با تیم ما تماس بگیرید.
                        </p>
                      </div>
                    </div>

                    <div class="flex flex-wrap gap-4">
                      <a href="tel:09369236420" class="group inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        <Icon name="ph:phone-bold" class="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                        <span>09369236420</span>
                      </a>
                      <a href="tel:09369236420" class="group inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        <Icon name="ph:phone-bold" class="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                        <span>09369236420</span>
                      </a>
                    </div>
                  </div>
                </div>
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
  title: 'تکنسین‌های حرفه‌ای | تعمیرمستر',
  meta: [
    {
      name: 'description',
      content: 'تکنسین‌های متخصص، مودب و محترم تعمیرمستر که به شما و زمان شما احترام می‌گذارند'
    }
  ]
})
</script>

