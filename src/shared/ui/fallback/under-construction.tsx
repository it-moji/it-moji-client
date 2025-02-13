import { FallbackUIFactor } from './ui-factor'

export const UnderConstruction: React.FC<React.JSX.IntrinsicElements['div']> = (props) => (
  <FallbackUIFactor
    iconQuery="fluent-emoji:construction"
    comment="페이지 준비 중이에요"
    description={
      <>
        이용에 불편을 드려 죄송해요 <br />
        빠른 시일 내에 좋은 서비스로 찾아뵐게요!
      </>
    }
    {...props}
  >
    {props.children}
  </FallbackUIFactor>
)
