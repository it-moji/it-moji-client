'use client'

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import type { AttendanceOptionKey } from '../model'
import { getAttendanceOptionDetail } from './get-option-detail'
import { attendanceOptionQueryKeys } from './query-keys'

export interface UseAttendanceOptionDetailSuspenseQueryParams {
  optionKey: AttendanceOptionKey
}

export const useAttendanceOptionDetailSuspenseQuery = ({
  optionKey,
}: UseAttendanceOptionDetailSuspenseQueryParams) =>
  useSuspenseQuery({
    queryKey: attendanceOptionQueryKeys.optionDetail(optionKey),
    queryFn: () => getAttendanceOptionDetail(optionKey).then((res) => res.data),
  })

export const useResetAttendanceOptionDetailQuery = ({
  optionKey,
}: UseAttendanceOptionDetailSuspenseQueryParams) => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: attendanceOptionQueryKeys.optionDetail(optionKey) })
  }
}
