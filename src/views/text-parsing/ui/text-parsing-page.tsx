'use client'

import { Center, Loader } from '@mantine/core'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import type { GetAttendanceBadgeDetailResponse } from '@/entities/attendance-badge'
import type { ParsingOptions } from '@/entities/text-parsing'
import { FallbackError } from '@/shared/ui'
import { TextParsingInput } from './text-parsing-input'
import { TextParsingOptionsSetting } from './text-parsing-options-setting'
import { TextParsingResult } from './text-parsing-result'

export interface TextParsingPageProps {
  parsingOptions: ParsingOptions
  badgeOptions: GetAttendanceBadgeDetailResponse['data'][]
}

export const TextParsingPage: React.FC<TextParsingPageProps> = ({
  parsingOptions,
  badgeOptions,
}) => {
  return (
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
                  <TextParsingOptionsSetting parsingOptions={parsingOptions} />
                </div>
                <div className="flex-1">
                  <TextParsingResult badgeOptions={badgeOptions} />
                </div>
              </div>
            </div>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
