import { z } from 'zod'
import type { AttendanceOptionKey } from './../model/schema'
import { server } from '@/shared/api'
import { ATTENDANCE_OPTION_ENDPOINT } from './endpoint'

export const deleteAttendanceDetailOption = (
  optionKey: AttendanceOptionKey,
  detailOptionId: number,
) =>
  server.request(ATTENDANCE_OPTION_ENDPOINT.DETAIL(optionKey, detailOptionId), {
    schema: z.any(),
    method: 'DELETE',
  })
