'use client'

import React from 'react'
import type { CommonErrorProps } from '@/shared/ui'
import { FallbackError } from '@/shared/ui'

const TextParsingErrorPage: React.FC<CommonErrorProps> = ({ error, reset }) => {
  return <FallbackError error={error} reset={reset} />
}

export default TextParsingErrorPage
