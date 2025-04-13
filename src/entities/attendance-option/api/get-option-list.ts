import { z } from 'zod'
import type { CommonResponse } from '@/shared/api'
import { server } from '@/shared/api'
import type { AttendanceOptionKey } from '../model'
import { AttendanceOptionKeySchema, AttendanceOptionSchema } from '../model'
import { ATTENDANCE_OPTION_ENDPOINT } from './endpoint'

export const GetAttendanceOptionsAllResponseSchema = z.object(
  Object.fromEntries(
    AttendanceOptionKeySchema.options.map((key) => [key, AttendanceOptionSchema]),
  ) as Record<AttendanceOptionKey, typeof AttendanceOptionSchema>,
)

export type GetAttendanceOptionsAllResponseData = z.infer<
  typeof GetAttendanceOptionsAllResponseSchema
>

export type GetAttendanceOptionsAllResponse = CommonResponse<
  typeof GetAttendanceOptionsAllResponseSchema
>

export const getAttendanceOptionsAll = () =>
  server.request(ATTENDANCE_OPTION_ENDPOINT.LIST, {
    schema: GetAttendanceOptionsAllResponseSchema,
  })
