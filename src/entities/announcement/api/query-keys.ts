import type { SearchPostParams } from './search-post'
import type { SearchParams } from '@/shared/api'
import type { PostItem } from '../model'

export const announcementPostQueryKeys = {
  all: ['announcement-post-all'] as const,
  postListAll: () => [...announcementPostQueryKeys.all, 'announcement-post-list-all'] as const,
  postList: (params: SearchParams) =>
    [...announcementPostQueryKeys.postListAll(), 'announcement-post-list', params] as const,
  pinnedPostList: () =>
    [...announcementPostQueryKeys.postListAll(), 'pinned-announcement-post-list'] as const,
  postDetailAll: () => [...announcementPostQueryKeys.all, 'announcement-post-detail'] as const,
  postDetail: (id: PostItem['id']) => [...announcementPostQueryKeys.postDetailAll(), id] as const,
  searchAll: () => [...announcementPostQueryKeys.all, 'announcement-post-search'] as const,
  search: (
    query: SearchPostParams['query'],
    type: SearchPostParams['type'],
    params: SearchPostParams['params'],
  ) => [...announcementPostQueryKeys.searchAll(), query, type, params] as const,
} as const
