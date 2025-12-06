import { H3Event, getRouterParam } from 'h3'
import { connect, Articles, Users } from '../../utils/db'

export default defineEventHandler(async (event: H3Event) => {
  await connect()

  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'شناسه مقاله الزامی است' })
  }

  const article = await Articles.findBySlug(slug)

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'مقاله یافت نشد' })
  }

  // Fetch author information
  let author = null
  if (article.authorId) {
    author = await Users.findById(article.authorId)
  }

  // Increment views
  await Articles.incrementViews(slug)

  return {
    article: {
      ...article,
      author: author
        ? {
            id: author.id,
            fullName: author.fullName,
            avatar: author.avatar,
          }
        : null,
    },
  }
})



