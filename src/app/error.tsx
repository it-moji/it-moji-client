'use client'

import { useEffect } from 'react'
import { type CommonErrorProps, FallbackError } from '@/shared/ui'

const CommonErrorPage: React.FC<CommonErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.warn(error)
  }, [error])

  return (
    <div className="flex flex-1 flex-col items-center justify-center pb-16">
      <FallbackError error={error} reset={reset} />
    </div>
  )
}

export default CommonErrorPage
