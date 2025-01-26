import { NavLink } from '@mantine/core'
import Link from 'next/link'
import { Icon } from '@/shared/ui'

export const SideBar: React.FC = () => {
  return (
    <ul>
      <li>
        <NavLink
          href="/admin"
          classNames={{ root: 'h-10 rounded-lg', label: 'font-medium' }}
          component={Link}
          label="홈"
          leftSection={<Icon icon="fluent-emoji:house" />}
        />
      </li>
      <li>
        <NavLink
          href="/admin/announcement"
          classNames={{ root: 'h-10 rounded-lg', label: 'font-medium' }}
          component={Link}
          label="공지사항 관리"
          leftSection={<Icon icon="fluent-emoji:pushpin" />}
        />
      </li>
      <li>
        <NavLink
          href="/admin/attendance"
          classNames={{ root: 'h-10 rounded-lg', label: 'font-medium' }}
          component={Link}
          label="출석 관리"
          leftSection={<Icon icon="fluent-emoji:check-mark-button" />}
        />
      </li>
    </ul>
  )
}
