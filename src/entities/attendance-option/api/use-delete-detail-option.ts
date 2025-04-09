'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  attendanceBadgeQueryKeys,
  revalidateAttendanceBadgeListWithConditions,
} from '@/entities/attendance-badge/@x/attendance-option'
import { modifyTextParsingOptionsWithRevalidate } from '@/entities/text-parsing/@x/attendance-option'
import { Exception } from '@/shared/api'
import { type AttendanceOptionKey, type AttendanceDetailOption } from '../model'
import { deleteAttendanceDetailOption } from './delete-detail-option'
import { attendanceOptionQueryKeys } from './query-keys'

export interface UseDeleteDetailOptionParams {
  optionKey: AttendanceOptionKey
  detailOptionId: AttendanceDetailOption['id']
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useDeleteDetailOption = ({
  optionKey,
  detailOptionId,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseDeleteDetailOptionParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: attendanceOptionQueryKeys.all,
    mutationFn: () => deleteAttendanceDetailOption(optionKey, detailOptionId),
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attendanceOptionQueryKeys.optionList(),
      })
      queryClient.invalidateQueries({
        queryKey: attendanceOptionQueryKeys.optionDetail(optionKey),
      })

      queryClient.invalidateQueries({
        queryKey: attendanceBadgeQueryKeys.badgeListWithConditions(),
      })
      queryClient.invalidateQueries({
        queryKey: attendanceBadgeQueryKeys.badgeDetailAll(),
      })
      revalidateAttendanceBadgeListWithConditions()

      modifyTextParsingOptionsWithRevalidate()

      onSuccess?.()
    },
    onError: (error) => {
      if (error instanceof Exception) {
        onException?.(error)
        return
      }

      onError?.(error)
    },
  })
}
