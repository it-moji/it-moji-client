import { z } from 'zod'
import type { CommonResponse } from '@/shared/api'
import { server } from '@/shared/api'
import { AttendanceOptionKeySchema, AttendanceOptionSchema } from '../model'
import { ATTENDANCE_OPTION_ENDPOINT, ATTENDANCE_OPTION_TAG } from './endpoint'

export const GetAttendanceOptionsAllSchema = z.record(
  AttendanceOptionKeySchema,
  AttendanceOptionSchema,
)

export type GetAttendanceOptionsAll = z.infer<typeof GetAttendanceOptionsAllSchema>

export type GetAttendanceOptionsAllResponse = CommonResponse<typeof GetAttendanceOptionsAllSchema>

export const getAttendanceOptionsAll = () =>
  server.request(ATTENDANCE_OPTION_ENDPOINT.LIST, {
    schema: GetAttendanceOptionsAllSchema,
    next: {
      tags: [ATTENDANCE_OPTION_TAG.LIST],
    },
  })
