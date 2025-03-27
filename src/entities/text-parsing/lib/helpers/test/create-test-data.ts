import type { ParsingOptions } from '@/entities/text-parsing'
import { PARSING_OPTIONS_MOCK_DATA } from '@/entities/text-parsing/api/mocks/parsing-options'

interface TestDataParams {
  name?: string
  nameIdentifier?: ParsingOptions['name']
  personDelimiter?: ParsingOptions['delimiter']['person']
  titleDelimiter?: ParsingOptions['delimiter']['title']
  lineDelimiter?: ParsingOptions['delimiter']['line']
  dayMapping?: ParsingOptions['dayMapping']
}

export const createTestData = ({
  name = '홍길동',
  nameIdentifier = PARSING_OPTIONS_MOCK_DATA.name,
  personDelimiter = PARSING_OPTIONS_MOCK_DATA.delimiter.person,
  titleDelimiter = PARSING_OPTIONS_MOCK_DATA.delimiter.title,
  lineDelimiter = PARSING_OPTIONS_MOCK_DATA.delimiter.line,
  dayMapping = PARSING_OPTIONS_MOCK_DATA.dayMapping,
}: TestDataParams) =>
  name +
  ' ' +
  personDelimiter +
  ' ' +
  '2025-03-10 오전 9:29' +
  lineDelimiter +
  (nameIdentifier + titleDelimiter + name + lineDelimiter) +
  ('이번 주 한 마디: 아자아자 파이팅' + lineDelimiter) +
  lineDelimiter +
  (dayMapping.monday + titleDelimiter + '🎖️' + lineDelimiter + 'TIL 내용' + lineDelimiter) +
  (dayMapping.tuesday + titleDelimiter + '🎖️' + lineDelimiter + 'TIL 내용' + lineDelimiter) +
  (dayMapping.wednesday + titleDelimiter + '🌱' + lineDelimiter) +
  (dayMapping.thursday + titleDelimiter + '🌱' + lineDelimiter + 'TIL 내용' + lineDelimiter) +
  (dayMapping.friday + titleDelimiter + '🌱' + lineDelimiter + '휴식' + lineDelimiter) +
  lineDelimiter +
  (dayMapping.saturday + titleDelimiter + '🌱' + lineDelimiter + 'TIL 내용' + lineDelimiter) +
  (dayMapping.sunday + titleDelimiter + '🌱')

interface TestDataListParams extends Omit<TestDataParams, 'name'> {
  nameList?: string[]
}

export const createTestDataList = ({
  nameList = ['홍길동', '김철수'],
  nameIdentifier = PARSING_OPTIONS_MOCK_DATA.name,
  personDelimiter = PARSING_OPTIONS_MOCK_DATA.delimiter.person,
  titleDelimiter = PARSING_OPTIONS_MOCK_DATA.delimiter.title,
  lineDelimiter = PARSING_OPTIONS_MOCK_DATA.delimiter.line,
  dayMapping = PARSING_OPTIONS_MOCK_DATA.dayMapping,
}: TestDataListParams) =>
  nameList
    .map((name) =>
      createTestData({
        name,
        personDelimiter,
        titleDelimiter,
        lineDelimiter,
        nameIdentifier,
        dayMapping,
      }),
    )
    .join('')
