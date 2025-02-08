import { Link } from '@mantine/tiptap'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import YouTube from '@tiptap/extension-youtube'
import StarterKit from '@tiptap/starter-kit'
import type { RichTextEditorLabels } from '@mantine/tiptap'

export const COLOR_LABEL: Record<string, string> = {
  placeholder: '회색',
  'red-text': '빨간색',
  'pink-text': '분홍색',
  'grape-text': '자주색',
  'violet-text': '보라색',
  'indigo-text': '남색',
  'blue-text': '파란색',
  'green-text': '초록색',
  'lime-text': '연두색',
  'yellow-text': '노란색',
  'orange-text': '주황색',
}

const _extractColor = (color: string) =>
  Object.entries(COLOR_LABEL).find(([key]) => color.includes(key))?.[1] || color

export const DEFAULT_EDITOR_LABEL: RichTextEditorLabels = {
  // Controls labels
  linkControlLabel: '링크',
  colorPickerControlLabel: '글자색',
  highlightControlLabel: '형광펜',
  colorControlLabel: (color) => `글자색 변경: ${_extractColor(color)}`,
  boldControlLabel: '굵기',
  italicControlLabel: '기울이기',
  underlineControlLabel: '밑줄',
  strikeControlLabel: '취소선',
  clearFormattingControlLabel: '형식 제거',
  unlinkControlLabel: '링크 제거 ',
  bulletListControlLabel: '글머리 기호',
  orderedListControlLabel: '순서 기호',
  h1ControlLabel: '제목 1',
  h2ControlLabel: '제목 2',
  h3ControlLabel: '제목 3',
  h4ControlLabel: '제목 4',
  h5ControlLabel: '제목 5',
  h6ControlLabel: '제목 6',
  blockquoteControlLabel: '인용',
  alignLeftControlLabel: '좌측 정렬',
  alignCenterControlLabel: '중앙 정렬',
  alignRightControlLabel: '우측 정렬',
  alignJustifyControlLabel: '양쪽 정렬',
  codeControlLabel: '코드',
  codeBlockControlLabel: '코드 블록',
  subscriptControlLabel: '아래첨자',
  superscriptControlLabel: '위첨자',
  unsetColorControlLabel: '글자색 해제',
  hrControlLabel: '구분선',
  undoControlLabel: '되돌리기',
  redoControlLabel: '다시 실행',

  // Task list
  tasksControlLabel: '작업 목록',
  tasksSinkLabel: '들여쓰기',
  tasksLiftLabel: '내어쓰기',

  // Link editor
  linkEditorInputLabel: 'URL 입력',
  linkEditorInputPlaceholder: 'https://example.com/',
  linkEditorExternalLink: '새로운 탭에서 열기',
  linkEditorInternalLink: '기존 탭에서 열기',
  linkEditorSave: '저장',

  // Color picker control
  colorPickerCancel: '취소',
  colorPickerClear: '글자색 해제',
  colorPickerColorPicker: '글자색 추출',
  colorPickerPalette: '색상 팔레트',
  colorPickerSave: '저장',
  colorPickerColorLabel: (color) => `글자색 변경: ${_extractColor(color)}`,
}

export const DEFAULT_EXTENSIONS = [
  StarterKit,
  Underline,
  Link,
  Superscript,
  SubScript,
  Highlight,
  Color,
  TextStyle,
  Image.configure({ inline: true }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  YouTube.configure({ inline: false }),
]
