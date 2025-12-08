<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute top-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div class="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div class="container-custom relative z-10 py-20 md:py-32">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Icon name="ph:sparkle-fill" class="w-4 h-4" style="color: #eab308" />

            <span class="text-sm font-semibold">درباره تعمیرمستر</span>
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl md:text-6xl font-black mb-6 leading-tight">
            ما
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">متخصص</span>
            تعمیرات هستیم
          </h1>

          <p class="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
            بیش از ۱۰ سال تجربه در ارائه خدمات تعمیرات لباسشویی و ماشین ظرفشویی با بالاترین کیفیت و سریع‌ترین زمان پاسخگویی
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NuxtLink 
              to="/contact" 
              class="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <span>تماس با ما</span>
              
              <Icon name="ph:arrow-left-bold" class="w-5 h-5" />
            </NuxtLink>

            <NuxtLink 
              to="/" 
              class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg border-2 border-white/20 transition-all duration-300"
            >
              <Icon name="ph:house-bold" class="w-5 h-5" />
              <span>صفحه اصلی</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Wave Divider -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-16 md:py-24 bg-white relative">
      <!-- Decorative Shape -->
      <div class="absolute top-10 right-10 w-32 h-32 opacity-30 pointer-events-none">
        <img src="/images/h9-shape6.png" alt="" class="w-full h-full object-contain">
      </div>

      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Left: Images -->
          <div class="relative">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-4">
                <div class="relative h-64 rounded-md overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <img src="/images/1.jpg" alt="تعمیرات" class="w-full h-full object-cover">
                </div>

                <div class="relative h-48 rounded-md overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <img src="/images/howwashipic2.jpg" alt="خدمات" class="w-full h-full object-cover">
                </div>
              </div>

              <div class="space-y-4 pt-12">
                <div class="relative h-48 rounded-md overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <img src="/images/2714870.jpg" alt="تیم" class="w-full h-full object-cover">
                </div>

                <div class="relative h-64 rounded-md overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <img src="/images/1.jpg" alt="کیفیت" class="w-full h-full object-cover">
                </div>
              </div>
            </div>

            <!-- Floating Stats Card -->
            <div class="absolute -bottom-8 -left-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-2xl">
              <div class="text-white text-center">
                <div class="text-4xl font-black mb-1">۱۰+</div>
                
                <div class="text-sm">سال تجربه</div>
              </div>
            </div>
          </div>

          <!-- Right: Content -->
          <div>
            <div class="inline-block px-4 py-2 bg-blue-50 rounded-full mb-4">
              <span class="text-sm font-bold text-blue-600">داستان ما</span>
            </div>

            <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
              سفر ما از یک تیم کوچک تا بزرگترین مرکز تعمیرات
            </h2>

            <p class="text-base text-gray-600 leading-relaxed mb-6">
              تعمیرمستر در سال ۱۳۹۳ با هدف ارائه بهترین خدمات تعمیرات لباسشویی و ماشین ظرفشویی در منزل مشتریان شروع به کار کرد. از همان ابتدا، تمرکز ما بر کیفیت، سرعت و رضایت مشتری بود.
            </p>

            <p class="text-base text-gray-600 leading-relaxed mb-8">
              امروزه با بیش از ۲۰ شعبه در سراسر کشور، تیمی متشکل از ۵۰ تکنسین متخصص و بیش از ۸۵۰۰ مشتری راضی، افتخار می‌کنیم که یکی از پیشگامان صنعت تعمیرات در ایران هستیم.
            </p>

            <!-- Features Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="ph:certificate-bold" class="w-6 h-6 text-blue-600" />
                </div>

                <div>
                  <div class="text-sm font-black text-gray-900">مجوز رسمی</div>

                  <div class="text-xs text-gray-500">تایید شده</div>
                </div>
              </div>

              <div class="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="ph:medal-bold" class="w-6 h-6 text-green-600" />
                </div>

                <div>
                  <div class="text-sm font-black text-gray-900">تضمین کیفیت</div>

                  <div class="text-xs text-gray-500">۱۰۰٪ تضمین</div>
                </div>
              </div>

              <div class="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: #eab308">
                  <Icon name="ph:clock-bold" class="w-6 h-6 text-white" />
                </div>

                <div>
                  <div class="text-sm font-black text-gray-900">پاسخ سریع</div>

                  <div class="text-xs text-gray-500">کمتر از ۲ ساعت</div>
                </div>
              </div>

              <div class="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="ph:shield-check-bold" class="w-6 h-6 text-purple-600" />
                </div>

                <div>
                  <div class="text-sm font-black text-gray-900">ضمانت کتبی</div>

                  <div class="text-xs text-gray-500">۶ ماه</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-block px-4 py-2 bg-blue-50 rounded-full mb-4">

            <span class="text-sm font-bold text-blue-600">مسیر پیشرفت</span>
          </div>

          <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            سفر ما در طول سال‌ها
          </h2>

          <p class="text-base text-gray-600">
            از یک تیم کوچک تا بزرگترین مرکز تخصصی تعمیرات در کشور
          </p>
        </div>

        <div class="relative max-w-5xl mx-auto">
          <!-- Desktop Navigation Arrows -->
          <button 
            @click="prevYear" 
            :disabled="selectedYearIndex === 0"
            class="hidden md:flex absolute -right-4 md:-right-12 top-8 w-12 h-12 bg-white hover:bg-blue-50 border-2 border-gray-200 rounded-full items-center justify-center text-blue-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg z-30"
          >
            <Icon name="ph:caret-right-bold" class="w-6 h-6" />
          </button>

          <button 
            @click="nextYear" 
            :disabled="selectedYearIndex === timeline.length - 1"
            class="hidden md:flex absolute -left-4 md:-left-12 top-8 w-12 h-12 bg-white hover:bg-blue-50 border-2 border-gray-200 rounded-full items-center justify-center text-blue-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg z-30"
          >
            <Icon name="ph:caret-left-bold" class="w-6 h-6" />
          </button>

          <!-- Mobile Navigation Buttons -->
          <div class="md:hidden flex justify-center gap-4 mb-6">
            <button 
              @click="prevYear" 
              :disabled="selectedYearIndex === 0"
              class="w-10 h-10 bg-white hover:bg-blue-50 border-2 border-gray-200 rounded-full flex items-center justify-center text-blue-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
            >
              <Icon name="ph:caret-right-bold" class="w-5 h-5" />
            </button>
            <button 
              @click="nextYear" 
              :disabled="selectedYearIndex === timeline.length - 1"
              class="w-10 h-10 bg-white hover:bg-blue-50 border-2 border-gray-200 rounded-full flex items-center justify-center text-blue-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
            >
              <Icon name="ph:caret-left-bold" class="w-5 h-5" />
            </button>
          </div>

          <div class="relative mb-8 md:mb-12">
            <div class="hidden md:flex items-center px-4">
              <template v-for="(item, index) in timeline" :key="index">
                <button
                  @click="selectYear(index)"
                  class="flex flex-col items-center gap-2 transition-all duration-300 group flex-shrink-0"
                >
                  <div 
                    :class="[
                      'w-16 h-16 rounded-xl flex items-center justify-center font-black text-lg transition-all duration-300 relative z-10',
                      selectedYearIndex === index 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white scale-110' 
                        : 'bg-white text-gray-400 hover:text-gray-600'
                    ]"
                  >
                    {{ item.year }}
                  </div>

                  <!-- Dot Indicator -->
                  <div 
                    :class="[
                      'w-3 h-3 rounded-full transition-all duration-300 relative z-10',
                      selectedYearIndex === index 
                        ? 'bg-blue-500 scale-150' 
                        : 'bg-gray-300'
                    ]"
                  ></div>
                </button>

                <div 
                  v-if="index < timeline.length - 1" 
                  class="flex flex-grow h-0.5 mx-2 relative"
                >
                  <div class="absolute inset-0 bg-gray-200"></div>
                  <div 
                    :class="[
                      'absolute inset-0 transition-all duration-500',
                      index < selectedYearIndex ? 'bg-blue-500' : 'bg-transparent'
                    ]"
                  ></div>
                </div>
              </template>
            </div>

            <div 
              ref="mobileTimelineRef"
              class="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide" 
              style="scrollbar-width: none; -ms-overflow-style: none;"
            >
              <div class="flex items-center gap-6 min-w-max px-4 mt-4">
                <template v-for="(item, index) in timeline" :key="index">
                  <button
                    :ref="el => { if (el) yearButtonRefs[index] = el }"
                    @click="selectYear(index)"
                    class="flex flex-col items-center gap-3 transition-all duration-300 group flex-shrink-0"
                  >
                    <div 
                      :class="[
                        'w-14 h-14 rounded-xl flex items-center justify-center font-black text-base transition-all duration-300 relative z-10',
                        selectedYearIndex === index 
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white scale-110 ring-4 ring-blue-200' 
                          : 'bg-white text-gray-400 border-2 border-gray-200'
                      ]"
                    >
                      {{ item.year }}
                    </div>

                    <div 
                      :class="[
                        'w-2.5 h-2.5 rounded-full transition-all duration-300 relative z-10',
                        selectedYearIndex === index 
                          ? 'bg-blue-500 scale-150 ring-2 ring-blue-200' 
                          : 'bg-gray-300'
                      ]"
                    ></div>
                  </button>

                  <div 
                    v-if="index < timeline.length - 1" 
                    class="w-8 h-0.5 relative flex-shrink-0"
                  >
                    <div class="absolute inset-0 bg-gray-200 rounded-full"></div>
                    <div 

                      :class="[
                        'absolute inset-0 rounded-full transition-all duration-500',
                        index < selectedYearIndex ? 'bg-blue-500' : 'bg-transparent'
                      ]"
                    ></div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <!-- Timeline Content Card -->
          <Transition
            enter-active-class="transition-all duration-500"
            leave-active-class="transition-all duration-300"
            enter-from-class="opacity-0 scale-95 translate-y-10"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 -translate-y-10"
            mode="out-in"
          >
            <div :key="selectedYearIndex" class="bg-white rounded-2xl p-6 md:p-12 shadow-2xl border border-gray-100 mx-2 md:mx-0">
              <div class="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                <div class="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Icon name="ph:calendar-check-bold" class="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>

                <div class="flex-grow w-full">
                  <div class="text-xs md:text-sm font-bold text-blue-500 mb-2">سال {{ timeline[selectedYearIndex].year }}</div>
                  <h3 class="text-xl md:text-3xl font-black text-gray-900 mb-3 md:mb-4 leading-tight">
                    {{ timeline[selectedYearIndex].title }}
                  </h3>
                  <p class="text-sm md:text-base text-gray-600 leading-relaxed">
                    {{ timeline[selectedYearIndex].description }}
                  </p>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 text-white relative overflow-hidden">
      <!-- Background Image -->
      <div 
        class="absolute inset-0 opacity-40"
        style="background-image: url('/images/abstract-minimal-geometric-shape-background-with-gradient-free-vector.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;"
      ></div>
      
      <!-- Gradient Overlay for better text readability -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-900/75 via-primary-900/75 to-gray-900/75"></div>

      <div class="container-custom relative z-10">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-black mb-4">اعداد و ارقام ما</h2>
          <p class="text-gray-300">موفقیت‌های ما در یک نگاه</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center group">
            <div class="inline-flex w-20 h-20 rounded-xl items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-2xl">
              <Icon :name="stat.icon" class="w-10 h-10 text-white" />
            </div>

            <div class="text-4xl md:text-5xl font-black mb-2">
              {{ stat.number }}<span class="text-blue-400">+</span>
            </div>

            <p class="text-sm font-semibold text-gray-300">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-16 md:py-24 bg-white">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-block px-4 py-2 bg-blue-50 rounded-full mb-4">
            <span class="text-sm font-bold text-blue-600">ارزش‌های ما</span>
          </div>

          <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            چرا ما را انتخاب کنید؟
          </h2>

          <p class="text-base text-gray-600">
            ارزش‌هایی که ما را از دیگران متمایز می‌کند
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(value, index) in values" :key="index" class="group p-8 border-2 border-gray-100 hover:border-blue-200 transition-all duration-300">
            <div class="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300">
              <Icon :name="value.icon" class="w-8 h-8" :style="{ color: value.color }" />
            </div>

            <h3 class="text-xl font-black text-gray-900 mb-3">
              {{ value.title }}
            </h3>

            <p class="text-sm text-gray-600 leading-relaxed">
              {{ value.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 md:py-24 bg-gradient-to-r from-blue-500 to-blue-600 text-white relative overflow-hidden">
      <!-- Pattern Background -->
      <div 
        class="absolute inset-0 opacity-25"
        style="background-image: url('/images/wmremove-transformed-removebg-preview.png'); background-repeat: repeat; background-size: 350px 350px; background-position: 0 0; mix-blend-mode: overlay;"
      ></div>
      
      <div 
        class="absolute inset-0 opacity-10"
        style="background-image: url('/images/wmremove-transformed-removebg-preview.png'); background-repeat: repeat; background-size: 500px 500px; background-position: 100px 100px; filter: invert(1); mix-blend-mode: soft-light;"
      ></div>
      
      <div class="absolute inset-0 bg-gradient-to-r from-[#f1c40f]/60 to-[#f1c40f]/80"></div>
      
      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl md:text-5xl font-black mb-6">
            آماده شروع همکاری با ما هستید؟
          </h2>

          <p class="text-lg text-blue-100 mb-8">
            همین حالا با ما تماس بگیرید و از خدمات تخصصی ما بهره‌مند شوید
          </p>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NuxtLink 
              to="/contact" 
              class="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Icon name="ph:phone-bold" class="w-5 h-5" />
              <span>تماس با ما</span>
            </NuxtLink>

            <a 
              href="tel:09369236420" 
              class="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg border-2 border-white/30 transition-all duration-300"
            >
              <Icon name="ph:device-mobile-bold" class="w-5 h-5" />
              <span class="ltr">09369236420</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'درباره ما | تعمیرمستر - متخصص تعمیرات لباسشویی',
  meta: [
    {
      name: 'description',
      content: 'بیش از ۱۰ سال تجربه در ارائه خدمات تعمیرات لباسشویی و ماشین ظرفشویی. تیمی متخصص، پاسخ سریع، و کیفیت تضمین شده.'
    }
  ]
})

