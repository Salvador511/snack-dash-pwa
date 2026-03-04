import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TokenState {
  me: any | null
  // eslint-disable-next-line no-unused-vars
  setMe: (me: any | null) => void
}

export const useMe = create<TokenState>()(
  persist(
    set => ({
      me: null,
      setMe: me => set({ me }),
    }),
    {
      name: '__SNACK-DASH__ME',
    }
  )
)