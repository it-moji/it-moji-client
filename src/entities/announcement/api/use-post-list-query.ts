'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import type { SearchParams } from '@/shared/api'
import { getPostList } from './get-post-list'
import { announcementPostQueryKeys } from './query-keys'

export const usePostListSuspenseQuery = (searchParams: SearchParams) =>
  useSuspenseQuery({
    queryKey: announcementPostQueryKeys.postList(searchParams),
    queryFn: () => getPostList(searchParams).then((res) => res.data),
  })
