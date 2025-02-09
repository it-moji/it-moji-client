'use server'

import { revalidateTag } from 'next/cache'
import type { CreatePostBody } from './create-post'
import { POST_TAG } from './endpoint'

export const createPostWithRevalidate = async (body: Pick<CreatePostBody, 'isPinned'>) => {
  const tags: string[] = [POST_TAG.LIST, POST_TAG.SEARCH]

  if (body.isPinned) {
    tags.push(POST_TAG.PINNED_LIST)
  }

  tags.forEach(revalidateTag)
}
