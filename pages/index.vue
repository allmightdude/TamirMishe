<template>
  <div class="bg-white overflow-hidden">
    <!-- Hero Carousel Component -->
    <HeroCarousel />

    <!-- Stats Counter Section - Darker Background -->
    <section class="py-12 md:py-20 bg-black relative overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" style="background-image: url('/images/bg-counter.png');"></div>
      
      <!-- Darker Textured Background Pattern -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-gray-900 to-transparent"></div>
        <div class="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-gray-900 to-transparent"></div>
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>

      <div class="container-custom relative z-10">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          <!-- Repairs Completed -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 group">
            <div class="text-center">
              <div class="flex items-start justify-center gap-1 mb-2">
                <span class="text-3xl md:text-4xl lg:text-5xl font-black text-white">۱۰۰۰۰</span>

                <span class="text-lg md:text-xl font-semibold text-blue-500">+</span>
              </div>

              <p class="text-white font-normal text-sm md:text-base">تعمیرات موفق</p>
            </div>

            <img 
              src="/icons/counter-icon1.png" 
              alt="تعمیرات موفق" 
              class="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
            >
          </div>

          <!-- Happy Customers -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 group">
            <div class="text-center">
              <div class="flex items-start justify-center gap-1 mb-2">
                <span class="text-3xl md:text-4xl lg:text-5xl font-black text-white">۸۵۰۰</span>
                <span class="text-lg md:text-xl font-semibold text-blue-500">+</span>
              </div>
              <p class="text-white font-normal text-sm md:text-base">مشتری راضی</p>
            </div>
            <img 
              src="/icons/counter-icon2.png" 
              alt="مشتری راضی" 
              class="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
            >
          </div>

          <!-- Years Experience -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 group">
            <div class="text-center">
              <div class="flex items-start justify-center gap-1 mb-2">
                <span class="text-3xl md:text-4xl lg:text-5xl font-black text-white">۱۰</span>
                <span class="text-lg md:text-xl font-semibold text-blue-500">+</span>
              </div>
              <p class="text-white font-normal text-sm md:text-base">سال تجربه</p>
            </div>
            <img 
              src="/icons/counter-icon3.png" 
              alt="سال تجربه" 
              class="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
            >
          </div>

          <!-- Expert Technicians -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-2 group">
            <div class="text-center">
              <div class="flex items-start justify-center gap-1 mb-2">
                <span class="text-3xl md:text-4xl lg:text-5xl font-black text-white">۵۰</span>
                <span class="text-lg md:text-xl font-semibold text-blue-500">+</span>
              </div>
              <p class="text-white font-normal text-sm md:text-base">تکنسین متخصص</p>
            </div>
            <img 
              src="/icons/counter-icon4.png" 
              alt="تکنسین متخصص" 
              class="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
            >
          </div>
        </div>
      </div>
    </section>

     <!-- About Section - Bixol Style -->
    <section class="py-12 md:py-20 bg-white relative overflow-hidden">
      <!-- Decorative Shapes -->
      <div class="absolute top-0 left-0 w-32 h-32 opacity-60 pointer-events-none">
        <img 
          src="/images/h9-shape6.png" 
          alt="" 
          class="w-full h-full object-contain"
        >
      </div>
      <div class="absolute bottom-0 right-0 w-32 h-32 opacity-60 pointer-events-none rotate-180">
        <img 
          src="/images/h9-shape6.png" 
          alt="" 
          class="w-full h-full object-contain"
        >
      </div>

      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
          <!-- Left Side - Large Portrait Image with CTA -->
          <div class="relative">
            <!-- Decorative Stars -->
            <div class="absolute top-6 right-6 z-10 flex gap-2">
              <div class="w-6 h-6">
                <Icon name="ph:star-four-fill" class="w-full h-full" style="color: #eab308" />
              </div>
              <div class="w-4 h-4">
                <Icon name="ph:star-four-fill" class="w-full h-full" style="color: #eab308" />
              </div>
            </div>

            <!-- Main Portrait Image -->
            <div class="relative rounded-sm overflow-hidden shadow-2xl">
              <img 
                src="/images/1.jpg" 
                alt="تعمیرکار حرفه‌ای" 
                class="w-full h-[400px] md:h-[600px] object-cover"
              >
            </div>

            <!-- Call to Action Overlay - Bottom Left -->
            <div class="absolute -bottom-6 md:-bottom-8 -right-4 md:-right-8 bg-primary-700 rounded-sm p-4 md:p-6 shadow-2xl flex items-center gap-3 md:gap-4">
              <div class="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center" style="background-color: #eab308">
                <Icon name="ph:phone-fill" class="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>

              <div>
                <p class="text-white text-xs md:text-sm font-normal mb-1">تماس هر زمان</p>

                <a href="tel:09369236420" class="text-white text-lg md:text-xl font-bold ltr hover:text-yellow-400 transition-colors">
                  09369236420
                </a>
              </div>
            </div>
          </div>

          <!-- Right Side - Content -->
          <div>
            <!-- Section Badge -->
            <div class="mb-4">
              <span class="text-sm font-bold" style="color: #eab308">درباره ما</span>
            </div>

            <!-- Main Heading -->
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4 md:mb-6 leading-tight">
              ما بهترین ارائه‌دهنده خدمات تعمیرات هستیم
            </h2>
            
            <!-- First Paragraph -->
            <p class="text-base text-gray-600 leading-relaxed mb-6">
              ما بیش از ۱۰ سال است که در زمینه تعمیرات لباسشویی و ماشین ظرفشویی فعالیت می‌کنیم و با افتخار می‌گوییم که در این زمینه متخصص هستیم. ما تیمی از تکنسین‌های ماهر و خلاق داریم.
            </p>

            <!-- Feature Icons - Two Columns -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6">
              <!-- Feature 1 -->
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0 w-14 h-14 bg-primary-700 rounded-sm flex items-center justify-center">
                  <Icon name="ph:sparkle-bold" class="w-7 h-7" style="color: #eab308" />
                </div>

                <div>
                  <h3 class="text-base font-black text-gray-900">
                    تعمیرات با کیفیت بالا
                  </h3>
                </div>
              </div>

              <!-- Feature 2 -->
              <div class="flex items-center gap-3">
                <div class="flex-shrink-0 w-14 h-14 bg-primary-700 rounded-sm flex items-center justify-center">
                  <Icon name="ph:users-three-bold" class="w-7 h-7" style="color: #eab308" />
                </div>
                
                <div>
                  <h3 class="text-base font-black text-gray-900">
                    تیم متخصص تعمیرکار
                  </h3>
                </div>
              </div>
            </div>

            <p class="text-base text-gray-600 leading-relaxed mb-6">
              آژانس ما تنها می‌تواند به اندازه افراد ما قوی باشد و به همین دلیل، تیم ما محصولات تغییر دهنده بازی را طراحی کرده است.
            </p>

            <div class="mb-8">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-base font-black text-gray-900">رضایت مشتری</h3>
                
                <span class="text-base font-bold text-gray-600">95٪</span>
              </div>

              <div class="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="absolute top-0 right-0 h-full w-[95%] rounded-full" style="background-color: #eab308"></div>
              </div>
            </div>

            <!-- Read More Button -->
            <NuxtLink 
              to="/about" 
              class="inline-flex items-center gap-3 bg-primary-700 hover:bg-primary-800 text-white font-bold py-4 px-8 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>بیشتر بخوانید</span>
              <div class="w-6 h-6 rounded flex items-center justify-center" style="background-color: #eab308">
                <Icon name="ph:arrow-up-left-bold" class="w-4 h-4 text-white" />
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20 bg-white">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto mb-8 md:mb-16">
          <div class="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            خدمات ما
          </div>

          <h2 class="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            ما در بسیاری از زمینه‌ها برای تعمیر دستگاه‌های شما کار می‌کنیم
          </h2>

          <p class="text-base text-gray-600">
            ما برنامه شلوغ شما را درک می‌کنیم و فقط یک تماس با ما فاصله دارید
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div v-for="(service, index) in services" :key="index" class="group bg-white border-2 border-gray-100 rounded-sm hover:border-primary-250 hover:shadow-md transition-all duration-300">
            <div class="p-4 md:p-6">
              <div class="relative mb-6">
                <div class="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-sm flex items-center justify-center group-hover:from-primary-600 group-hover:to-primary-700 transition-all duration-300">
                  <Icon :name="service.icon" class="w-10 h-10 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <div class="absolute -top-2 -right-2 w-16 h-16 bg-primary-50 rounded-sm -z-10 group-hover:bg-primary-100 transition-colors"></div>
              </div>

              <h3 class="text-lg font-black text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {{ service.title }}
              </h3>
              
              <p class="text-sm text-gray-600 leading-relaxed mb-3 font-normal">
                {{ service.description }}
              </p>

              <div class="text-5xl md:text-7xl font-black text-gray-50 group-hover:text-primary-50 transition-colors">
                {{ String(index + 1).padStart(2, '0') }}
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
            <NuxtLink 
            to="/contact" 
            class="inline-flex items-center gap-3 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-10 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span>مشاهده تمام خدمات</span>

            <Icon name="ph:arrow-left-bold" class="w-5 h-5" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="mb-2">
            <div class="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            آخرین اخبار
            </div>
          </div>

          <h2 class="text-3xl md:text-4xl font-black text-gray-900">
            ما در بسیاری از زمینه‌ها برای تعمیر اطراف شما کار می‌کنیم
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article v-for="article in articles" :key="article.id" class="bg-white rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
            <div class="relative h-48 md:h-64 overflow-hidden">
              <img 
                :src="article.image || '/images/default-article.jpg'" 
                :alt="article.title" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              >

              <div v-if="article.publishedAt" class="absolute bottom-4 right-4 bg-black px-4 py-2 rounded-sm">
                <p class="text-white text-sm font-semibold">{{ formatDate(article.publishedAt) }}</p>
              </div>
            </div>

            <div class="p-4 md:p-6">
              <div class="flex items-center gap-2 text-xs text-blue-500 font-semibold mb-3">
                <span>تعمیرمستر</span>

                <span v-if="article.category" class="text-gray-300">|</span>

                <span v-if="article.category">{{ article.category }}</span>
              </div>

              <h3 class="text-xl font-black text-gray-900 mb-4 leading-tight hover:text-blue-500 transition-colors cursor-pointer">
                {{ article.title }}
              </h3>

              <div class="w-12 h-1 rounded-full mb-4" style="background-color: #eab308"></div>

              <p class="text-sm text-gray-600 leading-relaxed mb-6">
                {{ article.excerpt || article.metaDescription || 'بدون توضیح' }}
              </p>

              <NuxtLink 
                :to="`/articles/${article.slug}`" 
                class="inline-flex items-center gap-2 text-gray-900 font-bold hover:text-blue-500 transition-colors group/link"
              >
                <span>بیشتر بخوانید</span>
                
                <div class="w-8 h-8 rounded-sm flex items-center justify-center transition-all" style="background-color: #eab308">
                  <Icon name="ph:arrow-up-left-bold" class="w-4 h-4 text-white group-hover/link:translate-x-1 transition-transform" />
                </div>
              </NuxtLink>
            </div>
          </article>
        </div>

        <div class="text-center mt-12">
          <NuxtLink 
            to="/blog" 
            class="inline-flex items-center gap-4 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span>مشاهده همه</span>
            <div class="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
              <Icon name="ph:eye-bold" class="w-5 h-5 text-gray-900" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20 bg-white">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            نظرات مشتریان
          </div>
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            تعمیرکاران در بازه زمانی مشخص آمدند
          </h2>

          <p class="text-base text-gray-600">
            از علاقه شما به استفاده از خدمات تعمیرمستر سپاسگزاریم
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.name" class="bg-gradient-to-br from-gray-50 to-white rounded-sm p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 border-2 border-gray-100 hover:border-primary-100">
            <div class="w-16 h-16 bg-primary-100 rounded-sm flex items-center justify-center mb-6">
              <Icon name="ph:quotes-bold" class="w-8 h-8 text-primary-600" />
            </div>

            <h3 class="text-lg font-black text-gray-900 mb-3">{{ testimonial.title }}</h3>

            <div class="flex items-center gap-1 mb-4">
              <Icon 
                v-for="i in 5" 
                :key="i" 
                name="ph:star-fill" 
                :class="i <= testimonial.stars ? 'text-yellow-400' : 'text-gray-200'"
                class="w-5 h-5"
              />
            </div>

            <p class="text-gray-600 leading-relaxed mb-6">
              {{ testimonial.text }}
            </p>
              
            <div class="flex items-center gap-4 pt-6 border-t border-gray-200">
              <div class="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                <Icon name="ph:user-bold" class="w-7 h-7 text-white" />
              </div>
              <div>
                <div class="font-bold text-gray-900 text-base">{{ testimonial.name }}</div>
                <div class="text-sm text-gray-500 font-normal">{{ testimonial.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section - Book Service Style -->
    <section class="py-12 md:py-20 bg-white overflow-hidden relative">
      <!-- Decorative Background Elements -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <!-- Dashed S-Curve Background -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20">
          <img 
            src="/images/download (4).png" 
            alt="" 
            class="w-full h-full object-contain"
          >
        </div>

        <!-- Bubbles on left -->
        <div class="absolute top-20 left-20 w-16 h-16 bg-blue-100 rounded-full opacity-30"></div>
        <div class="absolute top-40 left-32 w-12 h-12 bg-blue-50 rounded-full opacity-40"></div>
        <div class="absolute bottom-32 left-24 w-20 h-20 bg-blue-100 rounded-full opacity-25"></div>
      </div>

      <div class="container-custom relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <!-- Left Side - Book Service Form -->
          <div class="relative">
            <!-- Form Card -->
            <div class="bg-gradient-to-br from-primary-700 to-primary-800 rounded-md p-4 md:p-6 shadow-2xl border-2 form-with-border">
              <h2 class="text-xl md:text-2xl font-black text-white text-center mb-4">رزرو خدمات</h2>
              
              <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Your Name -->
                <div class="input-dark">
                  <KitInput
                    v-model="form.firstName"
                    type="text"
                    placeholder="نام شما"
                    :required="true"
                    custom-class="bg-gray-700/30 border-gray-600/30 text-white placeholder-gray-300 focus:bg-gray-700/50 focus:border-blue-400"
                  />
                </div>

                <!-- Email Address -->
                <div class="input-dark">
                  <KitInput
                    v-model="form.email"
                    type="email"
                    placeholder="آدرس ایمیل شما"
                    :required="true"
                    right-icon="ph:envelope-bold"
                    custom-class="bg-gray-700/30 border-gray-600/30 text-white placeholder-gray-300 focus:bg-gray-700/50 focus:border-blue-400 ltr text-right"
                  />
                </div>

                <!-- Phone Number -->
                <div class="input-dark">
                  <KitInput
                    v-model="form.phone"
                    type="tel"
                    placeholder="شماره تماس"
                    :required="true"
                    right-icon="ph:phone-bold"
                    custom-class="bg-gray-700/30 border-gray-600/30 text-white placeholder-gray-300 focus:bg-gray-700/50 focus:border-blue-400 ltr text-right"
                  />
                </div>

                <!-- Date Picker -->
                <div class="input-dark">
                  <KitInput
                    v-model="form.date"
                    type="date"
                    placeholder="تاریخ"
                    right-icon="ph:calendar-bold"
                    custom-class="bg-gray-700/30 border-gray-600/30 text-white placeholder-gray-300 focus:bg-gray-700/50 focus:border-blue-400"
                  />
                </div>

                <!-- Select Service -->
                <div class="input-dark">
                  <KitSelect
                    v-model="form.service"
                    placeholder="انتخاب خدمت"
                    :options="serviceOptions"
                    custom-class="bg-gray-700/30 border border-gray-600/30 text-white focus:bg-gray-700/50 focus:border-blue-400"
                  />
                </div>

                <!-- Submit Button -->
                <KitButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  :full-width="true"
                  rounded="sm"
                >
                  رزرو اکنون
                </KitButton>
              </form>
            </div>
          </div>

          <!-- Right Side - Animated Illustration -->
          <div class="relative min-h-[400px] md:min-h-[600px] flex items-center justify-center">
            <!-- Decorative Elements -->
            
            <!-- Large Checkmark - Left Side -->
            <div class="absolute top-24 left-12 w-20 h-20 animate-float">
              <img 
                src="/images/download.png" 
                alt="" 
                class="w-full h-full object-contain"
              >
            </div>

            <!-- Speech Bubble with Heart - Top Right -->
            <div class="absolute top-12 right-20 w-24 h-24 animate-bounce-slow">
              <img 
                src="/images/download (1).png" 
                alt="" 
                class="w-full h-full object-contain"
              >
            </div>

            <!-- Gear Icon - Bottom Right -->
            <div class="absolute bottom-32 right-16 w-16 h-16 animate-spin-slow">
              <img 
                src="/images/download (2).png" 
                alt="" 
                class="w-full h-full object-contain"
              >
            </div>

            <!-- Checkmark - Top Center -->
            <div class="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 animate-pulse">
              <img 
                src="/images/download.png" 
                alt="" 
                class="w-full h-full object-contain"
              >
            </div>

            <!-- Main Illustration - Mobile Phone -->
            <div class="relative -z-100">
              <div class="relative w-110 lg:w-110 animate-float-slow">
                <img 
                  src="/images/mobile-Sgb1lnhD.png" 
                  alt="موبایل اپلیکیشن" 
                  class="w-full h-auto object-contain drop-shadow-2xl"
                >
              </div>
            </div>

            <!-- Woman Character - Pointing -->
            <div class="absolute bottom-0 right-8 lg:right-16 w-48 lg:w-56 animate-fade-in-up">
              <img 
                src="/images/women-D7Kp60KR.png" 
                alt="مشاور" 
                class="w-full h-auto object-contain"
              >
            </div>

            <!-- Additional decorative bubbles -->
            <div class="absolute top-1/3 left-8 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
            <div class="absolute bottom-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO Meta Tags
useHead({
  title: 'تعمیرمستر | تعمیر حرفه‌ای لباسشویی در منزل',
  meta: [
    {
      name: 'description',
      content: 'تعمیر لباسشویی در محل با بهترین کیفیت. حضور در کمتر از ۲ ساعت، قطعات اورجینال، ضمانت کتبی'
    }
  ]
})

// Services Data
const services = ref([
  {
    icon: 'ph:gear-bold',
    title: 'تعمیر موتور لباسشویی',
    description: 'تعمیر و تعویض موتور، بلبرینگ، تسمه و سایر قطعات موتور با قطعات اورجینال'
  },
  {
    icon: 'ph:drop-bold',
    title: 'رفع نشتی آب',
    description: 'شناسایی و رفع انواع نشتی آب، تعویض لاستیک در و شیلنگ‌های آب'
  },
  {
    icon: 'ph:gear-bold',
    title: 'تعمیر سیستم برق',
    description: 'تعمیر برد الکترونیک، تایمر، ترموستات و سایر قطعات الکتریکی'
  },
  {
    icon: 'ph:spinner-bold',
    title: 'تعمیر پمپ تخلیه',
    description: 'تعویض و تعمیر پمپ تخلیه آب، رفع گرفتگی و مشکلات تخلیه'
  },
  {
    icon: 'ph:wrench-bold',
    title: 'سرویس کامل',
    description: 'تمیزکاری عمیق، چرب‌کاری قطعات و بررسی کامل دستگاه'
  },
  {
    icon: 'ph:thermometer-bold',
    title: 'تعمیر سیستم حرارتی',
    description: 'تعویض هیتر، ترموستات و رفع مشکلات گرم نشدن آب'
  }
])

// Fetch Articles from API
const { data: articlesData } = useLazyFetch<{ data: any[]; total: number }>(
  '/api/articles?page=1&limit=3',
  {
    key: 'homepage-articles',
  }
)

const articles = computed(() => articlesData.value?.data || [])

// Date formatting
const { formatDate: formatDateHelper } = useDate()
const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return ''
  try {
    return formatDateHelper(date)
  } catch {
    return ''
  }
}

// Testimonials Data
const testimonials = ref([
  {
    title: 'بهترین پشتیبانی!',
    stars: 5,
    text: '۵ ستاره برای کیفیت طراحی، اما همچنین برای خدمات سریع به مشتریان جدید و توجه عالی به جزئیات کار.',
    name: 'الهام رضایی',
    role: 'مشتری'
  },
  {
    title: 'خدمات عالی!',
    stars: 5,
    text: '۵ ستاره برای کیفیت طراحی، اما همچنین برای خدمات سریع به مشتریان جدید و توجه عالی به جزئیات کار.',
    name: 'علی محمدی',
    role: 'مشتری'
  },
  {
    title: 'رضایت از خدمات!',
    stars: 5,
    text: '۵ ستاره برای کیفیت طراحی، اما همچنین برای خدمات سریع به مشتریان جدید و توجه عالی به جزئیات کار.',
    name: 'مهدی احمدی',
    role: 'مشتری'
  }
])

// Form Data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  date: '',
  service: '',
  message: ''
})

