import { FallbackUIFactor } from './ui-factor'

export const NotFound: React.FC<React.JSX.IntrinsicElements['div']> = (props) => (
  <FallbackUIFactor
    iconQuery="fluent-emoji:thinking-face"
    comment="요청하신 페이지를 찾을 수 없어요"
    description={
      <>
        찾으시고자 하는 페이지가 삭제되었거나 이동되었을 수 있어요.{' '}
        <br className="hidden md:block" />
        주소를 한 번 더 확인해 주시고, 동일한 증상이 지속적으로 나타나는 경우{' '}
        <br className="hidden md:block" />
        관리자에게 문의해 주세요.
      </>
    }
    {...props}
  >
    {props.children}
  </FallbackUIFactor>
)
