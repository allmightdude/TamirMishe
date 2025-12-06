// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // SSR Configuration
  ssr: true,
  
  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon'
  ],
  
  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true
  },
  
  // App configuration
  app: {
    head: {
      htmlAttrs: {
        lang: 'fa',
        dir: 'rtl'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'مرکز تخصصی تعمیرات ماشین لباسشویی',
      meta: [
        { name: 'description', content: 'تعمیر لباسشویی در محل-ما لباسشویی شما را در منزل خودتان در کمترین زمان تعمیر می کنیم-سریع ترین و با کیفیت ترین خدمات را از ما بخواهید-تعمیرمستر مرکز تخصصی تعمیرات ماشین لباسشویی' },
        { name: 'robots', content: 'index,follow' },
        { name: 'author', content: 'تعمیرمستر' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icons/handyman-icon.svg' }
      ]
    }
  },
  
  // CSS configuration
  css: [
    '~/assets/css/fonts.css'
  ],
  
  // Tailwind configuration
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true
  },
  
  // Nitro configuration for SSR
  nitro: {
    compressPublicAssets: true
  },
  
  // Runtime configuration
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'f65e01171238f37f364d05a693ceaf22',
    jwtExpiration: process.env.JWT_EXPIRATION ? Number(process.env.JWT_EXPIRATION) : 86400, // 24 hours
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/tamirmaster',
    dbName: process.env.DB_NAME || 'tamirmaster',
    
    public: {
      appName: 'تعمیرمستر',
      baseUrl: process.env.BASE_URL || 'https://tamirmaster.com',
    },
  }
})

