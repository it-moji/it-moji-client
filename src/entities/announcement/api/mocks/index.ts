import { createPostMockHandler, createPostTestMockHandler } from './create-post'
import { deletePostMockHandler } from './delete-post'
import { modifyPostMockHandler, modifyPostTestMockHandler } from './modify-post'
import { pinnedPostListEmptyMockHandler, pinnedPostListMockHandler } from './pinned-post-list'
import { postDetailMockHandler } from './post-detail'
import { postListEmptyMockHandler, postListMockHandler } from './post-list'
import { searchPostEmptyMockHandler, searchPostMockHandler } from './search-post'

export const postHandlers = [
  postListMockHandler,
  pinnedPostListMockHandler,
  searchPostMockHandler,
  createPostMockHandler,
  postDetailMockHandler,
  deletePostMockHandler,
  modifyPostMockHandler,
]

export const postTestHandlers = [
  postListEmptyMockHandler,
  pinnedPostListEmptyMockHandler,
  searchPostEmptyMockHandler,
  createPostTestMockHandler,
  modifyPostTestMockHandler,
]
