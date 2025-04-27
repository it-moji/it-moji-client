import { z } from 'zod'
import { type ExceptionInterceptor, server } from '@/shared/api'
import type { PostBody } from '../model'
import { POST_ENDPOINT } from './endpoint'

export interface ModifyPostParams {
  id: number
  body: PostBody
  onException?: ExceptionInterceptor
}

export const modifyPost = ({ id, body, onException }: ModifyPostParams) =>
  server.request(POST_ENDPOINT.DETAIL(id), {
    schema: z.any(),
    method: 'PATCH',
    body: JSON.stringify(body),
    onException,
  })
