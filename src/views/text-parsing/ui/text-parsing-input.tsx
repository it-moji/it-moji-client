'use client'

import { Button, Textarea } from '@mantine/core'
import toast from 'react-hot-toast'
import { useAttendanceBadgeListWithConditionsQuery } from '@/entities/attendance-badge'
import { useAttendanceOptionListSuspenseQuery } from '@/entities/attendance-option'
import {
  useIsTextParsingMutating,
  useParsingOptions,
  useParsingText,
  useTextParsingActions,
} from '@/entities/text-parsing'
import { AdminContainer, AdminTitle, Icon } from '@/shared/ui'
import { parseTextSafely } from '../lib'

export const TextParsingInput: React.FC = () => {
  const { data: attendanceOptions } = useAttendanceOptionListSuspenseQuery()
  const { data: badgeList } = useAttendanceBadgeListWithConditionsQuery()

  const text = useParsingText()
  const options = useParsingOptions()
  const isSubmitting = useIsTextParsingMutating()

  const { setText } = useTextParsingActions()

  const handleParsingText = () => {
    if (options) {
      parseTextSafely({
        text,
        parsingOptions: options,
        attendanceOptions,
        badgeList,
        onSuccess: () => toast.success('분석이 완료됐어요'),
      })
    }
  }

  return (
    <AdminContainer>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <AdminTitle className="mb-0 flex items-center">
          <Icon query="fluent-emoji:books" className="mr-2" />
          텍스트 분석
        </AdminTitle>
        <Button onClick={handleParsingText} disabled={!text.trim() || isSubmitting}>
          분석하기
        </Button>
      </div>
      <Textarea
        label="원본 텍스트"
        classNames={{ label: 'mb-2 font-semibold' }}
        minRows={5}
        maxRows={10}
        autosize
        placeholder="분석할 원본 텍스트를 입력해주세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </AdminContainer>
  )
}
