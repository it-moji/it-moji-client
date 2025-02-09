import { z } from 'zod'
import type { CommonResponse, SearchParams } from '@/shared/api'
import { createPaginationResponseSchema, createPaginationParamsSchema, server } from '@/shared/api'
import { PostCategorySchema, PostItemSchema } from '../model'
import { POST_ENDPOINT, POST_TAG } from './endpoint'

export const GetPostListResponseSchema = createPaginationResponseSchema({
  content: z.array(PostItemSchema),
  category: z.union([PostCategorySchema, z.null()]),
})

export const GetPostListParamsSchema = createPaginationParamsSchema(['category'])

export type GetPostListParamsKey = z.infer<typeof GetPostListParamsSchema>

export type GetPostListResponse = CommonResponse<typeof GetPostListResponseSchema>

export const getPostList = (params: SearchParams) =>
  server.request(POST_ENDPOINT.LIST, {
    schema: GetPostListResponseSchema,
    params,
    next: {
      tags: [POST_TAG.ALL, POST_TAG.LIST],
    },
  })
