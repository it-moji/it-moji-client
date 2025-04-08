import { z } from 'zod'
import { server } from '@/shared/api'
import { AttendanceBadgeSchema, AttendanceBadgeConditionSchema } from '../model'
import { ATTENDANCE_BADGE_ENDPOINT } from './endpoint'

export const PostAttendanceBadgeBodySchema = AttendanceBadgeSchema.omit({
  id: true,
}).extend({
  conditionGroups: z.array(z.array(AttendanceBadgeConditionSchema.omit({ id: true }))),
})

export type PostAttendanceBadgeBody = z.infer<typeof PostAttendanceBadgeBodySchema>

export const createAttendanceBadge = (body: PostAttendanceBadgeBody) =>
  server.request(ATTENDANCE_BADGE_ENDPOINT.LIST, {
    schema: z.any(),
    method: 'POST',
    body: JSON.stringify(body),
  })
