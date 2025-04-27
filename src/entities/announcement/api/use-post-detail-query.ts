'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getPostDetail } from './get-post-detail'
import { announcementPostQueryKeys } from './query-keys'

export const usePostDetailSuspenseQuery = (id: number) =>
  useSuspenseQuery({
    queryKey: announcementPostQueryKeys.postDetail(id),
    queryFn: () => getPostDetail(id).then((res) => res.data),
  })
