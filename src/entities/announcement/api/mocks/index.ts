import { createPostMockHandler } from './create-post'
import { pinnedPostListMockHandler } from './pinned-post-list'
import { postListMockHandler } from './post-list'
import { searchPostMockHandler } from './search-post'

export const postHandlers = [
  postListMockHandler,
  pinnedPostListMockHandler,
  searchPostMockHandler,
  createPostMockHandler,
]

export { getPostListEmptyMock } from './post-list'
export { getPinnedPostListEmptyMock } from './pinned-post-list'
export { searchPostEmptyMock } from './search-post'
