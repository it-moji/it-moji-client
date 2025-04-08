'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'
import type { AttendanceBadge } from '../model'
import { type PutAttendanceBadgeBody, modifyAttendanceBadge } from './modify-badge'
import { attendanceBadgeQueryKeys } from './query-keys'

export interface UseModifyAttendanceBadgeParams {
  id: AttendanceBadge['id']
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useModifyAttendanceBadge = ({
  id,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseModifyAttendanceBadgeParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: attendanceBadgeQueryKeys.all,
    mutationFn: (body: PutAttendanceBadgeBody) => modifyAttendanceBadge({ id, body }),
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