const serviceOptions = [
  { value: 'washing-machine', label: 'تعمیر لباسشویی' },
  { value: 'dishwasher', label: 'تعمیر ماشین ظرفشویی' },
  { value: 'motor', label: 'تعمیر موتور' },
  { value: 'pump', label: 'تعمیر پمپ' },
  { value: 'full-service', label: 'سرویس کامل' }
]

const handleSubmit = () => {
  // Handle form submission
  alert('رزرو شما با موفقیت ثبت شد! به زودی با شما تماس خواهیم گرفت.')
  form.value = { firstName: '', lastName: '', email: '', phone: '', date: '', service: '', message: '' }
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.animate-slide-up {
  animation: slide-up 1s ease-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 4s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out;
}

/* Contact Form Border Effect */
.form-with-border {
  position: relative;
}

.form-with-border::after {
  content: "";
  position: absolute;
  top: -20px;
  left: -20px;
  border-radius: 3px;
  width: 100%;
  height: 100%;
  border: 2px solid #32AAFF;
  z-index: -1;
}

/* Dark Input Theme - Override icon colors */
.input-dark :deep(.text-gray-400) {
  color: rgb(209 213 219) !important;
}

.input-dark :deep(select option) {
  background: #1f2937;
  color: white;
}

.input-dark :deep(.text-gray-500) {
  color: rgb(209 213 219) !important;
}
</style>
