<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
      <h1 class="text-3xl font-black mb-2">خوش آمدید!</h1>
      <p class="text-blue-100">به پنل مدیریت تعمیرمستر خوش آمدید</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">کل تعمیرات</p>
            
            <p class="text-3xl font-black text-gray-900">{{ stats.repairs.total || 0 }}</p>

            <div class="flex items-center mt-2">
              <Icon name="ph:arrow-trend-up-bold" class="w-4 h-4 text-green-500 ml-1" />

              <p class="text-sm text-green-600 font-medium">+{{ stats.repairs.today || 0 }} امروز</p>
            </div>
          </div>

          <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Icon name="ph:wrench-bold" class="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">کل مشتریان</p>
            <p class="text-3xl font-black text-gray-900">{{ stats.customers.total || 0 }}</p>
            <div class="flex items-center mt-2">
              <Icon name="ph:arrow-trend-up-bold" class="w-4 h-4 text-green-500 ml-1" />
              <p class="text-sm text-green-600 font-medium">+{{ stats.customers.new || 0 }} جدید</p>
            </div>
          </div>
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Icon name="ph:users-bold" class="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <!-- Total Technicians -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">تکنسین‌های فعال</p>
            <p class="text-3xl font-black text-gray-900">{{ stats.technicians.active || 0 }}</p>
            <div class="flex items-center mt-2">
              <p class="text-sm text-blue-600 font-medium">در دسترس</p>
            </div>
          </div>
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Icon name="ph:user-gear-bold" class="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      <!-- Pending Appointments -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">نوبت‌های در انتظار</p>
            <p class="text-3xl font-black text-gray-900">{{ stats.appointments.pending || 0 }}</p>
            <div class="flex items-center mt-2">
              <p class="text-sm text-amber-600 font-medium">نیاز به بررسی</p>
            </div>
          </div>
          <div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Icon name="ph:calendar-bold" class="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Repairs -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 class="text-xl font-black text-gray-900 mb-4">تعمیرات اخیر</h2>
        <div class="space-y-4">
          <div v-for="i in 5" :key="i" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="ph:wrench-bold" class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p class="font-semibold text-gray-900">تعمیر لباسشویی</p>
                <p class="text-sm text-gray-500">مشتری #{{ 1000 + i }}</p>
              </div>
            </div>
            <span class="text-xs font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full">تکمیل شده</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 class="text-xl font-black text-gray-900 mb-4">دسترسی سریع</h2>
        <div class="grid grid-cols-2 gap-4">
          <NuxtLink
            to="/admin/repairs"
            class="flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
          >
            <Icon name="ph:wrench-bold" class="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
            <span class="font-semibold text-gray-900">تعمیر جدید</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/appointments"
            class="flex flex-col items-center justify-center p-6 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
          >
            <Icon name="ph:calendar-bold" class="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
            <span class="font-semibold text-gray-900">نوبت جدید</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/customers"
            class="flex flex-col items-center justify-center p-6 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group"
          >
            <Icon name="ph:user-plus-bold" class="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
            <span class="font-semibold text-gray-900">مشتری جدید</span>
          </NuxtLink>
          <NuxtLink
            to="/admin/technicians"
            class="flex flex-col items-center justify-center p-6 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors group"
          >
            <Icon name="ph:user-gear-bold" class="w-8 h-8 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
            <span class="font-semibold text-gray-900">تکنسین جدید</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// Stats data (you can replace this with actual API calls)
const stats = ref({
  repairs: {
    total: 1250,
    today: 12
  },
  customers: {
    total: 8500,
    new: 25
  },
  technicians: {
    active: 50,
    total: 52
  },
  appointments: {
    pending: 8,
    today: 15
  }
})
</script>

