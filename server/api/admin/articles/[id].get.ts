import { H3Event, getRouterParam } from 'h3'
import { connect, Articles } from '../../../utils/db'
import { requireUser } from '../../../utils/auth'

export default defineEventHandler(async (event: H3Event) => {
  await connect()
  await requireUser(event)

  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'شناسه مقاله الزامی است', fatal: false })
  }

  const article = await Articles.findById(id)

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'مقاله یافت نشد', fatal: false })
  }

  return { article }
})



