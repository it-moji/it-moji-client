'use client'

import { Button, Group, Select } from '@mantine/core'
import { useState } from 'react'
import { useAttendanceBadgeListWithConditionsQuery } from '@/entities/attendance-badge'
import { useParsingResult, useIsTextParsingMutating } from '@/entities/text-parsing'
import { AdminContainer, AdminTitle, FallbackRender, Icon } from '@/shared/ui'
import { TextParsingResultEmpty } from './text-parsing-result-empty'
import { TEXT_PARSING_RESULT_FORM_ID, TextParsingResultForm } from './text-parsing-result-form'

export const TextParsingResult: React.FC = () => {
  const { data: badgeOptions } = useAttendanceBadgeListWithConditionsQuery()

  const [team, setTeam] = useState<string | null>(null)

  const result = useParsingResult()
  const isSubmitting = useIsTextParsingMutating()

  return (
    <AdminContainer className="h-fit w-full">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <AdminTitle className="mb-0 flex flex-none items-center">
          <Icon query="fluent-emoji:desktop-computer" className="mr-2" />
          결과 확인
        </AdminTitle>
        <Group gap="xs" className="flex-1" justify="flex-end" wrap="nowrap">
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
            onChange={(value) => setTeam(value ?? null)}
            disabled={isSubmitting}
          />
          <Button
            form={TEXT_PARSING_RESULT_FORM_ID}
            type="submit"
            disabled={result.length <= 0 || !team || isSubmitting}
          >
            반영하기
          </Button>
        </Group>
      </div>

      <div className="h-[40rem] flex-none overflow-y-auto rounded-lg border border-solid border-gray-300 p-4 dark:border-dark-400">
        <FallbackRender component={<TextParsingResultEmpty />} render={result.length <= 0}>
          <TextParsingResultForm badgeOptions={badgeOptions} team={team} />
        </FallbackRender>
      </div>
    </AdminContainer>
  )
}
