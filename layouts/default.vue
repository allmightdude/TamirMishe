<template>
  <div class="min-h-screen flex flex-col">
    <TheNavbar />
    <main class="flex-grow">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
// This layout wraps all pages with navbar and footer
</script>

