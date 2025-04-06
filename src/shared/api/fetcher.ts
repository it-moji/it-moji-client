import type { z } from 'zod'
import { type CommonResponse, createCommonResponseSchema } from './common-response'
import { Exception } from './exception'

export interface SearchParams {
  [key: string]: string | string[] | undefined
}

export interface RequestOptions extends RequestInit {
  params?: SearchParams
}

export interface ExceptionInterceptor {
  (cause: Response, data: CommonResponse<z.ZodUndefined>): unknown
}

export interface FetcherOptions<T extends z.ZodType> extends RequestOptions {
  schema: T
  onException?: ExceptionInterceptor
}

export class Fetcher {
  private static readonly REVALIDATE_TAG_ALL = 'fetcher-all'

  private endpoint: string
  private prefix: string
  private timeout: number

  public constructor(options: { endpoint: string; prefix?: string; timeout: number }) {
    this.endpoint = options.endpoint
    this.prefix = options.prefix || ''
    this.timeout = options.timeout
  }

  public async request<T extends z.ZodType>(
    url: string,
    { schema, onException, method = 'GET', ...options }: FetcherOptions<T>,
  ): Promise<CommonResponse<T>> {
    const response = await this.fetch(`${this.prefix}${url}`, { method, ...options })
    const data = await response.json()

    if (!response.ok) {
      onException?.(response, data)

      throw new Exception(data.message || '')
    }

    const schemaType = createCommonResponseSchema(schema)
    const valid = schemaType.safeParse(data)

    if (!valid.data) {
      throw new Exception('올바르지 않은 응답 형식이에요')
    }

    return valid.data
  }

  private async fetch(
    url: string | URL,
    { params, signal, next, ...options }: RequestOptions = {},
  ) {
    const targetURL = new URL(url, this.endpoint)
    const controller = new AbortController()

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          targetURL.searchParams.set(key, Array.isArray(value) ? value[value.length - 1] : value)
        }
      })
    }

    setTimeout(() => {
      controller.abort(Exception.getMessage('요청 시간이 초과되었어요'))
    }, this.timeout)

    return await fetch(targetURL, {
      ...options,
      signal: signal ? AbortSignal.any([signal, controller.signal]) : controller.signal,
      next: {
        revalidate: next?.revalidate,
        tags: [Fetcher.REVALIDATE_TAG_ALL, ...(next?.tags ?? [])],
      },
    })
  }

  public static revalidateAll(revalidateTag: (tag: string) => void) {
    revalidateTag(Fetcher.REVALIDATE_TAG_ALL)
  }
}

export const server = new Fetcher({
  endpoint: process.env.NEXT_PUBLIC_DOMAIN_ADDRESS!,
  timeout: 5_000,
  prefix: '/server',
})
