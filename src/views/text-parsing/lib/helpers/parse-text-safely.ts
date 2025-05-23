import toast from 'react-hot-toast'
import type { GetAttendanceBadgeListWithConditionsResponseData } from '@/entities/attendance-badge'
import type { GetAttendanceOptionsAllResponseData } from '@/entities/attendance-option'
import { useTextParsingStore, parseText, type ParsingOptions } from '@/entities/text-parsing'
import { Exception } from '@/shared/api'

interface parseTextSafelyParams {
  text: string
  parsingOptions: ParsingOptions
  attendanceOptions: GetAttendanceOptionsAllResponseData
  badgeList: GetAttendanceBadgeListWithConditionsResponseData
  onSuccess?: () => void
}

export const parseTextSafely = ({
  text,
  parsingOptions,
  attendanceOptions,
  badgeList,
  onSuccess,
}: parseTextSafelyParams) => {
  try {
    const result = parseText(text, parsingOptions, attendanceOptions, badgeList)

    useTextParsingStore.setState((state) => ({ ...state, result: result }))

    onSuccess?.()
  } catch (error: unknown) {
    if (error instanceof Exception) {
      toast.error(Exception.extractMessage(error))
      return
    }

    toast.error('입력된 원본 텍스트의 형식을 확인해주세요')
  }
}
