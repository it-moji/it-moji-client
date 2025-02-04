'use client'

import { Badge, Table } from '@mantine/core'
import { type PostItem, POST_CATEGORY_LABEL } from '@/entities/announcement'
import { cn, formatDateFromNow } from '@/shared/lib'

export interface AnnouncementItemProps extends PostItem {
  pinned?: boolean
}

export const AnnouncementItem: React.FC<AnnouncementItemProps> = ({
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
      {isPinned ? <>📌&nbsp;&nbsp;&nbsp;</> : null}
      {title}
    </Table.Td>
    <Table.Td className="text-center">{formatDateFromNow(createdAt)}</Table.Td>
    <Table.Td className="text-center">{viewCount}</Table.Td>
  </Table.Tr>
)
