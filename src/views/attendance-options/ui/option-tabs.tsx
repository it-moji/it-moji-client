'use client'

import { FloatingIndicator, Tabs } from '@mantine/core'
import { useState } from 'react'
import {
  type AttendanceOptionKey,
  AttendanceOptionKeySchema,
  ATTENDANCE_OPTIONS_LABEL,
} from '@/entities/attendance-option'
import type { PropsWithClassName } from '@/shared/lib'

export interface OptionTabsProps extends PropsWithClassName {
  selected: AttendanceOptionKey
  onSelect: (value: AttendanceOptionKey) => void
}

export const OptionTabs: React.FC<OptionTabsProps> = ({ selected, onSelect, className }) => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null)
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({})
  const setControlRef = (val: string) => (node: HTMLButtonElement) =>
    setControlsRefs((prev) => Object.assign(prev, { [val]: node }))

  return (
    <Tabs
      variant="none"
      className={className}
      value={selected}
      onChange={(value) => onSelect(value as AttendanceOptionKey)}
    >
      <Tabs.List ref={setRootRef} className="relative">
        {AttendanceOptionKeySchema.options.map((option) => (
          <Tabs.Tab
            key={option}
            value={option}
            px="sm"
            ref={setControlRef(option)}
            className="z-[1] font-medium text-gray-700 transition-colors data-[active]:text-black dark:text-gray-100 dark:data-[active]:text-white"
          >
            {ATTENDANCE_OPTIONS_LABEL[option]}
          </Tabs.Tab>
        ))}
        <FloatingIndicator
          target={controlsRefs[selected]}
          parent={rootRef}
          className="rounded-md border border-solid border-gray-200 bg-white shadow-sm dark:border-dark-400 dark:bg-dark-600"
        />
      </Tabs.List>
    </Tabs>
  )
}
