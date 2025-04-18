export const TEXT_PARSING_ENDPOINT = {
  PARSING_OPTIONS: '/api/v1/attendance/parsing-options',
  RESULT: (teamId: string | number) => `/api/v1/attendance/teams/${teamId}/history` as const,
} as const
