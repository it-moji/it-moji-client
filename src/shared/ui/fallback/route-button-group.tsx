'use client'

import { Button } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/shared/config'
import { Icon } from '../icon'
import { LinkWithLoader } from '../loader/link-with-loader'
import { type PropsWithClassName, cn } from '../../lib'

export type FallbackRouteButtonGroupProps = PropsWithClassName<{
  admin?: boolean
}>

export const FallbackRouteButtonGroup: React.FC<FallbackRouteButtonGroupProps> = ({
  className,
  admin: isAdmin = false,
}) => {
  const { back } = useRouter()

  return (
    <p className={cn('mt-8 flex flex-wrap items-center justify-center gap-2 md:mt-12', className)}>
      <Button variant="default" color="gray" title="이전 페이지 이동" onClick={back}>
        뒤로가기
      </Button>
      <Button
        component={LinkWithLoader}
        href={isAdmin ? ROUTES.ADMIN() : ROUTES()}
        title={`${isAdmin ? '관리자 ' : ''}메인 페이지 이동`}
        variant="default"
        color="gray"
        leftSection={<Icon query="fluent-emoji:house" className="size-5" />}
      >
        메인으로
      </Button>
    </p>
  )
}
