import { z } from 'zod'
import { server } from '@/shared/api'
import { ATTENDANCE_OPTION_ENDPOINT } from './endpoint'

export const deleteAttendanceDetailOption = (id: number) =>
  server.request(ATTENDANCE_OPTION_ENDPOINT.DETAIL(id), {
    schema: z.any(),
    method: 'DELETE',
  })
