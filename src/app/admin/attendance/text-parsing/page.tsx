import type { Metadata } from 'next'
import {
  TextParsingInput,
  TextParsingOptionsSetting,
  TextParsingResult,
} from '@/views/text-parsing'
import { ATTENDANCE_BADGE_MOCK_DATA } from '@/entities/attendance-badge'
import { getParsingOptions } from '@/entities/text-parsing'

export const metadata: Metadata = {
  title: '텍스트 분석 및 적용',
}

const AttendanceTextParsingPage: React.FC = async () => {
  const [{ data: parsingOptions }, badgeOptions] = await Promise.all([
    getParsingOptions(),
    ATTENDANCE_BADGE_MOCK_DATA, // NOTE - 추후 배지 목록 조회 API로 수정 예정
  ])

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="basis-2/5 flex-col space-y-4">
        <TextParsingInput />
        <TextParsingOptionsSetting parsingOptions={parsingOptions} />
      </div>
      <div className="basis-3/5">
        <TextParsingResult badgeOptions={badgeOptions} />
      </div>
    </div>
  )
}

export default AttendanceTextParsingPage
