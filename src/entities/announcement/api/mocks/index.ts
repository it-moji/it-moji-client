import { createPostMockHandler } from './create-post'
import { deletePostMockHandler } from './delete-post'
import { modifyPostMockHandler } from './modify-post'
import { pinnedPostListMockHandler } from './pinned-post-list'
import { postDetailMockHandler } from './post-detail'
import { postListMockHandler } from './post-list'
import { searchPostMockHandler } from './search-post'

export const postHandlers = [
  postListMockHandler,
  pinnedPostListMockHandler,
  searchPostMockHandler,
  createPostMockHandler,
  postDetailMockHandler,
  deletePostMockHandler,
  modifyPostMockHandler,
]
