import type { z } from 'zod'
import type { CommonResponse } from '@/shared/api'
import { server } from '@/shared/api'
import { ParsingOptionsSchema } from '../model/schema'
import { TEXT_PARSING_ENDPOINT } from './endpoint'

export const GetParsingOptionsSchema = ParsingOptionsSchema

export type GetParsingOptions = z.infer<typeof GetParsingOptionsSchema>

export type GetParsingOptionsResponse = CommonResponse<typeof GetParsingOptionsSchema>

export const getParsingOptions = () =>
  server.request(TEXT_PARSING_ENDPOINT.PARSING_OPTIONS, {
    schema: GetParsingOptionsSchema,
  })
