'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'
import type { AttendanceBadge } from '../model'
import { deleteAttendanceBadge } from './delete-badge'
import { attendanceBadgeQueryKeys } from './query-keys'

export interface UseDeleteAttendanceBadgeParams {
  id: AttendanceBadge['id']
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useDeleteAttendanceBadge = ({
  id,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseDeleteAttendanceBadgeParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: attendanceBadgeQueryKeys.all,
    mutationFn: () => deleteAttendanceBadge(id),
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

      queryClient.invalidateQueries({
        queryKey: attendanceBadgeQueryKeys.badgeDetail(id),
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
