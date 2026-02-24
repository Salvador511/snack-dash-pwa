import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TokenState {
  token: string | null
  // eslint-disable-next-line no-unused-vars
  setToken: (token: string | null) => void
  logout: () => void
}

export const useToken = create<TokenState>()(
  persist(
    set => ({
      token: null,
      setToken: token => set({ token }),
      logout: () => set({ token: null }),
    }),
    {
      name: '__SNACK-DASH__CREDENTIALS',
    }
  )
)