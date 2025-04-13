'use client'

import { useTimeout } from '@mantine/hooks'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLoaderState } from '../../lib'
import { Deferred } from '../../ui'

export const FakeProgressBar: React.FC = () => {
  const [step, setStep] = useState(0)
  const { start } = useTimeout(() => setStep((prev) => prev + 1), 400)

  useEffect(start, [step, start])

  return (
    <motion.div
      className="absolute inset-y-0 left-0"
      style={{ backgroundColor: 'var(--mantine-primary-color-filled)' }}
      initial={{ width: '0%', opacity: 0 }}
      animate={{ width: `${Math.min(16 + 0.8 * step, 92)}%`, opacity: 1 }}
      exit={{ width: '100%', opacity: 0 }}
      transition={{ ease: 'easeInOut', duration: 0.24 }}
    />
  )
}

export const LoadingProgressBar: React.FC = () => {
  const { isLoading, off } = useLoaderState()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(off, [pathname, searchParams, off])

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 overflow-hidden"
      style={{ zIndex: 999, height: 3 }}
    >
      <AnimatePresence>
        {isLoading && (
          <Deferred>
            <FakeProgressBar />
          </Deferred>
        )}
      </AnimatePresence>
    </div>
  )
}
