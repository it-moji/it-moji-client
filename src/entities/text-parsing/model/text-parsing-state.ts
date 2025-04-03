import { create } from 'zustand'
import type { EditableParsingResult, ParsingOptions } from './schema'

export interface TextParsingState {
  text: string
  options: ParsingOptions | null
  result: EditableParsingResult[]
  isSubmitting: boolean
}

export interface TextParsingStore extends TextParsingState {
  actions: {
    resetTextParsingStore: () => void
    setText: (text: string) => void
    setOptions: (options: ParsingOptions | null) => void
    setResult: (result: EditableParsingResult[]) => void
    setIsSubmitting: (isSubmitting: boolean) => void
  }
}

const initialState = {
  text: '',
  options: null,
  result: [],
  isSubmitting: false,
}

export const useTextParsingStore = create<TextParsingStore>()((set) => ({
  ...initialState,

  actions: {
    resetTextParsingStore: () => set(initialState),
    setText: (text: string) => set({ text }),
    setOptions: (options: ParsingOptions | null) => set({ options }),
    setResult: (result: EditableParsingResult[]) => set({ result }),
    setIsSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),
  },
}))

export const useParsingText = () => useTextParsingStore((state) => state.text)
export const useParsingOptions = () => useTextParsingStore((state) => state.options)
export const useParsingResult = () => useTextParsingStore((state) => state.result)
export const useParsingFormSubmitting = () => useTextParsingStore((state) => state.isSubmitting)

export const useTextParsingActions = () => useTextParsingStore((state) => state.actions)
