import { H3Event, readBody } from 'h3'
import { connect, Users } from '../../utils/db'

export default defineEventHandler(async (event: H3Event) => {
  await connect()

  const body = await readBody<{
    userName: string
    password: string
    fullName: string
    mobile?: string
  }>(event)

  if (!body?.userName || !body?.password || !body?.fullName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'نام کاربری، رمز عبور و نام کامل الزامی است',
      fatal: false,
    })
  }

  const existingUser = await Users.findByUserName(body.userName)

  if (existingUser) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'نام کاربری قبلاً استفاده شده است',
      fatal: false 
    })
  }

  const user = await Users.create({
    userName: body.userName,
    password: body.password,
    fullName: body.fullName,
    mobile: body.mobile,
    isAdmin: false,
  })

  return {
    success: true,
    message: 'ثبت نام با موفقیت انجام شد',
    user,
  }
})