// Timeline State
const selectedYearIndex = ref(0)

// Timeline Data
const timeline = ref([
  {
    year: '۱۳۹۳',
    title: 'شروع یک رویا با تیم کوچک اما قوی',
    description: 'با تیمی متشکل از ۵ نفر متخصص و یک دفتر کوچک، فعالیت خود را در زمینه تعمیرات لباسشویی آغاز کردیم. از همان ابتدا، کیفیت و رضایت مشتری اولویت اصلی ما بود.'
  },
  {
    year: '۱۳۹۵',
    title: 'شروع همکاری با برندهای معتبر',
    description: 'با ارائه خدمات باکیفیت، توانستیم اعتماد برندهای معتبر را جلب کنیم و به عنوان مرکز تعمیرات مجاز فعالیت کنیم. در این سال، شعبه دوم خود را افتتاح کردیم.'
  },
  {
    year: '۱۳۹۷',
    title: 'سرمایه‌گذاری روی تکنولوژی و آموزش',
    description: 'خرید تجهیزات پیشرفته تشخیصی و برگزاری دوره‌های آموزشی تخصصی برای تیم. در این سال تعداد تکنسین‌های ما به ۲۰ نفر رسید.'
  },
  {
    year: '۱۳۹۹',
    title: 'گسترش در سطح شهر تهران',
    description: 'با افتتاح ۳ شعبه جدید، تعداد شعبات ما به ۵ شعبه رسید و توانستیم پوشش کاملی در سطح تهران داشته باشیم. تعداد مشتریان راضی ما از ۳۰۰۰ نفر گذشت.'
  },
  {
    year: '۱۴۰۱',
    title: 'رشد چشمگیر و افزایش رضایت',
    description: 'با کسب جوایز ملی در زمینه کیفیت خدمات و رضایت مشتری، رشد درآمد ماهانه ما به ۱۰۰ میلیون تومان رسید. تعداد تیم ما به ۴۰ نفر افزایش یافت.'
  },
  {
    year: '۱۴۰۳',
    title: 'پیشرو در سطح کشور',
    description: 'با افتتاح ۱۵ شعبه جدید در شهرهای بزرگ کشور، تعداد شعبات ما به ۲۰ شعبه رسید. اکنون تیمی ۵۰ نفره و بیش از ۸۵۰۰ مشتری راضی داریم.'
  }
])

