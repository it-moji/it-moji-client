'use client'

import { Center, Loader } from '@mantine/core'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FallbackError } from '@/shared/ui'
import { TextParsingInput } from './text-parsing-input'
import { TextParsingOptionsSetting } from './text-parsing-options-setting'
import { TextParsingResult } from './text-parsing-result'

export const TextParsingPage: React.FC = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        FallbackComponent={({ error, resetErrorBoundary }) => (
          <FallbackError error={error} reset={resetErrorBoundary} />
        )}
      >
        <Suspense
          fallback={
            <Center>
              <Loader className="mt-48" color="var(--mantine-color-placeholder)" />
            </Center>
          }
        >
          <div className="@container/page">
            <div className="flex flex-col gap-4 @5xl/page:flex-row">
              <div className="flex-col space-y-4">
                <TextParsingInput />
                <TextParsingOptionsSetting />
              </div>
              <div className="flex-1">
                <TextParsingResult />
              </div>
            </div>
          </div>
        </Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)
