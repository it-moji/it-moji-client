'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getAttendanceOptionsAll } from './get-option-list'
import { attendanceOptionQueryKeys } from './query-keys'

export const useOptionListSuspenseQuery = () =>
  useSuspenseQuery({
    queryKey: attendanceOptionQueryKeys.optionList(),
    queryFn: () => getAttendanceOptionsAll().then((res) => res.data),
  })
