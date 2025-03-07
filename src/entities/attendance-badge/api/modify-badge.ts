import { z } from 'zod'
import { type ExceptionInterceptor, server } from '@/shared/api'
import { type AttendanceBadge } from '../model'
import { type CreateAttendanceBadgeBody } from './create-badge'
import { ATTENDANCE_BADGE_ENDPOINT } from './endpoint'

export interface ModifyAttendanceBadgeParams {
  id: AttendanceBadge['id']
  body: CreateAttendanceBadgeBody
  onException: ExceptionInterceptor
}

export const modifyAttendanceBadge = ({ id, body, onException }: ModifyAttendanceBadgeParams) =>
  server.request(ATTENDANCE_BADGE_ENDPOINT.DETAIL(id), {
    schema: z.any(),
    method: 'PUT',
    body: JSON.stringify(body),
    onException,
  })
