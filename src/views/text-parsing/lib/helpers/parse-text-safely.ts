import toast from 'react-hot-toast'
import type { GetAttendanceOptionsAll } from '@/entities/attendance-option'
import { useTextParsingStore, parseText, type ParsingOptions } from '@/entities/text-parsing'
import { Exception } from '@/shared/api'

interface parseTextSafelyParams {
  text: string
  parsingOptions: ParsingOptions
  attendanceOptions: GetAttendanceOptionsAll
  onSuccess?: () => void
}

export const parseTextSafely = ({
  text,
  parsingOptions,
  attendanceOptions,
  onSuccess,
}: parseTextSafelyParams) => {
  try {
    const result = parseText(text, parsingOptions, attendanceOptions)

    if (result.length < 1) {
      throw new Exception('입력된 원본 텍스트의 형식을 확인해주세요')
    }

    useTextParsingStore.setState((state) => ({ ...state, result: result }))

    onSuccess?.()
  } catch (error: unknown) {
    if (error instanceof Exception) {
      toast.error(Exception.extractMessage(error))
    } else {
      toast.error('입력된 원본 텍스트의 형식을 확인해주세요')
    }
  }
}
