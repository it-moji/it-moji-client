import { create } from 'zustand'
import type { EditableParsingResultWithError, ParsingOptions } from './schema'

export interface TextParsingState {
  text: string
  options: ParsingOptions | null
  result: EditableParsingResultWithError[]
}

export interface TextParsingStore extends TextParsingState {
  actions: {
    resetTextParsingStore: () => void
    setText: (text: string) => void
    setOptions: (options: ParsingOptions | null) => void
    setResult: (result: EditableParsingResultWithError[]) => void
  }
}

const initialState: TextParsingState = {
  text: '',
  options: null,
  result: [],
}

export const useTextParsingStore = create<TextParsingStore>()((set) => ({
  ...initialState,

  actions: {
    resetTextParsingStore: () => set(initialState),
    setText: (text: string) => set({ text }),
    setOptions: (options: ParsingOptions | null) => set({ options }),
    setResult: (result: EditableParsingResultWithError[]) => set({ result }),
  },
}))

export const useParsingText = () => useTextParsingStore((state) => state.text)
export const useParsingOptions = () => useTextParsingStore((state) => state.options)
export const useParsingResult = () => useTextParsingStore((state) => state.result)

export const useTextParsingActions = () => useTextParsingStore((state) => state.actions)
