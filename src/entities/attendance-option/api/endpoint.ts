import type { AttendanceDetailOption, AttendanceOptionKey } from '../model'

export const ATTENDANCE_OPTION_ENDPOINT = {
  LIST: '/api/v1/attendance/options',
  PRIMARY: (optionKey: AttendanceOptionKey | ':optionKey') =>
    `/${ATTENDANCE_OPTION_ENDPOINT.LIST}/${optionKey}` as const,
  DETAIL: (
    optionKey: AttendanceOptionKey | ':optionKey',
    detailOptionId: AttendanceDetailOption['id'] | ':detailOptionId',
  ) => `${ATTENDANCE_OPTION_ENDPOINT.PRIMARY(optionKey)}/${detailOptionId}` as const,
} as const

export const ATTENDANCE_OPTION_TAG = {
  LIST: 'attendance-option-list',
  PRIMARY: (key: AttendanceOptionKey) => `attendance-option-detail-${key}`,
} as const
