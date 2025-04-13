'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'
import { createAttendanceBadge } from './create-badge'
import { attendanceBadgeQueryKeys } from './query-keys'

export interface UseCreateAttendanceBadgeParams {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useCreateAttendanceBadge = ({
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseCreateAttendanceBadgeParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: attendanceBadgeQueryKeys.all,
    mutationFn: createAttendanceBadge,
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attendanceBadgeQueryKeys.badgeList(),
      })

      queryClient.invalidateQueries({
        queryKey: attendanceBadgeQueryKeys.badgeListWithConditions(),
      })

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
