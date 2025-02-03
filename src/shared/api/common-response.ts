import { z } from 'zod'

export const createCommonResponseSchema = <T extends z.ZodType>(
  schema: T,
  params?: z.RawCreateParams,
) => z.object({ status: z.string(), message: z.string(), data: schema }, params)

export type CommonResponse<T extends z.ZodType> = z.infer<
  ReturnType<typeof createCommonResponseSchema<T>>
>
