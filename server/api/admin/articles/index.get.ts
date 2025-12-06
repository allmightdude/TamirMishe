import { H3Event } from 'h3'
import { connect, Articles } from '../../../utils/db'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event: H3Event) => {
  await connect()
  await requireAdmin(event)

  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 50
  const search = query.search as string | undefined
  const published = query.published !== undefined ? query.published === 'true' : undefined

  const result = await Articles.list({ search, published }, page, limit)

  return {
    data: result.data,
    total: result.total,
    page: result.page,
    limit: result.limit,
  }
})

