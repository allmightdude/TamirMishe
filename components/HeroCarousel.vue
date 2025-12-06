<template>
  <section class="relative bg-white overflow-hidden min-h-[700px] md:min-h-[800px] flex items-center">
    <!-- Carousel Background Images -->
    <div class="absolute inset-0 z-0">
      <Transition
        enter-active-class="transition-opacity duration-700"
        leave-active-class="transition-opacity duration-700"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <div :key="currentSlide" class="absolute inset-0">
          <img 
            :src="slides[currentSlide].image" 
            :alt="slides[currentSlide].alt" 
            class="w-full h-full object-cover object-center"
          >
          <div class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
        </div>
      </Transition>
    </div>

    <!-- Carousel Navigation Dots -->
    <div class="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col gap-4">
      <button 
        v-for="(slide, index) in slides" 
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'rounded-full transition-all duration-300 relative',
          currentSlide === index 
            ? 'w-5 h-5 bg-yellow-400 border-2 border-gray-900 hover:scale-110' 
            : 'w-3 h-3 bg-gray-900 hover:scale-125'
        ]"
        :aria-label="`اسلاید ${index + 1}`"
      >
        <span v-if="currentSlide === index" class="absolute inset-0 flex items-center justify-center">
          <span class="w-2 h-2 bg-gray-900 rounded-full"></span>
        </span>
      </button>
    </div>

    <!-- Content Container -->
    <div class="container-custom relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left Side - Text Content -->
        <div class="py-16 md:py-20">
          <!-- Large Background Text Watermark -->
          <div class="absolute top-1/2 -translate-y-1/2 left-0 opacity-5 pointer-events-none overflow-hidden">
            <span class="text-[180px] md:text-[280px] font-black text-primary-600 leading-none whitespace-nowrap">تعمیرمستر</span>
          </div>

          <!-- Animated Slide Content -->
          <Transition
            enter-active-class="transition-all duration-500"
            leave-active-class="transition-all duration-300"
            enter-from-class="opacity-0 translate-x-10"
            enter-to-class="opacity-100 translate-x-0"
            leave-from-class="opacity-100 translate-x-0"
            leave-to-class="opacity-0 -translate-x-10"
            mode="out-in"
          >
            <div :key="currentSlide" class="relative z-10 max-w-xl">
              <div class="inline-block mb-6 relative">
                <span class="text-sm font-semibold text-gray-700 uppercase tracking-wider">{{ slides[currentSlide].badge }}</span>
                <div class="absolute -bottom-2 right-0 w-12 h-1 bg-yellow-400 rounded-full"></div>
              </div>

              <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-gray-800 mb-8 leading-tight">
                {{ slides[currentSlide].title1 }} <br/>
                <span class="text-primary-600">{{ slides[currentSlide].title2 }}</span> 
                {{ slides[currentSlide].title3 }}<br/>
                <span v-if="slides[currentSlide].title4">{{ slides[currentSlide].title4 }}</span>
              </h1>

              <div class="flex items-start gap-3 mb-10">
                <div class="flex-shrink-0 w-6 h-6 bg-yellow-400 rounded-sm flex items-center justify-center mt-1">
                  <Icon name="ph:check-bold" class="w-4 h-4 text-white" />
                </div>
                <p class="text-lg text-gray-600 leading-relaxed font-normal">
                  {{ slides[currentSlide].description }}
                </p>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <NuxtLink 
                  to="/about" 
                  class="inline-flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span>درباره ما</span>
                  <Icon name="ph:user-circle-bold" class="w-6 h-6" />
                </NuxtLink>

                <NuxtLink 
                  to="/contact" 
                  class="inline-flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span>خدمات</span>
                  <Icon name="ph:gear-bold" class="w-6 h-6" />
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Right Side - Video Thumbnail -->
        <div class="relative py-16 flex items-center justify-center lg:justify-end">
          <div class="w-full max-w-md">
              <div class="relative bg-white rounded-sm overflow-hidden shadow-2xl group cursor-pointer transform hover:scale-105 transition-all duration-300">
              <div class="relative aspect-video">
                <img 
                  src="/images/1.jpg" 
                  alt="ویدیو آموزشی" 
                  class="w-full h-full object-cover"
                >
                <!-- Dark Overlay -->
                <div class="absolute inset-0 bg-primary-900/30 group-hover:bg-primary-900/20 transition-colors"></div>
                
                <!-- Play Button -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-20 h-20 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform group-hover:scale-110">
                    <Icon name="ph:play-fill" class="w-10 h-10 text-white mr-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface HeroSlide {
  image: string
  alt: string
  badge: string
  title1: string
  title2: string
  title3: string
  title4: string
  description: string
}

// Carousel State
const currentSlide = ref(0)

// Slides Data
const slides = ref<HeroSlide[]>([
  {
    image: '/images/2714870.jpg',
    alt: 'تعمیر لباسشویی حرفه‌ای',
    badge: 'پیشرفت ما',
    title1: 'ما بهترین',
    title2: 'خدمات',
    title3: 'را',
    title4: 'ارائه می‌دهیم',
    description: 'ما متعهد به بهترین کیفیت در زمینه تعمیرات تخصصی لباسشویی، خدمات منزل و نگهداری هستیم.'
  },
  {
    image: '/images/1.jpg',
    alt: 'تعمیرکاران حرفه‌ای',
    badge: 'تیم ما',
    title1: 'تکنسین‌های',
    title2: 'متخصص',
    title3: 'در',
    title4: 'خدمت شما',
    description: 'تیم تخصصی ما با بیش از ۱۰ سال تجربه، آماده ارائه بهترین خدمات در منزل شماست.'
  },
  {
    image: '/images/1.jpg',
    alt: 'خدمات سریع',
    badge: 'سرعت',
    title1: 'حضور در محل',
    title2: 'کمتر از',
    title3: '۲ ساعت',
    title4: '',
    description: 'پس از تماس شما، نزدیکترین تکنسین در کمترین زمان به محل شما اعزام می‌شود.'
  }
])

// Navigation Functions
const goToSlide = (index: number) => {
  currentSlide.value = index
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? slides.value.length - 1 : currentSlide.value - 1
}

// Auto-play
let autoplayInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  autoplayInterval = setInterval(() => {
    nextSlide()
  }, 5000)
})

onUnmounted(() => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
})
</script>

