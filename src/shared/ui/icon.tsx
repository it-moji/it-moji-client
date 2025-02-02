'use client'

import { Icon as Iconify } from '@iconify/react'
import { cn } from '../lib'

export interface IconProps
  extends Omit<React.JSX.IntrinsicElements['span'], keyof React.PropsWithChildren> {
  query: string
  width?: string | number | undefined
  height?: string | number | undefined
}

export const Icon: React.FC<IconProps> = ({ query, width, height, className, style, ...props }) => (
  <span
    className={cn('flex size-4 items-center justify-center', className)}
    style={{ ...style, width, height }}
    {...props}
  >
    <Iconify icon={query} className="size-full" width="1em" height="1em" />
  </span>
)
