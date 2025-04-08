import { z } from 'zod'
import { type CommonResponse, server } from '@/shared/api'
import { AttendanceBadgeSchema } from '../model'
import { ATTENDANCE_BADGE_ENDPOINT } from './endpoint'

export const GetAttendanceBadgeListResponseSchema = z.array(AttendanceBadgeSchema)

export type GetAttendanceBadgeListResponse = CommonResponse<
  typeof GetAttendanceBadgeListResponseSchema
>

export const getAttendanceBadgeList = () =>
  server.request(ATTENDANCE_BADGE_ENDPOINT.LIST, {
    schema: GetAttendanceBadgeListResponseSchema,
  })
