import { H3Event } from 'h3'
import { connect, Articles } from '../../utils/db'

export default defineEventHandler(async (event: H3Event) => {
  await connect()

  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 10
  const search = query.search as string | undefined

  const result = await Articles.list(
    { search, published: true },
    page,
    limit
  )

  return result
})



