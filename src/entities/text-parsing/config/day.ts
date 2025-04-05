import { DayKeySchema } from '../model'

export const DAY_OPTIONS_LABEL = {
  [DayKeySchema.Enum.monday]: '월요일',
  [DayKeySchema.Enum.tuesday]: '화요일',
  [DayKeySchema.Enum.wednesday]: '수요일',
  [DayKeySchema.Enum.thursday]: '목요일',
  [DayKeySchema.Enum.friday]: '금요일',
  [DayKeySchema.Enum.saturday]: '토요일',
  [DayKeySchema.Enum.sunday]: '일요일',
} as const
