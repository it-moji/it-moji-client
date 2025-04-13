'use client'

import { Button } from '@mantine/core'
import { AdminContainerFallbackUI, Icon } from '@/shared/ui'

export interface DetailOptionListErrorFallbackProps {
  onReset: () => void
}

export const DetailOptionListErrorFallback: React.FC<DetailOptionListErrorFallbackProps> = ({
  onReset,
}) => {
  return (
    <AdminContainerFallbackUI
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
    </AdminContainerFallbackUI>
  )
}

export const DetailOptionListEmptyFallback: React.FC = () => (
  <AdminContainerFallbackUI query="fluent-emoji:thinking-face" comment="상세 옵션이 없어요" />
)
