import type { GetAttendanceOptionsAll } from '@/entities/attendance-option'

export const transformAttendanceOptionsToFlat = (data: GetAttendanceOptionsAll) =>
  Object.entries(data).flatMap(([key, { name, detailOptions }]) => [
    { value: key, label: name },
    ...detailOptions.map(({ id, name }) => ({ value: String(id), label: name })),
  ])
