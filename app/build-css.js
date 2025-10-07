// Build script to generate CSS files for direct HTML loading
import { build } from 'vite'
import { resolve } from 'path'
import { writeFileSync } from 'fs'

// Build CSS files
async function buildCSS() {
  try {
    // Build the main CSS entry
    const result = await build({
      build: {
        lib: {
          entry: resolve(__dirname, 'assets/styles/main.scss'),
          name: 'MainCSS',
          fileName: 'main',
          formats: ['es']
        },
        rollupOptions: {
          external: [],
          output: {
            assetFileNames: (assetInfo) => {
              if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                return 'assets/styles/main.css';
              }
              return 'assets/[name]-[hash][extname]';
            }
          }
        },
        outDir: 'dist',
        cssCodeSplit: false
      },
      css: {
        preprocessorOptions: {
          scss: {
            silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin']
          }
        }
      }
    })
    
    console.log('✅ CSS build completed successfully!')
    console.log('📁 CSS files generated in dist/assets/styles/')
    
  } catch (error) {
    console.error('❌ CSS build failed:', error)
  }
}

buildCSS()


