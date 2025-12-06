<template>
  <div class="h-screen bg-gray-50 flex overflow-hidden" dir="rtl">
    <!-- Mobile Menu Toggle -->
    <div class="lg:hidden fixed top-4 right-4 z-50">
      <KitButton
        variant="secondary"
        size="md"
        icon-left="ph:list-bold"
        @click="toggleSidebar"
      />
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="isSidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    ></div>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:shadow-lg lg:w-80 lg:h-full flex flex-col',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <!-- Logo Section -->
      <div class="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 flex-shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12">
            <img
              src="/images/tamirmaster-logo.png"
              alt="logo"
              class="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          <div>
            <h1 class="text-xl font-black">پنل مدیریت</h1>
            <p class="text-blue-100 text-sm">تعمیرمستر</p>
          </div>
        </div>
      </div>

      <!-- User Info Section -->
      <div class="p-6 border-b border-gray-200 flex-shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {{ userInitials }}
          </div>
          <div class="flex-1">
            <p class="font-semibold text-gray-900">{{ user?.fullName || 'مدیر سیستم' }}</p>
            <p class="text-sm text-gray-500">{{ user?.userName || 'admin' }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-2 overflow-y-auto flex-1">
        <NuxtLink
          v-for="menu in activeNavMenus"
          :key="menu.id"
          :to="menu.path"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
            menu.isActive
              ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
          ]"
        >
          <Icon :name="menu.icon" class="w-5 h-5" />
          <span class="font-medium">{{ menu.label }}</span>
        </NuxtLink>

        <!-- Logout Button -->
        <div class="pt-4 border-t border-gray-200">
          <button
            @click="handleLogout"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full"
          >
            <Icon name="ph:sign-out-bold" class="w-5 h-5" />
            <span class="font-medium">خروج</span>
          </button>
        </div>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col h-full overflow-hidden">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div class="flex items-center justify-between">
          <nav class="flex items-center gap-2 text-sm">
            <NuxtLink to="/admin" class="text-gray-500 hover:text-gray-700">پنل مدیریت</NuxtLink>
            <Icon name="ph:caret-left-bold" class="w-4 h-4 text-gray-400" />
            <span class="text-gray-900 font-medium">{{ pageTitle }}</span>
          </nav>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { adminNavMenus } from '~/assets/app.js'

const route = useRoute()
const { user } = useAuth()

const isSidebarOpen = ref(false)

const userInitials = computed(() => {
  if (user.value?.fullName) {
    return user.value.fullName.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
  }
  return 'AD'
})

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/admin': 'داشبورد',
    '/admin/repairs': 'مدیریت تعمیرات',
    '/admin/customers': 'مدیریت مشتریان',
    '/admin/technicians': 'مدیریت تکنسین‌ها',
    '/admin/services': 'مدیریت خدمات',
    '/admin/appointments': 'مدیریت نوبت‌ها',
    '/admin/articles': 'مدیریت مقالات',
    '/admin/articles/create': 'مقاله جدید',
    '/admin/users': 'مدیریت کاربران',
    '/admin/settings': 'تنظیمات',
  }
  return titles[route.path] || 'پنل مدیریت'
})

const activeNavMenus = computed(() => {
  return adminNavMenus.map((menu) => ({
    ...menu,
    isActive: menu.path === route.path,
  }))
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const handleLogout = async () => {
  const { logout } = useAuth()
  await logout()
  await navigateTo('/login')
}

onMounted(() => {
  document.documentElement.setAttribute('dir', 'rtl')
  document.documentElement.setAttribute('lang', 'fa')
})

watch(
  () => route.path,
  () => {
    document.documentElement.setAttribute('dir', 'rtl')
    document.documentElement.setAttribute('lang', 'fa')

    if (isSidebarOpen.value) {
      closeSidebar()
    }
  }
)

onMounted(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isSidebarOpen.value) {
      closeSidebar()
    }
  }

  document.addEventListener('keydown', handleEscape)

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

