export default defineNuxtRouteMiddleware(async (to) => {
  const { user, fetchUser } = useAuth()

  // On server-side, verify auth directly from the event
  if (process.server) {
    try {
      const event = useRequestEvent()
      if (event) {
        const { requireAdmin } = await import('~/server/utils/auth')
        const { connect } = await import('~/server/utils/db')
        
        await connect()
        const adminUser = await requireAdmin(event)
        
        // Set user in state for client-side hydration
        user.value = {
          id: String(adminUser._id || adminUser.id),
          fullName: adminUser.fullName,
          mobile: adminUser.mobile,
          userName: adminUser.userName,
          isAdmin: adminUser.isAdmin,
          avatar: adminUser.avatar,
        }
        
        return // Auth successful, allow access
      }
    } catch (error: any) {
      // If requireAdmin throws, user is not authenticated or not admin
      throw createError({
        statusCode: error.statusCode || 403,
        statusMessage: error.statusMessage || 'شما اجازه دسترسی به این صفحه را ندارید',
        fatal: false,
      })
    }
  }

  // On client-side, fetch user via API
  await fetchUser()

  if (!user.value || !user.value?.isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'شما اجازه دسترسی به این صفحه را ندارید',
      fatal: false,
    })
  }
})
