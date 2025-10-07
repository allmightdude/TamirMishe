import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  // Multiple entry points for your HTML files
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'upfront-pricing': resolve(__dirname, 'upfront-pricing.html'),
        'testimonials': resolve(__dirname, 'testimonials.html'),
        'qualified': resolve(__dirname, 'qualified.html'),
        'professionals': resolve(__dirname, 'professionals.html'),
        'contact': resolve(__dirname, 'contact.html'),
        'article': resolve(__dirname, 'article.html'),
        'about': resolve(__dirname, 'about.html'),
        'structure': resolve(__dirname, 'structure.html')
      },
      output: {
        // Ensure CSS is loaded synchronously
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Output directory
    outDir: 'dist',
    // Asset directory
    assetsDir: 'assets',
    // Disable CSS code splitting to prevent FOUC
    cssCodeSplit: false,
    // Source maps for debugging
    sourcemap: true
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true,
    // Enable CORS for local development
    cors: true
  },

  // CSS preprocessing
  css: {
    preprocessorOptions: {
      scss: {
        // Don't add duplicate imports here since main.scss already imports them
        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin']
      }
    },
    // Disable CSS code splitting to prevent FOUC
    devSourcemap: true
  },

  // Asset handling
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],

  // Plugins
  plugins: [
    // Copy static assets
    viteStaticCopy({
      targets: [
        {
          src: 'static/fonts/**/*',
          dest: 'static/fonts'
        },
        {
          src: 'static/images/**/*',
          dest: 'static/images'
        },
        {
          src: 'static/icons/**/*',
          dest: 'static/icons'
        },
        {
          src: 'static/video/**/*',
          dest: 'static/video'
        },
        {
          src: 'static/js/**/*',
          dest: 'static/js'
        }
      ]
    })
  ],

  // Resolve aliases for cleaner imports
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@assets': resolve(__dirname, './assets'),
      '@static': resolve(__dirname, './static'),
      '@components': resolve(__dirname, './components')
    }
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['swiper']
  }
})