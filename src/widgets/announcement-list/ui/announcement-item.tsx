'use client'

import { Badge, Button, Table } from '@mantine/core'
import Link from 'next/link'
import { type PostItem, POST_CATEGORY_LABEL } from '@/entities/announcement'
import { ROUTES } from '@/shared/config'
import { cn, formatDateFromNow } from '@/shared/lib'
import { DeleteButton } from './delete-button'

export interface AnnouncementItemProps extends PostItem {
  pinned?: boolean
}

export const AnnouncementItem: React.FC<AnnouncementItemProps> = ({
  id,
  title,
  createdAt,
  viewCount,
  postCategory,
  pinned: isPinned = false,
}) => (
  <Table.Tr className={cn(isPinned && 'bg-gray-50 dark:bg-dark-700')}>
    <Table.Td className="text-center">
      <Badge variant="light" color={isPinned ? 'gray' : 'blue'}>
        {POST_CATEGORY_LABEL[postCategory]}
      </Badge>
    </Table.Td>
    <Table.Td>
      <Link
        href={ROUTES.ADMIN.ANNOUNCEMENT.DETAIL(id)}
        title={`페이지 이동: ${title}`}
        className="hover:underline"
      >
        {isPinned ? <>📌&nbsp;&nbsp;&nbsp;</> : null}
        {title}
      </Link>
    </Table.Td>
    <Table.Td className="text-center">{formatDateFromNow(createdAt)}</Table.Td>
    <Table.Td className="text-center">{viewCount}</Table.Td>
    <Table.Td className="text-center">
      <Button
        href={ROUTES.ADMIN.ANNOUNCEMENT.MODIFY(id)}
        title={`수정하러 가기: ${title}`}
        component={Link}
        size="xs"
        variant="light"
        color="gray"
      >
        수정
      </Button>
    </Table.Td>
    <Table.Td className="text-center">
      <DeleteButton id={id} size="xs" variant="light" />
    </Table.Td>
  </Table.Tr>
)
