import { z } from 'zod'

export const DEFAULT_PAGE = 1

export const DEFAULT_PAGE_SIZE = 10

export const createPaginationParamsSchema = <K extends string>(keys: K[] = []) =>
  z.enum(['page', 'size', ...keys])

export const createPaginationResponseSchema = <T extends Record<string, z.ZodType>>(schema: T) =>
  z.object({
    totalElements: z.number(),
    totalPages: z.number(),
    first: z.boolean(),
    last: z.boolean(),
    size: z.number(),
    number: z.number(),
    ...schema,
  })

export type PaginationResponse<T extends Record<string, z.ZodType>> = z.infer<
  ReturnType<typeof createPaginationResponseSchema<T>>
>
