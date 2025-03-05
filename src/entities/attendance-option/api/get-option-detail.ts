import { z } from 'zod'
import type { CommonResponse } from '@/shared/api'
import { server } from '@/shared/api'
import type { AttendanceOptionKey } from '../model'
import { AttendanceDetailOptionSchema } from '../model'
import { ATTENDANCE_OPTION_ENDPOINT, ATTENDANCE_OPTION_TAG } from './endpoint'

export const GetAttendanceOptionDetailSchema = z.array(AttendanceDetailOptionSchema)

export type GetAttendanceOptions = z.infer<typeof GetAttendanceOptionDetailSchema>

export type GetAttendanceOptionsResponse = CommonResponse<typeof GetAttendanceOptionDetailSchema>

export const getAttendanceOptionDetail = (optionKey: AttendanceOptionKey) =>
  server.request(ATTENDANCE_OPTION_ENDPOINT.PRIMARY(optionKey), {
    schema: GetAttendanceOptionDetailSchema,
    next: {
      tags: [ATTENDANCE_OPTION_TAG.PRIMARY(optionKey)],
    },
  })
