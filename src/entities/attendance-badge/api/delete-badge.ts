import { z } from 'zod'
import { type ExceptionInterceptor, server } from '@/shared/api'
import { type AttendanceBadge } from '../model'
import { ATTENDANCE_BADGE_ENDPOINT } from './endpoint'

export const deleteBadge = (id: AttendanceBadge['id'], onException: ExceptionInterceptor) =>
  server.request(ATTENDANCE_BADGE_ENDPOINT.DETAIL(id), {
    schema: z.any(),
    method: 'DELETE',
    onException,
  })
