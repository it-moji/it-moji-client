import { z } from 'zod'
import {
  AttendanceDetailOptionSchema,
  AttendanceOptionKeySchema,
} from '@/entities/attendance-option/@x/attendance-badge'

export const AttendanceBadgeSchema = z.object({
  id: z.number(),
  icon: z.string(),
  name: z.string(),
})

export type AttendanceBadge = z.infer<typeof AttendanceBadgeSchema>

export const AttendanceBadgeRangeSchema = z.enum(['MORE', 'LESS'])

export type AttendanceBadgeRange = z.infer<typeof AttendanceBadgeRangeSchema>

export const AttendanceBadgeConditionSchema = z.object({
  id: z.number(),
  key: z.union([AttendanceOptionKeySchema, AttendanceDetailOptionSchema.shape.id]),
  count: z.number(),
  range: AttendanceBadgeRangeSchema,
})

export type AttendanceBadgeCondition = z.infer<typeof AttendanceBadgeConditionSchema>

export const AttendanceBadgeConditionGroupSchema = z.object({
  groupId: z.number(),
  conditions: z.array(AttendanceBadgeConditionSchema),
})

export type AttendanceBadgeConditionGroup = z.infer<typeof AttendanceBadgeConditionGroupSchema>
