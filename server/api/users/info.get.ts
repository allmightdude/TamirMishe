import { H3Event } from 'h3'
import { connect } from '../../utils/db'
import { verifyJwt } from '../../utils/auth'
import { Users } from '../../utils/db'

export default defineEventHandler(async (event: H3Event) => {
  try {
    await connect()

    const payload = verifyJwt(event)

    if (!payload) return { user: null }

    const user: any = await Users.findById(payload.sub)

    if (!user) return { user: null }

    const id = String(user.id || user._id)
    const { fullName, mobile, userName, isAdmin, avatar } = user

    const userInfo = { id, fullName, mobile, userName, isAdmin, avatar }

    return { user: userInfo }
  } catch (error: any) {
    // Return null user on error instead of throwing
    return { user: null }
  }
})

