import { Divider } from '@mantine/core'
import Link from 'next/link'
import type { PostDetail } from '@/entities/announcement'
import { ROUTES } from '@/shared/config'
import { formatDateDetail } from '@/shared/lib'
import { Icon } from '@/shared/ui'

export interface RelatedLinkProps {
  value: PostDetail['related']
}

export const RelatedLink: React.FC<RelatedLinkProps> = ({ value: { prev, next } }) => (
  <>
    <Divider />
    {prev && (
      <>
        <div className="flex items-center justify-between space-x-6 p-2 md:space-x-4">
          <span className="relative flex items-center space-x-2">
            <Icon query="fluent:arrow-upload-16-regular" />
            <span className="sr-only md:not-sr-only">이전글</span>
          </span>
          <p className="flex flex-1 flex-col md:flex-row md:items-center md:justify-between">
            <Link
              href={ROUTES.ADMIN.ANNOUNCEMENT.DETAIL(prev.id)}
              title={`페이지 이동: ${prev.title}`}
              className="flex-1 break-keep py-2 hover:underline md:px-2"
            >
              {prev.title}
            </Link>
            <span className="text-sm text-gray-600 md:text-base dark:text-dark-200">
              {formatDateDetail(prev.createdAt)}
            </span>
          </p>
        </div>
        <Divider />
      </>
    )}
    {next && (
      <>
        <div className="flex items-center justify-between space-x-6 p-2 md:space-x-4">
          <span className="relative flex items-center space-x-2">
            <Icon query="fluent:arrow-upload-16-regular" className="rotate-180" />
            <span className="sr-only md:not-sr-only">다음글</span>
          </span>
          <p className="flex flex-1 flex-col md:flex-row md:items-center md:justify-between">
            <Link
              href={ROUTES.ADMIN.ANNOUNCEMENT.DETAIL(next.id)}
              title={`페이지 이동: ${next.title}`}
              className="flex-1 break-keep py-2 hover:underline md:px-2"
            >
              {next.title}
            </Link>
            <span className="text-sm text-gray-600 md:text-base dark:text-dark-200">
              {formatDateDetail(next.createdAt)}
            </span>
          </p>
        </div>
        <Divider />
      </>
    )}
  </>
)
