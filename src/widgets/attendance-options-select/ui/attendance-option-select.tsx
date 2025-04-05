'use client'

import { Select } from '@mantine/core'
import type { SelectProps } from '@mantine/core'
import type { GetAttendanceOptionsAll } from '@/entities/attendance-option'

export interface AttendanceOptionSelectProps extends Omit<SelectProps, 'data'> {
  attendanceOptions: GetAttendanceOptionsAll
}

export const AttendanceOptionSelect: React.FC<AttendanceOptionSelectProps> = ({
  attendanceOptions,
  checkIconPosition = 'right',
  allowDeselect = false,
  ...props
}) => {
  const options = Object.entries(attendanceOptions).flatMap(([key, { name, detailOptions }]) => [
    { value: key, label: name },
    ...detailOptions.map(({ id, name }) => ({ value: String(id), label: name })),
  ])

  return (
    <Select
      data={options}
      checkIconPosition={checkIconPosition}
      allowDeselect={allowDeselect}
      {...props}
    />
  )
}
