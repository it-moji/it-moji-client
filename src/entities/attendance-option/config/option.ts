import { AttendanceOptionKeySchema } from '../model'

export const ATTENDANCE_OPTIONS_LABEL = {
  [AttendanceOptionKeySchema.Enum.attendance]: '출석',
  [AttendanceOptionKeySchema.Enum.absence]: '결석',
  [AttendanceOptionKeySchema.Enum.gap]: '공결',
  [AttendanceOptionKeySchema.Enum.rest]: '휴식',
  [AttendanceOptionKeySchema.Enum.vacation]: '휴가',
} as const
