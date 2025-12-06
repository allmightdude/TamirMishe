import { H3Event } from 'h3'
import { connect, Users } from '../../../utils/db'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event: H3Event) => {
  await connect()
  await requireAdmin(event)

  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Number(query.limit) || 50

  const result = await Users.list({}, page, limit)

  return result
})



