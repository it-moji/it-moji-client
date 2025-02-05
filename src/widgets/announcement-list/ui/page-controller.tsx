'use client'

import { Group, Pagination } from '@mantine/core'
import Link from 'next/link'
import { GetPostListParamsSchema } from '@/entities/announcement'
import { createSearchParamsToURL } from '@/shared/lib'

export interface PageControllerProps {
  baseURL: string
  page: number
  total: number
}

export const PageController: React.FC<PageControllerProps> = ({ page, total, baseURL }) => {
  const href = createSearchParamsToURL(baseURL)
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (e.currentTarget.dataset.disabled) e.preventDefault()
  }

  return (
    <Pagination.Root
      total={total}
      getItemProps={(page) => ({
        component: Link,
        href: href([GetPostListParamsSchema.Enum.page, page]),
        onClick: handleClick,
      })}
    >
      <Group gap={8}>
        <Pagination.First component={Link} href={baseURL} onClick={handleClick} />
        <Pagination.Previous
          component={Link}
          href={href([GetPostListParamsSchema.Enum.page, page - 1])}
          onClick={handleClick}
        />
        <Pagination.Items />
        <Pagination.Next
          component={Link}
          href={href([GetPostListParamsSchema.Enum.page, page + 1])}
          onClick={handleClick}
        />
        <Pagination.Last
          component={Link}
          href={href([GetPostListParamsSchema.Enum.page, total])}
          onClick={handleClick}
        />
      </Group>
    </Pagination.Root>
  )
}
