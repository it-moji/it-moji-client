import { cn } from '../lib'

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
