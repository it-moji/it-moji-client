import { NavLink } from '@mantine/core'
import { ROUTES } from '@/shared/config'
import { Icon, LinkWithLoader } from '@/shared/ui'

export interface SideBarProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const SideBar: React.FC<SideBarProps> = ({ onClick }) => (
  <ul>
    <li>
      <NavLink
        href={ROUTES.ADMIN()}
        classNames={{ root: 'h-10 rounded-lg', label: 'font-medium' }}
        component={LinkWithLoader}
        label="홈"
        leftSection={<Icon query="fluent-emoji:house" />}
        onClick={onClick}
      />
    </li>
    <li>
      <NavLink
        href={ROUTES.ADMIN.ANNOUNCEMENT()}
        classNames={{ root: 'h-10 rounded-lg', label: 'font-medium' }}
        component={LinkWithLoader}
        label="공지사항 관리"
        leftSection={<Icon query="fluent-emoji:pushpin" />}
        onClick={onClick}
      />
    </li>
    <li>
      <NavLink
        href={ROUTES.ADMIN.ATTENDANCE()}
        classNames={{ root: 'h-10 rounded-lg', label: 'font-medium' }}
        component={LinkWithLoader}
        label="출석 관리"
        leftSection={<Icon query="fluent-emoji:check-mark-button" />}
        onClick={onClick}
      />
    </li>
  </ul>
)
