import { type HttpResponseInit, HttpResponse, http } from 'msw'
import type { CommonResponse } from './common-response'
import type { z } from 'zod'

export const MOCK_COMMON_RESPONSE = {
  SUCCESS: { message: '성공', status: 'OK' } satisfies CommonResponse<z.ZodUndefined>,
  FAILED: { message: '실패', status: 'NOT OK' } satisfies CommonResponse<z.ZodUndefined>,
}

export interface CreateMockHandlerParams<T> {
  endpoint: string
  handler: (
    params: Parameters<Parameters<typeof http.all>[1]>[0],
  ) => Promise<{ data: T } & HttpResponseInit>
  method?: keyof typeof http
  delay?: number
}

export const createMockHandler = <T>({
  endpoint,
  handler,
  method = 'get',
  delay,
}: CreateMockHandlerParams<T>) =>
  http[method](`${process.env.NEXT_PUBLIC_SERVER_DOMAIN_ADDRESS}${endpoint}`, async (params) => {
    if (delay) {
      await new Promise((resolve) => setTimeout(resolve, delay))
    }

    const { data, ...init } = await handler(params)
    const key = (init.status ?? 200) >= 400 ? 'FAILED' : 'SUCCESS'

    console.log(`✅ ${params.request.method} - ${params.request.url}`)

    return HttpResponse.json({ ...MOCK_COMMON_RESPONSE[key], data }, init)
  })
