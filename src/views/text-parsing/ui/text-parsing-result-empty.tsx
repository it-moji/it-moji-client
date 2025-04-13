import { Center } from '@mantine/core'

export const TextParsingResultEmpty: React.FC = () => (
  <Center h="100%">
    <p className="break-keep text-center text-sm text-gray-500 dark:text-gray-400">
      텍스트를 입력하고 &apos;분석하기&apos; 버튼을 클릭하면 <br className="hidden sm:block" />
      이곳에 분석 결과가 표시돼요
    </p>
  </Center>
)
