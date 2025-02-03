'use client'

import { Group, Pagination } from '@mantine/core'
import Link from 'next/link'
import { PostListParamsSchema } from '@/entities/announcement'
import { createSearchParamsToURL } from '@/shared/lib'

export interface PageControllerProps {
  baseURL: string
  page: number
  total: number
}

export const PageController: React.FC<PageControllerProps> = ({ page, total, baseURL }) => {
  const href = createSearchParamsToURL(baseURL)

  return (
    <Pagination.Root
      total={total}
      getItemProps={(page) => ({
        component: Link,
        href: href([PostListParamsSchema.Enum.page, page]),
      })}
    >
      <Group gap={8}>
        <Pagination.First component={Link} href={baseURL} />
        <Pagination.Previous
          component={Link}
          href={href([PostListParamsSchema.Enum.page, page - 1])}
        />
        <Pagination.Items />
        <Pagination.Next component={Link} href={href([PostListParamsSchema.Enum.page, page + 1])} />
        <Pagination.Last component={Link} href={href([PostListParamsSchema.Enum.page, total])} />
      </Group>
    </Pagination.Root>
  )
}
