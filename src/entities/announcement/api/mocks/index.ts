import { pinnedPostListMockHandler } from './pinned-post-list'
import { postListMockHandler } from './post-list'

export const postHandlers = [postListMockHandler, pinnedPostListMockHandler]

export { getPostListEmptyMock } from './post-list'
export { getPinnedPostListEmptyMock } from './pinned-post-list'
