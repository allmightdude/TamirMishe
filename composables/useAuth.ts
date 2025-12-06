export const useAuth = () => {
  const user = useState<any | null>('auth_user', () => null)
  const pending = useState<boolean>('auth_pending', () => false)

  // Track ongoing fetch promise to prevent duplicate requests
  let fetchPromise: Promise<void> | null = null

  const fetchUser = async () => {
    // If a fetch is already in progress, wait for it
    if (fetchPromise) {
      return fetchPromise
    }

    // Start new fetch
    fetchPromise = (async () => {
      pending.value = true
      try {
        // On server-side, forward cookies from the request
        const headers: Record<string, string> = {}
        if (process.server) {
          try {
            const requestHeaders = useRequestHeaders(['cookie'])
            if (requestHeaders.cookie) {
              headers.cookie = requestHeaders.cookie
            }
          } catch (e) {
            // useRequestHeaders might not be available in all contexts
          }
        }

        const res = await $fetch<{ user: any | null }>('/api/users/info', {
          headers,
        })

        user.value = res?.user ?? null
      } catch (e) {
        user.value = null
      } finally {
        pending.value = false
        fetchPromise = null
      }
    })()

    return fetchPromise
  }

  const signIn = async (payload: { userName: string; password: string }) => {
    const res = await $fetch<{ token: string }>('/api/authentication/sign-in', {
      method: 'POST',
      body: payload,
    })

    if (!res?.token) throw new Error('توکن دریافت نشد')

    if (process.client) {
      document.cookie = `auth_token=${res.token}; path=/; max-age=${60 * 60 * 24 * 7}`
    }

    await fetchUser()
  }

  const signUp = async (payload: {
    userName: string
    password: string
    fullName: string
    mobile?: string
  }) => {
    const res = await $fetch<{
      success: boolean
      message: string
      user: any
    }>('/api/authentication/sign-up', {
      method: 'POST',
      body: payload,
    })

    if (!res?.success) throw new Error(res?.message || 'خطا در ثبت نام')

    return res
  }

  const logout = async () => {
    await $fetch('/api/authentication/logout', { method: 'POST' })

    if (process.client) {
      document.cookie = 'auth_token=; path=/; max-age=0'
    }

    user.value = null
  }

  // Fetch user on both server and client if not already loaded
  if (user.value === null && !pending.value) {
    fetchUser()
  }

  return { user, pending, fetchUser, signIn, signUp, logout }
}
