'use client'

import { Group, Pagination } from '@mantine/core'
import { GetPostListParamsSchema } from '@/entities/announcement'
import { createSearchParamsToURL } from '@/shared/lib'
import { LinkWithLoader } from '@/shared/ui'

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
      value={page}
      total={total}
      getItemProps={(page) => ({
        component: LinkWithLoader,
        href: href([GetPostListParamsSchema.Enum.page, page]),
        onClick: handleClick,
      })}
    >
      <Group gap={8}>
        <Pagination.First component={LinkWithLoader} href={baseURL} onClick={handleClick} />
        <Pagination.Previous
          component={LinkWithLoader}
          href={href([GetPostListParamsSchema.Enum.page, page - 1])}
          onClick={handleClick}
        />
        <Pagination.Items />
        <Pagination.Next
          component={LinkWithLoader}
          href={href([GetPostListParamsSchema.Enum.page, page + 1])}
          onClick={handleClick}
        />
        <Pagination.Last
          component={LinkWithLoader}
          href={href([GetPostListParamsSchema.Enum.page, total])}
          onClick={handleClick}
        />
      </Group>
    </Pagination.Root>
  )
}
