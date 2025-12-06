import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import type { ConnectOptions } from 'mongoose'

let connection: Promise<typeof mongoose> | null = null
let isConnected = false

export async function connect() {
  if (isConnected) {
    return
  }

  if (!connection) {
    const config = useRuntimeConfig()
    let uri = config.mongodbUri

    if (!uri) {
      console.log('No MongoDB URI found, using memory server for development')
      const { MongoMemoryServer } = await import('mongodb-memory-server')
      const mem = await MongoMemoryServer.create()
      uri = mem.getUri()
    }

    const dbName = config.dbName

    const opts: ConnectOptions = { dbName }

    connection = mongoose.connect(uri, opts)
  }

  await connection
  isConnected = true
}

function ensureConnection() {
  if (!isConnected && !connection) {
    throw new Error('Database not connected. Call connect() first.')
  }
}

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    mobile: { type: String },
    userName: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    avatar: { type: String, default: '' },
  },
  { timestamps: true }
)

function getUserModel() {
  ensureConnection()
  return (mongoose.models.User as mongoose.Model<any>) || model('User', UserSchema)
}

export type UserDTO = {
  id?: string
  fullName: string
  mobile?: string
  userName: string
  password?: string
  isAdmin?: boolean
  avatar?: string
}

export const Users = {
  async findByUserName(userName: string) {
    ensureConnection()
    return getUserModel().findOne({ userName }).lean().exec()
  },

  async findById(id: string) {
    ensureConnection()
    const doc = (await getUserModel().findById(id).lean().exec()) as any

    if (!doc) return null

    return {
      id: String(doc._id),
      fullName: doc.fullName,
      mobile: doc.mobile,
      userName: doc.userName,
      isAdmin: doc.isAdmin || false,
      createdAt: doc.createdAt,
      avatar: doc.avatar || '',
    }
  },

  async create(dto: UserDTO) {
    ensureConnection()
    const passwordHash = bcrypt.hashSync(dto.password || '', 10)

    const doc = await getUserModel().create({
      fullName: dto.fullName,
      mobile: dto.mobile,
      userName: dto.userName,
      passwordHash,
      isAdmin: dto.isAdmin || false,
      avatar: dto.avatar || '',
    })

    return {
      id: String(doc._id),
      fullName: doc.fullName,
      mobile: doc.mobile,
      userName: doc.userName,
      isAdmin: doc.isAdmin || false,
      avatar: doc.avatar || '',
    }
  },

  async list(filters: any = {}, page: number = 1, limit: number = 10) {
    ensureConnection()

    const query: any = {}

    if (filters.search) {
      query.$or = [
        { userName: { $regex: filters.search, $options: 'i' } },
        { fullName: { $regex: filters.search, $options: 'i' } },
        { mobile: { $regex: filters.search, $options: 'i' } },
      ]
    }

    if (filters.isAdmin !== undefined) {
      query.isAdmin = filters.isAdmin
    }

    const users = (await getUserModel()
      .find(query, { passwordHash: 0 })
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec()) as any[]

    const total = await getUserModel().countDocuments(query)

    return {
      data: users.map((doc) => ({
        id: String(doc._id),
        fullName: doc.fullName,
        mobile: doc.mobile,
        userName: doc.userName,
        isAdmin: doc.isAdmin || false,
        avatar: doc.avatar || '',
        createdAt: doc.createdAt,
      })),
      total,
      page,
      limit,
    }
  },

  async deleteById(id: string) {
    ensureConnection()
    await getUserModel().findByIdAndDelete(id)
  },
}

// Article Schema
const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true }, // HTML content from TipTap
    tags: [{ type: String }],
    image: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    excerpt: { type: String, default: '' }, // Short excerpt for preview
    category: { type: String, default: '' }, // Article category
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    authorId: { type: String, required: true },
    views: { type: Number, default: 0 },
    // SEO fields
    seoTitle: { type: String, default: '', maxlength: 70 },
    seoCanonical: { type: String, default: null },
    seoRobots: {
      type: String,
      enum: ['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow'],
      default: 'index, follow',
    },
    seoOgTitle: { type: String, default: null, maxlength: 70 },
    seoOgDescription: { type: String, default: null, maxlength: 320 },
    seoOgImage: { type: String, default: null },
    seoTwitterCard: {
      type: String,
      enum: ['summary', 'summary_large_image', 'none'],
      default: 'summary_large_image',
    },
    seoStructuredData: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
)

