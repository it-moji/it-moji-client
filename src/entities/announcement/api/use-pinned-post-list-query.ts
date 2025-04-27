'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getPinnedPostList } from './get-pinned-post-list'
import { announcementPostQueryKeys } from './query-keys'

export const usePinnedPostListSuspenseQuery = () =>
  useSuspenseQuery({
    queryKey: announcementPostQueryKeys.pinnedPostList(),
    queryFn: () => getPinnedPostList().then((res) => res.data),
  })
