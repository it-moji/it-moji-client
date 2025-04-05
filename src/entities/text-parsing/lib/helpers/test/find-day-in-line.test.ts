import { describe, test, expect } from 'vitest'
import { PARSING_OPTIONS_MOCK_DATA } from '../../../api'
import { findDayInLine } from '../parse-text'

describe('주어진 텍스트에서 날짜 판단 기준과 키/값 분리 기준을 사용해 날짜(요일)을 찾는다.', () => {
  test('TIL 템플릿과 같은 형식에서 올바르게 날짜(요일)을 추출한다.', () => {
    expect(
      findDayInLine(
        '월: TIL 내용',
        PARSING_OPTIONS_MOCK_DATA.dayMapping,
        PARSING_OPTIONS_MOCK_DATA.delimiter.title,
      ),
    ).toBe('월')
  })

  test('날짜(요일) 앞에 다른 문자열이 포함되어 있어도 날짜(요일)을 추출한다.', () => {
    expect(
      findDayInLine(
        '- 월: TIL 내용',
        PARSING_OPTIONS_MOCK_DATA.dayMapping,
        PARSING_OPTIONS_MOCK_DATA.delimiter.title,
      ),
    ).toBe('월')
  })

  test('텍스트에서 날짜(요일)을 찾지 못하면 undefined를 반환한다.', () => {
    expect(
      findDayInLine(
        ': TIL 내용',
        PARSING_OPTIONS_MOCK_DATA.dayMapping,
        PARSING_OPTIONS_MOCK_DATA.delimiter.title,
      ),
    ).toBeUndefined()
  })

  test('텍스트에 키/값 분리 기준이 포함되어 있지 않으면 undefined를 반환한다.', () => {
    expect(
      findDayInLine(
        '월 TIL 내용',
        PARSING_OPTIONS_MOCK_DATA.dayMapping,
        PARSING_OPTIONS_MOCK_DATA.delimiter.title,
      ),
    ).toBeUndefined()
  })
})
