'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import type { SearchPostParams } from './search-post'
import { announcementPostQueryKeys } from './query-keys'
import { searchPost } from './search-post'

export const useSearchPostSuspenseQuery = ({ query, type, params }: SearchPostParams) =>
  useSuspenseQuery({
    queryKey: announcementPostQueryKeys.search(query, type, params),
    queryFn: () => searchPost({ query, type, params }).then((res) => res.data),
  })
