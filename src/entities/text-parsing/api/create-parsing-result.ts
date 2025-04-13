import { z } from 'zod'
import { server } from '@/shared/api'
import { ParsingResultSchema } from './../model/schema'
import { TEXT_PARSING_ENDPOINT } from './endpoint'

export const PostTextParsingResultBodySchema = z.array(
  ParsingResultSchema.omit({ attendanceStatistic: true }),
)

export type PostTextParsingResult = z.infer<typeof PostTextParsingResultBodySchema>

// TODO: 추후 스터디원 관리기능 추가될 시 엔티티 분리
export const createTextParsingResult = (teamId: number, body: PostTextParsingResult) =>
  server.request(TEXT_PARSING_ENDPOINT.RESULT(teamId), {
    schema: z.any(),
    body: JSON.stringify(body),
    method: 'POST',
  })
