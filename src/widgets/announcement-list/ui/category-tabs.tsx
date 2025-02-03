'use client'

import { FloatingIndicator, Tabs } from '@mantine/core'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {
  type PostCategory,
  POST_CATEGORY_LABEL,
  PostCategorySchema,
  PostListParamsSchema,
} from '@/entities/announcement'
import { createSearchParamsToURL } from '@/shared/lib'
import classes from './category-tabs.module.css'

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

  const onSubmit = (category: ExtendedPostCategory) =>
    category === all
      ? push(baseURL)
      : push(createSearchParamsToURL(baseURL)([PostListParamsSchema.Enum.category, category]))

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
            className={classes.tab}
          >
            {category === all ? '전체' : POST_CATEGORY_LABEL[category]}
          </Tabs.Tab>
        ))}
        <FloatingIndicator
          target={controlsRefs[selected]}
          parent={rootRef}
          className={classes.indicator}
        />
      </Tabs.List>
    </Tabs>
  )
}
