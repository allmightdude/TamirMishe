import { H3Event, readBody } from 'h3'
import { connect, Users } from '../../utils/db'

export default defineEventHandler(async (event: H3Event) => {
  await connect()

  const body = await readBody<{
    userName?: string
    password?: string
    fullName?: string
  }>(event)

  // Check if any admin user already exists
  const existingAdmins = await Users.list({ isAdmin: true }, 1, 1)

  if (existingAdmins.data.length > 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'کاربر ادمین از قبل وجود دارد. لطفاً از پنل مدیریت استفاده کنید.',
      fatal: false,
    })
  }

  // Use provided values or defaults
  const userName = body?.userName || 'admin'
  const password = body?.password || 'admin123'
  const fullName = body?.fullName || 'مدیر سیستم'

  // Check if username already exists
  const existingUser = await Users.findByUserName(userName)

  if (existingUser) {
    throw createError({ 
      statusCode: 400, 
      statusMessage: 'نام کاربری قبلاً استفاده شده است',
      fatal: false 
    })
  }

  // Create admin user
  const admin = await Users.create({
    userName,
    password,
    fullName,
    isAdmin: true,
  })

  return {
    success: true,
    message: 'کاربر ادمین با موفقیت ایجاد شد',
    user: {
      userName: admin.userName,
      fullName: admin.fullName,
      isAdmin: admin.isAdmin,
    },
    credentials: {
      userName,
      password,
    },
  }
})

