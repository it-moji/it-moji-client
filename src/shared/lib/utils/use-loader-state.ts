import { create } from 'zustand'

export interface LoaderSwitchState {
  on: () => void
  off: () => void
}

export interface LoaderStore extends LoaderSwitchState {
  isLoading: boolean
}

export const useLoaderState = create<LoaderStore>((set) => ({
  isLoading: false,
  on: () => set({ isLoading: true }),
  off: () => set({ isLoading: false }),
}))

export const useLoaderSwitch = (): LoaderSwitchState => ({
  on: useLoaderState((store) => store.on),
  off: useLoaderState((store) => store.off),
})
