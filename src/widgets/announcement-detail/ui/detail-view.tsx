import { Badge, Divider, Group, Title } from '@mantine/core'
import { POST_CATEGORY_LABEL, type PostDetail } from '@/entities/announcement'
import { formatDateDetail } from '@/shared/lib'
import { Icon, TextViewer } from '@/shared/ui'
import { RelatedLink } from './related-link'

export interface DetailViewProps {
  post: PostDetail
}

export const DetailView: React.FC<DetailViewProps> = ({ post }) => {
  const createdAt = formatDateDetail(post.createdAt)
  const updatedAt = formatDateDetail(post.modifiedAt)

  return (
    <div>
      <Title order={2}>{post.title}</Title>
      <Group mt="md" mb="lg" gap={12} className="px-0.5">
        <span className="relative break-keep pl-7">
          <Icon query="fluent-emoji:tear-off-calendar" className="absolute left-0 top-0.5 size-5" />
          <span className="sr-only">날짜</span>
          {`${createdAt}${createdAt !== updatedAt ? ` (${updatedAt} 수정됨)` : ''}`}
        </span>
        <span className="relative mr-1 flex items-center space-x-1.5">
          <Icon query="fluent-emoji:eyes" className="mb-1 size-5" />
          <span className="sr-only">조회수</span>
          <span>{post.viewCount}</span>
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="light" size="lg">
            {POST_CATEGORY_LABEL[post.postCategory]}
          </Badge>
          {post.isPinned && (
            <Badge variant="light" color="gray" size="lg">
              고정됨
            </Badge>
          )}
        </div>
      </Group>
      <Divider />
      <div className="px-0.5 pb-12 pt-8">
        <TextViewer value={post.content} />
      </div>
      <RelatedLink value={post.related} />
    </div>
  )
}
