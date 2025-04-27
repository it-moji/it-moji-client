import { z } from 'zod'
import type { CommonResponse, SearchParams } from '@/shared/api'
import { createPaginationResponseSchema, createPaginationParamsSchema, server } from '@/shared/api'
import { PostCategorySchema, PostItemSchema } from '../model'
import { POST_ENDPOINT } from './endpoint'

export const GetPostListResponseSchema = createPaginationResponseSchema({
  content: z.array(PostItemSchema),
  category: z.union([z.null(), PostCategorySchema]),
})

export const GetPostListParamsSchema = createPaginationParamsSchema(['category'])

export type GetPostListParamsKey = z.infer<typeof GetPostListParamsSchema>

export type GetPostListResponse = CommonResponse<typeof GetPostListResponseSchema>

export const getPostList = (params: SearchParams) =>
  server.request(POST_ENDPOINT.LIST, {
    schema: GetPostListResponseSchema,
    params,
  })
