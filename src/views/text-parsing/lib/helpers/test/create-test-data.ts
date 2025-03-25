import type { ParsingOptions } from '@/entities/text-parsing'
import { PARSING_OPTIONS_MOCK_DATA } from '@/entities/text-parsing/api/mocks/parsing-options'

interface TestDataParams {
  name?: string
  nameIdentifier?: ParsingOptions['name']
  personDelimiter?: ParsingOptions['delimiter']['person']
  titleDelimiter?: ParsingOptions['delimiter']['title']
  dayMapping?: ParsingOptions['dayMapping']
}

export const createTestData = ({
  name = '이름',
  nameIdentifier = PARSING_OPTIONS_MOCK_DATA.name,
  personDelimiter = PARSING_OPTIONS_MOCK_DATA.delimiter.person,
  titleDelimiter = PARSING_OPTIONS_MOCK_DATA.delimiter.title,
  dayMapping = PARSING_OPTIONS_MOCK_DATA.dayMapping,
}: TestDataParams) => `${name} ${personDelimiter} 2025-03-10 오전 9:29
${nameIdentifier}${titleDelimiter} ${name}
이번 주 한 마디: 아자아자 파이팅

${dayMapping.monday}${titleDelimiter}🎖️ 
TIL 내용
${dayMapping.tuesday}${titleDelimiter}🎖️ 
TIL 내용
${dayMapping.wednesday}${titleDelimiter} 
${dayMapping.thursday}${titleDelimiter} 
TIL 내용
${dayMapping.friday}${titleDelimiter}
휴식

${dayMapping.saturday}${titleDelimiter}
TIL 내용
${dayMapping.sunday}${titleDelimiter} `

interface TestDataListParams extends Omit<TestDataParams, 'name'> {
  nameList?: string[]
}

export const createTestDataList = ({
  nameList = ['이름1', '이름2'],
  nameIdentifier = PARSING_OPTIONS_MOCK_DATA.name,
  personDelimiter = PARSING_OPTIONS_MOCK_DATA.delimiter.person,
  titleDelimiter = PARSING_OPTIONS_MOCK_DATA.delimiter.title,
  dayMapping = PARSING_OPTIONS_MOCK_DATA.dayMapping,
}: TestDataListParams) =>
  nameList
    .map((name) =>
      createTestData({ name, personDelimiter, titleDelimiter, nameIdentifier, dayMapping }),
    )
    .join('')