// Stats Data
const stats = ref([
  { icon: 'ph:smiley-bold', number: '۸۵۰۰', label: 'مشتری راضی', color: '#3b82f6' },
  { icon: 'ph:users-three-bold', number: '۵۰', label: 'تکنسین متخصص', color: '#10b981' },
  { icon: 'ph:briefcase-bold', number: '۱۰۰۰۰', label: 'تعمیر موفق', color: '#f59e0b' },
  { icon: 'ph:trophy-bold', number: '۲۰', label: 'شعبه فعال', color: '#8b5cf6' }
])

// Values Data
const values = ref([
  {
    icon: 'ph:sparkle-bold',
    title: 'کیفیت بالا',
    description: 'استفاده از قطعات اورجینال و تکنسین‌های مجرب برای ارائه بهترین خدمات',
    color: '#3b82f6'
  },
  {
    icon: 'ph:lightning-bold',
    title: 'سرعت عمل',
    description: 'حضور در محل کمتر از ۲ ساعت و انجام تعمیرات در کوتاه‌ترین زمان ممکن',
    color: '#eab308'
  },
  {
    icon: 'ph:shield-check-bold',
    title: 'تضمین کامل',
    description: 'ضمانت کتبی ۶ ماهه برای تمام قطعات و خدمات ارائه شده',
    color: '#10b981'
  },
  {
    icon: 'ph:clock-bold',
    title: 'پشتیبانی ۲۴/۷',
    description: 'آماده پاسخگویی به درخواست‌های شما در تمام ساعات شبانه‌روز',
    color: '#8b5cf6'
  },
  {
    icon: 'ph:currency-circle-dollar-bold',
    title: 'قیمت منصفانه',
    description: 'قیمت‌گذاری شفاف و منصفانه بدون هیچگونه هزینه پنهان',
    color: '#06b6d4'
  },
  {
    icon: 'ph:heart-bold',
    title: 'رضایت مشتری',
    description: 'تمرکز اصلی ما بر رضایت ۱۰۰٪ مشتریان و ارائه بهترین تجربه خدمات',
    color: '#ec4899'
  }
])

const mobileTimelineRef = ref<HTMLElement | null>(null)
const yearButtonRefs = ref<Record<number, any>>({})

const selectYear = (index: number) => {
  selectedYearIndex.value = index
  // Auto-scroll to selected year on mobile
  nextTick(() => {
    const button = yearButtonRefs.value[index] as HTMLElement | null
    const container = mobileTimelineRef.value
    if (button && container && button instanceof HTMLElement) {
      const buttonLeft = button.offsetLeft
      const buttonWidth = button.offsetWidth
      const containerWidth = container.offsetWidth
      const scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2)
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
    }
  })
}

const nextYear = () => {
  if (selectedYearIndex.value < timeline.value.length - 1) {
    selectedYearIndex.value++
    nextTick(() => {
      selectYear(selectedYearIndex.value)
    })
  }
}

const prevYear = () => {
  if (selectedYearIndex.value > 0) {
    selectedYearIndex.value--
    nextTick(() => {
      selectYear(selectedYearIndex.value)
    })
  }
}
</script>

<style scoped>
/* Hide scrollbar for mobile timeline */
.scrollbar-hide {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Smooth scrolling for mobile timeline */
.scrollbar-hide {
  scroll-behavior: smooth;
}
</style>
