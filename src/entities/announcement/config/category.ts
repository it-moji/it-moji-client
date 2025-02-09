import { PostCategorySchema } from '../model'

export const POST_CATEGORY_LABEL = {
  [PostCategorySchema.Enum.NOTICE]: '공지사항',
  [PostCategorySchema.Enum.UPDATE]: '업데이트',
  [PostCategorySchema.Enum.EVENT]: '이벤트',
  [PostCategorySchema.Enum.MAINTENANCE]: '점검',
} as const
