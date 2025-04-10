import { AttendanceBadgeRangeSchema } from '../model'

export const ATTENDANCE_BADGES_RANGE_LABEL = {
  [AttendanceBadgeRangeSchema.Enum.more]: '이상',
  [AttendanceBadgeRangeSchema.Enum.less]: '이하',
} as const
