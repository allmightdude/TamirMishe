<template>
  <div class="min-h-screen flex">
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-blue-100/20">
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-3/4 h-3/4 flex items-center justify-center">
          <Icon name="ph:lock-key-bold" class="w-64 h-64 text-blue-300 opacity-50" />
        </div>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 bg-white">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <img src="/images/tamirmaster-logo.png" alt="Logo" class="h-16 mx-auto mb-4" />
          <h2 class="text-3xl font-black text-blue-600 mb-2">
            ورود به پنل مدیریت
          </h2>
          <p class="text-gray-600">لطفاً اطلاعات خود را وارد کنید</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
          >
            {{ errorMessage }}
          </div>

          <KitInput
            v-model="form.userName"
            type="text"
            placeholder="نام کاربری"
            required
            class="w-full"
          />

          <KitInput 
            v-model="form.password" 
            type="password" 
            placeholder="رمز عبور" 
            required
            class="w-full"
          />

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                v-model="form.rememberMe" 
                type="checkbox" 
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="text-sm text-gray-600">مرا به خاطر بسپار</span>
            </label>
          </div>

          <KitButton
            type="submit"
            variant="primary"
            size="lg"
            class="w-full"
            :loading="isLoading"
            :disabled="isLoading"
          >
            ورود
          </KitButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

useHead({
  title: 'ورود - تعمیرمستر',
  meta: [
    {
      name: 'description',
      content: 'ورود به پنل مدیریت تعمیرمستر',
    },
  ],
  htmlAttrs: {
    dir: 'rtl',
    lang: 'fa',
  },
})

const form = ref({
  userName: '',
  password: '',
  rememberMe: false,
})

const isLoading = ref(false)
const errorMessage = ref('')

const { signIn, user } = useAuth()

watch(
  user,
  (newUser) => {
    if (newUser && newUser.isAdmin) {
      navigateTo('/admin')
    }
  },
  { immediate: true }
)

const handleLogin = async () => {
  if (!form.value.userName || !form.value.password) {
    errorMessage.value = 'نام کاربری و کلمه عبور الزامی است'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    await signIn({
      userName: form.value.userName,
      password: form.value.password,
    })

    await new Promise((resolve) => setTimeout(resolve, 100))

    if (user.value && user.value.isAdmin) {
      const route = useRoute()
      const redirect = route.query.redirect as string
      await navigateTo(redirect || '/admin')
    } else {
      errorMessage.value = 'شما دسترسی ادمین ندارید'
    }
  } catch (error: any) {
    const errorMsg = error?.data?.message || error?.message || 'خطا در ورود به سیستم'
    errorMessage.value = errorMsg
    
    // If it's a 401 error, show specific message
    if (error?.statusCode === 401 || error?.data?.statusCode === 401) {
      errorMessage.value = 'نام کاربری یا رمز عبور نادرست است'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

