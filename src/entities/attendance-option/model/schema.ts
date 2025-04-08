import { z } from 'zod'

export const AttendanceOptionKeySchema = z.enum([
  'attendance',
  'absence',
  'gap',
  'rest',
  'vacation',
])

export type AttendanceOptionKey = z.infer<typeof AttendanceOptionKeySchema>

export const AttendanceDetailOptionSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
})

export type AttendanceDetailOption = z.infer<typeof AttendanceDetailOptionSchema>

export const AttendanceOptionSchema = z.object({
  name: z.string(),
  detailOptions: z.array(AttendanceDetailOptionSchema),
})

export type AttendanceOption = z.infer<typeof AttendanceOptionSchema>
