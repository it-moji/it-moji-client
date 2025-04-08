'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getAttendanceBadgeList } from './get-badge-list'
import { attendanceBadgeQueryKeys } from './query-keys'

export const useAttendanceBadgeListSuspenseQuery = () =>
  useSuspenseQuery({
    queryKey: attendanceBadgeQueryKeys.badgeList(),
    queryFn: () => getAttendanceBadgeList().then((res) => res.data),
  })
