import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '공지사항 작성',
}

const CreateAnnouncementFormPageLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>{children}</>
)

export default CreateAnnouncementFormPageLayout
