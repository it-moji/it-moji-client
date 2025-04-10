export const textParsingQueryKeys = {
  all: ['text-parsing-all'],
  parsingOptions: () => [...textParsingQueryKeys.all, 'text-parsing-options'],
} as const
