import { z } from 'zod'
import type { ExceptionInterceptor } from '@/shared/api'
import { server } from '@/shared/api'
import { PostCategorySchema } from '../model'
import { POST_ENDPOINT } from './endpoint'

export const CreatePostBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  postCategory: PostCategorySchema,
  isPinned: z.boolean(),
})

export type CreatePostBody = z.infer<typeof CreatePostBodySchema>

export const createPost = (body: CreatePostBody, onException?: ExceptionInterceptor) =>
  server.request(POST_ENDPOINT.LIST, {
    schema: z.any(),
    method: 'POST',
    body: JSON.stringify(body),
    onException,
  })
