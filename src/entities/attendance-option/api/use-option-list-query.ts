'use client'

import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { getAttendanceOptionsAll } from './get-option-list'
import { attendanceOptionQueryKeys } from './query-keys'

export const useAttendanceOptionListSuspenseQuery = () =>
  useSuspenseQuery({
    queryKey: attendanceOptionQueryKeys.optionList(),
    queryFn: () => getAttendanceOptionsAll().then((res) => res.data),
  })

export const useAttendanceOptionListQuery = () =>
  useQuery({
    queryKey: attendanceOptionQueryKeys.optionList(),
    queryFn: () => getAttendanceOptionsAll().then((res) => res.data),
  })
