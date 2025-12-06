import { H3Event, getRouterParam, readBody } from 'h3'
import { connect, Articles } from '../../../utils/db'
import { requireUser } from '../../../utils/auth'

export default defineEventHandler(async (event: H3Event) => {
  await connect()
  await requireUser(event)

  const id = getRouterParam(event, 'id')
  const body = await readBody<{
    title?: string
    subtitle?: string
    slug?: string
    content?: string
    tags?: string[]
    image?: string
    metaDescription?: string
    excerpt?: string
    category?: string
    published?: boolean
    seoTitle?: string
    seoCanonical?: string | null
    seoRobots?: 'index, follow' | 'noindex, follow' | 'index, nofollow' | 'noindex, nofollow'
    seoOgTitle?: string | null
    seoOgDescription?: string | null
    seoOgImage?: string | null
    seoTwitterCard?: 'summary' | 'summary_large_image' | 'none'
    seoStructuredData?: any
  }>(event)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'شناسه مقاله الزامی است', fatal: false })
  }

  // Check if slug is being changed and already exists
  if (body.slug) {
    const existingArticle = await Articles.findBySlug(body.slug)
    if (existingArticle && existingArticle.id !== id) {
      throw createError({ statusCode: 400, statusMessage: 'شناسه مقاله قبلاً استفاده شده است', fatal: false })
    }
  }

  const article = await Articles.update(id, body)

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'مقاله یافت نشد', fatal: false })
  }

  return {
    success: true,
    message: 'مقاله با موفقیت به‌روزرسانی شد',
    article,
  }
})



