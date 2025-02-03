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
