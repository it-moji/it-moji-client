import { z } from 'zod'
import { type CommonResponse, server } from '@/shared/api'
import {
  type AttendanceBadge,
  AttendanceBadgeConditionGroupSchema,
  AttendanceBadgeSchema,
} from '../model'
import { ATTENDANCE_BADGE_ENDPOINT } from './endpoint'

export const GetAttendanceBadgeDetailResponseSchema = AttendanceBadgeSchema.extend({
  conditionGroups: z.array(AttendanceBadgeConditionGroupSchema),
})

export type GetAttendanceBadgeDetailResponse = CommonResponse<
  typeof GetAttendanceBadgeDetailResponseSchema
>

export const getAttendanceBadgeDetail = (id: AttendanceBadge['id']) =>
  server.request(ATTENDANCE_BADGE_ENDPOINT.DETAIL(id), {
    schema: GetAttendanceBadgeDetailResponseSchema,
  })
