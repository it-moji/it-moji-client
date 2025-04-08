import { z } from 'zod'
import { server } from '@/shared/api'
import {
  type AttendanceBadge,
  AttendanceBadgeConditionSchema,
  AttendanceBadgeSchema,
} from '../model'
import { ATTENDANCE_BADGE_ENDPOINT } from './endpoint'

export const PutAttendanceBadgeBodySchema = AttendanceBadgeSchema.omit({
  id: true,
}).extend({
  conditionGroups: z.array(z.array(AttendanceBadgeConditionSchema.omit({ id: true }))),
})

export type PutAttendanceBadgeBody = z.infer<typeof PutAttendanceBadgeBodySchema>

export interface ModifyAttendanceBadgeParams {
  id: AttendanceBadge['id']
  body: PutAttendanceBadgeBody
}

export const modifyAttendanceBadge = ({ id, body }: ModifyAttendanceBadgeParams) =>
  server.request(ATTENDANCE_BADGE_ENDPOINT.DETAIL(id), {
    schema: z.any(),
    method: 'PUT',
    body: JSON.stringify(body),
  })
