<template>
  <div class="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 text-white">
    <Swiper
      :modules="modules"
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      :loop="true"
      class="review-swiper"
    >
      <SwiperSlide
        v-for="(review, index) in reviews"
        :key="index"
        class="text-center"
      >
        <div class="flex justify-center gap-1 mb-4">
          <Icon
            v-for="i in review.rating"
            :key="i"
            name="ph:star-fill"
            class="w-5 h-5 text-yellow-400"
          />
          <Icon
            v-for="i in 5 - review.rating"
            :key="i + review.rating"
            name="ph:star"
            class="w-5 h-5 text-yellow-400/30"
          />
        </div>
        <p class="text-sm leading-relaxed mb-4 px-4">{{ review.text }}</p>
        <div class="text-blue-200 font-semibold">{{ review.name }}</div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

defineProps<{
  reviews: Array<{
    rating: number
    text: string
    name: string
  }>
}>()

const modules = [Pagination, Autoplay]
</script>

<style scoped>
.review-swiper {
  @apply w-full;
}

:deep(.swiper-pagination-bullet) {
  @apply bg-white/50;
}

:deep(.swiper-pagination-bullet-active) {
  @apply bg-white;
}
</style>



