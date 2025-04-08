import type { Metadata } from 'next'
import { TextParsingPage } from '@/views/text-parsing'
import { getAttendanceBadgeListWithConditions } from '@/entities/attendance-badge'
import { getParsingOptions } from '@/entities/text-parsing'

export const metadata: Metadata = {
  title: '텍스트 분석 및 적용',
}

export const dynamic = 'force-dynamic' // TODO: 백엔드 API 적용 시 제거

const AttendanceTextParsingPage: React.FC = async () => {
  const [{ data: parsingOptions }, { data: badgeOptions }] = await Promise.all([
    getParsingOptions(),
    getAttendanceBadgeListWithConditions(),
  ])

  return <TextParsingPage parsingOptions={parsingOptions} badgeOptions={badgeOptions} />
}

export default AttendanceTextParsingPage
