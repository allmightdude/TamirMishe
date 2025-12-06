<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Hero Section -->
    <section class="relative h-[450px] md:h-[550px] overflow-hidden">
      <!-- Background Image with Gradient Overlay -->
      <div class="absolute inset-0">
        <img 
          src="/images/2714870.jpg" 
          alt="Background" 
          class="w-full h-full object-cover scale-105 transition-transform duration-700"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-gray-100/30 via-gray-400/80 to-gray-400/30"></div>
      </div>

      <!-- Content -->
      <div class="container-custom relative z-10 h-full flex flex-col items-center justify-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
          <Icon name="ph:sparkle-fill" class="w-4 h-4 text-blue-400" />
          <span class="text-sm font-semibold text-white">تماس با ما</span>
        </div>

        <!-- Main Title -->
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-white text-center mb-6 leading-tight">
          با ما در ارتباط باشید
        </h1>

        <!-- Breadcrumb Navigation -->
        <div class="flex items-center gap-2 text-sm text-white/80">
          <NuxtLink to="/" class="hover:text-white transition-colors">صفحه اصلی</NuxtLink>
          <Icon name="ph:caret-left-bold" class="w-4 h-4" />
          <span class="text-white/90">تماس با ما</span>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-10">
        <div class="w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
        <div class="w-3 h-3 bg-blue-400 rounded-full opacity-40 animate-pulse delay-150"></div>
        <div class="w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse delay-300"></div>
      </div>
    </section>

    <!-- Main Contact Section -->
    <section class="py-20 md:py-32 relative">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-[0.02]">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, #000 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>

      <div class="container-custom relative z-10">
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
            <Icon name="ph:sparkle-fill" class="w-4 h-4 text-blue-500" />
            <span class="text-sm font-bold text-blue-600">با ما در ارتباط باشید</span>
          </div>
          
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
            ما اینجا هستیم تا به شما کمک کنیم
          </h2>
          
          <p class="text-lg text-gray-600 leading-relaxed">
            تیم ما آماده پاسخگویی به سوالات و درخواست‌های شماست. با ما تماس بگیرید یا فرم زیر را پر کنید.
          </p>
        </div>

        <!-- Two Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <!-- Left Column: Contact Info Cards -->
          <div class="space-y-6">
            <!-- Office Address Card -->
            <div class="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                  <Icon name="ph:map-pin-fill" class="w-7 h-7 text-white" />
                </div>
                <div class="flex-grow">
                  <h3 class="text-base font-black text-gray-900 mb-3">آدرس دفتر</h3>
                  <p class="text-base text-gray-600 leading-relaxed">
                    تهران، میدان ونک<br/>
                    خیابان ملاصدرا، پلاک ۳۵۵۶<br/>
                    <span class="text-gray-500">ایران</span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Telephone Number Card -->
            <div class="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/20">
                  <Icon name="ph:phone-fill" class="w-7 h-7 text-white" />
                </div>
                <div class="flex-grow">
                  <h3 class="text-base font-black text-gray-900 mb-3">شماره تماس</h3>
                  <a href="tel:09369236420" class="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors ltr block">
                    09369236420
                  </a>
                  <a href="tel:09369236421" class="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors ltr block mt-1">
                    09369236421
                  </a>
                </div>
              </div>
            </div>

            <!-- Mail Address Card -->
            <div class="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0 w-14 h-14 bg-gradient-to-br rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg" style="background: linear-gradient(135deg, #eab308, #f59e0b); box-shadow: 0 10px 25px -5px rgba(234, 179, 8, 0.3);">
                  <Icon name="ph:envelope-fill" class="w-7 h-7 text-white" />
                </div>
                <div class="flex-grow">
                  <h3 class="text-base font-black text-gray-900 mb-3">آدرس ایمیل</h3>
                  <a href="mailto:info@tamirmaster.com" class="text-base text-gray-600 hover:text-blue-600 transition-colors ltr block mb-1">
                    info@tamirmaster.com
                  </a>
                  <a href="mailto:support@tamirmaster.com" class="text-base text-gray-600 hover:text-blue-600 transition-colors ltr block">
                    support@tamirmaster.com
                  </a>
                </div>
              </div>
            </div>

            <!-- Working Hours Card -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0 w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Icon name="ph:clock-fill" class="w-7 h-7 text-white" />
                </div>
                <div class="flex-grow">
                  <h3 class="text-base font-black text-gray-900 mb-3">ساعات کاری</h3>
                  <div class="space-y-2 text-base text-gray-600">
                    <p class="font-semibold">شنبه تا پنج‌شنبه: <span class="text-gray-900">۸ صبح – ۵ عصر</span></p>
                    <p class="font-semibold">جمعه: <span class="text-gray-500">تعطیل</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Contact Form -->
          <div class="lg:sticky lg:top-8">
            <div class="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-xl">
              <div class="mb-8">
                <h3 class="text-xl font-black text-gray-900 mb-2">فرم تماس</h3>
                <p class="text-sm text-gray-600">لطفاً اطلاعات خود را وارد کنید تا با شما تماس بگیریم</p>
              </div>

              <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Name (required) -->
                <div>
                  <label class="block text-sm font-bold text-gray-900 mb-2">
                    نام و نام خانوادگی <span class="text-red-500">*</span>
                  </label>
                  <KitInput
                    v-model="form.name"
                    type="text"
                    placeholder="نام و نام خانوادگی خود را وارد کنید"
                    required
                    class="w-full"
                  />
                </div>

                <!-- Email address (required) -->
                <div>
                  <label class="block text-sm font-bold text-gray-900 mb-2">
                    آدرس ایمیل <span class="text-red-500">*</span>
                  </label>
                  <KitInput
                    v-model="form.email"
                    type="email"
                    placeholder="example@email.com"
                    required
                    class="w-full"
                  />
                </div>

                <!-- Phone (optional) -->
                <div>
                  <label class="block text-sm font-bold text-gray-900 mb-2">
                    شماره تماس <span class="text-gray-500 text-xs font-normal">(اختیاری)</span>
                  </label>
                  <KitInput
                    v-model="form.phone"
                    type="tel"
                    placeholder="09123456789"
                    class="w-full"
                  />
                </div>

                <!-- Services (required) -->
                <div>
                  <label class="block text-sm font-bold text-gray-900 mb-2">
                    نوع خدمات <span class="text-red-500">*</span>
                  </label>
                  <KitSelect
                    v-model="form.service"
                    placeholder="یک خدمت را انتخاب کنید"
                    :options="serviceOptions"
                    class="w-full"
                  />
                </div>

                <!-- Your message* -->
                <div>
                  <label class="block text-sm font-bold text-gray-900 mb-2">
                    پیام شما <span class="text-red-500">*</span>
                  </label>
                  <KitTextarea
                    v-model="form.message"
                    placeholder="پیام خود را اینجا بنویسید..."
                    :rows="6"
                    class="w-full"
                  />
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3 group"
                >
                  <Icon name="ph:paper-plane-tilt-fill" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>ارسال پیام</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'تماس با ما | تعمیرمستر',
  meta: [
    {
      name: 'description',
      content: 'تماس با مرکز تخصصی تعمیرات ماشین لباسشویی تعمیرمستر - آدرس، تلفن، ایمیل'
    }
  ]
})

// Form State
const form = ref({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

// Service Options
const serviceOptions = [
  { value: 'repair', label: 'تعمیر لباسشویی' },
  { value: 'service', label: 'سرویس کامل' },
  { value: 'maintenance', label: 'نگهداری و تعمیر' },
  { value: 'consultation', label: 'مشاوره تخصصی' }
]

// Handle Form Submit
const handleSubmit = () => {
  // Form submission logic here
  console.log('Form submitted:', form.value)
  // You can add API call here
}
</script>
