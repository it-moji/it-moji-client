'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'
import { modifyTextParsingOptions } from './modify-parsing-options'
import { textParsingQueryKeys } from './query-keys'

export interface UseModifyTextParsingOptions {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useModifyTextParsingOptions = ({
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseModifyTextParsingOptions = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: textParsingQueryKeys.all,
    mutationFn: modifyTextParsingOptions,
    onMutate: () => {
      onMutate?.()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: textParsingQueryKeys.parsingOptions(),
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
