export const getClientToken = (): string | null => {
  if (process.server) return null
  const cookies = document.cookie.split(';').map((c) => c.trim())
  const kv = cookies.find((c) => c.startsWith('auth_token='))
  return kv ? decodeURIComponent(kv.split('=')[1]) : null
}
