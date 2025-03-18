'use client'

import { useIsMutating } from '@tanstack/react-query'
import { attendanceOptionQueryKeys } from './query-keys'

export const useIsDetailOptionMutating = () =>
  useIsMutating({ mutationKey: attendanceOptionQueryKeys.all }) > 0
