import { create } from "zustand"
import { type User } from "@supabase/supabase-js"
import { type Vault, type InterestRecord, type SavedSymbol } from "@/lib/types"

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

type InterestRecordsStore = {
  interestRecords: InterestRecord[]
  setInterestRecords: (interestRecords: InterestRecord[]) => void
  addInterestRecord: (interestRecords: InterestRecord) => void
}

export const useInterestRecordsStore = create<InterestRecordsStore>((set) => ({
  interestRecords: [],
  setInterestRecords: (interestRecords) => set({ interestRecords }),
  addInterestRecord: (interestRecord) =>
    set((state) => ({
      interestRecords: [...state.interestRecords, interestRecord],
    })),
}))

type StocksStore = {
  stockSymbols: SavedSymbol[] | null
  setStockSymbols: (stockSymbols: SavedSymbol[]) => void
}

export const useStocksStore = create<StocksStore>((set) => ({
  stockSymbols: null,
  setStockSymbols: (stockSymbols) => set({ stockSymbols }),
}))
