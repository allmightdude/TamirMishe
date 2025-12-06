<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-black text-gray-900">تنظیمات</h1>
      <p class="text-gray-600 mt-1">تنظیمات سیستم و پیکربندی</p>
    </div>

    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p class="text-gray-600 text-center py-8">تنظیمات در اینجا نمایش داده می‌شود</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})
</script>

