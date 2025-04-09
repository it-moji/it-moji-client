import { z } from 'zod'
import { type CommonResponse, server } from '@/shared/api'
import { ATTENDANCE_BADGE_ENDPOINT, ATTENDANCE_BADGE_TAG } from './endpoint'
import { GetAttendanceBadgeDetailResponseSchema } from './get-badge-detail'

export const GetAttendanceBadgeListWithConditionsResponseSchema = z.array(
  GetAttendanceBadgeDetailResponseSchema,
)

export type GetAttendanceBadgeListWithConditionsResponseData = z.infer<
  typeof GetAttendanceBadgeListWithConditionsResponseSchema
>

export type GetAttendanceBadgeListWithConditionsResponse = CommonResponse<
  typeof GetAttendanceBadgeListWithConditionsResponseSchema
>

export const getAttendanceBadgeListWithConditions = () =>
  server.request(ATTENDANCE_BADGE_ENDPOINT.LIST_WITH_CONDITIONS, {
    schema: GetAttendanceBadgeListWithConditionsResponseSchema,
    next: {
      tags: [ATTENDANCE_BADGE_TAG.BADGE_LIST_WITH_CONDITIONS],
    },
  })
