import { useIsMutating } from '@tanstack/react-query'
import { textParsingQueryKeys } from './query-keys'

export const useIsTextParsingMutating = () =>
  useIsMutating({ mutationKey: textParsingQueryKeys.all }) > 0
