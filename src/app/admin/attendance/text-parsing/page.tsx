import type { Metadata } from 'next'
import { TextParsingPage } from '@/views/text-parsing'

export const metadata: Metadata = {
  title: '텍스트 분석 및 적용',
}

const AttendanceTextParsingPage: React.FC = () => {
  return <TextParsingPage />
}

export default AttendanceTextParsingPage
