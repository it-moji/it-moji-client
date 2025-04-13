import type { GetAttendanceOptionsAllResponseData } from '@/entities/attendance-option/@x/text-parsing'

export const transformAttendanceOptionsToFlat = (data: GetAttendanceOptionsAllResponseData) =>
  Object.entries(data).flatMap(([key, { name, detailOptions }]) => [
    { value: key, label: name },
    ...detailOptions.map(({ id, name }) => ({ value: String(id), label: name })),
  ])
