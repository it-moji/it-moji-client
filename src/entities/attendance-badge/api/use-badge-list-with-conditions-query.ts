'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getAttendanceBadgeListWithConditions } from './get-badge-list-with-conditions'
import { attendanceBadgeQueryKeys } from './query-keys'

export const useAttendanceBadgeListWithConditionsQuery = () =>
  useSuspenseQuery({
    queryKey: attendanceBadgeQueryKeys.badgeListWithConditions(),
    queryFn: getAttendanceBadgeListWithConditions,
  })
