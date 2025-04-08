'use client'

import { TextInput } from '@mantine/core'
import { useClickOutside, useDisclosure } from '@mantine/hooks'
import { type PropsWithClassName, cn } from '@/shared/lib'
import { EmojiPicker } from '@/shared/ui'

export interface AttendanceBadgeIconInputProps extends PropsWithClassName {
  value: string
  onChange: (value: string) => void
  error?: boolean
  disabled?: boolean
}

export const AttendanceBadgeIconInput: React.FC<AttendanceBadgeIconInputProps> = ({
  value,
  onChange,
  className,
  error: isError,
  disabled: isDisabled,
}) => {
  const [isEmojiPickerOpen, { close, toggle }] = useDisclosure()
  const emojiPickerContainerRef = useClickOutside<HTMLDivElement>(close)

  return (
    <div ref={emojiPickerContainerRef} className={cn('relative', className)}>
      <TextInput
        className="w-12"
        placeholder="#️⃣"
        error={isError}
        onClick={toggle}
        readOnly
        value={value}
        disabled={isDisabled}
      />
      <EmojiPicker
        className="!absolute -left-2 top-10 z-30"
        onEmojiClick={(data) => {
          onChange(data.emoji)
          close()
        }}
        open={isEmojiPickerOpen}
      />
    </div>
  )
}
