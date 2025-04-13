import { z } from 'zod'
import { type CommonResponse, server } from '@/shared/api'
import { PostItemSchema } from '../model'
import { POST_ENDPOINT, POST_TAG } from './endpoint'

export const GetPinnedPostListSchema = z.array(PostItemSchema)

export type GetPinnedPostListResponse = CommonResponse<typeof GetPinnedPostListSchema>

export const getPinnedPostList = () =>
  server.request(POST_ENDPOINT.PINNED_LIST, {
    schema: GetPinnedPostListSchema,
    next: {
      tags: [POST_TAG.ALL, POST_TAG.PINNED_LIST],
    },
  })
