import type { ExceptionInterceptor } from '@/shared/api'
import { server } from '@/shared/api'
import { PostDetailSchema } from '../model'
import { POST_ENDPOINT } from './endpoint'

export const getPostDetail = (id: number, onException?: ExceptionInterceptor) =>
  server.request(POST_ENDPOINT.DETAIL(id), {
    schema: PostDetailSchema,
    onException,
  })
