<template>
  <footer class="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent"></div>
    
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
    
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

    <div class="relative z-10 flex justify-center pt-16 pb-12">
      <div class="text-center">
        <div class="w-24 h-24 flex items-center justify-center shadow-xl mx-auto">
          <img 
            src="/images/tamirmaster-logo.png" 
            alt="تعمیرمستر" 
            class="w-40 h-30 object-contain"
          >
        </div>
        
        <h2 class="text-2xl font-black text-white mb-2">تعمیرمستر</h2>

        <p class="text-sm text-gray-400">خدمات تخصصی تعمیرات</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 pb-12">
      <div class="container-custom max-w-6xl">
        <!-- Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <!-- About Column -->
          <div class="text-center md:text-right">
            <h3 class="text-lg font-black text-white mb-4">درباره ما</h3>
            <p class="text-sm text-gray-400 leading-relaxed mb-6">
              ما با اشتیاق پذیرش چالش‌ها و ارائه بهترین خدمات تعمیرات لباسشویی در منزل شما هستیم.
            </p>
            <div class="inline-flex items-center gap-2 text-xs text-gray-500 bg-gray-800/50 px-4 py-2 rounded-full">
              <Icon name="ph:clock-bold" class="w-4 h-4" />
              <span>شنبه - پنجشنبه: ۸ صبح - ۸ شب</span>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="text-center">
            <h3 class="text-lg font-black text-white mb-4">دسترسی سریع</h3>
            <ul class="space-y-3">
              <li>
                <NuxtLink to="/" class="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                  صفحه اصلی
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/about" class="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                  درباره ما
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                  تماس با ما
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="text-center md:text-left">
            <h3 class="text-lg font-black text-white mb-4 text-right">تماس با ما</h3>
            <div class="space-y-3">
              <a href="tel:09369236420" class="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors group">
                <div class="w-8 h-8 bg-gray-800 group-hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors">
                  <Icon name="ph:phone-bold" class="w-4 h-4" />
                </div>
                <span class="ltr">09369236420</span>
              </a>
              
              <a href="mailto:info@tamirmaster.com" class="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors group">
                <div class="w-8 h-8 bg-gray-800 group-hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors">
                  <Icon name="ph:envelope-bold" class="w-4 h-4" />
                </div>
                <span class="ltr">info@tamirmaster.com</span>
              </a>
              
              <div class="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-400">
                <div class="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Icon name="ph:map-pin-bold" class="w-4 h-4" />
                </div>
                <span>تهران، میدان ونک</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Social & Newsletter -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-gray-800">
          <!-- Social Links -->
          <div class="flex items-center gap-3">
            <span class="text-sm text-gray-500 ml-4">شبکه‌های اجتماعی:</span>
            <a 
              v-for="social in socials"
              :key="social.name"
              :href="social.url" 
              class="w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300 group"
            >
              <Icon :name="social.icon" class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </a>
          </div>

          <!-- Newsletter -->
          <form @submit.prevent="handleNewsletter" class="flex gap-2 w-full md:w-auto">
            <input 
              v-model="newsletterEmail"
              type="email" 
              placeholder="ایمیل شما"
              class="flex-grow md:w-64 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            >
            <button 
              type="submit"
              class="flex-shrink-0 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
            >
              عضویت
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Copyright Bar -->
    <div class="relative z-10 border-t border-gray-800/50">
      <div class="container-custom py-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-xs text-gray-500">
            {{ currentYear }} © ساخته شده با ❤️ توسط 
            <span class="text-blue-400 font-semibold">تعمیرمستر</span>
          </p>

          <!-- Scroll to Top -->
          <button 
            @click="scrollToTop" 
            class="group w-10 h-10 bg-gray-800 hover:bg-blue-500 rounded-lg flex items-center justify-center transition-all duration-300"
          >
            <Icon name="ph:arrow-up-bold" class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
const newsletterEmail = ref('')

// Social Media Links
const socials = [
  { name: 'Instagram', icon: 'ph:instagram-logo-fill', url: '#' },
  { name: 'Telegram', icon: 'ph:telegram-logo-fill', url: '#' },
  { name: 'Twitter', icon: 'ph:twitter-logo-fill', url: '#' },
  { name: 'Facebook', icon: 'ph:facebook-logo-fill', url: '#' }
]

const handleNewsletter = () => {
  if (newsletterEmail.value) {
    alert('ثبت نام شما با موفقیت انجام شد!')
    newsletterEmail.value = ''
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
