'use client'

import React from 'react'
import { Exception } from '@/shared/api'
import type { CommonErrorProps } from '@/shared/ui'
import { FallbackError } from '@/shared/ui'

const TextParsingErrorPage: React.FC<CommonErrorProps> = ({ reset }) => {
  return <FallbackError error={new Exception('텍스트 분석 설정 조회에 실패했어요')} reset={reset} />
}

export default TextParsingErrorPage
