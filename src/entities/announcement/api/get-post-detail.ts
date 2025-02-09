import type { ExceptionInterceptor } from '@/shared/api'
import { server } from '@/shared/api'
import { PostDetailSchema } from '../model'
import { POST_ENDPOINT, POST_TAG } from './endpoint'

export const getPostDetail = (id: number, onException?: ExceptionInterceptor) =>
  server.request(POST_ENDPOINT.DETAIL(id), {
    schema: PostDetailSchema,
    next: {
      tags: [POST_TAG.ALL],
    },
    onException,
  })
