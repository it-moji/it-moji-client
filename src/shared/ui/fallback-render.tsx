export interface FallbackRenderProps extends React.PropsWithChildren {
  component?: React.ReactNode
  render?: boolean
}

export const FallbackRender: React.FC<FallbackRenderProps> = ({ component, render, children }) => (
  <>{render ? component : children}</>
)
