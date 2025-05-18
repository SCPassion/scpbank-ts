import { create } from "zustand"
import { type User } from "@supabase/supabase-js"
import { type Vault, type Breakdown } from "@/lib/types"

type UserStore = {
  user: User | null
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))

type VaultStore = {
  vaults: Vault[]
  setVaults: (vaults: Vault[]) => void
  addVault: (vault: Vault) => void
}

export const useVaultStore = create<VaultStore>((set) => ({
  vaults: [],
  setVaults: (vaults) => set({ vaults }),
  addVault: (vault) => set((state) => ({ vaults: [...state.vaults, vault] })),
}))

type BreakdownStore = {
  breakDowns: Breakdown[]
  setBreakDowns: (breakdowns: Breakdown[]) => void
}

export const useBreakdownStore = create<BreakdownStore>((set) => ({
  breakDowns: [],
  setBreakDowns: (breakdowns) => set({ breakDowns: breakdowns }),
}))
