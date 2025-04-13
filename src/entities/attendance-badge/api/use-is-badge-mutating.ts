'use client'

import { useIsMutating } from '@tanstack/react-query'
import { attendanceBadgeQueryKeys } from './query-keys'

export const useIsBadgeMutating = () =>
  useIsMutating({ mutationKey: attendanceBadgeQueryKeys.all }) > 0
