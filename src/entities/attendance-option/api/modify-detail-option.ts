import { z } from 'zod'
import { server } from '@/shared/api'
import { ATTENDANCE_OPTION_ENDPOINT } from './endpoint'

export const PutAttendanceOptionBodySchema = z.object({
  name: z.string(),
})

export type PutAttendanceOptionsBody = z.infer<typeof PutAttendanceOptionBodySchema>

export const modifyAttendanceDetailOption = (id: number, body: PutAttendanceOptionsBody) =>
  server.request(ATTENDANCE_OPTION_ENDPOINT.DETAIL(id), {
    schema: z.any(),
    body: JSON.stringify(body),
    method: 'PUT',
  })
