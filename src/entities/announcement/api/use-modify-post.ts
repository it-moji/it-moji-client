'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ModifyPostParams } from './modify-post'
import { Exception } from '@/shared/api'
import { modifyPost } from './modify-post'
import { announcementPostQueryKeys } from './query-keys'

export interface UseModifyPostParams {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useModifyPost = ({
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseModifyPostParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: announcementPostQueryKeys.all,
    mutationFn: ({ id, body }: { id: ModifyPostParams['id']; body: ModifyPostParams['body'] }) =>
      modifyPost({ id, body }),
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: announcementPostQueryKeys.postListAll(),
      })

      queryClient.invalidateQueries({
        queryKey: announcementPostQueryKeys.postDetail(variables.id),
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
