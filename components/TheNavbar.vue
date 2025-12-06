<template>
  <nav class="bg-white shadow-sm">
    <!-- Top Bar - Contact Information -->
    <div class="border-b border-gray-200">
      <div class="container-custom">
        <div class="flex items-center justify-between py-4">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="relative w-50 h-20">
              <img 
                src="/images/tamirmaster-logo.png" 
                alt="تعمیرمستر" 
                class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
              >
            </div>

          </NuxtLink>

          <!-- Contact Info -->
          <div class="hidden lg:flex items-center gap-8">
            <!-- Email -->
            <div class="flex items-center gap-3 border-r border-dashed border-gray-300 pr-8">
              <div class="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <Icon name="ph:envelope-fill" class="w-5 h-5 text-primary-600" />
              </div>

              <div>
                <a href="mailto:info@tamirmaster.com" class="block text-sm text-gray-900 font-semibold hover:text-primary-600 transition-colors ltr">
                  info@tamirmaster.com
                </a>

                <span class="text-xs text-gray-500">ایمیل به ما</span>
              </div>
            </div>

            <!-- Phone -->
            <div class="flex items-center gap-3 border-r border-dashed border-gray-300 pr-8">
              <div class="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <Icon name="ph:phone-fill" class="w-5 h-5 text-primary-600" />
              </div>

              <div>
                <a href="tel:09369236420" class="block text-sm text-gray-900 font-semibold hover:text-primary-600 transition-colors ltr">
                  09369236420
                </a>
                <span class="text-xs text-gray-500">تماس برای کمک</span>
              </div>
            </div>

            <!-- Hours -->
            <div class="flex items-center gap-3 border-r border-dashed border-gray-300 pr-8">
              <div class="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <Icon name="ph:clock-fill" class="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <span class="block text-sm text-gray-900 font-semibold">شنبه - پنجشنبه:</span>
                <span class="text-xs text-gray-500">۸ صبح - ۸ شب</span>
              </div>
            </div>

            <!-- Location -->
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <Icon name="ph:map-pin-fill" class="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <span class="block text-sm text-gray-900 font-semibold">تهران، ایران</span>
                <span class="text-xs text-gray-500">آدرس دفتر</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar - Main Navigation -->
    <div class="border-b border-gray-100">
      <div class="container-custom">
        <div class="flex items-center justify-between py-4">
          <!-- Main Menu -->
          <div class="hidden lg:flex items-center gap-8">
            <NuxtLink 
              to="/" 
              class="relative text-gray-700 hover:text-gray-900 font-bold transition-colors duration-300 group py-2"
            >
              <span class="flex items-center gap-2">
                صفحه اصلی
              </span>
              <span class="absolute bottom-0 right-0 w-full h-0.5 bg-yellow-400 scale-x-100 group-hover:scale-x-100 transition-transform origin-right"></span>
            </NuxtLink>

            <NuxtLink 
              to="/about" 
              class="relative text-gray-700 hover:text-gray-900 font-bold transition-colors duration-300 group py-2"
            >
              <span class="flex items-center gap-2">
                درباره ما
              </span>

              <span class="absolute bottom-0 right-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300 origin-right"></span>
            </NuxtLink>

            <NuxtLink 
              to="/contact" 
              class="relative text-gray-700 hover:text-gray-900 font-bold transition-colors duration-300 group py-2"
            >
              <span class="flex items-center gap-2">
                خدمات
              </span>
              <span class="absolute bottom-0 right-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300 origin-right"></span>
            </NuxtLink>

            <NuxtLink 
              to="/contact" 
              class="relative text-gray-700 hover:text-gray-900 font-bold transition-colors duration-300 group py-2"
            >
              <span class="flex items-center gap-2">
                نمونه کارها
              </span>
              <span class="absolute bottom-0 right-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300 origin-right"></span>
            </NuxtLink>

            <NuxtLink 
              to="/contact" 
              class="relative text-gray-700 hover:text-gray-900 font-bold transition-colors duration-300 group py-2"
            >
              <span class="flex items-center gap-2">
                بلاگ
              </span>
              <span class="absolute bottom-0 right-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300 origin-right"></span>
            </NuxtLink>

            <NuxtLink 
              to="/contact" 
              class="relative text-gray-700 hover:text-gray-900 font-bold transition-colors duration-300 group py-2"
            >
              <span class="flex items-center gap-2">
                تماس با ما
              </span>
              <span class="absolute bottom-0 right-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300 origin-right"></span>
            </NuxtLink>
          </div>

          <!-- Right Side Icons -->
          <div class="hidden lg:flex items-center gap-6">
            <!-- Search Icon -->
            <button 
              class="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors"
              aria-label="جستجو"
            >
              <Icon name="ph:magnifying-glass-bold" class="w-5 h-5" />
            </button>

            <!-- Social Media Icons -->
            <div class="flex items-center gap-3 border-r border-gray-200 pr-6">
              <a 
                href="#" 
                class="w-9 h-9 flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors"
                aria-label="فیسبوک"
              >
                <Icon name="ph:facebook-logo-fill" class="w-5 h-5" />
              </a>
              <a 
                href="#" 
                class="w-9 h-9 flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors"
                aria-label="توییتر"
              >
                <Icon name="ph:twitter-logo-fill" class="w-5 h-5" />
              </a>
              <a 
                href="#" 
                class="w-9 h-9 flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors"
                aria-label="لینکدین"
              >
                <Icon name="ph:linkedin-logo-fill" class="w-5 h-5" />
              </a>
              <a 
                href="#" 
                class="w-9 h-9 flex items-center justify-center text-gray-700 hover:text-primary-600 transition-colors"
                aria-label="اینستاگرام"
              >
                <Icon name="ph:instagram-logo-fill" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="toggleMobileMenu" 
            class="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            aria-label="منوی موبایل"
          >
            <Icon :name="isMobileMenuOpen ? 'ph:x-bold' : 'ph:list-bold'" class="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMobileMenuOpen" class="lg:hidden border-t border-gray-200 bg-white shadow-lg">
        <div class="container-custom py-4 space-y-3">
          <!-- Contact Info Mobile -->
          <div class="space-y-4 pb-4 border-b border-gray-200">
            <a href="tel:09369236420" class="flex items-center gap-3 py-2 px-4 text-gray-700">
              <Icon name="ph:phone-fill" class="w-5 h-5 text-primary-600" />
              <span class="font-medium ltr">09369236420</span>
            </a>
            <a href="mailto:info@tamirmaster.com" class="flex items-center gap-3 py-2 px-4 text-gray-700">
              <Icon name="ph:envelope-fill" class="w-5 h-5 text-primary-600" />
              <span class="font-medium ltr">info@tamirmaster.com</span>
            </a>
          </div>

          <!-- Navigation Links Mobile -->
          <NuxtLink 
            to="/" 
            class="block py-3 px-4 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-sm transition-colors font-bold"
            @click="closeMobileMenu"
          >
            صفحه اصلی
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="block py-3 px-4 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-sm transition-colors font-bold"
            @click="closeMobileMenu"
          >
            درباره ما
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="block py-3 px-4 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-sm transition-colors font-bold"
            @click="closeMobileMenu"
          >
            خدمات
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="block py-3 px-4 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-sm transition-colors font-bold"
            @click="closeMobileMenu"
          >
            تماس با ما
          </NuxtLink>

          <!-- Social Media Mobile -->
          <div class="flex items-center gap-4 pt-4 border-t border-gray-200 px-4">
            <a href="#" class="w-10 h-10 flex items-center justify-center bg-primary-50 text-primary-600 rounded-full">
              <Icon name="ph:facebook-logo-fill" class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 flex items-center justify-center bg-primary-50 text-primary-600 rounded-full">
              <Icon name="ph:twitter-logo-fill" class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 flex items-center justify-center bg-primary-50 text-primary-600 rounded-full">
              <Icon name="ph:linkedin-logo-fill" class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 flex items-center justify-center bg-primary-50 text-primary-600 rounded-full">
              <Icon name="ph:instagram-logo-fill" class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  closeMobileMenu()
})
</script>
