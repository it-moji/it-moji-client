import { z } from 'zod'
import { AttendanceBadgeSchema } from '@/entities/attendance-badge/@x/text-parsing'
import {
  AttendanceDetailOptionSchema,
  AttendanceOptionKeySchema,
} from '@/entities/attendance-option/@x/text-parsing'

export const DelimiterKeySchema = z.enum(['person', 'line', 'title'])

export type DelimiterKey = z.infer<typeof DelimiterKeySchema>

export const DayKeySchema = z.enum([
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
])

export type DayKey = z.infer<typeof DayKeySchema>

export const AttendanceDetailWithExtractOptionSchema = AttendanceDetailOptionSchema.extend({
  identifier: z.string(),
})

export type AttendanceDetailWithExtractOption = z.infer<
  typeof AttendanceDetailWithExtractOptionSchema
>

export const ParsingOptionsSchema = z.object({
  delimiter: z.object(
    Object.fromEntries(DelimiterKeySchema.options.map((key) => [key, z.string()])) as Record<
      DelimiterKey,
      z.ZodString
    >,
  ),
  dayMapping: z.object(
    Object.fromEntries(DayKeySchema.options.map((key) => [key, z.string()])) as Record<
      DayKey,
      z.ZodString
    >,
  ),
  name: z.string(),
  attendanceDetailOptions: z.array(AttendanceDetailWithExtractOptionSchema),
})

export type ParsingOptions = z.infer<typeof ParsingOptionsSchema>

export const AttendanceInfoValueSchema = z.object({
  key: AttendanceOptionKeySchema,
  detailKeyId: z.union([z.null(), AttendanceDetailOptionSchema.shape.id]).optional(),
})

export type AttendanceInfoValue = z.infer<typeof AttendanceInfoValueSchema>

export const AttendanceStatisticValueSchema = AttendanceInfoValueSchema.extend({
  count: z.number(),
})

export type AttendanceStatisticValue = z.infer<typeof AttendanceStatisticValueSchema>

export const ParsingResultSchema = z.object({
  name: z.string(),
  badgeId: AttendanceBadgeSchema.shape.id,
  attendanceInfo: z.object(
    Object.fromEntries(
      DayKeySchema.options.map((key) => [key, AttendanceInfoValueSchema]),
    ) as Record<DayKey, typeof AttendanceInfoValueSchema>,
  ),
  attendanceStatistic: z.array(AttendanceStatisticValueSchema),
})

export type ParsingResult = z.infer<typeof ParsingResultSchema>

export type EditableParsingResult = Omit<ParsingResult, 'badgeId'> & { badgeId: number | null }
