import type {
  AttendanceOptionKey,
  GetAttendanceOptionsAll,
} from '@/entities/attendance-option/@x/text-parsing'

export const findParentKeyById = (
  id: number,
  attendanceOptions: GetAttendanceOptionsAll,
): AttendanceOptionKey | null => {
  let result = null

  Object.keys(attendanceOptions).forEach((key) => {
    if (
      attendanceOptions[key as AttendanceOptionKey].detailOptions.some((option) => option.id === id)
    ) {
      result = key
    }
  })

  return result
}