function getArticleModel() {
  ensureConnection()
  return (mongoose.models.Article as mongoose.Model<any>) || model('Article', ArticleSchema)
}

export type ArticleDTO = {
  id?: string
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
  publishedAt?: Date
  authorId: string
  views?: number
  // SEO fields
  seoTitle?: string
  seoCanonical?: string | null
  seoRobots?: 'index, follow' | 'noindex, follow' | 'index, nofollow' | 'noindex, nofollow'
  seoOgTitle?: string | null
  seoOgDescription?: string | null
  seoOgImage?: string | null
  seoTwitterCard?: 'summary' | 'summary_large_image' | 'none'
  seoStructuredData?: any
}

export const Articles = {
  async findBySlug(slug: string) {
    ensureConnection()
    const doc = (await getArticleModel().findOne({ slug, published: true }).lean().exec()) as any

    if (!doc || !doc._id) return null

    return {
      id: String(doc._id),
      title: doc.title,
      subtitle: doc.subtitle,
      slug: doc.slug,
      content: doc.content,
      tags: doc.tags || [],
      image: doc.image || '',
      metaDescription: doc.metaDescription || '',
      excerpt: doc.excerpt || '',
      category: doc.category || '',
      published: doc.published || false,
      publishedAt: doc.publishedAt,
      authorId: doc.authorId,
      views: doc.views || 0,
      seoTitle: doc.seoTitle || '',
      seoCanonical: doc.seoCanonical || null,
      seoRobots: doc.seoRobots || 'index, follow',
      seoOgTitle: doc.seoOgTitle || null,
      seoOgDescription: doc.seoOgDescription || null,
      seoOgImage: doc.seoOgImage || null,
      seoTwitterCard: doc.seoTwitterCard || 'summary_large_image',
      seoStructuredData: doc.seoStructuredData || null,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }
  },

  async findById(id: string) {
    ensureConnection()
    const doc = (await getArticleModel().findById(id).lean().exec()) as any

    if (!doc) return null

    return {
      id: String(doc._id),
      title: doc.title,
      subtitle: doc.subtitle,
      slug: doc.slug,
      content: doc.content,
      tags: doc.tags || [],
      image: doc.image || '',
      metaDescription: doc.metaDescription || '',
      excerpt: doc.excerpt || '',
      category: doc.category || '',
      published: doc.published || false,
      publishedAt: doc.publishedAt,
      authorId: doc.authorId,
      views: doc.views || 0,
      seoTitle: doc.seoTitle || '',
      seoCanonical: doc.seoCanonical || null,
      seoRobots: doc.seoRobots || 'index, follow',
      seoOgTitle: doc.seoOgTitle || null,
      seoOgDescription: doc.seoOgDescription || null,
      seoOgImage: doc.seoOgImage || null,
      seoTwitterCard: doc.seoTwitterCard || 'summary_large_image',
      seoStructuredData: doc.seoStructuredData || null,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }
  },

  async create(dto: ArticleDTO) {
    ensureConnection()
    const doc = await getArticleModel().create({
      title: dto.title,
      subtitle: dto.subtitle || '',
      slug: dto.slug,
      content: dto.content,
      tags: dto.tags || [],
      image: dto.image || '',
      metaDescription: dto.metaDescription || '',
      excerpt: dto.excerpt || '',
      category: dto.category || '',
      published: dto.published || false,
      publishedAt: dto.published ? new Date() : null,
      authorId: dto.authorId,
      views: 0,
      seoTitle: dto.seoTitle || '',
      seoCanonical: dto.seoCanonical || null,
      seoRobots: dto.seoRobots || 'index, follow',
      seoOgTitle: dto.seoOgTitle || null,
      seoOgDescription: dto.seoOgDescription || null,
      seoOgImage: dto.seoOgImage || null,
      seoTwitterCard: dto.seoTwitterCard || 'summary_large_image',
      seoStructuredData: dto.seoStructuredData || null,
    })

    return {
      id: String(doc._id),
      title: doc.title,
      subtitle: doc.subtitle,
      slug: doc.slug,
      content: doc.content,
      tags: doc.tags || [],
      image: doc.image || '',
      metaDescription: doc.metaDescription || '',
      excerpt: doc.excerpt || '',
      category: doc.category || '',
      published: doc.published || false,
      publishedAt: doc.publishedAt,
      authorId: doc.authorId,
      views: doc.views || 0,
      seoTitle: doc.seoTitle || '',
      seoCanonical: doc.seoCanonical || null,
      seoRobots: doc.seoRobots || 'index, follow',
      seoOgTitle: doc.seoOgTitle || null,
      seoOgDescription: doc.seoOgDescription || null,
      seoOgImage: doc.seoOgImage || null,
      seoTwitterCard: doc.seoTwitterCard || 'summary_large_image',
      seoStructuredData: doc.seoStructuredData || null,
    }
  },

  async update(id: string, dto: Partial<ArticleDTO>) {
    ensureConnection()
    const updateData: any = { ...dto }
    
    if (dto.published && !dto.publishedAt) {
      updateData.publishedAt = new Date()
    }

    const doc = (await getArticleModel().findByIdAndUpdate(id, updateData, { new: true }).lean().exec()) as any

    if (!doc || !doc._id) return null

    return {
      id: String(doc._id),
      title: doc.title,
      subtitle: doc.subtitle,
      slug: doc.slug,
      content: doc.content,
      tags: doc.tags || [],
      image: doc.image || '',
      metaDescription: doc.metaDescription || '',
      excerpt: doc.excerpt || '',
      category: doc.category || '',
      published: doc.published || false,
      publishedAt: doc.publishedAt,
      authorId: doc.authorId,
      views: doc.views || 0,
      seoTitle: doc.seoTitle || '',
      seoCanonical: doc.seoCanonical || null,
      seoRobots: doc.seoRobots || 'index, follow',
      seoOgTitle: doc.seoOgTitle || null,
      seoOgDescription: doc.seoOgDescription || null,
      seoOgImage: doc.seoOgImage || null,
      seoTwitterCard: doc.seoTwitterCard || 'summary_large_image',
      seoStructuredData: doc.seoStructuredData || null,
    }
  },

  async list(filters: any = {}, page: number = 1, limit: number = 10) {
    ensureConnection()

    const query: any = {}

    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { subtitle: { $regex: filters.search, $options: 'i' } },
        { content: { $regex: filters.search, $options: 'i' } },
      ]
    }

    if (filters.published !== undefined) {
      query.published = filters.published
    }

    if (filters.authorId) {
      query.authorId = filters.authorId
    }

    const articles = (await getArticleModel()
      .find(query)
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec()) as any[]

    const total = await getArticleModel().countDocuments(query)

    return {
      data: articles
        .filter((doc) => doc && doc._id)
        .map((doc: any) => ({
          id: String(doc._id),
          title: doc.title,
          subtitle: doc.subtitle,
          slug: doc.slug,
          content: doc.content,
          tags: doc.tags || [],
          image: doc.image || '',
          metaDescription: doc.metaDescription || '',
          excerpt: doc.excerpt || '',
          category: doc.category || '',
          published: doc.published || false,
          publishedAt: doc.publishedAt,
          authorId: doc.authorId,
          views: doc.views || 0,
          seoTitle: doc.seoTitle || '',
          seoCanonical: doc.seoCanonical || null,
          seoRobots: doc.seoRobots || 'index, follow',
          seoOgTitle: doc.seoOgTitle || null,
          seoOgDescription: doc.seoOgDescription || null,
          seoOgImage: doc.seoOgImage || null,
          seoTwitterCard: doc.seoTwitterCard || 'summary_large_image',
          seoStructuredData: doc.seoStructuredData || null,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        })),
      total,
      page,
      limit,
    }
  },

  async deleteById(id: string) {
    ensureConnection()
    await getArticleModel().findByIdAndDelete(id)
  },

  async incrementViews(slug: string) {
    ensureConnection()
    await getArticleModel().updateOne({ slug }, { $inc: { views: 1 } })
  },
}

