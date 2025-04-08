import { z } from 'zod'
import { server } from '@/shared/api'
import { type AttendanceBadge } from '../model'
import { ATTENDANCE_BADGE_ENDPOINT } from './endpoint'

export const deleteAttendanceBadge = (id: AttendanceBadge['id']) =>
  server.request(ATTENDANCE_BADGE_ENDPOINT.DETAIL(id), {
    schema: z.any(),
    method: 'DELETE',
  })
