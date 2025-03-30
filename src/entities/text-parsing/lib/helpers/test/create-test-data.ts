import type { ParsingOptions } from '../../../model'
import { PARSING_OPTIONS_MOCK_DATA } from '../../../api'
import { TIL_DEFAULT_BADGE, TIL_MORE_THAN_5_HOURS_BADGE } from '../../../config'

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
  (dayMapping.monday +
    titleDelimiter +
    TIL_MORE_THAN_5_HOURS_BADGE +
    lineDelimiter +
    'TIL 내용' +
    lineDelimiter) +
  (dayMapping.tuesday +
    titleDelimiter +
    TIL_MORE_THAN_5_HOURS_BADGE +
    lineDelimiter +
    'TIL 내용' +
    lineDelimiter) +
  (dayMapping.wednesday + titleDelimiter + TIL_DEFAULT_BADGE + lineDelimiter) +
  (dayMapping.thursday +
    titleDelimiter +
    TIL_DEFAULT_BADGE +
    lineDelimiter +
    'TIL 내용' +
    lineDelimiter) +
  (dayMapping.friday +
    titleDelimiter +
    TIL_DEFAULT_BADGE +
    lineDelimiter +
    '휴식' +
    lineDelimiter) +
  lineDelimiter +
  (dayMapping.saturday +
    titleDelimiter +
    TIL_DEFAULT_BADGE +
    lineDelimiter +
    'TIL 내용' +
    lineDelimiter) +
  (dayMapping.sunday + titleDelimiter + TIL_DEFAULT_BADGE)

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
