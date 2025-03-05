import { z } from 'zod'
import { server } from '@/shared/api'
import { AttendanceDetailOptionSchema, type AttendanceOptionKey } from '../model'
import { ATTENDANCE_OPTION_ENDPOINT } from './endpoint'

export const PutAttendanceOptionBodySchema = z.array(AttendanceDetailOptionSchema)

export type PutAttendanceOptionsBody = z.infer<typeof PutAttendanceOptionBodySchema>

export const modifyAttendanceDetailOption = (
  optionKey: AttendanceOptionKey,
  body: PutAttendanceOptionsBody,
) =>
  server.request(ATTENDANCE_OPTION_ENDPOINT.DETAIL(optionKey), {
    schema: z.any(),
    body: JSON.stringify(body),
    method: 'PUT',
  })
