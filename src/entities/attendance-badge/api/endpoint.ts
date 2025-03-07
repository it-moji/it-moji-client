import type { AttendanceBadge } from '../model'

export const ATTENDANCE_BADGE_ENDPOINT = {
  LIST: '/api/v1/attendance/badges',
  DETAIL: (badgeId: AttendanceBadge['id'] | ':badgeId') =>
    `${ATTENDANCE_BADGE_ENDPOINT.LIST}/${badgeId}` as const,
} as const

export const ATTENDANCE_BADGE_TAG = {
  ALL: 'attendance-badge-all',
  LIST: 'attendance-badge-list',
  DETAIL_ALL: 'attendance-badge-detail',
  DETAIL: (badgeId: AttendanceBadge['id']) => `attendance-badge-detail-${badgeId}`,
} as const
