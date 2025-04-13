import type { ParsingOptions } from '../../../model'
import { PARSING_OPTIONS_MOCK_DATA } from '../../../api'
import {
  DEFAULT_LINE_DELIMITER,
  TIL_DEFAULT_BADGE,
  TIL_MORE_THAN_5_HOURS_BADGE,
} from '../../../config'

interface TestDataParams {
  name?: string
  nameIdentifier?: ParsingOptions['name']
  personDelimiter?: ParsingOptions['delimiter']['person']
  titleDelimiter?: ParsingOptions['delimiter']['title']
  dayMapping?: ParsingOptions['dayMapping']
}

export const createTestData = ({
  name = '홍길동',
  nameIdentifier = PARSING_OPTIONS_MOCK_DATA.name,
  personDelimiter = PARSING_OPTIONS_MOCK_DATA.delimiter.person,
  titleDelimiter = PARSING_OPTIONS_MOCK_DATA.delimiter.title,
  dayMapping = PARSING_OPTIONS_MOCK_DATA.dayMapping,
}: TestDataParams) =>
  name +
  ' ' +
  personDelimiter +
  ' ' +
  '2025-03-10 오전 9:29' +
  DEFAULT_LINE_DELIMITER +
  (nameIdentifier + titleDelimiter + name + DEFAULT_LINE_DELIMITER) +
  ('이번 주 한 마디: 아자아자 파이팅' + DEFAULT_LINE_DELIMITER) +
  DEFAULT_LINE_DELIMITER +
  (dayMapping.monday +
    titleDelimiter +
    TIL_MORE_THAN_5_HOURS_BADGE +
    DEFAULT_LINE_DELIMITER +
    'TIL 내용' +
    DEFAULT_LINE_DELIMITER) +
  (dayMapping.tuesday +
    titleDelimiter +
    TIL_MORE_THAN_5_HOURS_BADGE +
    DEFAULT_LINE_DELIMITER +
    'TIL 내용' +
    DEFAULT_LINE_DELIMITER) +
  (dayMapping.wednesday + titleDelimiter + TIL_DEFAULT_BADGE + DEFAULT_LINE_DELIMITER) +
  (dayMapping.thursday +
    titleDelimiter +
    TIL_DEFAULT_BADGE +
    DEFAULT_LINE_DELIMITER +
    'TIL 내용' +
    DEFAULT_LINE_DELIMITER) +
  (dayMapping.friday +
    titleDelimiter +
    TIL_DEFAULT_BADGE +
    DEFAULT_LINE_DELIMITER +
    '휴식' +
    DEFAULT_LINE_DELIMITER) +
  DEFAULT_LINE_DELIMITER +
  (dayMapping.saturday +
    titleDelimiter +
    TIL_DEFAULT_BADGE +
    DEFAULT_LINE_DELIMITER +
    'TIL 내용' +
    DEFAULT_LINE_DELIMITER) +
  (dayMapping.sunday + titleDelimiter + TIL_DEFAULT_BADGE)

interface TestDataListParams extends Omit<TestDataParams, 'name'> {
  nameList?: string[]
}

export const createTestDataList = ({
  nameList = ['홍길동', '김철수'],
  nameIdentifier = PARSING_OPTIONS_MOCK_DATA.name,
  personDelimiter = PARSING_OPTIONS_MOCK_DATA.delimiter.person,
  titleDelimiter = PARSING_OPTIONS_MOCK_DATA.delimiter.title,
  dayMapping = PARSING_OPTIONS_MOCK_DATA.dayMapping,
}: TestDataListParams) =>
  nameList
    .map((name) =>
      createTestData({
        name,
        personDelimiter,
        titleDelimiter,
        nameIdentifier,
        dayMapping,
      }),
    )
    .join('')
