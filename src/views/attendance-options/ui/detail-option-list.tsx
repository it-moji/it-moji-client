'use client'

import {
  type AttendanceOptionKey,
  useOptionDetailSuspenseQuery,
} from '@/entities/attendance-option'
import { type PropsWithClassName, cn } from '@/shared/lib'
import { type IconProps, Icon, FallbackRender } from '@/shared/ui'
import { DetailOptionItem } from './detail-option-item'

export interface DetailOptionListProps {
  optionKey: AttendanceOptionKey
}

export const DetailOptionList: React.FC<DetailOptionListProps> = ({ optionKey }) => {
  const { data } = useOptionDetailSuspenseQuery({ optionKey })

  return (
    <FallbackRender
      component={
        <DetailOptionListFallbackUI
          query="fluent-emoji:thinking-face"
          comment="상세 옵션이 없어요"
        />
      }
      render={data.length <= 0}
    >
      <ul className="w-full space-y-3">
        {data.map((detailOption) => (
          <li key={detailOption.id}>
            <DetailOptionItem {...detailOption} optionKey={optionKey} />
          </li>
        ))}
      </ul>
    </FallbackRender>
  )
}

export interface DetailOptionListFallbackUIProps
  extends Pick<IconProps, 'query'>,
    React.PropsWithChildren<PropsWithClassName> {
  comment: string
}

export const DetailOptionListFallbackUI: React.FC<DetailOptionListFallbackUIProps> = ({
  query,
  comment,
  children,
  className,
}) => (
  <div className={cn('flex w-full flex-col items-center justify-center pb-4', className)}>
    <Icon query={query} className="size-7 text-gray-600 dark:text-dark-300" />
    <p className="mt-3 break-keep font-medium text-gray-600 dark:text-dark-300">{comment}</p>
    {children}
  </div>
)
