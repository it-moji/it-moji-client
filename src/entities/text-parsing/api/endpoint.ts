export const TEXT_PARSING_ENDPOINT = {
  PARSING_OPTIONS: '/api/v1/attendance/parse-options',
  RESULT: (teamId: string | number) => `/api/v1/attendance/teams/${teamId}/history` as const,
} as const

export const TEXT_PARSING_TAG = {
  PARSING_OPTIONS: 'text-parsing-options',
} as const
