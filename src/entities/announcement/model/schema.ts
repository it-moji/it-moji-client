import { z } from 'zod'

export const PostCategorySchema = z.enum(['NOTICE', 'UPDATE', 'EVENT', 'MAINTENANCE'])

export type PostCategory = z.infer<typeof PostCategorySchema>

export const PostItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  postCategory: PostCategorySchema,
  createdAt: z.string().datetime(),
  modifiedAt: z.string().datetime(),
  viewCount: z.number(),
})

export type PostItem = z.infer<typeof PostItemSchema>

export const PostItemSummarySchema = PostItemSchema.pick({ id: true, title: true, createdAt: true })

export type PostItemSummary = z.infer<typeof PostItemSummarySchema>

export const PostDetailSchema = PostItemSchema.extend({
  isPinned: z.boolean(),
  related: z.object({
    prev: z.union([z.null(), PostItemSummarySchema]),
    next: z.union([z.null(), PostItemSummarySchema]),
  }),
})

export type PostDetail = z.infer<typeof PostDetailSchema>

export const PostBodySchema = PostDetailSchema.pick({
  title: true,
  content: true,
  postCategory: true,
  isPinned: true,
})

export type PostBody = z.infer<typeof PostBodySchema>
