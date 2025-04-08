'use client'

import { useQueryClient } from '@tanstack/react-query'
import { attendanceBadgeQueryKeys } from './query-keys'

export const useResetAttendanceBadgeQuery = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({ queryKey: attendanceBadgeQueryKeys.all })
  }
}
