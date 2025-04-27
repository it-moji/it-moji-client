import { useIsMutating } from '@tanstack/react-query'
import type { PostDetail } from '../model'
import { announcementPostQueryKeys } from './query-keys'

export const useIsPostDetailMutating = (id: PostDetail['id']) =>
  useIsMutating({ mutationKey: announcementPostQueryKeys.postDetail(id) }) > 0
