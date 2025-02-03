'use client'

import { Badge, Table } from '@mantine/core'
import { POST_CATEGORY_LABEL, type PostItem } from '@/entities/announcement'
import { formatDateFromNow } from '@/shared/lib'

export interface AnnouncementListProps extends React.PropsWithChildren {
  contents: PostItem[]
}

export const AnnouncementList: React.FC<AnnouncementListProps> = ({ contents }) => (
  <>
    {contents.map(({ id, title, postCategory, createdAt, viewCount }) => (
      <Table.Tr key={id}>
        <Table.Td className="text-center">
          <Badge variant="light">{POST_CATEGORY_LABEL[postCategory]}</Badge>
        </Table.Td>
        <Table.Td>{title}</Table.Td>
        <Table.Td className="text-center">{formatDateFromNow(createdAt)}</Table.Td>
        <Table.Td className="text-center">{viewCount}</Table.Td>
      </Table.Tr>
    ))}
  </>
)
