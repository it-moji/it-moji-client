import { z } from 'zod'
import { server } from '@/shared/api'
import { POST_ENDPOINT } from './endpoint'

export const deletePost = (id: number) =>
  server.request(POST_ENDPOINT.DETAIL(id), {
    schema: z.any(),
    method: 'DELETE',
  })
