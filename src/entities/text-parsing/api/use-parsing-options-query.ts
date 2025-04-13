'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getParsingOptions } from './get-parsing-options'
import { textParsingQueryKeys } from './query-keys'

export const useTextParsingOptionsSuspenseQuery = () =>
  useSuspenseQuery({
    queryKey: textParsingQueryKeys.parsingOptions(),
    queryFn: () => getParsingOptions().then((res) => res.data),
  })
