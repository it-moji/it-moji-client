import { SearchPostTypeSchema } from '../api/search-post'

export const SEARCH_TYPE_LABEL = {
  [SearchPostTypeSchema.Enum.TITLE]: '제목',
  [SearchPostTypeSchema.Enum.CONTENT]: '내용',
  [SearchPostTypeSchema.Enum.TITLE_CONTENT]: '제목 및 내용',
} as const
