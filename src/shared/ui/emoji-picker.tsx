'use client'

import { useMantineColorScheme } from '@mantine/core'
import { EmojiStyle, type PickerProps } from 'emoji-picker-react'
import dynamic from 'next/dynamic'
import type { Theme } from 'emoji-picker-react'

const Picker = dynamic(
  () => {
    return import('emoji-picker-react')
  },
  { ssr: false },
)

export const EmojiPicker: React.FC<PickerProps> = (props) => {
  const { colorScheme } = useMantineColorScheme()

  return (
    <Picker
      theme={colorScheme as Theme}
      emojiStyle={EmojiStyle.NATIVE}
      skinTonesDisabled
      lazyLoadEmojis
      {...props}
    />
  )
}
