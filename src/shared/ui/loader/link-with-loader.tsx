'use client'

import Link from 'next/link'
import { useLoaderSwitch } from '../../lib'

export const LinkWithLoader: typeof Link = (({ href, onClick, children, ...props }) => {
  const { on } = useLoaderSwitch()

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (
          typeof href === 'string' &&
          `${location.pathname}${location.search}` !== href &&
          !(props as Record<string, unknown>)['data-disabled'] &&
          !(props as Record<string, unknown>)['aria-disabled'] &&
          !(props as Record<string, unknown>)['disabled']
        ) {
          on()
        }

        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </Link>
  )
}) as typeof Link
