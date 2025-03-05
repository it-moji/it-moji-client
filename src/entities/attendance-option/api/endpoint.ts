import type { AttendanceDetailOption, AttendanceOptionKey } from '../model'

export const ATTENDANCE_OPTION_ENDPOINT = {
  LIST: '/api/v1/attendance/options',
  DETAIL: (
    id: AttendanceOptionKey | ':optionKey' | ':detailOptionId' | AttendanceDetailOption['id'],
  ) => `${ATTENDANCE_OPTION_ENDPOINT.LIST}/${id}` as const,
} as const

export const ATTENDANCE_OPTION_TAG = {
  LIST: 'attendance-option-list',
  DETAIL: (key: AttendanceOptionKey) => `attendance-option-detail-${key}`,
} as const
