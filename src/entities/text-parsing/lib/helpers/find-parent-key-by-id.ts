import type {
  AttendanceOptionKey,
  GetAttendanceOptionsAll,
} from '@/entities/attendance-option/@x/text-parsing'

export const findParentKeyById = (id: number, attendanceOptions: GetAttendanceOptionsAll) => {
  for (const key of Object.keys(attendanceOptions) as AttendanceOptionKey[]) {
    if (attendanceOptions[key].detailOptions.some((option) => option.id === id)) {
      return key
    }
  }

  return null
}
