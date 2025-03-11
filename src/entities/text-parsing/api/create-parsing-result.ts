import { z } from 'zod'
import { server } from '@/shared/api'
import { ParsingResultSchema } from './../model/schema'
import { TEXT_PARSING_ENDPOINT } from './endpoint'

export const PostParsingResultBodySchema = z.array(
  ParsingResultSchema.omit({ attendanceStatistic: true }),
)

export type PostParsingResult = z.infer<typeof PostParsingResultBodySchema>

export const createParsingResult = (teamId: number, body: PostParsingResult) =>
  server.request(TEXT_PARSING_ENDPOINT.RESULT(teamId), {
    schema: z.any(),
    body: JSON.stringify(body),
    method: 'POST',
  })
