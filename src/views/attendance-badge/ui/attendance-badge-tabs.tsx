'use client'

import { Button, NavLink } from '@mantine/core'
import { ErrorBoundary } from 'react-error-boundary'
import {
  type ActiveBadgeIdStore,
  useActiveBadgeId,
  useAttendanceBadgeListSuspenseQuery,
  useResetAttendanceBadgeQuery,
} from '@/entities/attendance-badge'
import { type PropsWithClassName, type PropsWithClassNames, cn } from '@/shared/lib'
import { FallbackRender, Icon } from '@/shared/ui'

export type AttendanceBadgeTabsProps = PropsWithClassNames<
  'root' | 'list' | 'item' | 'button',
  PropsWithClassName
>

export const AttendanceBadgeTabsInner: React.FC<AttendanceBadgeTabsProps & ActiveBadgeIdStore> = ({
  activeBadgeId,
  setActiveBadgeId,
  classNames,
}) => {
  const { data: badgeList } = useAttendanceBadgeListSuspenseQuery()

  return (
    <FallbackRender render={badgeList.length <= 0} component={null}>
      <ul className={classNames?.list}>
        {badgeList.map((badge) => (
          <li key={badge.id} className={classNames?.item}>
            <NavLink
              component="button"
              color="gray"
              classNames={{ root: 'h-10 rounded-lg', label: 'font-medium' }}
              label={badge.name}
              leftSection={<>{badge.icon}</>}
              active={activeBadgeId === badge.id}
              onClick={() => setActiveBadgeId(badge.id)}
            />
          </li>
        ))}
      </ul>
    </FallbackRender>
  )
}

export const AttendanceBadgeTabs: React.FC<AttendanceBadgeTabsProps> = ({
  classNames,
  className,
}) => {
  const reset = useResetAttendanceBadgeQuery()
  const { activeBadgeId, setActiveBadgeId } = useActiveBadgeId()

  return (
    <div className={cn(classNames?.root, className)}>
      <ErrorBoundary
        FallbackComponent={({ resetErrorBoundary }) => (
          <Button
            variant="default"
            size="compact-md"
            leftSection={<Icon query="fluent:arrow-clockwise-16-regular" />}
            onClick={() => {
              reset()
              resetErrorBoundary()
            }}
          >
            재시도
          </Button>
        )}
      >
        <AttendanceBadgeTabsInner
          classNames={classNames}
          activeBadgeId={activeBadgeId}
          setActiveBadgeId={setActiveBadgeId}
        />
      </ErrorBoundary>
      {activeBadgeId !== null && (
        <Button
          variant="light"
          className={cn(classNames?.button)}
          onClick={() => setActiveBadgeId(null)}
        >
          배지 추가하기
        </Button>
      )}
    </div>
  )
}
