'use client'

import { InputLabel, NavLink, type NavLinkProps } from '@mantine/core'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/shared/config'
import { ExternalLink, Icon, LinkWithLoader } from '@/shared/ui'

export interface SideBarProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const SideBar: React.FC<SideBarProps> = ({ onClick }) => {
  const pathname = usePathname()

  const props: NavLinkProps = {
    color: 'gray',
    classNames: { root: 'h-10 rounded-lg', label: 'font-medium' },
  }
  const propsWithClickHandler: NavLinkProps = { ...props, onClick }

  return (
    <>
      <NavLink
        href={ROUTES.ADMIN()}
        active={pathname === ROUTES.ADMIN()}
        component={LinkWithLoader}
        label="홈"
        leftSection={<Icon query="fluent-emoji:house" />}
        {...propsWithClickHandler}
      />
      <InputLabel component="h2" className="mb-2 mt-5 px-1">
        스터디 관리
      </InputLabel>
      <ul className="space-y-1">
        <li>
          <NavLink
            href={ROUTES.ADMIN.ANNOUNCEMENT()}
            active={pathname.startsWith(ROUTES.ADMIN.ANNOUNCEMENT())}
            component={LinkWithLoader}
            label="공지사항 관리"
            leftSection={<Icon query="fluent-emoji:pushpin" />}
            {...propsWithClickHandler}
          />
        </li>
        <li>
          <NavLink
            component="button"
            active={pathname.startsWith(ROUTES.ADMIN.ATTENDANCE())}
            label="출석 관리"
            leftSection={<Icon query="fluent-emoji:check-mark-button" />}
            childrenOffset={16}
            defaultOpened
            {...props}
          >
            <NavLink
              // TODO: 추후 권한 별 접근 제한 기능 추가
              href={ROUTES.ADMIN.ATTENDANCE.OPTIONS()}
              active={pathname.startsWith(ROUTES.ADMIN.ATTENDANCE.OPTIONS())}
              component={LinkWithLoader}
              label="출석 및 배지 기준 설정"
              className="mt-1"
              leftSection={<Icon query="fluent-emoji:trophy" />}
              rightSection={
                <Icon
                  query="fluent:lock-closed-24-regular"
                  className="text-gray-600 dark:text-dark-300"
                />
              }
              {...propsWithClickHandler}
            />
            <NavLink
              href={ROUTES.ADMIN.ATTENDANCE.TEXT_PARSING()}
              active={pathname.startsWith(ROUTES.ADMIN.ATTENDANCE.TEXT_PARSING())}
              component={LinkWithLoader}
              label="텍스트 분석 및 적용"
              className="mt-1"
              leftSection={<Icon query="fluent-emoji:bookmark-tabs" />}
              {...propsWithClickHandler}
            />
          </NavLink>
        </li>
      </ul>
      <InputLabel component="h2" className="mb-2 mt-5 px-1">
        개발자 문서
      </InputLabel>
      <ul className="space-y-1">
        <li>
          <NavLink
            href={ROUTES.ADMIN.DOCS.STORYBOOK()}
            component={ExternalLink}
            label="StoryBook"
            leftSection={<Icon query="logos:storybook-icon" />}
            rightSection={
              <Icon
                query="fluent:tab-desktop-multiple-24-regular"
                className="text-gray-600 dark:text-dark-300"
              />
            }
            {...propsWithClickHandler}
          />
        </li>
        <li>
          <NavLink
            href={ROUTES.ADMIN.DOCS.SWAGGER()}
            component={ExternalLink}
            label="Swagger"
            leftSection={<Icon query="logos:swagger" />}
            rightSection={
              <Icon
                query="fluent:tab-desktop-multiple-24-regular"
                className="text-gray-600 dark:text-dark-300"
              />
            }
            {...propsWithClickHandler}
          />
        </li>
      </ul>
    </>
  )
}
