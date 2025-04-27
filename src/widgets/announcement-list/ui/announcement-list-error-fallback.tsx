import { Button } from '@mantine/core'
import { AdminContainerFallbackUI, Icon } from '@/shared/ui'

export interface AnnouncementListErrorFallbackProps {
  onReset: () => void
}

export const AnnouncementListErrorFallback: React.FC<AnnouncementListErrorFallbackProps> = ({
  onReset,
}) => {
  return (
    <AdminContainerFallbackUI
      query="fluent:warning-28-regular"
      comment="공지사항 목록 조회에 실패했어요"
      className="pb-32 pt-16"
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
