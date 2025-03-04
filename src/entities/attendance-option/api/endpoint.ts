import type { AttendanceDetailOption, AttendanceOptionKey } from '../model'

export const ATTENDANCE_OPTION_ENDPOINT = {
  LIST: '/api/v1/attendance/options',
  DETAIL: (id: AttendanceOptionKey | AttendanceDetailOption['id'] | string) =>
    `${ATTENDANCE_OPTION_ENDPOINT.LIST}/${id}` as const,
} as const

export const ATTENDANCE_TAG = {
  ALL: 'attendance-all',
  LIST: 'post-list',
  PINNED_LIST: 'pinned-post-list',
  SEARCH: 'post-search',
  DETAIL: (id: number) => `post-detail-${id}`,
} as const
