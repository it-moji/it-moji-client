'use client'

import { useTimeout } from '@mantine/hooks'
import { useState, useEffect } from 'react'

export const Deferred: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isDeferred, setIsDeferred] = useState(false)
  const { start } = useTimeout(() => setIsDeferred(true), 200)

  useEffect(start, [start])

  if (!isDeferred) {
    return null
  }

  return <>{children}</>
}
