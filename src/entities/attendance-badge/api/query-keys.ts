import type { AttendanceBadge } from '../model'

export const attendanceBadgeQueryKeys = {
  all: ['attendance-badge-all'] as const,
  badgeList: () => [...attendanceBadgeQueryKeys.all, 'attendance-badge-list'] as const,
  badgeListWithConditions: () =>
    [...attendanceBadgeQueryKeys.all, 'attendance-badge-list-with-conditions'] as const,
  badgeDetailAll: () => [...attendanceBadgeQueryKeys.all, 'attendance-badge-detail'] as const,
  badgeDetail: (id: AttendanceBadge['id']) =>
    [...attendanceBadgeQueryKeys.badgeDetailAll(), id] as const,
} as const
