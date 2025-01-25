import { cx } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export type PropsWithClassName<P = unknown> = P & { className?: string | undefined }

export const cn = (...inputs: Parameters<typeof cx>) => twMerge(cx(inputs))
