import { z } from 'zod'
import { type ExceptionInterceptor, server } from '@/shared/api'
import { AttendanceBadgeOptionSchema, AttendanceBadgeSchema } from '../model'
import { ATTENDANCE_BADGE_ENDPOINT } from './endpoint'

export const PostAttendanceBadgeBodySchema = AttendanceBadgeSchema.omit({ id: true }).extend({
  options: z.array(z.array(AttendanceBadgeOptionSchema)),
})

export type CreateAttendanceBadgeBody = z.infer<typeof PostAttendanceBadgeBodySchema>

export const createAttendanceBadge = (
  body: CreateAttendanceBadgeBody,
  onException: ExceptionInterceptor,
) =>
  server.request(ATTENDANCE_BADGE_ENDPOINT.LIST, {
    schema: z.any(),
    method: 'POST',
    body: JSON.stringify(body),
    onException,
  })
