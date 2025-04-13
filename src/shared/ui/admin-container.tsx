import type { PropsWithClassNames } from '../lib'
import { type PropsWithClassName, cn } from '../lib'
import { type IconProps, Icon } from './icon'

export const AdminContainer: React.FC<React.JSX.IntrinsicElements['div']> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn(
      'rounded-lg border border-solid border-gray-300 bg-white p-5 dark:border-dark-400 dark:bg-dark-800',
      className,
    )}
    {...props}
  >
    {children}
  </div>
)

export const AdminTitle: React.FC<React.JSX.IntrinsicElements['h2']> = ({
  className,
  children,
  ...props
}) => (
  <h2 className={cn('mb-8 flex items-center border text-lg font-bold', className)} {...props}>
    {children}
  </h2>
)

export interface AdminContainerFallbackUIProps
  extends Pick<IconProps, 'query'>,
    React.PropsWithChildren<PropsWithClassName>,
    PropsWithClassNames<'root' | 'comment' | 'icon'> {
  comment: string
}

export const AdminContainerFallbackUI: React.FC<AdminContainerFallbackUIProps> = ({
  query,
  comment,
  children,
  className,
  classNames,
}) => (
  <div
    className={cn(
      'flex w-full flex-col items-center justify-center pb-4',
      classNames?.root,
      className,
    )}
  >
    <Icon
      query={query}
      className={cn('size-7 text-gray-600 dark:text-dark-300', classNames?.icon)}
    />
    <p
      className={cn(
        'mt-3 break-keep font-medium text-gray-600 dark:text-dark-300',
        classNames?.comment,
      )}
    >
      {comment}
    </p>
    {children}
  </div>
)
