import { createMockHandler } from '@/shared/api'
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
