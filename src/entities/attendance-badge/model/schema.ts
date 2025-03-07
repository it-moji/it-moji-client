import { z } from 'zod'
import { AttendanceDetailOptionSchema } from '@/entities/attendance-option/@x/detail-option'
import { AttendanceOptionKeySchema } from '@/entities/attendance-option/@x/option-key'

export const AttendanceBadgeSchema = z.object({
  id: z.number(),
  icon: z.string(),
  name: z.string(),
})

export type AttendanceBadge = z.infer<typeof AttendanceBadgeSchema>

export const AttendanceBadgeRangeSchema = z.enum(['more', 'less'])

export type AttendanceBadgeRange = z.infer<typeof AttendanceBadgeRangeSchema>

export const AttendanceBadgeOptionSchema = z.object({
  key: z.union([AttendanceOptionKeySchema, AttendanceDetailOptionSchema.shape.id]),
  count: z.number(),
  range: AttendanceBadgeRangeSchema,
})

export type AttendanceBadgeOption = z.infer<typeof AttendanceBadgeOptionSchema>
