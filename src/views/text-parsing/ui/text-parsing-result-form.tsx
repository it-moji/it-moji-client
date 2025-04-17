'use client'

import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import type { GetAttendanceBadgeListWithConditionsResponseData } from '@/entities/attendance-badge'
import {
  type EditableParsingResult,
  type PostTextParsingResult,
  useParsingResult,
  useIsTextParsingMutating,
} from '@/entities/text-parsing'
import { omit } from '@/shared/lib'
import { FallbackRender } from '@/shared/ui'
import { TextParsingResultErrorFallback } from './text-parsing-result-fallback-ui'
import { TextParsingResultFormFields } from './text-parsing-result-form-fields'

export const TEXT_PARSING_RESULT_FORM_ID = 'parsing-result-form'

export interface TextParsingResultFormProps {
  badgeOptions: GetAttendanceBadgeListWithConditionsResponseData
  team: string | null
}

export const TextParsingResultForm: React.FC<TextParsingResultFormProps> = ({
  badgeOptions,
  team,
}) => {
  const result = useParsingResult()

  const isSubmitting = useIsTextParsingMutating()

  const { setInitialValues, reset, ...form } = useForm({
    mode: 'controlled',
    initialValues: { result },
    enhanceGetInputProps: () => ({ disabled: isSubmitting }),
  })

  const handleSave = async (parsingResultList: EditableParsingResult[]) => {
    for (const parsingResult of parsingResultList) {
      if (!parsingResult.name.trim()) {
        toast.error('이름을 모두 입력해주세요')
        return
      }

      if (!parsingResult.badgeId) {
        toast.error('배지를 모두 선택해주세요')
        return
      }
    }

    const body = parsingResultList.map<PostTextParsingResult[number]>((value) => ({
      ...omit(value, ['attendanceStatistic']),
      badgeId: Number(value.badgeId),
      attendanceInfo: Object.fromEntries(
        Object.entries(value.attendanceInfo).map(([day, info]) => [
          day,
          {
            ...info,
            detailKeyId: info.detailKeyId && Number(info.detailKeyId),
          },
        ]),
      ) as PostTextParsingResult[number]['attendanceInfo'],
    }))

    // TODO: 추후 스터디원 관리기능 추가 시 적용
    console.log(Number(team) + '팀: ', body)
    toast('준비 중인 기능이에요', { icon: '🙏' })
  }

  useEffect(() => {
    setInitialValues({ result })
    reset()
  }, [result, setInitialValues, reset])

  return (
    <form
      id={TEXT_PARSING_RESULT_FORM_ID}
      onSubmit={form.onSubmit(({ result }) =>
        handleSave(result.map((res) => res.data as EditableParsingResult)),
      )}
      className="space-y-4"
    >
      {form.values.result.map((person, personIndex) => (
        <div
          className="rounded-lg border border-solid border-gray-300 p-4 @container/parsing-result dark:border-dark-400"
          key={personIndex}
        >
          <FallbackRender
            render={!person.data}
            component={<TextParsingResultErrorFallback errorList={person.error!} />}
          >
            <TextParsingResultFormFields
              form={form}
              setInitialValues={setInitialValues}
              personResult={person}
              personResultIndex={personIndex}
              badgeOptions={badgeOptions}
            />
          </FallbackRender>
        </div>
      ))}
    </form>
  )
}
