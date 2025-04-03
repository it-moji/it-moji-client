'use client'

import { Button, Textarea } from '@mantine/core'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useOptionListSuspenseQuery } from '@/entities/attendance-option'
import {
  useParsingFormSubmitting,
  useParsingOptions,
  useParsingText,
  useTextParsingActions,
} from '@/entities/text-parsing'
import { AdminContainer, AdminTitle, Icon } from '@/shared/ui'
import { parseTextSafely } from '../lib'

export const TextParsingInput: React.FC = () => {
  const { data: attendanceOptions } = useOptionListSuspenseQuery()

  const text = useParsingText()
  const options = useParsingOptions()
  const isSubmitting = useParsingFormSubmitting()

  const { resetTextParsingStore, setText } = useTextParsingActions()

  const handleParsingText = () => {
    if (options) {
      parseTextSafely({
        text,
        parsingOptions: options,
        attendanceOptions,
        onSuccess: () => toast.success('분석이 완료됐어요'),
      })
    }
  }

  useEffect(() => {
    return () => {
      resetTextParsingStore()
    }
  }, [resetTextParsingStore])

  return (
    <AdminContainer>
      <AdminTitle className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Icon query="fluent-emoji:books" className="mr-2" />
          텍스트 분석
        </div>
        <Button onClick={handleParsingText} disabled={!text.trim() || isSubmitting}>
          분석하기
        </Button>
      </AdminTitle>
      <Textarea
        label="원본 텍스트"
        classNames={{ label: 'mb-2 font-semibold' }}
        minRows={5}
        maxRows={10}
        autosize
        placeholder="분석할 원본 텍스트를 입력해주세요"
        onChange={(e) => setText(e.target.value)}
      />
    </AdminContainer>
  )
}
