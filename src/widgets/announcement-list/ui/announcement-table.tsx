'use client'

import { Table } from '@mantine/core'
import { type PropsWithClassName, cn } from '@/shared/lib'

export const AnnouncementTable: React.FC<React.PropsWithChildren<PropsWithClassName>> = ({
  className,
  children,
}) => (
  <Table className={cn('relative', className)}>
    <caption className="sr-only">
      카테고리, 제목, 날짜, 조회수로 구성된 ITMOJI 공지사항에 대한 표에요
    </caption>
    <colgroup>
      <col />
      <col width="54%" />
      <col />
      <col />
      <col />
    </colgroup>
    <Table.Thead>
      <Table.Tr>
        <Table.Th className="text-center">카테고리</Table.Th>
        <Table.Th>제목</Table.Th>
        <Table.Th className="text-center">날짜</Table.Th>
        <Table.Th className="text-center">조회수</Table.Th>
        <Table.Th className="text-center">삭제</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>{children}</Table.Tbody>
  </Table>
)
