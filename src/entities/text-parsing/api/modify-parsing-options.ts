import { z } from 'zod'
import { server } from '@/shared/api'
import { ParsingOptionsSchema } from '../model/schema'
import { TEXT_PARSING_ENDPOINT } from './endpoint'

export const PutParsingOptionsBodySchema = ParsingOptionsSchema

export type PutParsingOptionsBody = z.infer<typeof PutParsingOptionsBodySchema>

export const modifyTextParsingOptions = (body: PutParsingOptionsBody) =>
  server.request(TEXT_PARSING_ENDPOINT.PARSING_OPTIONS, {
    schema: z.any(),
    body: JSON.stringify(body),
    method: 'PUT',
  })
