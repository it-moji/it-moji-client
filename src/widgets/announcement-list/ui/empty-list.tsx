import { Icon } from '@/shared/ui'

export interface EmptyListProps {
  comment?: string
}

export const EmptyList: React.FC<EmptyListProps> = ({ comment }) => (
  <tr>
    <td colSpan={4}>
      <div className="flex flex-col items-center justify-center space-y-6 px-5 py-24">
        <div className="flex items-center justify-center rounded-full border border-solid border-gray-300 bg-gray-50 p-8 dark:border-dark-400 dark:bg-dark-700">
          <Icon query="fluent-emoji:zany-face" className="size-16" />
        </div>
        <p className="break-keep text-center text-sm md:text-base">
          {comment || '공지사항이 없어요 ㅠ'}
        </p>
      </div>
    </td>
  </tr>
)
