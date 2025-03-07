import { z } from 'zod'
import { type CommonResponse, server } from '@/shared/api'
import { type AttendanceBadge, AttendanceBadgeOptionSchema, AttendanceBadgeSchema } from '../model'
import { ATTENDANCE_BADGE_ENDPOINT, ATTENDANCE_BADGE_TAG } from './endpoint'

export const GetAttendanceBadgeDetailResponseSchema = AttendanceBadgeSchema.extend({
  options: z.array(z.array(AttendanceBadgeOptionSchema)),
})

export type GetAttendanceBadgeDetailResponse = CommonResponse<
  typeof GetAttendanceBadgeDetailResponseSchema
>

export const getBadgeDetail = (id: AttendanceBadge['id']) =>
  server.request(ATTENDANCE_BADGE_ENDPOINT.DETAIL(id), {
    schema: GetAttendanceBadgeDetailResponseSchema,
    next: {
      tags: [
        ATTENDANCE_BADGE_TAG.ALL,
        ATTENDANCE_BADGE_TAG.DETAIL_ALL,
        ATTENDANCE_BADGE_TAG.DETAIL(id),
      ],
    },
  })
