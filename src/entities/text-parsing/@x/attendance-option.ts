import { PARSING_OPTIONS_MOCK_DATA } from '../api/mocks/parsing-options'

export const createDetailOptionInTextParsingOptionMockData = (id: number, name: string) => {
  PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions.push({
    id,
    name,
    identifier: name,
  })
}

export const updateDetailOptionInTextParsingOptionMockData = (id: number, name: string) => {
  PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions.forEach((detailOption) => {
    if (detailOption.id === id) {
      detailOption.name = name
      detailOption.identifier = name
    }
  })
}

export const deleteDetailOptionInTextParsingOptionMockData = (id: number) => {
  PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions =
    PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions.filter(
      (detailOption) => detailOption.id !== id,
    )
}
