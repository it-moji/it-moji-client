'use client'

import { Select } from '@mantine/core'
import type { SelectProps } from '@mantine/core'
import type { GetAttendanceOptionsAllResponseData } from '@/entities/attendance-option'

export interface AttendanceOptionSelectProps extends Omit<SelectProps, 'data'> {
  attendanceOptions: GetAttendanceOptionsAllResponseData | null | undefined
}

export const AttendanceOptionSelect: React.FC<AttendanceOptionSelectProps> = ({
  attendanceOptions,
  value,
  defaultValue,
  checkIconPosition = 'right',
  allowDeselect = false,
  ...props
}) => {
  const options = attendanceOptions
    ? Object.entries(attendanceOptions).flatMap(([key, { name, detailOptions }]) => [
        { value: key, label: name },
        ...detailOptions.map(({ id, name }) => ({ value: String(id), label: name })),
      ])
    : []

  return (
    <Select
      data={options}
      value={String(value) || value}
      defaultValue={String(defaultValue) || defaultValue}
      checkIconPosition={checkIconPosition}
      allowDeselect={allowDeselect}
      {...props}
    />
  )
}
