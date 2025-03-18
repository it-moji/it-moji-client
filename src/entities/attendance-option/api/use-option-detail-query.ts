'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import type { AttendanceOptionKey } from '../model'
import { getAttendanceOptionDetail } from './get-option-detail'
import { attendanceOptionQueryKeys } from './query-keys'

export interface UseOptionDetailSuspenseQueryParams {
  optionKey: AttendanceOptionKey
}

export const useOptionDetailSuspenseQuery = ({ optionKey }: UseOptionDetailSuspenseQueryParams) =>
  useSuspenseQuery({
    queryKey: attendanceOptionQueryKeys.optionDetail(optionKey),
    queryFn: () => getAttendanceOptionDetail(optionKey).then((res) => res.data),
  })
