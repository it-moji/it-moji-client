'use client'

import { useWindowEvent } from '@mantine/hooks'
import { RichTextEditor } from '@mantine/tiptap'
import Placeholder from '@tiptap/extension-placeholder'
import { BubbleMenu, useEditor } from '@tiptap/react'
import { COLOR_LABEL, DEFAULT_EDITOR_LABEL, DEFAULT_EXTENSIONS } from './editor.config'

import '@mantine/tiptap/styles.css'
import classes from './editor.module.css'

export interface TextEditorProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  onChange?: (value: string) => void
}

export const TextEditor: React.FC<TextEditorProps> = ({
  value = '',
  defaultValue,
  placeholder = '텍스트를 입력해주세요',
  onChange,
}) => {
  // eslint-disable-next-line react-compiler/react-compiler
  'use no memo'

  const editor = useEditor({
    extensions: [...DEFAULT_EXTENSIONS, Placeholder.configure({ placeholder })],
    content: defaultValue || value,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editable: true,
    immediatelyRender: false,
  })

  useWindowEvent('beforeunload', (event) => {
    if (editor && editor.getHTML() !== '<p></p>') {
      const confirmationMessage = '변경사항이 저장되지 않을 수 있어요'
      event.returnValue = confirmationMessage

      return confirmationMessage
    }
  })

  return (
    <RichTextEditor
      editor={editor}
      className={classes['editor-root']}
      labels={DEFAULT_EDITOR_LABEL}
    >
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.ColorPicker
            colors={Object.keys(COLOR_LABEL).map((key) => `var(--mantine-color-${key})`)}
          />
          <RichTextEditor.UnsetColor />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      {editor && (
        <BubbleMenu editor={editor}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
      )}

      <RichTextEditor.Content />
    </RichTextEditor>
  )
}
