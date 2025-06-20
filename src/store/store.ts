import { create } from "zustand"
import { type User } from "@supabase/supabase-js"
import {
  type Vault,
  type InterestRecord,
  type SavedSymbol,
  type PriceData,
  type Budget,
} from "@/lib/types"

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

type PriceDatasStore = {
  priceDatas: PriceData[] | null
  setPriceDatas: (priceDatas: PriceData[]) => void
  removePriceData: (symbol: string) => void
}
export const usePriceDatasStore = create<PriceDatasStore>((set) => ({
  priceDatas: null,
  setPriceDatas: (priceDatas) => set({ priceDatas }),
  removePriceData: (symbol) =>
    set((state) => ({
      priceDatas: state.priceDatas?.filter((item) => item.symbol !== symbol),
    })),
}))

type BudgetStore = {
  budgets: Budget[] | null
  setBudgets: (budgets: Budget[]) => void
  addBudget: (budget: Budget) => void
  updateBudget: (id: number, updatedBudget: Budget) => void
  removeBudget: (id: number) => void
  clearBudgets: () => void
}
export const useBudgetsStore = create<BudgetStore>((set) => ({
  budgets: null,
  setBudgets: (budgets) => set({ budgets }),
  addBudget: (budget) =>
    set((state) => ({
      budgets: state.budgets ? [...state.budgets, budget] : [budget],
    })),
  updateBudget: (id, updatedBudget) =>
    set((state) => ({
      budgets: state.budgets?.map((budget) =>
        budget.id === id ? { ...budget, ...updatedBudget } : budget,
      ),
    })),
  removeBudget: (id) =>
    set((state) => ({
      budgets: state.budgets?.filter((budget) => budget.id !== id),
    })),
  clearBudgets: () => set({ budgets: null }),
}))
