import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/mock-test`, () => {
    return HttpResponse.json({ message: 'mock success!!' })
  }),
]
