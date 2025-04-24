'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'
import type { PostItem } from '../model'
import { deletePost } from './delete-post'
import { announcementPostQueryKeys } from './query-keys'

export interface UseDeletePostParams {
  id: PostItem['id']
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useDeletePost = ({
  id,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseDeletePostParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: announcementPostQueryKeys.all,
    mutationFn: () => deletePost(id),
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: announcementPostQueryKeys.postListAll(),
      })

      queryClient.removeQueries({
        queryKey: announcementPostQueryKeys.postDetail(id),
      })

      queryClient.invalidateQueries({
        queryKey: announcementPostQueryKeys.searchAll(),
      })

      onSuccess?.()
    },
    onError: (error) => {
      if (error instanceof Exception) {
        onException?.(error)
        return
      }

      onError?.(error)
    },
  })
}
