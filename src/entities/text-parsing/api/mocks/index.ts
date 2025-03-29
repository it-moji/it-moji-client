import { modifyParsingOptionsMockHandler } from './modify-parsing-options'
import { parsingOptionsMockHandler } from './parsing-options'
import { postParsingResultMockHandler } from './parsing-result'

export const textParsingHandlers = [
  parsingOptionsMockHandler,
  modifyParsingOptionsMockHandler,
  postParsingResultMockHandler,
]

export * from './parsing-options'
