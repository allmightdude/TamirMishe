import { H3Event, getRouterParam } from 'h3'
import { connect, Articles } from '../../../utils/db'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event: H3Event) => {
  await connect()
  await requireAdmin(event)

  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'شناسه مقاله الزامی است', fatal: false })
  }

  await Articles.deleteById(id)

  return { success: true, message: 'مقاله با موفقیت حذف شد' }
})



