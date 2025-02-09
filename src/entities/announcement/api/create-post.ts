import { z } from 'zod'
import type { ExceptionInterceptor } from '@/shared/api'
import { server } from '@/shared/api'
import type { PostBody } from '../model'
import { POST_ENDPOINT } from './endpoint'

export const createPost = (body: PostBody, onException?: ExceptionInterceptor) =>
  server.request(POST_ENDPOINT.LIST, {
    schema: z.any(),
    method: 'POST',
    body: JSON.stringify(body),
    onException,
  })
