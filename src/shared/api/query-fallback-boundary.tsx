'use client'

import { Center, Loader } from '@mantine/core'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import type { FallbackProps } from 'react-error-boundary'

export const DefaultLoadingFallback: React.FC = () => (
  <Center>
    <Loader className="pb-48 pt-28" color="var(--mantine-color-placeholder)" />
  </Center>
)

export interface QueryFallbackBoundaryProps {
  errorFallback: React.ComponentType<FallbackProps>
  loadingFallback?: React.ReactNode
  children: React.ReactNode
}

export const QueryFallbackBoundary: React.FC<QueryFallbackBoundaryProps> = ({
  errorFallback,
  loadingFallback = <DefaultLoadingFallback />,
  children,
}) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={errorFallback}>
          <Suspense fallback={loadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
