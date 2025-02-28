export const ExternalLink: React.FC<React.JSX.IntrinsicElements['a']> = ({ title, ...props }) => (
  <a
    title={`새창이동${title ? `: ${title}` : ''}`}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {props.children}
  </a>
)
