'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import type { AttendanceBadge } from '../model'
import { getAttendanceBadgeDetail } from './get-badge-detail'
import { attendanceBadgeQueryKeys } from './query-keys'

export interface UseAttendanceBadgeDetailSuspenseQueryParams {
  id: AttendanceBadge['id']
}

export const useAttendanceBadgeDetailSuspenseQuery = ({
  id,
}: UseAttendanceBadgeDetailSuspenseQueryParams) =>
  useSuspenseQuery({
    queryKey: attendanceBadgeQueryKeys.badgeDetail(id),
    queryFn: () => getAttendanceBadgeDetail(id).then((res) => res.data),
  })
