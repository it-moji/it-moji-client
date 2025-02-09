'use client'

import { RichTextEditor } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import { type PropsWithClassName, cn } from '@/shared/lib'
import { DEFAULT_EXTENSIONS } from './editor.config'

import '@mantine/tiptap/styles.css'
import classes from './editor.module.css'

export type TextViewerProps = PropsWithClassName<{
  value: string
}>

export const TextViewer: React.FC<TextViewerProps> = ({ value, className }) => {
  const editor = useEditor({
    extensions: DEFAULT_EXTENSIONS,
    content: value,
    editable: false,
    immediatelyRender: false,
  })

  return (
    <RichTextEditor
      editor={editor}
      className={classes['editor-root']}
      classNames={{ root: cn('!border-0', className), content: '*:!p-0 !bg-transparent' }}
    >
      <RichTextEditor.Content />
    </RichTextEditor>
  )
}
