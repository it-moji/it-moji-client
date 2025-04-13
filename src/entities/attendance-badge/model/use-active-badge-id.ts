import { create } from 'zustand'
import type { AttendanceBadge } from './schema'

export interface ActiveBadgeIdStore {
  activeBadgeId: AttendanceBadge['id'] | null
  setActiveBadgeId: (id: AttendanceBadge['id'] | null) => void
}

export const useActiveBadgeId = create<ActiveBadgeIdStore>((set) => ({
  activeBadgeId: null,
  setActiveBadgeId: (id) => set(() => ({ activeBadgeId: id })),
}))
