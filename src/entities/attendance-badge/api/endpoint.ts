import type { AttendanceBadge } from '../model'

export const ATTENDANCE_BADGE_ENDPOINT = {
  LIST: '/api/v1/attendance/badges',
  LIST_WITH_CONDITIONS: '/api/v1/attendance/badges/conditions',
  DETAIL: (badgeId: AttendanceBadge['id'] | ':badgeId') =>
    `${ATTENDANCE_BADGE_ENDPOINT.LIST}/${badgeId}` as const,
} as const
