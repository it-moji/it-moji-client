import { z } from 'zod'
import type { AttendanceDetailOption, AttendanceOptionKey } from './../model/schema'
import { server } from '@/shared/api'
import { ATTENDANCE_OPTION_ENDPOINT } from './endpoint'

export const deleteAttendanceDetailOption = (
  optionKey: AttendanceOptionKey,
  detailOptionId: AttendanceDetailOption['id'],
) =>
  server.request(ATTENDANCE_OPTION_ENDPOINT.DETAIL(optionKey, detailOptionId), {
    schema: z.any(),
    method: 'DELETE',
  })
