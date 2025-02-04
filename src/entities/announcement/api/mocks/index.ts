import { pinnedPostListMockHandler } from './pinned-post-list'
import { postListMockHandler } from './post-list'

export const postHandlers = [postListMockHandler, pinnedPostListMockHandler]

export { postListEmptyMockHandler } from './post-list'
export { pinnedPostListEmptyMockHandler } from './pinned-post-list'
