import { List } from '@mantine/core'
import { DEFAULT_LINE_DELIMITER, TextParsingException } from '@/entities/text-parsing'
import { cn } from '@/shared/lib'
import { Icon } from '@/shared/ui'

export interface TextParsingResultErrorFallbackProps {
  errorList: TextParsingException[]
}

export const TextParsingResultErrorFallback: React.FC<TextParsingResultErrorFallbackProps> = ({
  errorList,
}) => {
  const lines = errorList[0].rawText.split(DEFAULT_LINE_DELIMITER)
  const errorLineIndexList = new Set(errorList.flatMap((error) => error.errorLineIndexArray ?? []))

  return (
    <div className="space-y-3 py-1">
      <div className="flex space-x-2">
        <Icon query="fluent:warning-28-regular" className="mt-0.5 size-5" />
        <p className="break-keep font-bold">아래의 이유로 텍스트 파싱에 실패했어요</p>
      </div>
      <List
        className="space-y-0 pl-3"
        icon={
          <span className="block size-1.5 rounded-full bg-[var(--mantine-color-placeholder)]" />
        }
        component="ul"
      >
        {errorList.map((error) => (
          <List.Item
            key={TextParsingException.extractMessage(error)}
            className="break-keep font-medium"
            component="li"
          >
            {TextParsingException.extractMessage(error)}
            {error.errorLineNumberArray && ` (${error.errorLineNumberArray.join(', ')}행)`}
          </List.Item>
        ))}
      </List>
      <pre className="mt-2 max-h-56 w-full overflow-auto rounded-md border border-solid border-red-300 bg-[var(--mantine-color-red-light)] py-2 text-sm dark:border-red-900">
        {lines.map((line, idx) => (
          <span
            key={idx}
            className={cn('flex pl-3', {
              'bg-[var(--mantine-color-red-light-hover)]': errorLineIndexList.has(idx),
            })}
          >
            <span className="w-6 flex-none pr-2 text-right font-mono text-dark-300 dark:text-dark-200">
              {idx + 1}
            </span>
            <span className="text-dark-900 dark:text-dark-50">{line}</span>
          </span>
        ))}
      </pre>
    </div>
  )
}
