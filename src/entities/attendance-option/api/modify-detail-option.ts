import { z } from 'zod'
import { server } from '@/shared/api'
import { AttendanceDetailOptionSchema, AttendanceOptionKeySchema } from '../model'
import { ATTENDANCE_OPTION_ENDPOINT } from './endpoint'

export const PutAttendanceOptionBodySchema = z.object({
  name: z.string(),
})

export type PutAttendanceOptionsBody = z.infer<typeof PutAttendanceOptionBodySchema>

export const PutAttendanceOptionParamsSchema = z.object({
  optionKey: AttendanceOptionKeySchema,
  detailOptionId: AttendanceDetailOptionSchema.shape.id,
  body: PutAttendanceOptionBodySchema,
})

export type PutAttendanceOptionParams = z.infer<typeof PutAttendanceOptionParamsSchema>

export const modifyAttendanceDetailOption = ({
  optionKey,
  detailOptionId,
  body,
}: PutAttendanceOptionParams) =>
  server.request(ATTENDANCE_OPTION_ENDPOINT.DETAIL(optionKey, detailOptionId), {
    schema: z.any(),
    body: JSON.stringify(body),
    method: 'PUT',
  })
