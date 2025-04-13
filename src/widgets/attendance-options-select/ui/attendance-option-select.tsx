'use client'

import { Select } from '@mantine/core'
import type { SelectProps } from '@mantine/core'
import type {
  AttendanceDetailOption,
  AttendanceOptionKey,
  GetAttendanceOptionsAllResponseData,
} from '@/entities/attendance-option'

export interface AttendanceOptionSelectProps
  extends Omit<SelectProps, 'data' | 'value' | 'defaultValue' | 'onChange'> {
  value?: {
    key: AttendanceOptionKey
    detailKeyId?: AttendanceDetailOption['id'] | null
  }
  defaultValue?: {
    key: AttendanceOptionKey
    detailKeyId?: AttendanceDetailOption['id'] | null
  }
  onChange?: (value: {
    key: AttendanceOptionKey
    detailKeyId: AttendanceDetailOption['id'] | null
  }) => void
  attendanceOptions: GetAttendanceOptionsAllResponseData | null | undefined
}

export const AttendanceOptionSelect: React.FC<AttendanceOptionSelectProps> = ({
  attendanceOptions,
  value,
  defaultValue,
  checkIconPosition = 'right',
  allowDeselect = false,
  onChange,
  ...props
}) => {
  const computeValue = (
    key: AttendanceOptionKey,
    detailKeyId?: AttendanceDetailOption['id'] | null,
  ) => (detailKeyId ? `${key}-${detailKeyId}` : key)

  const options = attendanceOptions
    ? Object.entries(attendanceOptions).flatMap(([key, { name, detailOptions }]) => [
        { value: key, label: name },
        ...detailOptions.map(({ id, name }) => ({ value: `${key}-${id}`, label: name })),
      ])
    : []

  return (
    <Select
      data={options}
      value={value && computeValue(value.key, value.detailKeyId)}
      defaultValue={defaultValue && computeValue(defaultValue.key, defaultValue.detailKeyId)}
      onChange={(value) => {
        if (value) {
          const [key, detailKeyId] = value.split('-')

          onChange?.({
            key: key as AttendanceOptionKey,
            detailKeyId: Number(detailKeyId) || null,
          })
        }
      }}
      checkIconPosition={checkIconPosition}
      allowDeselect={allowDeselect}
      {...props}
    />
  )
}
