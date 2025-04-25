'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'
import { createPost } from './create-post'
import { announcementPostQueryKeys } from './query-keys'

export interface UseCreatePostParams {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useCreatePost = ({
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseCreatePostParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: announcementPostQueryKeys.all,
    mutationFn: createPost,
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: announcementPostQueryKeys.postListAll(),
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
