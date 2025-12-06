export default defineNuxtPlugin(() => {
  // Global error handler for unhandled errors
  if (process.client) {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error)
    })

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason)
    })
  }
})



