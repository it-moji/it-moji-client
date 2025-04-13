import type { GetPinnedPostListResponse } from '../get-pinned-post-list'
import { createMockHandler, MOCK_COMMON_RESPONSE } from '@/shared/api'
import { POST_ENDPOINT } from '../endpoint'
import { POST_LIST_MOCK_DATA } from './post-list'

export const pinnedPostListMockHandler = createMockHandler({
  endpoint: POST_ENDPOINT.PINNED_LIST,
  handler: () =>
    Promise.resolve({
      data: POST_LIST_MOCK_DATA.filter((post) => post.isPinned).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    }),
  delay: 300,
})

export const getPinnedPostListEmptyMock = () =>
  Promise.resolve({
    ...MOCK_COMMON_RESPONSE.SUCCESS,
    data: [],
  } as GetPinnedPostListResponse)
