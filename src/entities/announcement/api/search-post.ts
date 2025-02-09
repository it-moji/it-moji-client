import { z } from 'zod'
import type { CommonResponse, SearchParams } from '@/shared/api'
import { createPaginationResponseSchema, createPaginationParamsSchema, server } from '@/shared/api'
import { PostItemSchema } from '../model'
import { POST_ENDPOINT, POST_TAG } from './endpoint'

export const SearchPostParamsSchema = createPaginationParamsSchema(['query', 'type'])

export const SearchPostTypeSchema = z.enum(['TITLE', 'CONTENT', 'TITLE_CONTENT'])

export type SearchPostType = z.infer<typeof SearchPostTypeSchema>

export type SearchPostParamsKey = z.infer<typeof SearchPostParamsSchema>

export const SearchPostResponseSchema = createPaginationResponseSchema({
  content: z.array(PostItemSchema),
})

export type SearchPostResponse = CommonResponse<typeof SearchPostResponseSchema>

export interface SearchPostParams {
  query: string
  type: SearchPostType
  params: SearchParams
}

export const searchPost = ({ query, type, params }: SearchPostParams) =>
  server.request(POST_ENDPOINT.SEARCH, {
    schema: SearchPostResponseSchema,
    params: {
      ...params,
      [SearchPostParamsSchema.Enum.query]: query,
      [SearchPostParamsSchema.Enum.type]: type,
    },
    next: {
      tags: [POST_TAG.ALL, POST_TAG.SEARCH],
    },
  })
