import { AttendanceBadgeRangeSchema } from '../model'

export const ATTENDANCE_BADGES_RANGE_LABEL = {
  [AttendanceBadgeRangeSchema.Enum.MORE]: '이상',
  [AttendanceBadgeRangeSchema.Enum.LESS]: '이하',
} as const
