import { Button } from '@mantine/core'
import { AdminContainerFallbackUI, Icon } from '@/shared/ui'

export interface AnnouncementDetailErrorFallbackProps {
  onReset: () => void
}

export const AnnouncementDetailErrorFallback: React.FC<AnnouncementDetailErrorFallbackProps> = ({
  onReset,
}) => {
  return (
    <AdminContainerFallbackUI
      query="fluent:warning-28-regular"
      comment="공지사항 상세 조회에 실패했어요"
      className="py-28"
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
