import { describe, expect, test } from 'vitest'
import { extractName } from '@/entities/text-parsing'
import { createTestData } from './create-test-data'

describe('이름 판단 기준과 키/값 분리 기준, 개행 분리 기준을 사용해 이름을 추출한다.', () => {
  const testCases = [
    { name: '홍길동', nameIdentifier: '이름', titleDelimiter: ':', lineDelimiter: '\n' },
    { name: '홍길동', nameIdentifier: '성명', titleDelimiter: ':', lineDelimiter: '\r' },
    { name: '홍길동', nameIdentifier: '이름', titleDelimiter: '-', lineDelimiter: '\t' },
  ]

  test.each(testCases)(
    '이름 판단 기준: $nameIdentifier, 키/값 분리 기준: $titleDelimiter, 개행 분리 기준: $lineDelimiter',
    ({ name, nameIdentifier, titleDelimiter, lineDelimiter }) => {
      const testData = createTestData({ name, nameIdentifier, titleDelimiter, lineDelimiter })
      const result = extractName(testData, nameIdentifier, titleDelimiter, lineDelimiter)

      expect(result).toEqual(name)
    },
  )

  test('주어진 옵션으로 이름이 올바르게 추출되지 않는 경우 예외가 발생한다.', () => {
    const testData = `이름: 김나나
    
    월:🌱
    TIL 내용`

    expect(() => extractName(testData, '성명', ':', '\n')).toThrow()
  })
})
