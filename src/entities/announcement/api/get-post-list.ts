import { z } from 'zod'
import type { CommonResponse, SearchParams } from '@/shared/api'
import { createPaginationResponseSchema, createPaginationParamsSchema, server } from '@/shared/api'
import { PostCategorySchema, PostItemSchema } from '../model'
import { POST_ENDPOINT } from './endpoint'

export const PostListResponseSchema = createPaginationResponseSchema({
  content: z.array(PostItemSchema),
  category: z.union([PostCategorySchema, z.null()]),
})

export const PostListParamsSchema = createPaginationParamsSchema(['category'])

export type PostListParams = z.infer<typeof PostListParamsSchema>

export type PostListResponse = CommonResponse<typeof PostListResponseSchema>

export const getPostList = async (params: SearchParams) =>
  await server.request(POST_ENDPOINT.LIST, {
    schema: PostListResponseSchema,
    params,
  })
