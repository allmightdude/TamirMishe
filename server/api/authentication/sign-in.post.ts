import { H3Event, readBody } from 'h3'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { connect, Users } from '../../utils/db'

export default defineEventHandler(async (event: H3Event) => {
  await connect()

  const body = await readBody<{ userName: string; password: string }>(event)

  if (!body?.userName || !body?.password) {
    throw createError({ statusCode: 400, statusMessage: 'نام کاربری و کلمه عبور الزامی است' })
  }

  const user: any = await Users.findByUserName(body.userName)

  if (!user) {
    throw createError({ 
      statusCode: 401, 
      statusMessage: 'نام کاربری یا رمز عبور نادرست است',
      fatal: false 
    })
  }

  if (!bcrypt.compareSync(body.password, user.passwordHash)) {
    throw createError({ 
      statusCode: 401, 
      statusMessage: 'نام کاربری یا رمز عبور نادرست است',
      fatal: false 
    })
  }

  const userId = String(user._id || user.id)

  const config = useRuntimeConfig()

  const jwtSecret = config.jwtSecret

  const token = jwt.sign({ sub: userId, isAdmin: user.isAdmin || false }, jwtSecret, {
    expiresIn: config.jwtExpiration,
  })

  return { token }
})

