<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-gray-900">مدیریت مشتریان</h1>
        <p class="text-gray-600 mt-1">مدیریت اطلاعات مشتریان</p>
      </div>
      <KitButton variant="primary" icon-left="ph:plus-bold">
        مشتری جدید
      </KitButton>
    </div>

    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <p class="text-gray-600 text-center py-8">لیست مشتریان در اینجا نمایش داده می‌شود</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})
</script>

