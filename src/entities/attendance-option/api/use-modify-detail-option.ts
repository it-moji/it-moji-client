'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Exception } from '@/shared/api'
import { type AttendanceDetailOption } from '../model'
import {
  type PutAttendanceOptionParams,
  type PutAttendanceOptionsBody,
} from './modify-detail-option'
import { modifyAttendanceDetailOption } from './modify-detail-option'
import { attendanceOptionQueryKeys } from './query-keys'

export interface UseModifyDetailOptionParams
  extends Pick<PutAttendanceOptionParams, 'optionKey' | 'detailOptionId'> {
  onMutate?: () => void
  onSuccess?: () => void
  onException?: (error: Exception) => void
  onError?: (error: Error) => void
}

export const useModifyDetailOption = ({
  optionKey,
  detailOptionId,
  onMutate,
  onSuccess,
  onException,
  onError,
}: UseModifyDetailOptionParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: attendanceOptionQueryKeys.all,
    mutationFn: (body: PutAttendanceOptionsBody) =>
      modifyAttendanceDetailOption({ optionKey, detailOptionId, body }),
    onMutate: ({ name }) => {
      try {
        onMutate?.()
        queryClient.setQueriesData<AttendanceDetailOption[]>(
          { queryKey: attendanceOptionQueryKeys.optionDetail(optionKey) },
          (prev) => {
            return prev?.map((detailOption) => {
              if (detailOption.id === detailOptionId) {
                return { ...detailOption, name }
              }

              return detailOption
            })
          },
        )

        return { status: true }
      } catch {
        return { status: false }
      }
    },
    onSuccess: (_, __, context) => {
      if (!context?.status) {
        queryClient.invalidateQueries({
          queryKey: attendanceOptionQueryKeys.optionList(),
        })

        queryClient.invalidateQueries({
          queryKey: attendanceOptionQueryKeys.optionDetail(optionKey),
        })
      }

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
