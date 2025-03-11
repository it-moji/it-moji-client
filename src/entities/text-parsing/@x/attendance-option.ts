import { PARSING_OPTIONS_MOCK_DATA } from '../api/mocks/parsing-options'

export const createDetailOptionInTextParsingOptionMockData = (id: number, name: string) => {
  PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions.push({
    id,
    name,
    identifier: name,
  })
}

export const updateDetailOptionInTextParsingOptionMockData = (id: number, name: string) => {
  PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions.forEach((detailOption, detailOptionIdx) => {
    if (detailOption.id === id) {
      PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions[detailOptionIdx].name = name
      PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions[detailOptionIdx].identifier = name
    }
  })
}

export const deleteDetailOptionInTextParsingOptionMockData = (id: number) => {
  PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions =
    PARSING_OPTIONS_MOCK_DATA.attendanceDetailOptions.filter(
      (detailOption) => detailOption.id !== id,
    )
}
