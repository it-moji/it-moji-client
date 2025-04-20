import type { Meta, StoryObj } from '@storybook/react'
import { ATTENDANCE_BADGE_MOCK_DATA } from '@/entities/attendance-badge'
import { OPTION_LIST_MOCK_DATA } from '@/entities/attendance-option'
import { parseText, PARSING_OPTIONS_MOCK_DATA } from '@/entities/text-parsing'
import { TextParsingResultErrorFallback } from './text-parsing-result-fallback-ui'

const text = `홍길동 — 2025-03-31 오전 9:48
이름 홍길동
이번 주 한 마디: 파이팅

월:🎖️
프로젝트 기능 구현
화🎖️
프로젝트 기능 구현
수:🌱
프로젝트 기능 리팩토링
이력서 수정
목:🎖️
프로젝트 PR 리뷰 반영 및 수정
포트폴리오 수정
금🎖️
프로젝트 PR 리뷰 반영 및 수정
포트폴리오 수정

토:🌱
포트폴리오 수정
일:🌱`

const meta: Meta<typeof TextParsingResultErrorFallback> = {
  title: '관리자 페이지/출석 관리/텍스트 분석 및 적용/텍스트 분석 결과 폼 대체 UI - 에러',
  component: TextParsingResultErrorFallback,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof TextParsingResultErrorFallback>

export const 텍스트_파싱_예외: Story = {
  render: (arg) => {
    const errorList = parseText(
      text,
      PARSING_OPTIONS_MOCK_DATA,
      OPTION_LIST_MOCK_DATA,
      ATTENDANCE_BADGE_MOCK_DATA,
    )[0].error!

    return (
      <div className="mx-auto w-[700px] rounded-lg border border-solid border-gray-300 p-4 @container/parsing-result dark:border-dark-400">
        <TextParsingResultErrorFallback {...arg} errorList={errorList} />
      </div>
    )
  },
}
