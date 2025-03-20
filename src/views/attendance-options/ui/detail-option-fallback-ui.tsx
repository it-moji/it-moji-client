'use client'

import { Button } from '@mantine/core'
import { type PropsWithClassName, cn } from '@/shared/lib'
import { type IconProps, Icon } from '@/shared/ui'

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

export interface DetailOptionListErrorFallbackProps {
  onReset: () => void
}

export const DetailOptionListErrorFallback: React.FC<DetailOptionListErrorFallbackProps> = ({
  onReset,
}) => {
  return (
    <DetailOptionListFallbackUI
      query="fluent:warning-28-regular"
      comment="상세 옵션 조회에 실패했어요"
    >
      <Button
        variant="default"
        size="compact-md"
        className="mx-auto mt-7"
        leftSection={<Icon query="fluent:arrow-clockwise-16-regular" />}
        onClick={onReset}
      >
        재시도
      </Button>
    </DetailOptionListFallbackUI>
  )
}

export const DetailOptionListEmptyFallback: React.FC = () => (
  <DetailOptionListFallbackUI query="fluent-emoji:thinking-face" comment="상세 옵션이 없어요" />
)
