import { create } from 'zustand'
import type { EditableParsingResult, ParsingOptions } from './schema'

export interface TextParsingState {
  text: string
  options: ParsingOptions | null
  result: EditableParsingResult[]

  actions: {
    setText: (text: string) => void
    setOptions: (options: ParsingOptions | null) => void
    setResult: (result: EditableParsingResult[]) => void
  }
}

export const useTextParsingStore = create<TextParsingState>()((set) => ({
  text: '',
  options: null,
  result: [],

  actions: {
    setText: (text: string) => set({ text }),
    setOptions: (options: ParsingOptions | null) => set({ options }),
    setResult: (result: EditableParsingResult[]) => set({ result }),
  },
}))
