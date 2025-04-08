import type {
  AttendanceOptionKey,
  AttendanceDetailOption,
  GetAttendanceOptionsAllResponseData,
} from '@/entities/attendance-option/@x/text-parsing'

export const findParentKeyById = (
  id: AttendanceDetailOption['id'],
  attendanceOptions: GetAttendanceOptionsAllResponseData,
) => {
  for (const key of Object.keys(attendanceOptions) as AttendanceOptionKey[]) {
    if (attendanceOptions[key].detailOptions.some((option) => option.id === id)) {
      return key
    }
  }

  return null
}
