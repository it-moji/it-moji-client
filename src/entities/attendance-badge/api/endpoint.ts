import type { AttendanceBadge } from '../model'

export const ATTENDANCE_BADGE_ENDPOINT = {
  LIST: '/api/v1/attendance/badges',
  LIST_WITH_CONDITIONS: '/api/v1/attendance/badges/conditions',
  DETAIL: (badgeId: AttendanceBadge['id'] | ':badgeId') =>
    `${ATTENDANCE_BADGE_ENDPOINT.LIST}/${badgeId}` as const,
} as const

export const ATTENDANCE_BADGE_TAG = {
  BADGE_LIST_WITH_CONDITIONS: 'revalidate-badge-list-with-conditions-tag',
} as const
