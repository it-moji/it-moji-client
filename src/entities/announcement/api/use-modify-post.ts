'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ModifyPostParams } from './modify-post'
import type { PostDetail } from '../model'
import { modifyPost } from './modify-post'
import { announcementPostQueryKeys } from './query-keys'

export interface UseModifyPostParams {
  id: PostDetail['id']
  onMutate?: () => void
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export const useModifyPost = ({ id, onMutate, onSuccess, onError }: UseModifyPostParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: announcementPostQueryKeys.postDetail(id),
    mutationFn: (body: ModifyPostParams['body']) => modifyPost({ id, body }),
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: announcementPostQueryKeys.postListAll(),
      })

      queryClient.invalidateQueries({
        queryKey: announcementPostQueryKeys.postDetail(id),
      })

      queryClient.invalidateQueries({
        queryKey: announcementPostQueryKeys.searchAll(),
      })

      onSuccess?.()
    },
    onError: (error) => {
      onError?.(error)
    },
  })
}
