import { describe, expect, test } from 'vitest'
import { separatePeople } from '../parse-text'
import { createTestDataList } from './create-test-data'

describe('인원 분리 기준을 사용해 인원 목록을 분리한다.', () => {
  const testCases = [
    {
      nameList: ['이름1', '이름2'],
      personDelimiter: '—',
    },
    {
      nameList: ['이름1', '이름2'],
      personDelimiter: '_',
    },
    {
      nameList: ['이름1', '이름2'],
      personDelimiter: '&',
    },
  ]

  test.each(testCases)('인원 분리 기준: $personDelimiter', ({ nameList, personDelimiter }) => {
    const testData = createTestDataList({ nameList, personDelimiter })
    const result = separatePeople(testData, personDelimiter)

    expect(result).toHaveLength(nameList.length)
  })
})
