import { cn } from '../lib'
import { Icon } from './icon'

export type MainLogoProps = Omit<React.JSX.IntrinsicElements['span'], keyof React.PropsWithChildren>

export const MainLogo: React.FC<MainLogoProps> = ({ className, ...props }) => (
  <span
    className={cn('flex items-center justify-center space-x-2 text-lg font-bold', className)}
    {...props}
  >
    <Icon
      icon="fluent-emoji:man-technologist-light"
      className="mb-1"
      width="1.2em"
      height="1.2em"
    />
    <span>ITMOJI</span>
  </span>
)
