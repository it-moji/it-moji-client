import { AttendanceOptionKeySchema } from '@/entities/attendance-option'

export const ATTENDANCE_OPTION_SELECT_BG_COLOR = {
  [AttendanceOptionKeySchema.Enum.attendance]: 'bg-green-50',
  [AttendanceOptionKeySchema.Enum.absence]: 'bg-red-50',
  [AttendanceOptionKeySchema.Enum.vacation]: 'bg-blue-50',
  [AttendanceOptionKeySchema.Enum.gap]: 'bg-yellow-50',
  [AttendanceOptionKeySchema.Enum.rest]: '',
} as const
