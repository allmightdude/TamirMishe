import { H3Event, getCookie, getHeader } from 'h3'
import jwt from 'jsonwebtoken'
import { Users } from './db'

export type JwtPayload = { sub: string; isAdmin: boolean }

export const getJwt = (event: H3Event) => {
  const auth = getHeader(event, 'authorization') || ''

  const bearer = auth.toString().startsWith('Bearer ') ? auth.toString().slice(7) : null

  return bearer || getCookie(event, 'auth_token') || null
}

export const verifyJwt = (event: H3Event) => {
  const token = getJwt(event)

  if (!token) return null
  try {
    const config = useRuntimeConfig()

    const jwtSecret = config.jwtSecret

    const payload = jwt.verify(token, jwtSecret) as JwtPayload

    return payload
  } catch (error) {
    return null
  }
}

export const requireUser = async (event: H3Event) => {
  const payload = verifyJwt(event)

  if (!payload) {
    throw createError({ 
      statusCode: 401, 
      statusMessage: 'لطفاً ابتدا وارد حساب کاربری خود شوید',
      fatal: false 
    })
  }

  const user = await Users.findById(payload.sub)

  if (!user) {
    throw createError({ 
      statusCode: 401, 
      statusMessage: 'کاربر یافت نشد',
      fatal: false 
    })
  }

  return user as any
}

export const requireAdmin = async (event: H3Event) => {
  const user: any = await requireUser(event)

  if (!user.isAdmin) {
    throw createError({ 
      statusCode: 403, 
      statusMessage: 'شما اجازه دسترسی به این صفحه را ندارید',
      fatal: false 
    })
  }

  return user
}

