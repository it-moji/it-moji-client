'use client'

import {
  type AttendanceOptionKey,
  useAttendanceOptionDetailSuspenseQuery,
} from '@/entities/attendance-option'
import { FallbackRender } from '@/shared/ui'
import { DetailOptionListEmptyFallback } from './detail-option-fallback-ui'
import { DetailOptionItem } from './detail-option-item'

export interface DetailOptionListProps {
  optionKey: AttendanceOptionKey
}

export const DetailOptionList: React.FC<DetailOptionListProps> = ({ optionKey }) => {
  const { data } = useAttendanceOptionDetailSuspenseQuery({ optionKey })

  return (
    <FallbackRender component={<DetailOptionListEmptyFallback />} render={data.length <= 0}>
      <ul className="w-full space-y-3">
        {data.map((detailOption) => (
          <li key={detailOption.id}>
            <DetailOptionItem {...detailOption} optionKey={optionKey} />
          </li>
        ))}
      </ul>
    </FallbackRender>
  )
}
