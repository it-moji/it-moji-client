import { Title } from '@mantine/core'
import { Icon } from '../icon'
import { cn } from '../../lib'

export interface FallbackUIFactorProps {
  comment: React.ReactNode
  description?: React.ReactNode
  iconQuery?: string
}

export const FallbackUIFactor: React.FC<
  React.JSX.IntrinsicElements['div'] & FallbackUIFactorProps
> = ({ comment, description, iconQuery, className, children, ...props }) => (
  <div className={cn('px-5 pb-16 pt-12', className)} {...props}>
    {!!iconQuery && (
      <div className="mx-auto mb-8 size-fit rounded-full border-solid border-gray-300 bg-gray-50 p-6 dark:border-dark-400 dark:bg-dark-600">
        <Icon query={iconQuery} className="size-16 md:size-24" />
      </div>
    )}
    <Title order={2} className="break-keep text-center text-xl md:text-2xl">
      {comment}
    </Title>
    {!!description && (
      <p className="mt-4 break-keep text-center md:mt-6 md:text-lg">{description}</p>
    )}
    {children}
  </div>
)
