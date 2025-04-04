'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
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
      try {
        onMutate?.()
        queryClient.setQueriesData<AttendanceDetailOption[]>(
          { queryKey: attendanceOptionQueryKeys.optionDetail(optionKey) },
          (prev) => {
            return prev?.filter((detailOption) => {
              return detailOption.id !== detailOptionId
            })
          },
        )

        return { status: true }
      } catch {
        return { status: false }
      }
    },
    onSuccess: (_, __, context) => {
      queryClient.invalidateQueries({
        queryKey: attendanceOptionQueryKeys.optionList(),
      })

      if (!context?.status) {
        queryClient.invalidateQueries({
          queryKey: attendanceOptionQueryKeys.optionDetail(optionKey),
        })
      }

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
