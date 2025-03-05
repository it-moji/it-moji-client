import { z } from 'zod'
import { server } from '@/shared/api'
import type { AttendanceOptionKey } from '../model'
import { ATTENDANCE_OPTION_ENDPOINT } from './endpoint'

export const PostAttendanceOptionBodySchema = z.object({
  name: z.string(),
})

export type PostAttendanceOptionsBody = z.infer<typeof PostAttendanceOptionBodySchema>

export const createAttendanceDetailOption = (
  optionKey: AttendanceOptionKey,
  body: PostAttendanceOptionsBody,
) =>
  server.request(ATTENDANCE_OPTION_ENDPOINT.PRIMARY(optionKey), {
    schema: z.any(),
    body: JSON.stringify(body),
    method: 'POST',
  })
