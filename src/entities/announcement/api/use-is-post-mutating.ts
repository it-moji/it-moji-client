'use client'

import { useIsMutating } from '@tanstack/react-query'
import { announcementPostQueryKeys } from './query-keys'

export const useIsPostMutating = () =>
  useIsMutating({ mutationKey: announcementPostQueryKeys.all }) > 0
