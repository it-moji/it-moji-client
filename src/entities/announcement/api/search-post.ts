import { z } from 'zod'
import type { CommonResponse, SearchParams } from '@/shared/api'
import { createPaginationResponseSchema, createPaginationParamsSchema, server } from '@/shared/api'
import { PostItemSchema } from '../model'
import { POST_ENDPOINT } from './endpoint'

export const SearchPostParamsSchema = createPaginationParamsSchema(['q', 'type'])

export const SearchPostTypeSchema = z.enum(['TITLE', 'CONTENT', 'TITLE_CONTENT'])

export type SearchPostType = z.infer<typeof SearchPostTypeSchema>

export type SearchPostParamsKey = z.infer<typeof SearchPostParamsSchema>

export const SearchPostResponseSchema = createPaginationResponseSchema({
  content: z.array(PostItemSchema),
  type: z.union([SearchPostTypeSchema, z.null()]),
})

export type SearchPostResponse = CommonResponse<typeof SearchPostResponseSchema>

export interface SearchPostParams {
  query: string
  type: SearchPostType
  params: SearchParams
}

export const searchPost = async ({ query, type, params }: SearchPostParams) =>
  await server.request(POST_ENDPOINT.SEARCH, {
    schema: SearchPostResponseSchema,
    params: {
      ...params,
      [SearchPostParamsSchema.Enum.q]: query,
      [SearchPostParamsSchema.Enum.type]: type,
    },
  })
