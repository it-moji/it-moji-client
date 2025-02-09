export const POST_ENDPOINT = {
  LIST: '/api/v1/announcement',
  PINNED_LIST: '/api/v1/announcement/pinned',
  SEARCH: '/api/v1/announcement/search',
  DETAIL: (id: number) => `${POST_ENDPOINT.LIST}/${id}` as const,
} as const

export const POST_TAG = {
  ALL: 'post-all',
  LIST: 'post-list',
  PINNED_LIST: 'pinned-post-list',
  SEARCH: 'post-search',
  DETAIL: (id: number) => `post-detail-${id}`,
} as const
