'use client'

import { Button, Group, Select } from '@mantine/core'
import { useState } from 'react'
import type { GetAttendanceBadgeDetailResponse } from '@/entities/attendance-badge'
import { useParsingResult, useParsingFormSubmitting } from '@/entities/text-parsing'
import { AdminContainer, AdminTitle, FallbackRender, Icon } from '@/shared/ui'
import { TextParsingResultEmpty } from './text-parsing-result-empty'
import { TextParsingResultForm } from './text-parsing-result-form'

export interface TextParsingResultProps {
  badgeOptions: GetAttendanceBadgeDetailResponse['data'][]
}

export const TextParsingResult = ({ badgeOptions }: TextParsingResultProps) => {
  const [team, setTeam] = useState<string | null>(null)

  const result = useParsingResult()
  const isSubmitting = useParsingFormSubmitting()

  return (
    <AdminContainer className="h-fit w-full">
      <AdminTitle className="mb-6 flex items-center justify-between">
        <div className="flex flex-none items-center">
          <Icon query="fluent-emoji:desktop-computer" className="mr-2" />
          결과 확인
        </div>
        <Group gap="xs" justify="flex-end">
          <Select
            data={[
              { value: '1', label: '1팀' },
              { value: '2', label: '2팀' },
              { value: '3', label: '3팀' },
              { value: '4', label: '4팀' },
              { value: '5', label: '5팀' },
            ]}
            className="w-32 font-normal"
            placeholder="팀 선택"
            checkIconPosition="right"
            onChange={(_, option) => setTeam(option?.value ?? null)}
            disabled={isSubmitting}
          />
          <Button
            form="parsing-result-form"
            type="submit"
            disabled={result.length <= 0 || !team || isSubmitting}
          >
            반영하기
          </Button>
        </Group>
      </AdminTitle>

      <div className="h-[650px] flex-none overflow-y-auto rounded-lg border border-solid border-gray-300 p-4 dark:border-dark-400">
        <FallbackRender component={<TextParsingResultEmpty />} render={result.length <= 0}>
          <TextParsingResultForm badgeOptions={badgeOptions} team={team} />
        </FallbackRender>
      </div>
    </AdminContainer>
  )
}
