'use client'

import { Button } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { Exception } from '@/shared/api'
import { Icon } from '../icon'
import { FallbackUIFactor } from './ui-factor'

export interface CommonErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export interface FallbackErrorProps extends Partial<CommonErrorProps> {
  withoutRefresh?: boolean
}

export const FallbackError: React.FC<FallbackErrorProps & React.JSX.IntrinsicElements['div']> = ({
  error,
  reset,
  withoutRefresh = false,
  ...props
}) => {
  const { back, refresh } = useRouter()

  const comment = error && Exception.extractMessage(error)
  const defaultComment = '이용에 불편을 드려 죄송해요'

  return (
    <FallbackUIFactor
      iconQuery="fluent-emoji:sad-but-relieved-face"
      comment={comment || defaultComment}
      description={
        <>
          {comment ? (
            <>
              {defaultComment} <br />
            </>
          ) : null}
          다시 시도해도 동일한 증상이 지속적으로 나타나는 경우 <br className="hidden sm:block" />
          관리자에게 문의해 주세요.
        </>
      }
      {...props}
    >
      <p className="mt-8 flex flex-wrap items-center justify-center gap-2 md:mt-12">
        <Button variant="default" color="gray" title="이전 페이지 이동" onClick={back}>
          뒤로가기
        </Button>
        <Button
          variant="default"
          color="gray"
          onClick={() => {
            if (!withoutRefresh) {
              refresh()
            }

            reset?.()
          }}
          leftSection={<Icon query="fluent:arrow-clockwise-32-regular" />}
        >
          다시시도
        </Button>
        {props.children}
      </p>
    </FallbackUIFactor>
  )
}
