<template>
  <div></div>
</template>

<script setup lang="ts">
// Catch-all route for 404 errors
throw createError({
  statusCode: 404,
  statusMessage: 'صفحه مورد نظر یافت نشد',
  fatal: true,
})
</script>



