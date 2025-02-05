import { NavLink } from '@mantine/core'
import Link from 'next/link'
import { Icon } from '@/shared/ui'
import { ROUTES } from '@/shared/config'

export const SideBar: React.FC = () => {
  return (
    <ul>
      <li>
        <NavLink
          href={ROUTES.ADMIN.ROOT}
          classNames={{ root: 'h-10 rounded-lg', label: 'font-medium' }}
          component={Link}
          label="홈"
          leftSection={<Icon query="fluent-emoji:house" />}
        />
      </li>
      <li>
        <NavLink
          href={ROUTES.ADMIN.ANNOUNCEMENT.ROOT}
          classNames={{ root: 'h-10 rounded-lg', label: 'font-medium' }}
          component={Link}
          label="공지사항 관리"
          leftSection={<Icon query="fluent-emoji:pushpin" />}
        />
      </li>
      <li>
        <NavLink
          href={ROUTES.ADMIN.ATTENDANCE.ROOT}
          classNames={{ root: 'h-10 rounded-lg', label: 'font-medium' }}
          component={Link}
          label="출석 관리"
          leftSection={<Icon query="fluent-emoji:check-mark-button" />}
        />
      </li>
    </ul>
  )
}
