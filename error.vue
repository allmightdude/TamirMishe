<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50" dir="rtl">
    <div class="max-w-4xl w-full mx-auto px-4 py-12">
      <div class="text-center">
        <!-- Error Code with Animation -->
        <div class="mb-8">
          <h1 class="text-[120px] md:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 leading-none mb-4">
            {{ error?.statusCode || 500 }}
          </h1>
        </div>

        <!-- Error Icon -->
        <div class="mb-8 flex justify-center">
          <div class="relative">
            <div class="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div class="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <Icon 
                :name="errorMapping.icon" 
                class="w-12 h-12 text-white" 
              />
            </div>
          </div>
        </div>

        <!-- Error Title -->
        <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          {{ errorMapping.title }}
        </h2>

        <!-- Error Message -->
        <p class="text-lg text-gray-600 mb-12 leading-relaxed max-w-xl mx-auto">
          {{ errorMapping.message }}
        </p>

        <!-- Action Buttons -->
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <KitButton
            variant="primary"
            size="lg"
            icon-left="ph:arrow-right-bold"
            @click="handleError"
            class="min-w-[160px]"
          >
            بازگشت
          </KitButton>

          <KitButton
            variant="secondary"
            size="lg"
            icon-left="ph:house-bold"
            @click="goHome"
            class="min-w-[160px]"
          >
            صفحه اصلی
          </KitButton>
        </div>

        <!-- Decorative Elements -->
        <div class="mt-16 flex items-center justify-center gap-2 text-sm text-gray-400">
          <Icon name="ph:info-bold" class="w-4 h-4" />
          <span>اگر مشکل ادامه داشت، با پشتیبانی تماس بگیرید</span>
        </div>
      </div>
    </div>

    <!-- Background Decorative Elements -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const error = useError()

const getErrorMapping = (statusCode: number, errorMessage?: string) => {
  const errorMappings: Record<number, { title: string; message: string; icon: string }> = {
    400: {
      title: 'درخواست نامعتبر',
      message: 'درخواست ارسالی نامعتبر است. لطفاً دوباره تلاش کنید.',
      icon: 'ph:warning-circle-bold',
    },
    401: {
      title: 'عدم احراز هویت',
      message: 'لطفاً ابتدا وارد حساب کاربری خود شوید تا به این صفحه دسترسی داشته باشید.',
      icon: 'ph:lock-key-bold',
    },
    403: {
      title: 'دسترسی غیرمجاز',
      message: 'شما اجازه دسترسی به این صفحه را ندارید. لطفاً با مدیر سیستم تماس بگیرید.',
      icon: 'ph:shield-slash-bold',
    },
    404: {
      title: 'صفحه یافت نشد',
      message: 'متأسفانه صفحه مورد نظر شما یافت نشد. ممکن است آدرس تغییر کرده باشد.',
      icon: 'ph:file-x-bold',
    },
    500: {
      title: 'خطای سرور',
      message: 'خطای داخلی سرور رخ داده است. لطفاً بعداً تلاش کنید یا با پشتیبانی تماس بگیرید.',
      icon: 'ph:warning-octagon-bold',
    },
    502: {
      title: 'خطای دروازه',
      message: 'خطا در ارتباط با سرور. لطفاً بعداً تلاش کنید.',
      icon: 'ph:plug-bold',
    },
    503: {
      title: 'سرویس در دسترس نیست',
      message: 'سرویس موقتاً در دسترس نیست. لطفاً بعداً تلاش کنید.',
      icon: 'ph:clock-countdown-bold',
    },
  }

  return (
    errorMappings[statusCode] || {
      title: 'خطا',
      message: errorMessage || 'خطای غیرمنتظره رخ داده است. لطفاً دوباره تلاش کنید.',
      icon: 'ph:warning-bold',
    }
  )
}

const errorMapping = computed(() => {
  const statusCode = error.value?.statusCode || 500
  const errorMessage = error.value?.message
  return getErrorMapping(statusCode, errorMessage)
})

const handleError = () => {
  clearError({
    redirect: '/',
  })
}

const goHome = () => {
  clearError({
    redirect: '/',
  })
}

useHead({
  title: `${error.value?.statusCode || 500} - ${errorMapping.value.title} | تعمیرمستر`,
  meta: [
    {
      name: 'description',
      content: errorMapping.value.message,
    },
  ],
  htmlAttrs: {
    dir: 'rtl',
    lang: 'fa',
  },
})
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
