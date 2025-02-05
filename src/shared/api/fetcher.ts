import { revalidateTag } from 'next/cache'
import type { z } from 'zod'
import { type CommonResponse, createCommonResponseSchema } from './common-response'
import { Exception } from './exception'

export interface SearchParams {
  [key: string]: string | string[] | undefined
}

export interface RequestOptions extends RequestInit {
  params?: SearchParams
}

export interface CommonExceptionResponse extends Response {
  message: string
}

export interface ExceptionInterceptor {
  (cause: CommonExceptionResponse): unknown
}

export interface FetcherOptions<T extends z.ZodType> extends RequestOptions {
  schema: T
  onException?: ExceptionInterceptor
}

export class Fetcher {
  private static readonly REVALIDATE_TAG_ALL = 'fetcher-all'

  private endpoint: string
  private timeout: number

  public constructor(options: { endpoint: string; timeout: number }) {
    this.endpoint = options.endpoint
    this.timeout = options.timeout
  }

  public async request<T extends z.ZodType>(
    url: string | URL,
    { schema, onException, method = 'GET', ...options }: FetcherOptions<T>,
  ): Promise<CommonResponse<T>> {
    const response = await this.fetch(url, { method, ...options })

    const schemaType = createCommonResponseSchema(schema)
    const { data } = schemaType.safeParse(await response.json())

    if (!data) {
      throw new Exception('올바르지 않은 응답 형식이에요')
    }

    if (!response.ok) {
      const exception: CommonExceptionResponse = Object.assign(response, data)

      onException?.(exception)

      throw new Exception(exception.message || '')
    }

    return data
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

  public static revalidateAll() {
    revalidateTag(Fetcher.REVALIDATE_TAG_ALL)
  }
}

export const server = new Fetcher({
  endpoint: process.env.NEXT_PUBLIC_SERVER_DOMAIN_ADDRESS!,
  timeout: 5_000,
})
