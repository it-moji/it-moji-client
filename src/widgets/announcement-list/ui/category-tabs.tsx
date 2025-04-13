'use client'

import { FloatingIndicator, Tabs } from '@mantine/core'
import React, { useState } from 'react'
import {
  type PostCategory,
  POST_CATEGORY_LABEL,
  PostCategorySchema,
  GetPostListParamsSchema,
} from '@/entities/announcement'
import { createSearchParamsToURL, useRouter } from '@/shared/lib'

export interface CategoryTabsProps {
  baseURL: string
  current: PostCategory | null
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ baseURL, current }) => {
  const all = 'ALL'
  const selected = current ?? all
  type ExtendedPostCategory = PostCategory | typeof all

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null)
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({})
  const setControlRef = (val: string) => (node: HTMLButtonElement) =>
    setControlsRefs((prev) => Object.assign(prev, { [val]: node }))

  const { push } = useRouter()
  const onSubmit = (category: ExtendedPostCategory) => {
    push(
      category === all
        ? baseURL
        : createSearchParamsToURL(baseURL)([GetPostListParamsSchema.Enum.category, category]),
    )
  }

  return (
    <Tabs
      variant="none"
      value={selected}
      onChange={(category) => onSubmit(category as ExtendedPostCategory)}
    >
      <Tabs.List ref={setRootRef} className="relative">
        {([all, ...PostCategorySchema.options] as const).map((category) => (
          <Tabs.Tab
            key={category}
            value={category}
            ref={setControlRef(category)}
            className="z-[1] font-medium text-gray-700 transition-colors data-[active]:text-black dark:text-gray-100 dark:data-[active]:text-white"
          >
            {category === all ? '전체' : POST_CATEGORY_LABEL[category]}
          </Tabs.Tab>
        ))}
        <FloatingIndicator
          target={controlsRefs[selected]}
          parent={rootRef}
          className="rounded-md border border-solid border-gray-200 bg-white shadow-sm dark:border-dark-400 dark:bg-dark-600"
        />
      </Tabs.List>
    </Tabs>
  )
}
