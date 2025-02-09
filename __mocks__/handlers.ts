import { http, HttpResponse } from 'msw'
import { postHandlers } from '@/entities/announcement'

export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/mock-test`, () => {
    return HttpResponse.json({ message: 'mock success!!' })
  }),
  ...postHandlers,
]
