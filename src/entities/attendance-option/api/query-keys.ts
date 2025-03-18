import type { AttendanceOptionKey } from '../model'

export const attendanceOptionQueryKeys = {
  all: ['attendance-option-all'] as const,
  optionDetailAll: () => [...attendanceOptionQueryKeys.all, 'attendance-option-detail'] as const,
  optionDetail: (key: AttendanceOptionKey) =>
    [...attendanceOptionQueryKeys.optionDetailAll(), key] as const,
} as const
