import { H3Event, readBody } from 'h3'
import { connect, Articles } from '../../../utils/db'
import { requireAdmin, requireUser } from '../../../utils/auth'

export default defineEventHandler(async (event: H3Event) => {
  await connect()
  const user = await requireUser(event)

  const body = await readBody<{
    title: string
    subtitle?: string
    slug: string
    content: string
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

  if (!body?.title || !body?.slug || !body?.content) {
    throw createError({
      statusCode: 400,
      statusMessage: 'عنوان، شناسه و محتوا الزامی است',
      fatal: false,
    })
  }

  // Check if slug already exists
  const existingArticle = await Articles.findBySlug(body.slug)
  if (existingArticle) {
    throw createError({ statusCode: 400, statusMessage: 'شناسه مقاله قبلاً استفاده شده است', fatal: false })
  }

  const article = await Articles.create({
    title: body.title,
    subtitle: body.subtitle,
    slug: body.slug,
    content: body.content,
    tags: body.tags || [],
    image: body.image || '',
    metaDescription: body.metaDescription || '',
    excerpt: body.excerpt || '',
    category: body.category || '',
    published: body.published || false,
    authorId: user.id,
    seoTitle: body.seoTitle || '',
    seoCanonical: body.seoCanonical || null,
    seoRobots: body.seoRobots || 'index, follow',
    seoOgTitle: body.seoOgTitle || null,
    seoOgDescription: body.seoOgDescription || null,
    seoOgImage: body.seoOgImage || null,
    seoTwitterCard: body.seoTwitterCard || 'summary_large_image',
    seoStructuredData: body.seoStructuredData || null,
  })

  return {
    success: true,
    message: 'مقاله با موفقیت ایجاد شد',
    article,
  }
})

