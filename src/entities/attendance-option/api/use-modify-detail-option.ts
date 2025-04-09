'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  attendanceBadgeQueryKeys,
  revalidateAttendanceBadgeListWithConditions,
} from '@/entities/attendance-badge/@x/attendance-option'
import { modifyTextParsingOptionsWithRevalidate } from '@/entities/text-parsing/@x/attendance-option'
import { Exception } from '@/shared/api'
import {
  type PutAttendanceOptionParams,
  type PutAttendanceOptionsBody,
} from './modify-detail-option'
import { modifyAttendanceDetailOption } from './modify-detail-option'
import { attendanceOptionQueryKeys } from './query-keys'

export interface UseModifyDetailOptionParams
  extends Pick<PutAttendanceOptionParams, 'optionKey' | 'detailOptionId'> {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useModifyDetailOption = ({
  optionKey,
  detailOptionId,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseModifyDetailOptionParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: attendanceOptionQueryKeys.all,
    mutationFn: (body: PutAttendanceOptionsBody) =>
      modifyAttendanceDetailOption({ optionKey, detailOptionId, body }),
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
