import { Text } from '@mantine/core'
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
  const errorLineIndexList = errorList.flatMap((error) => error.errorLineIndexArray)

  return (
    <div className="flex flex-col items-center gap-3 pt-3">
      <Icon query="fluent:warning-28-regular" className="size-20" />
      <div className="space-y-0 text-center">
        {errorList.map((error) => (
          <Text key={TextParsingException.extractMessage(error)} className="font-medium">
            {error.errorLineNumberArray && `[${error.errorLineNumberArray?.join(', ')}행] `}
            {TextParsingException.extractMessage(error)}
          </Text>
        ))}
      </div>
      <div className="mt-2 max-h-56 w-full overflow-auto rounded-md border border-solid border-red-300 bg-red-100 py-2 text-sm dark:border-rose-200/20 dark:bg-rose-300/20">
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={cn('flex pl-3', {
              'bg-red-300 dark:bg-rose-600/30': errorLineIndexList.includes(idx),
            })}
          >
            <div className="w-6 flex-none pr-2 text-right font-mono text-dark-300 dark:text-dark-200">
              {idx + 1}
            </div>
            <span className="text-dark-900 dark:text-dark-50">{line}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
