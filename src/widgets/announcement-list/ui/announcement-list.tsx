import type { PostItem } from '@/entities/announcement'
import { AnnouncementItem } from './announcement-item'

export interface AnnouncementListProps extends React.PropsWithChildren {
  contents: PostItem[]
  pinned?: boolean
}

export const AnnouncementList: React.FC<AnnouncementListProps> = ({ contents, pinned }) => (
  <>
    {contents.map((props) => (
      <AnnouncementItem key={props.id} {...props} pinned={pinned} />
    ))}
  </>
)
